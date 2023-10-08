const MAP_URL = "https://t{s}.tianditu.gov.cn/DataServer?T={style}_w&x={x}&y={y}&l={z}&tk={key}";

export default function exp() {
	return class TdtImageryProvider extends Cesium.UrlTemplateImageryProvider {
		constructor(options = {}) {
			super({
				url: MAP_URL.replace(/\{style\}/g, options.style || "vec").replace(/\{key\}/g, options.key || ""),
				subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
				tilingScheme: new Cesium.WebMercatorTilingScheme(),
				maximumLevel: 18
			});
		}
	};
}
