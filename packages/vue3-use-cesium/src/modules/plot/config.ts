/**
 * 编辑时临时点样式
 */
export const EditPointConfig = {
	LayerName: "zmap-edit-points", // 编辑点图层名
	TempLayerName: "zmap-edit-points-temp-middle" // 编辑临时添加中点图层名
};
export const PointLayerName = "zmap-plot-points";
/**
 * 点样式
 */
export const PointStyle = {
	pixelSize: 6,
	outlineWidth: 2,
	tempMiddlePixelSize: 4,
	color: "rgb(255,255,255)",
	outlineColor: "rgb(0,0,0)"
};
/**
 * 线样式
 */
export const PolylineStyle = {
	color: "rgb(0,0,0)",
	width: 2
};
/**
 * 面样式
 */
export const PolygonStyle = {
	color: "rgba(0,0,0,0.4)"
};
