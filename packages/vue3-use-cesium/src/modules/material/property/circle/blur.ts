import CircleBlurMaterial from "../../shader/circle/blur";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CircleBlur
 * @param options
 */
function CircleBlurMaterialProperty(options: { color?: any; speed?: number } = {}) {
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

defineMaterialProperty("CircleBlur", CircleBlurMaterialProperty, CircleBlurMaterial);

/**
 * Entity材质 - CircleBlur
 * @param options
 */
export const CircleBlurProperty = CircleBlurMaterialProperty as Constructable<Parameters<typeof CircleBlurMaterialProperty>[0]>;
