import { withInstall } from "../../utils/with-install";
import type { DefineComponent } from "vue";
import mapOperation from "./src/index.vue";

export const MapOperation = withInstall<
	DefineComponent<
		{
			imagerys?: {
				label: string;
				type:
					| "tdt-img"
					| "tdt-vec"
					| "gd-img"
					| "gd-vec"
					| "bd-vec"
					| "bd-img"
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
				url?: string;
				backgroundImage?: string;
			}[];
			/**
			 * 是否显示视图设置
			 */
			showViewSet: boolean;
			/**
			 * 是否显示默认视图
			 */
			showHomeView: boolean;
			/**
			 * 是否显示恢复正北
			 */
			showRecoverNorth: boolean;
			/**
			 * 是否显示底图切换
			 */
			showImagery: boolean;
			/**
			 * 是否显示放大
			 */
			showZoomIn: boolean;
			/**
			 * 是否显示缩小
			 */
			showZoomOut: boolean;
			/**
			 * 是否显示帮助
			 */
			showHelp: boolean;
		},
		{},
		any
	>,
	typeof mapOperation
>(mapOperation);
export default MapOperation;
