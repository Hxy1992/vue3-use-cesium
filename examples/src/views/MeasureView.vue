<template>
	<div class="bbox">
		<div id="my-map" class="content-box"></div>
		<div class="btn-box">
			<div class="description">
				绘制：鼠标双击完成绘制，右键取消；
				<br>
				编辑：鼠标按住编辑点拖拽可编辑
			</div>
			<div>
				<button @click="terrainClick('xyz')" :selected="terrainType === 'xyz'">有地形</button>
				<button @click="terrainClick('none')" :selected="terrainType === 'none'">无地形</button>
			</div>
			<div>
				<button style="width: 70px;" @click="flyTo('model')">定位模型</button>
				<button style="width: 70px;" @click="flyTo('mountain')">定位山地</button>
				<button style="width: 50px;" @click="clearAll()">清空</button>
			</div>
			<div>坐标测量：</div>
			<ul>
				<li><button @click="positionMeasure('EllipsoidPosition')">椭球位置</button></li>
				<li><button @click="positionMeasure('TerrainSurfacePosition')">地形位置</button></li>
				<li><button @click="positionMeasure('ModelSurfacePosition')">模型位置</button></li>
			</ul>
			<div>距离测量：</div>
			<ul>
				<li><button @click="distanceMeasure('EllipsoidDistance', false)">椭球距离</button></li>
				<li><button @click="distanceMeasure('TerrainSurfaceDistance', false)">地形距离</button></li>
				<li><button @click="distanceMeasure('ModelSurfaceDistance', false)">模型距离</button></li>
				<li><button @click="distanceMeasure('TerrainSurfaceDistance', true)">贴地距离</button></li>
				<li><button @click="distanceMeasure('ModelSurfaceDistance', true)">贴模型距离</button></li>
			</ul>
			<div>面积测量：</div>
			<ul>
				<li><button @click="areaMeasure('EllipsoidArea', false)">椭球面积</button></li>
				<li><button @click="areaMeasure('TerrainSurfaceArea', false)">地形面积</button></li>
				<li><button @click="areaMeasure('ModelSurfaceArea', false)">模型面积</button></li>
				<li><button @click="areaMeasure('TerrainSurfaceArea', true)">贴地面积</button></li>
				<li><button @click="areaMeasure('ModelSurfaceArea', true)">贴模型面积</button></li>
			</ul>
			<div>高度差测量：</div>
			<ul>
				<li><button @click="heightMeasure('TerrainSurfaceHeight')">地形高度差</button></li>
				<li><button @click="heightMeasure('ModelSurfaceHeight')">模型高度差</button></li>
			</ul>
			<div>三角测量：</div>
			<ul>
				<li><button @click="calcTriangleHeight('TerrainSurfaceTriangle')">地形三角</button></li>
				<li><button @click="calcTriangleHeight('ModelSurfaceTriangle')">模型三角</button></li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "../hooks/useBaseMap";
import { onBeforeUnmount, ref } from "vue";
import { Measure, TerrainFactory } from "@zhdgps/vue3-use-cesium";

/**
 * TODO
 * 需区分贴地、不贴地测量
 */

let measure: any;
let tileset: any;
let viewer: any;
const terrainType = ref("none");

// 地图初始化
useBaseMap("#my-map", async (v) => {
	viewer = v;
	tileset = new Cesium.Cesium3DTileset({
		url: "http://resource.dvgis.cn/data/3dtiles/dayanta/tileset.json",
		projectTo2D: true
	});
	viewer.scene.primitives.add(tileset);
	viewer.zoomTo(tileset)
	measure = new Measure();
	terrainClick("xyz")
});

async function terrainClick(type: "xyz" | "none") {
	terrainType.value = type;
	viewer.terrainProvider = await TerrainFactory.createTerrain(type, {
		url: type === "xyz" ? "http://data.marsgis.cn/terrain" : ""
	});
}

function flyTo(type: "model" | "mountain") {
	if (type === "model") {
		viewer.flyTo(tileset)
	} else if (type === "mountain") {
		viewer.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(103.85205354, 31.41364801, 14036.57),
			orientation: {
				heading: Cesium.Math.toRadians(0),
				pitch: Cesium.Math.toRadians(-20.0),
				roll: 0.0
			}
		})
	}
}

// 位置测量
function positionMeasure(type: "EllipsoidPosition" | "TerrainSurfacePosition" | "ModelSurfacePosition") {
	measure.position(type)
}
// 距离测量
function distanceMeasure(type: "EllipsoidDistance" | "TerrainSurfaceDistance" | "ModelSurfaceDistance", clampToGround: boolean) {
	measure.distance(type, clampToGround);
}
// 面积测量
function areaMeasure(type: "EllipsoidArea" | "TerrainSurfaceArea" | "ModelSurfaceArea", clampToGround: boolean) {
	measure.area(type, clampToGround)
}
// 高度差测量
function heightMeasure(type: "TerrainSurfaceHeight" | "ModelSurfaceHeight") {
	measure.height(type)
}
// 三角测量
function calcTriangleHeight(type: "TerrainSurfaceTriangle" | "ModelSurfaceTriangle") {
	measure.triangle(type)
}

function clearAll() {
	measure && measure.dispose()
}

onBeforeUnmount(async () => {
	viewer.scene.primitives.remove(tileset);
	tileset = null;
	viewer.terrainProvider = await TerrainFactory.createTerrain("none", {
		url: ""
	});
	clearAll()
	viewer = null;
});
</script>

<style scoped>
.bbox,
.content-box {
	width: 100%;
	height: 100%;
}

ul {
	margin: 5px 0;
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

.btn-box li {
	list-style-type: none;
}

.btn-box button {
	width: 100px;
	margin: 2px 0;
	cursor: pointer;
}

.btn-box button[selected=true] {
	color: white;
	background-color: #4064e2;
}

.btn-box .description {
	margin-bottom: 8px;
	font-size: 12px;
}
</style>
