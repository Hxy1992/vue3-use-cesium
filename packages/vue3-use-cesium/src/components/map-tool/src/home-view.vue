<template>
	<div class="zmap-tool_button home-view" @click="homeView" title="默认视图">
		<slot v-if="$slots.homeView" name="homeView" />
		<span v-else class="iconfont icon-zmapzhuye"></span>
	</div>
</template>

<script setup lang="ts" name="MapOprationHomeView">
import { mapFactory } from "../../../modules/basemap";
import { getState } from "../../../utils/store";

const baseMapStore = getState();

const homeView = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	viewer.camera.flyHome(baseMapStore.flyHomeDuration);
};
</script>
