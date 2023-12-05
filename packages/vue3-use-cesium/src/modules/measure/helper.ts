/**
 * 线性插值
 * @param start 起点
 * @param end 站点
 * @param num 插值数
 * @returns 插值后点数组
 */
export function lerp(start: any, end: any, num = 5) {
	let lerpPositions = [];
	let c1 = Cesium.Cartographic.fromCartesian(start);
	let c2 = Cesium.Cartographic.fromCartesian(end);
	for (let i = 0; i < num; i++) {
		let lng = Cesium.Math.lerp(c1.longitude, c2.longitude, i / num);
		let lat = Cesium.Math.lerp(c1.latitude, c2.latitude, i / num);
		let alt = c1.height - (c1.height - c2.height) * (i / num);
		lerpPositions.push(Cesium.Cartesian3.fromRadians(lng, lat, alt));
	}
	return lerpPositions;
}

/**
 * 计算高程
 * @param viewer 地图实例
 * @param positions 位置数组
 * @param includeModel 是否包括模型
 * @param objectsToExclude 排除元素
 * @returns Promise
 */
export function getSampledHeight(viewer: any, positions: any[], includeModel = false, objectsToExclude?: any[]) {
	let terrainPromise =
		viewer.terrainProvider && !(viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider)
			? Cesium.sampleTerrainMostDetailed(
					viewer.terrainProvider,
					positions.map(item => Cesium.Cartographic.fromCartesian(item))
			  )
			: Promise.resolve(positions.map(item => Cesium.Cartographic.fromCartesian(item)));

	let modelPromise =
		viewer.scene.clampToHeightSupported && includeModel
			? viewer.scene.clampToHeightMostDetailed(positions, objectsToExclude)
			: Promise.resolve(positions);

	return Promise.all([terrainPromise, modelPromise]);
}

/**
 *
 * @param p0
 * @param p1
 * @param p2
 * @returns {number}
 * @private
 */
function triangleArea(p0: any, p1: any, p2: any) {
	let v0 = Cesium.Cartesian3.subtract(p0, p1, new Cesium.Cartesian3());
	let v1 = Cesium.Cartesian3.subtract(p2, p1, new Cesium.Cartesian3());
	let cross = Cesium.Cartesian3.cross(v0, v1, v0);
	return Cesium.Cartesian3.magnitude(cross) * 0.5;
}

/**
 * 计算空间面积
 * @param positions Cartesian3数组
 * @returns 面积
 */
export function calcArea(positions: any[]) {
	let result = 0;
	if (!Array.isArray(positions)) {
		return result;
	}
	let geometry = Cesium.CoplanarPolygonGeometry.createGeometry(
		Cesium.CoplanarPolygonGeometry.fromPositions({
			positions: positions,
			vertexFormat: Cesium.VertexFormat.POSITION_ONLY
		})
	);
	if (!geometry) {
		return result;
	}
	let flatPositions = geometry.attributes.position.values;
	let indices = geometry.indices;
	for (let i = 0; i < indices.length; i += 3) {
		let p0 = Cesium.Cartesian3.unpack(flatPositions, indices[i] * 3, new Cesium.Cartesian3());
		let p1 = Cesium.Cartesian3.unpack(flatPositions, indices[i + 1] * 3, new Cesium.Cartesian3());
		let p2 = Cesium.Cartesian3.unpack(flatPositions, indices[i + 2] * 3, new Cesium.Cartesian3());
		result += triangleArea(p0, p1, p2);
	}
	return result;
}
