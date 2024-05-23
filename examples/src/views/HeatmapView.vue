<template>
	<div class="bbox">
		<div id="my-map" class="content-box">
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { useBaseMap } from "../hooks/useBaseMap";
import { HeatmapLayer } from "vue3-use-cesium";

let hlayer: HeatmapLayer | null;
const longitude = 113;
const latitude = 25;
// 地图初始化
useBaseMap("#my-map", viewer => {
	viewer.camera.setView({
		destination: Cesium.Cartesian3.fromDegrees(longitude + 0.5, latitude + 0.5, 50000)
	});
	addlayer();
});

function addlayer() {
	// 热力图层
	hlayer = new HeatmapLayer("heatmap");
	// 设置热力数据
	const list: {
		lng: number;
		lat: number;
		value: number;
	}[] = [];
	for (let i = 0; i < 1000; i++) {
		list.push({
			lng: longitude + Math.random(),
			lat: latitude + Math.random(),
			value: Math.random()
		})
	}
	hlayer.setPoints(list);
}

onBeforeUnmount(() => {
	// 销毁图层
	hlayer?.dispose();
})
</script>

<style scoped>
.bbox,
.content-box {
	width: 100%;
	height: 100%;
}

.content-box .popup {
	position: absolute;
	z-index: 999;
	display: none;
	width: 200px;
	height: 60px;
	padding: 8px 12px;
	background-color: white;
}

.popup-tips-after::before {
	position: absolute;
	top: 100%;
	left: 50%;
	z-index: -1;
	width: 20px;
	height: 20px;
	content: "";
	background-color: white;
	transform: translate(-50%, -70%) rotate(45deg);
	transform-origin: center center;
}
</style>
