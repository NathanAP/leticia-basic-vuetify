import axios from "axios";

const PATH = "/ocorrencias";

async function getAllEvents(query) {
    try {
        let url = `${PATH}-all/?`;

        if (query) {
            if (query.startingDate) url += `date_start=${query.startingDate}&`;
            if (query.endingDate) url += `date_end=${query.endingDate}&`;
        }

        if (url.endsWith("?") || url.endsWith("&")) url = url.replace(/.$/, "");

        console.log(url);

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.response) return error.response;
        throw new Error(error);
    }
}

export { getAllEvents };
