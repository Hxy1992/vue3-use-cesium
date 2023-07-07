import { resolve } from "path";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDefineOptions from "unplugin-vue-define-options/rollup";
import esbuild, { minify as minifyPlugin } from "rollup-plugin-esbuild";
import { compRoot, output } from "../utils/paths";
import { target, generateExternal } from "../utils/rollup";
import { PKG_CAMELCASE_NAME } from "../utils/constants";
// import alias from "@rollup/plugin-alias";
import scss from "rollup-plugin-scss";

const build = async (minify: boolean) => {
	const input = [
		// root
		resolve(compRoot, "index.ts")
	];

	const bundle = await rollup({
		input,
		plugins: [
			vueDefineOptions(),
			vue(),
			vueJsx(),
			scss(),
			nodeResolve(),
			// alias({
			// 	entries: [{ find: "vue3-use-cesium", replacement: resolve(__dirname, "packages") }]
			// }),
			esbuild({
				target,
				sourceMap: minify,
				treeShaking: true
			}),
			minify
				? minifyPlugin({
						target,
						sourceMap: minify
				  })
				: null
		],
		treeshake: true,
		external: generateExternal({ full: false })
	});

	await Promise.all([
		bundle.write({
			format: "esm",
			file: resolve(output, `index${minify ? ".min" : ""}.mjs`),
			exports: undefined,
			sourcemap: minify
		}),
		bundle.write({
			format: "umd",
			file: resolve(output, `index${minify ? ".min" : ""}.js`),
			exports: "named",
			sourcemap: minify,
			name: PKG_CAMELCASE_NAME,
			globals: {
				vue: "Vue"
			}
		})
	]);
};

export const buildFull = async () => {
	await Promise.all([build(false), build(true)]);
};
