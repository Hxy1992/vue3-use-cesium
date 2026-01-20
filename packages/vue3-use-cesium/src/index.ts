import installPlugins from "./components";

// 组件
export { ZMapBase, ZMapTool, ZMapScale, ZMapStatus } from "./components";
export default installPlugins;

// 样式
import "./style/index.scss";

// 方法
export * from "./modules";

export { loaderScript } from "./utils/loader-script";

export * from "./interface";
