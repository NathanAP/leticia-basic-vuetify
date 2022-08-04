import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
// import { aliases, mdi } from "vuetify/iconsets/mdi";
import { aliases, fa } from "vuetify/iconsets/fa";

const vuetify = createVuetify({
    theme: "light",
    icons: {
        defaultSet: "fa",
        aliases,
        sets: {
            fa,
        },
    },
});

export default vuetify;
