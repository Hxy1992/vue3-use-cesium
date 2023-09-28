// 地图枚举

export enum EventTypeEnum {
	/**
	 * 地图移动开始事件
	 */
	MOVE_START = "MOVE_START",
	/**
	 * 地图移动完成事件
	 */
	MOVE_END = "MOVE_END",
	/**
	 * scene.postRender
	 */
	// POST_RENDER: 'POST_RENDER',
	/**
	 * 鼠标左键按下
	 */
	LEFT_DOWN = "LEFT_DOWN",
	/**
	 * 鼠标左键松开
	 */
	LEFT_UP = "LEFT_UP",
	/**
	 * 鼠标左键点击
	 */
	LEFT_CLICK = "LEFT_CLICK",
	/**
	 * 鼠标右键按下
	 */
	RIGHT_DOWN = "RIGHT_DOWN",
	/**
	 * 鼠标右键松开
	 */
	RIGHT_UP = "RIGHT_UP",
	/**
	 * 鼠标右键点击
	 */
	RIGHT_CLICK = "RIGHT_CLICK",
	/**
	 * 鼠标移动
	 */
	MOUSE_MOVE = "MOUSE_MOVE",
	/**
	 * 滚轮
	 */
	WHEEL = "WHEEL",
	/**
	 * 鼠标左键双击
	 */
	LEFT_DOUBLE_CLICK = "LEFT_DOUBLE_CLICK"
}
