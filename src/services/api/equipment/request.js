import axios from "axios";
import Client from "./model";

const PATH = "/equipamentos";

async function getAllEquipments() {
    try {
        let url = `${PATH}-all`;

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.response) return error.response;
        throw new Error(error);
    }
}

export { getAllEquipments };
