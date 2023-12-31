import { withInstall } from "../../utils/with-install";
import type { DefineComponent } from "vue";
import mapScale from "./src/index.vue";

export const MapScale = withInstall<DefineComponent<{}, {}, any>, typeof mapScale>(mapScale);
export default MapScale;
