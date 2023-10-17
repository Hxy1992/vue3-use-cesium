import { Draw } from "./draw";
import { mapFactory } from "../../basemap";
import { EventTypeEnum } from "../../../enums/map-enum";
import { PolygonStyle, PolylineStyle, LabelStyle, PointStyle } from "../config";
import type { MeasureAreaTypes } from "../../../interfaces/measure";
import { pickPosition } from "../../pick-position";
import { calcArea } from "../helper";
/**
 * 绘制多边形
 */
export class DrawPolygon extends Draw {
	private movePosition: any;
	private labelEntity: any;
	/**
	 * 绘制多边形
	 * @param mapUid 地图id
	 * @param type 类型
	 */
	constructor(mapUid: string, type: MeasureAreaTypes) {
		super(mapUid, type);
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
		this.viewer.entities.remove(this.labelEntity);
		this.entity = null;
		this.labelEntity = null;
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
		this.addPolygon();
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
		this.events.push(
			eventFactory.push(EventTypeEnum.LEFT_DOUBLE_CLICK, () => {
				// 双击会触发两次单击，所以需要去掉最后一个点
				this.coods.pop();
				this.stop();

				// 结束显示面积
				this.showArea();
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.RIGHT_CLICK, () => {
				if (this.coods.length > 0) {
					this.coods.pop();
				} else {
					this.stop();
				}
			})
		);
	}
	private showArea() {
		if (this.coods.length > 2) {
			const position = Cesium.BoundingSphere.fromPoints(this.coods)?.center;
			const text = `面积：${calcArea(this.coods).toFixed(2)} 平方米`;
			this.addLabel(position, text);
		}
	}
	private addPolygon() {
		this.entity = this.viewer.entities.add({
			name: "draw-temp-entity",
			polyline: {
				show: true,
				positions: new Cesium.CallbackProperty(() => {
					return this.coods.length < 1 ? null : [...this.coods, this.movePosition];
				}, false),
				width: PolylineStyle.width,
				material: PolylineStyle.color(),
				clampToGround: this.clampToGround
			},
			polygon: {
				hierarchy: new Cesium.CallbackProperty(() => {
					return this.coods.length >= 2 ? new Cesium.PolygonHierarchy([...this.coods, this.movePosition]) : null;
				}, false),
				material: PolygonStyle.color(),
				outlineWidth: 0,
				perPositionHeight: !this.clampToGround && (this.type === "TerrainSurfaceArea" || this.type === "ModelSurfaceArea")
			}
		});
	}
	private addLabel(position: any, text: string) {
		this.labelEntity = this.viewer.entities.add({
			position: position,
			point: {
				pixelSize: 6,
				outlineWidth: 2,
				color: PointStyle.color(),
				outlineColor: PointStyle.outlineColor(),
				clampToGround: this.clampToGround
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
		return this.labelEntity;
	}
}
