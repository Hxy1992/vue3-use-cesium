<template>
	<div class="map-button" @click="north" title="恢复正北方向">
		<div class="north-icon"></div>
	</div>
</template>

<script setup lang="ts">
import { mapFactory } from "vue3-use-cesium/core/index";
import { getState } from "vue3-use-cesium/core/store";
import { recoverNorth } from "vue3-use-cesium/core/util";

const baseMapStore = getState();
const north = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	recoverNorth(viewer);
};
</script>

<style lang="scss" scoped>
@import "./button.scss";
.map-button {
	bottom: 124px;
	.north-icon {
		width: 0;
		height: 0;
		border-right: 6.9px solid transparent;
		border-bottom: 12px solid #2c2c2c;
		border-left: 6.9px solid transparent;
	}
}
</style>
