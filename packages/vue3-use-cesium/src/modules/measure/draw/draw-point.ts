import { Draw } from "./draw";
import { EventTypeEnum } from "../../../enums/map-enum";
import { pickPosition } from "../../pick-position";

/**
 * 绘制点
 */
export class DrawPoint extends Draw {
	protected addEvents() {
		const viewer = this.viewer;
		this.drawLayer.addEvent(EventTypeEnum.LEFT_CLICK, (event: any) => {
			const worldPosition = pickPosition(this.getPickType(), viewer, event.position);
			if (!Cesium.defined(worldPosition)) {
				return;
			}
			this.addPoint(worldPosition);
			this.stop();
		});
	}
	protected addEntities() {}
	private addPoint(position: any) {
		const cartographic = Cesium.Cartographic.fromCartesian(position);
		const lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(8);
		const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(8);
		if (typeof lng !== "string" || typeof lat !== "string") {
			return;
		}
		const x = Number(lng) > 0 ? `${lng}E` : `${Math.abs(Number(lng))}W`;
		const y = Number(lat) > 0 ? `${lat}N` : `${Math.abs(Number(lat))}S`;
		this.drawLayer.add({
			position,
			point: {
				pixelSize: this.style.point.pixelSize,
				outlineWidth: this.style.point.outlineWidth,
				color: this.style.point.color,
				outlineColor: this.style.point.outlineColor,
				clampToGround: this.clampToGround
			},
			label: {
				show: true,
				showBackground: true,
				font: this.style.label.font,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				pixelOffset: new Cesium.Cartesian2(0, -10),
				text: `经度: ${x}\n纬度: ${y}\n高程: ${cartographic.height.toFixed(2)}米`
			}
		});
	}
}
