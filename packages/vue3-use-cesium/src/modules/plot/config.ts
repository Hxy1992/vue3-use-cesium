import { PointStyle as SharedPointStyle, PolylineStyle as SharedPolylineStyle, PolygonStyle as SharedPolygonStyle } from "../shared/styles";

/**
 * 编辑时临时点样式
 */
export const EditPointConfig = {
	LayerName: "zmap-edit-points",
	TempLayerName: "zmap-edit-points-temp-middle"
};
export const PointLayerName = "zmap-plot-points";
/**
 * 点样式（plot 扩展了 tempMiddlePixelSize）
 */
export const PointStyle = {
	...SharedPointStyle,
	tempMiddlePixelSize: 4
};
/**
 * 线样式
 */
export const PolylineStyle = SharedPolylineStyle;
/**
 * 面样式
 */
export const PolygonStyle = SharedPolygonStyle;
