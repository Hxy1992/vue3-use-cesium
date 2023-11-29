import { getState } from "../../utils/store";
import { mapFactory } from "../basemap";
import { EventFactory } from "../event";
import { EventTypeEnum } from "../../enums/map-enum";

export type EventTypes = "LEFT_CLICK" | "MOUSE_MOVE";
export type PositionAlowTypes = "Entity" | "Primitive" | "Mouse";

/**
 * 弹窗事件类型
 */
export enum PopupTypeEnum {
	/**
	 * Represents a mouse left click event.
	 */
	LEFT_CLICK = "LEFT_CLICK",
	/**
	 * Represents a mouse move event.
	 */
	MOUSE_MOVE = "MOUSE_MOVE"
}
type xAlignAllowTypes = "left" | "center" | "right";
type yAlignAllowTypes = "top" | "center" | "bottom";
export interface OptionTypes {
	dom: HTMLElement;
	/**
	 * 弹窗方式：鼠标点击/鼠标移动
	 */
	activeType?: EventTypes;
	/**
	 * 获取位置类型："Entity" | "Primitive" | "Mouse", Mouse为直接获取鼠标点击的位置
	 */
	positionType?: PositionAlowTypes;
	/**
	 * x偏移 px
	 */
	offsetX?: number;
	/**
	 * y偏移 px
	 */
	offsetY?: number;
	/**
	 * 水平对齐方式，默认center
	 */
	xAlign?: xAlignAllowTypes;
	/**
	 * 垂直对齐方式，默认bottom
	 */
	yAlign?: yAlignAllowTypes;
}
/**
 * 获取弹窗位置方式
 * entity和primitive需要有position属性，鼠标位置获取的是椭球位置
 */
const PositionType: Record<string, string> = {
	/**
	 * Entity的位置Entity.position
	 */
	Entity: "Entity",
	/**
	 * Primitive的位置Primitive.position
	 */
	Primitive: "Primitive",
	/**
	 * 鼠标点击位置
	 */
	Mouse: "Mouse"
};

/**
 * 地图信息弹窗
 * @description 地图信息弹窗(dom)的事件监听、弹窗显示、弹窗位置保持
 * @method updateKeepPosition 更新弹窗位置
 * @method dispose 销毁
 */
export class PopupWindow {
	private viewer: any;
	private includeFeature: Function;
	private dom: HTMLElement;
	private activeType: EventTypes;
	private visibleChange: Function;
	private offsetX: number;
	private offsetY: number;
	private xAlign: xAlignAllowTypes;
	private yAlign: yAlignAllowTypes;
	private positionType: PositionAlowTypes;
	private mapEvents: any;
	private scenePostRender: any;
	private eventFactory: EventFactory;

	/**
	 * 地图信息弹窗
	 * @param options 配置参数
	 * @param includeFeature 判断pick结果是否符合要求
	 * @param visibleChange 显示/隐藏回调
	 */
	constructor(
		options: OptionTypes,
		includeFeature: (pick: any) => boolean,
		visibleChange?: (visible: boolean, pick: any) => void
	) {
		const id = getState().mapId;
		if (!id) throw new Error("id不可为空");
		this.viewer = mapFactory.get(id);
		this.eventFactory = mapFactory.getEvent(id);
		const {
			dom,
			activeType = PopupTypeEnum.LEFT_CLICK,
			positionType = "Entity",
			offsetX = 0,
			offsetY = 0,
			xAlign = "center",
			yAlign = "bottom"
		} = options;
		this.includeFeature = includeFeature;
		this.dom = dom;
		this.activeType = activeType;
		this.visibleChange = visibleChange || (() => {});
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.positionType = positionType;
		this.xAlign = xAlign;
		this.yAlign = yAlign;
		this.addEventListener();
	}

