import CylinderParticlesMaterial from "../../shader/cylinder/particles";
import { defineMaterialImage } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CylinderParticles
 * @param options
 */
function CylinderParticlesMaterialProperty(options: { color?: any; image?: string } = {}) {
	// @ts-ignore
	this._definitionChanged = new Cesium.Event();
	// @ts-ignore
	this._color = undefined;
	// @ts-ignore
	this._colorSubscription = undefined;

	// @ts-ignore
	this.color = options.color;
	// @ts-ignore
	this.image = options.image;
}
defineMaterialImage("CylinderParticles", CylinderParticlesMaterialProperty, CylinderParticlesMaterial);

/**
 * Entity材质 - CylinderParticles
 * @param options
 */
export const CylinderParticlesProperty = CylinderParticlesMaterialProperty as Constructable<
	Parameters<typeof CylinderParticlesMaterialProperty>[0]
>;
