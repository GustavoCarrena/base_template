import "./style.css";
import "primeicons/primeicons.css";

import App from "./App.vue";
import router from "./router";

import { createApp } from "vue";
import ToastService from "primevue/toastservice";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import { VueQueryPlugin } from "@tanstack/vue-query";
import Aura from "@primeuix/themes/aura";

export const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
});
app.use(ToastService);
app.use(createPinia());
app.mount("#app");
