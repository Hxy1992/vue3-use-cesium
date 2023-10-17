import { mapFactory } from "../../basemap";
import type { MeasureTypes } from "../../../interfaces/measure";

/**
 * 基类
 */
export abstract class Draw {
	protected isEditing: boolean;
	protected viewer: any;
	protected mapUid: string;
	protected entity: any;
	protected coods: any[];
	protected events: any[];
	protected type: MeasureTypes;
	protected clampToGround: boolean;
	constructor(mapUid: string, type: MeasureTypes) {
		this.isEditing = false;
		this.viewer = mapFactory.get(mapUid);
		this.mapUid = mapUid;
		this.type = type;
		this.coods = [];
		this.events = [];
		this.clampToGround = false;
	}
	/**
	 * 开始
	 */
	abstract start(): void;
	/**
	 * 停止（移除绘制事件，不清空地图内容）
	 */
	abstract stop(): void;
	/**
	 * 清空地图内容
	 */
	abstract clear(): void;
	/**
	 * 销毁（停止并清空）
	 */
	abstract dispose(): void;
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
