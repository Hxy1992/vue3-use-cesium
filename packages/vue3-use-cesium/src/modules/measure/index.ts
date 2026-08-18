/**
 * 按坐标拾取有三种类型、按是否贴地有两种类型
 * +++ 坐标测量：点击获取位置坐标，按 坐标拾取分类，共3种；
 * +++ 距离测距：按 坐标拾取 * 是否贴地 分类，共6种；
 * +++ 面积测量：按 坐标拾取 * 是否贴地 分类，共6种；
 * +++ 高度差：两点间的地形海拔落差，地形 + 模型 共2种；
 * +++ 三角测量：两点间的地形海拔落差和距离，地形 + 模型 共2种；
 */
import merge from "lodash-es/merge";
import { DrawPolygon, DrawPolyline, DrawPoint, DrawHeight, DrawTriangle } from "./draw";
import { getState } from "../../utils/store";
import type {
	MeasurePositionTypes,
	MeasureDistanceTypes,
	MeasureAreaTypes,
	MeasureHeightTypes,
	MeasureTriangleTypes,
	MeasureStyle,
	MeasureCesiumStyle
} from "../../interfaces/measure";
import { PointStyle, PolylineStyle, PolygonStyle, LabelStyle } from "./config";

/**
 * 测量
 */
export class Measure {
	private mapId: string | null;
	private instance: DrawPoint | DrawPolygon | DrawPolyline | DrawHeight | DrawTriangle | null;
	private clampToGround: boolean;
	private style: MeasureCesiumStyle;
	constructor() {
		this.mapId = getState().mapId;
		this.instance = null;
		this.clampToGround = false;
		this.style = this.createStyle();
	}
	/**
	 * 设置样式
	 * @param style 样式
	 */
	public setStyle(style: MeasureStyle) {
		this.style = this.createStyle(style);
	}
	private createStyle(style?: MeasureStyle): MeasureCesiumStyle {
		const defaultStyle = {
			point: PointStyle,
			polyline: PolylineStyle,
			polygon: PolygonStyle,
			label: LabelStyle
		};
		const mergeStyle = merge({}, defaultStyle, style) as MeasureCesiumStyle;
		mergeStyle.point.color = Cesium.Color.fromCssColorString(mergeStyle.point.color);
		mergeStyle.point.outlineColor = Cesium.Color.fromCssColorString(mergeStyle.point.outlineColor);
		mergeStyle.polyline.color = Cesium.Color.fromCssColorString(mergeStyle.polyline.color);
		mergeStyle.polygon.color = Cesium.Color.fromCssColorString(mergeStyle.polygon.color);
		return mergeStyle;
	}
	/**
	 * 位置测量
	 * @param type 类型
	 */
	public position(type: MeasurePositionTypes) {
		if (!this.mapId) return;
		this.clampToGround = true;
		this.stop();
		this.instance = new DrawPoint(this.mapId, type, this.clampToGround, this.style);
		this.instance.start();
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
		this.instance = new DrawPolyline(this.mapId, type, this.clampToGround, this.style);
		this.instance.start();
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
		this.instance = new DrawPolygon(this.mapId, type, this.clampToGround, this.style);
		this.instance.start();
	}
	/**
	 * 高度差测量
	 * @param type 类型
	 */
	public height(type: MeasureHeightTypes) {
		if (!this.mapId) return;
		this.stop();
		this.instance = new DrawHeight(this.mapId, type, this.clampToGround, this.style);
		this.instance.start();
	}
	/**
	 * 三角测量
	 * @param type 类型
	 */
	public triangle(type: MeasureTriangleTypes) {
		if (!this.mapId) return;
		this.stop();
		this.instance = new DrawTriangle(this.mapId, type, this.clampToGround, this.style);
		this.instance.start();
	}
	/**
	 * 停止
	 */
	public stop() {
		if (this.instance) {
			this.instance.dispose();
			this.instance = null;
		}
	}
	/**
	 * 清空
	 */
	public clear() {
		if (this.instance) {
			this.instance.clear();
			this.instance = null;
		}
	}
	/**
	 * 停止
	 */
	public dispose() {
		if (this.instance) {
			this.instance.dispose();
			this.instance = null;
		}
	}
}
