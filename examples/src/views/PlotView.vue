<template>
	<div class="bbox">
		<div id="my-map" class="content-box"></div>
		<div class="btn-box">
			<div class="description">
				绘制：鼠标双击完成绘制，右键取消；
				<br>
				编辑：鼠标按住编辑点拖拽可编辑
			</div>
			<div>仅绘制：</div>
			<ul>
				<!-- <li><button @click="drawClick('point')">点</button></li> -->
				<li><button @click="drawClick('polyline')">线</button></li>
				<li><button @click="drawClick('polygon')">面</button></li>
				<!-- <li><button @click="drawClick('circle')">圆</button></li> -->
				<!-- <li><button @click="drawClick('rect')">矩形</button></li> -->
				<li><button @click="stopPlot()">停止绘制</button></li>
			</ul>
			<div>绘制后立即编辑：</div>
			<ul>
				<!-- <li><button @click="drawEditClick('point')">点</button></li> -->
				<li><button @click="drawEditClick('polyline')">线</button></li>
				<li><button @click="drawEditClick('polygon')">面</button></li>
				<!-- <li><button @click="drawEditClick('circle')">圆</button></li> -->
				<!-- <li><button @click="drawEditClick('rect')">矩形</button></li> -->
				<li><button @click="stopPlot()">停止编辑</button></li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "../hooks/useBaseMap";
import { onBeforeUnmount } from "vue";
import { Plot } from "vue3-use-cesium";

let plot: Plot;

// 地图初始化
useBaseMap("#my-map", viewer => {
	console.log(viewer);
	plot = new Plot();
});

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

function stopPlot() {
	plot && plot.stop()
}

onBeforeUnmount(() => {
	plot && plot.dispose()
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
	padding: 16px;
	color: white;
	background-color: rgb(32 177 143 / 50%);
	border-radius: 5px;
}

.btn-box li {
	list-style-type: none;
}

.btn-box button {
	width: 80px;
	margin: 2px 0;
}

.btn-box .description {
	margin-bottom: 8px;
	font-size: 12px;
}
</style>
