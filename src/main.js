import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

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

app.use(vuetify);

app.mount("#app");
