<template>
	<div v-show="coodinationVisible" class="coods-label">鼠标位置: {{ coodination.x }}, {{ coodination.y }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { mapFactory } from "vue3-use-cesium/core/index";

const coodinationVisible = ref(true);
const coodination = ref({
	x: "0",
	y: "0"
});

// 鼠标位置坐标
const initCoods = (mapId: string) => {
	const eventFactory = mapFactory.getEvent(mapId);
	const viewer = mapFactory.get(mapId);
	eventFactory.push(
		"MOUSE_MOVE",
		(event: any) => {
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
};

defineExpose({ initCoods });
</script>

<style lang="scss" scoped>
.coods-label {
	position: absolute;
	right: 5px;
	bottom: 0;
	z-index: 1001;
	padding: 2px;
	font-size: 12px;
	font-weight: 600;
	color: #000000;
	text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
	letter-spacing: 0;
}
</style>
