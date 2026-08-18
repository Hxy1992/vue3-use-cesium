import { mapFactory } from "../../basemap";
import type { MeasureCesiumStyle, MeasureTypes } from "../../../interfaces/measure";
import { LayerFactory, Layer } from "../../layer";
import { setStartStates as _setStartStates, setEndStates as _setEndStates, getMeasurePickType } from "../../shared/draw-helpers";
import type { EditContext } from "../../shared/draw-helpers";

export abstract class Draw {
	protected isEditing: boolean;
	protected viewer: any;
	protected mapUid: string;
	protected coods: any[];
	protected type: MeasureTypes;
	protected clampToGround: boolean;
	protected layerFactory: LayerFactory;
	protected labelLayer: Layer;
	protected drawLayer: Layer;
	protected style: MeasureCesiumStyle;
	constructor(mapUid: string, type: MeasureTypes, clampToGround: boolean = false, style: MeasureCesiumStyle) {
		this.isEditing = false;
		this.viewer = mapFactory.get(mapUid);
		this.mapUid = mapUid;
		this.type = type;
		this.coods = [];
		this.clampToGround = clampToGround;
		this.style = style;
		this.layerFactory = new LayerFactory();
		this.labelLayer = this.layerFactory.addLayer("draw-temp-label", {
			point: {
				pixelSize: this.style.point.pixelSize,
				outlineWidth: this.style.point.outlineWidth,
				color: this.style.point.color,
				outlineColor: this.style.point.outlineColor
			},
			label: {
				show: true,
				showBackground: true,
				font: this.style.label.font,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				pixelOffset: new Cesium.Cartesian2(0, -10)
			}
		});
		this.drawLayer = this.layerFactory.addLayer("draw-temp-entity");
	}
	public start() {
		if (this.isEditing) return;
		this.clear();
		this.clearEvents();
		this.addEntities();
		this.addEvents();
		this.setStates(true);
	}
	protected abstract addEvents(): void;
	protected abstract addEntities(): void;
	public stop() {
		if (!this.isEditing) return;
		this.setStates(false);
		this.clearEvents();
	}
	public clear() {
		this.drawLayer.removeAll();
		this.labelLayer.removeAll();
		this.coods = [];
	}
	public dispose() {
		this.stop();
		this.drawLayer.dispose();
		this.labelLayer.dispose();
		this.coods = [];
	}
	protected setStates(isStart: boolean) {
		if (isStart) {
			_setStartStates(this as unknown as EditContext, "crosshair");
		} else {
			_setEndStates(this as unknown as EditContext);
		}
	}
	protected cursorStyle(cursor: "default" | "crosshair") {
		this.viewer.container.style.cursor = cursor;
	}
	protected clearEvents() {
		this.labelLayer.removeAllEvent();
		this.drawLayer.removeAllEvent();
	}
	protected getPickType(): "Ellipsoid" | "TerrainSurface" | "ModelSurface" {
		return getMeasurePickType(this.type) as "Ellipsoid" | "TerrainSurface" | "ModelSurface";
	}
}
