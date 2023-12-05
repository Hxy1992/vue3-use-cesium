// TODO 事件抽象类

export class EventListener {
	protected _listeners: { [key: string]: Function[] } = {};

	public addEventListener(eventName: string, callback: Function): void {
		if (!this._listeners[eventName]) {
			this._listeners[eventName] = [];
		}
		this._listeners[eventName].push(callback);
	}
	public removeEventListener(eventName: string, callback: Function): void {
		if (!this._listeners[eventName]) {
			return;
		}
		this._listeners[eventName] = this._listeners[eventName].filter(function (listener) {
			return listener !== callback;
		});
	}
	public dispatchEvent(eventName: string, ...args: any[]): void {
		if (!this._listeners[eventName]) {
			return;
		}
		this._listeners[eventName].forEach(function (listener) {
			listener.apply(null, args);
		});
	}
}
