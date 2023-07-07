<template>
	<div class="map-button" @click="homeView" title="默认视图">
		<div class="home-icon">
			<div class="top"></div>
			<div class="bottom"></div>
		</div>
	</div>
</template>

<script setup lang="ts" name="BaseMapHomeView">
import { mapFactory } from "../../core/index";
import { getState } from "../../core/store";

defineOptions({
	name: "BaseMapHomeView"
});

const baseMapStore = getState();

const homeView = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer) return;
	viewer.camera.flyHome(baseMapStore.flyHomeDuration);
};
</script>

<style lang="scss" scoped>
@import "./button.scss";
.map-button {
	bottom: 147px;
	.home-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		.top {
			width: 8px;
			height: 8px;
			margin-bottom: -6px;
			border: 1px solid;
			border-right: 0;
			border-bottom: 0;
			transform: rotate(45deg);
			transform-origin: center;
		}
		.bottom {
			width: 8px;
			height: 8px;
			border: 1px solid;
			border-top: 0;
		}
	}
}
</style>
