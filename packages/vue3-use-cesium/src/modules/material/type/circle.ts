import CircleBlurMaterial from "../shader/circle/blur";
import CircleDiffuseMaterial from "../shader/circle/diffuse";
import CircleFadeMaterial from "../shader/circle/fade";
import CirclePulseMaterial from "../shader/circle/pulse";
import CircleRingMaterial from "../shader/circle/ring";
import CircleRotateMaterial from "../shader/circle/rotate";
import CircleScanMaterial from "../shader/circle/scan-material";
import CircleSpiralMaterial from "../shader/circle/spiral";
import CircleVaryMaterial from "../shader/circle/vary";
import CircleWaveMaterial from "../shader/circle/wave";

/**
 * Primitive材质 - CircleBlur
 */
export function createCircleBlur(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "CircleBlur",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0
			},
			source: CircleBlurMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - CircleDiffuse
 */
export function createCircleDiffuse(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "CircleDiffuse",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0
			},
			source: CircleDiffuseMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - CircleFade
 */
export function createCircleFade(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "CircleFade",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0
			},
			source: CircleFadeMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - CirclePulse
 */
export function createCirclePulse(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "CirclePulse",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 12.0
			},
			source: CirclePulseMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - CircleRing
 */
export function createCircleRing(options: { color?: any } = {}) {
	const { color } = options;
	return new Cesium.Material({
		fabric: {
			type: "CircleRing",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7)
			},
			source: CircleRingMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - CircleRotate
 */
export function createCircleRotate(options: { color?: any; image?: string } = {}) {
	const { color, image } = options;
	return new Cesium.Material({
		fabric: {
			type: "CircleRotate",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				image: image ?? Cesium.Material.DefaultImageId
			},
			source: CircleRotateMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - CircleScan
 */
export function createCircleScan(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "CircleScan",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 1
			},
			source: CircleScanMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - CircleSpiral
 */
export function createCircleSpiral(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "CircleSpiral",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0
			},
			source: CircleSpiralMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - CircleVary
 */
export function createCircleVary(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "CircleVary",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0
			},
			source: CircleVaryMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - CircleWave
 */
export function createCircleWave(options: { color?: any; speed?: number; count?: number; gradient?: number } = {}) {
	const { color, speed, count, gradient } = options;
	return new Cesium.Material({
		fabric: {
			type: "CircleWave",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0,
				count: count ?? 1,
				gradient: gradient ?? 0.1
			},
			source: CircleWaveMaterial
		},
		translucent: function () {
			return true;
		}
	});
}
