<template>
	<div class="zmap-tool_button zoom-out" @click="zoomOut" title="缩小">
		<slot v-if="$slots.zoomOut" name="zoomOut" />
		<span v-else class="iconfont icon-zmapsuoxiao"></span>
	</div>
</template>

<script setup lang="ts" name="MapOprationZoomOut">
import { mapFactory } from "../../../modules/basemap";
import { getState } from "../../../utils/store";
import { setZoomInOrOut } from "../../../modules/util";

const baseMapStore = getState();

const zoomOut = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	setZoomInOrOut(viewer, "zoomOut");
};
</script>
