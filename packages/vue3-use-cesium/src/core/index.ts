import { generateUUID } from "../utils/index";
import { createFactory, EventFactory } from "./eventFactory";
import { setImagery } from "./imagery";
import { morphMap } from "./util";
import type { MapTypes } from "../types";

interface MapEventType {
	[key: string]: EventFactory;
}
interface ViewMapType {
	[key: string]: any;
}

/**
 * 地图工厂
 */
class MapFactory {
	private viewerMap: ViewMapType;
	private eventMap: MapEventType;
	private staticMap: ViewMapType;
	constructor() {
		this.viewerMap = {};
		this.eventMap = {};
		this.staticMap = {};
	}
	/**
	 * 销毁地图
	 * @param uuid 地图id
	 */
	private disposeViewer(uuid: string) {
		this.eventMap[uuid]?.dispose();
		this.viewerMap[uuid]?.destroy();
	}
	/**
	 * 添加地图
	 * @param dom dom
	 * @param options 参数
	 * @returns 地图id
	 */
	async add(dom: HTMLElement | null, options?: MapTypes.mapOptionInterface) {
		const uuid = generateUUID();
		this.viewerMap[uuid] = await createMap(dom, options);
		this.eventMap[uuid] = createFactory(this.viewerMap[uuid]);
		return uuid;
	}
	/**
	 * 添加静态地图（clear方法不删除）
	 * @param dom 参考add方法
	 * @param options 参考add方法
	 */
	async addStatic(dom: HTMLElement | null, options?: MapTypes.mapOptionInterface) {
		const uuid = await this.add(dom, options);
		this.staticMap[uuid] = true;
		return uuid;
	}
	/**
	 * 删除地图
	 * @param uuid 地图id
	 * @param force 强制删除(用于删除静态地图)
	 */
	remove(uuid: string, force = false) {
		const disabled = force ? false : this.staticMap[uuid];
		if (disabled) return;
		this.disposeViewer(uuid);
		delete this.viewerMap[uuid];
		delete this.eventMap[uuid];
	}
	/**
	 * 获取地图
	 * @param uuid 地图id
	 * @returns 地图实例
	 */
	get(uuid: string) {
		return this.viewerMap[uuid];
	}
	/**
	 * 清空地图工厂
	 */
	clear() {
		for (const uuid in this.viewerMap) {
			this.remove(uuid);
		}
	}
	/**
	 * 获取事件类
	 * @param uuid id
	 * @returns 事件类
	 */
	getEvent(uuid: string) {
		return this.eventMap[uuid];
	}
}
/**
 * 地图工厂实例
 */
export const mapFactory = new MapFactory();

/**
 * 创建地图实例
 * @param dom 地图dom
 * @param threeD 是否3d
 * @returns 地图实例
 */
async function createMap(dom: HTMLElement | null, options?: MapTypes.mapOptionInterface) {
	const { viewType = "3d", imagery, extra = {} } = options || {};
	if (!dom) return;
	const viewer = new Cesium.Viewer(dom, {
		terrainProvider: Cesium.EllipsoidTerrainProvider(),
		geocoder: false,
		navigationHelpButton: false,
		animation: false,
		creditsDisplay: false,
		baseLayerPicker: false,
		timeline: false,
		fullscreenButton: false,
		infoBox: false,
		sceneModePicker: false,
		homeButton: false,
		selectionIndicator: false,
		showRenderLoopErrors: false, // 发生渲染循环错误时，显示HTML面板
		imageryProvider: new Cesium.UrlTemplateImageryProvider({
			url: "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
			subdomains: ["a", "b", "c"]
		}),
		...extra
	});
	viewer.container.querySelector(".cesium-viewer-bottom").style.display = "none"; // 隐藏log
	viewer.container.querySelector(".cesium-viewer-toolbar").style.display = "none"; // 隐藏工具栏
	viewer.cesiumWidget.creditContainer.remove();
	const scene = viewer.scene;
	// // 背景白色
	// scene.backgroundColor = new Cesium.Color(0, 0, 0, 0.0);
	// // 地形深度检测,使用pick时需要开启，否则高程不准确
	scene.globe.depthTestAgainstTerrain = true;
	// viewer.sceneModePicker.viewModel.duration = 0.0;
	// scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0.0);

	mapEventsSet(viewer);

	// 解决锯齿和页面模糊问题
	scene.postProcessStages.fxaa.enabled = true;
	viewer.scene.globe.showWaterEffect = false;
	viewer.scene.globe.showGroundAtmosphere = false;
	// 视图3D/2D
	morphMap(viewer, viewType);
	// 默认地图
	if (imagery) setImagery(viewer, imagery, "zh");
	errorHandle(viewer);
	return viewer;
}

/**
 * 异常捕获
 * @param viewer 地图
 */
function errorHandle(viewer: any) {
	// const helper = new Cesium.EventHelper();
	const helper = viewer._eventHelper;
	// RuntimeErrorEventHandle(viewer);
	// RequestErrorEventHandle(viewer);
	renderErrorHandle(viewer, helper);
	lowFrameHandle(viewer);
	// helper.removeAll();
}
// function RuntimeErrorEventHandle(viewer: any) {}
// function RequestErrorEventHandle(viewer: any) {}
function renderErrorHandle(viewer: any, helper: any) {
	helper.add(viewer.scene.renderError, (...params: any) => {
		console.error(params);
		alert("地图渲染错误，请刷新后重试！");
		window.location.reload();
	});
}
function lowFrameHandle(viewer: any) {
	viewer.extend(Cesium.viewerPerformanceWatchdogMixin, {
		lowFrameRateMessage: "此应用程序在您的系统上表现不佳。请尝试使用其他web浏览器或更新视频驱动程序。"
	});
}
// 设置地图的事件
function mapEventsSet(viewer: any) {
	const scene = viewer.scene;
	// 关闭双击事件
	viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
	// 旋转：鼠标右键拖拽、两指触摸、 按下Ctrl按键 + 鼠标左键拖拽
	scene.screenSpaceCameraController.tiltEventTypes = [
		Cesium.CameraEventType.RIGHT_DRAG,
		Cesium.CameraEventType.PINCH,
		{ eventType: Cesium.CameraEventType.LEFT_DRAG, modifier: Cesium.KeyboardEventModifier.CTRL }
	];
	// 缩放：鼠标中键拖拽、滚轮、两指触摸
	scene.screenSpaceCameraController.zoomEventTypes = [
		Cesium.CameraEventType.MIDDLE_DRAG,
		Cesium.CameraEventType.WHEEL,
		Cesium.CameraEventType.PINCH
	];
	// 平移：鼠标左键拖拽
	scene.screenSpaceCameraController.rotateEventTypes = [Cesium.CameraEventType.LEFT_DRAG];
	// 取消浏览器右键事件
	viewer.container.oncontextmenu = function () {
		return false;
	};
}
