import * as httpRequest from '../utils/httpRequest';

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
