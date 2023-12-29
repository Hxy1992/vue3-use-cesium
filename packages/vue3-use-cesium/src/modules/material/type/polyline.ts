import LineFlickerMaterial from "../shader/polyline/flicker";
import LineFlowMaterial from "../shader/polyline/flow";
import LineImageTrailMaterial from "../shader/polyline/image-trail";
import LineLightingMaterial from "../shader/polyline/lighting";
import LineLightingTrailMaterial from "../shader/polyline/lighting-trail";
import LineTrailMaterial from "../shader/polyline/trail";

/**
 * Primitive材质 - PolylineFlicker
 */
export function createPolylineFlicker(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "PolylineFlicker",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 1
			},
			source: LineFlickerMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - PolylineFlow
 */
export function createPolylineFlow(options: { color?: any; speed?: number; percent?: number; gradient?: number } = {}) {
	const { color, speed, percent, gradient } = options;
	return new Cesium.Material({
		fabric: {
			type: "PolylineFlow",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 1,
				percent: percent ?? 0.03,
				gradient: gradient ?? 0.1
			},
			source: LineFlowMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - PolylineImageTrail
 */
export function createPolylineImageTrail(options: { color?: any; image?: string; speed?: number; repeat?: any } = {}) {
	const { color, image, speed, repeat } = options;
	return new Cesium.Material({
		fabric: {
			type: "PolylineImageTrail",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				image: image ?? Cesium.Material.DefaultImageId,
				speed: speed ?? 1,
				repeat: repeat ?? new Cesium.Cartesian2(1, 1)
			},
			source: LineImageTrailMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - PolylineLighting
 */
export function createPolylineLighting(options: { color?: any; image?: string } = {}) {
	const { color, image } = options;
	return new Cesium.Material({
		fabric: {
			type: "PolylineLighting",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				image: image ?? Cesium.Material.DefaultImageId
			},
			source: LineLightingMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - PolylineLightingTrail
 */
export function createPolylineLightingTrail(options: { color?: any; image?: string; speed?: number } = {}) {
	const { color, image, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "PolylineLightingTrail",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				image: image ?? Cesium.Material.DefaultImageId,
				speed: speed ?? 3.0
			},
			source: LineLightingTrailMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - PolylineTrail
 */
export function createPolylineTrail(options: { color?: any; image?: string; speed?: number; repeat?: any } = {}) {
	const { color, image, speed, repeat } = options;
	return new Cesium.Material({
		fabric: {
			type: "PolylineTrail",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				image: image ?? Cesium.Material.DefaultImageId,
				speed: speed ?? 1,
				repeat: repeat ?? new Cesium.Cartesian2(1, 1)
			},
			source: LineTrailMaterial
		},
		translucent: function () {
			return true;
		}
	});
}
