# @zhdgps/vue3-use-cesium

基于 Vue3、Typescrip、Cesium 的组件库。

### 功能 📖

基于 pnpm workspace、vite、glup、rollup 脚手架，依赖 Vue3、Cesium 开发的 CBB 公共库——vue3-use-cesium
有以下特点/功能：

- 可支持 Cesium 库的按需加载
- 基于 vue3 传送组件，实现多页面复用单个 Cesium 实例，防止频繁切换地图导致的卡顿，非首次地图无感加载
- 支持封装 hook，使用简单
- 支持地形、事件管理、图层管理、图层弹窗等
- 支持地图工具（主页、底图图层、放大缩小、二三维切换等）、地图状态信息（鼠标位置、相机信息）
- 支持标绘功能，绘制点线面、贴地/贴模型绘制等等，结果可输出 geojson
- 支持测量功能，坐标测量(椭球/地形/模型)、距离测量(椭球/地形/模型/贴地/贴模型) 、面积测量(椭球/地形/模型/贴地/贴模型) 、高度差测量(地形/模型) 、三角测量(地形/模型)
- 支持点聚合
- 支持场景书签
- 支持常用 Primitive 材质，如光电扫描球、颜色扫描球、雷达扫描、扩散圆、渐变墙、闪烁线等等

关于 Cesium 版本兼容性，已在 1.81 和 1.105 版本进行验证。

### 快速开始 📔

- **安装**

```bash
yarn add @zhdgps/vue3-use-cesium # npm i @zhdgps/vue3-use-cesium --save
```

- **使用**

1. 引入组件和样式

在 App.vue 中使用组件，示例如下：

```vue
<template>
	<router-view></router-view>
	<z-map-base />
</template>
<script setup lang="ts">
import { ZMapBase } from "@zhdgps/vue3-use-cesium";
</script>
```

在 main.js 引入样式：

```typescript
import "@zhdgps/vue3-use-cesium/style";
```

2. 在路由拦截中加载初始化并加载 Cesium.js

```typescript
import { initMap } from "@zhdgps/vue3-use-cesium";
// 路由拦截
router.beforeEach(async (to, from, next) => {
	// ...

	// 如果页面包含地图则加载Cesium.js
	if (to.meta.hasMap) {
		await initMap([`/CesiumV1.105/Cesium.js`, `/CesiumV1.105/Widgets/widgets.css`], {
			imagery: "gd-img"
		});
	}

	// ...
	next();
});
```

3. 定义 hooks（可选）

```typescript
import { onBeforeUnmount, onMounted } from "vue";
import { setToTarget, setVisible, clearMapElements, clearMapEvents, getViewer } from "@zhdgps/vue3-use-cesium";

/**
 * 基础地图使用
 * @param selector div的id / body
 * @param mapCreated 成功回调(返回Viewer)
 */
export const useBaseMap = (selector: string, mapCreated?: (viewer: any) => void) => {
	onMounted(() => {
		setToTarget(selector);
		setVisible(true);
		if (mapCreated) {
			mapCreated(getViewer());
		}
	});
	onBeforeUnmount(() => {
		clearMapElements();
		clearMapEvents();
		setVisible(false);
		setToTarget("body");
	});
};
```

4. 页面使用

```vue
<template>
	<!-- 只有一个顶层div -->
	<div class="bbox">
		<!-- 地图容器不能是顶层div -->
		<div id="my-map">
			<!-- 地图弹窗... -->
		</div>
		<!-- 地图面板等... -->
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "@/hooks/useCesium";

// 地图初始化
useBaseMap("#my-map", viewer => {
	console.log(viewer);
});
</script>
```
