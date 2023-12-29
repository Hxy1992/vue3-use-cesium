import RadarLineMaterial from "../../shader/radar/line";
import { defineMaterialProperty } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - RadarLine
 * @param options
 */
function RadarLineMaterialProperty(options: { color?: any; speed?: number } = {}) {
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

defineMaterialProperty("RadarLine", RadarLineMaterialProperty, RadarLineMaterial);

/**
 * Entity材质 - RadarLine
 * @param options
 */
export const RadarLineProperty = RadarLineMaterialProperty as Constructable<Parameters<typeof RadarLineMaterialProperty>[0]>;
