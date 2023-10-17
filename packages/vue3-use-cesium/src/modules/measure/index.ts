/**
 * TODO
 * 按坐标拾取有三种类型、按是否贴地有两种类型
 * +++ 坐标测量：点击获取位置坐标，按 坐标拾取分类，共3种；
 * +++ 距离测距：按 坐标拾取 * 是否贴地 分类，共6种；
 * +++ 面积测量：按 坐标拾取 * 是否贴地 分类，共6种；
 * +++ 高度差：两点间的地形海拔落差，地形 + 模型 共2种；
 * +++ 三角测量：两点间的地形海拔落差和距离，地形 + 模型 共2种；
 */

import { DrawPolygon, DrawPolyline, DrawPoint, DrawHeight, DrawTriangle } from "./draw";
import { getState } from "../../utils/store";
import type {
	MeasurePositionTypes,
	MeasureDistanceTypes,
	MeasureAreaTypes,
	MeasureHeightTypes,
	MeasureTriangleTypes
} from "../../interface/measure";

/**
 * 测量
 */
export class Measure {
	private mapId: string | null;
	private instence: DrawPoint | DrawPolygon | DrawPolyline | DrawHeight | DrawTriangle | null;
	private clampToGround: boolean;
	constructor() {
		this.mapId = getState().mapId;
		this.instence = null;
		this.clampToGround = false;
	}
	/**
	 * 位置测量
	 * @param type 类型
	 */
	public position(type: MeasurePositionTypes) {
		if (!this.mapId) return;
		this.clampToGround = true;
		this.stop();
		this.instence = new DrawPoint(this.mapId, type);
		this.instence.setClampToGround(this.clampToGround);
		this.instence.start();
	}
	/**
	 * 距离测量
	 * TODO 接收插值数量参数
	 * @param type 类型
	 * @param clampToGround 是否贴地
	 */
	public distance(type: MeasureDistanceTypes, clampToGround: boolean = false) {
		if (!this.mapId) return;
		this.clampToGround = clampToGround;
		this.stop();
		this.instence = new DrawPolyline(this.mapId, type);
		this.instence.setClampToGround(this.clampToGround);
		this.instence.start();
	}
	/**
	 * 面积测量
	 * @param type 类型
	 * @param clampToGround 是否贴地
	 */
	public area(type: MeasureAreaTypes, clampToGround: boolean = false) {
		if (!this.mapId) return;
		this.clampToGround = clampToGround;
		this.stop();
		this.instence = new DrawPolygon(this.mapId, type);
		this.instence.setClampToGround(this.clampToGround);
		this.instence.start();
	}
	/**
	 * 高度差测量
	 * @param type 类型
	 */
	public height(type: MeasureHeightTypes) {
		if (!this.mapId) return;
		this.stop();
		this.instence = new DrawHeight(this.mapId, type);
		this.instence.start();
	}
	/**
	 * 三角测量
	 * @param type 类型
	 */
	public triangle(type: MeasureTriangleTypes) {
		if (!this.mapId) return;
		this.stop();
		this.instence = new DrawTriangle(this.mapId, type);
		this.instence.start();
	}
	/**
	 * 停止
	 */
	public stop() {
		if (this.instence) {
			this.instence.dispose();
			this.instence = null;
		}
	}
	/**
	 * 清空
	 */
	public clear() {
		if (this.instence) {
			this.instence.clear();
			this.instence = null;
		}
	}
	/**
	 * 停止
	 */
	public dispose() {
		if (this.instence) {
			this.instence.dispose();
			this.instence = null;
		}
	}
}
