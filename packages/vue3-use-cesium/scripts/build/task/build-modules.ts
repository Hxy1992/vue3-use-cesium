import path from "path";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDefineOptions from "unplugin-vue-define-options/rollup";
import esbuild from "rollup-plugin-esbuild";
import { compRoot, outputEsm, outputCjs } from "../utils/paths";
import { target, generateExternal, generatePaths } from "../utils/rollup";
import scss from "rollup-plugin-scss";

export const buildModules = async () => {
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
			scss(),
			nodeResolve(),
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
			preserveModules: false,
			preserveModulesRoot: "src",
			sourcemap: true,
			entryFileNames: `[name].mjs`,
			assetFileNames: "style.css"
		}),
		bundle.write({
			format: "cjs",
			dir: outputCjs,
			exports: "named",
			preserveModules: false,
			preserveModulesRoot: "src",
			sourcemap: true,
			entryFileNames: `[name].js`,
			paths: generatePaths(),
			assetFileNames: "style.css"
		})
	]);
};
