<template>
	<!-- 操作帮助按钮 -->
	<div class="zhd-map-operation-button help">
		<slot v-if="$slots.help" />
		<div v-else class="txt-button" title="操作说明" @click="visibleChange">?</div>

		<div v-if="popoverVisible" class="box-popover">
			<div class="cesium-navigation-help cesium-navigation-help-visible">
				<button type="button" :class="{
					'cesium-navigation-button': true,
					'cesium-navigation-button-left': true,
					'cesium-navigation-button-selected': navigation === 'left',
					'cesium-navigation-button-unselected': navigation !== 'left'
				}" @click="navigation = 'left'">
					鼠标操作</button><button type="button" :class="{
						'cesium-navigation-button': true,
						'cesium-navigation-button-right': true,
						'cesium-navigation-button-selected': navigation === 'right',
						'cesium-navigation-button-unselected': navigation !== 'right'
					}" @click="navigation = 'right'">
					触摸手势
				</button>
				<div v-if="navigation === 'left'"
					class="cesium-click-navigation-help cesium-navigation-help-instructions cesium-touch-navigation-help-visible">
					<table>
						<tbody>
							<tr>
								<td></td>
								<td>
									<div class="cesium-navigation-help-pan">平移视图</div>
									<div class="cesium-navigation-help-details">左键按下 + 拖拽</div>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<div class="cesium-navigation-help-zoom">缩放视图</div>
									<div class="cesium-navigation-help-details">中键按下 + 拖拽, 或</div>
									<div class="cesium-navigation-help-details">中键滚动</div>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<div class="cesium-navigation-help-rotate">旋转视图(不支持2D视图)</div>
									<div class="cesium-navigation-help-details">右键按下 + 拖拽, 或</div>
									<div class="cesium-navigation-help-details">按下CTRL键 + 左键按下 + 拖拽</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div v-else
					class="cesium-touch-navigation-help cesium-navigation-help-instructions cesium-touch-navigation-help-visible">
					<table>
						<tbody>
							<tr>
								<td></td>
								<td>
									<div class="cesium-navigation-help-pan">平移视图</div>
									<div class="cesium-navigation-help-details">单指拖动</div>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<div class="cesium-navigation-help-zoom">缩放视图</div>
									<div class="cesium-navigation-help-details">双指向内/向外拖动</div>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<div class="cesium-navigation-help-rotate">倾斜视图(不支持2D视图)</div>
									<div class="cesium-navigation-help-details">双指按相同方向拖动</div>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<div class="cesium-navigation-help-tilt">旋转视图(不支持2D视图)</div>
									<div class="cesium-navigation-help-details">双指按相反方向拖动</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="MapOprationHelp">
import { ref } from "vue";

defineOptions({
	name: "MapOprationHelp"
});

// 鼠标操作
const navigation = ref("left");
const popoverVisible = ref(false);

function visibleChange() {
	popoverVisible.value = !popoverVisible.value;
}
</script>
