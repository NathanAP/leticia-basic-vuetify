import axios from "axios";

// DESCOMENTAR QUANDO USAR EM API LOCAL
const localServer = "localhost";
const localPort = "8000";
axios.defaults.baseURL = `http://${localServer}:${localPort}`;

// DESCOMENTAR QUANDO USAR EM API PUBLICA
// const publicServer =
//     "https://47f7-2804-14c-b6-9015-15c5-22d6-e26c-ea.sa.ngrok.io/v1";
// axios.defaults.baseURL = `${publicServer}`;

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 30000;

export default axios;
