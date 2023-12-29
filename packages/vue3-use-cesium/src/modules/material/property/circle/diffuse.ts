import CircleDiffuseMaterial from "../../shader/circle/diffuse";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CircleDiffuse
 * @param options
 */
function CircleDiffuseMaterialProperty(options: { color?: any; speed?: number } = {}) {
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
defineMaterialProperty("CircleDiffuse", CircleDiffuseMaterialProperty, CircleDiffuseMaterial);

/**
 * Entity材质 - CircleDiffuse
 * @param options
 */
export const CircleDiffuseProperty = CircleDiffuseMaterialProperty as Constructable<
	Parameters<typeof CircleDiffuseMaterialProperty>[0]
>;
