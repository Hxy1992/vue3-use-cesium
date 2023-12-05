import { Edit } from "./edit";
import { cartesianListToLngLat, LngLatListTocartesian } from "../../transform";
import { mapFactory } from "../../basemap";
import { EventTypeEnum } from "../../../enums/map-enum";
import { PointStyle } from "../config";
import type { CoodinateType, PlotTypes } from "../../../interfaces/plot";
import { pickPosition } from "../../pick-position";

/**
 * 编辑点
 */
export class EditPoint extends Edit {
	private entities: any[];
	/**
	 * 编辑点
	 * @param mapUid 地图id
	 * @param type 类型
	 */
	constructor(mapUid: string, type: PlotTypes) {
		super(mapUid, type);
		this.entities = [];
	}
	/**
	 * 开始绘制
	 * @param coods 坐标数组
	 */
	start(coods: CoodinateType[]) {
		if (this.isEditing) return;
		// 地图事件、容器等
		this.coods = LngLatListTocartesian(coods);
		this.init();
		this.setStartStates();
		this.viewer.zoomTo(this.viewer.entities);
	}
	/**
	 * 结束绘制
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
					if (pick.id.name === PointStyle.LayerName) {
						isMouseDown = true;
						pickIndex = pick.id.index;
						this.viewer.scene.screenSpaceCameraController.enableInputs = false; // 禁止相机移动
					}
				}
			})
		);
		this.events.push(
			eventFactory.push(EventTypeEnum.MOUSE_MOVE, (event: any) => {
				// 鼠标样式
				const pick = viewer.scene.pick(event.endPosition);
				if (Cesium.defined(pick) && pick.id.name === PointStyle.LayerName) {
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
		for (let index = 0; index < this.coods.length; index++) {
			const p = this.viewer.entities.add({
				name: PointStyle.LayerName,
				index: index,
				position: new Cesium.CallbackProperty(() => {
					return this.coods[index];
				}, false),
				point: {
					pixelSize: 6,
					outlineWidth: 2,
					color: PointStyle.color(),
					outlineColor: PointStyle.outlineColor()
				}
			});
			this.entities.push(p);
		}
	}
	private clearLayers() {
		for (let index = 0; index < this.entities.length; index++) {
			const element = this.entities[index];
			this.viewer.entities.remove(element);
		}
		this.entities = [];
	}
	/**
	 * 销毁
	 */
	public dispose() {
		this.clearEvents();
		this.clearLayers();
	}
}
