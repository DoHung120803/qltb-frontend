import classNames from "classnames/bind";
import styles from "./GhiTang.module.scss";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import * as createServices from "~/services/createServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import config from "~/config";
import QLTBTable from "~/components/QLTBTable";

const cx = classNames.bind(styles);

function GhiTang({ duyetTangTBData = false, title }) {
    const tableColumnsName = [
        "Mã nhóm thiết bị",
        "Tên nhóm thiết bị",
        "Kho phòng",
        "Số lượng",
        "Đơn giá",
        "Thành tiền",
        "",
    ];

    const fields = [
        "maNTB",
        "tenNTB",
        "maKP",
        "soLuong",
        "donGia",
        "thanhTienString",
    ];

    const [viewData, setViewData] = useState(useLocation().state?.viewData);

    const requestDefault = {
        ngayLap: new Date().toISOString().split("T")[0],
        noiDung: "",
        maNguonCap: "NC00001",
        chiTietTangTBList: [],
    };

    const navigator = useNavigate();

    const [request, setRequest] = useState(
        useLocation().state?.request ||
            viewData ||
            duyetTangTBData?.request ||
            requestDefault
    );
    const [devices, setDevices] = useState([]);
    const [dsTB, seDsTB] = useState([]);
    const [reload, setReload] = useState(false);
    const [merged, setMerged] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState(
        useLocation().state?.selectedDevices ||
            viewData?.chiTietTangTBList ||
            duyetTangTBData?.request?.chiTietTangTBList ||
            []
    );
    const [tangDevices, setTangDevices] = useState([]);

    // useEffect(() => {
    //     if (viewData) {
    //         // fetch data để lấy dữ liệu
    //     }
    // }, []);

    useEffect(() => {
        const fetchDevices = async () => {
            const dataResponse = await getServices.getAllDevices();
            setDevices(dataResponse);
        };
        fetchDevices();
    }, []);

    // useEffect(() => {
    //     console.log(updateData);
    //     if (updateData) {
    //         setRequest(updateData);
    //     }
    // }, []);

    const handleAddRow = () => {
        setSelectedDevices([...selectedDevices, {}]);
        setMerged(false);
        // setTBKB([...TBKB, {}]);
    };

    const handleChange = (e, field) => {
        if (viewData) {
            alert("Không thể chỉnh sửa thông tin phiếu ở đây");
            return;
        }
        setRequest((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleReload = () => {
        setReload(!reload);
    };

    function createTangArray() {
        let correct = true;
        const tangDevices = [];
        // Lọc selectedDevices để loại bỏ các phần tử có số hỏng và sl dùng được bằng 0
        const filteredDevices = selectedDevices.filter((device) => {
            if (device.maKP === undefined) {
                device.maKP = "KP00001";
            }
            return !!device.maNTB && device.soLuong > 0 && device.donGia > 0;
        });

        filteredDevices.forEach((device) => {
            device.thanhTien = Number(
                device.thanhTienString.replace(/\.|₫/g, "").trim()
            );
            const existingDeviceIndex = tangDevices.findIndex(
                (tb) => tb.maNTB === device.maNTB && tb.maKP === device.maKP
            );

            if (existingDeviceIndex !== -1) {
                // Cập nhật số lượng cho thiết bị hiện tại
                // if (!device.soLuong || device.soLuong <= 0) {
                //     device.soLuong = 1;
                // }
                tangDevices[existingDeviceIndex].soLuong += device.soLuong;
                tangDevices[existingDeviceIndex].thanhTienString =
                    new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(
                        device.soLuong *
                            tangDevices[existingDeviceIndex].donGia +
                            tangDevices[existingDeviceIndex].thanhTien
                    );
                tangDevices[existingDeviceIndex].thanhTien = Number(
                    tangDevices[existingDeviceIndex].thanhTienString
                        .replace(/\.|₫/g, "")
                        .trim()
                );
            } else {
                // Tạo một đối tượng mới chỉ chứa các trường trong `fields`
                const newDevice = fields.reduce((obj, field) => {
                    obj[field] = device[field];
                    return obj;
                }, {});
                // Đặt số lượng cho thiết bị mới
                newDevice.soLuong = device.soLuong;
                newDevice.thanhTien = device.thanhTien;
                // Thêm thiết bị mới vào tangDevices
                // delete newDevice["tenTB"];
                tangDevices.push(newDevice);
            }
        });
        // Cập nhật selectedDevices với tangDevices đã xử lý

        setSelectedDevices(tangDevices);
        setTangDevices(tangDevices);

        tangDevices.forEach((device) => {
            device.ngayNhap = request.ngayLap;
            device.hanSuDung = new Date(
                new Date(request.ngayLap).setFullYear(
                    new Date(request.ngayLap).getFullYear() + 10
                )
            )
                .toISOString()
                .split("T")[0];
            if (device.thanhTien > 1000000000) {
                alert(
                    `Thành tiền của thiết bị ${device.tenNTB} vượt quá 1 tỷ đồng`
                );
                correct = false;
                setMerged(false);
                return;
            }
            delete device.donViTinh;
        });

        if (!correct) {
            return;
        }

        setMerged(true);

        request.chiTietTangTBList = tangDevices;
    }

    const handleSubmit = async () => {
        // let response = null;
        // if (updateData) {
        //     response = await updateServices.updateGiaoVien(
        //         "giao-vien/update",
        //         updateData.maGV,
        //         request
        //     );

        //     if (response && response.status === 200) {
        //         alert("Cập nhật giáo viên thành công");
        //         navigator(config.routes.danh_muc_giao_vien);
        //     } else {
        //         alert("Cập nhật giáo viên thất bại");
        //     }
        // } else {
        if (request.chiTietTangTBList.length === 0) {
            alert("Chưa có thiết bị nào được chọn");
            return;
        }

        const response = await createServices.createTang(request);

        if (response && response.status === 200) {
            if (!localStorage.getItem("choDuyetList")) {
                localStorage.setItem("choDuyetList", JSON.stringify({}));
            }

            let choDuyetList = JSON.parse(localStorage.getItem("choDuyetList"));
            choDuyetList = {
                ...choDuyetList,
                [response.data.maPhieuTang]: request,
            };
            localStorage.setItem("choDuyetList", JSON.stringify(choDuyetList));
            alert("Ghi tăng thành công.\nVui lòng chờ duyệt từ quản trị viên");
            navigator(config.routes.tang_thiet_bi);
        } else {
            alert("Ghi tăng thất bại (Hãy kiểm tra lại thông tin)");
        }
    };

    const duyetTangTBHandler = async () => {
        if (request.chiTietTangTBList.length === 0) {
            alert("Chưa có thiết bị nào được chọn");
            return;
        }

        if (
            // eslint-disable-next-line no-restricted-globals
            confirm(
                "Sau khi duyệt sẽ không thể thay đổi.\nBạn có chắc chắn muốn duyệt phiếu này?"
            )
        ) {
            const response = await createServices.duyetTangTB(
                duyetTangTBData.maPhieuTang,
                request
            );

            if (response && response.status === 200) {
                let choDuyetList = JSON.parse(
                    localStorage.getItem("choDuyetList")
                );
                delete choDuyetList[duyetTangTBData.maPhieuTang];
                localStorage.setItem(
                    "choDuyetList",
                    JSON.stringify(choDuyetList)
                );
                alert("Duyệt phiếu thành công");
                navigator(config.routes.tang_thiet_bi);
            } else {
                alert("Duyệt phiếu thất bại");
            }
        }
    };

    console.log(request);

    return (
        <div className={cx("wrapper", "col-lg-12 col-sm-12")}>
            {!!viewData || (
                <h1 className={cx("title")}>
                    {"Thêm phiếu ghi tăng thiết bị"}
                </h1>
            )}
            <div className="row">
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày lập</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngayLap}
                        onChange={(e) => {
                            handleChange(e, "ngayLap");
                            setMerged();
                        }}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Nguồn cấp</label>
                    <select
                        value={request.maNguonCap}
                        onChange={(e) => handleChange(e, "maNguonCap")}
                    >
                        <option value="NC00001">Sở GD&DT</option>
                        <option value="NC00002">Phòng GD&DT</option>
                        <option value="NC00003">Trường tự trang bị</option>
                        <option value="NC00004">PHHS/Cựu HS ủng hộ</option>
                    </select>
                </span>
                <span className="col-lg-12 col-md-12 mt-5 d-flex flex-column">
                    <label className="">Nội dung</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.noiDung}
                        onChange={(e) => handleChange(e, "noiDung")}
                    />
                </span>
            </div>
            {duyetTangTBData || viewData ? (
                false
            ) : (
                <Link
                    to={config.routes.chon_thiet_bi_khai_bao}
                    state={{
                        array: selectedDevices,
                        from: config.routes.ghi_tang,
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
                // submitData={TBKB}
                ghiTangCustom
                view={!!viewData}
            ></QLTBTable>
            <div className="row mt-5 gap-3 m-0">
                {!!viewData || (
                    <div
                        className={cx(
                            "create-btn",
                            "col-2 d-flex align-items-center justify-content-center"
                        )}
                        // onClick={handleSubmit}
                    >
                        {duyetTangTBData ? (
                            <span onClick={() => duyetTangTBHandler()}>
                                Duyệt
                            </span>
                        ) : (
                            <div>
                                {!merged ? (
                                    <span onClick={createTangArray}>Gộp</span>
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
                    onClick={() => navigator(config.routes.tang_thiet_bi)}
                >
                    Hủy
                </div>
            </div>
        </div>
    );
}

export default GhiTang;
