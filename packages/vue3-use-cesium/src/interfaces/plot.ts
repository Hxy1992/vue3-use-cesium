/**
 * 标绘类型
 */
export type PlotTypes =
	| "EllipsoidPoint"
	| "EllipsoidPolyline"
	| "EllipsoidPolygon"
	| "TerrainSurfacePoint"
	| "TerrainSurfacePolyline"
	| "TerrainSurfacePolygon"
	| "ModelSurfacePoint"
	| "ModelSurfacePolyline"
	| "ModelSurfacePolygon";
import type { CoodinateType } from "./types";
export type { CoodinateType } from "./types";

/**
 * 回调类型
 */
export type PlotCallBackType = (params: CoodinateType[] | null) => void;

/**
 * 标绘样式
 */
export interface PlotStyle {
	/**
	 * 点样式
	 */
	point?: {
		/**
		 * 颜色
		 */
		color?: string;
		/**
		 * 轮廓线颜色
		 */
		outlineColor?: string;
		/**
		 * 点大小
		 */
		pixelSize?: number;
		/**
		 * 轮廓线宽度
		 */
		outlineWidth?: number;
		/**
		 * 临时编辑中点大小
		 */
		tempMiddlePixelSize?: number;
	};
	polyline?: {
		/**
		 * 颜色
		 */
		color?: string;
		/**
		 * 线宽
		 */
		width?: number;
	};
	polygon?: {
		/**
		 * 填充颜色
		 */
		color?: string;
	};
}

export interface PlotCesiumStyle extends PlotStyle {
	point: Required<
		PlotStyle["point"] & {
			color: any;
			outlineColor: any;
		}
	>;
	polyline: Required<
		PlotStyle["polyline"] & {
			color: any;
		}
	>;
	polygon: Required<
		PlotStyle["polygon"] & {
			color: any;
		}
	>;
}
