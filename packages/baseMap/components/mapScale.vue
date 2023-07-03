<template>
	<div v-show="distanceLabel" class="scale-container">
		<label class="legend-text">{{ distanceLabel }}</label>
		<div class="ic-scale" :style="`width: ${barWidth}px; height: 12px;`">
			<div class="ic-inner"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { mapFactory } from "vue3-use-cesium/core/index";

const distanceLabel = ref<string | undefined>();
const barWidth = ref<number | undefined>();

// 地图比例尺
const initScale = (mapId: string) => {
	const eventFactory = mapFactory.getEvent(mapId);
	eventFactory.push(
		"MOVE_START",
		() => {
			cesiumScale(mapId);
		},
		true
	);
	eventFactory.push(
		"MOVE_END",
		() => {
			cesiumScale(mapId);
		},
		true
	);
};
const cesiumScale = (mapId: string) => {
	const viewer = mapFactory.get(mapId);
	const distances = [
		1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000, 200000, 300000,
		500000, 1000000, 2000000, 3000000, 5000000, 10000000, 20000000, 30000000, 50000000
	];
	// Find the distance between two pixels at the bottom center of the screen.
	const scene = viewer.scene;
	const width = 0;
	const height = scene.canvas.clientHeight - 10;
	const left = new Cesium.Cartesian2(width, height);
	const right = new Cesium.Cartesian2(1 + width, height);
	// const globe = scene.globe
	// const leftPosition = globe.pick(left, scene)
	// const rightPosition = globe.pick(right, scene)
	const ellipsoid = viewer.scene.globe.ellipsoid;
	const leftPosition = viewer.camera.pickEllipsoid(left, ellipsoid);
	const rightPosition = viewer.camera.pickEllipsoid(right, ellipsoid);
	if (!Cesium.defined(leftPosition) || !Cesium.defined(rightPosition)) {
		barWidth.value = undefined;
		distanceLabel.value = undefined;
		return;
	}
	const leftCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(leftPosition);
	const rightCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(rightPosition);
	const geodesic = new Cesium.EllipsoidGeodesic(leftCartographic, rightCartographic, ellipsoid);
	const pixelDistance = geodesic.surfaceDistance;
	// Find the first distance that makes the scale bar less than 100 pixels.
	const maxBarWidth = 100;
	let distance: any;
	for (let i = distances.length - 1; !Cesium.defined(distance) && i >= 0; --i) {
		if (distances[i] / pixelDistance < maxBarWidth) {
			distance = distances[i];
		}
	}
	if (Cesium.defined(distance)) {
		const label = distance >= 1000 ? (distance / 1000).toString() + " km" : distance.toString() + " m";
		barWidth.value = (distance / pixelDistance) | 0;
		distanceLabel.value = label;
	} else {
		barWidth.value = undefined;
		distanceLabel.value = undefined;
	}
};

defineExpose({ initScale });
</script>

<style lang="scss" scoped>
.scale-container {
	position: absolute;
	right: 5px;
	bottom: 20px;
	z-index: 1001;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
	width: 120px;
	height: 40px;
	font-weight: 600;
	color: #000000;
	text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
	pointer-events: none;
	.ic-scale {
		box-sizing: border-box;
		background-color: transparent;
		border-color: #000000;
		border-style: solid;
		border-width: 4px;
		border-top: 0;
		box-shadow: 0 1px 1px white;
		.ic-inner {
			width: 100%;
			height: 100%;
			border: 1px solid white;
			border-top: 0;
		}
	}
}
</style>
