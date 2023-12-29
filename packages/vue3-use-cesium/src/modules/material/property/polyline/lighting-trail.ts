import PolylineLightingTrailMaterial from "../../shader/polyline/lighting-trail";
import { defineMaterialImageSpeed } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - PolylineLightingTrail
 * @param options
 */
function PolylineLightingTrailMaterialProperty(options: { color?: any; image?: string; speed?: number } = {}) {
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
}

defineMaterialImageSpeed("PolylineLightingTrail", PolylineLightingTrailMaterialProperty, PolylineLightingTrailMaterial);

/**
 * Entity材质 - PolylineLightingTrail
 * @param options
 */
export const PolylineLightingTrailProperty = PolylineLightingTrailMaterialProperty as Constructable<
	Parameters<typeof PolylineLightingTrailMaterialProperty>[0]
>;
