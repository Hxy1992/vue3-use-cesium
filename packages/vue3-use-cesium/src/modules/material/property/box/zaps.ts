import ZippyZapsMaterial from "../../shader/shadertoy/zippy-zaps";
import { defineMaterialSpeed } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - BoxZaps
 * @param options
 */
function BoxZapsMaterialProperty(options: { speed?: number; iResolution?: any } = {}) {
	// @ts-ignore
	this._definitionChanged = new Cesium.Event();
	// @ts-ignore
	this.speed = options.speed;
	// @ts-ignore
	this.iResolution = options.iResolution;
}

defineMaterialSpeed("BoxZaps", BoxZapsMaterialProperty, ZippyZapsMaterial);

/**
 * Entity材质 - BoxZaps
 * @param options
 */
export const BoxZapsProperty = BoxZapsMaterialProperty as Constructable<Parameters<typeof BoxZapsMaterialProperty>[0]>;
