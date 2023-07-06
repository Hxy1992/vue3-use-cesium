// 地图工具函数

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
		const rect = viewer.camera.computeViewRectangle(viewer.scene.globe.ellipsoid);
		if (rect) {
			viewer.camera.flyTo({
				destination: rect,
				orientation: {
					heading: Cesium.Math.toRadians(0)
				},
				duration: 2
			});
		} else {
			viewer.camera.flyTo({
				destination: viewer.camera.position,
				orientation: {
					heading: Cesium.Math.toRadians(0)
				},
				duration: 2
			});
		}
	}
}
