import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./XemPhieuTra.module.scss";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import config from "~/config";

const cx = classNames.bind(styles);

function XemPhieuTra() {
    const tableColumnsName = [
        "Mã cá biệt thiết bị",
        "Tên thiết bị",
        "Tình trạng khi mượn",
        "Tình trạng trả",
        "Ghi chú",
    ];

    const fields = [
        "maCaBietTB",
        "tenNTB",
        "tinhTrang",
        "tinhTrangTra",
        "ghiChu",
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const viewData = location.state?.viewData || {};

    const [phieuTra, setPhieuTra] = useState({});
    const [chiTietTraTBList, setChiTietTraTBList] = useState([]);

    useEffect(() => {
        const fetchPhieuTra = async () => {
            if (viewData.maPhieuTra) {
                const response = await getServices.getPhieuTraById(viewData.maPhieuTra); // Gọi hàm API với mã phiếu trả
                if (response) {
                    setPhieuTra(response);
                    setChiTietTraTBList(response.chiTietTraTBList || []);
                }
            }
        };

        fetchPhieuTra();
    }, [viewData.maPhieuTra]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={cx("wrapper", "col-lg-12 col-sm-12")}>
            <h1 className={cx("title")}>Xem phiếu trả thiết bị</h1>
            <div className="row">
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Mã phiếu trả</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={phieuTra.maPhieuTra || ""}
                        readOnly
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Tên giáo viên</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={phieuTra.tenGiaoVien || ""}
                        readOnly
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày mượn</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={formatDate(phieuTra.ngayMuon) || ""}
                        readOnly
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày trả</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={formatDate(phieuTra.ngayTra) || ""}
                        readOnly
                    />
                </span>
            </div>

            <div className="mt-5">Danh sách thiết bị trả</div>
            <table className={cx("table")}>
                <thead>
                <tr>
                    {tableColumnsName.map((colName, index) => (
                        <th key={index}>{colName}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {chiTietTraTBList.map((device, rowIndex) => (
                    <tr key={rowIndex}>
                        {fields.map((field, colIndex) => (
                            <td key={colIndex}>
                                <input
                                    type="text"
                                    value={device[field]}
                                    readOnly
                                />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="row mt-5 gap-3 m-0">
                <div
                    className={cx(
                        "cancel-btn",
                        "col-2 col-2 d-flex align-items-center justify-content-center"
                    )}
                    onClick={() => navigate(config.routes.lich_su_tra)}
                >
                    Quay lại
                </div>
            </div>

        </div>
    );
}

export default XemPhieuTra;
