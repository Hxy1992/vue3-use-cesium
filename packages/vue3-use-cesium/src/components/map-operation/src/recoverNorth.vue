<template>
	<div class="zhd-map-operation-button recover-north" @click="north" title="恢复正北方向">
		<slot v-if="$slots.recoverNorth" />
		<div v-else class="north-icon"></div>
	</div>
</template>

<script setup lang="ts" name="MapOprationRecoverNoth">
import { mapFactory } from "../../../modules/factory/map-factory";
import { getState } from "../../../utils/store";
import { recoverNorth } from "../../../modules/util";

defineOptions({
	name: "MapOprationRecoverNoth"
});

const baseMapStore = getState();
const north = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	recoverNorth(viewer);
};
</script>
