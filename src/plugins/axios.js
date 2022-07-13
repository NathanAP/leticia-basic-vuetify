import axios from "axios";

// const localServer = "localhost";
// const localPort = "8000";
// axios.defaults.baseURL = `http://${localServer}:${localPort}`;

const publicServer =
    " https://da0c-2804-14c-b6-9015-e4ec-fa4f-8b9-ff26.sa.ngrok.io/v1";
axios.defaults.baseURL = `${publicServer}`;

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 30000;

export default axios;
