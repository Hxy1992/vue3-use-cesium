// 地图工具函数
import { setViewType, setViewTypeDisabled } from "../utils/store";

/**
 * 设置地图2d/3d模式
 * @param viewer 地图
 * @param type 类型
 */
export function morphMap(viewer: any, type: "2d" | "3d") {
	if (!viewer || viewer.isDestroyed()) return;
	const scene = viewer.scene;
	if (type === "3d") {
		scene.morphTo3D(0);
		scene.screenSpaceCameraController.enableRotate = true;
	} else {
		viewer.scene.morphTo2D(0);
		scene.screenSpaceCameraController.enableRotate = false;
	}
	setViewType(type);
}
/**
 * 二三维切换按钮启用禁用
 * @param disable 是否禁用
 */
export function disableViewType(disable: boolean) {
	setViewTypeDisabled(disable);
}

/**
 * 获取相机高度
 * @param viewer 地图
 * @returns 相机高度
 */
export function getCameraHeight(viewer: any) {
	const camera_height = Math.ceil(viewer.camera.positionCartographic.height); // 相机高度
	return camera_height;
}

/**
 * 缩放
 * @param viewer 地图
 * @param type 类型
 */
export function setZoomInOrOut(viewer: any, type: "zoomIn" | "zoomOut") {
	const maximumZoomDistance = viewer.scene.screenSpaceCameraController.maximumZoomDistance;
	const minimumZoomDistance = viewer.scene.screenSpaceCameraController.minimumZoomDistance;

	const height = getCameraHeight(viewer);
	const multiple = height / 5;
	if (type === "zoomIn") {
		if (height - multiple <= minimumZoomDistance) return;
		viewer.camera.zoomIn(multiple);
	} else {
		if (multiple + height >= maximumZoomDistance) return;
		viewer.camera.zoomOut(multiple);
	}
}

/**
 * 恢复正北方向
 * @param viewer 地图
 */
export function recoverNorth(viewer: any) {
	if (viewer.scene.mode !== Cesium.SceneMode.SCENE2D) {
		const intersection = getCameraEarthIntersection(viewer);
		const rect = viewer.camera.computeViewRectangle(viewer.scene.globe.ellipsoid);
		viewer.camera.flyTo({
			destination: intersection ?? rect ?? viewer.camera.position,
			orientation: {
				heading: Cesium.Math.toRadians(0)
			},
			duration: 2
		});
	}
}
/**
 * 获取当前相机视线方向与地球表面的交点
 * @param {Cesium.Viewer} viewer Cesium Viewer 实例
 * @returns {Cesium.Cartesian3 | undefined} 交点坐标（未找到时返回 undefined）
 */
function getCameraEarthIntersection(viewer: any) {
	const scene = viewer.scene;
	const camera = viewer.camera;
	const cameraCartographic = Cesium.Cartographic.fromCartesian(camera.position);
	const targetHeight = cameraCartographic.height;
	const ray = new Cesium.Ray(
		camera.position,
		camera.direction // 相机正前方方向向量
	);
	const intersection = scene.globe.pick(ray, scene);
	if (!intersection) return undefined;
	const intersectionCartographic = Cesium.Cartographic.fromCartesian(intersection);
	intersectionCartographic.height = targetHeight; // 修改高度

	// 4. 转换回笛卡尔坐标
	return Cesium.Cartesian3.fromRadians(
		intersectionCartographic.longitude,
		intersectionCartographic.latitude,
		intersectionCartographic.height
	);
}

/**
 * 获取zoom层级
 * @param viewer 视图
 * @returns zoom
 */
export function getZoom(viewer: any) {
	let height = viewer.camera.positionCartographic.height;
	let A = 40487.57;
	let B = 0.00007096758;
	let C = 91610.74;
	let D = -40467.74;
	return Math.round(D + (A - D) / (1 + Math.pow(height / C, B)));
}
