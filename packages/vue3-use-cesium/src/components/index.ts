import type { App } from "vue";

// 组件
import BaseMap from "./base-map";
import MapOperation from "./map-tool";
import MapScale from "./map-scale";
import MapStatus from "./map-status";

const components = [BaseMap, MapOperation, MapScale, MapStatus];
function install(app: App) {
	components.forEach(item => {
		if (item.install!) {
			app.use(item);
		} else if (item.name) {
			app.component(item.name, item);
		}
	});
}

export { BaseMap, MapOperation, MapScale, MapStatus };

export default {
	install,
	components
};
