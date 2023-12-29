import WallDiffuseMaterial from "../shader/wall/diffuse";
import WallImageTrailMaterial from "../shader/wall/image-trail";
import WallLineTrailMaterial from "../shader/wall/line-trail";
import WallTrailMaterial from "../shader/wall/trail";

/**
 * Primitive材质 - WallDiffuse
 */
export function createWallDiffuse(options: { color?: any } = {}) {
	const { color } = options;
	return new Cesium.Material({
		fabric: {
			type: "WallDiffuse",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7)
			},
			source: WallDiffuseMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - WallImageTrail
 */
export function createWallImageTrail(options: { color?: any; image?: string; speed?: number; repeat?: any } = {}) {
	const { color, image, speed, repeat } = options;
	return new Cesium.Material({
		fabric: {
			type: "WallImageTrail",
			uniforms: {
				image: image ?? Cesium.Material.DefaultImageId,
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: speed ?? 3.0,
				repeat: repeat ?? new Cesium.Cartesian2(1, 1)
			},
			source: WallImageTrailMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 *  Primitive材质 - WallLineTrail
 */
export function createWallLineTrail(options: { color?: any; image?: string; speed?: number; repeat?: any } = {}) {
	const { color, image, speed, repeat } = options;
	return new Cesium.Material({
		fabric: {
			type: "WallLineTrail",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				image: image ?? Cesium.Material.DefaultImageId,
				repeat: repeat ?? new Cesium.Cartesian2(1, 1),
				speed: speed ?? 3.0
			},
			source: WallLineTrailMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * Primitive材质 - WallTrail
 */
export function createWallTrail(options: { color?: any; image?: string; speed?: number } = {}) {
	const { color, image, speed } = options;
	return new Cesium.Material({
		fabric: {
			type: "WallTrail",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				image: image ?? Cesium.Material.DefaultImageId,
				speed: speed ?? 1
			},
			source: WallTrailMaterial
		},
		translucent: function () {
			return true;
		}
	});
}
