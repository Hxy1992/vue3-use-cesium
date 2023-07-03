<template>
	<div class="bbox">
		<div id="fill-map" class="content-box"></div>
	</div>
</template>

<script setup lang="ts" name="fillMap">
import { useBaseMap } from "@/hooks/useCesium";

// 地图初始化
useBaseMap("#fill-map", viewer => {
	console.log(viewer);
});
</script>

<style lang="scss" scoped>
.bbox {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.content-box {
	position: relative;
}
</style>
