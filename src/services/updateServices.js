import * as httpRequest from "../utils/httpRequest";

export const updateGiaoVien = async (endpoint, id, request) => {
    try {
        const response = await httpRequest.put(endpoint + "/" + id, request);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateThietBi = async (endpoint, id, request) => {
    try {
        const response = await httpRequest.put(endpoint + "/" + id, request);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const changeActivating = async (maCaBietTB) => {
    try {
        const response = await httpRequest.patch("thiet-bi" + "/" + maCaBietTB);
        return response;
    } catch (error) {
        console.log(error);
    }
};
