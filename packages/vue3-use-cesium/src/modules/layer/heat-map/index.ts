import { getState } from "../../../utils/store";
import { mapFactory } from "../../basemap";
import { generateUUID } from "../../../utils";
import HeatMapLayer from "./heatmap";
import { HeatmapLayerType } from "../../../interfaces/layer";

const DEF_OPT = {
	useGround: true,
	radius: 50,
	classificationType: 2 // Cesium.ClassificationType.BOTH
};
let index = 1;

// TODO 逻辑优化
// 如果是页面刷新就加载热力图，等待一会再加载热力图数据
let isRefresh = false;
window.addEventListener("load", () => {
	isRefresh = true;
	setTimeout(() => {
		isRefresh = false;
	}, 5000);
});

/**
 * 热力图层
 */
export class HeatmapLayer {
	protected mapId: string;
	protected viewer: any;
	protected name: string;
	protected id: string;
	private lyrOptions: HeatmapLayerType;
	private heatLyr: HeatMapLayer | undefined;
	/**
	 * 热力图层
	 * @param name 图层名称
	 * @param options 配置
	 */
	constructor(name?: string, options?: HeatmapLayerType) {
		this.mapId = "";
		this.name = "";
		this.id = "";
		const id = getState().mapId;
		if (!id) throw new Error("mapId is not defined");
		this.name = name || "临时图层" + index++;
		this.id = generateUUID();
		this.mapId = id;
		this.viewer = mapFactory.get(this.mapId);

		this.lyrOptions = {
			...DEF_OPT,
			...options
		};
		this.createHeatLayer();
	}
	/**
	 * 获取图层名称
	 * @returns 名称
	 */
	getName() {
		return this.name;
	}
	/**
	 * 获取图层id
	 * @returns id
	 */
	getId() {
		return this.id;
	}
	// 创建热力图层
	private createHeatLayer() {
		this.heatLyr = new HeatMapLayer(this.viewer, this.lyrOptions);
	}
	// 清空热力图层
	private clearHeatLayer() {
		this.heatLyr?.clear();
		this.heatLyr = undefined;
	}
	// 异步等待
	private sleep() {
		return new Promise(resolve => setTimeout(resolve, 200));
	}
	/**
	 * 加载热力图数据
	 */
	public async setPoints(
		data: {
			/**
			 * 经度
			 */
			lng: number;
			/**
			 * 纬度
			 */
			lat: number;
			/**
			 * 权重
			 */
			value: number;
		}[]
	) {
		if (isRefresh) await this.sleep();
		this.heatLyr?.setPoints(data);
	}
	/**
	 * 销毁
	 */
	dispose() {
		this.clearHeatLayer();
	}
}
