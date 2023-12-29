import RadarWaveMaterial from "../../shader/radar/wava";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - RadarWave
 * @param options
 */
function RadarWaveMaterialProperty(options: { color?: any; speed?: number } = {}) {
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

defineMaterialProperty("RadarWave", RadarWaveMaterialProperty, RadarWaveMaterial);

/**
 * Entity材质 - RadarWave
 * @param options
 */
export const RadarWaveProperty = RadarWaveMaterialProperty as Constructable<Parameters<typeof RadarWaveMaterialProperty>[0]>;
