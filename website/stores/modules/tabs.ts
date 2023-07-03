import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "@/stores/interface";
import { TABS_WHITE_LIST } from "@/config/config";
// import { piniaPersistConfig } from "@/config/piniaPersist";
import router from "@/routers/index";

// TabsStore
export const TabsStore = defineStore({
	id: "TabsState",
	state: (): TabsState => ({
		tabsMenuList: []
	}),
	actions: {
		// Add Tabs
		async addTabs(tabItem: TabsMenuProps) {
			// not add tabs white list
			if (TABS_WHITE_LIST.includes(tabItem.path)) return;
			if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
				// 固定标签插入起始位置
				if (!tabItem.close) {
					this.tabsMenuList.unshift(tabItem);
				} else {
					this.tabsMenuList.push(tabItem);
				}
			}
		},
		// Remove Tabs
		async removeTabs(tabPath: string, isCurrent: boolean = true) {
			const tabsMenuList = this.tabsMenuList;
			if (isCurrent) {
				tabsMenuList.forEach((item, index) => {
					if (item.path !== tabPath) return;
					const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
					if (!nextTab) return;
					router.push(nextTab.path);
				});
			}
			this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath);
		},
		// 根据path删除tabs（剔除query参数）
		async removeTabsByPath(tabPath: string) {
			if (!tabPath) return;
			const tabsMenuList = this.tabsMenuList;
			const getPath = (str: string) => {
				const index = str.indexOf("?");
				if (index < 0) return str;
				return str.slice(0, index);
			};
			tabPath = getPath(tabPath);
			this.tabsMenuList = tabsMenuList.filter(item => getPath(item.path) !== tabPath);
		},
		// Close MultipleTab
		async closeMultipleTab(tabsMenuValue?: string) {
			this.tabsMenuList = this.tabsMenuList.filter(item => {
				return item.path === tabsMenuValue || !item.close;
			});
		},
		// Set Tabs
		async setTabs(tabsMenuList: TabsMenuProps[]) {
			this.tabsMenuList = tabsMenuList;
		},
		// Set Tabs Title
		async setTabsTitle(title: string) {
			const nowFullPath = location.hash.substring(1);
			this.tabsMenuList.forEach(item => {
				if (item.path == nowFullPath) item.title = title;
			});
		}
	}
	// persist: piniaPersistConfig("TabsState")
});
