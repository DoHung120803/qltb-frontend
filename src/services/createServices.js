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

export const createTB = async (request) => {
    try {
        const response = await httpRequest.post("/thiet-bi/create", request);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createGiam = async (request) => {
    try {
        const response = await httpRequest.post("/thanh-ly-tb/create", request);
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

export const createKhaiBaoHongMat = async (request) => {
    try {
        const response = await httpRequest.post(
            "/theo-doi-hong-mat/create",
            request
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createMuon = async (request) => {
    try {
        const response = await httpRequest.post("/muon-tb/create", request);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createTra = async (request) => {
    try {
        const response = await httpRequest.post("/tra-tb/create", request);
        return response;
    } catch (error) {
        console.log(error);
    }
};

