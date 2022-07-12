import axios from "axios";

// const localServer = "localhost";
// const localPort = "8000";

const publicServer =
    "https://0581-2804-14c-b6-9015-952e-1dc-bb18-2525.sa.ngrok.io";

// axios.defaults.baseURL = `http://${localServer}:${localPort}`;
axios.defaults.baseURL = `${publicServer}`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 30000;

export default axios;
