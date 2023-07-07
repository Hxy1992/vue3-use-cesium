import { resolve } from "path";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDefineOptions from "unplugin-vue-define-options/rollup";
import esbuild from "rollup-plugin-esbuild";
import { compRoot, outputEsm, outputCjs } from "../utils/paths";
import { target, generateExternal, generatePaths } from "../utils/rollup";
// import alias from "@rollup/plugin-alias";
import scss from "rollup-plugin-scss";

export const buildModules = async () => {
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
			// 	entries: [{ find: "vue3-use-cesium", replacement: resolve(__dirname, "./packages") }]
			// }),
			esbuild({
				target,
				sourceMap: true
			})
		],
		treeshake: false,
		external: generateExternal({ full: true })
	});

	await Promise.all([
		bundle.write({
			format: "esm",
			dir: outputEsm,
			exports: undefined,
			preserveModules: true,
			preserveModulesRoot: "packages",
			sourcemap: true,
			entryFileNames: `[name].mjs`
		}),
		bundle.write({
			format: "cjs",
			dir: outputCjs,
			exports: "named",
			preserveModules: true,
			preserveModulesRoot: "packages",
			sourcemap: true,
			entryFileNames: `[name].js`,
			paths: generatePaths()
		})
	]);
};
