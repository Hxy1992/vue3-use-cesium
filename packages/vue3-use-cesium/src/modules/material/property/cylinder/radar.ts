import CylinderRadarMaterial from "../../shader/cylinder/radar";
import { defineMaterialRadar } from "../helper";
import type { Constructable } from "../helper";

/**
 * Entity材质 - CylinderRadar
 * @param options
 */
function CylinderRadarMaterialProperty(
	options: { color?: any; repeat?: number; offset?: number; thickness?: number; duration?: number } = {}
) {
	// @ts-ignore
	this.opts = {
		color: Cesium.Color.CYAN,
		duration: 2000,
		time: new Date().getTime(),
		repeat: 30,
		offset: 0,
		thickness: 0.3
	};
	// @ts-ignore
	this.opts = Object.assign(this.opts, options);
	// @ts-ignore
	this._definitionChanged = new Cesium.Event();
	// @ts-ignore
	this._color = undefined;
	// @ts-ignore
	this._colorSubscription = undefined;
	// @ts-ignore
	this._time = Date.now();

	// @ts-ignore
	this.color = this.opts.color;
	// @ts-ignore
	this.repeat = this.opts.repeat;
	// @ts-ignore
	this.offset = this.opts.offset;
	// @ts-ignore
	this.thickness = this.opts.thickness;
	// @ts-ignore
	this.duration = this.opts.duration;
}
defineMaterialRadar("CylinderRadar", CylinderRadarMaterialProperty, CylinderRadarMaterial);

/**
 * Entity材质 - CylinderRadar
 * @param options
 */
export const CylinderRadarProperty = CylinderRadarMaterialProperty as Constructable<
	Parameters<typeof CylinderRadarMaterialProperty>[0]
>;
