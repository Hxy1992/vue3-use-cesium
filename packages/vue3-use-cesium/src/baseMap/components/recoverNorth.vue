<template>
	<div class="map-button" @click="north" title="恢复正北方向">
		<icons v-if="icon" :url="icon" />
		<div v-else class="north-icon"></div>
	</div>
</template>

<script setup lang="ts" name="BaseMapRecoverNoth">
import { mapFactory } from "../../core/index";
import { getState } from "../../core/store";
import { recoverNorth } from "../../core/util";
import icons from "./icons.vue";

defineOptions({
	name: "BaseMapRecoverNoth"
});
defineProps({
	icon: {
		type: String,
		required: true
	}
});

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
	.north-icon {
		width: 0;
		height: 0;
		border-right: 6.9px solid transparent;
		border-bottom: 12px solid #2c2c2c;
		border-left: 6.9px solid transparent;
	}
}
</style>
