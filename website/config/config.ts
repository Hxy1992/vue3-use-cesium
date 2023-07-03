// ? 全局不动配置项 只做导出不做修改

// * 首页地址（默认）
export const HOME_URL: string = "/home/index";

// * 登录页地址（默认）
export const LOGIN_URL: string = "/login";

// * 默认主题颜色
export const DEFAULT_PRIMARY: string = "#4064E2";

// * Tabs（白名单地址，不需要添加到 tabs 的路由地址）
export const TABS_WHITE_LIST: string[] = ["/403", "/404", "/500", LOGIN_URL];

// * Cesium库版本
export const cesiumVersions = [
	`https://unpkg.com/cesium@1.105.0/Build/Cesium/Cesium.js`,
	`https://unpkg.com/cesium@1.105.0/Build/Cesium/Widgets/widgets.css`
];
