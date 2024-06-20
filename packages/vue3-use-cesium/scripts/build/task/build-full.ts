import path from "path";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDefineOptions from "unplugin-vue-define-options/rollup";
import esbuild, { minify as minifyPlugin } from "rollup-plugin-esbuild";
import { compRoot, output } from "../utils/paths";
import { target, generateExternal } from "../utils/rollup";
import { PKG_CAMELCASE_NAME } from "../utils/constants";
import scss from "rollup-plugin-scss";
import image from "@rollup/plugin-image";

const build = async (minify: boolean) => {
	const input = [
		// root
		path.resolve(compRoot, "index.ts")
	];

	const bundle = await rollup({
		input,
		plugins: [
			// @ts-ignore
			vueDefineOptions(),
			// @ts-ignore
			vue(),
			// @ts-ignore
			vueJsx(),
			// @ts-ignore
			image(),
			scss(),
			nodeResolve(),
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
			file: path.resolve(output, `index${minify ? ".min" : ""}.mjs`),
			exports: undefined,
			sourcemap: minify,
			assetFileNames: "style.css"
		}),
		bundle.write({
			format: "umd",
			file: path.resolve(output, `index${minify ? ".min" : ""}.js`),
			exports: "named",
			sourcemap: minify,
			name: PKG_CAMELCASE_NAME,
			globals: {
				vue: "Vue"
			},
			assetFileNames: "style.css"
		})
	]);
};

export const buildFull = async () => {
	await Promise.all([build(false), build(true)]);
};
