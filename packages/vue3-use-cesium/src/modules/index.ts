import { mapFactory } from "../modules/basemap";
import { getState } from "../utils/store";
import { loaderScript } from "../utils/loader-script";
import { mittBus } from "../utils/mitt-bus";
import type { MapOptionTypes } from "../interfaces/map";
export { setToTarget, setViewType, setVisible, setViewTypeDisabled, getState } from "../utils/store";
export * from "./plot";
export { toGeoJson, cartesianToLngLat, cartesianListToLngLat, LngLatListTocartesian } from "./transform";
export * from "./terrain";
export * from "./measure";
export * from "./layer";
export * as Material from "./material";
export * from "./popup";
export * from "./camera";
export { morphMap } from "./util";
import { BusEnum } from "../enums/bus-enum";

const baseMapStore = getState();

/**
 * 获取Cesium的viewer实例
 * @returns viewer
 */
export function getViewer() {
	if (!baseMapStore.mapId) return null;
	return mapFactory.get(baseMapStore.mapId);
}
/**
 * 获取事件管理EventFactory
 * @returns EventFactory
 */
export function getEventFactory() {
	if (!baseMapStore.mapId) return null;
	return mapFactory.getEvent(baseMapStore.mapId);
}
/**
 * 地图初始化
 * @description 按需加载cesium库js和css文件，创建并返回地图实例
 * @param cesiumUrls cesium库js, css文件地址
 * @param options 配置参数
 * @returns Promise
 */
export function initMap(cesiumUrls: string[], options?: MapOptionTypes) {
	return new Promise<boolean>(async (resolve, reject) => {
		try {
			await loaderScript(cesiumUrls);
			mittBus.emit(BusEnum.StartCreateBaseMap, options);
			resolve(true);
		} catch (err) {
			console.error(err);
			reject(err);
		}
	});
}

/**
 * 清空地图事件(mapFactory中事件)
 */
export function clearMapEvents(): void {
	const mapUid = baseMapStore.mapId;
	if (!mapUid) return;
	const events = mapFactory.getEvent(mapUid);
	events.clear();
}
/**
 * 清空viewer中entities和dataSources
 */
export function clearMapElements(): void {
	const mapUid = baseMapStore.mapId;
	if (!mapUid) return;
	const viewer = mapFactory.get(mapUid);
	viewer.entities?.removeAll();
	viewer.dataSources?.removeAll();
}
