import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import PrimeVue from "primevue/config";
import Lara from "./presets/lara";
import VueCookies from "vue-cookies";
import VueRouter from "vue-router";

// createApp(App).use(store).use(router).mount('#app')

const app = createApp(App)
  .use(VueCookies, { expires: "1d", path: "/" })
  .use(store)
  .use(router)
  .use(PrimeVue, {
    unstyled: true,
    pt: Lara,
  })
  .mount("#app");
