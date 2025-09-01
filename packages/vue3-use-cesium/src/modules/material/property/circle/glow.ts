import GlowCircleMaterial from "../../shader/shadertoy/glow-circle";
import { defineMaterialResolution } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - GlowCircle
 * @param options
 */
function GlowCircleMaterialProperty(options: { speed?: number; iResolution?: any; backgroundColor?: any } = {}) {
	// @ts-ignore
	this._definitionChanged = new Cesium.Event();
	// @ts-ignore
	this.speed = options.speed;
	// @ts-ignore
	this.iResolution = options.iResolution;
	// @ts-ignore
	this.backgroundColor = options.backgroundColor;
}

defineMaterialResolution("GlowCircle", GlowCircleMaterialProperty, GlowCircleMaterial);

/**
 * Entity材质 - GlowCircle
 * @param options
 */
export const GlowCircleProperty = GlowCircleMaterialProperty as Constructable<Parameters<typeof GlowCircleMaterialProperty>[0]>;
