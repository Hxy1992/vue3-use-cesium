import { DrawPolygon, DrawPolyline, DrawPoint } from "./draw";
import { EditPolygon, EditPolyline, EditPoint } from "./edit";
import { getState } from "../../utils/store";
import type { PlotTypes, CoodinateType, PlotCallBackType } from "../../interface/plot";

/**
 * 标绘
 */
export class Plot {
	private mapId: string | null;
	private instence: DrawPoint | DrawPolygon | DrawPolyline | EditPoint | EditPolygon | EditPolyline | null;
	constructor() {
		this.mapId = getState().mapId;
		this.instence = null;
	}
	private stopPrevious() {
		if (this.instence) {
			this.instence.dispose();
			this.instence = null;
		}
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
			case "point":
				this.instence = new DrawPoint(this.mapId, callback);
				this.instence.start();
				break;
			case "polyline":
				this.instence = new DrawPolyline(this.mapId, callback);
				this.instence.start();
				break;
			case "polygon":
				this.instence = new DrawPolygon(this.mapId, callback);
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
			case "point":
				this.instence = new EditPoint(this.mapId);
				this.instence.start(coods);
				break;
			case "polyline":
				this.instence = new EditPolyline(this.mapId);
				this.instence.start(coods);
				break;
			case "polygon":
				this.instence = new EditPolygon(this.mapId);
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
