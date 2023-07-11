<script setup lang="ts">
import { loading } from "../loading";

</script>

<template>
	<div v-if="loading" class="loading">资源加载中，请稍候...</div>
</template>

<style scoped>
.loading {
	position: fixed;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: rgb(0 0 0 / 40%);
}
</style>
