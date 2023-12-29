import PolylineFlowMaterial from "../../shader/polyline/flow";
import { defineMaterialPercent } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - PolylineFlow
 * @param options
 */
function PolylineFlowMaterialProperty(options: { color?: any; speed?: number; percent?: number; gradient?: number } = {}) {
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
	// @ts-ignore
	this.percent = options.percent;
	// @ts-ignore
	this.gradient = options.gradient;
}

defineMaterialPercent("PolylineFlow", PolylineFlowMaterialProperty, PolylineFlowMaterial);

/**
 * Entity材质 - PolylineFlow
 * @param options
 */
export const PolylineFlowProperty = PolylineFlowMaterialProperty as Constructable<
	Parameters<typeof PolylineFlowMaterialProperty>[0]
>;
