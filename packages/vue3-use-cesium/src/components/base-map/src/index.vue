<template>
	<Teleport :to="baseMapStore.toTarget">
		<div v-show="baseMapStore.visible" class="zmap-base" ref="mapRef" :map-id="baseMapStore.mapId" tabindex="0">
			<slot></slot>
		</div>
	</Teleport>
</template>

<script setup lang="ts" name="BaseMap">
import { ref, onBeforeUnmount } from "vue";
import { mapFactory } from "../../../modules/basemap";
import { getState, setMapId } from "../../../utils/store";
import { mittBus } from "../../../utils/mitt-bus";
import type { MapOptionTypes } from "../../../interfaces/map";

let mapId: string;
const mapRef = ref();
const baseMapStore = getState();

let isCreated = false; // 标识只能创建一次
const createBaseMap = async (options?: MapOptionTypes) => {
	if (isCreated) return; // 只能创建一个
	mapId = await mapFactory.addStatic(mapRef.value as HTMLElement, options);
	setMapId(mapId);
	isCreated = true;
	mittBus.emit("baseMapCreated", mapId);
};
mittBus.on("createBasemap", createBaseMap);

// 组件销毁
onBeforeUnmount(() => {
	isCreated = false;
	mittBus.dispose();
	mapFactory.remove(mapId, true);
});
</script>
