import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

let app = createApp(App);

app.use(vuetify);

app.mount("#app");
