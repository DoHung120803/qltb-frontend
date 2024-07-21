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

export const createDSTB = async (request) => {
    try {
        const response = await httpRequest.post("/ds-thiet-bi/create", request);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createGiam = async (request) => {
    try {
        const response = await httpRequest.post("/giam-tb/create", request);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createTang = async (request) => {
    try {
        const response = await httpRequest.post("/tang-tb/create", request);
        return response;
    } catch (error) {
        console.log(error);
    }
};
