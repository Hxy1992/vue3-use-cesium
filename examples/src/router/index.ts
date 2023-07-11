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
			component: HomeView
		},
		{
			path: "/mapview",
			name: "满屏地图",
			component: () => import("../views/MapView.vue"),
			meta: {
				hasMap: true
			}
		},
		{
			path: "/mapview2",
			name: "表单地图",
			component: () => import("../views/MapView2.vue"),
			meta: {
				hasMap: true
			}
		}
	]
});

router.beforeEach(async (to, from, next) => {
	// ...

	// 如果页面包含地图则加载Cesium.js
	if (to.meta.hasMap) {
		loading.value = true;
		// CDN
		// await initMap([
		// 	`https://unpkg.com/cesium@1.105.0/Build/Cesium/Cesium.js`,
		// 	`https://unpkg.com/cesium@1.105.0/Build/Cesium/Widgets/widgets.css`
		// ]);
		// 使用本地地址调试(网速慢时改用本地地址)
		await initMap([`/CesiumV1.105/Cesium.js`, `/CesiumV1.105/Widgets/widgets.css`]);
		loading.value = false;
	}

	// ...
	next();
});

export default router;
