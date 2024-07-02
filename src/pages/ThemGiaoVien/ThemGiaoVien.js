import classNames from "classnames/bind";
import styles from "./ThemGiaoVien.module.scss";
import { useState } from "react";
import * as createServices from "~/services/createServices";

const cx = classNames.bind(styles);

function ThemGiaoVien() {
    const requestDefault = {
        tenGV: "",
        gioiTinh: "",
        ngaySinh: new Date(),
        soDienThoai: "",
        diaChi: "",
        maToCM: "",
    };

    const [request, setRequest] = useState(requestDefault);

    const handleChange = (e, field) => {
        setRequest((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        const response = await createServices.createGiaoVien(request);

        if (response && response.status === 200) {
            alert("Thêm giáo viên thành công");
        } else {
            alert("Thêm giáo viên thất bại");
        }
        console.log(request);
    };

    return (
        <div className={cx("wrapper", "col-lg-9 col-sm-12")}>
            <h1 className={cx("title")}>Thêm Giáo Viên</h1>

            <div className="row">
                <span className="col-lg-5 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Tên giáo viên</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.tenGV}
                        onChange={(e) => handleChange(e, "tenGV")}
                    />
                </span>
                <span className="col-lg-5 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Giới tính</label>
                    <select
                        value={request.gioiTinh}
                        onChange={(e) => handleChange(e, "gioiTinh")}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </span>
                <span className="col-lg-5 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày sinh</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngaySinh}
                        onChange={(e) => handleChange(e, "ngaySinh")}
                    />
                </span>
                <span className="col-lg-5 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Số điện thoại</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.soDienThoai}
                        onChange={(e) => handleChange(e, "soDienThoai")}
                    />
                </span>
                <span className="col-lg-5 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Địa chỉ</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.diaChi}
                        onChange={(e) => handleChange(e, "diaChi")}
                    />
                </span>
                <span className="col-lg-5 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Tổ chuyên môn</label>
                    <select
                        value={request.maToCM}
                        onChange={(e) => handleChange(e, "maToCM")}
                    >
                        <option value="">Chọn tổ chuyển môn</option>
                        <option value="TCM00001">Toán Lý</option>
                        <option value="TCM00002">Văn Sử</option>
                        <option value="TCM00003">Tổng Hợp</option>
                    </select>
                </span>
            </div>
            <div className="row mt-5 gap-3 m-0">
                <div
                    className={cx(
                        "create-btn",
                        "col-2 d-flex align-items-center justify-content-center"
                    )}
                    onClick={handleSubmit}
                >
                    Thêm
                </div>

                <div
                    className={cx(
                        "cancel-btn",
                        "col-2 col-2 d-flex align-items-center justify-content-center"
                    )}
                    onClick={() => setRequest(requestDefault)}
                >
                    Hủy
                </div>
            </div>
        </div>
    );
}

export default ThemGiaoVien;
