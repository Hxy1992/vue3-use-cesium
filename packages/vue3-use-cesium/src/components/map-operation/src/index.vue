<template>
	<div class="zhd-map-operation">
		<viewSet>
			<template v-if="$slots.view2d" #view2d>
				<slot name="view2d"></slot>
			</template>
			<template v-if="$slots.view3d" #view3d>
				<slot name="view3d"></slot>
			</template>
		</viewSet>
		<homeView>
			<template v-if="$slots.homeView" #homeView>
				<slot name="homeView"></slot>
			</template>
		</homeView>
		<recoverNorth>
			<template v-if="$slots.recoverNorth" #recoverNorth>
				<slot name="recoverNorth"></slot>
			</template>
		</recoverNorth>
		<zoomOut>
			<template v-if="$slots.zoomOut" #zoomOut>
				<slot name="zoomOut"></slot>
			</template>
		</zoomOut>
		<zoomIn>
			<template v-if="$slots.zoomIn" #zoomIn>
				<slot name="zoomIn"></slot>
			</template>
		</zoomIn>
		<help>
			<template v-if="$slots.help" #help>
				<slot name="help"></slot>
			</template>
		</help>
	</div>
</template>

<script setup lang="ts" name="MapOperation">
import help from "./help.vue";
import zoomIn from "./zoom-in.vue";
import zoomOut from "./zoom-out.vue";
import recoverNorth from "./recover-north.vue";
import homeView from "./home-view.vue";
import viewSet from "./view-set.vue";

defineOptions({
	name: "MapOperation"
});

defineSlots<{
	/**
	 * 2D视图按钮
	 */
	view2d(): any,
	/**
	 * 3D视图按钮
	 */
	view3d(): any,
	/**
	 * 主视图按钮
	 */
	homeView(): any,
	/**
	 * 恢复北向按钮
	 */
	recoverNorth(): any,
	/**
	 * 缩小按钮
	 */
	zoomOut(): any,
	/**
	 * 放大按钮
	 */
	zoomIn(): any,
	/**
	 * 帮助按钮
	 */
	help(): any
}>();

</script>
