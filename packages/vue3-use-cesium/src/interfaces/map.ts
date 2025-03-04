/**
 * 地图事件类型
 */
export type EventTypes =
	| "MOVE_START"
	| "MOVE_END"
	| "LEFT_DOWN"
	| "LEFT_UP"
	| "LEFT_CLICK"
	| "LEFT_UP"
	| "RIGHT_DOWN"
	| "RIGHT_UP"
	| "RIGHT_CLICK"
	| "MOUSE_MOVE"
	| "WHEEL"
	| "LEFT_DOUBLE_CLICK";
/**
 * 底图类型
 */
export type ImageryTypes =
	| "tdt-img"
	| "tdt-vec"
	| "gd-img"
	| "gd-vec"
	| "google-img"
	| "google-vec"
	| "bd-vec"
	| "bd-img"
	| "tencent-vec"
	| "tencent-img"
	| "tms-offline"
	| "osm-normal"
	| "geoq-img"
	| "geoq-vec"
	| "carto-darkall"
	| "carto-lightall"
	| "empty";

/**
 * 地形类型
 */
export type TerrainTypes = "none" | "xyz" | "arcgis" | "google" | "vr";

/**
 * 组件参数
 */
export interface MapOptionTypes {
	/**
	 * 默认视图类型
	 */
	viewType?: "2d" | "3d";
	/**
	 * 深度检测
	 */
	depthTestAgainstTerrain?: boolean;
	/**
	 * 是否使用Cesium默认的旋转、平移、缩放操作（默认false，使用框架自定义操作）
	 */
	useCesiumDefaultEvent?: boolean;
	/**
	 * 默认底图
	 */
	imagery?: ImageryTypes;
	/**
	 * 默认底图为本地时需传入url
	 */
	imageryUrl?: string;
	/**
	 * 默认底图为天地图时需传入token
	 */
	tdtToken?: string;
	/**
	 * 地形
	 */
	terrain?: TerrainTypes;
	/**
	 * 地形地址
	 */
	terrainUrl?: string;
	/**
	 * new Cesium.Viewer时配置参数，会覆盖默认参数
	 */
	extra?: Record<string, any>;
}
