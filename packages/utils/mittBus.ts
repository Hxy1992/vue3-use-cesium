/**
 * 简易事件分发器
 */
class MittBus {
	/**
	 * 存储事件
	 */
	private events: Record<string, Function[]>;
	constructor() {
		this.events = {};
	}
	/**
	 * 开始监听事件
	 * @param eventId 事件id
	 * @param func 回调函数
	 */
	public on(eventId: string, func: Function) {
		if (!func) return;
		if (!this.events[eventId]) this.events[eventId] = [];
		this.events[eventId].push(func);
	}
	/**
	 * 触发事件
	 * @param eventId 事件id
	 * @param params 传递参数
	 */
	public emit<T = any>(eventId: string, params: T) {
		if (!this.events[eventId]) return;
		this.events[eventId].forEach(func => {
			func(params);
		});
	}
	/**
	 * 取消事件监听
	 * @param eventId 事件id
	 */
	public off(eventId: string) {
		if (!this.events[eventId]) return;
		delete this.events[eventId];
	}
	/**
	 * 清空所有事件监听
	 */
	public clear() {
		this.events = {};
	}
	/**
	 * 销毁
	 */
	public dispose() {
		this.clear();
	}
}

/**
 * 事件监听器
 */
export const mittBus = new MittBus();
