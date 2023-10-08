import { ImageryTypes } from "./map";

/**
 * 地图工具显示控制Key
 */
export type ToolKey = "scale" | "coodination" | "help" | "zoom" | "north" | "home" | "view";
/**
 * 地图存储类型
 */
export interface BaseMapType {
	/**
	 * 地图id
	 */
	mapId: string | null;
	/**
	 * 地图可见性(默认隐藏)
	 */
	visible: boolean;
	/**
	 * Teleport组件传送目标(默认body)
	 */
	toTarget: string;
	/**
	 * 当前的视图类型(默认全部显示)
	 */
	viewType: "2d" | "3d";
	/**
	 * 点击默认视图按钮飞行时间(默认0)
	 * 参见：https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#flyHome
	 */
	flyHomeDuration: number;
	/**
	 * 当前底图
	 */
	currentImagery: ImageryTypes;
}
