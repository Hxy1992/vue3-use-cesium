import { Draw } from "./draw";
import { cartesianListToLngLat } from "../../transform";
import { mapFactory } from "../../basemap";
import { EventTypeEnum } from "../../../enums/map-enum";
import { pickPosition } from "../../pick-position";

/**
 * 绘制点
 */
export class DrawPoint extends Draw {
	private pointCollection: any;
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
		if (this.coods.length === 0) {
			return this.end();
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
		let lastFeature: any;
		this.events.push(
			eventFactory.push(EventTypeEnum.LEFT_CLICK, (event: any) => {
				const worldPosition = pickPosition(this.getPickType(), viewer, event.position);
				if (!Cesium.defined(worldPosition)) {
					return;
				}
				this.coods.push(worldPosition);
				lastFeature = this.addPoint(worldPosition);
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.LEFT_DOUBLE_CLICK, () => {
				// 双击会触发两次单击，所以需要去掉最后一个点
				this.coods.pop();
				if (lastFeature) {
					this.pointCollection.remove(lastFeature);
					lastFeature = null;
				}
				this.completeEdit();
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.RIGHT_CLICK, () => {
				if (this.coods.length > 0) {
					this.coods.pop();
					const p = this.pointCollection.get(this.pointCollection.length - 1);
					this.pointCollection.remove(p);
				}
			})
		);
	}
	private addPoint(cood: any) {
		return this.pointCollection.add({
			position: cood,
			pixelSize: this.style.point.pixelSize,
			outlineWidth: this.style.point.outlineWidth,
			color: this.style.point.color.withAlpha(0.8),
			outlineColor: this.style.point.outlineColor.withAlpha(0.8)
		});
	}
	private addLayers() {
		this.pointCollection = this.viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
	}
	private clearLayers() {
		this.viewer.scene.primitives.remove(this.pointCollection);
		this.pointCollection = null;
	}
	/**
	 * 销毁
	 */
	public dispose() {
		this.clearEvents();
		this.clearLayers();
	}
}
