<template>
	<div class="zmap-tool">
		<viewSet />
		<homeView />
		<recoverNorth />
		<imagery :imagerys="imagerys || defaultImagerys" />
		<zoomOut />
		<zoomIn />
		<help />
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

</script>
