import CircleRotateMaterial from "../../shader/circle/rotate";
import { defineMaterialImage } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CircleRotate
 * @param options
 */
function CircleRotateMaterialProperty(options: { color?: any; image?: string } = {}) {
	// @ts-ignore
	this._definitionChanged = new Cesium.Event();
	// @ts-ignore
	this._color = undefined;
	// @ts-ignore
	this._colorSubscription = undefined;

	// @ts-ignore
	this.color = options.color;
	// @ts-ignore
	this.image = options.image;
}
defineMaterialImage("CircleRotate", CircleRotateMaterialProperty, CircleRotateMaterial);

/**
 * Entity材质 - CircleRotate
 * @param options
 */
export const CircleRotateProperty = CircleRotateMaterialProperty as Constructable<
	Parameters<typeof CircleRotateMaterialProperty>[0]
>;
