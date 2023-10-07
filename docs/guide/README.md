# 使用指南

beta 版本，还在完善中!

### 前言 📖

写这个项目，是为了解决在 Vue3 中简洁、快速的使用 Cesium。有如下特点：

- 无需安装 Cesium 的 npm 包
- cdn 方式加载 Cesium 库，支持按需加载，解决首屏加载慢问题
- 基于 vue3 传送组件，实现多页面复用单个 Cesium 实例，防止频繁切换地图导致的卡顿，非首次地图无感加载
- 渐进式设计，使用非常简单，不需要额外学习接口；同时提供额外的开箱即用函数，需要的话可单独引入使用

关于 Cesium 版本兼容性，已在 1.81 和 1.105 版本进行验证。

### 一、安装使用步骤 📔

- **安装**

```bash
yarn add vue3-use-cesium # npm i vue3-use-cesium --save
```

- **使用**

1. 引入组件和样式

在 App.vue 中使用组件，示例如下：

```vue
<template>
	<router-view></router-view>
	<base-map />
</template>
<script setup lang="ts">
import { BaseMap } from "vue3-use-cesium";
</script>
```

在 main.js 引入样式：

```typescript
import "vue3-use-cesium/style";
```

2. 在路由拦截中加载初始化并加载 Cesium.js

```typescript
import { initMap } from "vue3-use-cesium";
// 路由拦截
router.beforeEach(async (to, from, next) => {
	// ...

	// 如果页面包含地图则加载Cesium.js
	if (to.meta.hasMap) {
		await initMap([
			`https://unpkg.com/cesium@1.105.0/Build/Cesium/Cesium.js`,
			`https://unpkg.com/cesium@1.105.0/Build/Cesium/Widgets/widgets.css`
		]);
	}

	// ...
	next();
});
```

3. 定义 hooks（可选）

```typescript
import { onBeforeUnmount, onMounted } from "vue";
import { setToTarget, setVisible, clearMapElements, clearMapEvents, getViewer } from "vue3-use-cesium";

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
	<div class="bbox">
		<div id="my-map" class="content-box"></div>
	</div>
</template>

<script setup lang="ts" name="fillMap">
import { useBaseMap } from "@/hooks/useCesium";

// 地图初始化
useBaseMap("#my-map", viewer => {
	console.log(viewer);
});
</script>

<style lang="scss" scoped>
.bbox {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.content-box {
	position: relative;
}
</style>
```

5. 关于 Cesium 的 ts 类型定义

可自行引入

6. 页面中请将地图容器放到 div 中使用

使用 Vue3 传送组件 Teleport 来实现地图实例的复用，如下使用会出现问题

```vue
<template>
	<div id="my-map" class="content-box"></div>
</template>

<script setup lang="ts">
import { useBaseMap } from "@/hooks/useCesium";
useBaseMap("#my-map", viewer => {});
</script>
```

```vue
<template>
	<div id="my-map" class="content-box"></div>
	<div>其他内容</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "@/hooks/useCesium";
useBaseMap("#my-map", viewer => {});
</script>
```

请这样使用：

```vue
<template>
	<div class="bbox">
		<div id="my-map" class="content-box"></div>
		<div>其他内容</div>
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "@/hooks/useCesium";
useBaseMap("#my-map", viewer => {});
</script>
```
