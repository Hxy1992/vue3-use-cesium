import { Draw } from "./draw";
import { EventTypeEnum } from "../../../enums/map-enum";
import type { MeasurePositionTypes } from "../../../interfaces/measure";
import { pickPosition } from "../../pick-position";
import { LabelStyle, PointStyle } from "../config";

/**
 * 绘制点
 */
export class DrawPoint extends Draw {
	/**
	 * 绘制点
	 * @param mapUid 地图id
	 * @param type 类型
	 * @param callback 成功回调
	 */
	constructor(mapUid: string, type: MeasurePositionTypes) {
		super(mapUid, type);
	}
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
				text: `经度: ${x}\n纬度: ${y}\n高程: ${cartographic.height.toFixed(2)}米`
			}
		});
	}
}
