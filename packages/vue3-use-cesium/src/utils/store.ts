// 简易存储器

import { reactive } from "vue";
import type { BaseMapType } from "../interfaces/store";
import type { ImageryTypes } from "../interfaces/map";

const state = reactive<BaseMapType>({
	mapId: null,
	visible: false,
	toTarget: "body",
	viewType: "3d",
	flyHomeDuration: 0,
	currentImagery: "osm-normal",
	useCesiumDefaultEvent: false,
	tdtToken: "",
	viewTypeDisabled: false
});

/**
 * 获取状态
 * @returns state
 */
export const getState = (): BaseMapType => state;
/**
 * 设置地图id
 * @param val 地图id
 */
export function setMapId(val: string | null) {
	state.mapId = val;
}
/**
 * 设置地图可见性
 * @param val 是否可见
 */
export function setVisible(val: boolean) {
	state.visible = val;
}
/**
 * 设置地图传送容器
 * @param val Teleport to的值
 */
export function setToTarget(val: string) {
	state.toTarget = val;
}
/**
 * 设置地图视图类型
 * @param type 二维/三维
 */
export function setViewType(type: "2d" | "3d") {
	state.viewType = type;
}
/**
 * 设置地图视图禁用
 */
export function setViewTypeDisabled(disable: boolean) {
	state.viewTypeDisabled = disable;
}
/**
 * 设置底图
 * @param type 底图类型
 */
export function setCurrentImagery(type: ImageryTypes) {
	state.currentImagery = type;
}

/**
 * 设置操作状态
 * @param val 是/否
 */
export function setUseCesiumDefaultEvent(val: boolean) {
	state.useCesiumDefaultEvent = val;
}

/**
 * 设置天地图token
 * @param val token
 */
export function setTdtToken(val?: string) {
	state.tdtToken = val;
}
