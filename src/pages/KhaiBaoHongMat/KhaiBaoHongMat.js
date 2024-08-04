import classNames from "classnames/bind";
import styles from "./KhaiBaoHongMat.module.scss";
import { useEffect, useState } from "react";
import * as createServices from "~/services/createServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as updateServices from "~/services/updateServices";
import config from "~/config";
import { getAllGiaoVien } from "~/services/getServices";

const cx = classNames.bind(styles);

function KhaiBaoHongMat({ updateData = false, title }) {
    const selectedDevices = useLocation().state?.selectedDevices || [];

    console.log(updateData);

    const requestDefault = {
        ngayBao: new Date().toISOString().split("T")[0],
        maGiaoVien: "",
        maCaBietTB: selectedDevices[0]?.maCaBietTB || "",
        isHong: true,
        isMat: false,
        lyDoHongMat: "",
    };

    const [viewData, setViewData] = useState(useLocation().state?.viewData);

    const [request, setRequest] = useState(
        useLocation().state?.request || viewData || updateData || requestDefault
    );

    useEffect(() => {
        if (updateData) {
            request.isHong = updateData.hong;
            request.isMat = updateData.mat;
        }
        if (viewData) {
            request.isHong = viewData.hong;
            request.isMat = viewData.mat;
        }
    }, []);

    // useEffect(() => {
    //     request.maCaBietTB = selectedDevices[0]?.maCaBietTB;
    // });

    const [giaoViens, setGiaoViens] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        console.log(updateData);
        if (updateData) {
            setRequest(updateData);
        }
    }, []);

    useEffect(() => {
        const getGVs = async () => {
            const response = await getAllGiaoVien();
            if (response) {
                setGiaoViens(response);
            }
        };
        getGVs();
    }, []);

    const handleChange = (e, field) => {
        if (viewData) {
            alert("Không thể chỉnh sửa thông tin ở đây");
            return;
        }

        if (field === "khoPhong") {
            alert("Không thể chỉnh sửa vì kho phòng cố định theo MCB");
            return;
        }

        if (field === "isHong") {
            if (updateData) {
                alert("Không thể chỉnh sửa thông tin này");
                return;
            }
            setRequest((prev) => ({
                ...prev,
                isHong: e.target.checked,
                isMat: !e.target.checked,
            }));
        } else if (field === "isMat") {
            if (updateData) {
                alert("Không thể chỉnh sửa thông tin này");
                return;
            }
            setRequest((prev) => ({
                ...prev,
                isMat: e.target.checked,
                isHong: !e.target.checked,
            }));
        } else {
            setRequest((prev) => ({ ...prev, [field]: e.target.value }));
        }
    };

    console.log(request);

    const handleSubmit = async () => {
        let response = null;
        // if (request.slToiThieu <= 0) {
        //     alert("Số lượng tối thiểu phải lớn hơn 0");
        //     return;
        // }
        if (updateData) {
            if (request.maGiaoVien === "") {
                alert("Chưa chọn giáo viên");
                return;
            }

            const updateRequest = {
                ngayBao: request.ngayBao,
                maGiaoVien: request.maGiaoVien,
                lyDoHongMat: request.lyDoHongMat,
            };

            response = await updateServices.updatePhieuBaoHongMat(
                updateData.maPhieuBao,
                updateRequest
            );

            if (response && response.status === 200) {
                alert("Cập nhật phiếu báo thành công");
                navigator(config.routes.theo_doi_hong_mat);
            } else {
                alert("Cập nhật phiếu báo thất bại");
            }
        } else {
            if (request.maCaBietTB === "") {
                alert("Chưa chọn thiết bị");
                return;
            }

            if (request.maGiaoVien === "") {
                alert("Chưa chọn giáo viên");
                return;
            }

            response = await createServices.createKhaiBaoHongMat(request);

            if (response && response.status === 200) {
                alert("Thêm phiếu báo hỏng/mất thành công");
                navigator(config.routes.theo_doi_hong_mat);
            } else {
                alert(
                    "Thêm phiếu báo thất bại (Hãy kiểm tra lại và điền đầy đủ thông tin)"
                );
            }
        }
    };

    console.log(request);

    return (
        <div className={cx("wrapper", "col-lg-9 col-sm-12")}>
            {!!viewData || (
                <h1 className={cx("title")}>
                    {title || "Thêm phiếu báo hỏng/mất"}
                </h1>
            )}

            <div className="row">
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày báo</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngayBao}
                        onChange={(e) => handleChange(e, "ngayBao")}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Người báo</label>
                    <select
                        value={request.maGiaoVien}
                        onChange={(e) => handleChange(e, "maGiaoVien")}
                    >
                        <option value="">Chọn giáo viên</option>
                        {giaoViens.map((gv, index) => (
                            <option key={index} value={gv.maGV}>
                                {gv.maGV} - {gv.tenGV}
                            </option>
                        ))}
                    </select>
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Mã cá biệt TB</label>
                    {viewData || updateData ? (
                        <input
                            style={{ cursor: "pointer" }}
                            className={cx("input", "col-12")}
                            type="text"
                            value={request.maCaBietTB}
                            placeholder="Chọn thiết bị cá biệt"
                            // onChange={(e) => handleChange(e, "maCaBietTB")}
                        />
                    ) : (
                        <Link
                            to={config.routes.chon_thiet_bi_khai_bao}
                            state={{
                                from: config.routes.khai_bao_hong_mat,
                                array: selectedDevices,
                                request,
                            }}
                        >
                            <input
                                style={{ cursor: "pointer" }}
                                className={cx("input", "col-12")}
                                type="text"
                                value={request.maCaBietTB}
                                placeholder="Chọn thiết bị cá biệt"
                                // onChange={(e) => handleChange(e, "maCaBietTB")}
                            />
                        </Link>
                    )}
                    {/* <select
                        value={request.maCaBietTB}
                        onChange={(e) => handleChange(e, "maCaBietTB")}
                    >
                        <option value="">Chọn loại thiết bị</option>
                        <option value="LTB00001">Bản đồ</option>
                        <option value="LTB00002">Băng đĩa</option>
                        <option value="LTB00003">Đồ chơi</option>
                        <option value="LTB00004">Dụng cụ</option>
                        <option value="LTB00005">Hóa chất</option>
                        <option value="LTB00006">Lược đồ</option>
                    </select> */}
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Kho phòng</label>

                    <input
                        style={{ cursor: "pointer" }}
                        className={cx("input", "col-12")}
                        type="text"
                        value={
                            updateData?.khoPhong ||
                            viewData?.khoPhong ||
                            selectedDevices[0]?.khoPhong
                        }
                        onChange={(e) => handleChange(e, "khoPhong")}
                    />
                </span>

                <span className="col-lg-6 col-md-12 mt-5 d-flex flex-column">
                    <label className="">Lý do</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.lyDoHongMat}
                        onChange={(e) => handleChange(e, "lyDoHongMat")}
                    />
                </span>

                <span
                    className={cx(
                        "check-box",
                        "col-lg-3 col-md-5 mt-5 me-auto"
                    )}
                >
                    <input
                        className={cx("input")}
                        name="radio"
                        type="radio"
                        // value={request.isMat}
                        checked={request.isMat}
                        onChange={(e) => handleChange(e, "isMat")}
                    />
                    <label className="">Mất</label>
                </span>
                <span
                    className={cx(
                        "check-box",
                        "col-lg-3 col-md-5 mt-5 me-auto"
                    )}
                >
                    <input
                        className={cx("input")}
                        name="radio"
                        type="radio"
                        // value={request.isHong}
                        checked={request.isHong}
                        onChange={(e) => handleChange(e, "isHong")}
                    />
                    <label className="">Hỏng</label>
                </span>
            </div>
            <div className="row mt-5 gap-3 m-0">
                {!!viewData || (
                    <div
                        className={cx(
                            "create-btn",
                            "col-2 d-flex align-items-center justify-content-center"
                        )}
                        onClick={handleSubmit}
                    >
                        {updateData ? "Cập nhật" : "Thêm"}
                    </div>
                )}

                <div
                    className={cx(
                        "cancel-btn",
                        "col-2 col-2 d-flex align-items-center justify-content-center"
                    )}
                    onClick={() => navigator(config.routes.theo_doi_hong_mat)}
                >
                    Hủy
                </div>
            </div>
        </div>
    );
}

export default KhaiBaoHongMat;
