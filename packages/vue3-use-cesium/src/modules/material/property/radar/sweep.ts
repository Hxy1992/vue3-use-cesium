import RadarSweepMaterial from "../../shader/radar/sweep";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - RadarSweep
 * @param options
 */
function RadarSweepMaterialProperty(options: { color?: any; speed?: number } = {}) {
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

defineMaterialProperty("RadarSweep", RadarSweepMaterialProperty, RadarSweepMaterial);

/**
 * Entity材质 - RadarSweep
 * @param options
 */
export const RadarSweepProperty = RadarSweepMaterialProperty as Constructable<Parameters<typeof RadarSweepMaterialProperty>[0]>;
