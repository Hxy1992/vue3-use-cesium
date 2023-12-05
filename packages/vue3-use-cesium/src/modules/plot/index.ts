import { DrawPolygon, DrawPolyline, DrawPoint } from "./draw";
import { EditPolygon, EditPolyline, EditPoint } from "./edit";
import { getState } from "../../utils/store";
import type { PlotTypes, CoodinateType, PlotCallBackType } from "../../interfaces/plot";

/**
 * 标绘
 */
export class Plot {
	private mapId: string | null;
	private instence: DrawPoint | DrawPolygon | DrawPolyline | EditPoint | EditPolygon | EditPolyline | null;
	private clampToGround: boolean;
	constructor() {
		this.mapId = getState().mapId;
		this.instence = null;
		this.clampToGround = false;
	}
	private stopPrevious() {
		if (this.instence) {
			this.instence.dispose();
			this.instence = null;
		}
	}
	/**
	 * 设置图形贴地
	 * @param val 是否贴地
	 */
	public setClampToGround(val: boolean = false) {
		this.clampToGround = val;
	}
	/**
	 * 绘制
	 * @param type 类型
	 * @param callback 回调
	 * @returns
	 */
	public draw(type: PlotTypes, callback: PlotCallBackType) {
		if (!this.mapId) return;
		this.stopPrevious();
		switch (type) {
			case "EllipsoidPoint":
			case "TerrainSurfacePoint":
			case "ModelSurfacePoint":
				this.instence = new DrawPoint(this.mapId, type, callback);
				this.instence.setClampToGround(this.clampToGround);
				this.instence.start();
				break;
			case "EllipsoidPolyline":
			case "TerrainSurfacePolyline":
			case "ModelSurfacePolyline":
				this.instence = new DrawPolyline(this.mapId, type, callback);
				this.instence.setClampToGround(this.clampToGround);
				this.instence.start();
				break;
			case "EllipsoidPolygon":
			case "TerrainSurfacePolygon":
			case "ModelSurfacePolygon":
				this.instence = new DrawPolygon(this.mapId, type, callback);
				this.instence.setClampToGround(this.clampToGround);
				this.instence.start();
				break;
			default:
				this.instence = null;
				break;
		}
		return this.instence;
	}
	/**
	 * 编辑
	 * @param type 类型
	 * @param coods 坐标
	 * @returns
	 */
	public edit(type: PlotTypes, coods: CoodinateType[]) {
		if (!this.mapId) return;
		this.stopPrevious();
		switch (type) {
			case "EllipsoidPoint":
			case "TerrainSurfacePoint":
			case "ModelSurfacePoint":
				this.instence = new EditPoint(this.mapId, type);
				this.instence.setClampToGround(this.clampToGround);
				this.instence.start(coods);
				break;
			case "EllipsoidPolyline":
			case "TerrainSurfacePolyline":
			case "ModelSurfacePolyline":
				this.instence = new EditPolyline(this.mapId, type);
				this.instence.setClampToGround(this.clampToGround);
				this.instence.start(coods);
				break;
			case "EllipsoidPolygon":
			case "TerrainSurfacePolygon":
			case "ModelSurfacePolygon":
				this.instence = new EditPolygon(this.mapId, type);
				this.instence.setClampToGround(this.clampToGround);
				this.instence.start(coods);
				break;
			default:
				this.instence = null;
				break;
		}
		return this.instence;
	}
	/**
	 * 停止标绘
	 */
	public stop() {
		this.stopPrevious();
	}
	/**
	 * 销毁
	 */
	public dispose() {
		this.stopPrevious();
	}
}
