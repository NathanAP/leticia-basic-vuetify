import axios from "axios";

const localServer = "localhost";
const localPort = "8000";

// const publicServer =
//     "https://9c0f-2804-14c-b6-9015-882a-79db-957e-b5c4.sa.ngrok.io/v1";

axios.defaults.baseURL = `http://${localServer}:${localPort}`;
// axios.defaults.baseURL = `${publicServer}`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 30000;

export default axios;
