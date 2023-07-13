<template>
	<div class="map-button" :disabled="isAnimating" @click="viewChange">
		<div v-if="viewType === '3d'" class="txt-button" title="切换至2D视图">
			<icons v-if="icon3d" :url="icon3d" />
			<template v-else>3D</template>
		</div>
		<div v-else class="txt-button" title="切换至3D视图">
			<icons v-if="icon2d" :url="icon2d" />
			<template v-else>2D</template>
		</div>
	</div>
</template>

<script setup lang="ts" name="BaseMapViewSet">
import { computed, ref } from "vue";
import { mapFactory } from "../../core/index";
import { getState, setViewType } from "../../core/store";
import { morphMap, getCameraHeight } from "../../core/util";
import icons from "./icons.vue";

defineOptions({
	name: "BaseMapViewSet"
});
defineProps({
	icon3d: {
		type: String,
		required: true
	},
	icon2d: {
		type: String,
		required: true
	}
});

const baseMapStore = getState();
const isAnimating = ref(false);

const viewType = computed(() => {
	return baseMapStore.viewType;
});

const viewChange = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer || isAnimating.value) return;
	isAnimating.value = true;
	const type = baseMapStore.viewType === "3d" ? "2d" : "3d";
	if (type === "3d") morphMap(viewer, type);
	setViewerRotate(viewer, type, () => {
		if (type === "2d") {
			morphMap(viewer, type);
			const h = getCameraHeight(viewer);
			if (h < 300) {
				viewer.camera.zoomOut(300);
			}
		}
		setViewType(type);
		isAnimating.value = false;
	});
};

//传入viewer和要切换的维数
const setViewerRotate = (viewer: any, type: "2d" | "3d", callback: () => void) => {
	//获取屏幕中心视点坐标
	const centerResult = viewer.camera.pickEllipsoid(
		new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2)
	);
	if (!centerResult) return callback();
	if (type === "2d") {
		// 切到二维地图，如果设置到-90度，视角会自动跳转到正北，所以只设置到-88度
		rotateCamera(viewer, centerResult, -88, callback);
	} else {
		// 切到三维地图
		rotateCamera(viewer, centerResult, -30, callback);
	}
};
//根据视点切换垂直视角
const rotateCamera = (viewer: any, centerResult: any, degrees: number, callback: () => void) => {
	const position = centerResult;
	// 给定切换所需时间，比如0.5s
	const flytime = 0.5;
	const initialPitch = viewer.camera.pitch;
	const pitch3d = Cesium.Math.toRadians(degrees);
	const angle = (pitch3d - initialPitch) / flytime; //每秒转动的度数
	// 获取相机和视点距离
	const distance = Cesium.Cartesian3.distance(centerResult, viewer.scene.camera.positionWC);
	const startTime = Cesium.JulianDate.fromDate(new Date());

	const stopTime = Cesium.JulianDate.addSeconds(startTime, flytime, new Cesium.JulianDate());

	viewer.clock.startTime = startTime.clone(); // 开始时间
	viewer.clock.stopTime = stopTime.clone(); // 结速时间
	viewer.clock.currentTime = startTime.clone(); // 当前时间
	viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // 行为方式
	viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; // 时钟设置为当前系统时间; 忽略所有其他设置。
	// 相机的当前heading
	const initialHeading = viewer.camera.heading;

	const Exection = function TimeExecution() {
		// 当前已经过去的时间，单位s
		const delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
		// 根据过去的时间，计算偏航角的变化
		const heading = initialHeading;
		// 相机看点的角度，如果大于0那么则是从地底往上看，所以要为负值，这里取-30度
		const pitch = delTime * angle + initialPitch;

		viewer.camera.lookAt(position, new Cesium.HeadingPitchRange(heading, pitch, distance));
		//解除目标锁定
		viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
		if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
			viewer.clock.onTick.removeEventListener(Exection);
			callback();
		}
	};
	viewer.clock.onTick.addEventListener(Exection);
};
</script>

<style lang="scss" scoped>
@import "./button.scss";

.map-button {
	font-size: 12px;

	&[disabled="true"] {
		cursor: not-allowed;
	}
}
</style>
