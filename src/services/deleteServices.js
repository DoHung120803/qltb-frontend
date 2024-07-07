import * as httpRequest from "../utils/httpRequest";

export const _delete = async (endpoint, id) => {
    try {
        const response = await httpRequest._delete(endpoint + "/" + id);
        return response;
    } catch (error) {
        console.log(error);
    }
};
