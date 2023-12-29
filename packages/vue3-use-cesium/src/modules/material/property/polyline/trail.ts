import PolylineTrailMaterial from "../../shader/polyline/trail";
import { defineMaterialRepeat } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - PolylineTrail
 * @param options
 */
function PolylineTrailMaterialProperty(options: { color?: any; image?: string; speed?: number; repeat?: any } = {}) {
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
	// @ts-ignore
	this.speed = options.speed;
	// @ts-ignore
	this.repeat = options.repeat;
}

defineMaterialRepeat("PolylineTrail", PolylineTrailMaterialProperty, PolylineTrailMaterial);

/**
 * Entity材质 - PolylineTrail
 * @param options
 */
export const PolylineTrailProperty = PolylineTrailMaterialProperty as Constructable<
	Parameters<typeof PolylineTrailMaterialProperty>[0]
>;
