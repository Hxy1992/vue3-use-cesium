import EllipsoidTrailMaterial from "../../shader/ellipsoid/trail";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - EllipsoidTrail
 * @param options
 */
function EllipsoidTrailMaterialProperty(options: { color?: any; speed?: number } = {}) {
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
defineMaterialProperty("EllipsoidTrail", EllipsoidTrailMaterialProperty, EllipsoidTrailMaterial);

/**
 * Entity材质 - EllipsoidTrail
 * @param options
 */
export const EllipsoidTrailProperty = EllipsoidTrailMaterialProperty as Constructable<
	Parameters<typeof EllipsoidTrailMaterialProperty>[0]
>;
