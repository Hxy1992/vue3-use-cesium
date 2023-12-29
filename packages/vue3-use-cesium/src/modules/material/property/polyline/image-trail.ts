import PolylineImageTrailMaterial from "../../shader/polyline/image-trail";
import { defineMaterialRepeat } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - PolylineImageTrail
 * @param options
 */
function PolylineImageTrailMaterialProperty(options: { color?: any; image?: string; speed?: number; repeat?: any } = {}) {
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

defineMaterialRepeat("PolylineImageTrail", PolylineImageTrailMaterialProperty, PolylineImageTrailMaterial);

/**
 * Entity材质 - PolylineImageTrail
 * @param options
 */
export const PolylineImageTrailProperty = PolylineImageTrailMaterialProperty as Constructable<
	Parameters<typeof PolylineImageTrailMaterialProperty>[0]
>;
