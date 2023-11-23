<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ZMapBase, ZMapTool, ZMapScale, ZMapStatus } from "vue3-use-cesium";
import loading from "./components/loading.vue"
import recoverNorth from "./assets/recoverNorth.svg"
import homeSvg from "./assets/home.svg"
import elecImg from "./assets/elec.jpg"
import satelliteImg from "./assets/satellite.jpg"

const route = useRoute();
const menuList = ref<Record<string, any>[]>([
	{
		path: "/",
		label: "主页",
		selected: false
	},
	{
		path: "/mapview",
		label: "满屏地图",
		selected: false
	},
	{
		path: "/formview",
		label: "表单地图",
		selected: false
	},
	{
		path: "/plot",
		label: "标绘",
		selected: false
	},
	{
		path: "/measure",
		label: "测量",
		selected: false
	},
	{
		path: "/material",
		label: "材质",
		selected: false
	}
]);

const defaultImagerys: any = [
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
	<header class="head">
		<RouterLink v-for="item in menuList" :key="item.path" :to="item.path"
			:class="{ 'menu-item': true, 'selected': item.selected }">{{ item.label }}</RouterLink>
	</header>
	<main class="main">
		<RouterView />
		<z-map-base>
			<z-map-tool :imagerys="defaultImagerys">
				<!-- 插槽-自定义按钮图标 -->
				<!-- <template #help>?</template>
				<template #view2d>2D</template>
				<template #view3d>3D</template>
				<template #homeView>
					<img class="btn-icons" :src="homeSvg" alt="">
				</template>
				<template #recoverNorth>
					<img class="btn-icons" :src="recoverNorth" alt="">
				</template>
				<template #zoomOut>-</template>
				<template #zoomIn>+</template> -->
			</z-map-tool>
			<z-map-scale />
			<z-map-status />
		</z-map-base>
	</main>
	<loading />
</template>

<style scoped>
.head {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 50px;
	background: #191c29;
}

.menu-item {
	margin: 0 8px;
	color: white;
	text-decoration-line: none;
}

.menu-item.selected {
	color: aquamarine;
}

.main {
	position: absolute;
	top: 50px;
	width: 100%;
	height: calc(100% - 50px);
}

.btn-icons {
	width: 18px;
	height: 18px;
}
</style>
