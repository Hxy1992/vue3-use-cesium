import AmapMercatorTilingScheme from "./AmapMercatorTilingScheme.js";

function getUrl(style, lang) {
	if (lang !== "en") {
		lang = "zh_cn";
	}
	const IMG_URL = "https://webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";

	const ELEC_URL = `https://webrd{s}.is.autonavi.com/appmaptile?lang=${lang}&size=1&scale=1&style=8&x={x}&y={y}&z={z}`;

	const CVA_URL = `https://webst{s}.is.autonavi.com/appmaptile?lang=${lang}&size=1&scale=1&style=8&x={x}&y={y}&z={z}`;

	return style === "img" ? IMG_URL : style === "cva" ? CVA_URL : ELEC_URL;
}

export default function exp() {
	return class AmapImageryProvider extends Cesium.UrlTemplateImageryProvider {
		constructor(options = {}) {
			options["url"] = getUrl(options.style, options.lang);
			if (!options.subdomains || !options.subdomains.length) {
				options["subdomains"] = ["01", "02", "03", "04"];
			}
			if (options.crs === "WGS84") {
				const GetClass = AmapMercatorTilingScheme();
				options["tilingScheme"] = new GetClass();
			}
			options.maximumLevel = 18; // 设置最大层级
			super(options);
		}
	}
};
