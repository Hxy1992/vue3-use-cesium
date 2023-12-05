<template>
	<div class="zmap-tool">
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
		<imagery :imagerys="imagerys || defaultImagerys">
			<template v-if="$slots.imagery" #imagery>
				<slot name="imagery"></slot>
			</template>
		</imagery>
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
import imagery from "./imagery.vue"

const defaultImagerys: any = [
	{
		label: "高德卫星(无偏移)",
		type: "gd-img"
	},
	{
		label: "高德电子(无偏移)",
		type: "gd-vec"
	},
	{
		label: "OSM",
		type: "osm-normal"
	}
]

defineProps<{
	imagerys?: {
		label: string;
		type: | "tdt-img"
		| "tdt-vec"
		| "gd-img"
		| "gd-vec"
		| "bd-vec"
		| "tencent-vec"
		| "tencent-img"
		| "tms-offline"
		| "osm-normal"
		| "geoq-colour"
		| "geoq-gray"
		| "geoq-midnightblue"
		| "carto-darkall"
		| "carto-lightall"
		| "empty";
		url?: string;
		backgroundImage?: string;
	}[]
}>()

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
