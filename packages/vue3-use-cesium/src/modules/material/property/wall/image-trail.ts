import WallImageTrailMaterial from "../../shader/wall/image-trail";
import { defineMaterialRepeat } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - WallImageTrail
 * @param options
 */
function WallImageTrailMaterialProperty(options: { color?: any; image?: string; speed?: number; repeat?: any } = {}) {
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
	// @ts-ignore
	this.repeat = options.repeat;
}

defineMaterialRepeat("WallImageTrail", WallImageTrailMaterialProperty, WallImageTrailMaterial);

/**
 * Entity材质 - WallImageTrail
 * @param options
 */
export const WallImageTrailProperty = WallImageTrailMaterialProperty as Constructable<
	Parameters<typeof WallImageTrailMaterialProperty>[0]
>;
