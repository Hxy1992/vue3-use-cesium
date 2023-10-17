<template>
	<div class="bbox">
		<div id="my-map" class="content-box"></div>
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "../hooks/useBaseMap";

// 地图初始化
useBaseMap("#my-map", viewer => {
	console.log(viewer);
});
</script>

<style scoped>
.bbox,
.content-box {
	width: 100%;
	height: 100%;
}
</style>
