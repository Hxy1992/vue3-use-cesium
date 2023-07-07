// 简易存储器

import { reactive } from "vue";
import type { StoreType } from "../types";

const state = reactive<StoreType.baseMapType>({
	mapId: null,
	visible: false,
	toTarget: "body",
	viewType: "3d",
	tools: {
		scale: true,
		coodination: true,
		help: true,
		zoom: true,
		north: true,
		home: true,
		view: true
	},
	flyHomeDuration: 0
});

/**
 * 获取状态
 * @returns state
 */
export const getState = (): StoreType.baseMapType => state;
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
 * 设置地图工具可见性
 * @param key 工具类型
 * @param val 是否可见
 */
export function setTools(key: StoreType.toolKey, val: boolean) {
	state.tools[key] = val;
}
