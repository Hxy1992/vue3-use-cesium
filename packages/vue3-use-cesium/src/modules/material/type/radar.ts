import RadarLineMaterial from "../shader/radar/line";
import RadarSweepMaterial from "../shader/radar/sweep";
import RadarWaveMaterial from "../shader/radar/wava";

/**
 * Primitive材质 - RadarLine
 */
export function createRadarLine(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "RadarLine",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0
			},
			source: RadarLineMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - RadarSweep
 */
export function createRadarSweep(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "RadarSweep",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0
			},
			source: RadarSweepMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - RadarWave
 */
export function createRadarWave(options: { color?: any; speed?: number } = {}) {
	const { color, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "RadarWave",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0
			},
			source: RadarWaveMaterial
		},
		translucent: function () {
			return true;
		}
	});
}
