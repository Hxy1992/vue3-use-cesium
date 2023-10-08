<template>
	<div class="zhd-map-operation-button imagery">
		<div class="txt-button" title="底图管理" @click="imageryClick">
			<slot v-if="$slots.imagery" name="imagery" />
			<template v-else>底</template>
		</div>

		<div v-if="popoverVisible" ref="popoverRef" class="imageryChoose" tabindex="2" @blur="popoverVisible = false">
			<div class="label">底图：</div>
			<div class="list">
				<div v-for="item in imagerys" class="item" :style="{
					backgroundImage: `url(${item.backgroundImage || ''})`
				}" @click="chooseImagery(item)">
					{{ item.label }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="MapOprationImagery">
import { mapFactory } from "../../../modules/factory/map-factory";
import { getState, setCurrentImagery } from "../../../utils/store";
import type { ImageryItemTypes, ImageryListTypes } from "../../../interface/components";
import { ref, nextTick } from "vue";
import { setImagery } from "../../../modules/imagery/index";

defineOptions({
	name: "MapOprationImagery"
});

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
