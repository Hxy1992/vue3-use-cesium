// 底图图层管理
import type { MapTypes } from "../types";

/**
 * 设置图层
 * @param viewer 地图实例
 * @param layer 图层
 * @param language 语言
 * @param url 链接
 */
export async function setImagery(viewer: any, layer: MapTypes.ImageryTypes, language: "zh" | "en", url?: string) {
	clearImagery(viewer);
	// 增加缓存数量
	// viewer.scene.globe.tileCacheSize = 600;
	// viewer.scene.globe.loadingDescendantLimit = 600;
	// viewer.scene.globe.preloadSiblings = true;
	// viewer.scene.globe.preloadAncestors = true;
	switch (layer) {
		// 天地图-- 影像在线
		case "tdt-img": {
			// viewer.scene.globe.maximumScreenSpaceError = 1.8;
			const imageryProvider = createTDT("img_w", "img", "tdtBasicLayer");
			const imageryAnnotation = language === "en" ? createTDTAnnotation("eia_w", "eia") : createTDTAnnotation("cia_w", "cia");
			viewer.imageryLayers.addImageryProvider(imageryProvider);
			viewer.imageryLayers.addImageryProvider(imageryAnnotation);
			break;
		}
		// 天地图-- 电子在线
		case "tdt-vec": {
			// viewer.scene.globe.maximumScreenSpaceError = 1.4;
			const imageryProvider = createTDT("vec_w", "vec", "tdtVecBasicLayer");
			const imageryAnnotation = language === "en" ? createTDTAnnotation("eva_w", "eva") : createTDTAnnotation("cva_w", "cva");
			viewer.imageryLayers.addImageryProvider(imageryProvider);
			viewer.imageryLayers.addImageryProvider(imageryAnnotation);
			viewer.scene.imageryLayers.get(1).minificationFilter = Cesium.TextureMinificationFilter.NEAREST;
			viewer.scene.imageryLayers.get(1).magnificationFilter = Cesium.TextureMagnificationFilter.NEAREST;
			break;
		}
		// tms离线瓦片
		case "tms-offline": {
			const tms = new Cesium.UrlTemplateImageryProvider({
				url: `${url}/{z}/{x}/{y}.png`
			});
			viewer.imageryLayers.addImageryProvider(tms);
			break;
		}
		// osm标准地图
		case "osm-normal": {
			viewer.imageryLayers.addImageryProvider(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
					subdomains: ["a", "b", "c"]
				})
			);
			break;
		}
		// arcgis在线-colour(存在偏移)
		case "geoq-colour": {
			viewer.imageryLayers.addImageryProvider(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
				})
			);
			break;
		}
		// arcgis在线-gray(存在偏移)
		case "geoq-gray": {
			viewer.imageryLayers.addImageryProvider(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}"
				})
			);
			break;
		}
		// arcgis在线-Midnightblue(存在偏移)
		case "geoq-midnightblue": {
			viewer.imageryLayers.addImageryProvider(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
				})
			);
			break;
		}
		// carto-darkall
		case "carto-darkall": {
			viewer.imageryLayers.addImageryProvider(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
				})
			);
			break;
		}
		// carto-lightall
		case "carto-lightall": {
			viewer.imageryLayers.addImageryProvider(
				new Cesium.UrlTemplateImageryProvider({
					url: "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
				})
			);
			break;
		}
		// 无底图
		case "empty": {
			viewer.imageryLayers.removeAll();
			break;
		}
		default: {
			viewer.imageryLayers.removeAll();
			break;
		}
	}
}

/**
 * 清空图层
 * @param viewer 地图实例
 */
export function clearImagery(viewer: any) {
	viewer.imageryLayers.removeAll();
}

export function createTDT(lyr: "img_w" | "vec_w", layer: "img" | "vec", layername: "tdtBasicLayer" | "tdtVecBasicLayer") {
	return new Cesium.WebMapTileServiceImageryProvider({
		url:
			"https://t{s}.tianditu.gov.cn/" +
			lyr +
			"/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=" +
			layer +
			"&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=231e5d4a9a917e53a383d3d591a1ed12",
		layer: layername,
		style: "default",
		subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
		format: "tiles",
		tileMatrixSetID: "c",
		maximumLevel: 18
	});
}
export function createTDTAnnotation(lyr: "eia_w" | "eva_w" | "cia_w" | "cva_w", layer: "eia" | "eva" | "cia" | "cva") {
	return new Cesium.WebMapTileServiceImageryProvider({
		url:
			"https://t{s}.tianditu.gov.cn/" +
			lyr +
			"/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=" +
			layer +
			"&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&format=tiles&tk=231e5d4a9a917e53a383d3d591a1ed12",
		layer: "tdtAnnoLayer",
		style: "default",
		subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
		format: "tiles",
		tileMatrixSetID: "c",
		maximumLevel: 18
	});
}

// 给8位字符串文件名补0
function zeroFill(num: number, len: number, radix: number) {
	let str = num.toString(radix || 10);
	while (str.length < len) {
		str = "0" + str;
	}
	return str;
}
/**
 * 创建arcgis离线瓦片图层
 * @param {*} url http://172.16.32.214:7098/
 * @returns 图层
 */
export function createArcGISOfflineTiles(url?: string) {
	if (!url) return;
	url = url.endsWith("/") ? url : url + "/";
	const arcgis_layer = new Cesium.UrlTemplateImageryProvider({
		url: url + "_alllayers/{mz}/{my}/{mx}.png",
		tilingScheme: new Cesium.GeographicTilingScheme(),
		customTags: {
			mz: function (imageryProvider: any, x: number, y: number, level: number) {
				return "L" + zeroFill(level + 1, 2, 10);
			},
			// eslint-disable-next-line
			mx: function (imageryProvider: any, x: number, y: number, level: number) {
				return "C" + zeroFill(x, 8, 16);
			},
			// eslint-disable-next-line
			my: function (imageryProvider: any, x: number, y: number, level: number) {
				return "R" + zeroFill(y, 8, 16);
			}
		}
	});
	return arcgis_layer;
}
