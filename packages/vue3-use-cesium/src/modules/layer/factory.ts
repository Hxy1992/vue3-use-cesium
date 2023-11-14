import { Layer } from "./layer";

/**
 * 图层管理
 */
export class LayerFactory {
	/**
	 * 图层列表
	 */
	private list: Layer[];
	constructor() {
		this.list = [];
	}
	/**
	 * 添加图层
	 * @param name 图层名称
	 * @param defaultOptions 新增要素时的默认配置，见Entity.ConstructorOptions
	 * @returns 图层对象
	 */
	addLayer(name?: string, defaultOptions?: any) {
		const lyr = new Layer(name, defaultOptions);
		this.list.push(lyr);
		return lyr;
	}
	private getLayerIndex(id: string) {
		return this.list.findIndex(lyr => {
			return lyr.getId() === id;
		});
	}
	/**
	 * 根据id删除图层
	 * @param id 图层id
	 */
	removeLayer(id: string) {
		const index = this.getLayerIndex(id);
		if (index > -1) {
			this.list[index].dispose();
			this.list.splice(index, 1);
		}
	}
	/**
	 * 根据id获取图层
	 * @param id 图层id
	 * @returns 图层对象或null
	 */
	getLayer(id: string) {
		const index = this.getLayerIndex(id);
		return index > -1 ? this.list[index] : null;
	}
	/**
	 * 获取所有图层
	 * @returns 图层对象数组
	 */
	getAllLayers() {
		return this.list;
	}
	/**
	 * 设置图层可见性
	 * @param id 图层id
	 * @param visible 是否可见
	 */
	setLayerVisible(id: string, visible: boolean) {
		const lyr = this.getLayer(id);
		lyr && lyr.setVisible(visible);
	}
	/**
	 * 删除所有图层
	 */
	removeAllLayers() {
		for (let index = 0; index < this.list.length; index++) {
			this.list[index].dispose();
		}
		this.list = [];
	}
}
