import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./plugins/router";
import { createI18n } from "vue-i18n";

import "./plugins/axios";

import { locale, fallbackLocale, messages } from "./plugins/i18n";

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale,
    fallbackLocale,
    messages,
});

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement
);

let app = createApp(App);

app.use(i18n);
app.use(vuetify);
app.use(router);

app.mount("#app");
