import axios from "axios";

const PATH = "/ocorrencias";

async function getAllEvents(
    query = { dataInicio: "22/07/2021", dataFim: "25/07/2021" }
) {
    try {
        let url = `${PATH}-all`;
        url += `${url}/?datainicio="${query.dataInicio}"&datafim="${query.dataFim}"`;

        const allItems = { items: [] };

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.response) return error.response;
        throw new Error(error);
    }
}

export { getAllEvents };
