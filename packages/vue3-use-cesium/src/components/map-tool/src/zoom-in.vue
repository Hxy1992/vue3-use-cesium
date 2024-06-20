<template>
	<div class="zmap-tool_button zoom-in" @click="zoomIn" title="放大">
		<slot v-if="$slots.zoomIn" name="zoomIn" />
		<img v-else class="svg-icon" alt="放大" :src="svgUrl" />
	</div>
</template>

<script setup lang="ts" name="MapOprationZoomIn">
import { mapFactory } from "../../../modules/basemap";
import { getState } from "../../../utils/store";
import { setZoomInOrOut } from "../../../modules/util";
import svgUrl from "../../../assets/svg/zoomin.svg";

const baseMapStore = getState();

const zoomIn = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	setZoomInOrOut(viewer, "zoomIn");
};
</script>
