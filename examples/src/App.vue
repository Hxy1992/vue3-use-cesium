<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { BaseMap, MapOperation, MapScale, MapStatus } from "vue3-use-cesium";
import loading from "./components/loading.vue"
// import recoverNorth from "./assets/recoverNorth.svg"

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
		path: "/mapview2",
		label: "表单地图",
		selected: false
	}
]);

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
		<base-map>
			<map-operation />
			<map-scale />
			<map-status />
		</base-map>
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
</style>
