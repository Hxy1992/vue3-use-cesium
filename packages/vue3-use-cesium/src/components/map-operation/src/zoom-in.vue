<template>
	<div class="zhd-map-operation-button zoom-in" @click="zoomIn" title="放大">
		<slot v-if="$slots.zoomIn" />
		<div v-else class="txt-button">+</div>
	</div>
</template>

<script setup lang="ts" name="MapOprationZoomIn">
import { mapFactory } from "../../../modules/factory/map-factory";
import { getState } from "../../../utils/store";
import { setZoomInOrOut } from "../../../modules/util";

defineOptions({
	name: "MapOprationZoomIn"
});

const baseMapStore = getState();

const zoomIn = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	setZoomInOrOut(viewer, "zoomIn");
};
</script>
