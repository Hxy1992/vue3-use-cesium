import { Draw } from "./draw";
import { EventTypeEnum } from "../../../enums/map-enum";
import { pickPosition } from "../../pick-position";
import { calcArea } from "../helper";
/**
 * 绘制多边形
 */
export class DrawPolygon extends Draw {
	private movePosition: any;

	protected addEvents() {
		const viewer = this.viewer;
		this.drawLayer.addEvent(EventTypeEnum.LEFT_CLICK, (event: any) => {
			const worldPosition = pickPosition(this.getPickType(), viewer, event.position);
			if (!Cesium.defined(worldPosition)) {
				return;
			}
			this.coods.push(worldPosition);
		});
		this.drawLayer.addEvent(EventTypeEnum.MOUSE_MOVE, (event: any) => {
			const worldPosition = pickPosition(this.getPickType(), viewer, event.endPosition);
			if (!Cesium.defined(worldPosition)) {
				return;
			}
			this.movePosition = worldPosition;
		});
		this.drawLayer.addEvent(EventTypeEnum.LEFT_DOUBLE_CLICK, () => {
			// 双击会触发两次单击，所以需要去掉最后一个点
			this.coods.pop();
			this.stop();

			// 结束显示面积
			this.showArea();
		});
		this.drawLayer.addEvent(EventTypeEnum.RIGHT_CLICK, () => {
			if (this.coods.length > 0) {
				this.coods.pop();
			} else {
				this.stop();
			}
		});
	}
	protected addEntities() {
		this.addPolygon();
	}
	private showArea() {
		if (this.coods.length > 2) {
			const position = Cesium.BoundingSphere.fromPoints(this.coods)?.center;
			const text = `面积：${calcArea(this.coods).toFixed(2)} 平方米`;
			this.addLabel(position, text);
		}
	}
	private addPolygon() {
		this.drawLayer.add({
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
				perPositionHeight: !this.clampToGround && (this.type === "TerrainSurfaceArea" || this.type === "ModelSurfaceArea")
			}
		});
	}
	private addLabel(position: any, text: string) {
		return this.labelLayer.add({
			position,
			point: {
				clampToGround: this.clampToGround
			},
			label: {
				text
			}
		});
	}
}
