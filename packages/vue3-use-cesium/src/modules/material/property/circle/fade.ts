import CircleFadeMaterial from "../../shader/circle/fade";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CircleFade
 * @param options
 */
function CircleFadeMaterialProperty(options: { color?: any; speed?: number } = {}) {
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
defineMaterialProperty("CircleFade", CircleFadeMaterialProperty, CircleFadeMaterial);

/**
 * Entity材质 - CircleFade
 * @param options
 */
export const CircleFadeProperty = CircleFadeMaterialProperty as Constructable<Parameters<typeof CircleFadeMaterialProperty>[0]>;
