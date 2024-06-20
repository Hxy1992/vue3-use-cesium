<template>
	<div class="zmap-tool_button recover-north" @click="north" title="恢复正北方向">
		<slot v-if="$slots.recoverNorth" name="recoverNorth" />
		<img v-else class="svg-icon" alt="方向" :src="svgUrl" />
	</div>
</template>

<script setup lang="ts" name="MapOprationRecoverNoth">
import { mapFactory } from "../../../modules/basemap";
import { getState } from "../../../utils/store";
import { recoverNorth } from "../../../modules/util";
import svgUrl from "../../../assets/svg/north.svg";

const baseMapStore = getState();
const north = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	recoverNorth(viewer);
};
</script>
