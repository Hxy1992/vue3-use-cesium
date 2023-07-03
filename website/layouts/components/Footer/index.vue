<template>
	<div
		:class="{
			footer: true,
			'flx-center': true,
			login: isLogin
		}"
	>
		<a target="_blank"> COPYRIGHT © 2023 vue3-use-cesium </a>
	</div>
</template>
<script setup lang="ts" name="Footer">
import { ref } from "vue";

interface footerProp {
	isLogin?: boolean;
}

const props = withDefaults(defineProps<footerProp>(), {
	isLogin: false
});

const isLogin = ref(props.isLogin);
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
