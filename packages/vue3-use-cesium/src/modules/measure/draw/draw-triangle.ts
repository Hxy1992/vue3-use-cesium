import { Draw } from "./draw";
import { mapFactory } from "../../basemap";
import { EventTypeEnum } from "../../../enums/map-enum";
import { PolylineStyle, LabelStyle, PointStyle } from "../config";
import type { MeasureTriangleTypes } from "../../../interfaces/measure";
import { pickPosition } from "../../pick-position";
import { cartesianToLngLat } from "../../transform";

/**
 * 绘制三角测量
 */
export class DrawTriangle extends Draw {
	private movePosition: any;
	/**
	 * 绘制线
	 * @param mapUid 地图id
	 * @param type 类型
	 */
	constructor(mapUid: string, type: MeasureTriangleTypes) {
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
	private getLinePositions() {
		if (this.coods.length < 1) return null;
		const start = this.coods[0];
		const end = this.coods.length === 2 ? this.coods[1] : this.movePosition;

		const h1 = cartesianToLngLat(start)?.[2];
		const h2 = cartesianToLngLat(end)?.[2];
		if (h1 === h2) return [start, end];
		let up: any, plane: any, projectPoint: any;
		if (h1 > h2) {
			up = Cesium.Ellipsoid.WGS84.geodeticSurfaceNormal(start, new Cesium.Cartesian3());
			plane = Cesium.Plane.fromPointNormal(start, up);
			projectPoint = Cesium.Plane.projectPointOntoPlane(plane, end, new Cesium.Cartesian3());
			return [start, projectPoint, end, start];
		} else {
			up = Cesium.Ellipsoid.WGS84.geodeticSurfaceNormal(end, new Cesium.Cartesian3());
			plane = Cesium.Plane.fromPointNormal(end, up);
			projectPoint = Cesium.Plane.projectPointOntoPlane(plane, start, new Cesium.Cartesian3());
			return [end, projectPoint, start, end];
		}
	}
	protected addEntities() {
		this.drawLayer.add({
			polyline: {
				show: true,
				positions: new Cesium.CallbackProperty(() => {
					return this.getLinePositions();
				}, false),
				width: PolylineStyle.width,
				material: PolylineStyle.color(),
				clampToGround: false
			}
		});
	}
	private getDistance(p1: any, p2: any) {
		const distance = Cesium.Cartesian3.distance(p1, p2);
		return `${distance.toFixed(2)} 米`;
	}
	private showLabels() {
		const positions = this.getLinePositions();
		if (!positions || positions.length !== 4) return;
		const [p1, p2, p3, p4] = positions;
		// 水平距离
		const vd = this.getDistance(p1, p2);
		this.labelLayer.add({
			position: Cesium.Cartesian3.midpoint(p1, p2, new Cesium.Cartesian3()),
			label: {
				text: `水平距离: ${vd}`
			}
		});
		// 高度差
		const hd = this.getDistance(p2, p3);
		this.labelLayer.add({
			position: Cesium.Cartesian3.midpoint(p2, p3, new Cesium.Cartesian3()),
			label: {
				text: `高度差: ${hd}`
			}
		});
		// 空间距离
		const sd = this.getDistance(p1, p3);
		this.labelLayer.add({
			position: Cesium.Cartesian3.midpoint(p1, p3, new Cesium.Cartesian3()),
			label: {
				text: `空间距离: ${sd}`
			}
		});
	}
}
