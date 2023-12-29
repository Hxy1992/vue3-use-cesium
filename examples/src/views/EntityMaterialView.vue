<template>
	<div class="bbox">
		<div id="my-map" class="content-box"></div>
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "../hooks/useBaseMap";
import { Material, LayerFactory } from "vue3-use-cesium";
import fenceImg from "../assets/fence.png";
import spaceLineImg from "../assets/space_line.png";
import lightingImg from "../assets/lighting.png";
import { onBeforeUnmount } from "vue";

/**
 * 在Entity上使用材质
 */

let layerFactory: LayerFactory | null;

// 地图初始化
useBaseMap("#my-map", v => {
	v.camera.setView({
		destination: Cesium.Cartesian3.fromDegrees(-98, 35, 5000000)
	});
	layerFactory = new LayerFactory();
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
	const layer = layerFactory?.addLayer("walls");
	if (!layer) return;
	// 渐变动画
	layer.add({
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
	layer.add({
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
	layer.add({
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
// 创建线
function createPolylines() {
	const layer = layerFactory?.addLayer("polylines", {
		polyline: {
			width: 5,
			arcType: Cesium.ArcType.NONE,
		}
	});
	if (!layer) return;
	// 闪烁线
	layer.add({
		polyline: {
			positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107, 35, 1000, -97, 35, 1000]),
			material: new Material.PolylineFlickerProperty({
				color: Cesium.Color.AQUA,
				speed: 10,
			}),
		},
	});
	// 跟踪线
	layer.add({
		polyline: {
			positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107, 34, 1000, -97, 34, 1000]),
			material: new Material.PolylineFlowProperty({
				color: Cesium.Color.AQUA,
				speed: 10,
				percent: 0.1,
				gradient: 0.5
			}),
		},
	});
	// 发光跟踪线
	layer.add({
		polyline: {
			positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107, 33, 1000, -97, 33, 1000]),
			material: new Material.PolylineLightingTrailProperty({
				color: Cesium.Color.AQUA,
				image: lightingImg,
				speed: 10,
			}),
		},
	});
	// 跟踪线
	layer.add({
		polyline: {
			positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107, 32, 1000, -97, 32, 1000]),
			material: new Material.PolylineTrailProperty({
				color: Cesium.Color.RED,
				image: lightingImg,
				speed: 5,
				repeat: new Cesium.Cartesian2(2, 1),
			}),
		},
	});
}
// 创建圆材质
function createCircles() {
	const layer = layerFactory?.addLayer("circles", {
		ellipse: {
			semiMinorAxis: 100000.0,
			semiMajorAxis: 100000.0,
			height: 0.0,
		}
	});
	if (!layer) return;
	// 创建圆-扩散圆
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
		ellipse: {
			material: new Material.CircleDiffuseProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: 8
			})
		},
	});
	// 创建圆-渐变褪色圆
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 38.0, 150000.0),
		ellipse: {
			material: new Material.CircleFadeProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: 8
			})
		},
	});
	// 创建圆-渐变圆环
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 36.0, 150000.0),
		ellipse: {
			material: new Material.CircleRingProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.7)
			})
		},
	});
	// 创建圆-模糊圆
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 34.0, 150000.0),
		ellipse: {
			material: new Material.CircleBlurProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				speed: 3
			})
		},
	});
	// 创建圆-scan圆
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 32.0, 150000.0),
		ellipse: {
			material: new Material.CircleScanProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 1),
				speed: 3
			})
		},
	});
	// 创建圆-Spiral圆
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 30.0, 150000.0),
		ellipse: {
			material: new Material.CircleSpiralProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 1),
				speed: 3
			})
		},
	});
	// 创建圆-Vary圆
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 28.0, 150000.0),
		ellipse: {
			material: new Material.CircleVaryProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 1),
				speed: 3
			})
		},
	});
	// 创建圆-Wave圆
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-111.0, 26.0, 150000.0),
		ellipse: {
			material: new Material.CircleWaveProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 1),
				speed: 3,
				count: 3,
				gradient: 0.1
			})
		},
	});
}
// 创建球材质
function createEllipsoids() {
	const layer = layerFactory?.addLayer("Ellipsoids", {
		ellipsoid: {
			radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
		}
	});
	if (!layer) return;
	// 光电扫描球
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-105.0, 30.0, 150000.0),
		ellipsoid: {
			material: new Material.EllipsoidElectricProperty({
				color: Cesium.Color.AQUA,
				speed: 5
			})
		},
	});
	// 材质扫描球
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-95.0, 30.0, 150000.0),
		ellipsoid: {
			material: new Material.EllipsoidTrailProperty({
				color: Cesium.Color.CHARTREUSE,
				speed: 5
			})
		},
	});
}
// 创建圆柱
function createCylinders() {
	const layer = layerFactory?.addLayer("Cylinders", {
		cylinder: {
			length: 200000,
			topRadius: 80000,
			bottomRadius: 80000,
		}
	});
	if (!layer) return;
	// 渐变圆柱
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-90.0, 30.0, 200000.0),
		cylinder: {
			material: new Material.CylinderFadeProperty({
				color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
			})
		},
	});
}
// 创建Radar
function createRadars() {
	const layer = layerFactory?.addLayer("Cylinders", {
		ellipse: {
			semiMinorAxis: 100000.0,
			semiMajorAxis: 100000.0,
			height: 0.0,
		}
	});
	if (!layer) return;
	// 雷达扫描1
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-85.0, 38.0, 150000.0),
		ellipse: {
			material: new Material.RadarWaveProperty({
				color: Cesium.Color.AQUA,
				speed: 8
			})
		},
	});
	// 雷达扫描2
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-85.0, 36.0, 150000.0),
		ellipse: {
			material: new Material.RadarSweepProperty({
				color: Cesium.Color.AQUA,
				speed: 8
			})
		},
	});
	// 雷达扫描3
	layer.add({
		position: Cesium.Cartesian3.fromDegrees(-85.0, 34.0, 150000.0),
		ellipse: {
			material: new Material.RadarLineProperty({
				color: Cesium.Color.AQUA,
				speed: 8
			})
		},
	});
}
onBeforeUnmount(() => {
	// 清空所有图层（图层事件会自动清空）
	layerFactory?.removeAllLayers();
})
</script>

<style scoped>
.bbox,
.content-box {
	width: 100%;
	height: 100%;
}
</style>
