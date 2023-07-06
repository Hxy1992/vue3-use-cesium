<template>
	<Teleport :to="baseMapStore.toTarget">
		<div v-show="baseMapStore.visible" class="base-map" ref="mapRef" :map-id="baseMapStore.mapId" tabindex="0">
			<!-- 比例尺面板 -->
			<mapScale v-if="baseMapStore.tools.scale" ref="scaleRef" />
			<!-- 经纬度坐标 -->
			<coodinations v-if="baseMapStore.tools.coodination" ref="coodsRef" />
			<!-- 操作按钮 -->
			<help v-if="baseMapStore.tools.help" />
			<zoomIn v-if="baseMapStore.tools.zoom" />
			<zoomOut v-if="baseMapStore.tools.zoom" />
			<recoverNorth v-if="baseMapStore.tools.north" />
			<homeView v-if="baseMapStore.tools.home" />
			<viewSet v-if="baseMapStore.tools.view" />
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { mapFactory } from "vue3-use-cesium/core/index";
import { getState, setMapId } from "vue3-use-cesium/core/store";
import help from "./components/help.vue";
import zoomIn from "./components/zoomIn.vue";
import zoomOut from "./components/zoomOut.vue";
import recoverNorth from "./components/recoverNorth.vue";
import homeView from "./components/homeView.vue";
import viewSet from "./components/viewSet.vue";
import mapScale from "./components/mapScale.vue";
import coodinations from "./components/coodinations.vue";
import { mittBus } from "vue3-use-cesium/utils/mittBus";
import { MapTypes } from "vue3-use-cesium/types";

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
}
</style>
