<template>
	<div class="zhd-map-operation-button zoom-out" @click="zoomOut" title="缩小">
		<slot v-if="$slots.zoomOut" />
		<div v-else class="txt-button">-</div>
	</div>
</template>

<script setup lang="ts" name="MapOprationZoomOut">
import { mapFactory } from "../../../modules/factory/map-factory";
import { getState } from "../../../utils/store";
import { setZoomInOrOut } from "../../../modules/util";

defineOptions({
	name: "MapOprationZoomOut"
});

const baseMapStore = getState();

const zoomOut = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	setZoomInOrOut(viewer, "zoomOut");
};
</script>
