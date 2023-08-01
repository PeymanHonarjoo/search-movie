import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugin/vuetify.js";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";

//core
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
//icons
import "primeicons/primeicons.css";
import Button from "primevue/button";
import Card from "primevue/card";
import Menu from "primevue/menu";
import Avatar from "primevue/avatar";
import Dropdown from "primevue/dropdown";
import Rating from "primevue/rating";
createApp(App)
  .use(store)
  .use(PrimeVue)
  .component("InputText", InputText)
  .component("Button", Button)
  .component("Card", Card)
  .component("Menu", Menu)
  .component("Avatar", Avatar)
  .component("Dropdown", Dropdown)
  .component("Rating", Rating)
  .use(router)
  .use(vuetify)
  .mount("#app");
