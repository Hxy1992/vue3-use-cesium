<template>
	<div class="content">
		<h1>写这个项目，是为了解决在 Vue3 中简洁、快速的使用 Cesium。有如下特点：</h1>
		<h3>- 无需安装 Cesium 的 npm 包</h3>
		<h3>- cdn 方式加载 Cesium 库，支持按需加载，解决首屏加载慢问题</h3>
		<h3>- 基于 vue3 传送组件，实现多页面复用单个 Cesium 实例，防止频繁切换地图导致的卡顿，非首次地图无感加载</h3>
		<h3>- 渐进式设计，使用非常简单，不需要额外学习接口；同时提供额外的开箱即用函数，需要的话可单独引入使用</h3>
	</div>
</template>

<style scoped>
.content {
	padding: 50px 150px;
}
</style>
