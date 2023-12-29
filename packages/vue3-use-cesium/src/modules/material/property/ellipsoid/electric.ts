import EllipsoidElectricMaterial from "../../shader/ellipsoid/electric";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - EllipsoidElectric
 * @param options
 */
function EllipsoidElectricMaterialProperty(options: { color?: any; speed?: number } = {}) {
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
defineMaterialProperty("EllipsoidElectric", EllipsoidElectricMaterialProperty, EllipsoidElectricMaterial);

/**
 * Entity材质 - EllipsoidElectric
 * @param options
 */
export const EllipsoidElectricProperty = EllipsoidElectricMaterialProperty as Constructable<
	Parameters<typeof EllipsoidElectricMaterialProperty>[0]
>;
