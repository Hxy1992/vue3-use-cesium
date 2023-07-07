<template>
	<div class="map-button" @click="zoomOut" title="放大">
		<div class="txt-button">-</div>
	</div>
</template>

<script setup lang="ts" name="BaseMapZoomOut">
import { mapFactory } from "../../core/index";
import { getState } from "../../core/store";
import { setZoomInOrOut } from "../../core/util";

defineOptions({
	name: "BaseMapZoomOut"
});

const baseMapStore = getState();

const zoomOut = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	setZoomInOrOut(viewer, "zoomOut");
};
</script>

<style lang="scss" scoped>
@import "./button.scss";
.map-button {
	bottom: 101px;
	.txt-button {
		font-size: 30px;
		line-height: 12px;
	}
}
</style>
