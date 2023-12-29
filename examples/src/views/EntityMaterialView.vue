<template>
	<div class="bbox">
		<div id="my-map" class="content-box"></div>
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "../hooks/useBaseMap";
import { onBeforeUnmount } from "vue";
import { Material } from "vue3-use-cesium";
import fenceImg from "../assets/fence.png";
import spaceLineImg from "../assets/space_line.png";
import lightingImg from "../assets/lighting.png";

/**
 * 在Entity上使用材质
 */

let viewer: any;
// 地图初始化
useBaseMap("#my-map", v => {
	viewer = v;
	viewer.camera.setView({
		destination: Cesium.Cartesian3.fromDegrees(-98, 35, 5000000)
	});
	addElements();
});
// 添加地图元素
function addElements() {
	createWalls();
	createPolylines();
	createCircles();
	createEllipsoids();
	createCylinders();
	createRadars();
}

// 创建墙体
function createWalls() {
	// 渐变动画
	viewer.entities.add({
		wall: {
			positions: Cesium.Cartesian3.fromDegreesArrayHeights([
				-107.0,
				43.0,
				100000.0,
				-100.0,
				43.0,
				100000.0,
				-100.0,
				40.0,
				100000.0,
				-107.0,
				40.0,
				100000.0,
				-107.0,
				43.0,
				100000.0,
			]),
			// minimumHeights: [100000.0, 100000.0],
			material: new Material.WallTrailProperty({
				color: Cesium.Color.GREEN,
				speed: 15,
				image: fenceImg
			}),
		},
	});
	// 渐变
	viewer.entities.add({
		wall: {
			positions: Cesium.Cartesian3.fromDegreesArrayHeights([
				-99.0,
				43.0,
				100000.0,
				-94.0,
				43.0,
				100000.0,
				-94.0,
				40.0,
				100000.0,
				-99.0,
				40.0,
				100000.0,
				-99.0,
				43.0,
				100000.0,
			]),
			// minimumHeights: [100000.0, 100000.0],
			material: new Material.WallDiffuseProperty({
				color: Cesium.Color.GREEN,
			}),
		},
	});
	// 跟踪线
	viewer.entities.add({
		wall: {
			positions: Cesium.Cartesian3.fromDegreesArrayHeights([
				-93.0,
				43.0,
				100000.0,
				-90.0,
				43.0,
				100000.0,
				-90.0,
				40.0,
				100000.0,
				-93.0,
				40.0,
				100000.0,
				-93.0,
				43.0,
				100000.0,
			]),
			// minimumHeights: [100000.0, 100000.0],
			material: new Material.WallLineTrailProperty({
				color: Cesium.Color.GREEN,
				speed: 4,
				repeat: new Cesium.Cartesian2(2, 1.5),
				image: spaceLineImg
			}),
		},
	});
}

// 创建线-闪烁线
function createPolylines() {
	// 闪烁线
	viewer.entities.add({
		polyline: {
			positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107, 35, 1000, -97, 35, 1000]),
			width: 5,
			arcType: Cesium.ArcType.NONE,
			material: new Material.PolylineFlickerProperty({
				color: Cesium.Color.AQUA,
				speed: 10,
			}),
		},
	});
	// 跟踪线
	viewer.entities.add({
		polyline: {
			positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107, 34, 1000, -97, 34, 1000]),
			width: 5,
			arcType: Cesium.ArcType.NONE,
			material: new Material.PolylineFlowProperty({
				color: Cesium.Color.AQUA,
				speed: 10,
				percent: 0.1,
				gradient: 0.5
			}),
		},
	});

	// 发光跟踪线
	viewer.entities.add({
		polyline: {
			positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107, 33, 1000, -97, 33, 1000]),
			width: 10,
			arcType: Cesium.ArcType.NONE,
			material: new Material.PolylineLightingTrailProperty({
				color: Cesium.Color.AQUA,
				image: lightingImg,
				speed: 10,
			}),
		},
	});
}
// 创建圆材质
function createCircles() {
	// 创建圆-扩散圆
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
		ellipse: {
			semiMinorAxis: 100000.0,
			semiMajorAxis: 100000.0,
			height: 0.0,
			material: new Material.CircleDiffuseProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: 8
			})
		},
	});
	// 创建圆-渐变褪色圆
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 38.0, 150000.0),
		ellipse: {
			semiMinorAxis: 100000.0,
			semiMajorAxis: 100000.0,
			height: 0.0,
			material: new Material.CircleFadeProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: 8
			})
		},
	});
	// 创建圆-渐变圆环
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 36.0, 150000.0),
		ellipse: {
			semiMinorAxis: 100000.0,
			semiMajorAxis: 100000.0,
			height: 0.0,
			material: new Material.CircleRingProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.7)
			})
		},
	});
	// 创建圆-模糊圆
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 34.0, 150000.0),
		ellipse: {
			semiMinorAxis: 100000.0,
			semiMajorAxis: 100000.0,
			height: 0.0,
			material: new Material.CircleBlurProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: 3
			})
		},
	});
}
// 创建球材质
function createEllipsoids() {
	// 光电扫描球
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(-105.0, 30.0, 150000.0),
		ellipsoid: {
			radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
			material: new Material.EllipsoidElectricProperty({
				color: Cesium.Color.AQUA,
				speed: 5
			})
		},
	});
	// 材质扫描球
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(-95.0, 30.0, 150000.0),
		ellipsoid: {
			radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
			material: new Material.EllipsoidTrailProperty({
				color: Cesium.Color.CHARTREUSE,
				speed: 5
			})
		},
	});
}
// 创建圆柱-渐变圆柱
function createCylinders() {
	// 渐变圆柱
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(-90.0, 30.0, 200000.0),
		cylinder: {
			length: 200000,
			topRadius: 80000,
			bottomRadius: 80000,
			material: new Material.CylinderFadeProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
			})
		},
	});
}
// 创建圆-雷达扫描1
function createRadars() {
	// 雷达扫描1
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(-85.0, 38.0, 150000.0),
		ellipse: {
			semiMinorAxis: 100000.0,
			semiMajorAxis: 100000.0,
			height: 0.0,
			material: new Material.RadarWaveProperty({
				color: Cesium.Color.AQUA,
				speed: 8
			})
		},
	});
	// 雷达扫描2
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(-85.0, 36.0, 150000.0),
		ellipse: {
			semiMinorAxis: 100000.0,
			semiMajorAxis: 100000.0,
			height: 0.0,
			material: new Material.RadarSweepProperty({
				color: Cesium.Color.AQUA,
				speed: 8
			})
		},
	});
}

onBeforeUnmount(() => {
});
</script>

<style scoped>
.bbox,
.content-box {
	width: 100%;
	height: 100%;
}
</style>
