import classNames from "classnames/bind";
import styles from "./ThemPhieuMuon.module.scss";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import * as createServices from "~/services/createServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import config from "~/config";
import QLTBTable from "~/components/QLTBTable";
import { updatePhieuMuon } from "~/services/updateServices";

const cx = classNames.bind(styles);

function ThemPhieuMuon({ updateDataMuon = false }) {
    const tableColumnsName = [
        "Mã cá biệt TB",
        "Tên thiết bị",
        "Kho/Phòng",
        "Tình trạng khi mượn",
        "",
    ];

    const fields = [
        "maCaBietTB",
        "tenThietBi",
        "maKP",
        "tinhTrangKhiMuon",
    ];

    const requestDefault = {
        ngayMuon: new Date().toISOString().split("T")[0],
        ngayHenTra: "",
        maGV: "",
        mucDich: "",
        chiTietMuonTBList: [],
    };

    const navigator = useNavigate();

    const location = useLocation();  // Sử dụng useLocation để lấy dữ liệu
    const [viewData, setViewData] = useState(location.state?.viewData);
    const [giaoViens, setGiaoViens] = useState([]);
    const [request, setRequest] = useState(
        location.state?.request ||
        viewData ||
        updateDataMuon ||
        requestDefault
    );
    const [devices, setDevices] = useState([]);
    const [reload, setReload] = useState(false);
    const [merged, setMerged] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState(
        location.state?.selectedDevices ||
        viewData?.chiTietMuonTBList ||
        updateDataMuon?.chiTietMuonTBList ||
        []
    );

    useEffect(() => {
        const getGVs = async () => {
            const response = await getServices.getAllGiaoVien();
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
        setRequest((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleReload = () => {
        setReload(!reload);
    };

    function createMuonArray() {
        const muonDevices = selectedDevices.filter((device) => !!device.maCaBietTB);

        setSelectedDevices(muonDevices);
        request.chiTietMuonTBList = muonDevices;

        setMerged(true);
    }

    const handleUpdate = async () => {
        const maPhieuMuon = request.maPhieuMuon;

        const updateRequest = {
            ngayMuon: request.ngayMuon,
            ngayHenTra: request.ngayHenTra,
            maGV: request.maGV,
            mucDich: request.mucDich,
        };

        const response = await updatePhieuMuon(maPhieuMuon, updateRequest);

        if (response?.status !== 200) {
            alert("Cập nhật thất bại");
            return;
        }

        alert("Cập nhật thành công");
        navigator(config.routes.muon_tra_thiet_bi);
    };

    const handleSubmit = async () => {
        if (request.chiTietMuonTBList.length === 0) {
            alert("Chưa có thiết bị nào được chọn");
            return;
        }

        const response = await createServices.createMuon(request);

        if (response && response.status === 200) {
            alert("Ghi nhận mượn thiết bị thành công");
            navigator(config.routes.muon_tra_thiet_bi);
        } else {
            alert("Ghi nhận mượn thiết bị thất bại (Hãy kiểm tra lại thông tin)");
        }
    };

    return (
        <div className={cx("wrapper", "col-lg-12 col-sm-12")}>
            <h1 className={cx("title")}>
                {viewData ? "Xem phiếu mượn thiết bị" : (updateDataMuon ? "Sửa phiếu mượn thiết bị" : "Thêm phiếu mượn thiết bị")}
            </h1>
            <div className="row">
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày mượn</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngayMuon}
                        onChange={(e) => handleChange(e, "ngayMuon")}
                        disabled={!!viewData}  // Disable input nếu đang xem view
                    />
                </span>
                <span className="col-lg-6 col-md-12 mt-5 d-flex flex-column">
                    <label className="">Ngày hẹn trả</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngayHenTra}
                        onChange={(e) => handleChange(e, "ngayHenTra")}
                        disabled={!!viewData}  // Disable input nếu đang xem view
                    />
                </span>
                <span className="col-lg-6 col-md-12 mt-5 d-flex flex-column">
                    <label className="">Giáo viên mượn</label>
                    <select
                        value={request.maGV}
                        onChange={(e) => handleChange(e, "maGV")}
                        disabled={!!viewData}  // Disable select nếu đang xem view
                    >
                        <option value="">Chọn giáo viên</option>
                        {giaoViens.map((gv, index) => (
                            <option key={index} value={gv.maGV}>
                                {gv.maGV} - {gv.tenGV}
                            </option>
                        ))}
                    </select>
                </span>
                <span className="col-lg-6 col-md-12 mt-5 d-flex flex-column">
                    <label className="">Mục đích mượn</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.mucDich}
                        onChange={(e) => handleChange(e, "mucDich")}
                        disabled={!!viewData}  // Disable input nếu đang xem view
                    />
                </span>
            </div>
            {updateDataMuon || viewData ? (
                false
            ) : (
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
            )}
            <div className="mt-5">Danh sách thiết bị</div>
            <QLTBTable
                tableColumnsName={tableColumnsName}
                fields={fields}
                dataTable={selectedDevices}
                devices={devices}
                handleReload={handleReload}
                setMerged={setMerged}
                updateDataMuon={updateDataMuon}
                view={!!viewData}  // Truyền view để kiểm soát giao diện hiển thị
            ></QLTBTable>
            <div className="row mt-5 gap-3 m-0">
                {viewData ? (
                    false
                ) : (
                    <div
                        className={cx(
                            "create-btn",
                            "col-2 d-flex align-items-center justify-content-center"
                        )}
                    >
                        {updateDataMuon ? (
                            <div>
                                <span onClick={handleUpdate}>Cập nhật</span>
                            </div>
                        ) : (
                            <div>
                                {!merged ? (
                                    <span onClick={createMuonArray}>Gộp</span>
                                ) : (
                                    <span onClick={handleSubmit}>Thêm</span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div
                    className={cx(
                        "cancel-btn",
                        "col-2 col-2 d-flex align-items-center justify-content-center"
                    )}
                    onClick={() => navigator(config.routes.muon_tra_thiet_bi)}
                >
                    Hủy
                </div>
            </div>
        </div>
    );
}

export default ThemPhieuMuon;
