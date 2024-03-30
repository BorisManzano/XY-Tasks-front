import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import PrimeVue from "primevue/config";
import Lara from "./presets/lara";
import VueCookies from "vue-cookies";
import VueRouter from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App)
  .use(VueCookies, { expires: "1d", path: "/" })
  .use(store)
  .use(router)
  .use(PrimeVue, {
    unstyled: true,
    pt: Lara,
  })
  .component("VueDatePicker", VueDatePicker)
  .mount("#app");
