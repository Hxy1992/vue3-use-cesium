import { withInstall } from "../../utils/with-install";
import type { DefineComponent } from "vue";
import mapStatus from "./src/index.vue";

export const MapStatus = withInstall<DefineComponent<{}, {}, any>, any>(mapStatus);
export default MapStatus;
