/* themeConfigProp */
export interface ThemeConfigProps {
	layout: string;
	primary: string;
	isDark: boolean;
	isGrey: boolean;
	isCollapse: boolean;
	isWeak: boolean;
	breadcrumb: boolean;
	breadcrumbIcon: boolean;
	tabs: boolean;
	tabsIcon: boolean;
	footer: boolean;
	maximize: boolean;
}

/* GlobalState */
export interface GlobalState {
	loginName: any;
	userInfo: any;
	assemblySize: string;
	language: System.languageType;
	themeConfig: ThemeConfigProps;
	viewTypeStore: "2d" | "3d";
}

/* tabsMenuProps */
export interface TabsMenuProps {
	icon?: string;
	svgIcon?: string;
	title: string;
	path: string;
	name: string;
	close: boolean;
}

/* TabsState */
export interface TabsState {
	tabsMenuList: TabsMenuProps[];
}

/* AuthState */
export interface AuthState {
	systemName: "platform" | "account";
	routeName: string;
	homeUrl: string;
	authButtonList: {
		[key: string]: string[];
	};
	authMenuList: Menu.MenuOptions[];
}

/* keepAliveState */
export interface keepAliveState {
	keepAliveName: string[];
}
export interface BuildingProps {
	name: string;
	floorName: string;
	id: number;
	parentId: number;
	height: string;
}
export interface BuildingState {
	buildingList: BuildingProps[];
}
export interface RefreshState {
	refreshflags: Map<String, Boolean>;
}
export interface StationProps {
	code: string;
	name: string;
	group: string;
	level?: number;
	longitude?: number;
	latitude?: number;
	altitude?: number;
	state?: number;
	buildingName: string;
	floorName: string;
	buildingId: string;
	parentId: string;
}

export interface SceneProps {
	name: string;
	buildingName: string;
	floor: number;
	west?: number;
	south?: number;
	east?: number;
	north?: number;
	delivery: false;
	type: number;
	content: string;
	projection: number;
	config: string;
	height?: number;
	coordinate: string;
}
