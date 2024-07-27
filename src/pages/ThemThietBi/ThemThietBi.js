import classNames from "classnames/bind";
import styles from "./ThemThietBi.module.scss";
import { useEffect, useState } from "react";
import * as createServices from "~/services/createServices";
import { useNavigate } from "react-router-dom";
import * as updateServices from "~/services/updateServices";
import config from "~/config";

const cx = classNames.bind(styles);

function ThemThietBi({ updateData = false, title }) {
    const requestDefault = {
        tenNTB: "",
        maDVT: "",
        maMonHoc: "",
        maLoaiTB: "",
        slToiThieu: 0,
        tbTuLam: false,
        tbTieuHao: false,
        moTa: "",
    };

    const [request, setRequest] = useState(requestDefault);

    const navigator = useNavigate();

    useEffect(() => {
        console.log(updateData);
        if (updateData) {
            setRequest(updateData);
        }
    }, []);

    const handleChange = (e, field) => {
        if (field === "tbTuLam") {
            setRequest((prev) => ({
                ...prev,
                tbTuLam: e.target.checked,
                tbTieuHao: !e.target.checked,
            }));
        } else if (field === "tbTieuHao") {
            setRequest((prev) => ({
                ...prev,
                tbTieuHao: e.target.checked,
                tbTuLam: !e.target.checked,
            }));
        } else {
            setRequest((prev) => ({ ...prev, [field]: e.target.value }));
        }
    };

    const handleSubmit = async () => {
        let response = null;
        // if (request.slToiThieu <= 0) {
        //     alert("Số lượng tối thiểu phải lớn hơn 0");
        //     return;
        // }
        if (updateData) {
            response = await updateServices.updateThietBi(
                "dm-thiet-bi/update",
                updateData.maNTB,
                request
            );

            if (response && response.status === 200) {
                alert("Cập nhật thiết bị thành công");
                navigator(config.routes.danh_muc_thiet_bi);
            } else {
                alert("Cập nhật thiết bị thất bại");
            }
        } else {
            response = await createServices.createThietBi(request);

            if (response && response.status === 200) {
                alert("Thêm thiết bị thành công");
                navigator(config.routes.danh_muc_thiet_bi);
            } else {
                alert(
                    "Thêm thiết bị thất bại (Hãy kiểm tra lại và điền đầy đủ thông tin)"
                );
            }
        }
    };

    return (
        <div className={cx("wrapper", "col-lg-9 col-sm-12")}>
            <h1 className={cx("title")}>{title || "Thêm Thiết Bị"}</h1>

            <div className="row">
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Tên thiết bị</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.tenNTB}
                        onChange={(e) => handleChange(e, "tenNTB")}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Đơn vị tính</label>
                    <select
                        value={request.maDVT}
                        onChange={(e) => handleChange(e, "maDVT")}
                    >
                        <option value="">Chọn đơn vị tính</option>
                        <option value="DVT00001">Bộ</option>
                        <option value="DVT00002">Hộp</option>
                        <option value="DVT00003">Cái</option>
                        <option value="DVT00004">Lọ</option>
                        <option value="DVT00005">Túi</option>
                    </select>
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Loại thiết bị</label>
                    <select
                        value={request.maLoaiTB}
                        onChange={(e) => handleChange(e, "maLoaiTB")}
                    >
                        <option value="">Chọn loại thiết bị</option>
                        <option value="LTB00001">Bản đồ</option>
                        <option value="LTB00002">Băng đĩa</option>
                        <option value="LTB00003">Đồ chơi</option>
                        <option value="LTB00004">Dụng cụ</option>
                        <option value="LTB00005">Hóa chất</option>
                        <option value="LTB00006">Lược đồ</option>
                    </select>
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Môn học</label>
                    <select
                        value={request.maMonHoc}
                        onChange={(e) => handleChange(e, "maMonHoc")}
                    >
                        <option value="">Chọn môn học</option>
                        <option value="MH00001">Toán</option>
                        <option value="MH00002">Lý</option>
                        <option value="MH00003">Hóa</option>
                        <option value="MH00004">Sinh</option>
                        <option value="MH00005">Sử</option>
                        <option value="MH00006">Địa</option>
                        <option value="MH00007">Tin</option>
                    </select>
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Số lượng tối thiểu</label>
                    <input
                        className={cx("input")}
                        // placeholder="Nhập số lượng tối thiểu > 0"
                        type="number"
                        min={1}
                        value={request.slToiThieu}
                        onChange={(e) => handleChange(e, "slToiThieu")}
                    />
                </span>
                <span
                    className={cx(
                        "check-box",
                        "col-lg-3 col-md-5 mt-5 justify-content-center"
                    )}
                >
                    <label className="">Là thiết bị tiêu hao</label>
                    <input
                        className={cx("input")}
                        name="radio"
                        type="radio"
                        // value={request.tbTieuHao}
                        checked={request.tbTieuHao}
                        onChange={(e) => handleChange(e, "tbTieuHao")}
                    />
                </span>
                <span
                    className={cx(
                        "check-box",
                        "col-lg-3 col-md-5 mt-5 justify-content-center"
                    )}
                >
                    <label className="">Là thiết bị tự làm</label>
                    <input
                        className={cx("input")}
                        name="radio"
                        type="radio"
                        // value={request.tbTuLam}
                        checked={request.tbTuLam}
                        onChange={(e) => handleChange(e, "tbTuLam")}
                    />
                </span>
                <span className="col-lg-12 col-md-12 mt-5 d-flex flex-column">
                    <label className="">Mô tả chi tiết</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.moTa}
                        onChange={(e) => handleChange(e, "moTa")}
                    />
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
                    {updateData ? "Cập nhật" : "Thêm"}
                </div>

                <div
                    className={cx(
                        "cancel-btn",
                        "col-2 col-2 d-flex align-items-center justify-content-center"
                    )}
                    onClick={() => navigator(config.routes.danh_muc_thiet_bi)}
                >
                    Hủy
                </div>
            </div>
        </div>
    );
}

export default ThemThietBi;
