<template>
	<div class="zmap-tool_button zoom-in" @click="zoomIn" title="放大">
		<slot v-if="$slots.zoomIn" name="zoomIn" />
		<span v-else class="iconfont icon-zmapfangda"></span>
	</div>
</template>

<script setup lang="ts" name="MapOprationZoomIn">
import { mapFactory } from "../../../modules/factory/map-factory";
import { getState } from "../../../utils/store";
import { setZoomInOrOut } from "../../../modules/util";

const baseMapStore = getState();

const zoomIn = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	setZoomInOrOut(viewer, "zoomIn");
};
</script>
