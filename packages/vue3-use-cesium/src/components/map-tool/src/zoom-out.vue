<template>
	<div class="zmap-tool_button zoom-out" @click="zoomOut" title="缩小">
		<slot v-if="$slots.zoomOut" name="zoomOut" />
		<img v-else class="svg-icon" alt="缩小" :src="svgUrl" />
	</div>
</template>

<script setup lang="ts" name="MapOprationZoomOut">
import { mapFactory } from "../../../modules/basemap";
import { getState } from "../../../utils/store";
import { setZoomInOrOut } from "../../../modules/util";
import svgUrl from "../../../assets/svg/zoomout.svg";

const baseMapStore = getState();

const zoomOut = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	setZoomInOrOut(viewer, "zoomOut");
};
</script>
