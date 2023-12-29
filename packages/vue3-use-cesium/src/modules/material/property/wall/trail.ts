import WallTrailMaterial from "../../shader/wall/trail";
import { defineMaterialImageSpeed } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - WallTrail
 * @param options
 */
function WallTrailMaterialProperty(options: { color?: any; image?: string; speed?: number } = {}) {
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
}

defineMaterialImageSpeed("WallTrail", WallTrailMaterialProperty, WallTrailMaterial);

/**
 * Entity材质 - WallTrail
 * @param options
 */
export const WallTrailProperty = WallTrailMaterialProperty as Constructable<Parameters<typeof WallTrailMaterialProperty>[0]>;
