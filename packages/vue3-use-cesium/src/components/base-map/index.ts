import { withInstall } from "../../utils/with-install";
import type { DefineComponent } from "vue";
import baseMap from "./src/index.vue";

export const BaseMap = withInstall<DefineComponent<{}, {}, any>, typeof baseMap>(baseMap);
export default BaseMap;
