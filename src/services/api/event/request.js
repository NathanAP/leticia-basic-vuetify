import axios from "axios";

const PATH = "/ocorrencias";

async function getEvents(query = {}) {
    try {
        let url = `${PATH}`;

        const allItems = { items: [] };

        let hasMorePages = true;
        let page = 1;

        while (hasMorePages) {
            const response = await axios.get(url);
            if (
                response.data &&
                response.data.items &&
                response.data.items.length > 0
            )
                allItems.items.push(...response.data.items);

            // hasMorePages = allItems.length >= response.total;
            hasMorePages = false;
            page++;
        }

        return allItems;
    } catch (error) {
        if (error.response) return error.response;
        throw new Error(error);
    }
}

export { getEvents };
