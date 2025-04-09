<template>
	<div class="zmap-status">
		<template v-if="coodinationVisible">
			鼠标位置: {{ coodination.x }}, {{ coodination.y }} |
		</template>
		<template v-if="cameraStatusVisible">
			相机: 偏航角 {{ cameraData.heading }}°, 俯仰角{{ cameraData.pitch }}°, 翻滚角 {{ cameraData.roll }}° |
		</template>
		<template v-if="zoomLevel !== -1">
			缩放级别: {{ zoomLevel }}
		</template>
	</div>
</template>

<script setup lang="ts" name="BaseMapCoodinations">
import { computed, ref } from "vue";
import { mapFactory } from "../../../modules/basemap";
import { mittBus } from "../../../utils/mitt-bus";
import { BusEnum } from "../../../enums/bus-enum";
import { getState } from "../../../utils/store";
import { getZoom } from "../../../modules/util";

const coodinationVisible = ref(true);
const coodination = ref({
	x: "0",
	y: "0"
});
const zoomLevel = ref(-1);
const cameraData = ref({
	heading: 0,
	pitch: 0,
	roll: 0
});
const baseMapStore = getState();

const cameraStatusVisible = computed(() => {
	return baseMapStore.viewType === '3d';
});

// 鼠标位置坐标
const initCoods = (mapId: string) => {
	const eventFactory = mapFactory.getEvent(mapId);
	const viewer = mapFactory.get(mapId);
	eventFactory.push(
		"MOUSE_MOVE",
		(event: any) => {
			// 跟踪时不显示鼠标坐标
			if (viewer.trackedEntity) {
				coodinationVisible.value = false;
				return;
			}
			const worldPosition = viewer.camera.pickEllipsoid(event.endPosition, viewer.scene.globe.ellipsoid);
			if (!Cesium.defined(worldPosition)) {
				coodinationVisible.value = false;
				return;
			}
			coodinationVisible.value = true;

			const cartographic = Cesium.Cartographic.fromCartesian(worldPosition);
			const lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(8);
			const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(8);
			if (typeof lng === "string") {
				coodination.value.x = Number(lng) > 0 ? `${lng}E` : `${Math.abs(Number(lng))}W`;
			}
			if (typeof lat === "string") {
				coodination.value.y = Number(lat) > 0 ? `${lat}N` : `${Math.abs(Number(lat))}S`;
			}
			if (lng === "0") coodination.value.x = "0";
			if (lat === "0") coodination.value.y = "0";
		},
		true
	);
	eventFactory.push(
		"MOVE_END",
		() => {
			// 获取当前场景的相机
			const camera = viewer.camera;
			// 获取相机的姿态角度
			cameraData.value.heading = Math.floor(Cesium.Math.toDegrees(camera.heading));
			cameraData.value.pitch = Math.floor(Cesium.Math.toDegrees(camera.pitch));
			cameraData.value.roll = Math.floor(Cesium.Math.toDegrees(camera.roll));

			zoomLevel.value = getZoom(viewer);
		},
		true
	);
};

mittBus.on(BusEnum.BaseMapCreated, initCoods);
</script>
