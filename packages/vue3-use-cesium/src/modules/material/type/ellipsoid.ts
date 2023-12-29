import EllipsoidElectricMaterial from "../shader/ellipsoid/electric";
import EllipsoidTrailMaterial from "../shader/ellipsoid/trail";

/**
 * Primitive材质 - EllipsoidElectric
 */
export function createEllipsoidElectric(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "EllipsoidElectricType",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 1
			},
			source: EllipsoidElectricMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - EllipsoidTrail
 */
export function createEllipsoidTrail(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "EllipsoidTrailType",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0
			},
			source: EllipsoidTrailMaterial
		},
		translucent: function () {
			return true;
		}
	});
}
