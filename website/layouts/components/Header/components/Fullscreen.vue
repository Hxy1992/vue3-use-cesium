<template>
	<div class="fullscreen">
		<i
			:class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']"
			class="toolBar-icon"
			:title="isFullscreen ? '取消全屏' : '全屏'"
			@click="toggle"
		></i>
	</div>
</template>

<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
const { toggle, isFullscreen } = useFullscreen();
</script>
