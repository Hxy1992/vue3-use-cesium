import { createApp } from "vue";
import App from "./App.vue";

// iconfont css
import "@/assets/iconfont/iconfont.scss";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";

import "@/styles/index.scss";

// 常用指令注册 - app.use(directives)
// import directives from "@/directives/index";

// vue Router
import router from "@/routers/index";
// vue i18n
import I18n from "@/languages/index";
// pinia store
import pinia from "@/stores/index";
// svg icons
import "virtual:svg-icons-register";
// errorHandler
import errorHandler from "@/utils/errorHandler";
import SvgIcon from "@/components/SvgIcon/index.vue";

const app = createApp(App);

app.config.errorHandler = errorHandler;

// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});
// 注册组件
app.component("SvgIcon", SvgIcon);

app.use(router).use(I18n).use(pinia).use(ElementPlus).mount("#app");
