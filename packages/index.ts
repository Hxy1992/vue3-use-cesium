import { mapFactory } from "./core/index";
import { getState } from "./core/store";
import { loaderScript } from "./utils/loaderScript";
import { mittBus } from "./utils/mittBus";

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
 * 地图初始化
 * @description 传入cesium的cdn地址，加载js后，创建地图实例
 * @param cesiumJsUrl cesium库js文件地址
 * @param cesiumCssUrl cesium库css文件地址
 */
export function initMap(cesiumJsUrl: string, cesiumCssUrl: string) {
	return new Promise(async (resolve, reject) => {
		try {
			await loaderScript([cesiumJsUrl, cesiumCssUrl]);
			mittBus.emit("createBasemap", null);
			resolve(true);
		} catch (err) {
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
 * @returns void
 */
export function clearMapElements(): void {
	const mapUid = baseMapStore.mapId;
	if (!mapUid) return;
	const viewer = mapFactory.get(mapUid);
	viewer.entities?.removeAll();
	viewer.dataSources?.removeAll();
	// viewer.scene.primitives?.removeAll();
}
