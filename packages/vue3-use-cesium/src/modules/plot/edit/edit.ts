import { mapFactory } from "../../basemap";
import type { PlotTypes, PlotCesiumStyle, PlotCallBackType } from "../../../interfaces/plot";
import type { CoodinateType } from "../../../interfaces/types";
import { setStartStates as _setStartStates, setEndStates as _setEndStates, clearEventFactoryEvents, getPlotPickType } from "../../shared/draw-helpers";
import type { EditContext } from "../../shared/draw-helpers";

export abstract class Edit {
	protected isEditing: boolean;
	protected viewer: any;
	protected mapUid: string;
	protected entity: any;
	protected coods: any[];
	protected events: any[];
	protected type: PlotTypes;
	protected clampToGround: boolean;
	protected style: PlotCesiumStyle;
	protected callback: PlotCallBackType;
	constructor(
		mapUid: string,
		type: PlotTypes,
		clampToGround: boolean = false,
		style: PlotCesiumStyle,
		callback: PlotCallBackType
	) {
		this.isEditing = false;
		this.viewer = mapFactory.get(mapUid);
		this.mapUid = mapUid;
		this.type = type;
		this.coods = [];
		this.events = [];
		this.clampToGround = clampToGround;
		this.style = style;
		this.callback = callback;
	}
	abstract start(coods: CoodinateType[], zoomTo?: boolean): void;
	abstract end(): void;
	protected setStartStates() {
		_setStartStates(this as unknown as EditContext, "move");
	}
	protected setEndStates() {
		_setEndStates(this as unknown as EditContext);
	}
	protected cursorStyle(cursor: "default" | "crosshair" | "move") {
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
