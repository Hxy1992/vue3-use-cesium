// 位置拾取

type PositionType = {
	x: number;
	y: number;
	[key: string]: any;
};

/**
 * 拾取位置
 * @param type 类型，Ellipsoid - 椭球面坐标；TerrainSurface - 地形坐标，不包括模型等；ModelSurface - 模型表面坐标
 * @param position 鼠标事件坐标
 */
export function pickPosition(type: "Ellipsoid" | "TerrainSurface" | "ModelSurface", viewer: any, position: PositionType) {
	switch (type) {
		case "Ellipsoid":
			return pickEllipsoid(viewer, position);
		case "TerrainSurface":
			return pickTerrainSurface(viewer, position);
		case "ModelSurface":
			return pickModelSurface(viewer, position);
	}
}

function pickEllipsoid(viewer: any, position: PositionType) {
	return viewer.camera.pickEllipsoid(position, viewer.scene.globe.ellipsoid);
}

function pickTerrainSurface(viewer: any, position: PositionType) {
	if (viewer.scene.mode !== Cesium.SceneMode.SCENE3D || viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider) {
		return pickEllipsoid(viewer, position);
	}
	const ray = viewer.camera.getPickRay(position);
	return viewer.scene.globe.pick(ray, viewer.scene);
}

function pickModelSurface(viewer: any, position: PositionType) {
	if (!viewer.scene.pickPositionSupported) {
		return pickEllipsoid(viewer, position);
	}
	return viewer.scene.pickPosition(position);
}
