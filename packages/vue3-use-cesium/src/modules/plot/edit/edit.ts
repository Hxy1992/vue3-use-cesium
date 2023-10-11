import { mapFactory } from "../../factory/map-factory";
import type { CoodinateType } from "../../../interface/plot";

/**
 * 基类
 */
export abstract class Edit {
	protected isEditing: boolean;
	protected viewer: any;
	protected mapUid: string;
	protected entity: any;
	protected coods: any[];
	protected events: any[];
	constructor(mapUid: string) {
		this.isEditing = false;
		this.viewer = mapFactory.get(mapUid);
		this.mapUid = mapUid;
		this.coods = [];
		this.events = [];
	}
	/**
	 * 开始编辑
	 */
	abstract start(coods: CoodinateType[]): void;
	/**
	 * 结束编辑
	 */
	abstract end(): void;
	/**
	 * 设置开始状态
	 */
	protected setStartStates() {
		this.isEditing = true;
		this.cursorStyle("move");
	}
	/**
	 * 设置结束状态
	 */
	protected setEndStates() {
		this.isEditing = false;
		this.cursorStyle("default");
	}
	/**
	 * 设置鼠标样式
	 * @param cursor 样式
	 */
	protected cursorStyle(cursor: "default" | "crosshair" | "move") {
		this.viewer.container.style.cursor = cursor;
	}
	protected clearEvents() {
		const eventFactory = mapFactory.getEvent(this.mapUid);
		eventFactory.remove(this.events);
		this.events = [];
	}
	abstract dispose(): void;
}
