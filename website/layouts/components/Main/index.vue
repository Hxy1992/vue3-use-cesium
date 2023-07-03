<template>
	<Maximize v-if="themeConfig.maximize" />
	<Tabs v-if="themeConfig.tabs" />
	<el-main :class="{ 'is-fill': isFill }">
		<router-view v-if="!isFrame" v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="keepAliveStore.keepAliveName">
					<component :is="Component" :key="route.path" v-if="isRouterShow" />
				</keep-alive>
			</transition>
		</router-view>
		<iframe v-else-if="isRouterShow" class="iframe" :src="isFrame"></iframe>
	</el-main>
	<el-footer v-if="themeConfig.footer && !isFill">
		<Footer />
	</el-footer>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, provide } from "vue";
import { useRoute } from "vue-router";
import { GlobalStore } from "@/stores";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import Maximize from "./components/Maximize.vue";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";

const globalStore = GlobalStore();
const keepAliveStore = KeepAliveStore();
const themeConfig = computed(() => globalStore.themeConfig);
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
const routeCur = useRoute();
const isFill = computed(() => routeCur.meta.isFill);
const isFrame: any = computed(() => routeCur.meta.isFrame);

// 刷新当前页面
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => {
	isRouterShow.value = val;
};
provide("refresh", refreshCurrentPage);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref<number>(0);
const listeningWindow = () => {
	screenWidth.value = document.body.clientWidth;
	if (!isCollapse.value && screenWidth.value < 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: true });
	if (isCollapse.value && screenWidth.value > 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: false });
};
window.addEventListener("resize", listeningWindow);
onBeforeUnmount(() => {
	window.removeEventListener("resize", listeningWindow);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
.iframe {
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 99.5%;
	padding: 0;
	margin: 0;
	overflow: hidden;
	border: 0;
}
</style>
