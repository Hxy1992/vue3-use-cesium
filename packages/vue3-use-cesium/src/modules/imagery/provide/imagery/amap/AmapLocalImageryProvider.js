
import AmapMercatorTilingScheme from "./AmapMercatorTilingScheme.js";

export default function exp() {
	return class AmapLocalImageryProvider extends Cesium.UrlTemplateImageryProvider {
		constructor(options = {}) {
			// if (!options.subdomains || !options.subdomains.length) {
			//   options['subdomains'] = ['01', '02', '03', '04']
			// }
			if (options.crs === "WGS84") {
				const GetClass = AmapMercatorTilingScheme();
				options["tilingScheme"] = new GetClass();
			}
			super(options);
		}
	}
}
