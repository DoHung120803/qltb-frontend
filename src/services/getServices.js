import { param } from "jquery";
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

export const getAllGiaoVien = async () => {
    try {
        const response = await httpRequest.get(`/giao-vien`);
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

export const getAllDevices = async () => {
    try {
        const response = await httpRequest.get(`/dm-thiet-bi`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getInDSThietBi = async () => {
    try {
        const response = await httpRequest.get(
            `/dm-thiet-bi/get-in-ds-thiet-bi`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllThietBiCoTheGhiGiam = async () => {
    try {
        const response = await httpRequest.get(
            `/thiet-bi/get-all-co-the-ghi-giam`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllThietBiCoTheKBHM = async () => {
    try {
        const response = await httpRequest.get(`/thiet-bi/get-all-co-the-kbhm`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDSThietBi = async (page, size) => {
    try {
        const response = await httpRequest.get(
            `/thiet-bi/page?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getKhoPhongs = async (endpoint) => {
    try {
        const response = await httpRequest.get(endpoint);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDSTBByMaTBAndMaKP = async (maTB, maKP) => {
    try {
        const response = await httpRequest.get(
            `ds-thiet-bi/get-by-ma-tb-ma-kp?maTB=${maTB}&maKP=${maKP}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllDSThietBi = async () => {
    try {
        const response = await httpRequest.get(`/ds-thiet-bi`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTangTB = async (page, size) => {
    try {
        const response = await httpRequest.get(
            `/tang-tb/page?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getThanhLyTB = async (page, size) => {
    try {
        const response = await httpRequest.get(
            `/thanh-ly-tb/page?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTheoDoiHongMatPage = async (page, size) => {
    try {
        const response = await httpRequest.get(
            `/theo-doi-hong-mat/page?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const baoCaoThongKe = async (request) => {
    try {
        const response = await httpRequest.post(
            `/thiet-bi/bao-cao-thong-ke`,
            request
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
