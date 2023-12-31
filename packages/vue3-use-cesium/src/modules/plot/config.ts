/**
 * 编辑时临时点样式
 */
export const EditPointStyle = {
	color: () => Cesium.Color.WHITE,
	outlineColor: () => Cesium.Color.BLACK,
	LayerName: "zmap-edit-points", // 编辑点图层名
	TempLayerName: "zmap-edit-points-temp-middle" // 编辑临时添加中点图层名
};
/**
 * 点样式
 */
export const PointStyle = {
	color: () => Cesium.Color.WHITE,
	outlineColor: () => Cesium.Color.BLACK,
	LayerName: "zmap-plot-points" // 编辑点图层名
};
/**
 * 线样式
 */
export const PolylineStyle = {
	color: () => Cesium.Color.BLACK,
	width: 2
};
/**
 * 面样式
 */
export const PolygonStyle = {
	color: () => Cesium.Color.BLACK.withAlpha(0.4)
};
