<template>
	<div class="bbox">
		<div id="my-map" class="content-box">
		</div>
		<div class="btn-box">
			图层列表
			<pre />
			<ul class="layer-list">
				<li v-for="(lyr, index) in layerList" :key="lyr.id"><input type="checkbox" v-model="lyr.visible"
						@change="layerVisibleChange(lyr)">{{ lyr.name }}<button @click="deleteLayer(lyr.id, index)">删除</button></li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { useBaseMap } from "../hooks/useBaseMap";
import { LayerFactory } from "vue3-use-cesium";
import img from "../assets/locate.png";

interface LayerItem {
	id: string;
	name: string;
	visible: boolean;
}

let layerFactory: LayerFactory | null;
const layerList = ref<LayerItem[]>([]);

// 地图初始化
useBaseMap("#my-map", viewer => {
	viewer.camera.setView({
		destination: Cesium.Cartesian3.fromDegrees(110, 31, 5000000)
	});
	addlayer();
	// 初始化
	layerList.value = (layerFactory?.getAllLayers() || []).map((lyr) => {
		return {
			id: lyr.getId(),
			name: lyr.getName(),
			visible: lyr.getVisible()
		};
	});
});
// 添加图层
function addlayer() {
	// billboard点
	layerFactory = new LayerFactory();
	const layer1 = layerFactory.addLayer("设备点", {
		// position: Cesium.Cartesian3.fromDegrees(longitude, latitude, altitude),
		show: true,
		billboard: {
			image: img,
			horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 水平
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直
			eyeOffset: new Cesium.Cartesian3(0, -10),
		},
		label: {
			show: true,
			font: "14px Helvetica",
			style: Cesium.LabelStyle.FILL_AND_OUTLINE,
			outlineWidth: 2,
			// text: name,
			pixelOffset: new Cesium.Cartesian2(0, -45),
			eyeOffset: new Cesium.Cartesian3(0, -10),
		}
	});
	let index = 1;
	for (let i = 99; i < 113; i += 2) {
		for (let j = 32; j < 40; j += 2) {
			layer1.add({
				position: Cesium.Cartesian3.fromDegrees(i, j, 0),
				label: {
					text: `测试点${index}`
				},
				// 额外属性
				attr: {
					name: `测试点${index}`
				}
			});
			index++;
		}
	}
	// 多边形
	const layer2 = layerFactory.addLayer("电子围栏");
	layer2.add({
		polygon: {
			hierarchy: Cesium.Cartesian3.fromDegreesArray([
				100.0,
				27.0,
				100.0,
				22.0,
				107.0,
				23.0,
				108.0,
				26.0,
				105.0,
				25.0,
			]),
			material: Cesium.Color.RED,
		},
	});
	// 模型
	const layer3 = layerFactory.addLayer("模型");
	layer3.add({
		position: Cesium.Cartesian3.fromDegrees(104, 28, 10000),
		model: {
			uri: "/Cesium_Air.glb",
			minimumPixelSize: 128,
			maximumScale: 20000,
		}
	});
}

// 图层可见性变化
function layerVisibleChange(layer: LayerItem) {
	layerFactory?.setLayerVisible(layer.id, layer.visible);
}
// 删除图层
function deleteLayer(id: string, index: number) {
	layerList.value.splice(index, 1);
	layerFactory?.removeLayer(id);
}

onBeforeUnmount(() => {
	// 清空所有图层（图层事件会自动清空）
	layerFactory?.removeAllLayers();
})
</script>

<style scoped>
.bbox,
.content-box {
	width: 100%;
	height: 100%;
}

.btn-box {
	position: absolute;
	top: 10px;
	left: 10px;
	padding: 16px;
	color: white;
	background-color: rgb(9 16 59 / 85%);
	border-radius: 5px;
}

.layer-list li {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 200px;
	line-height: 40px;
}

button {
	height: 20px;
	line-height: 20px;
}

.content-box .popup {
	position: absolute;
	z-index: 999;
	display: none;
	width: 200px;
	height: auto;
	padding: 8px 12px;
	background-color: white;
	transform: translateY(-100%);
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
