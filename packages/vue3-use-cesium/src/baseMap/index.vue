<template>
	<Teleport :to="baseMapStore.toTarget">
		<div v-show="baseMapStore.visible" class="base-map" ref="mapRef" :map-id="baseMapStore.mapId" tabindex="0">
			<mapScale v-if="baseMapStore.tools.scale" ref="scaleRef" />
			<coodinations v-if="baseMapStore.tools.coodination" ref="coodsRef" />
			<div class="box-controls">
				<viewSet v-if="baseMapStore.tools.view" :icon2d="icons?.viewSet2D" :icon3d="icons?.viewSet3D" />
				<homeView v-if="baseMapStore.tools.home" :icon="icons?.homeView" />
				<recoverNorth v-if="baseMapStore.tools.north" :icon="icons?.recoverNorth" />
				<zoomOut v-if="baseMapStore.tools.zoom" :icon="icons?.zoomOut" />
				<zoomIn v-if="baseMapStore.tools.zoom" :icon="icons?.zoomIn" />
				<help v-if="baseMapStore.tools.help" :icon="icons?.help" />
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { mapFactory } from "../core/index";
import { getState, setMapId } from "../core/store";
import { mittBus } from "../utils/mittBus";
import type { MapTypes } from "../types";

import help from "./components/help.vue";
import zoomIn from "./components/zoomIn.vue";
import zoomOut from "./components/zoomOut.vue";
import recoverNorth from "./components/recoverNorth.vue";
import homeView from "./components/homeView.vue";
import viewSet from "./components/viewSet.vue";
import mapScale from "./components/mapScale.vue";
import coodinations from "./components/coodinations.vue";

defineOptions({
	name: "BaseMap"
});

// type IconsType = {
// 	/**
// 	 * 帮助
// 	 */
// 	help: string;
// 	/**
// 	 * 放大
// 	 */
// 	zoomIn: string;
// 	/**
// 	 * 缩小
// 	 */
// 	zoomOut: string;
// 	/**
// 	 * 恢复正北
// 	 */
// 	recoverNorth: string;
// 	/**
// 	 * 默认视图
// 	 */
// 	homeView: string;
// 	/**
// 	 * 二三维切换
// 	 */
// 	viewSet3D: string;
// 	/**
// 	 * 二三维切换
// 	 */
// 	viewSet2D: string;
// }

defineProps({
	/**
		 * 自定义图标URL
		 */
	icons: {
		type: Object,
		default: undefined
	}
});

let mapId: string;
const mapRef = ref();
const scaleRef = ref();
const coodsRef = ref();
const baseMapStore = getState();

let isCreated = false; // 标识只能创建一次
const createBaseMap = async (options?: MapTypes.mapOptionInterface) => {
	if (isCreated) return; // 只能创建一个
	mapId = await mapFactory.addStatic(mapRef.value, options);
	setMapId(mapId);
	coodsRef.value.initCoods(mapId);
	scaleRef.value.initScale(mapId);
	isCreated = true;
};
mittBus.on("createBasemap", createBaseMap);

// 组件销毁
onBeforeUnmount(() => {
	isCreated = false;
	mittBus.dispose();
	mapFactory.remove(mapId, true);
});
</script>

<style lang="scss" scoped>
.base-map {
	position: relative;
	width: 100%;
	height: 100%;

	.box-controls {
		position: absolute;
		right: 5px;
		bottom: 50px;
		z-index: 1001;
		display: flex;
		flex-direction: column;
		width: 18px;
		height: auto;
	}
}
</style>
