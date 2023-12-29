import WallLineTrailMaterial from "../../shader/wall/line-trail";
import { defineMaterialRepeat } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - WallLineTrail
 * @param options
 */
function WallLineTrailMaterialProperty(options: { color?: any; image?: string; speed?: number; repeat?: any } = {}) {
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

defineMaterialRepeat("WallLineTrail", WallLineTrailMaterialProperty, WallLineTrailMaterial);

/**
 * Entity材质 - WallLineTrail
 * @param options
 */
export const WallLineTrailProperty = WallLineTrailMaterialProperty as Constructable<
	Parameters<typeof WallLineTrailMaterialProperty>[0]
>;
