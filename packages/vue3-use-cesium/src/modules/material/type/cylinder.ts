import CylinderFadeMaterial from "../shader/cylinder/fade";
import CylinderParticlesMaterial from "../shader/cylinder/particles";

/**
 * CylinderFade
 */
export function createCylinderFade(options: { color?: any } = {}) {
	const { color } = options;
	return new Cesium.Material({
		fabric: {
			type: "CylinderFadeType",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7)
			},
			source: CylinderFadeMaterial
		},
		translucent: function () {
			return true;
		}
	});
}

/**
 * CylinderParticles
 */
export function createCylinderParticles(options: { color?: any; image?: number } = {}) {
	const { color, image } = options;
	return new Cesium.Material({
		fabric: {
			type: "CylinderParticlesType",
			uniforms: {
				color: color ?? new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				image: image ?? Cesium.Material.DefaultImageId
			},
			source: CylinderParticlesMaterial
		},
		translucent: function () {
			return true;
		}
	});
}
