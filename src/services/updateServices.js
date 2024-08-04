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

export const huyThanhLyTB = async (id) => {
    try {
        const response = await httpRequest.patch(
            "thanh-ly-tb/huy-thanh-ly-tb/" + id
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updatePhieuThanhLy = async (id, request) => {
    try {
        const response = await httpRequest.patch("thanh-ly-tb/" + id, request);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const suaChuaTB = async (maPhieuBao, maCaBietTB) => {
    try {
        const response = await httpRequest.patch(
            `thiet-bi/sua-chua?maPhieuBao=${maPhieuBao}&maCaBietTB=${maCaBietTB}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const timThayTB = async (maPhieuBao, maCaBietTB) => {
    try {
        const response = await httpRequest.patch(
            `thiet-bi/tim-thay?maPhieuBao=${maPhieuBao}&maCaBietTB=${maCaBietTB}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updatePhieuBaoHongMat = async (maPhieuBao, request) => {
    try {
        const response = await httpRequest.patch(
            `theo-doi-hong-mat/update/${maPhieuBao}`,
            request
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateMuonTB = async (maPhieuMuon, updateData) => {
    try {
        const response = await httpRequest.put(
            "/muon-tb/update-status/" + maPhieuMuon,
            updateData
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
