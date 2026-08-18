import { mapFactory } from "../../basemap";
import type { PlotTypes, PlotCallBackType, PlotCesiumStyle } from "../../../interfaces/plot";
import { setStartStates as _setStartStates, setEndStates as _setEndStates, clearEventFactoryEvents, getPlotPickType } from "../../shared/draw-helpers";
import type { EditContext } from "../../shared/draw-helpers";

export abstract class Draw {
	protected isEditing: boolean;
	protected viewer: any;
	protected mapUid: string;
	protected entity: any;
	protected coods: any[];
	protected callback: PlotCallBackType;
	protected events: any[];
	protected type: PlotTypes;
	protected clampToGround: boolean;
	protected style: PlotCesiumStyle;
	constructor(
		mapUid: string,
		type: PlotTypes,
		callback: PlotCallBackType,
		clampToGround: boolean = false,
		style: PlotCesiumStyle
	) {
		this.isEditing = false;
		this.viewer = mapFactory.get(mapUid);
		this.mapUid = mapUid;
		this.type = type;
		this.coods = [];
		this.events = [];
		this.callback = callback;
		this.clampToGround = clampToGround;
		this.style = style;
	}
	abstract start(coods: any[]): void;
	abstract end(): void;
	protected setStartStates() {
		_setStartStates(this as unknown as EditContext, "crosshair");
	}
	protected setEndStates() {
		_setEndStates(this as unknown as EditContext);
	}
	protected cursorStyle(cursor: "default" | "crosshair") {
		this.viewer.container.style.cursor = cursor;
	}
	protected clearEvents() {
		clearEventFactoryEvents(this.mapUid, this.events);
	}
	protected getPickType(): "Ellipsoid" | "TerrainSurface" | "ModelSurface" {
		return getPlotPickType(this.type) as "Ellipsoid" | "TerrainSurface" | "ModelSurface";
	}
	abstract dispose(): void;
}
