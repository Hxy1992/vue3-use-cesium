import CircleScanMaterial from "../../shader/circle/scan-material";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CircleScan
 * @param options
 */
function CircleScanMaterialProperty(options: { color?: any; speed?: number } = {}) {
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
defineMaterialProperty("CircleScan", CircleScanMaterialProperty, CircleScanMaterial);

/**
 * Entity材质 - CircleScan
 * @param options
 */
export const CircleScanProperty = CircleScanMaterialProperty as Constructable<Parameters<typeof CircleScanMaterialProperty>[0]>;
