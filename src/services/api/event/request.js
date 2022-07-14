import axios from "axios";

const PATH = "/ocorrencias";

async function getAllEvents(query = {}) {
    try {
        let url = `${PATH}-all`;

        const allItems = { items: [] };

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.response) return error.response;
        throw new Error(error);
    }
}

export { getAllEvents };
