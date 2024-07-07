import * as httpRequest from "~/utils/httpRequest";

export const search = async (endpoint, name, page, size) => {
    try {
        const res = await httpRequest.get(endpoint, {
            params: {
                name,
                page,
                size,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
