<template>
	<div class="zhd-map-operation-button home-view" @click="homeView" title="默认视图">
		<slot v-if="$slots.homeView" />
		<div v-else class="home-icon">
			<div class="top"></div>
			<div class="bottom"></div>
		</div>
	</div>
</template>

<script setup lang="ts" name="MapOprationHomeView">
import { mapFactory } from "../../../modules/factory/map-factory";
import { getState } from "../../../utils/store";

defineOptions({
	name: "MapOprationHomeView"
});

const baseMapStore = getState();

const homeView = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	viewer.camera.flyHome(baseMapStore.flyHomeDuration);
};
</script>
