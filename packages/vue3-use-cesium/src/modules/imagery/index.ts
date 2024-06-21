// 底图图层管理
import type { ImageryTypes } from "../../interfaces/map";
import { AmapImageryProvider, BaiduImageryProvider, TencentImageryProvider } from "./provide/index.js";
import { getState } from "../../utils/store";

/**
 * 获取图层
 * @param layer 类型
 * @param language 语言
 * @param url 地址
 * @returns
 */
export function getImageryProvider(layer: ImageryTypes, language: "zh" | "en", url?: string) {
	let layers: any[] = [];
	switch (layer) {
		// 天地图-- 影像在线
		case "tdt-img": {
			const imageryProvider = createTDT("img_w", "img", "tdtBasicLayer");
			const imageryAnnotation = language === "en" ? createTDTAnnotation("eia_w", "eia") : createTDTAnnotation("cia_w", "cia");
			layers.push(imageryProvider);
			layers.push(imageryAnnotation);
			break;
		}
		// 天地图-- 电子在线
		case "tdt-vec": {
			const imageryProvider = createTDT("vec_w", "vec", "tdtVecBasicLayer");
			const imageryAnnotation = language === "en" ? createTDTAnnotation("eva_w", "eva") : createTDTAnnotation("cva_w", "cva");
			layers.push(imageryProvider);
			layers.push(imageryAnnotation);
			break;
		}
		// tms离线瓦片
		case "tms-offline": {
			const tms = new Cesium.UrlTemplateImageryProvider({
				url: `${url}/{z}/{x}/{y}.png`
			});
			layers.push(tms);
			break;
		}
		// 高德地图-- 影像在线
		case "gd-img": {
			const GetClass = AmapImageryProvider();
			layers.push(
				new GetClass({
					lang: language,
					style: "img", // style: img、elec、cva
					crs: "WGS84" // 使用84坐标系，默认为：GCJ02
				})
			);
			layers.push(
				new GetClass({
					lang: language,
					style: "cva", // style: img、elec、cva
					crs: "WGS84" // 使用84坐标系，默认为：GCJ02
				})
			);
			break;
		}
		// 高德地图-- 电子在线
		case "gd-vec": {
			const GetClass = AmapImageryProvider();
			layers.push(
				new GetClass({
					lang: language,
					style: "elec", // style: img、elec、cva
					crs: "WGS84" // 使用84坐标系，默认为：GCJ02
				})
			);
			break;
		}
		// osm标准地图
		case "osm-normal": {
			layers.push(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
					subdomains: ["a", "b", "c"]
				})
			);
			break;
		}
		// arcgis在线-colour(存在偏移)
		case "geoq-colour": {
			layers.push(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
				})
			);
			break;
		}
		// arcgis在线-gray(存在偏移)
		case "geoq-gray": {
			layers.push(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}"
				})
			);
			break;
		}
		// arcgis在线-Midnightblue(存在偏移)
		case "geoq-midnightblue": {
			layers.push(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
				})
			);
			break;
		}
		// carto-darkall
		case "carto-darkall": {
			layers.push(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
				})
			);
			break;
		}
		// carto-lightall
		case "carto-lightall": {
			layers.push(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
				})
			);
			break;
		}
		// 百度地图-- 电子在线
		case "bd-vec": {
			const GetClass = BaiduImageryProvider();
			layers.push(
				new GetClass({
					crs: "WGS84"
				})
			);
			break;
		}
		// 百度地图-- 卫星在线
		case "bd-img": {
			const GetClass = BaiduImageryProvider();
			layers.push(
				new GetClass({
					style: "img",
					crs: "WGS84"
				})
			);
			break;
		}
		// 腾讯地图-- 电子在线(存在偏移)
		case "tencent-vec": {
			const GetClass = TencentImageryProvider();
			layers.push(new GetClass({}));
			break;
		}
		// 腾讯地图-- 卫星在线(存在偏移)
		case "tencent-img": {
			const GetClass = TencentImageryProvider();
			layers.push(
				new GetClass({
					style: "img"
				})
			);
			break;
		}
	}
	return layers;
}

/**
 * 设置图层
 * @param viewer 地图实例
 * @param layer 图层
 * @param language 语言
 * @param url 地址
 */
export function setImagery(viewer: any, layer: ImageryTypes, language: "zh" | "en", url?: string) {
	clearImagery(viewer);
	const layers = getImageryProvider(layer, language, url);
	if (layers.length > 0) {
		layers.forEach(item => {
			viewer.imageryLayers.addImageryProvider(item);
		});
	}
}

/**
 * 清空图层
 * @param viewer 地图实例
 */
export function clearImagery(viewer: any) {
	viewer.imageryLayers.removeAll();
}

function createTDT(lyr: "img_w" | "vec_w", layer: "img" | "vec", layername: "tdtBasicLayer" | "tdtVecBasicLayer") {
	return new Cesium.WebMapTileServiceImageryProvider({
		url:
			"https://t{s}.tianditu.gov.cn/" +
			lyr +
			"/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=" +
			layer +
			"&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
			getState().tdtToken,
		layer: layername,
		style: "default",
		subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
		format: "tiles",
		tileMatrixSetID: "c",
		maximumLevel: 18
	});
}
function createTDTAnnotation(lyr: "eia_w" | "eva_w" | "cia_w" | "cva_w", layer: "eia" | "eva" | "cia" | "cva") {
	return new Cesium.WebMapTileServiceImageryProvider({
		url:
			"https://t{s}.tianditu.gov.cn/" +
			lyr +
			"/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=" +
			layer +
			"&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&format=tiles&tk=" +
			getState().tdtToken,
		layer: "tdtAnnoLayer",
		style: "default",
		subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
		format: "tiles",
		tileMatrixSetID: "c",
		maximumLevel: 18
	});
}

// 给8位字符串文件名补0
// function zeroFill(num: number, len: number, radix: number) {
// 	let str = num.toString(radix || 10);
// 	while (str.length < len) {
// 		str = "0" + str;
// 	}
// 	return str;
// }
/**
 * 创建arcgis离线瓦片图层
 * @param {*} url http://172.16.32.214:7098/
 * @returns 图层
 */
// function createArcGISOfflineTiles(url?: string) {
// 	if (!url) return;
// 	url = url.endsWith("/") ? url : url + "/";
// 	const arcgis_layer = new Cesium.UrlTemplateImageryProvider({
// 		url: url + "_alllayers/{mz}/{my}/{mx}.png",
// 		tilingScheme: new Cesium.GeographicTilingScheme(),
// 		customTags: {
// 			mz: function (imageryProvider: any, x: number, y: number, level: number) {
// 				return "L" + zeroFill(level + 1, 2, 10);
// 			},
// 			// eslint-disable-next-line
// 			mx: function (imageryProvider: any, x: number, y: number, level: number) {
// 				return "C" + zeroFill(x, 8, 16);
// 			},
// 			// eslint-disable-next-line
// 			my: function (imageryProvider: any, x: number, y: number, level: number) {
// 				return "R" + zeroFill(y, 8, 16);
// 			}
// 		}
// 	});
// 	return arcgis_layer;
// }
