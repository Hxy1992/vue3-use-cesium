<template>
	<div class="bbox">
		<div id="my-map" class="content-box">
			<div ref="popupRef" class="popup popup-tips-after">
				<div>姓名：{{ popupData.name }}</div>
				<div>电话：{{ popupData.phone }}</div>
				<template v-if="showHide">
					<div>其他信息：xxxx</div>
					<div>其他信息：xxxx</div>
					<div>其他信息：xxxx</div>
				</template>
			</div>
			<div ref="popup2Ref" class="popup popup-tips-after">
				<div>围栏名称：xxx围栏</div>
				<div>围栏等级：红色</div>
				<template v-if="showHide">
					<div>其他信息：xxxx</div>
					<div>其他信息：xxxx</div>
					<div>其他信息：xxxx</div>
				</template>
			</div>
			<div ref="popup3Ref" class="popup popup-tips-after">
				<div>飞机名称：xxx飞机</div>
				<div>飞行高度：13213m</div>
				<div>飞行速度：786km/h</div>
				<div>载客数量：156人</div>
				<template v-if="showHide">
					<div>其他信息：xxxx</div>
					<div>其他信息：xxxx</div>
					<div>其他信息：xxxx</div>
				</template>
			</div>
		</div>
		<div class="btn-box">
			1、调用hidePopup方法, 主动隐藏弹窗
			<pre />
			<button @click="hidePopup">隐藏弹窗</button>
			<pre />
			2、弹窗支持动态高度, 需设置
			<pre />
			yAlign: "top", translateY(-100%)
			<pre />
			<button @click="showHide = !showHide">改变弹窗高度</button>
			<pre />
			3、删除图层中的点时, 会同步隐藏弹窗
			<pre />
			<button @click="deleteEntity">删除测试点</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { useBaseMap } from "../hooks/useBaseMap";
import { Layer, LayerFactory } from "vue3-use-cesium";
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

const showHide = ref(false);
const popupRef = ref<HTMLElement>();
const popup2Ref = ref<HTMLElement>();
const popup3Ref = ref<HTMLElement>();
const popupData = ref({
	name: "",
	phone: ""
});
let layerFactory: LayerFactory | null;
let layerBillboard: Layer | null;
let timer: NodeJS.Timeout | null = null;
let popupBillboard: any;
let popupPolygon: any;
let popupModel: any;
let deleteCur: any;

// 地图初始化
useBaseMap("#my-map", viewer => {
	viewer.camera.setView({
		destination: Cesium.Cartesian3.fromDegrees(110, 31, 5000000)
	});
	addBillboardlayer();
	addPolygonlayer();
	addModelLayer();
});
// 图标点
function addBillboardlayer() {
	// 图层和billboard点
	layerFactory = new LayerFactory();
	layerBillboard = layerFactory.addLayer("设备点", {
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
			layerBillboard.add({
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
	// 模拟移动
	const entity = layerBillboard.add({
		position: Cesium.Cartesian3.fromDegrees(114, 26, 0),
		label: {
			text: "移动点"
		},
		// 额外属性
		attr: {
			name: `移动点`
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
	popupBillboard = layerBillboard.onPopup({
		dom: popupRef.value as HTMLElement,
		offsetY: -40,
		yAlign: "top"
	}, (pick) => {
		return pick && pick.id && layerBillboard?.contains(pick.id);
	}, (visible, pick) => {
		deleteCur = null;
		if (visible) {
			if (pick.id !== entity) deleteCur = pick.id;
			popupData.value = {
				name: pick.id?.attr?.name || "--",
				phone: Math.floor(Math.random() * 100000000000).toString()
			};
		}
	})
}
// 多边形
function addPolygonlayer() {
	if (!layerFactory) return;
	// 图层
	const layer = layerFactory.addLayer("电子围栏");
	layer.add({
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

	// 图层弹窗
	popupPolygon = layer.onPopup({
		dom: popup2Ref.value as HTMLElement,
		positionType: "Mouse",
		offsetY: -10,
		yAlign: "top"
	}, (pick) => {
		return pick && pick.id && layer.contains(pick.id);
	});
}
function addModelLayer() {
	if (!layerFactory) return;
	// 图层
	const layer = layerFactory.addLayer("模型");
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(104, 28, 10000),
		model: {
			uri: "/Cesium_Air.glb",
			minimumPixelSize: 128,
			maximumScale: 20000,
		}
	});
	// 图层弹窗
	popupModel = layer.onPopup({
		dom: popup3Ref.value as HTMLElement,
		positionType: "Entity",
		offsetY: -15,
		yAlign: "top"
	}, (pick) => {
		return pick && pick.id && layer.contains(pick.id);
	});
}
// 主动隐藏弹窗
function hidePopup() {
	popupBillboard?.hidePopup();
	popupPolygon?.hidePopup();
	popupModel?.hidePopup();
}
function deleteEntity() {
	if (!layerFactory || !layerBillboard) return;
	if (!deleteCur) return alert("请先点击测试点打开弹窗！");
	layerBillboard.remove(deleteCur);
	// 调用removeById、popEntity、shiftEntity等删除时，一样会隐藏
	// layerBillboard.removeById(deleteCur.id);
	deleteCur = null;
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

.btn-box {
	position: absolute;
	top: 10px;
	left: 10px;
	padding: 16px;
	color: white;
	background-color: rgb(9 16 59 / 85%);
	border-radius: 5px;
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
