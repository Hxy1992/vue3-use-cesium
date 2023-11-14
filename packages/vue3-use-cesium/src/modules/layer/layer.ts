import { getState } from "../../utils/store";
import { mapFactory } from "../basemap";
import type { EventTypes } from "../../interfaces/map";
import { generateUUID } from "../../utils";
import merge from "lodash-es/merge";
import cloneDeep from "lodash-es/cloneDeep";

let index = 1;
/**
 * 图层
 */
export class Layer {
	private mapId: string;
	private dataSource: any;
	private viewer: any;
	private defaultOptions: any;
	private events: any[];
	private name: string;
	private id: string;
	/**
	 *
	 * @param name 图层名称
	 * @param defaultOptions 新增要素时的默认配置，见Entity.ConstructorOptions
	 */
	constructor(name?: string, defaultOptions?: any) {
		this.mapId = "";
		this.name = "";
		this.id = "";
		this.events = [];
		const id = getState().mapId;
		if (!id) return;
		this.name = name || "临时图层" + index++;
		this.id = generateUUID();
		this.mapId = id;
		this.viewer = mapFactory.get(this.mapId);
		this.dataSource = new Cesium.CustomDataSource();
		this.defaultOptions = defaultOptions || {};
		this.viewer.dataSources.add(this.dataSource);
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
	/**
	 * 新增entity
	 * @param options entity配置(与图层的defaultOptions深度合并)
	 * @returns entity
	 */
	add(options: any) {
		const target = cloneDeep(this.defaultOptions);
		const option = merge(target, options);
		const entity = new Cesium.Entity(option);
		this.dataSource.entities.add(entity);
		return entity;
	}
	/**
	 * 删除entity
	 * @param entity entity
	 */
	remove(entity: any) {
		this.dataSource.entities.remove(entity);
	}
	/**
	 * 删除最后一个entity
	 */
	popEntity() {
		const list = this.dataSource.entities.values;
		if (list.length === 0) return false;
		const last = list[list.length - 1];
		this.remove(last);
		return true;
	}
	/**
	 * 删除第一个entity
	 */
	shiftEntity() {
		const list = this.dataSource.entities.values;
		if (list.length === 0) return false;
		const first = list[0];
		this.remove(first);
		return true;
	}
	/**
	 * 删除全部
	 */
	removeAll() {
		this.dataSource.entities.removeAll();
	}
	/**
	 * 根据id删除
	 * @param id id
	 */
	removeById(id: string) {
		this.dataSource.entities.removeById(id);
	}
	/**
	 * 根据id获取entity
	 * @param id id
	 * @returns entity
	 */
	getById(id: string) {
		return this.dataSource.entities.getById(id);
	}
	/**
	 * 获取所有的entity对象
	 * @returns entity数组
	 */
	getAllEntities() {
		return this.dataSource.entities.values;
	}
	/**
	 * 设置图层可见性
	 * @param val 可见性
	 */
	setVisible(val: boolean) {
		this.dataSource.show = val;
	}
	/**
	 * 获取图层绑定的dataSource
	 * @returns dataSource
	 */
	getDataSource() {
		return this.dataSource;
	}
	/**
	 * 是否包含entity
	 * @param entity entity
	 * @returns boolean
	 */
	contains(entity: any) {
		return this.dataSource.entities.contains(entity);
	}
	/**
	 * 获取所有图层绑定事件
	 * @returns 事件列表
	 */
	getEvents() {
		return this.events;
	}
	/**
	 * 添加事件监听
	 * @param type 事件类型
	 * @param listener 监听回调
	 * @returns 返回removeEvent的参数
	 */
	addEvent(type: EventTypes, listener: (...args: any[]) => void) {
		const eventFactory = mapFactory.getEvent(this.mapId);
		const removeData = eventFactory.push(type, listener);
		this.events.push(removeData);
		return removeData;
	}
	/**
	 * 删除事件监听
	 * @param removeData addEvent返回的参数
	 */
	removeEvent(removeData: any) {
		const eventFactory = mapFactory.getEvent(this.mapId);
		eventFactory.remove(removeData);
		const index = this.events.indexOf(removeData);
		index > -1 && this.events.splice(index, 1);
	}
	/**
	 * 清空图层的事件监听
	 */
	removeAllEvent() {
		const eventFactory = mapFactory.getEvent(this.mapId);
		this.events.forEach(removeData => {
			eventFactory.remove(removeData);
		});
		this.events = [];
	}
	/**
	 * 清空并销毁图层
	 */
	dispose() {
		this.removeAllEvent();
		this.removeAll();
		this.viewer.dataSources.remove(this.dataSource);
	}
}
