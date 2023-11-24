/**
 * 获取相机姿态和位置
 * @param viewer
 * @returns 相机姿态和位置
 */
export function getCameraInfo(viewer: any) {
	// 获取当前场景的相机
	const camera = viewer.camera;
	// 获取相机的姿态角度
	const heading = Cesium.Math.toDegrees(camera.heading);
	const pitch = Cesium.Math.toDegrees(camera.pitch);
	const roll = Cesium.Math.toDegrees(camera.roll);
	// 相机位置
	const cartographic = camera.positionCartographic;
	const longitude = Cesium.Math.toDegrees(cartographic.longitude);
	const latitude = Cesium.Math.toDegrees(cartographic.latitude);
	const height = cartographic.height;

	return {
		heading,
		pitch,
		roll,
		longitude,
		latitude,
		height
	};
}
