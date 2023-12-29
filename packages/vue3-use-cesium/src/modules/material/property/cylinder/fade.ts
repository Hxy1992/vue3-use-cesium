import CylinderFadeMaterial from "../../shader/cylinder/fade";
import { defineMaterialColor } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CylinderFade
 * @param options
 */
function CylinderFadeMaterialProperty(options: { color?: any } = {}) {
	// @ts-ignore
	this._definitionChanged = new Cesium.Event();
	// @ts-ignore
	this._color = undefined;
	// @ts-ignore
	this._colorSubscription = undefined;

	// @ts-ignore
	this.color = options.color;
}
defineMaterialColor("CylinderFade", CylinderFadeMaterialProperty, CylinderFadeMaterial);

/**
 * Entity材质 - CylinderFade
 * @param options
 */
export const CylinderFadeProperty = CylinderFadeMaterialProperty as Constructable<
	Parameters<typeof CylinderFadeMaterialProperty>[0]
>;
