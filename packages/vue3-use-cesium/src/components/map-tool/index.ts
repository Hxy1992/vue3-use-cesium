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
			}[];
		},
		{},
		any
	>,
	any
>(mapOperation);
export default MapOperation;
