import { defineStore, createPinia } from "pinia";
import { GlobalState, ThemeConfigProps } from "./interface";
import { DEFAULT_PRIMARY } from "@/config/config";
import { piniaPersistConfig } from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// 默认登录信息
const defaultLoginInfo = {
	userName: "",
	password: "",
	roleType: "",
	userId: ""
};
const PUBLIC_KEY = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp16nMFzVfPa1Bn2KrSfZ`;
/**
 * 编码字符串
 * @param {String} str 字符串
 * @returns 编码字符串
 */
function encode(str: string) {
	return PUBLIC_KEY + window.btoa(str);
}
/**
 * 解码字符串
 * @param {String} str 字符串
 * @returns 解码字符串
 */
function decode(str: string) {
	return window.atob(str.slice(PUBLIC_KEY.length));
}

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// state: 返回对象的函数
	state: (): GlobalState => ({
		loginName: "",
		// userInfo
		userInfo: "",
		// element组件大小
		assemblySize: "default",
		// language
		language: "zh",
		// themeConfig
		themeConfig: {
			// 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
			layout: "vertical",
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 深色模式
			isDark: false,
			// 灰色模式
			isGrey: false,
			// 色弱模式
			isWeak: false,
			// 折叠菜单
			isCollapse: false,
			// 面包屑导航
			breadcrumb: true,
			// 面包屑导航图标
			breadcrumbIcon: true,
			// 标签页
			tabs: false,
			// 标签页图标
			tabsIcon: true,
			// 页脚
			footer: false,
			// 当前页面是否全屏
			maximize: false
		},
		// 视图配置
		viewTypeStore: "3d"
	}),
	getters: {
		userInfoGet: state => {
			try {
				let str = state.userInfo;
				if (!str) return defaultLoginInfo;
				str = decode(str);
				return JSON.parse(str);
			} catch (err) {
				return defaultLoginInfo;
			}
		}
	},
	actions: {
		setLoginName(name: any) {
			this.loginName = name;
		},
		// setUserInfo
		setUserInfo(data: any) {
			try {
				if (!data) return false;
				const oldinfo = this.userInfo ? JSON.parse(decode(this.userInfo)) : {};
				const newinfo = {
					...oldinfo,
					...data
				};
				let str = JSON.stringify(newinfo);
				str = encode(str);
				this.userInfo = str;
			} catch (err) {
				this.userInfo = "";
			}
		},
		// setAssemblySizeSize
		setAssemblySizeSize(assemblySize: string) {
			this.assemblySize = assemblySize;
		},
		// updateLanguage
		updateLanguage(language: System.languageType) {
			this.language = language;
		},
		// setThemeConfig
		setThemeConfig(themeConfig: ThemeConfigProps) {
			this.themeConfig = themeConfig;
		},
		// 保存视图配置（2d/3d）
		setViewType(type: "2d" | "3d") {
			this.viewTypeStore = type;
		}
	},
	persist: piniaPersistConfig("GlobalState")
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
