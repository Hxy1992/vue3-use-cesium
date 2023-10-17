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

/**
 * 坐标类型
 */
export type CoodinateType = [number, number, number | undefined];
