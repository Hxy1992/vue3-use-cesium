# @zhdgps/vue3-use-cesium

基于 Vue3、Typescrip、Cesium 的组件库。

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
