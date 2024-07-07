import * as httpRequest from "../utils/httpRequest";

export const getGiaoVien = async (page, size) => {
    try {
        const response = await httpRequest.get(
            `/giao-vien/page?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDevices = async (page, size) => {
    try {
        const response = await httpRequest.get(
            `/dm-thiet-bi/page?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
