import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ThemPhieuTra.module.scss";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import * as createServices from "~/services/createServices";
import config from "~/config";

const cx = classNames.bind(styles);

function ThemPhieuTra() {
    const tableColumnsName = [
        "Mã cá biệt thiết bị",
        "Tên thiết bị",
        "Tình trạng khi mượn",
        "Tình trạng trả",
        "Ghi chú",
    ];

    const fields = [
        "maCaBietTB",
        "tenThietBi",
        "tinhTrangKhiMuon",
        "tinhTrangTra",
        "ghiChu",
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const viewData = location.state?.viewData || {};

    const [request, setRequest] = useState({
        ngayTra: new Date().toISOString().split("T")[0],
        nguoiTra: "",
        maPhieuMuon: viewData.maPhieuMuon || "",
        ngayMuon: viewData.ngayMuon || "",
        ngayHenTra: viewData.ngayHenTra || "",
        chiTietTraTBList: viewData.chiTietTraTBList || [],
    });

    const [giaoViens, setGiaoViens] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState([]);

    useEffect(() => {
        const getGVs = async () => {
            const response = await getServices.getAllGiaoVien();
            if (response) {
                setGiaoViens(response);
            }
        };
        getGVs();

        // Set tình trạng trả mặc định là "Đã tiêu hao" cho thiết bị tiêu hao
        const devicesWithTinhTrangTra = viewData.chiTietTraTBList.map((device) => {
            if (device.thietBiTieuHao) {
                return { ...device, tinhTrangTra: "Đã tiêu hao" };
            }
            return device;
        });
        setSelectedDevices(devicesWithTinhTrangTra);
    }, [viewData.chiTietTraTBList]);

    const handleChange = (e, field) => {
        setRequest((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleDeviceChange = (e, index, field) => {
        const updatedDevices = [...selectedDevices];
        updatedDevices[index][field] = e.target.value;
        setSelectedDevices(updatedDevices);
    };

    const handleSubmit = async () => {
        if (!request.ngayTra) {
            alert("Chưa chọn ngày trả");
            return;
        }
        if (selectedDevices.length === 0) {
            alert("Chưa có thiết bị nào được chọn");
            return;
        }

        const requestPayload = {
            ...request,
            chiTietTraTBList: selectedDevices,
        };

        try {
            const response = await createServices.createTra(requestPayload);

            if (response && response.status === 200) {
                alert("Thêm phiếu trả thành công");
                navigate(config.routes.muon_tra_thiet_bi);
            } else {
                alert("Thêm phiếu trả thất bại (Hãy kiểm tra lại thông tin)");
            }
        } catch (error) {
            console.error("Error creating return record:", error);
            alert("Đã xảy ra lỗi khi thêm phiếu trả. Vui lòng thử lại.");
        }
    };

    return (
        <div className={cx("wrapper", "col-lg-12 col-sm-12")}>
            <h1 className={cx("title")}>Thêm phiếu trả thiết bị</h1>
            <div className="row">
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày mượn</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngayMuon}
                        readOnly
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày hẹn trả</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngayHenTra}
                        readOnly
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày trả</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngayTra}
                        onChange={(e) => handleChange(e, "ngayTra")}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Người trả</label>
                    <select
                        value={request.nguoiTra}
                        onChange={(e) => handleChange(e, "nguoiTra")}
                    >
                        <option value="">Chọn người trả</option>
                        {giaoViens.map((gv, index) => (
                            <option key={index} value={gv.maGV}>
                                {gv.maGV} - {gv.tenGV}
                            </option>
                        ))}
                    </select>
                </span>
            </div>

            <div className="mt-5">Danh sách thiết bị</div>
            <table className={cx("table")}>
                <thead>
                <tr>
                    {tableColumnsName.map((colName, index) => (
                        <th key={index}>{colName}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {selectedDevices.map((device, rowIndex) => (
                    <tr key={rowIndex}>
                        {fields.map((field, colIndex) => {
                            if (field === "tinhTrangTra") {
                                return (
                                    <td key={colIndex}>
                                        <select
                                            value={device[field]}
                                            onChange={(e) =>
                                                handleDeviceChange(
                                                    e,
                                                    rowIndex,
                                                    field
                                                )
                                            }
                                            disabled={device.thietBiTieuHao} // Disable dropdown nếu thiết bị là thietBiTieuHao
                                        >
                                            <option value="Dùng được">
                                                Dùng được
                                            </option>
                                            <option value="Hỏng">
                                                Hỏng
                                            </option>
                                            <option value="Đã tiêu hao">
                                                Đã tiêu hao
                                            </option>
                                        </select>
                                    </td>
                                );
                            }
                            return (
                                <td key={colIndex}>
                                    <input
                                        type="text"
                                        value={device[field]}
                                        onChange={(e) =>
                                            handleDeviceChange(
                                                e,
                                                rowIndex,
                                                field
                                            )
                                        }
                                        readOnly={field !== "ghiChu"}  // Disable input nếu không phải ghi chú
                                    />
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="row mt-5 gap-3 m-0">
                {/* Nút Thêm xuất hiện khi tạo mới phiếu trả */}
                <div
                    className={cx(
                        "create-btn",
                        "col-2 d-flex align-items-center justify-content-center"
                    )}
                >
                    <div onClick={handleSubmit}>
                        <span>Thêm</span>
                    </div>
                </div>

                {/* Nút Quay lại */}
                <div
                    className={cx(
                        "cancel-btn",
                        "col-2 col-2 d-flex align-items-center justify-content-center"
                    )}
                    onClick={() => navigate(config.routes.muon_tra_thiet_bi)}
                >
                    Hủy
                </div>
            </div>

        </div>
    );
}

export default ThemPhieuTra;
