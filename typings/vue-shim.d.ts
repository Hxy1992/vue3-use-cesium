declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// declare module "*.vue" {
// 	import { defineComponent } from "vue";
// 	const component: ReturnType<typeof defineComponent>;
// 	export default component;
// }
