import { Draw } from "./draw";
import { mapFactory } from "../../factory/map-factory";
import { EventTypeEnum } from "../../../enums/map-enum";
import { PolylineStyle, LabelStyle, PointStyle } from "../config";
import type { MeasureDistanceTypes } from "../../../interface/measure";
import { pickPosition } from "../../pick-position";
import { lerp, getSampledHeight } from "../helper";
/**
 * 绘制线
 */
export class DrawPolyline extends Draw {
	private movePosition: any;
	private labelEntities: any[];
	/**
	 * 总长度
	 */
	private distanceSum: number;
	/**
	 * 绘制线
	 * @param mapUid 地图id
	 * @param type 类型
	 */
	constructor(mapUid: string, type: MeasureDistanceTypes) {
		super(mapUid, type);
		this.labelEntities = [];
		this.distanceSum = 0;
	}
	/**
	 * 开始绘制
	 */
	public start() {
		if (this.isEditing) return;
		// 地图事件、容器等
		this.init();
		this.setStates(true);
		this.coods = [];
		this.labelEntities = [];
	}
	/**
	 * 停止绘制
	 */
	public stop() {
		if (!this.isEditing) return;
		// 地图事件、容器等
		this.setStates(false);
		this.clearEvents();
	}
	/**
	 * 清空
	 */
	public clear() {
		this.viewer.entities.remove(this.entity);
		for (let index = 0; index < this.labelEntities.length; index++) {
			const element = this.labelEntities[index];
			this.viewer.entities.remove(element);
		}
		this.labelEntities = [];
		this.entity = null;
		this.coods = [];
	}
	/**
	 * 销毁
	 */
	public dispose() {
		this.clearEvents();
		this.clear();
	}
	private init() {
		this.addPolyline();
		this.addEvents();
	}
	private addEvents() {
		const viewer = this.viewer;
		const eventFactory = mapFactory.getEvent(this.mapUid);
		this.events.push(
			eventFactory.push(EventTypeEnum.LEFT_CLICK, (event: any) => {
				const worldPosition = pickPosition(this.getPickType(), viewer, event.position);
				if (!Cesium.defined(worldPosition)) {
					return;
				}
				this.coods.push(worldPosition);
				this.drawDistance();
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.MOUSE_MOVE, (event: any) => {
				const worldPosition = pickPosition(this.getPickType(), viewer, event.endPosition);
				if (!Cesium.defined(worldPosition)) {
					return;
				}
				this.movePosition = worldPosition;
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.LEFT_DOUBLE_CLICK, () => {
				// 双击会触发两次单击，所以需要去掉最后一个点
				this.coods.pop();
				this.removeLastIndexOfLabels();
				this.stop();
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.RIGHT_CLICK, () => {
				if (this.coods.length > 0) {
					this.coods.pop();
					this.removeLastIndexOfLabels();
				} else {
					this.stop();
				}
			})
		);
	}
	private addPolyline() {
		this.entity = this.viewer.entities.add({
			name: "draw-temp-entity",
			polyline: {
				show: true,
				positions: new Cesium.CallbackProperty(() => {
					return this.coods.length < 1 ? null : [...this.coods, this.movePosition];
				}, false),
				width: PolylineStyle.width,
				material: PolylineStyle.color(),
				clampToGround: this.clampToGround
			}
		});
	}
	// 绘制距离测量结果
	private drawDistance() {
		if (this.coods.length < 2) {
			if (this.coods.length === 1) this.addLabel(this.coods[0], "起点");
			this.distanceSum = 0;
			return;
		}
		if (this.clampToGround) {
			this.addClampGroundLabel();
		} else {
			this.addSpaceLabel();
		}
	}
	// 贴地距离
	private addClampGroundLabel() {
		const start = this.coods[this.coods.length - 2];
		const end = this.coods[this.coods.length - 1];
		// 插值
		const lerpInters = lerp(start, end);
		const lerpPositions = [start, ...lerpInters, end];
		const label = this.addLabel(end, "计算中");
		getSampledHeight(this.viewer, lerpPositions, this.type === "ModelSurfaceDistance", [...this.labelEntities, this.entity])
			.then(([updatedCartographics, updatedCartesians]) => {
				return updatedCartographics.map((item: any, index: number) =>
					Cesium.Cartesian3.fromDegrees(
						Cesium.Math.toDegrees(item.longitude),
						Cesium.Math.toDegrees(item.latitude),
						Math.max(
							item.height || 0,
							updatedCartesians[index] ? Cesium.Cartographic.fromCartesian(updatedCartesians[index]).height : 0
						)
					)
				);
			})
			.then(positions => {
				let sum = 0;
				for (let i = 0; i < positions.length - 1; i++) {
					let s = Cesium.Cartesian3.distance(positions[i], positions[i + 1]);
					sum += s;
				}
				this.distanceSum += sum;
				const text = this.getDistanceText(sum);
				label.label.text = text;
			});
	}
	// 不贴地距离
	private addSpaceLabel() {
		const start = this.coods[this.coods.length - 2];
		const end = this.coods[this.coods.length - 1];
		const distance = Cesium.Cartesian3.distance(start, end);
		this.distanceSum += distance;
		const text = this.getDistanceText(distance);
		this.addLabel(end, text);
	}
	private addLabel(position: any, text: string) {
		const labelEntity = this.viewer.entities.add({
			position: position,
			point: {
				pixelSize: 6,
				outlineWidth: 2,
				color: PointStyle.color(),
				outlineColor: PointStyle.outlineColor(),
				clampToGround: this.clampToGround
			},
			label: {
				show: true,
				showBackground: true,
				font: LabelStyle.font,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				pixelOffset: new Cesium.Cartesian2(0, -10),
				text
			}
		});
		this.labelEntities.push(labelEntity);
		return labelEntity;
	}
	private removeLastIndexOfLabels() {
		if (this.labelEntities.length === 0) return;
		const last = this.labelEntities.pop();
		this.viewer.entities.remove(last);
	}
	private getDistanceText(distance: number) {
		if (this.distanceSum > distance) {
			const sum =
				this.distanceSum > 1000
					? `合计：${(this.distanceSum / 1000).toFixed(2)} 公里\n`
					: `合计：${this.distanceSum.toFixed(2)} 米\n`;
			const step = distance > 1000 ? `+ (${(distance / 1000).toFixed(2)} 公里)` : `+ (${distance.toFixed(2)} 米)`;
			return sum + step;
		} else {
			return distance > 1000 ? `${(distance / 1000).toFixed(2)} 公里` : `${distance.toFixed(2)} 米`;
		}
	}
}
