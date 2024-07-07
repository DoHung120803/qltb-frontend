import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response;
};

export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response;
};

export const _delete = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response;
};

export const put = async (path, options = {}) => {
    const response = await httpRequest.put(path, options);
    return response;
};
