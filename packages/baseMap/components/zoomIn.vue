<template>
	<div class="map-button" @click="zoomIn" title="放大">
		<div class="txt-button">+</div>
	</div>
</template>

<script setup lang="ts">
import { mapFactory } from "vue3-use-cesium/core/index";
import { getState } from "vue3-use-cesium/core/store";
import { setZoomInOrOut } from "vue3-use-cesium/core/util";

const baseMapStore = getState();

const zoomIn = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	setZoomInOrOut(viewer, "zoomIn");
};
</script>

<style lang="scss" scoped>
@import "./button.scss";
.map-button {
	bottom: 78px;
	.txt-button {
		font-size: 21px;
		line-height: 15px;
	}
}
</style>
