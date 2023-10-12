<template>
	<div class="bbox">
		<div id="my-map" class="content-box"></div>
		<div class="btn-box">
			<ul>
				<li><button @click="gotoModel()">定位模型</button></li>
				<li><button @click="deactivate()">清空</button></li>
			</ul>
			<ul>
				<li><button @click="calcDistance()">空间测距</button></li>
				<li><button @click="calcArea()">空间面积</button></li>
				<li><button @click="calcAngle()">角度</button></li>
				<li><button @click="calcHeight()">高度</button></li>
				<li><button @click="calcHeading()">偏航角度</button></li>
				<li><button @click="calcTriangleHeight()">三角测量</button></li>
			</ul>
			<ul>
				<li><button @click="distanceSurface()">贴地测距</button></li>
				<li><button @click="areaSurface()">贴地面积</button></li>
				<li><button @click="calcModelAngle()">贴物角度</button></li>
				<li><button @click="calcModelHeight()">贴物高度</button></li>
				<li><button @click="calcModelTriangleHeight()">贴物三角</button></li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "../hooks/useBaseMap";
import { onBeforeUnmount } from "vue";

/**
 * TODO
 * 需区分贴地、不贴地测量
 */

let measure: any;
let tileset: any;
let viewer: any;
// 地图初始化
useBaseMap("#my-map", async (v) => {
	viewer = v;
	tileset = new Cesium.Cesium3DTileset({
		url: "http://resource.dvgis.cn/data/3dtiles/dayanta/tileset.json",
		projectTo2D: true
	});
	viewer.scene.primitives.add(tileset);
});

function calcDistance() {
	measure.distance()
}

function distanceSurface() {
	measure.distanceSurface()
}

function calcArea() {
	measure.area()
}

function areaSurface() {
	measure.areaSurface()
}

function calcAngle() {
	measure.angle()
}

function calcModelAngle() {
	measure.angle({
		clampToModel: true
	})
}

function calcHeight() {
	measure.height()
}

function calcModelHeight() {
	measure.height({
		clampToModel: true
	})
}

function calcHeading() {
	measure.heading()
}

function areaHeight() {
	measure.areaHeight()
}


function calcTriangleHeight() {
	measure.triangleHeight()
}

function calcModelTriangleHeight() {
	measure.triangleHeight({
		clampToModel: true
	})
}

function deactivate() {
	measure.deactivate()
}

function gotoModel() {
	viewer.flyTo(tileset)
}

onBeforeUnmount(() => {
	viewer.scene.primitives.remove(tileset);
	tileset = null;
	measure = null;
	viewer = null;
});
</script>

<style>
.bbox,
.content-box {
	width: 100%;
	height: 100%;
}

.btn-box {
	position: absolute;
	top: 10px;
	left: 10px;
}
</style>
