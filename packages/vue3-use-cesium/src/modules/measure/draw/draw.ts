import { mapFactory } from "../../basemap";
import type { MeasureTypes } from "../../../interfaces/measure";
import { LayerFactory, Layer } from "../../layer";
import { LabelStyle, PointStyle } from "../config";

/**
 * 基类
 */
export abstract class Draw {
	protected isEditing: boolean;
	protected viewer: any;
	protected mapUid: string;
	protected coods: any[];
	protected type: MeasureTypes;
	protected clampToGround: boolean;
	protected layerFactory: LayerFactory;
	/**
	 * 临时标注图层
	 */
	protected labelLayer: Layer;
	/**
	 * 临时绘制图层
	 */
	protected drawLayer: Layer;
	constructor(mapUid: string, type: MeasureTypes) {
		this.isEditing = false;
		this.viewer = mapFactory.get(mapUid);
		this.mapUid = mapUid;
		this.type = type;
		this.coods = [];
		this.clampToGround = false;
		// 图层管理
		this.layerFactory = new LayerFactory();
		// 临时标注图层
		this.labelLayer = this.layerFactory.addLayer("draw-temp-label", {
			point: {
				pixelSize: 6,
				outlineWidth: 2,
				color: PointStyle.color(),
				outlineColor: PointStyle.outlineColor()
			},
			label: {
				show: true,
				showBackground: true,
				font: LabelStyle.font,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				pixelOffset: new Cesium.Cartesian2(0, -10)
			}
		});
		// 绘制图层
		this.drawLayer = this.layerFactory.addLayer("draw-temp-entity");
	}
	/**
	 * 开始
	 */
	public start() {
		if (this.isEditing) return;
		this.clear();
		this.clearEvents();
		this.addEntities();
		this.addEvents();
		this.setStates(true);
	}
	protected abstract addEvents(): void;
	protected abstract addEntities(): void;
	/**
	 * 停止（移除绘制事件，不清空地图内容）
	 */
	public stop() {
		if (!this.isEditing) return;
		// 地图事件、容器等
		this.setStates(false);
		this.clearEvents();
	}
	/**
	 * 清空地图内容
	 */
	public clear() {
		this.drawLayer.removeAll();
		this.labelLayer.removeAll();
		this.coods = [];
	}
	/**
	 * 销毁（停止并清空）
	 */
	public dispose() {
		this.drawLayer.dispose();
		this.labelLayer.dispose();
		this.coods = [];
	}
	/**
	 * 设置状态
	 */
	protected setStates(isStart: boolean) {
		if (isStart) {
			this.isEditing = true;
			this.cursorStyle("crosshair");
		} else {
			this.isEditing = false;
			this.cursorStyle("default");
		}
	}
	/**
	 * 设置鼠标样式
	 * @param cursor 样式
	 */
	protected cursorStyle(cursor: "default" | "crosshair") {
		this.viewer.container.style.cursor = cursor;
	}
	protected clearEvents() {
		this.labelLayer.removeAllEvent();
		this.drawLayer.removeAllEvent();
	}
	/**
	 * 获取pick类型
	 * @returns 类型
	 */
	protected getPickType() {
		switch (this.type) {
			case "EllipsoidPosition":
			case "EllipsoidDistance":
			case "EllipsoidArea":
				return "Ellipsoid";
			case "TerrainSurfacePosition":
			case "TerrainSurfaceDistance":
			case "TerrainSurfaceArea":
			case "TerrainSurfaceHeight":
			case "TerrainSurfaceTriangle":
				return "TerrainSurface";
			case "ModelSurfacePosition":
			case "ModelSurfaceDistance":
			case "ModelSurfaceArea":
			case "ModelSurfaceHeight":
			case "ModelSurfaceTriangle":
				return "ModelSurface";
		}
	}
	/**
	 * 设置图形贴地
	 * @param clampToGround 是否贴地
	 */
	public setClampToGround(clampToGround: boolean) {
		this.clampToGround = clampToGround;
	}
}
