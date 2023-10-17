import { Draw } from "./draw";
import { mapFactory } from "../../factory/map-factory";
import { EventTypeEnum } from "../../../enums/map-enum";
import { PolylineStyle, LabelStyle, PointStyle } from "../config";
import type { MeasureHeightTypes } from "../../../interface/measure";
import { pickPosition } from "../../pick-position";
/**
 * 绘制高度差
 */
export class DrawHeight extends Draw {
	private movePosition: any;
	private labelEntities: any[];
	/**
	 * 绘制线
	 * @param mapUid 地图id
	 * @param type 类型
	 */
	constructor(mapUid: string, type: MeasureHeightTypes) {
		super(mapUid, type);
		this.labelEntities = [];
	}
	/**
	 * 开始绘制
	 */
	start() {
		if (this.isEditing) return;
		// 地图事件、容器等
		this.init();
		this.setStates(true);
		this.coods = [];
		this.labelEntities = [];
	}
	/**
	 * 结束绘制
	 */
	stop() {
		if (!this.isEditing) return;
		// 地图事件、容器等
		this.setStates(false);
		this.clearEvents();
	}
	public clear() {
		this.viewer.entities.remove(this.entity);
		this.entity = null;
		this.clearLabels();
		this.coods = [];
	}
	/**
	 * 销毁
	 */
	public dispose() {
		this.clearEvents();
		this.clear();
	}
	private init() {
		this.addPolyline();
		this.addEvents();
	}
	private addEvents() {
		const viewer = this.viewer;
		const eventFactory = mapFactory.getEvent(this.mapUid);
		this.events.push(
			eventFactory.push(EventTypeEnum.LEFT_CLICK, (event: any) => {
				const worldPosition = pickPosition(this.getPickType(), viewer, event.position);
				if (!Cesium.defined(worldPosition)) {
					return;
				}
				this.coods.push(worldPosition);
				if (this.coods.length === 2) {
					this.stop();
					this.showLabels();
				}
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.MOUSE_MOVE, (event: any) => {
				const worldPosition = pickPosition(this.getPickType(), viewer, event.endPosition);
				if (!Cesium.defined(worldPosition)) {
					return;
				}
				this.movePosition = worldPosition;
			})
		);
	}
	private addPolyline() {
		this.entity = this.viewer.entities.add({
			name: "draw-temp-entity",
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
		const labelEntity = this.viewer.entities.add({
			position: Cesium.Cartesian3.midpoint(this.coods[0], this.coods[1], new Cesium.Cartesian3()),
			point: {
				pixelSize: 6,
				outlineWidth: 2,
				color: PointStyle.color(),
				outlineColor: PointStyle.outlineColor()
			},
			label: {
				show: true,
				showBackground: true,
				font: LabelStyle.font,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				pixelOffset: new Cesium.Cartesian2(0, -10),
				text
			}
		});
		this.labelEntities.push(labelEntity);
	}
	private clearLabels() {
		for (let index = 0; index < this.labelEntities.length; index++) {
			const element = this.labelEntities[index];
			this.viewer.entities.remove(element);
		}
		this.labelEntities = [];
	}
}
