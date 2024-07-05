import * as httpRequest from "../utils/httpRequest";

export const createGiaoVien = async (request) => {
    try {
        const response = await httpRequest.post("/giao-vien/create", request);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createThietBi = async (request) => {
    try {
        const response = await httpRequest.post("/dm-thiet-bi/create", request);
        return response;
    } catch (error) {
        console.log(error);
    }
};
