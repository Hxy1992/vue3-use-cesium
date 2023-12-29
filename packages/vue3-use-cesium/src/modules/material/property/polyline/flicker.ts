import PolylineFlickerMaterial from "../../shader/polyline/flicker";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - PolylineFlicker
 * @param options
 */
function PolylineFlickerMaterialProperty(options: { color?: any; speed?: number } = {}) {
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

defineMaterialProperty("PolylineFlicker", PolylineFlickerMaterialProperty, PolylineFlickerMaterial);

/**
 * Entity材质 - PolylineFlicker
 * @param options
 */
export const PolylineFlickerProperty = PolylineFlickerMaterialProperty as Constructable<
	Parameters<typeof PolylineFlickerMaterialProperty>[0]
>;
