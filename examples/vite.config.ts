import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		},
		// 利用情景导出实现示例热更新
		// https://cn.vitejs.dev/config/shared-options.html#resolve-conditions
		conditions: ["dev"]
	},
	server: {
		open: true,
		host: "0.0.0.0",
		watch: {
			ignored: ["!**/node_modules/vue3-use-cesium/**"]
		}
	},
	optimizeDeps: {
		exclude: ["Cesium"]
	}
});
