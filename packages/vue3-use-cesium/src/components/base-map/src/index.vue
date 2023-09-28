<template>
	<Teleport :to="baseMapStore.toTarget">
		<div v-show="baseMapStore.visible" class="zhd-base-map" ref="mapRef" :map-id="baseMapStore.mapId" tabindex="0">
			<slot></slot>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { mapFactory } from "../../../modules/factory/map-factory";
import { getState, setMapId } from "../../../utils/store";
import { mittBus } from "../../../utils/mitt-bus";
import type { MapTypes } from "../../../types";

defineOptions({
	name: "BaseMap"
});

let mapId: string;
const mapRef = ref();
const baseMapStore = getState();

let isCreated = false; // 标识只能创建一次
const createBaseMap = async (options?: MapTypes.MapOptionTypes) => {
	if (isCreated) return; // 只能创建一个
	mapId = await mapFactory.addStatic(mapRef.value, options);
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
