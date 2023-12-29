import CircleRingMaterial from "../../shader/circle/ring";
import { defineMaterialColor } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CircleRing
 * @param options
 */
function CircleRingMaterialProperty(options: { color?: any } = {}) {
	// @ts-ignore
	this._definitionChanged = new Cesium.Event();
	// @ts-ignore
	this._color = undefined;
	// @ts-ignore
	this._colorSubscription = undefined;

	// @ts-ignore
	this.color = options.color;
}
defineMaterialColor("CircleRing", CircleRingMaterialProperty, CircleRingMaterial);

/**
 * Entity材质 - CircleRing
 * @param options
 */
export const CircleRingProperty = CircleRingMaterialProperty as Constructable<Parameters<typeof CircleRingMaterialProperty>[0]>;
