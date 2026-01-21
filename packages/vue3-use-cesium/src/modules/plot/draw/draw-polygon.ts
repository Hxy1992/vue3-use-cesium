import { Draw } from "./draw";
import { cartesianListToLngLat } from "../../transform";
import { mapFactory } from "../../basemap";
import { EventTypeEnum } from "../../../enums/map-enum";
import { pickPosition } from "../../pick-position";
/**
 * 绘制多边形
 */
export class DrawPolygon extends Draw {
	private movePosition: any;
	/**
	 * 开始绘制
	 */
	start() {
		if (this.isEditing) return;
		// 地图事件、容器等
		this.init();
		this.setStartStates();
		this.coods = [];
	}
	/**
	 * 结束绘制
	 */
	end() {
		if (!this.isEditing) return;
		// 地图事件、容器等
		this.setEndStates();
		this.dispose();
		this.callback(null);
		this.coods = [];
	}
	/**
	 * 完成编辑（双击）
	 */
	private completeEdit() {
		if (this.coods.length < 3) {
			return;
		}
		this.setEndStates();
		this.dispose();
		this.callback(cartesianListToLngLat(this.coods));
		this.coods = [];
	}
	private init() {
		this.addLayers();
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
				this.completeEdit();
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.RIGHT_CLICK, () => {
				if (this.coods.length > 0) {
					this.coods.pop();
				}
			})
		);
	}
	private addLayers() {
		this.entity = this.viewer.entities.add({
			name: "draw-temp-entity",
			polyline: {
				show: true,
				positions: new Cesium.CallbackProperty(() => {
					return this.coods.length < 1 ? null : [...this.coods, this.movePosition];
				}, false),
				width: this.style.polyline.width,
				material: this.style.polyline.color,
				clampToGround: this.clampToGround
			},
			polygon: {
				hierarchy: new Cesium.CallbackProperty(() => {
					return this.coods.length >= 2 ? new Cesium.PolygonHierarchy([...this.coods, this.movePosition]) : null;
				}, false),
				material: this.style.polygon.color,
				outlineWidth: 0,
				perPositionHeight: !this.clampToGround && (this.type === "ModelSurfacePolygon" || this.type === "TerrainSurfacePolygon")
			}
		});
	}
	private clearLayers() {
		this.viewer.entities.remove(this.entity);
		this.entity = null;
	}
	/**
	 * 销毁
	 */
	public dispose() {
		this.clearEvents();
		this.clearLayers();
	}
}
