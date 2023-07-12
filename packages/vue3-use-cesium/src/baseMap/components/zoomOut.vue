<template>
	<div class="map-button" @click="zoomOut" title="缩小">
		<icons v-if="icon" :url="icon" />
		<div v-else class="txt-button">-</div>
	</div>
</template>

<script setup lang="ts" name="BaseMapZoomOut">
import { mapFactory } from "../../core/index";
import { getState } from "../../core/store";
import { setZoomInOrOut } from "../../core/util";
import icons from "./icons.vue";

defineOptions({
	name: "BaseMapZoomOut"
});
defineProps({
	icon: {
		type: String,
		required: true
	}
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
	.txt-button {
		font-size: 30px;
		line-height: 12px;
	}
}
</style>
