import CirclePulseMaterial from "../../shader/circle/pulse";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CirclePulse
 * @param options
 */
function CirclePulseMaterialProperty(options: { color?: any; speed?: number } = {}) {
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
defineMaterialProperty("CirclePulse", CirclePulseMaterialProperty, CirclePulseMaterial);

/**
 * Entity材质 - CirclePulse
 * @param options
 */
export const CirclePulseProperty = CirclePulseMaterialProperty as Constructable<
	Parameters<typeof CirclePulseMaterialProperty>[0]
>;
