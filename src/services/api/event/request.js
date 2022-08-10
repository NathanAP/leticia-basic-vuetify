import axios from "axios";

const PATH = "/ocorrencias";

async function getAllEvents(query) {
    try {
        let url;

        if (query && (query.startingDate || query.endingDate)) {
            url = `${PATH}/?`;
            if (query.startingDate) url += `date_start=${query.startingDate}&`;
            if (query.endingDate) url += `date_end=${query.endingDate}&`;
        } else url = `${PATH}-all/?`;

        if (url.endsWith("?") || url.endsWith("&")) url = url.replace(/.$/, "");

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.response) return error.response;
        throw new Error(error);
    }
}

export { getAllEvents };
