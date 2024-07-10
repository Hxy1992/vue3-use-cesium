<template>
	<div class="content">
		<h1 id="vue3-use-cesium">vue3-use-cesium</h1>
		<p>基于 Vue3、Typescrip、Cesium 的组件库。</p>
		<h3>功能 📖</h3>
		<p>基于 pnpm workspace、vite、glup、rollup 脚手架，依赖 Vue3、Cesium 开发的 CBB 公共库——vue3-use-cesium
			有以下特点/功能：</p>
		<ul>
			<li>可支持 Cesium 库的按需加载</li>
			<li>基于 vue3 传送组件，实现多页面复用单个 Cesium 实例，防止频繁切换地图导致的卡顿，非首次地图无感加载</li>
			<li>支持封装 hook，使用简单</li>
			<li>支持地形、事件管理、图层管理、图层弹窗等</li>
			<li>支持地图工具（主页、底图图层、放大缩小、二三维切换等）、地图状态信息（鼠标位置、相机信息）</li>
			<li>支持标绘功能，绘制点线面、贴地/贴模型绘制等等，结果可输出 geojson</li>
			<li>支持测量功能，坐标测量(椭球/地形/模型)、距离测量(椭球/地形/模型/贴地/贴模型) 、面积测量(椭球/地形/模型/贴地/贴模型) 、高度差测量(地形/模型) 、三角测量(地形/模型)</li>
			<li>支持点聚合</li>
			<li>支持场景书签</li>
			<li>支持常用 Entity、Primitive 材质，如光电扫描球、颜色扫描球、雷达扫描、扩散圆、渐变墙、闪烁线等等</li>
			<li>支持热力图</li>
		</ul>
		<p>关于 Cesium 版本兼容性，已在 1.105、1.119 版本进行验证。</p>
		<h3>快速开始 📔</h3>
		<ul>
			<li>
				<strong>安装</strong>
			</li>
		</ul>
		<pre>
	<code class="language-bash">yarn add vue3-use-cesium # npm i vue3-use-cesium --save
</code>
</pre>
		<ul>
			<li>
				<strong>使用</strong>
			</li>
		</ul>
		<ol>
			<li>引入组件和样式</li>
		</ol>
		<p>在 App.vue 中使用组件，示例如下：</p>
		<pre>
	<code class="language-vue">&lt;template&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
    &lt;z-map-base /&gt;
&lt;/template&gt;
&lt;script setup lang=&quot;ts&quot;&gt;
import { ZMapBase } from &quot;vue3-use-cesium&quot;;
&lt;/script&gt;
</code>
</pre>
		<p>在 main.js 引入样式：</p>
		<pre>
	<code class="language-typescript">import &quot;vue3-use-cesium/style&quot;;
</code>
</pre>
		<ol start="2">
			<li>在路由拦截中加载初始化并加载 Cesium.js</li>
		</ol>
		<pre>
	<code class="language-typescript">import { initMap } from &quot;vue3-use-cesium&quot;;
// 路由拦截
router.beforeEach(async (to, from, next) =&gt; {
    // ...

    // 如果页面包含地图则加载Cesium.js
    if (to.meta.hasMap) {
        await initMap([`/CesiumV1.105/Cesium.js`, `/CesiumV1.105/Widgets/widgets.css`], {
            imagery: &quot;gd-img&quot;
        });
    }

    // ...
    next();
});
</code>
</pre>
		<ol start="3">
			<li>定义 hooks（可选）</li>
		</ol>
		<pre>
	<code class="language-typescript">import { onBeforeUnmount, onMounted } from &quot;vue&quot;;
import { setToTarget, setVisible, clearMapElements, clearMapEvents, getViewer } from &quot;vue3-use-cesium&quot;;

/**
 * 基础地图使用
 * @param selector div的id / body
 * @param mapCreated 成功回调(返回Viewer)
 */
export const useBaseMap = (selector: string, mapCreated?: (viewer: any) =&gt; void) =&gt; {
    onMounted(() =&gt; {
        setToTarget(selector);
        setVisible(true);
        if (mapCreated) {
            mapCreated(getViewer());
        }
    });
    onBeforeUnmount(() =&gt; {
        clearMapElements();
        clearMapEvents();
        setVisible(false);
        setToTarget(&quot;body&quot;);
    });
};
</code>
</pre>
		<ol start="4">
			<li>页面使用</li>
		</ol>
		<pre>
	<code class="language-vue">&lt;template&gt;
    &lt;!-- 只有一个顶层div --&gt;
    &lt;div class=&quot;bbox&quot;&gt;
        &lt;!-- 地图容器不能是顶层div --&gt;
        &lt;div id=&quot;my-map&quot;&gt;
            &lt;!-- 地图弹窗... --&gt;
        &lt;/div&gt;
        &lt;!-- 地图面板等... --&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import { useBaseMap } from &quot;@/hooks/useCesium&quot;;

// 地图初始化
useBaseMap(&quot;#my-map&quot;, viewer =&gt; {
    console.log(viewer);
});
&lt;/script&gt;
</code>
</pre>

	</div>
</template>

<style scoped>
.content {
	height: 100%;
	padding: 50px 150px;
	overflow: auto;
}

.content pre {
	padding: 10px;
	margin: 0;
	color: #23263b;
	word-break: break-all;
	word-wrap: break-word;
	white-space: pre;
	counter-reset: itemcounter;
	background: rgb(245 245 250);
	border: 0;
	border-radius: 0 0 4px 4px;
}
</style>
