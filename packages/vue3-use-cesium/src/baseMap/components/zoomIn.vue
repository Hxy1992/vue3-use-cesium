<template>
	<div class="map-button" @click="zoomIn" title="放大">
		<icons v-if="icon" :url="icon" />
		<div v-else class="txt-button">+</div>
	</div>
</template>

<script setup lang="ts" name="BaseMapZoomIn">
import { mapFactory } from "../../core/index";
import { getState } from "../../core/store";
import { setZoomInOrOut } from "../../core/util";
import icons from "./icons.vue";

defineOptions({
	name: "BaseMapZoomIn"
});
defineProps({
	icon: {
		type: String,
		required: true
	}
});

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
	.txt-button {
		font-size: 21px;
		line-height: 15px;
	}
}
</style>
