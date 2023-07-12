/**
 * 存储类型
 */
export namespace StoreType {
	/**
	 * 地图工具显示控制Key
	 */
	export type toolKey = "scale" | "coodination" | "help" | "zoom" | "north" | "home" | "view";
	/**
	 * 地图存储类型
	 */
	export interface baseMapType {
		/**
		 * 地图id
		 */
		mapId: string | null;
		/**
		 * 地图可见性(默认隐藏)
		 */
		visible: boolean;
		/**
		 * Teleport组件传送目标(默认body)
		 */
		toTarget: string;
		/**
		 * 当前的视图类型(默认全部显示)
		 */
		viewType: "2d" | "3d";
		/**
		 * 地图工具显示控制(默认全部显示)
		 */
		tools: {
			/**
			 * 比例尺
			 */
			scale: boolean;
			/**
			 * 鼠标位置坐标
			 */
			coodination: boolean;
			/**
			 * 帮助
			 */
			help: boolean;
			/**
			 * 放大缩小
			 */
			zoom: boolean;
			/**
			 * 恢复正北
			 */
			north: boolean;
			/**
			 * 默认视图
			 */
			home: boolean;
			/**
			 * 二三维切换
			 */
			view: boolean;
		};
		/**
		 * 点击默认视图按钮飞行时间(默认0)
		 * 参见：https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#flyHome
		 */
		flyHomeDuration: number;
	}
}
/**
 * 地图类型
 */
export namespace MapTypes {
	/**
	 * 地图事件类型
	 */
	export type eventTypes =
		| "MOVE_START"
		| "MOVE_END"
		| "LEFT_DOWN"
		| "LEFT_UP"
		| "LEFT_CLICK"
		| "LEFT_UP"
		| "RIGHT_DOWN"
		| "RIGHT_UP"
		| "RIGHT_CLICK"
		| "MOUSE_MOVE"
		| "WHEEL"
		| "LEFT_DOUBLE_CLICK";
	/**
	 * 底图类型
	 */
	export type imageryTypes =
		| "tdt-img"
		| "tdt-vec"
		| "tms-offline"
		| "osm-normal"
		| "geoq-colour"
		| "geoq-gray"
		| "geoq-midnightblue"
		| "carto-darkall"
		| "carto-lightall"
		| "empty";
	export interface mapOptionInterface {
		/**
		 * 默认视图类型
		 */
		viewType?: "2d" | "3d"; // true - 3d视图；false - 2d视图
		/**
		 * 默认底图
		 */
		imagery?: imageryTypes;
		/**
		 * 默认底图为本地时需传入url
		 */
		imageryUrl?: string;
		/**
		 * new Cesium.Viewer时配置参数，会覆盖默认参数
		 */
		extra?: Record<string, any>;
	}
}

/**
 * 组件类型
 */
// export namespace componentTypes {
// 	export interface baseMapProps {
// 		/**
// 		 * 自定义图标URL
// 		 */
// 		icons: {
// 			/**
// 			 * 帮助
// 			 */
// 			help: string;
// 			/**
// 			 * 放大
// 			 */
// 			zoomIn: string;
// 			/**
// 			 * 缩小
// 			 */
// 			zoomOut: string;
// 			/**
// 			 * 恢复正北
// 			 */
// 			recoverNorth: string;
// 			/**
// 			 * 默认视图
// 			 */
// 			homeView: string;
// 			/**
// 			 * 二三维切换
// 			 */
// 			viewSet: string;
// 		};
// 	}
// }
