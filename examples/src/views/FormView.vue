<template>
	<div class="bbox">
		<div class="form">
			<div class="row">
				<div class="label">名称：</div>
				<input class="value" type="text" />
			</div>
			<div class="row">
				<div class="label">地址：</div>
				<input class="value" type="text" />
			</div>
			<div class="row">
				<div class="label">描述：</div>
				<input class="value" type="text" />
			</div>
			<div class="row">
				<div class="label">位置：</div>
				<div id="my-map2" class="value"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "../hooks/useBaseMap";

// 地图初始化
useBaseMap("#my-map2", viewer => {
	console.log(viewer);
});
</script>

<style scoped>
.bbox {
	width: 100%;
	height: 100%;
}

.form {
	width: 800px;
	padding: 20px;
	margin: 0 auto;
	background-color: white;
	border: 1px solid;
}

.row {
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;
	height: auto;
	margin: 16px 0;
}

.label {
	display: inline-block;
	width: 80px;
}

.value {
	width: 500px;
}

#my-map2 {
	width: 600px;
	height: 500px;
}
</style>
