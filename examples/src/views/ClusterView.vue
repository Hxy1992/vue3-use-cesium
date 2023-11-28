<template>
	<div class="bbox">
		<div id="my-map" class="content-box">
			<div ref="popupRef" class="popup popup-tips-after">
				<div>姓名：{{ popupData.name }}</div>
				<div>电话：{{ popupData.phone }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { useBaseMap } from "../hooks/useBaseMap";
import { ClusterLayer } from "vue3-use-cesium";
import img from "../assets/locate.png";

const popupRef = ref<HTMLElement>();
const popupData = ref({
	name: "",
	phone: ""
});
let clayer: ClusterLayer | null;
const longitude = 113;
const latitude = 25;

// 地图初始化
useBaseMap("#my-map", viewer => {
	viewer.camera.setView({
		destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 500000)
	});
	addlayer();
});

function addlayer() {
	// 聚合图层
	clayer = new ClusterLayer("cluster", {
		image: img,
		style: "circle"
	});
	// 设置聚合点数据
	const list: {
		longitude: number;
		latitude: number;
		properties?: Record<string, any>;
	}[] = [];
	for (let i = 0; i < 1000; i++) {
		list.push({
			longitude: longitude + Math.random(),
			latitude: latitude + Math.random(),
			properties: {
				name: "聚合点" + i
			}
		})
	}
	clayer.setPoints(list);

	// 图层弹窗
	clayer.onPopup({
		dom: popupRef.value as HTMLElement,
		offsetY: -40
	}, (pick) => {
		return pick && pick.id && clayer?.contains(pick.id);
	}, (visible, pick) => {
		if (visible) {
			popupData.value = {
				// properties -> attr
				name: pick.id?.attr?.name,
				phone: Math.floor(Math.random() * 100000000000).toString()
			};
		}
	})
}

onBeforeUnmount(() => {
	// 清空所有图层（图层事件会自动清空）
	clayer?.dispose();
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
