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

let viewer: any;
let primitives: any[] = [];
// 地图初始化
useBaseMap("#my-map", v => {
	viewer = v;
	addElements();
});

function addElements() {
	createWall();
	createWall2();
	createWall3();
	createPolyline();
	createPolyline2();
	createPolyline3();
	createCircle();
	createCircle2();
	createCircle3();
	createCircle4();
	createEllipsoid();
	createCylinder();
	createRadar();
	createRadar2();
}
function clearElements() {
	for (let i = 0; i < primitives.length; i++) {
		viewer.scene.primitives.remove(primitives[i]);
	}
	primitives = [];
}
function createWall() {
	const wall = new Cesium.WallGeometry({
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
		])
	});
	const geometry = Cesium.WallGeometry.createGeometry(wall);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createWallTrail({
					color: Cesium.Color.GREEN,
					speed: 15,
					image: fenceImg
				})
			}),
			allowPicking: false
		})
	);
	primitives.push(p);
}
function createWall2() {
	const wall = new Cesium.WallGeometry({
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
		])
	});
	const geometry = Cesium.WallGeometry.createGeometry(wall);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createWallDiffuse({
					color: Cesium.Color.GREEN,
				})
			}),
			allowPicking: false
		})
	);
	primitives.push(p);
}
function createWall3() {
	const wall = new Cesium.WallGeometry({
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
		])
	});
	const geometry = Cesium.WallGeometry.createGeometry(wall);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createWallLineTrail({
					color: Cesium.Color.GREEN,
					speed: 4,
					repeat: new Cesium.Cartesian2(2, 1.5),
					image: spaceLineImg
				})
			}),
			allowPicking: false
		})
	);
	primitives.push(p);
}
function createPolyline() {
	const polyline = new Cesium.PolylineGeometry({
		positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107, 35, 1000, -97, 35, 1000]),
		width: 5.0,
		colorsPerVertex: true,
		vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
		arcType: Cesium.ArcType.NONE
	});
	const geometry = Cesium.PolylineGeometry.createGeometry(polyline);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.PolylineMaterialAppearance({
				material: Material.createPolylineFlicker({
					color: Cesium.Color.AQUA,
					speed: 10,
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);
}
function createPolyline2() {
	const polyline = new Cesium.PolylineGeometry({
		positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107, 34, 1000, -97, 34, 1000]),
		width: 5.0,
		colorsPerVertex: true,
		vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
		arcType: Cesium.ArcType.NONE
	});
	const geometry = Cesium.PolylineGeometry.createGeometry(polyline);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.PolylineMaterialAppearance({
				material: Material.createPolylineFlow({
					color: Cesium.Color.AQUA,
					speed: 10,
					percent: 0.1,
					gradient: 0.5
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);
}
function createPolyline3() {
	const polyline = new Cesium.PolylineGeometry({
		positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107, 33, 1000, -97, 33, 1000]),
		width: 10.0,
		colorsPerVertex: true,
		vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
		arcType: Cesium.ArcType.NONE
	});
	const geometry = Cesium.PolylineGeometry.createGeometry(polyline);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.PolylineMaterialAppearance({
				material: Material.createPolylineLightingTrail({
					color: Cesium.Color.AQUA,
					image: lightingImg,
					speed: 10,
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);
}
function createCircle() {
	const circle = new Cesium.CircleGeometry({
		center: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
		radius: 100000.0
	});
	const geometry = Cesium.CircleGeometry.createGeometry(circle);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createCircleDiffuse({
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
					speed: 8
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);
}
function createCircle2() {
	const circle = new Cesium.CircleGeometry({
		center: Cesium.Cartesian3.fromDegrees(-111.0, 38.0, 150000.0),
		radius: 100000.0
	});
	const geometry = Cesium.CircleGeometry.createGeometry(circle);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createCircleFade({
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
					speed: 8
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);
}
function createCircle3() {
	const circle = new Cesium.CircleGeometry({
		center: Cesium.Cartesian3.fromDegrees(-111.0, 36.0, 150000.0),
		radius: 100000.0
	});
	const geometry = Cesium.CircleGeometry.createGeometry(circle);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createCircleRing({
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);
}
function createCircle4() {
	const circle = new Cesium.CircleGeometry({
		center: Cesium.Cartesian3.fromDegrees(-111.0, 34.0, 150000.0),
		radius: 100000.0
	});
	const geometry = Cesium.CircleGeometry.createGeometry(circle);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createCircleBlur({
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
					speed: 3
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);
}
function createEllipsoid() {
	const ellipsoid = new Cesium.EllipsoidGeometry({
		vertexFormat: Cesium.VertexFormat.ALL,
		radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0)
	});
	const geometry = Cesium.EllipsoidGeometry.createGeometry(ellipsoid);
	const instance = new Cesium.GeometryInstance({
		geometry,
		modelMatrix: Cesium.Matrix4.multiplyByTranslation(
			Cesium.Transforms.eastNorthUpToFixedFrame(
				Cesium.Cartesian3.fromDegrees(-105.0, 30.0)
			),
			new Cesium.Cartesian3(0.0, 0.0, 0),
			new Cesium.Matrix4()
		),
	});

	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createEllipsoidElectric({
					color: Cesium.Color.AQUA,
					speed: 5
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);

	const instance2 = new Cesium.GeometryInstance({
		geometry,
		modelMatrix: Cesium.Matrix4.multiplyByTranslation(
			Cesium.Transforms.eastNorthUpToFixedFrame(
				Cesium.Cartesian3.fromDegrees(-95.0, 30.0)
			),
			new Cesium.Cartesian3(0.0, 0.0, 150000),
			new Cesium.Matrix4()
		),
	});
	const p2 = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance2,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createEllipsoidTrail({
					color: Cesium.Color.CHARTREUSE,
					speed: 5
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p2);
}
function createCylinder() {
	const cylinder = new Cesium.CylinderGeometry({
		length: 200000,
		topRadius: 80000,
		bottomRadius: 80000,
	});
	const geometry = Cesium.CylinderGeometry.createGeometry(cylinder);
	const instance = new Cesium.GeometryInstance({
		geometry,
		modelMatrix: Cesium.Matrix4.multiplyByTranslation(
			Cesium.Transforms.eastNorthUpToFixedFrame(
				Cesium.Cartesian3.fromDegrees(-90.0, 30.0)
			),
			new Cesium.Cartesian3(0.0, 0.0, 200000),
			new Cesium.Matrix4()
		),
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createCylinderFade({
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);
}
function createRadar() {
	const circle = new Cesium.CircleGeometry({
		center: Cesium.Cartesian3.fromDegrees(-85.0, 38.0, 150000.0),
		radius: 100000.0
	});
	const geometry = Cesium.CircleGeometry.createGeometry(circle);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createRadarWave({
					color: Cesium.Color.AQUA,
					speed: 8
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);
}
function createRadar2() {
	const circle = new Cesium.CircleGeometry({
		center: Cesium.Cartesian3.fromDegrees(-85.0, 36.0, 150000.0),
		radius: 100000.0
	});
	const geometry = Cesium.CircleGeometry.createGeometry(circle);
	const instance = new Cesium.GeometryInstance({
		geometry
	});
	const p = viewer.scene.primitives.add(
		new Cesium.Primitive({
			geometryInstances: instance,
			appearance: new Cesium.MaterialAppearance({
				material: Material.createRadarSweep({
					color: Cesium.Color.AQUA,
					speed: 8
				}),
				allowPicking: false
			})
		})
	);
	primitives.push(p);
}

onBeforeUnmount(async () => {
	clearElements();
});
</script>

<style scoped>
.bbox,
.content-box {
	width: 100%;
	height: 100%;
}

ul {
	margin: 5px 0;
}

.btn-box {
	position: absolute;
	top: 10px;
	left: 10px;
	padding: 16px;
	color: white;
	background-color: rgb(32 177 143 / 50%);
	border-radius: 5px;
}

.btn-box li {
	list-style-type: none;
}

.btn-box button {
	width: 80px;
	margin: 2px 0;
	cursor: pointer;
}

.btn-box button[selected=true] {
	color: white;
	background-color: #4064e2;
}

.btn-box .description {
	margin-bottom: 8px;
	font-size: 12px;
}
</style>
