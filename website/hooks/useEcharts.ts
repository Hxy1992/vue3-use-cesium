import { onActivated, onDeactivated, onBeforeUnmount, watch } from "vue";
import * as echarts from "echarts";
import { GlobalStore } from "@/stores";

/**
 * @description 使用Echarts(图表响应式、主题色)。
 * @description 特别注意：options不能传xy轴和series中的数据，否则切换主题会导致数据为空！
 * @param {Element} myChart Echarts实例(必传)
 * @param {Object} options 绘制Echarts的参数(必传)
 * @param {Object} darkOptions 暗黑模式参数，用于覆盖浅色模式
 * @param {Function} resizeCallBack resize回调
 * @return void
 * */
export const useEcharts = (
	myChart: echarts.ECharts,
	options: echarts.EChartsCoreOption,
	darkOptions?: echarts.EChartsCoreOption,
	resizeCallBack?: Function
) => {
	const globalStore = GlobalStore();
	const setOption = () => {
		if (!myChart.getOption()) myChart.setOption(options || {});
		if (globalStore.themeConfig.isDark) {
			myChart.setOption({ darkMode: true, ...(darkOptions || {}) });
		} else {
			myChart.setOption({ darkMode: false, ...(options || {}) });
		}
	};
	setOption();
	// 主题色切换
	watch(() => {
		return globalStore.themeConfig.isDark;
	}, setOption);

	// resize节流
	let timer: any = null;
	const echartsResize = () => {
		if (timer !== null || !myChart) {
			return;
		}
		timer = setTimeout(() => {
			const container = myChart.getDom();
			const canvasWidth = myChart.getWidth();
			const canvasHeight = myChart.getHeight();
			if (container.clientWidth !== canvasWidth || container.clientHeight !== canvasHeight) {
				myChart && myChart.resize();
				resizeCallBack && resizeCallBack();
			}
			timer = null;
		}, 100);
	};

	let isVisible = true;
	const checkSize = () => {
		echartsResize();
		if (!isVisible) return;
		requestAnimationFrame(checkSize);
	};
	checkSize();

	onActivated(() => {
		isVisible = true;
		checkSize();
	});

	onDeactivated(() => {
		isVisible = false;
	});

	onBeforeUnmount(() => {
		isVisible = false;
	});
};
