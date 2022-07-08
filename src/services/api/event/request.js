import axios from "axios";
import Client from "./model";

const PATH = "/ocorrencias";

async function getEvents() {
    try {
        let url = `${PATH}/?`;

        const response = await axios.get(url);
        return response;
    } catch (error) {
        if (error.response) return error.response;
        throw new Error(error);
    }
}

export { getEvents };
