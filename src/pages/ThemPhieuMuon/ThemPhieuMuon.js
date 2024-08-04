import classNames from "classnames/bind";
import styles from "./ThemPhieuMuon.module.scss";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import * as createServices from "~/services/createServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import config from "~/config";
import QLTBTable from "~/components/QLTBTable";
import { getAllGiaoVien } from "~/services/getServices";

const cx = classNames.bind(styles);

function ThemPhieuMuon({ updateData = false, title }) {
    const tableColumnsName = [
        "Mã cá biệt TB",
        "Tên thiết bị",
        "Kho/Phòng",
        "Tình trạng khi mượn",
    ];

    const fields = [
        "maCaBietTB",
        "tenNTB",
        "khoPhong",
        "tinhTrang",
    ];

    // Lấy ngày hôm nay
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const requestDefault = {
        ngayMuon: getTodayDate(),
        ngayHenTra: "",
        maGV: "",
        mucDich: "",
        chiTietMuonTBList: [],
    };

    const navigate = useNavigate();
    const [giaoViens, setGiaoViens] = useState([]);
    useEffect(() => {
        const getGVs = async () => {
            const response = await getAllGiaoVien();
            if (response) {
                setGiaoViens(response);
            }
        };
        getGVs();
    }, []);

    const [request, setRequest] = useState(
        useLocation().state?.request || requestDefault
    );
    const [devices, setDevices] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState(
        useLocation().state?.selectedDevices || []
    );

    useEffect(() => {
        if (!request.ngayHenTra) {
            const ngayMuonDate = new Date(request.ngayMuon);
            ngayMuonDate.setDate(ngayMuonDate.getDate() + 7); // Add 7 days
            const defaultNgayHenTra = ngayMuonDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
            setRequest((prev) => ({ ...prev, ngayHenTra: defaultNgayHenTra }));
        }
    }, [request.ngayMuon]);

    const handleChange = (e, field) => {
        setRequest((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleAddRow = () => {
        setSelectedDevices([...selectedDevices, {}]);
    };

    const handleSubmit = async () => {
        let finalNgayHenTra = request.ngayHenTra;
        if (!request.ngayHenTra) {
            const ngayMuonDate = new Date(request.ngayMuon);
            ngayMuonDate.setDate(ngayMuonDate.getDate() + 7); // Add 7 days
            finalNgayHenTra = ngayMuonDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
        }

        if (selectedDevices.length === 0) {
            alert("Chưa có thiết bị nào được chọn");
            return;
        }

        const requestPayload = {
            ...request,
            ngayHenTra: finalNgayHenTra,
            chiTietMuonTBList: selectedDevices.map(device => ({
                maCaBietTB: device.maCaBietTB,
                tinhTrangKhiMuon: device.tinhTrang,
            })),
        };

        try {
            const response = await createServices.createMuon(requestPayload);

            if (response && response.status === 200) {
                alert("Thêm phiếu mượn thành công");
                navigate(config.routes.muon_tra_thiet_bi);
            } else {
                alert("Thêm phiếu mượn thất bại (Hãy kiểm tra lại thông tin)");
            }
        } catch (error) {
            console.error("Error creating loan record:", error);
            alert("Đã xảy ra lỗi khi thêm phiếu mượn. Vui lòng thử lại.");
        }
    };

    return (
        <div className={cx("wrapper", "col-lg-12 col-sm-12")}>
            <h1 className={cx("title")}>{"Thêm phiếu mượn thiết bị"}</h1>
            <div className="row">
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày mượn</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngayMuon}
                        onChange={(e) => handleChange(e, "ngayMuon")}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày hẹn trả</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngayHenTra}
                        onChange={(e) => handleChange(e, "ngayHenTra")}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Người mượn</label>
                    <select
                        value={request.maGV}
                        onChange={(e) => handleChange(e, "maGV")}
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
                    <label className="">Mục đích mượn</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.mucDich}
                        onChange={(e) => handleChange(e, "mucDich")}
                    />
                </span>
            </div>
            <Link
                to={config.routes.chon_thiet_bi_khai_bao}
                state={{
                    array: selectedDevices,
                    from: config.routes.them_phieu_muon,
                    request,
                }}
            >
                <button className={cx("add-btn")}>Thêm thiết bị +</button>
            </Link>

            <div className="mt-5">Danh sách thiết bị</div>
            <QLTBTable
                tableColumnsName={tableColumnsName}
                fields={fields}
                dataTable={selectedDevices}
                devices={devices}
            ></QLTBTable>
            <div className="row mt-5 gap-3 m-0">
                <div
                    className={cx(
                        "create-btn",
                        "col-2 d-flex align-items-center justify-content-center"
                    )}
                    onClick={handleSubmit}
                >
                    <span>Thêm</span>
                </div>
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

export default ThemPhieuMuon;
