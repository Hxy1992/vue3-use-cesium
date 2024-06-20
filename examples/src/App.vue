<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import router from './router'
import { ZMapBase, ZMapTool, ZMapScale, ZMapStatus } from "vue3-use-cesium";
import loading from "./components/loading.vue"
import recoverNorth from "./assets/recoverNorth.svg"
import homeSvg from "./assets/home.svg"
import elecImg from "./assets/elec.jpg"
import satelliteImg from "./assets/satellite.jpg"

const route = useRoute();
const menuList = ref<Record<string, any>[]>([]);
menuList.value = router.getRoutes().map(item => {
	return {
		path: item.path,
		label: item.meta?.title,
		selected: false
	};
})

const defaultImagerys = [
	{
		label: "高德卫星(无偏移)",
		type: "gd-img",
		backgroundImage: satelliteImg
	},
	{
		label: "高德电子(无偏移)",
		type: "gd-vec",
		backgroundImage: elecImg
	},
	{
		label: "OSM",
		type: "osm-normal",
		backgroundImage: elecImg
	}
]

// 监听路由的变化
watch(
	() => route.path,
	() => {
		for (let index = 0; index < menuList.value.length; index++) {
			const menu = menuList.value[index];
			menu.selected = menu.path === route.path;
		}
	},
	{
		immediate: true
	}
);
</script>

<template>
	<aside class="side">
		<RouterLink v-for="item in menuList" :key="item.path" :to="item.path"
			:class="{ 'menu-item': true, 'selected': item.selected }">{{ item.label }}</RouterLink>
	</aside>
	<main class="main">
		<RouterView />
		<z-map-base>
			<z-map-tool :imagerys="defaultImagerys" />
			<z-map-scale />
			<z-map-status />
		</z-map-base>
	</main>
	<loading />
</template>

<style scoped>
.side {
	position: absolute;
	display: flex;
	flex-direction: column;
	/* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: flex-start;
	width: 215px;
	height: 100%;
	padding: 16px 0;
	background: #191c29;
}

.menu-item {
	position: relative;
	width: 100%;
	padding-left: 16px;
	line-height: 40px;
	color: white;
	text-decoration-line: none;
}

.menu-item:hover {
	color: #4064e2;
}

.menu-item.selected {
	background: #060708;
}

.menu-item.selected::before {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	width: 4px;
	content: "";
	background: #4064e2;
}

.main {
	position: absolute;
	left: 215px;
	width: calc(100% - 215px);
	height: 100%;
}

.btn-icons {
	width: 18px;
	height: 18px;
}
</style>
