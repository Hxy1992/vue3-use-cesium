import { withInstall } from "../../utils/with-install";
import type { DefineComponent } from "vue";
import mapOperation from "./src/index.vue";

export const MapOperation = withInstall<DefineComponent<{}, {}, any>, any>(mapOperation);
export default MapOperation;
