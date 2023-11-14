import { Draw } from "./draw";
import { EventTypeEnum } from "../../../enums/map-enum";
import { PolylineStyle } from "../config";
import type { MeasureHeightTypes } from "../../../interfaces/measure";
import { pickPosition } from "../../pick-position";
/**
 * 绘制高度差
 */
export class DrawHeight extends Draw {
	private movePosition: any;
	/**
	 * 绘制线
	 * @param mapUid 地图id
	 * @param type 类型
	 */
	constructor(mapUid: string, type: MeasureHeightTypes) {
		super(mapUid, type);
	}
	protected addEvents() {
		const viewer = this.viewer;
		this.drawLayer.addEvent(EventTypeEnum.LEFT_CLICK, (event: any) => {
			const worldPosition = pickPosition(this.getPickType(), viewer, event.position);
			if (!Cesium.defined(worldPosition)) {
				return;
			}
			this.coods.push(worldPosition);
			if (this.coods.length === 2) {
				this.stop();
				this.showLabels();
			}
		});
		this.drawLayer.addEvent(EventTypeEnum.MOUSE_MOVE, (event: any) => {
			const worldPosition = pickPosition(this.getPickType(), viewer, event.endPosition);
			if (!Cesium.defined(worldPosition)) {
				return;
			}
			this.movePosition = worldPosition;
		});
	}
	protected addEntities() {
		this.addPolyline();
	}
	private addPolyline() {
		this.drawLayer.add({
			polyline: {
				show: true,
				positions: new Cesium.CallbackProperty(() => {
					return this.coods.length < 1 ? null : [...this.coods, this.movePosition];
				}, false),
				width: PolylineStyle.width,
				material: PolylineStyle.color(),
				clampToGround: false
			}
		});
	}
	private getDistance() {
		const distance = Cesium.Cartesian3.distance(this.coods[0], this.coods[1]);
		return `${distance.toFixed(2)} 米`;
	}
	private showLabels() {
		const text = this.getDistance();
		this.labelLayer.add({
			position: Cesium.Cartesian3.midpoint(this.coods[0], this.coods[1], new Cesium.Cartesian3()),
			label: {
				text
			}
		});
	}
}
