<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<!-- <AssemblySize id="assemblySize" /> -->
			<Language id="language" v-if="false" />
			<!-- <SearchMenu id="searchMenu" /> -->
			<ThemeSetting id="themeSetting" title="主题" />
			<!-- <Message id="message" title="消息" /> -->
			<Fullscreen id="fullscreen" />
		</div>
		<!-- <span class="username">{{ userName }}</span> -->
		<Avatar />
	</div>
</template>

<script setup lang="ts">
// import { computed } from "vue";
// import SearchMenu from "./components/SearchMenu.vue";
import Fullscreen from "./components/Fullscreen.vue";
// import Message from "./components/Message.vue";
import Language from "./components/Language.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
// import AssemblySize from "./components/AssemblySize.vue";
import Avatar from "./components/Avatar.vue";
// import { GlobalStore } from "@/stores";
// const globalStore = GlobalStore();
// const userName = computed(() => globalStore.loginName);
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;

	// margin: 0 30px;
	.header-icon {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 60px;
		margin-right: 22px;
		::v-deep(.toolBar-icon) {
			&:hover {
				color: var(--el-color-primary) !important;
			}
		}
	}
	.username {
		margin: 0 20px 0 0;
		font-size: 15px;
	}
}
</style>
