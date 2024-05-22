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
import { getState, setMapId, setTdtToken } from "../../../utils/store";
import { mittBus } from "../../../utils/mitt-bus";
import type { MapOptionTypes } from "../../../interfaces/map";
import { BusEnum } from "../../../enums/bus-enum";

let mapId: string;
const mapRef = ref();
const baseMapStore = getState();

let isCreated = false; // 标识只能创建一次
const createBaseMap = async (options?: MapOptionTypes) => {
	if (isCreated) return; // 只能创建一个
	mapId = await mapFactory.addStatic(mapRef.value as HTMLElement, options);
	setMapId(mapId);
	setTdtToken(options?.tdtToken);
	isCreated = true;
	mittBus.emit(BusEnum.BaseMapCreated, mapId);
};
mittBus.on(BusEnum.StartCreateBaseMap, createBaseMap);

// 组件销毁
onBeforeUnmount(() => {
	isCreated = false;
	mittBus.dispose();
	mapFactory.remove(mapId, true);
});
</script>
