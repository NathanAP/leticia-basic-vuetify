import axios from "axios";

// DESCOMENTAR QUANDO USAR EM API LOCAL
const localServer = "localhost";
const localPort = "8000";
axios.defaults.baseURL = `http://${localServer}:${localPort}`;

// DESCOMENTAR QUANDO USAR EM API PUBLICA
// const publicServer =
//     "https://b23f-2804-14c-b6-9015-dcc9-f4ee-6135-bcdf.sa.ngrok.io/v1";
// axios.defaults.baseURL = `${publicServer}`;

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 30000;

export default axios;
