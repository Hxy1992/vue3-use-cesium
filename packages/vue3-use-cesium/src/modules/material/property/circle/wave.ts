import CircleWaveMaterial from "../../shader/circle/wave";
import { defineMaterialWave } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CircleWave
 * @param options
 */
function CircleWaveMaterialProperty(options: { color?: any; speed?: number; count?: number; gradient?: number } = {}) {
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
	this.count = options.count;
	// @ts-ignore
	this.gradient = options.gradient;
}
defineMaterialWave("CircleWave", CircleWaveMaterialProperty, CircleWaveMaterial);

/**
 * Entity材质 - CircleWave
 * @param options
 */
export const CircleWaveProperty = CircleWaveMaterialProperty as Constructable<Parameters<typeof CircleWaveMaterialProperty>[0]>;
