import { getState } from "../../utils/store";
import { mapFactory } from "../basemap";
import { generateUUID } from "../../utils";
import { ClusterOptionsType } from "../../interfaces/layer";
import Supercluster from "supercluster";
import { getZoom } from "../util";
import type { OptionTypes } from "../popup";
import { PopupWindow } from "../popup";

const DEF_OPT: ClusterOptionsType = {
	radius: 60,
	maxZoom: 25,
	style: "circle",
	image: "",
	gradientColors: () => {
		return {
			0.0001: Cesium.Color.DEEPSKYBLUE,
			0.001: Cesium.Color.GREEN,
			0.01: Cesium.Color.ORANGE,
			0.1: Cesium.Color.RED
		};
	},
	showCount: true,
	fontSize: 12,
	clusterSize: 16,
	fontColor: () => Cesium.Color.BLACK
	// getCountOffset: (count: number) => {
	// 	return {
	// 		x: -3.542857 * String(count).length + 1.066667,
	// 		y: String(count).length > 3 ? 5 : 4
	// 	};
	// }
};
let index = 1;

// TODO
// 将Supercluster开启新的work进行聚合计算
// 集成到LayerFactory中

/**
 * 聚合图层
 * https://github.com/mapbox/supercluster
 */
export class ClusterLayer {
	protected mapId: string;
	protected dataSource: any;
	protected viewer: any;
	protected name: string;
	protected id: string;
	private clusterOptions: ClusterOptionsType;
	private allCount: number;
	private clusterInstance: Supercluster;
	private canvasInstance: HTMLCanvasElement;
	private imageStore: Record<string, string>;
	private changedRemoveCallback: any;
	private popupWindow: PopupWindow | null;
	/**
	 * 聚合图层
	 * @param name 图层名称
	 * @param options 聚合配置
	 */
	constructor(name?: string, options?: ClusterOptionsType) {
		this.mapId = "";
		this.name = "";
		this.id = "";
		this.popupWindow = null;
		const id = getState().mapId;
		if (!id) throw new Error("mapId is not defined");
		this.name = name || "临时图层" + index++;
		this.id = generateUUID();
		this.mapId = id;
		this.viewer = mapFactory.get(this.mapId);
		this.dataSource = new Cesium.CustomDataSource();
		this.viewer.dataSources.add(this.dataSource);

		this.clusterOptions = {
			...DEF_OPT,
			...options
		};
		this.canvasInstance = document.createElement("canvas");
		this.imageStore = {};
		this.clusterInstance = new Supercluster({
			radius: this.clusterOptions.radius,
			maxZoom: this.clusterOptions.maxZoom
		});
		this.allCount = 0;
	}
	/**
	 * 获取图层名称
	 * @returns 名称
	 */
	getName() {
		return this.name;
	}
	/**
	 * 获取图层id
	 * @returns id
	 */
	getId() {
		return this.id;
	}
	/**
	 * 设置图层可见性
	 * @param val 可见性
	 */
	setVisible(val: boolean) {
		this.dataSource.show = val;
		if (!val) this.popupWindow?.hidePopup();
	}
	/**
	 * 获取图层绑定的dataSource
	 * @returns dataSource
	 */
	getDataSource() {
		return this.dataSource;
	}
	/**
	 * 是否包含entity
	 * @param entity entity
	 * @returns boolean
	 */
	contains(entity: any) {
		return !entity.isCluster && this.dataSource.entities.contains(entity);
	}
	/**
	 * 删除全部
	 */
	private removeAll() {
		this.popupWindow?.hidePopup();
		this.dataSource.entities.removeAll();
	}
	// 新增billboard
	private addBillboard(data: {
		position: any;
		image: string;
		isCluster: boolean;
		attr: Record<string, any>;
		showLabel?: boolean;
		text?: string;
		pixelOffset?: any;
	}) {
		let label = undefined;
		if (data.showLabel) {
			label = {
				show: true,
				font: this.clusterOptions.fontSize + "px Helvetica",
				outlineWidth: 2,
				text: data.text,
				fillColor: this.clusterOptions.fontColor && this.clusterOptions.fontColor(),
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
				scale: 0.8
				// pixelOffset: data.pixelOffset
			};
		}
		const entity = new Cesium.Entity({
			isCluster: data.isCluster,
			position: data.position,
			attr: data.attr,
			billboard: {
				show: true,
				image: data.image
			},
			label: label
		});
		if (!data.isCluster) {
			entity.billboard.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
			entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
		}
		this.dataSource.entities.add(entity);
	}
	// 获取圆图标
	private getCircleImage(color: any, count: number) {
		const size = (this.clusterOptions.clusterSize || 1) * (String(count).length + 1);
		const key = color.toCssColorString() + "-" + count;
		if (!this.imageStore[key]) {
			const canvas = this.canvasInstance;
			canvas.width = size;
			canvas.height = size;
			const context2D = canvas.getContext("2d");
			if (!context2D) throw new Error("context2D is null");
			context2D.save();
			context2D.scale(size / 24, size / 24); //Added to auto-generated code to scale up to desired size.
			context2D.fillStyle = color.withAlpha(0.2).toCssColorString(); //Modified from auto-generated code.
			context2D.beginPath();
			context2D.arc(12, 12, 9, 0, 2 * Math.PI);
			context2D.closePath();
			context2D.fill();
			context2D.beginPath();
			context2D.arc(12, 12, 6, 0, 2 * Math.PI);
			context2D.fillStyle = color.toCssColorString();
			context2D.closePath();
			context2D.fill();
			context2D.restore();
			this.imageStore[key] = canvas.toDataURL();
		}
		return this.imageStore[key];
	}
	// 获取cluster图标
	private getClusteringImage(color: any, count: number) {
		const size = (this.clusterOptions.clusterSize || 1) * (String(count).length + 1);
		const key = color.toCssColorString() + "-" + count;
		let startAngle = -Math.PI / 12;
		const angle = Math.PI / 2;
		const intervalAngle = Math.PI / 6;
		if (!this.imageStore[key]) {
			const canvas = this.canvasInstance;
			canvas.width = size;
			canvas.height = size;
			const context2D = canvas.getContext("2d");
			if (!context2D) throw new Error("context2D is null");
			context2D.save();
			context2D.scale(size / 24, size / 24); //Added to auto-generated code to scale up to desired size.
			context2D.beginPath();
			context2D.arc(12, 12, 6, 0, 2 * Math.PI);
			context2D.fillStyle = color.toCssColorString();
			context2D.fill();
			context2D.closePath();
			context2D.lineWidth = 2;
			for (let i = 0; i < 3; i++) {
				context2D.beginPath();
				context2D.arc(12, 12, 8, startAngle, startAngle + angle, false);
				context2D.strokeStyle = color.withAlpha(0.4).toCssColorString();
				context2D.stroke();
				context2D.arc(12, 12, 11, startAngle, startAngle + angle, false);
				context2D.strokeStyle = color.withAlpha(0.2).toCssColorString();
				context2D.stroke();
				context2D.closePath();
				startAngle = startAngle + angle + intervalAngle;
			}
			context2D.restore();
			this.imageStore[key] = canvas.toDataURL();
		}
		return this.imageStore[key];
	}
	// 获取聚合点图标
	private getClusterImage(count: number) {
		const rate = count / this.allCount;
		if (!this.clusterOptions.gradientColors) return "";
		const colors = this.clusterOptions.gradientColors();
		const keys = Object.keys(colors).sort((a, b) => Number(a) - Number(b));
		let color = undefined;
		for (let i = keys.length - 1; i >= 0; i--) {
			if (rate >= Number(keys[i])) {
				color = colors[keys[i]];
				break;
			}
		}
		if (!color) {
			color = colors[keys[0]];
		}
		return this.clusterOptions.style === "circle" ? this.getCircleImage(color, count) : this.getClusteringImage(color, count);
	}
	// 聚合变化
	private changeCluster() {
		this.imageStore = {};
		this.removeAll();
		let rectangle = this.viewer.camera.computeViewRectangle();
		if (this.allCount) {
			let result = this.clusterInstance.getClusters(
				[
					Cesium.Math.toDegrees(rectangle.west),
					Cesium.Math.toDegrees(rectangle.south),
					Cesium.Math.toDegrees(rectangle.east),
					Cesium.Math.toDegrees(rectangle.north)
				],
				getZoom(this.viewer)
			);

			result.forEach(item => {
				if (item.properties.cluster) {
					let count = item.properties.point_count;
					let params: any = {
						position: Cesium.Cartesian3.fromDegrees(+item.geometry.coordinates[0], +item.geometry.coordinates[1]),
						image: this.getClusterImage(count),
						isCluster: true,
						attr: item.properties,
						showLabel: false,
						text: undefined
						// pixelOffset: undefined
					};
					if (this.clusterOptions.showCount) {
						params.showLabel = true;
						params.text = count.toString();
						// const px = this.clusterOptions.getCountOffset && this.clusterOptions.getCountOffset(count);
						// params.pixelOffset = px ? new Cesium.Cartesian2(px.x, px.y) : undefined;
					}
					this.addBillboard(params);
				} else {
					this.addBillboard({
						isCluster: false,
						attr: item.properties,
						position: Cesium.Cartesian3.fromDegrees(+item.geometry.coordinates[0], +item.geometry.coordinates[1]),
						image: this.clusterOptions.image
					});
				}
			});
		}
	}
	// 相机事件
	private addEvents() {
		this.changedRemoveCallback = this.viewer.camera.changed.addEventListener(this.changeCluster, this);
	}
	// 清空相机事件
	private clearEvents() {
		if (this.changedRemoveCallback) {
			this.changedRemoveCallback();
			this.changedRemoveCallback = undefined;
		}
	}

