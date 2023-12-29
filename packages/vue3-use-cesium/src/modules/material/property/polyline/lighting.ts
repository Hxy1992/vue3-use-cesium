import PolylineLightingMaterial from "../../shader/polyline/lighting";
import { defineMaterialImage } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - PolylineLighting
 * @param options
 */
function PolylineLightingMaterialProperty(options: { color?: any; image?: string } = {}) {
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

defineMaterialImage("PolylineLighting", PolylineLightingMaterialProperty, PolylineLightingMaterial);

/**
 * Entity材质 - PolylineLighting
 * @param options
 */
export const PolylineLightingProperty = PolylineLightingMaterialProperty as Constructable<
	Parameters<typeof PolylineLightingMaterialProperty>[0]
>;
