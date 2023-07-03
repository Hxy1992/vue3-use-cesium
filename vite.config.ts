import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { wrapperEnv, isDevFn } from "./website/utils/getEnv";
import { visualizer } from "rollup-plugin-visualizer";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { name, version } from "./package.json";

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	const common = {
		base: "./",
		define: {
			__Version__: JSON.stringify(version)
		},
		resolve: {
			alias: {
				"@": resolve(__dirname, "./website"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
				[name]: resolve(__dirname, "./packages")
			}
		}
	};
	if (isDevFn(mode)) {
		// 调试网站
		return {
			...common,
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: `@import "@/styles/var.scss";`
					}
				}
			},
			server: {
				// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
				host: "0.0.0.0",
				port: 3301,
				open: true,
				cors: true
			},
			plugins: [
				vue(),
				createHtmlPlugin({
					inject: {
						data: {
							title: viteEnv.VITE_GLOB_APP_TITLE
						}
					}
				}),
				// * 使用 svg 图标
				createSvgIconsPlugin({
					iconDirs: [resolve(process.cwd(), "website/assets/icons")],
					symbolId: "icon-[dir]-[name]"
				}),
				// * EsLint 报错信息显示在浏览器界面上
				eslintPlugin(),
				// * vite 可以使用 jsx/tsx 语法
				vueJsx(),
				// * name 可以写在 script 标签上
				VueSetupExtend(),
				// * 是否生成包预览(分析依赖包大小,方便做优化处理)
				viteEnv.VITE_REPORT && visualizer()
			]
		};
	} else {
		// 打包输出库
		return {
			...common,
			plugins: [
				vue(),
				// * EsLint 报错信息显示在浏览器界面上
				eslintPlugin(),
				// * vite 可以使用 jsx/tsx 语法
				vueJsx(),
				// * 是否生成包预览(分析依赖包大小,方便做优化处理)
				viteEnv.VITE_REPORT && visualizer()
				// * gzip compress
				// viteEnv.VITE_BUILD_GZIP &&
				// 	viteCompression({
				// 		verbose: true,
				// 		disable: false,
				// 		threshold: 10240,
				// 		algorithm: "gzip",
				// 		ext: ".gz"
				// 	})
			],
			// * 打包去除 console.log && debugger
			esbuild: {
				pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
			},
			build: {
				outDir: "dist",
				minify: "esbuild",
				target: "modules",
				cssTarget: "chrome80",
				reportCompressedSize: false,
				chunkSizeWarningLimit: 500,
				copyPublicDir: false,
				lib: {
					formats: ["cjs", "es", "umd"],
					// Could also be a dictionary or array of multiple entry points
					entry: resolve(__dirname, "./packages/index.ts"),
					name: "Vue3UseCesium",
					// the proper extensions will be added
					fileName: format => `index.${format}.js`
				},
				rollupOptions: {
					// 确保外部化处理那些你不想打包进库的依赖
					external: ["vue"],
					output: {
						// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
						globals: {
							vue: "Vue"
						}
					}
				}
			}
		};
	}
});
