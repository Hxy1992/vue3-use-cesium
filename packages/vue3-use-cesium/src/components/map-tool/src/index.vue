<template>
	<div class="zmap-tool">
		<slot />
		<viewSet v-if="showViewSet" />
		<homeView v-if="showHomeView" />
		<recoverNorth v-if="showRecoverNorth" />
		<imagery v-if="showImagery" :imagerys="imagerys" />
		<zoomOut v-if="showZoomOut" />
		<zoomIn v-if="showZoomIn" />
		<help v-if="showHelp" />
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

withDefaults(defineProps<{
	/**
	 * 底图列表
	 */
	imagerys?: {
		label: string;
		type: | "tdt-img"
		| "tdt-vec"
		| "gd-img"
		| "gd-vec"
		| "bd-vec"
		| "bd-img"
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
	}[],
	/**
	 * 是否显示视图设置
	 */
	showViewSet?: boolean,
	/**
	 * 是否显示默认视图
	 */
	showHomeView?: boolean,
	/**
	 * 是否显示恢复正北
	 */
	showRecoverNorth?: boolean,
	/**
	 * 是否显示底图切换
	 */
	showImagery?: boolean,
	/**
	 * 是否显示放大
	 */
	showZoomIn?: boolean,
	/**
	 * 是否显示缩小
	 */
	showZoomOut?: boolean,
	/**
	 * 是否显示帮助
	 */
	showHelp?: boolean
}>(), {
	imagerys: [
		{
			label: "高德卫星(无偏移)",
			type: "gd-img",
		},
		{
			label: "高德电子(无偏移)",
			type: "gd-vec",
		},
		{
			label: "OSM(无偏移)",
			type: "osm-normal",
		},
		{
			label: "arcgis彩色",
			type: "geoq-colour",
		},
		{
			label: "arcgis灰色",
			type: "geoq-gray",
		},
		{
			label: "arcgis午夜蓝",
			type: "geoq-midnightblue",
		},
		{
			label: "OMS黑(无偏移)",
			type: "carto-darkall",
		},
		{
			label: "OSM白(无偏移)",
			type: "carto-lightall",
		},
		{
			label: "百度电子",
			type: "bd-vec",
		},
		{
			label: "百度卫星",
			type: "bd-img",
		},
		{
			label: "腾讯地图",
			type: "tencent-vec",
		},
		{
			label: "腾讯卫星",
			type: "tencent-img",
		}
	] as any,
	showViewSet: true,
	showHomeView: true,
	showRecoverNorth: true,
	showImagery: true,
	showZoomIn: true,
	showZoomOut: true,
	showHelp: true
})


</script>
