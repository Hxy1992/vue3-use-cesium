import CircleVaryMaterial from "../../shader/circle/vary";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CircleVary
 * @param options
 */
function CircleVaryMaterialProperty(options: { color?: any; speed?: number } = {}) {
	// @ts-ignore
	this._definitionChanged = new Cesium.Event();
	// @ts-ignore
	this._color = undefined;
	// @ts-ignore
	this._colorSubscription = undefined;

	// @ts-ignore
	this.color = options.color;
	// @ts-ignore
	this.speed = options.speed;
}
defineMaterialProperty("CircleVary", CircleVaryMaterialProperty, CircleVaryMaterial);

/**
 * Entity材质 - CircleVary
 * @param options
 */
export const CircleVaryProperty = CircleVaryMaterialProperty as Constructable<Parameters<typeof CircleVaryMaterialProperty>[0]>;
