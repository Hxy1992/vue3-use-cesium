import { TerrainTypeEnum } from "../enums/map-enum";

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
	| "bd-vec"
	| "tencent-vec"
	| "tencent-img"
	| "tms-offline"
	| "osm-normal"
	| "geoq-colour"
	| "geoq-gray"
	| "geoq-midnightblue"
	| "carto-darkall"
	| "carto-lightall"
	| "empty";
export interface MapOptionTypes {
	/**
	 * 默认视图类型
	 */
	viewType?: "2d" | "3d"; // true - 3d视图；false - 2d视图
	/**
	 * 默认底图
	 */
	imagery?: ImageryTypes;
	/**
	 * 默认底图为本地时需传入url
	 */
	imageryUrl?: string;
	/**
	 * 地形
	 */
	terrain?: TerrainTypeEnum;
	/**
	 * 地形地址
	 */
	terrainUrl?: string;
	/**
	 * new Cesium.Viewer时配置参数，会覆盖默认参数
	 */
	extra?: Record<string, any>;
}
