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
				<button @click="clampToGroundClick(true)" :selected="clampToGround">图形贴地</button>
				<button @click="clampToGroundClick(false)" :selected="!clampToGround">不贴地</button>
			</div>
			<div>仅绘制：</div>
			<ul>
				<li><button @click="drawClick('EllipsoidPoint')">点(椭球)</button></li>
				<li><button @click="drawClick('EllipsoidPolyline')">线(椭球)</button></li>
				<li><button @click="drawClick('EllipsoidPolygon')">面(椭球)</button></li>
				<li><button @click="drawClick('TerrainSurfacePoint')">点(地形)</button></li>
				<li><button @click="drawClick('TerrainSurfacePolyline')">线(地形)</button></li>
				<li><button @click="drawClick('TerrainSurfacePolygon')">面(地形)</button></li>
				<li><button @click="drawClick('ModelSurfacePoint')">点(模型)</button></li>
				<li><button @click="drawClick('ModelSurfacePolyline')">线(模型)</button></li>
				<li><button @click="drawClick('ModelSurfacePolygon')">面(模型)</button></li>
				<li><button @click="stopPlot()">停止绘制</button></li>
			</ul>
			<div>绘制后编辑：</div>
			<ul>
				<li><button @click="drawEditClick('EllipsoidPoint')">点(椭球)</button></li>
				<li><button @click="drawEditClick('EllipsoidPolyline')">线(椭球)</button></li>
				<li><button @click="drawEditClick('EllipsoidPolygon')">面(椭球)</button></li>
				<li><button @click="stopPlot()">停止编辑</button></li>
			</ul>
			<div>结果转geojson：</div>
			<ul>
				<li><button @click="drawGeojsonClick('EllipsoidPolyline')">线(椭球)</button></li>
				<li><button @click="drawGeojsonClick('TerrainSurfacePolyline')">线(地形)</button></li>
				<li><button @click="drawGeojsonClick('ModelSurfacePolyline')">线(模型)</button></li>
				<li><button @click="drawGeojsonClick('TerrainSurfacePolygon')">面(地形)</button></li>
				<li><button @click="stopPlot()">停止编辑</button></li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "../hooks/useBaseMap";
import { onBeforeUnmount, ref } from "vue";
import { Plot, toGeoJson, TerrainFactory } from "vue3-use-cesium";

let plot: Plot;
let viewer: any;
let tileset: any;
const terrainType = ref("none");
const clampToGround = ref(false)

// 地图初始化
useBaseMap("#my-map", async (v) => {
	viewer = v;
	plot = new Plot();
	tileset = await Cesium.Cesium3DTileset.fromUrl("http://resource.dvgis.cn/data/3dtiles/dayanta/tileset.json", {
		projectTo2D: true
	});
	viewer.scene.primitives.add(tileset);
	viewer.zoomTo(tileset)
});

async function terrainClick(type: any) {
	terrainType.value = type;
	viewer.terrainProvider = await TerrainFactory.createTerrain(type, {
		url: type === "xyz" ? "http://data.marsgis.cn/terrain" : ""
	});
}

function clampToGroundClick(val: boolean) {
	if (!plot) return;
	clampToGround.value = val;
	plot.setClampToGround(val);
}

function drawClick(type: any) {
	if (!plot) return;
	plot.draw(type, coods => {
		console.log(coods);
	});
}
function drawEditClick(type: any) {
	if (!plot) return;
	plot.draw(type, coods => {
		if (coods) plot.edit(type, coods);
	});
}
function drawGeojsonClick(type: any) {
	if (!plot) return;
	plot.draw(type, coods => {
		if (!coods) return
		const geojson = toGeoJson(type, coods);
		alert(JSON.stringify(geojson));
	});
}

function stopPlot() {
	plot && plot.stop()
}

onBeforeUnmount(async () => {
	viewer.scene.primitives.remove(tileset);
	viewer.terrainProvider = await TerrainFactory.createTerrain("none", {
		url: ""
	});
	plot && plot.dispose()
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
	width: 80px;
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
