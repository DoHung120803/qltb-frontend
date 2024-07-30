import classNames from "classnames/bind";
import styles from "./GhiGiam.module.scss";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import * as createServices from "~/services/createServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import config from "~/config";
import QLTBTable from "~/components/QLTBTable";

const cx = classNames.bind(styles);

function GhiGiam({ updateData = false, title }) {
    const KHO_PHONG = {
        KP00001: "Kho A",
        KP00002: "Kho B",
        KP00003: "Kho C",
    };

    const tableColumnsName = [
        "Mã cá biệt TB",
        "Tên nhóm thiết bị",
        "Kho phòng",
        "Trạng thái",
        "Tình trạng",
        "Lý do thanh lý",
        "",
    ];

    const fields = [
        "maCaBietTB",
        "tenNTB",
        "khoPhong",
        "trangThai",
        "tinhTrang",
        "lyDoThanhLy",
    ];

    const requestDefault = {
        ngayLap: new Date().toISOString().split("T")[0],
        noiDung: "",
        chiTietThanhLyTBList: [],
    };

    const navigator = useNavigate();

    const [request, setRequest] = useState(
        useLocation().state?.request || requestDefault
    );
    const [devices, setDevices] = useState([]);
    const [dsTB, seDsTB] = useState([]);
    const [reload, setReload] = useState(false);
    const [merged, setMerged] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState(
        useLocation().state?.selectedDevices || []
    );
    const [giamDevices, setGiamDevices] = useState([]);

    // useEffect(() => {
    //     const fetchDevices = async () => {
    //         const dataResponse = await getServices.getAllThietBi();
    //         setDevices(dataResponse);
    //     };
    //     fetchDevices();
    // }, []);

    // useEffect(() => {
    //     const fetchDevices = async () => {
    //         const dataResponse = await getServices.getAllDSThietBi();
    //         seDsTB(dataResponse);
    //     };
    //     fetchDevices();
    // }, []);

    // useEffect(() => {
    //     console.log(updateData);
    //     if (updateData) {
    //         setRequest(updateData);
    //     }
    // }, []);

    // const handleAddRow = () => {
    //     setSelectedDevices([...selectedDevices, {}]);
    //     setMerged(false);
    //     // setTBKB([...TBKB, {}]);
    // };

    const handleChange = (e, field) => {
        setRequest((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleReload = () => {
        setReload(!reload);
    };

    function createGiamArray() {
        let correct = true;
        const giamDevices = [];
        // Lọc selectedDevices để loại bỏ các phần tử có số hỏng và sl dùng được bằng 0
        const filteredDevices = selectedDevices.filter((device) => {
            // if (device.maKP === undefined) {
            //     device.maKP = "KP00001";
            // }
            return !!device.maCaBietTB;
        });

        filteredDevices.forEach((device) => {
            // const existingDeviceIndex = giamDevices.findIndex(
            //     (tb) =>
            //         tb.maCaBietTB === device.maCaBietTB &&
            //         tb.maKP === device.maKP
            // );

            // if (existingDeviceIndex !== -1) {
            //     // Cập nhật số lượng cho thiết bị hiện tại
            //     // if (!device.soLuong || device.soLuong <= 0) {
            //     //     device.soLuong = 1;
            //     // }
            //     giamDevices[existingDeviceIndex].hong += device.hong;
            //     giamDevices[existingDeviceIndex].conDungDuoc +=
            //         device.conDungDuoc;
            // } else {
            // Tạo một đối tượng mới chỉ chứa các trường trong `fields`
            const newDevice = fields.reduce((obj, field) => {
                obj[field] = device[field];
                return obj;
            }, {});
            // Đặt số lượng cho thiết bị mới
            newDevice.soLuong = device.soLuong;
            // Thêm thiết bị mới vào giamDevices
            // delete newDevice["tenTB"];
            giamDevices.push(newDevice);
            // }
        });
        // Cập nhật selectedDevices với giamDevices đã xử lý

        setSelectedDevices(giamDevices);
        setGiamDevices(giamDevices);

        // giamDevices.forEach((tbGiam) => {
        //     delete tbGiam.soLuong;
        //     const index = dsTB.findIndex(
        //         (tb) =>
        //             tb.maCaBietTB === tbGiam.maCaBietTB &&
        //             tb.maKP === tbGiam.maKP
        //     );
        //     if (tbGiam.hong > dsTB[index].hong) {
        //         alert(
        //             `Số lượng hỏng của thiết bị ${tbGiam.tenTB} trong ${
        //                 KHO_PHONG[tbGiam.maKP]
        //             } vượt quá số lượng hỏng hiện có (${dsTB[index].hong})`
        //         );
        //         correct = false;
        //         return;
        //     }
        //     if (tbGiam.conDungDuoc > dsTB[index].trongKho) {
        //         alert(
        //             `Số lượng còn dùng được của thiết bị ${
        //                 tbGiam.tenTB
        //             } trong ${
        //                 KHO_PHONG[tbGiam.maKP]
        //             } vượt quá số lượng còn dùng được hiện có (${
        //                 dsTB[index].trongKho
        //             })`
        //         );
        //         correct = false;
        //         return;
        //     }
        // });
        // if (!correct) {
        //     return;
        // }
        setMerged(true);
        request.chiTietThanhLyTBList = giamDevices;
    }

    console.log(request);

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
        if (request.chiTietThanhLyTBList.length === 0) {
            alert("Chưa có thiết bị nào được chọn");
            return;
        }

        const response = await createServices.createGiam(request);

        if (response && response.status === 200) {
            alert("Ghi giảm thành công");
            // navigator(config.routes.danh_muc_giao_vien);
        } else {
            alert("Ghi giảm thất bại (Hãy kiểm tra lại thông tin)");
        }
    };

    return (
        <div className={cx("wrapper", "col-lg-12 col-sm-12")}>
            <h1 className={cx("title")}>{"Thêm phiếu ghi giảm thiết bị"}</h1>
            <div className="row">
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Ngày lập</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.ngayLap}
                        onChange={(e) => handleChange(e, "ngayLap")}
                    />
                </span>
                <span className="col-lg-6 col-md-12 mt-5 d-flex flex-column">
                    <label className="">Nội dung</label>
                    <input
                        className={cx("input")}
                        type="text"
                        value={request.noiDung}
                        onChange={(e) => handleChange(e, "noiDung")}
                    />
                </span>
            </div>
            <Link
                to={config.routes.chon_thiet_bi_khai_bao}
                state={{
                    array: selectedDevices,
                    from: config.routes.ghi_giam,
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
                handleReload={handleReload}
                setMerged={setMerged}
                // submitData={TBKB}
                ghiGiamCustom // khi có option này sẽ chỉnh  logic, scss cho phù hợp với ghi giảm (fetch data trong dstb, kho phòng tương ứng với thiết bị)
            ></QLTBTable>
            <div className="row mt-5 gap-3 m-0">
                <div
                    className={cx(
                        "create-btn",
                        "col-2 d-flex align-items-center justify-content-center"
                    )}
                    // onClick={handleSubmit}
                >
                    <div

                    // onClick={handleSubmit}
                    >
                        {!merged ? (
                            <span onClick={createGiamArray}>Gộp</span>
                        ) : (
                            <span onClick={handleSubmit}>Thêm</span>
                        )}
                    </div>
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
        </div>
    );
}

export default GhiGiam;
