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
import { LayerFactory } from "vue3-use-cesium";
import img from "../assets/locate.png";

// 方式1：在图层中添加弹出事件（见本页示例）
// 方式2：直接调用PopupWindow，entity和primitive需要有position属性，鼠标位置获取的是椭球位置
/**
 * 示例：
 new PopupWindow(
		{
			// 弹窗dom
			dom: document.getElementById("my-popup"),
			// 弹窗激活方式
			activeType: "LEFT_CLICK",
			// 获取弹窗位置方式
			positionType: "Mouse"
		},
		// 判断pick的点是否符合要求
		pick => {
			return pick.id && pick.id.layer === "my-layer"
		},
		// 显示/隐藏回调
		(visible, pick) => {
			// do sonmthing
		})
	}
 */


const popupRef = ref<HTMLElement>();
const popupData = ref({
	name: "",
	phone: ""
});
let layerFactory: LayerFactory | null;
let timer: NodeJS.Timeout | null = null;

// 地图初始化
useBaseMap("#my-map", viewer => {
	viewer.camera.setView({
		destination: Cesium.Cartesian3.fromDegrees(110, 31, 5000000)
	});
	addlayer();
});

function addlayer() {
	// 图层和billboard点
	layerFactory = new LayerFactory();
	const layer = layerFactory.addLayer("osm", {
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
	for (let i = 99; i < 113; i += 2) {
		for (let j = 30; j < 40; j += 2) {
			layer.add({
				position: Cesium.Cartesian3.fromDegrees(i, j, 0),
				label: {
					text: `测试${i}${j}`
				},
				// 额外属性
				attr: {
					name: `测试${i}${j}`
				}
			})
		}
	}
	// 模拟移动
	const entity = layer.add({
		position: Cesium.Cartesian3.fromDegrees(114, 26, 0),
		label: {
			text: "移动的billboard"
		},
		// 额外属性
		attr: {
			name: `移动的billboard`
		}
	})
	timer = setInterval(() => {
		let x = 114 + Math.random() - 0.5;
		let y = 26 + Math.random() - 0.5;
		if (x > 180 || x < -180) x = 114;
		if (y > 90 || y < -90) y = 26;
		entity.position = Cesium.Cartesian3.fromDegrees(x, y, 0);
	}, 1000);

	// 图层弹窗
	layer.onPopup({
		dom: popupRef.value as HTMLElement,
		offsetY: -40
	}, (pick) => {
		return pick && pick.id && layer.contains(pick.id);
	}, (visible, pick) => {
		if (visible) {
			popupData.value = {
				name: pick.id?.attr?.name || "--",
				phone: Math.floor(Math.random() * 100000000000).toString()
			};
		}
	})
}

onBeforeUnmount(() => {
	// 清空所有图层（图层事件会自动清空）
	layerFactory?.removeAllLayers();
	if (timer) clearInterval(timer);
	timer = null;
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
