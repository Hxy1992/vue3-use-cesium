import { pkgName } from "../../utils/config";
import { generateUUID, localGet, localSet } from "../../utils/index";
import { getState } from "../../utils/store";
import { mapFactory } from "../basemap";
import { getCameraInfo } from "./helper";

/**
 * 书签数据
 */
type BookItem = {
	/**
	 * 书签唯一id
	 */
	id: string;
	/**
	 * 书签名称
	 */
	name: string;
	/**
	 * 相机信息
	 */
	cameraInfo: {
		/**
		 * 偏航角(度)
		 */
		heading: number;
		/**
		 * 俯仰角(度)
		 */
		pitch: number;
		/**
		 * 翻滚角(度)
		 */
		roll: number;
		/**
		 * 经度(度)
		 */
		longitude: number;
		/**
		 * 纬度(度)
		 */
		latitude: number;
		/**
		 * 高程(米)
		 */
		height: number;
	};
};

const Key = pkgName + "bookmark";
/**
 * 场景书签
 */
export class BookMark {
	private viewer: any;
	constructor() {
		const id = getState().mapId;
		if (!id) throw new Error("mapId is not defined");
		this.viewer = mapFactory.get(id);
	}
	/**
	 * 新增书签
	 * @param name 书签名称
	 * @returns 书签数据
	 */
	public add(name?: string): BookItem {
		const cameraInfo = getCameraInfo(this.viewer);
		const id = generateUUID();
		const bookmark = {
			id,
			name: name || "书签" + Date.now(),
			cameraInfo
		};
		const bookmarks = this.listAll();
		bookmarks.push(bookmark);
		localSet(Key, bookmarks);
		return bookmark;
	}
	/**
	 * 删除书签
	 * @param id 书签id
	 */
	public remove(id: string) {
		const bookmarks = this.listAll();
		const index = bookmarks.findIndex((item: BookItem) => item.id === id);
		if (index > -1) {
			bookmarks.splice(index, 1);
			localSet(Key, bookmarks);
		}
	}
	/**
	 * 是否包含书签
	 * @param id 书签id
	 * @returns 是否包含
	 */
	public includes(id: string): boolean {
		const bookmarks = this.listAll();
		const index = bookmarks.findIndex((item: BookItem) => item.id === id);
		return index > -1;
	}
	/**
	 * 返回所有书签
	 * @returns 书签数组
	 */
	public listAll(): BookItem[] {
		return localGet(Key) || [];
	}
	/**
	 * 清空所有书签
	 */
	public clear() {
		localSet(Key, []);
	}
	/**
	 * 定位至书签
	 * @param id 书签id
	 * @param duration 耗时/s
	 */
	public flyTo(id: string, duration: number = 0) {
		const bookmark = this.get(id);
		if (bookmark) {
			const { heading, pitch, roll, longitude, latitude, height } = bookmark.cameraInfo;
			this.viewer.camera.flyTo({
				duration,
				destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
				orientation: {
					heading: Cesium.Math.toRadians(heading),
					pitch: Cesium.Math.toRadians(pitch),
					roll: Cesium.Math.toRadians(roll)
				}
			});
		}
	}
	/**
	 * 获取书签数据
	 * @param id 书签id
	 * @returns 书签数据
	 */
	public get(id: string): BookItem | null {
		const bookmarks = this.listAll();
		const index = bookmarks.findIndex((item: BookItem) => item.id === id);
		return index > -1 ? bookmarks[index] : null;
	}
}
