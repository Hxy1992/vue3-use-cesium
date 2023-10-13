import type { App } from "vue";

// 组件
import ZMapBase from "./base-map";
import ZMapTool from "./map-tool";
import ZMapScale from "./map-scale";
import ZMapStatus from "./map-status";

const components = [ZMapBase, ZMapTool, ZMapScale, ZMapStatus];
function install(app: App): void {
	components.forEach(item => {
		if (item.install!) {
			app.use(item);
		} else if (item.name) {
			app.component(item.name, item);
		}
	});
}

export { ZMapBase, ZMapTool, ZMapScale, ZMapStatus };
export default {
	install,
	components
};
