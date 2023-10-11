/**
 * 标绘类型
 */
export type PlotTypes = "polyline" | "polygon";
/**
 * 坐标类型
 */
export type CoodinateType = [number, number, number | undefined];
/**
 * 回调类型
 */
export type PlotCallBackType = (params: CoodinateType[] | null) => void;
