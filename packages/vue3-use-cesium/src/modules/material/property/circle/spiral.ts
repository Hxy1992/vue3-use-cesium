import CircleSpiralMaterial from "../../shader/circle/spiral";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CircleSpiral
 * @param options
 */
function CircleSpiralMaterialProperty(options: { color?: any; speed?: number } = {}) {
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
defineMaterialProperty("CircleSpiral", CircleSpiralMaterialProperty, CircleSpiralMaterial);

/**
 * Entity材质 - CircleSpiral
 * @param options
 */
export const CircleSpiralProperty = CircleSpiralMaterialProperty as Constructable<
	Parameters<typeof CircleSpiralMaterialProperty>[0]
>;
