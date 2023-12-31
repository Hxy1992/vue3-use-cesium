import { generateUUID } from "../../utils/index";
import type { EventTypes } from "../../interfaces/map";
import { EventTypeEnum } from "../../enums/map-enum";

/**
 * 地图事件工厂
 * @description 注册所有地图事件，轮训事件列表进行执行
 */
export class EventFactory {
	private viewer: any;
	private events: any;
	private onMoveStartMap: any;
	private onMoveendMap: any;
	private ScreenSpaceEventHandler: any;
	private enableMousemove: boolean;
	constructor(viewer: any) {
		this.enableMousemove = false;
		this.events = {};
		if (!viewer) return;
		this.viewer = viewer;
		Object.values(EventTypeEnum).forEach((val: any) => {
			this.events[val] = [];
		});
		this.register();
	}
	/**
	 * 注册地图事件
	 */
	private register() {
		let isMoving = false;
		this.onMoveStartMap = (arg: any) => {
			isMoving = true;
			this.doEvents(EventTypeEnum.MOVE_START, arg);
		};
		this.onMoveendMap = (arg: any) => {
			isMoving = false;
			this.doEvents(EventTypeEnum.MOVE_END, arg);
		};
		// this.scenePostRender = arg => {
		//   this.doEvents(EventTypeEnum.POST_RENDER, arg)
		// }
		// 监听地图移动开始事件
		this.viewer.camera.moveStart.addEventListener(this.onMoveStartMap);
		// 监听地图移动完成事件
		this.viewer.camera.moveEnd.addEventListener(this.onMoveendMap);
		// postRender
		// this.viewer.scene.postRender.addEventListener(this.scenePostRender)

		const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
		this.ScreenSpaceEventHandler = handler;
		// LEFT_DOWN
		handler.setInputAction((movement: any) => {
			this.doEvents(EventTypeEnum.LEFT_DOWN, movement);
		}, Cesium.ScreenSpaceEventType.LEFT_DOWN);
		// LEFT_UP
		handler.setInputAction((movement: any) => {
			this.doEvents(EventTypeEnum.LEFT_UP, movement);
		}, Cesium.ScreenSpaceEventType.LEFT_UP);
		// LEFT_CLICK
		handler.setInputAction((movement: any) => {
			this.doEvents(EventTypeEnum.LEFT_CLICK, movement);
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		// RIGHT_DOWN
		handler.setInputAction((movement: any) => {
			this.doEvents(EventTypeEnum.RIGHT_DOWN, movement);
		}, Cesium.ScreenSpaceEventType.RIGHT_DOWN);
		// RIGHT_UP
		handler.setInputAction((movement: any) => {
			this.doEvents(EventTypeEnum.RIGHT_UP, movement);
		}, Cesium.ScreenSpaceEventType.RIGHT_UP);
		// RIGHT_CLICK
		handler.setInputAction((movement: any) => {
			this.doEvents(EventTypeEnum.RIGHT_CLICK, movement);
		}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		// WHEEL
		handler.setInputAction((movement: any) => {
			this.doEvents(EventTypeEnum.WHEEL, movement);
		}, Cesium.ScreenSpaceEventType.WHEEL);
		// MOUSE_MOVE
		handler.setInputAction((movement: any) => {
			if (isMoving && !this.enableMousemove) return; // 视图移动时，禁止抛出MOUSE_MOVE，防止卡顿
			this.doEvents(EventTypeEnum.MOUSE_MOVE, movement);
		}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		// LEFT_DOUBLE_CLICK
		handler.setInputAction((movement: any) => {
			this.doEvents(EventTypeEnum.LEFT_DOUBLE_CLICK, movement);
		}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
	}

	/**
	 * 强制开启 视图移动中抛出MouseMove事件
	 * @description 开启后，记得关闭！！！
	 * @param {Boolean} enable 开启/关闭
	 */
	forceMouseMove(enable: boolean) {
		this.enableMousemove = enable;
	}

	/**
	 * 执行事件
	 * @param {String} eventType 事件类型
	 * @param {Object} params 执行参数
	 */
	private doEvents(eventType: EventTypes, params: any) {
		const eventList = this.events[eventType];
		if (Array.isArray(eventList) && eventList.length > 0) {
			for (let index = 0; index < eventList.length; index++) {
				const { func } = eventList[index];
				if (typeof func === "function") {
					func(params);
				}
			}
		}
	}

	/**
	 * 追加事件
	 * @param {String} eventType 事件类型
	 * @param {Function} func 事件
	 * @param {Boolean} disabledClear 禁止clear该事件，仍可remove
	 * @returns 事件参数，用于移除事件
	 */
	push(eventType: EventTypes, func: Function, disabledClear = false) {
		if (!EventTypeEnum[eventType]) return false;
		const id = generateUUID();
		this.events[eventType].push({
			id,
			func,
			disabledClear
		});
		return {
			id,
			type: eventType,
			disabledClear
		};
	}

	/**
	 * 移除事件 / 批量移除事件
	 * @param {Object|Array} data 事件参数
	 */
	remove(data: any) {
		if (!data) return false;
		const paramList = Array.isArray(data) ? data : [data];
		for (let k = 0; k < paramList.length; k++) {
			if (!paramList[k]) continue;
			const { id, type } = paramList[k];
			const eventList = this.events[type];
			if (!Array.isArray(eventList) || eventList.length === 0) continue;
			for (let index = 0; index < eventList.length; index++) {
				if (eventList[index].id === id) {
					eventList.splice(index, 1);
					break;
				}
			}
		}
	}

	/**
	 * 清空事件列表
	 * @param {String} eventType 事件类型，为空时清空所有类型的事件
	 * @param force 强制清空所有
	 */
	clear(eventType?: EventTypes, force = false) {
		if (eventType && !EventTypeEnum[eventType]) return false;
		const empty = (t: any) => {
			const eventList = this.events[t];
			for (let i = eventList.length - 1; i >= 0; i--) {
				if (force || !eventList[i].disabledClear) {
					eventList.splice(i, 1);
				}
			}
		};
		if (eventType) {
			empty(eventType);
		} else {
			Object.values(EventTypeEnum).forEach(val => {
				empty(val);
			});
		}
		return true;
	}

	/**
	 * 销毁
	 */
	dispose() {
		if (!this.viewer || this.viewer.isDestroyed()) return;
		this.clear(undefined, true);
		// 移除地图移动开始事件
		this.viewer.camera.moveStart.removeEventListener(this.onMoveStartMap);
		this.onMoveStartMap = null;
		// 移除地图移动完成事件
		this.viewer.camera.moveEnd.removeEventListener(this.onMoveendMap);
		this.onMoveendMap = null;
		// 移除postRender
		// this.viewer.scene.postRender.removeEventListener(this.scenePostRender)
		// this.scenePostRender = null

		this.ScreenSpaceEventHandler.destroy();
	}
}

/**
 * 创建地图事件工厂实例
 * @param {*} viewer 地图viewr
 */
export function createFactory(viewer: any) {
	return new EventFactory(viewer);
}
