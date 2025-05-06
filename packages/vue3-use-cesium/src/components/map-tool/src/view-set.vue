<template>
	<div class="zmap-tool_button view-set" :disabled="isAnimating || baseMapStore.viewTypeDisabled" @click="viewChange">
		<div v-if="viewType === '3d'" title="切换至2D视图">
			<slot v-if="$slots.view3d" name="view3d" />
			<img v-else class="svg-icon" alt="3d" :src="svgUrl2" />
		</div>
		<div v-else title="切换至3D视图">
			<slot v-if="$slots.view2d" name="view2d" />
			<img v-else class="svg-icon" alt="2d" :src="svgUrl1" />
		</div>
	</div>
</template>

<script setup lang="ts" name="MapOprationViewSet">
import { computed, ref } from "vue";
import { mapFactory } from "../../../modules/basemap";
import { getState, setViewType } from "../../../utils/store";
import { morphMap, getCameraHeight } from "../../../modules/util";
import svgUrl1 from "../../../assets/svg/earth2d.svg";
import svgUrl2 from "../../../assets/svg/earth3d.svg";

const baseMapStore = getState();
const isAnimating = ref(false);

const viewType = computed(() => {
	return baseMapStore.viewType;
});

const viewChange = () => {
	const viewer = mapFactory.get(baseMapStore.mapId || "");
	if (!viewer || isAnimating.value || baseMapStore.viewTypeDisabled) return;
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

	// 备份clock参数
	const copyClock = {
		startTime: viewer.clock.startTime.clone(),
		stopTime: viewer.clock.stopTime.clone(),
		currentTime: viewer.clock.currentTime.clone(),
		clockRange: viewer.clock.clockRange,
		clockStep: viewer.clock.clockStep
	};

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
			// 恢复clock参数
			viewer.clock.startTime = copyClock.startTime;
			viewer.clock.stopTime = copyClock.stopTime;
			viewer.clock.currentTime = copyClock.currentTime;
			viewer.clock.clockRange = copyClock.clockRange;
			viewer.clock.clockStep = copyClock.clockStep;
			callback();
		}
	};
	viewer.clock.onTick.addEventListener(Exection);
};
</script>
