import { Edit } from "./edit";
import { cartesianListToLngLat, LngLatListTocartesian } from "../../transform";
import { mapFactory } from "../../basemap";
import { EventTypeEnum } from "../../../enums/map-enum";
import { PolylineStyle, EditPointStyle } from "../config";
import type { CoodinateType, PlotTypes } from "../../../interfaces/plot";
import { pickPosition } from "../../pick-position";

/**
 * 编辑线
 */
export class EditPolyline extends Edit {
	pointEntities: any[];
	tempMiddleEntities: any[];
	/**
	 * 编辑多边形
	 * @param mapUid 地图id
	 * @param type 类型
	 */
	constructor(mapUid: string, type: PlotTypes) {
		super(mapUid, type);
		this.pointEntities = [];
		this.tempMiddleEntities = [];
	}
	/**
	 * 开始编辑
	 * @param coods 坐标数组
	 */
	start(coods: CoodinateType[]) {
		if (this.isEditing) return;
		if (coods.length < 2) return;
		// 地图事件、容器等
		this.coods = LngLatListTocartesian(coods);
		this.init();
		this.setStartStates();
		this.viewer.zoomTo(this.viewer.entities);
	}
	/**
	 * 结束编辑
	 * @returns 坐标数组
	 */
	end(): CoodinateType[] | null {
		if (!this.isEditing) return null;
		// 地图事件、容器等
		this.setEndStates();
		this.dispose();
		return cartesianListToLngLat(this.coods);
	}
	private init() {
		this.addLayers();
		this.addEvents();
	}
	private addEvents() {
		const viewer = this.viewer;
		const eventFactory = mapFactory.getEvent(this.mapUid);
		let isMouseDown = false;
		let pickIndex: any = null;
		this.events.push(
			eventFactory.push(EventTypeEnum.LEFT_DOWN, (event: any) => {
				const pick = viewer.scene.pick(event.position);
				if (Cesium.defined(pick)) {
					// 正式点编辑
					if (pick.id.name === EditPointStyle.LayerName) {
						isMouseDown = true;
						pickIndex = pick.id.index;
						this.viewer.scene.screenSpaceCameraController.enableInputs = false; // 禁止相机移动
					} else if (pick.id.name === EditPointStyle.TempLayerName) {
						// 临时中点编辑
						const rindex = this.replaceAndInsert(pick.id);
						isMouseDown = true;
						pickIndex = rindex;
						this.viewer.scene.screenSpaceCameraController.enableInputs = false; // 禁止相机移动
					}
				}
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.MOUSE_MOVE, (event: any) => {
				// 鼠标样式
				const pick = viewer.scene.pick(event.endPosition);
				if (
					Cesium.defined(pick) &&
					(pick.id.name === EditPointStyle.LayerName || pick.id.name === EditPointStyle.TempLayerName)
				) {
					this.cursorStyle("move");
				} else {
					this.cursorStyle("default");
				}
				// 编辑操作
				if (!isMouseDown || pickIndex === null) return;
				const worldPosition = pickPosition(this.getPickType(), viewer, event.endPosition);
				if (!Cesium.defined(worldPosition)) {
					return;
				}
				if (this.coods[pickIndex]) {
					this.coods[pickIndex] = worldPosition;
				}
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.LEFT_UP, () => {
				if (isMouseDown && pickIndex !== null) this.viewer.scene.screenSpaceCameraController.enableInputs = true; // 禁止相机移动
				isMouseDown = false;
				pickIndex = null;
			})
		);
	}
	private addLayers() {
		this.entity = this.viewer.entities.add({
			name: "draw-temp-entity",
			polyline: {
				show: true,
				positions: new Cesium.CallbackProperty(() => {
					return this.coods;
				}, false),
				width: PolylineStyle.width,
				material: PolylineStyle.color(),
				clampToGround: this.clampToGround
			}
		});
		for (let index = 0; index < this.coods.length; index++) {
			this.addEditPoint(index);
		}
		this.initTempMiddle();
	}
	private addEditPoint(index: number) {
		const p = this.viewer.entities.add({
			name: EditPointStyle.LayerName,
			index,
			position: new Cesium.CallbackProperty(() => {
				return this.coods[index];
			}, false),
			point: {
				pixelSize: 6,
				outlineWidth: 2,
				color: EditPointStyle.color(),
				outlineColor: EditPointStyle.outlineColor()
			}
		});
		this.pointEntities.push(p);
	}
	// 初始化中点编辑
	private initTempMiddle() {
		for (let index = 0; index < this.coods.length - 1; index++) {
			let endIndex = index + 1;
			this.addTempMiddle(
				index,
				endIndex,
				new Cesium.CallbackProperty(() => {
					const start = this.coods[index];
					const end = this.coods[index + 1];
					return Cesium.Cartesian3.midpoint(start, end, new Cesium.Cartesian3());
				}, false)
			);
		}
	}
	// 添加临时编辑中点
	private addTempMiddle(startIndex: number, endIndex: number, position: any) {
		const p = this.viewer.entities.add({
			name: EditPointStyle.TempLayerName,
			startIndex,
			endIndex,
			position,
			point: {
				pixelSize: 4,
				outlineWidth: 2,
				color: EditPointStyle.color().withAlpha(0.8),
				outlineColor: EditPointStyle.outlineColor().withAlpha(0.8)
			}
		});
		this.tempMiddleEntities.push(p);
	}
	// 替换临时点为正式点
	private replaceAndInsert(entity: any) {
		const { startIndex, position } = entity;
		const positionValue = position.getValue();
		// 清空正式点
		this.pointEntities.forEach(p => {
			this.viewer.entities.remove(p);
		});
		this.pointEntities = [];
		// 清空临时点
		this.tempMiddleEntities.forEach(p => {
			this.viewer.entities.remove(p);
		});
		this.tempMiddleEntities = [];
		// 将当前临时点插入坐标数组
		this.coods.splice(startIndex + 1, 0, positionValue);
		// 重新创建正式点
		for (let index = 0; index < this.coods.length; index++) {
			this.addEditPoint(index);
		}
		// 重新创建临时点
		this.initTempMiddle();

		return startIndex + 1;
	}
	private clearLayers() {
		this.viewer.entities.remove(this.entity);
		this.entity = null;
		this.pointEntities.forEach(p => {
			this.viewer.entities.remove(p);
		});
		this.pointEntities = [];
		this.tempMiddleEntities.forEach(p => {
			this.viewer.entities.remove(p);
		});
		this.tempMiddleEntities = [];
	}
	/**
	 * 销毁
	 */
	public dispose() {
		this.clearEvents();
		this.clearLayers();
	}
}