	/**
	 * 设置聚合点数据
	 * @param points 点数据
	 */
	setPoints(
		points: {
			longitude: number;
			latitude: number;
			properties?: Record<string, any>;
		}[]
	) {
		if (!points || points.length === 0) return;
		if (this.changedRemoveCallback) {
			this.clearEvents();
			this.imageStore = {};
			this.removeAll();
		}
		this.allCount = points.length;
		const features: any[] = [];
		for (let index = 0; index < points.length; index++) {
			const p = points[index];
			features.push({
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [p.longitude, p.latitude]
				},
				properties: p.properties || {}
			});
		}
		this.clusterInstance.load(features);
		this.changeCluster();
		this.addEvents();
	}
	/**
	 * 图层弹窗事件
	 * @param options 配置参数
	 * @param includeFeature 判断pick结果是否符合要求
	 * @param visibleChange 显示/隐藏回调
	 * @returns popupWindow
	 */
	onPopup(options: OptionTypes, includeFeature: (pick: any) => boolean, visibleChange?: (visible: boolean, pick: any) => void) {
		if (this.popupWindow) return;
		this.popupWindow = new PopupWindow(options, includeFeature, visibleChange);
		return this.popupWindow;
	}
	/**
	 * 取消弹窗事件
	 */
	unPopup() {
		if (this.popupWindow) {
			this.popupWindow.dispose();
			this.popupWindow = null;
		}
	}
	/**
	 * 销毁
	 */
	dispose() {
		this.unPopup();
		this.imageStore = {};
		this.allCount = 0;
		this.clearEvents();
		this.removeAll();
		this.canvasInstance.remove();
		this.viewer.dataSources.remove(this.dataSource);
	}
}
