<template>
	<div class="zmap-tool_button home-view" @click="homeView" title="默认视图">
		<slot v-if="$slots.homeView" name="homeView" />
		<img v-else class="svg-icon" alt="默认视图" :src="svgUrl" />
	</div>
</template>

<script setup lang="ts" name="MapOprationHomeView">
import { mapFactory } from "../../../modules/basemap";
import { getState } from "../../../utils/store";
import svgUrl from "../../../assets/svg/home.svg";

const baseMapStore = getState();

const homeView = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	viewer.camera.flyHome(baseMapStore.flyHomeDuration);
};
</script>
