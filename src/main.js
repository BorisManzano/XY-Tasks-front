import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueCookies from "vue-cookies";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App)
  .use(VueCookies, { expires: "1d", path: "/" })
  .use(store)
  .use(router)
  .use(VueSweetalert2)
  .component("VueDatePicker", VueDatePicker)
  .mount("#app");
