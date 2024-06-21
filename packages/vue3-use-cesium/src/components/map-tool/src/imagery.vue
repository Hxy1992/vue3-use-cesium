<template>
	<div class="zmap-tool_button imagery">
		<div title="底图管理" style="height: 16px;" @click="imageryClick">
			<slot v-if="$slots.imagery" name="imagery" />
			<img v-else class="svg-icon" alt="图层" :src="svgUrl" />
		</div>

		<div v-if="popoverVisible" ref="popoverRef" class="imageryChoose" tabindex="2" @blur="popoverVisible = false">
			<div class="label">底图：</div>
			<div class="list">
				<div v-for="item in imagerys" class="item" :title="item.label" :style="{
					backgroundImage: `url(${item.backgroundImage || ''})`
				}" @click="chooseImagery(item)">
					{{ item.label }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="MapOprationImagery">
import { mapFactory } from "../../../modules/basemap";
import { getState, setCurrentImagery } from "../../../utils/store";
import type { ImageryItemTypes, ImageryListTypes } from "../../../interfaces/components";
import { ref, nextTick } from "vue";
import { setImagery } from "../../../modules/imagery/index";
import svgUrl from "../../../assets/svg/layer.svg";

defineProps<{
	imagerys: ImageryListTypes
}>();

const baseMapStore = getState();
const popoverVisible = ref(false);
const popoverRef = ref();

const imageryClick = () => {
	popoverVisible.value = !popoverVisible.value;
	if (popoverVisible.value) {
		nextTick(() => {
			popoverRef.value.focus();
		})
	}
};
const chooseImagery = (item: ImageryItemTypes) => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	setImagery(viewer, item.type, "zh", item.url);
	setCurrentImagery(item.type);
};
</script>
