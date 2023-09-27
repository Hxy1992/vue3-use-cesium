import { mapFactory } from "./core/index";
import { getState } from "./core/store";
import { loaderScript } from "./utils/loaderScript";
import { mittBus } from "./utils/mittBus";
import type { MapTypes } from "./types";
import type { App } from "vue";
import BaseMap from "./baseMap/index";
export { setToTarget, setViewType, setVisible, setTools } from "./core/store";

const components = [BaseMap];

export function install(app: App) {
	components.forEach(item => {
		if (item.install!) {
			app.use(item);
		} else if (item.name) {
			app.component(item.name, item);
		}
	});
}

export { BaseMap };
export default {
	install,
	components
};

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
export function initMap(cesiumUrls: string[], options?: MapTypes.MapOptionTypes) {
	return new Promise<boolean>(async (resolve, reject) => {
		try {
			await loaderScript(cesiumUrls);
			mittBus.emit("createBasemap", options);
			resolve(true);
		} catch (err) {
			console.error(err);
			reject(err);
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
