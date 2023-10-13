import "./assets/main.css";
import { createApp } from "vue";
import AppMain from "./App.vue";
import router from "./router";
// import Vue3UseCesium from "vue3-use-cesium";
const app = createApp(AppMain);

app.use(router);

app.mount("#app");
