import { mapFactory } from "../../basemap";
import type { PlotTypes, CoodinateType, PlotCesiumStyle, PlotCallBackType } from "../../../interfaces/plot";

/**
 * 基类
 */
export abstract class Edit {
	protected isEditing: boolean;
	protected viewer: any;
	protected mapUid: string;
	protected entity: any;
	protected coods: any[];
	protected events: any[];
	protected type: PlotTypes;
	protected clampToGround: boolean;
	protected style: PlotCesiumStyle;
	protected callback: PlotCallBackType;
	constructor(
		mapUid: string,
		type: PlotTypes,
		clampToGround: boolean = false,
		style: PlotCesiumStyle,
		callback: PlotCallBackType
	) {
		this.isEditing = false;
		this.viewer = mapFactory.get(mapUid);
		this.mapUid = mapUid;
		this.type = type;
		this.coods = [];
		this.events = [];
		this.clampToGround = clampToGround;
		this.style = style;
		this.callback = callback;
	}

	/**
	 * 开始编辑
	 */
	abstract start(coods: CoodinateType[], zoomTo?: boolean): void;
	/**
	 * 结束编辑
	 */
	abstract end(): void;
	/**
	 * 设置开始状态
	 */
	protected setStartStates() {
		this.isEditing = true;
		this.cursorStyle("move");
	}
	/**
	 * 设置结束状态
	 */
	protected setEndStates() {
		this.isEditing = false;
		this.cursorStyle("default");
	}
	/**
	 * 设置鼠标样式
	 * @param cursor 样式
	 */
	protected cursorStyle(cursor: "default" | "crosshair" | "move") {
		this.viewer.container.style.cursor = cursor;
	}
	protected clearEvents() {
		const eventFactory = mapFactory.getEvent(this.mapUid);
		eventFactory.remove(this.events);
		this.events = [];
	}
	/**
	 * 获取pick类型
	 * @returns 类型
	 */
	protected getPickType() {
		switch (this.type) {
			case "EllipsoidPoint":
			case "EllipsoidPolyline":
			case "EllipsoidPolygon":
				return "Ellipsoid";
			case "TerrainSurfacePoint":
			case "TerrainSurfacePolyline":
			case "TerrainSurfacePolygon":
				return "TerrainSurface";
			case "ModelSurfacePoint":
			case "ModelSurfacePolyline":
			case "ModelSurfacePolygon":
				return "ModelSurface";
		}
	}
	abstract dispose(): void;
}
