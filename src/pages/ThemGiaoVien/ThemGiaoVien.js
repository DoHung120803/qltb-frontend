import classNames from "classnames/bind";
import styles from "./ThemGiaoVien.module.scss";
import { useEffect, useState } from "react";
import * as createServices from "~/services/createServices";
import * as updateServices from "~/services/updateServices";
import { useNavigate } from "react-router-dom";
import config from "~/config";

const cx = classNames.bind(styles);

function ThemGiaoVien({ updateData = false, title, viewOnly = false }) {
    const requestDefault = {
        tenGV: "",
        gioiTinh: "",
        ngaySinh: new Date(),
        soDienThoai: "",
        diaChi: "",
        maToCM: "",
    };

    const navigator = useNavigate();

    useEffect(() => {
        if (updateData) {
            setRequest(updateData);
        }
    }, [updateData]);

    const [request, setRequest] = useState(requestDefault);

    const handleChange = (e, field) => {
        setRequest((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        let response = null;
        if (updateData) {
            response = await updateServices.updateGiaoVien(
                "giao-vien/update",
                updateData.maGV,
                request
            );

            if (response && response.status === 200) {
                alert("Cập nhật giáo viên thành công");
                navigator(config.routes.danh_muc_giao_vien);
            } else {
                alert("Cập nhật giáo viên thất bại");
            }
        } else {
            response = await createServices.createGiaoVien(request);

            if (response && response.status === 200) {
                alert("Thêm giáo viên thành công");
                navigator(config.routes.danh_muc_giao_vien);
            } else {
                alert("Thêm giáo viên thất bại (Hãy kiểm tra lại thông tin)");
            }
        }
    };

    return (
        <div className={cx("wrapper", "col-lg-9 col-sm-12")}>
            <h1 className={cx("title")}>{title || "Thêm Giáo Viên"}</h1>
            <div className="row">
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Tên giáo viên</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.tenGV}
                        onChange={(e) => handleChange(e, "tenGV")}
                        disabled={viewOnly}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Giới tính</label>
                    <select
                        value={request.gioiTinh}
                        onChange={(e) => handleChange(e, "gioiTinh")}
                        disabled={viewOnly}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày sinh</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngaySinh}
                        onChange={(e) => handleChange(e, "ngaySinh")}
                        disabled={viewOnly}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Số điện thoại</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.soDienThoai}
                        onChange={(e) => handleChange(e, "soDienThoai")}
                        disabled={viewOnly}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Địa chỉ</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.diaChi}
                        onChange={(e) => handleChange(e, "diaChi")}
                        disabled={viewOnly}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Tổ chuyên môn</label>
                    <select
                        value={request.maToCM}
                        onChange={(e) => handleChange(e, "maToCM")}
                        disabled={viewOnly}
                    >
                        <option value="">Chọn tổ chuyển môn</option>
                        <option value="TCM00001">Toán Lý</option>
                        <option value="TCM00002">Văn Sử</option>
                        <option value="TCM00003">Tổng Hợp</option>
                    </select>
                </span>
            </div>
            {!viewOnly && (
                <div className="row mt-5 gap-3 m-0">
                    <div
                        className={cx(
                            "create-btn",
                            "col-2 d-flex align-items-center justify-content-center"
                        )}
                        onClick={handleSubmit}
                    >
                        {updateData ? "Cập nhật" : "Thêm"}
                    </div>

                    <div
                        className={cx(
                            "cancel-btn",
                            "col-2 col-2 d-flex align-items-center justify-content-center"
                        )}
                        onClick={() => navigator(config.routes.danh_muc_giao_vien)}
                    >
                        Hủy
                    </div>
                </div>
            )}
        </div>
    );
}

export default ThemGiaoVien;
