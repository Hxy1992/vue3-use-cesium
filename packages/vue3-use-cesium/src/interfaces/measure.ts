/**
 * 位置测量
 */
export type MeasurePositionTypes = "EllipsoidPosition" | "TerrainSurfacePosition" | "ModelSurfacePosition";

/**
 * 距离测量
 */
export type MeasureDistanceTypes = "EllipsoidDistance" | "TerrainSurfaceDistance" | "ModelSurfaceDistance";

/**
 * 面积测量
 */
export type MeasureAreaTypes = "EllipsoidArea" | "TerrainSurfaceArea" | "ModelSurfaceArea";

/**
 * 高度差测量
 */
export type MeasureHeightTypes = "TerrainSurfaceHeight" | "ModelSurfaceHeight";

/**
 * 三角测量
 */
export type MeasureTriangleTypes = "TerrainSurfaceTriangle" | "ModelSurfaceTriangle";

/**
 * 测量类型
 */
export type MeasureTypes =
	| MeasurePositionTypes
	| MeasureDistanceTypes
	| MeasureAreaTypes
	| MeasureHeightTypes
	| MeasureTriangleTypes;

import type { CoodinateType } from "./types";
export type { CoodinateType } from "./types";

/**
 * 标绘样式
 */
export interface MeasureStyle {
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
	label?: {
		font?: string;
	};
}

export interface MeasureCesiumStyle extends MeasureStyle {
	point: Required<
		MeasureStyle["point"] & {
			color: any;
			outlineColor: any;
		}
	>;
	polyline: Required<
		MeasureStyle["polyline"] & {
			color: any;
		}
	>;
	polygon: Required<
		MeasureStyle["polygon"] & {
			color: any;
		}
	>;
	label: {
		font: string;
	};
}
