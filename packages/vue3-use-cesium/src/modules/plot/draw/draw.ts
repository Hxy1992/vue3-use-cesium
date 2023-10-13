import { mapFactory } from "../../factory/map-factory";
import type { PlotTypes, PlotCallBackType } from "../../../interface/plot";

/**
 * 基类
 */
export abstract class Draw {
	protected isEditing: boolean;
	protected viewer: any;
	protected mapUid: string;
	protected entity: any;
	protected coods: any[];
	protected callback: PlotCallBackType;
	protected events: any[];
	protected type: PlotTypes;
	protected clampToGround: boolean;
	constructor(mapUid: string, type: PlotTypes, callback: PlotCallBackType) {
		this.isEditing = false;
		this.viewer = mapFactory.get(mapUid);
		this.mapUid = mapUid;
		this.type = type;
		this.coods = [];
		this.events = [];
		this.callback = callback;
		this.clampToGround = false;
	}
	/**
	 * 开始编辑
	 */
	abstract start(coods: any[]): void;
	/**
	 * 结束编辑
	 */
	abstract end(): void;
	/**
	 * 设置开始状态
	 */
	protected setStartStates() {
		this.isEditing = true;
		this.cursorStyle("crosshair");
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
	protected cursorStyle(cursor: "default" | "crosshair") {
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
	/**
	 * 设置图形贴地
	 * @param clampToGround 是否贴地
	 */
	public setClampToGround(clampToGround: boolean) {
		this.clampToGround = clampToGround;
	}
	abstract dispose(): void;
}
