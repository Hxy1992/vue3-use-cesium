/**
 * 类型定义
 */

export * from "./interfaces/components";
export * from "./interfaces/map";
export * from "./interfaces/store";
export * from "./interfaces/layer";
// 为避免 CoodinateType 冲突，使用选择性导出
// 从 measure 导入除 CoodinateType 外的所有类型
import type {
	MeasureTypes,
	MeasurePositionTypes,
	MeasureDistanceTypes,
	MeasureAreaTypes,
	MeasureHeightTypes,
	MeasureTriangleTypes,
	MeasureStyle,
	MeasureCesiumStyle
} from "./interfaces/measure";

// 从 plot 导入除 CoodinateType 外的所有类型
import type { PlotTypes, PlotCallBackType, PlotStyle, PlotCesiumStyle } from "./interfaces/plot";

// 导出所有类型，使用共享的 CoodinateType
export type {
	MeasureTypes,
	MeasurePositionTypes,
	MeasureDistanceTypes,
	MeasureAreaTypes,
	MeasureHeightTypes,
	MeasureTriangleTypes,
	MeasureStyle,
	MeasureCesiumStyle,
	PlotTypes,
	PlotCallBackType,
	PlotStyle,
	PlotCesiumStyle
};

// 从共享类型文件导出 CoodinateType 以避免冲突
export type { CoodinateType } from "./interfaces/types";
