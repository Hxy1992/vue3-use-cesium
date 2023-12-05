// import czm_cellular from '../shader/thirdpart/cellular.glsl'
// import czm_snoise from '../shader/thirdpart/snoise.glsl'
import AsphaltMaterial from "../shader/thirdpart/asphalt";
import BlobMaterial from "../shader/thirdpart/blob";
import BrickMaterial from "../shader/thirdpart/brick";
import CementMaterial from "../shader/thirdpart/cement";
import ErosionMaterial from "../shader/thirdpart/erosion";
import FacetMaterial from "../shader/thirdpart/facet";
import FresnelMaterial from "../shader/thirdpart/fresnel";
import GrassMaterial from "../shader/thirdpart/grass";
import ReflectionMaterial from "../shader/thirdpart/reflection";
import RefractionMaterial from "../shader/thirdpart/refraction";
import TieDyeMaterial from "../shader/thirdpart/tie-dye";
import WoodMaterial from "../shader/thirdpart/wood";

// Cesium.ShaderSource._czmBuiltinsAndUniforms.czm_cellular = czm_cellular
// Cesium.ShaderSource._czmBuiltinsAndUniforms.czm_snoise = czm_snoise

/**
 * Asphalt
 */
export function createAsphalt() {
	return new Cesium.Material({
		fabric: {
			type: "Asphalt",
			uniforms: {
				asphaltColor: new Cesium.Color(0.15, 0.15, 0.15, 1.0),
				bumpSize: 0.02,
				roughness: 0.2
			},
			source: AsphaltMaterial
		},
		translucent: function (material: any) {
			return material.uniforms.asphaltColor.alpha < 1.0;
		}
	});
}

/**
 * Blob
 */
export function createBlob() {
	return new Cesium.Material({
		fabric: {
			type: "Blob",
			uniforms: {
				lightColor: new Cesium.Color(1.0, 1.0, 1.0, 0.5),
				darkColor: new Cesium.Color(0.0, 0.0, 1.0, 0.5),
				frequency: 10.0
			},
			source: BlobMaterial
		},
		translucent: function (material: any) {
			const uniforms = material.uniforms;
			return uniforms.lightColor.alpha < 1.0 || uniforms.darkColor.alpha < 0.0;
		}
	});
}

/**
 * Brick
 */
export function createBrick() {
	return new Cesium.Material({
		fabric: {
			type: "Brick",
			uniforms: {
				brickColor: new Cesium.Color(0.6, 0.3, 0.1, 1.0),
				mortarColor: new Cesium.Color(0.8, 0.8, 0.7, 1.0),
				brickSize: new Cesium.Cartesian2(0.3, 0.15),
				brickPct: new Cesium.Cartesian2(0.9, 0.85),
				brickRoughness: 0.2,
				mortarRoughness: 0.1
			},
			source: BrickMaterial
		},
		translucent: function (material: any) {
			const uniforms = material.uniforms;
			return uniforms.brickColor.alpha < 1.0 || uniforms.mortarColor.alpha < 1.0;
		}
	});
}

/**
 * Cement
 */
export function createCement() {
	return new Cesium.Material({
		fabric: {
			type: "Cement",
			uniforms: {
				cementColor: new Cesium.Color(0.95, 0.95, 0.85, 1.0),
				grainScale: 0.01,
				roughness: 0.3
			},
			source: CementMaterial
		},
		translucent: function (material: any) {
			return material.uniforms.cementColor.alpha < 1.0;
		}
	});
}

/**
 * Erosion
 */
export function createErosion() {
	return new Cesium.Material({
		fabric: {
			type: "Erosion",
			uniforms: {
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
				time: 1.0
			},
			source: ErosionMaterial
		},
		translucent: function (material: any) {
			return material.uniforms.color.alpha < 1.0;
		}
	});
}

/**
 * Facet
 */
export function createFacet() {
	return new Cesium.Material({
		fabric: {
			type: "Facet",
			uniforms: {
				lightColor: new Cesium.Color(0.25, 0.25, 0.25, 0.75),
				darkColor: new Cesium.Color(0.75, 0.75, 0.75, 0.75),
				frequency: 10.0
			},
			source: FacetMaterial
		},
		translucent: function (material: any) {
			const uniforms = material.uniforms;
			return uniforms.lightColor.alpha < 1.0 || uniforms.darkColor.alpha < 0.0;
		}
	});
}

/**
 * Fresnel
 */
export function createFresnel() {
	return new Cesium.Material({
		fabric: {
			type: "Fresnel",
			materials: {
				reflection: {
					type: "Reflection"
				},
				refraction: {
					type: "Refraction"
				}
			},
			source: FresnelMaterial
		},
		translucent: false
	});
}

/**
 * Grass
 */
export function createGrass() {
	return new Cesium.Material({
		fabric: {
			type: "Grass",
			uniforms: {
				grassColor: new Cesium.Color(0.25, 0.4, 0.1, 1.0),
				dirtColor: new Cesium.Color(0.1, 0.1, 0.1, 1.0),
				patchiness: 1.5
			},
			source: GrassMaterial
		},
		translucent: function (material: any) {
			const uniforms = material.uniforms;
			return uniforms.grassColor.alpha < 1.0 || uniforms.dirtColor.alpha < 1.0;
		}
	});
}

/**
 * Reflection
 */
export function createReflection() {
	return new Cesium.Material({
		fabric: {
			type: "Reflection",
			uniforms: {
				cubeMap: Cesium.Material.DefaultCubeMapId,
				channels: "rgb"
			},
			source: ReflectionMaterial
		},
		translucent: false
	});
}

/**
 * Refraction
 */
export function createRefraction() {
	return new Cesium.Material({
		fabric: {
			type: "Refraction",
			uniforms: {
				cubeMap: Cesium.Material.DefaultCubeMapId,
				channels: "rgb",
				indexOfRefractionRatio: 0.9
			},
			source: RefractionMaterial
		},
		translucent: false
	});
}

/**
 * TieDye
 */
export function createTieDye() {
	return new Cesium.Material({
		fabric: {
			type: "TieDye",
			uniforms: {
				lightColor: new Cesium.Color(1.0, 1.0, 0.0, 0.75),
				darkColor: new Cesium.Color(1.0, 0.0, 0.0, 0.75),
				frequency: 5.0
			},
			source: TieDyeMaterial
		},
		translucent: function (material: any) {
			const uniforms = material.uniforms;
			return uniforms.lightColor.alpha < 1.0 || uniforms.darkColor.alpha < 0.0;
		}
	});
}

/**
 * Wood
 * @type {string}
 */
export function createWood() {
	return new Cesium.Material({
		fabric: {
			type: "Wood",
			uniforms: {
				lightWoodColor: new Cesium.Color(0.6, 0.3, 0.1, 1.0),
				darkWoodColor: new Cesium.Color(0.4, 0.2, 0.07, 1.0),
				ringFrequency: 3.0,
				noiseScale: new Cesium.Cartesian2(0.7, 0.5),
				grainFrequency: 27.0
			},
			source: WoodMaterial
		},
		translucent: function (material: any) {
			let uniforms = material.uniforms;
			return uniforms.lightWoodColor.alpha < 1.0 || uniforms.darkWoodColor.alpha < 1.0;
		}
	});
}
