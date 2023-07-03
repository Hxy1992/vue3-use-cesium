// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string;
		name: string;
		component?: string | (() => Promise<any>);
		redirect?: string;
		meta: MetaProps;
		children?: MenuOptions[];
	}
	interface MetaProps {
		icon?: string;
		svgIcon?: string;
		title: string;
		activeMenu?: string;
		isLink?: string;
		isHide: boolean;
		isFull: boolean;
		isAffix: boolean;
		isKeepAlive: boolean;
		isFill?: boolean;
		isFrame?: string; // 是否为iframe嵌入的网页
		isUnique?: string; // 是否唯一(防止打开多个详情页标签)
		hasMap?: boolean; // 是否包含地图
	}
}

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}
// 引入js库的类型定义
declare const Cesium: any;
/**
 * 系统类型
 */
declare namespace System {
	/**
	 * 国际化语言类型
	 */
	type languageType = "zh" | "en";

	/**
	 * Map类型
	 */
	type MapType<T extends string | number | symbol, V = any> = {
		[K in T]: V;
	};
}
