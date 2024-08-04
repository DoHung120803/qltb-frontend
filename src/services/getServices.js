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

export const getAllThietBiChuaThanhLy = async () => {
    try {
        const response = await httpRequest.get(`/thiet-bi`);
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

export const getMuonTB = async (page, size) => {
    try {
        const response = await httpRequest.get(
            `/muon-tb/page?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getLichSuTra = async (page, size) => {
    try {
        const response = await httpRequest.get(
            `/tra-tb/page?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllThietBiCoTheMuon = async (page, size) => {
    try {
        const response = await httpRequest.get(
            `thiet-bi/tinh-trang-hien-hoat-dong`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDashboardData = async () => {
    try {
        const response = await httpRequest.get(`/thiet-bi/dashboard-data`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getMonthlyBorrowedDevices = async () => {
    try {
        const response = await httpRequest.get(`/muon-tb/monthly-borrowed`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

