import { Draw } from "./draw";
import { mapFactory } from "../../basemap";
import { EventTypeEnum } from "../../../enums/map-enum";
import { pickPosition } from "../../pick-position";
import { lerp, getSampledHeight } from "../helper";
/**
 * 绘制线
 */
export class DrawPolyline extends Draw {
	private movePosition: any;
	/**
	 * 总长度
	 */
	private distanceSum: number = 0;

	protected addEvents() {
		const viewer = this.viewer;
		const eventFactory = mapFactory.getEvent(this.mapUid);
		this.drawLayer.addEvent(EventTypeEnum.LEFT_CLICK, (event: any) => {
			const worldPosition = pickPosition(this.getPickType(), viewer, event.position);
			if (!Cesium.defined(worldPosition)) {
				return;
			}
			this.coods.push(worldPosition);
			this.drawDistance();
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
			this.removeLastIndexOfLabels();
			this.stop();
		});
		this.drawLayer.addEvent(EventTypeEnum.RIGHT_CLICK, () => {
			if (this.coods.length > 0) {
				this.coods.pop();
				this.removeLastIndexOfLabels();
			}
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
				width: this.style.polyline.width,
				material: this.style.polyline.color,
				clampToGround: this.clampToGround
			}
		});
	}
	// 绘制距离测量结果
	private drawDistance() {
		if (this.coods.length < 2) {
			if (this.coods.length === 1) this.addLabel(this.coods[0], "起点");
			this.distanceSum = 0;
			return;
		}
		if (this.clampToGround) {
			this.addClampGroundLabel();
		} else {
			this.addSpaceLabel();
		}
	}
	// 贴地距离
	private addClampGroundLabel() {
		const start = this.coods[this.coods.length - 2];
		const end = this.coods[this.coods.length - 1];
		// 插值
		const lerpInters = lerp(start, end);
		const lerpPositions = [start, ...lerpInters, end];
		const label = this.addLabel(end, "计算中");
		const allLabels = this.labelLayer.getAllEntities();
		const drawEntity = this.drawLayer.getAllEntities()[0];
		getSampledHeight(this.viewer, lerpPositions, this.type === "ModelSurfaceDistance", [...allLabels, drawEntity])
			.then(([updatedCartographics, updatedCartesians]) => {
				return updatedCartographics.map((item: any, index: number) =>
					Cesium.Cartesian3.fromDegrees(
						Cesium.Math.toDegrees(item.longitude),
						Cesium.Math.toDegrees(item.latitude),
						Math.max(
							item.height || 0,
							updatedCartesians[index] ? Cesium.Cartographic.fromCartesian(updatedCartesians[index]).height : 0
						)
					)
				);
			})
			.then(positions => {
				let sum = 0;
				for (let i = 0; i < positions.length - 1; i++) {
					let s = Cesium.Cartesian3.distance(positions[i], positions[i + 1]);
					sum += s;
				}
				this.distanceSum += sum;
				const text = this.getDistanceText(sum);
				label.label.text = text;
			});
	}
	// 不贴地距离
	private addSpaceLabel() {
		const start = this.coods[this.coods.length - 2];
		const end = this.coods[this.coods.length - 1];
		const distance = Cesium.Cartesian3.distance(start, end);
		this.distanceSum += distance;
		const text = this.getDistanceText(distance);
		this.addLabel(end, text);
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
	private removeLastIndexOfLabels() {
		this.labelLayer.popEntity();
	}
	private getDistanceText(distance: number) {
		if (this.distanceSum > distance) {
			const sum =
				this.distanceSum > 1000
					? `合计：${(this.distanceSum / 1000).toFixed(2)} 公里\n`
					: `合计：${this.distanceSum.toFixed(2)} 米\n`;
			const step = distance > 1000 ? `+ (${(distance / 1000).toFixed(2)} 公里)` : `+ (${distance.toFixed(2)} 米)`;
			return sum + step;
		} else {
			return distance > 1000 ? `${(distance / 1000).toFixed(2)} 公里` : `${distance.toFixed(2)} 米`;
		}
	}
}
