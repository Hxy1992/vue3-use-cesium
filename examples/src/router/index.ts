import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { initMap } from "vue3-use-cesium";
import { loading } from "../loading";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
			meta: {
				title: "项目简介"
			}
		},
		{
			path: "/mapview",
			name: "MapView",
			component: () => import("../views/MapView.vue"),
			meta: {
				hasMap: true,
				title: "Hello World"
			}
		},
		{
			path: "/formview",
			name: "FormView",
			component: () => import("../views/FormView.vue"),
			meta: {
				hasMap: true,
				title: "表单地图"
			}
		},
		{
			path: "/plot",
			name: "PlotView",
			component: () => import("../views/PlotView.vue"),
			meta: {
				hasMap: true,
				title: "标绘"
			}
		},
		{
			path: "/measure",
			name: "MeasureView",
			component: () => import("../views/MeasureView.vue"),
			meta: {
				hasMap: true,
				title: "测量"
			}
		},
		{
			path: "/material",
			name: "MaterialView",
			component: () => import("../views/MaterialView.vue"),
			meta: {
				hasMap: true,
				title: "材质"
			}
		},
		{
			path: "/layer",
			name: "LayerPopupView",
			component: () => import("../views/LayerPopupView.vue"),
			meta: {
				hasMap: true,
				title: "图层和弹窗"
			}
		},
		{
			path: "/bookmark",
			name: "BookmarkView",
			component: () => import("../views/BookmarkView.vue"),
			meta: {
				hasMap: true,
				title: "场景书签"
			}
		}
	]
});

router.beforeEach(async (to, from, next) => {
	// ...
	document.title = `use cesium-${to.meta.title as string}`;
	// 如果页面包含地图则加载Cesium.js
	if (to.meta.hasMap) {
		loading.value = true;
		// CDN
		// await initMap([
		// 	`https://unpkg.com/cesium@1.105.0/Build/Cesium/Cesium.js`,
		// 	`https://unpkg.com/cesium@1.105.0/Build/Cesium/Widgets/widgets.css`
		// ]);
		// 使用本地地址调试(网速慢时改用本地地址)
		await initMap([`/CesiumV1.105/Cesium.js`, `/CesiumV1.105/Widgets/widgets.css`], {
			imagery: "gd-img"
		});
		loading.value = false;
	}

	// ...
	next();
});

export default router;