	/**
	 * 注册地图事件
	 */
	private addEventListener() {
		const eventFactory = this.eventFactory;
		if (this.activeType === PopupTypeEnum.LEFT_CLICK) {
			this.mapEvents = eventFactory.push(EventTypeEnum.LEFT_CLICK, (event: any) => {
				const pick = this.viewer.scene.pick(event.position);
				// 判断pick结果是否包含绑定popup的元素
				if (Cesium.defined(pick) && this.includeFeature(pick)) {
					this.show(pick);
					this.keepPosition(event, pick, true);
				} else {
					this.hide(pick);
					this.unKeepPosition();
				}
			});
		} else {
			this.mapEvents = [
				eventFactory.push(EventTypeEnum.MOUSE_MOVE, (event: any) => {
					const pick = this.viewer.scene.pick(event.endPosition);
					// 判断pick结果是否包含绑定popup的元素
					if (Cesium.defined(pick) && this.includeFeature(pick)) {
						this.show(pick);
						this.keepPosition(event, pick, false);
					} else {
						this.hide(pick);
					}
				}),
				eventFactory.push(EventTypeEnum.MOVE_START, () => {
					this.hide(undefined);
				})
			];
		}
	}
	/**
	 * 获取弹窗位置
	 */
	private getPosition(event: any, pick: any) {
		if (this.positionType === PositionType.Primitive) {
			return pick.primitive.position;
		} else if (this.positionType === PositionType.Entity) {
			return pick.id.position.getValue(Date.now());
		} else if (this.positionType === PositionType.Mouse) {
			return this.viewer.camera.pickEllipsoid(event.position, this.viewer.scene.globe.ellipsoid);
		}
	}
	/**
	 * 显示
	 * @param {*} pick pick对象
	 */
	private show(pick: any) {
		if (this.dom) this.dom.style.display = "block";
		this.visibleChange(true, pick);
	}
	/**
	 * 保持弹窗位置
	 * @param event 事件参数
	 * @param pick 拾取参数
	 * @param isKeep 是否添加scenePostRender用于保持弹窗位置（MOUSE_MOVE不需要）
	 */
	private keepPosition(event: any, pick: any, isKeep: boolean = false) {
		this.unKeepPosition();
		if (!this.dom) return;
		const realPick = this.getPosition(event, pick);
		const position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, realPick);
		if (!position) return;
		const pupupDom = this.dom;
		const offsetX = this.offsetX;
		const offsetY = this.offsetY;
		const xAlign = this.xAlign;
		const yAlign = this.yAlign;
		let dx = 0;
		let dy = 0;
		switch (xAlign) {
			case "left":
				dx = 0;
				break;
			case "center":
				dx = -pupupDom.offsetWidth / 2;
				break;
			case "right":
				dx = -pupupDom.offsetWidth;
		}
		switch (yAlign) {
			case "center":
				dy = -pupupDom.offsetHeight / 2;
				break;
			case "top":
				dy = 0;
				break;
			case "bottom":
				dy = -pupupDom.offsetHeight;
				break;
		}
		pupupDom.style.top = position.y + dy + offsetY + "px";
		pupupDom.style.left = position.x + dx + offsetX + "px";
		if (!isKeep) return;
		this.scenePostRender = () => {
			const currentPosition =
				this.positionType === PositionType.Mouse
					? Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, realPick)
					: Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.getPosition(event, pick));
			if (!currentPosition) return;
			pupupDom.style.top = currentPosition.y + dy + offsetY + "px";
			pupupDom.style.left = currentPosition.x + dx + offsetX + "px";
		};
		this.viewer.scene.postRender.addEventListener(this.scenePostRender);
	}
	/**
	 * 取消保持弹窗位置
	 */
	private unKeepPosition() {
		if (this.scenePostRender) {
			this.viewer.scene.postRender.removeEventListener(this.scenePostRender);
			this.scenePostRender = null;
		}
	}
	/**
	 * 隐藏
	 * @param {*} pick pick对象
	 */
	private hide(pick: any) {
		if (this.dom) this.dom.style.display = "none";
		this.visibleChange(false, pick);
	}
	/**
	 * 销毁
	 */
	dispose() {
		if (this.dom) this.dom.style.display = "none";
		this.unKeepPosition();
		this.eventFactory.remove(this.mapEvents);
	}
}

/**
 * 示例：
 new PopupWindow(
		{
      // 弹窗dom
      dom: document.getElementById("my-popup"),
      // 弹窗激活方式
      activeType: "LEFT_CLICK",
      // 获取弹窗位置方式
      positionType: "Mouse"
    },
    // 判断pick的点是否符合要求
    pick => {
      return pick.id && pick.id.layer === "my-layer"
    },
    // 显示/隐藏回调
    (visible, pick) => {
      // do sonmthing
    })
  }
 */
