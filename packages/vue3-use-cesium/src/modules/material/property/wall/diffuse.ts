import WallDiffuseMaterial from "../../shader/wall/diffuse";
import { defineMaterialColor } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - WallDiffuse
 * @param options
 */
function WallDiffuseMaterialProperty(options: { color?: any } = {}) {
	// @ts-ignore
	this._definitionChanged = new Cesium.Event();
	// @ts-ignore
	this._color = undefined;
	// @ts-ignore
	this._colorSubscription = undefined;

	// @ts-ignore
	this.color = options.color;
}
defineMaterialColor("WallDiffuse", WallDiffuseMaterialProperty, WallDiffuseMaterial);

/**
 * Entity材质 - WallDiffuse
 * @param options
 */
export const WallDiffuseProperty = WallDiffuseMaterialProperty as Constructable<
	Parameters<typeof WallDiffuseMaterialProperty>[0]
>;
