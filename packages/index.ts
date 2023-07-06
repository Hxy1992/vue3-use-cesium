import { mapFactory } from "./core/index";
import { getState } from "./core/store";
import { loaderScript } from "./utils/loaderScript";
import { mittBus } from "./utils/mittBus";
import { MapTypes } from "vue3-use-cesium/types";

export { default as BaseMap } from "./baseMap/index.vue";
export { setToTarget, setViewType, setVisible, setTools } from "./core/store";

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
export function initMap(cesiumUrls: string[], options?: MapTypes.mapOptionInterface) {
	return new Promise<boolean>(async (resolve, reject) => {
		try {
			await loaderScript(cesiumUrls);
			mittBus.emit("createBasemap", options);
			resolve(true);
		} catch (err) {
			console.error(err);
			reject(false);
		}
	});
}

/**
 * 清空地图事件
 * @returns void
 */
export function clearMapEvents(): void {
	const mapUid = baseMapStore.mapId;
	if (!mapUid) return;
	const events = mapFactory.getEvent(mapUid);
	events.clear();
}
/**
 * 清空地图元素
 * @description primitives需另外自行清空
 * @returns void
 */
export function clearMapElements(): void {
	const mapUid = baseMapStore.mapId;
	if (!mapUid) return;
	const viewer = mapFactory.get(mapUid);
	viewer.entities?.removeAll();
	viewer.dataSources?.removeAll();
}
