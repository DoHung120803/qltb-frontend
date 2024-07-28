import classNames from "classnames/bind";
import styles from "./KhaiBaoThietBi.module.scss";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import config from "~/config";
import { Link, useLocation } from "react-router-dom";
import QLTBTable from "~/components/QLTBTable";
import { createTB } from "~/services/createServices";

const cx = classNames.bind(styles);

function KhaiBaoThietBi() {
    const tableColumnsName = [
        "Mã nhóm thiết bị",
        "Tên nhóm thiết bị",
        "Số lượng",
        "Kho phòng",
        "Ngày nhập",
        "Hạn sử dụng",
        "",
    ];

    const fields = [
        "maNTB",
        "tenNTB",
        "soLuong",
        "maKP",
        "ngayNhap",
        "hanSuDung",
    ];

    const [devices, setDevices] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState(
        useLocation().state || []
    );
    const [reload, setReload] = useState(false);
    const [TBKB, setTBKB] = useState([]);
    const [merged, setMerged] = useState(false);

    const handleReload = () => {
        setReload(!reload);
    };

    useEffect(() => {
        const fetchDevices = async () => {
            const dataResponse = await getServices.getAllDevices();
            setDevices(dataResponse);
        };
        fetchDevices();
    }, []);

    const handleAddRow = () => {
        setSelectedDevices([...selectedDevices, {}]);
        setMerged(false);
        // setTBKB([...TBKB, {}]);
    };

    function createTBKBArray() {
        const TBKB = [];
        // Lọc selectedDevices để loại bỏ các phần tử có maNTB bằng null hoặc chuỗi rỗng
        const filteredDevices = selectedDevices.filter((device) => {
            if (device.maKP === undefined) {
                device.maKP = "KP00001";
            }
            if (device.ngayNhap === undefined) {
                device.ngayNhap = new Date().toISOString().split("T")[0];
            }
            if (device.hanSuDung === undefined) {
                device.hanSuDung = new Date(
                    new Date().setFullYear(new Date().getFullYear() + 10)
                )
                    .toISOString()
                    .split("T")[0];
            }
            return !!device.maNTB && !!device.soLuong;
        });

        filteredDevices.forEach((device) => {
            const existingDeviceIndex = TBKB.findIndex(
                (tb) => tb.maNTB === device.maNTB && tb.maKP === device.maKP
            );

            if (existingDeviceIndex !== -1) {
                // Cập nhật số lượng cho thiết bị hiện tại
                if (!device.soLuong || device.soLuong <= 0) {
                    device.soLuong = 1;
                }
                TBKB[existingDeviceIndex].soLuong += device.soLuong;
            } else {
                // Tạo một đối tượng mới chỉ chứa các trường trong `fields`
                const newDevice = fields.reduce((obj, field) => {
                    obj[field] = device[field];
                    return obj;
                }, {});
                // Đặt số lượng cho thiết bị mới
                newDevice.soLuong = device.soLuong;
                // Thêm thiết bị mới vào TBKB
                // delete newDevice["tenNTB"];
                TBKB.push(newDevice);
            }
        });
        // Cập nhật selectedDevices với TBKB đã xử lý
        setSelectedDevices(TBKB);
        setTBKB(TBKB);
        setMerged(true);
    }

    const handleSubmit = async () => {
        for (const tb of TBKB) {
            try {
                const response = await createTB(tb);
                if (response.status !== 200) {
                    alert("Khai báo thất bại :((");
                    return;
                }
            } catch (error) {
                alert("Khai báo thất bại :((");
                return;
            }
        }
        alert("Khai báo thành công ^^");
    };

    console.log(TBKB);

    return (
        <div className={cx("wrapper", "col-11")}>
            <h2>Khai báo thiết bị</h2>

            <div className="mt-5">
                <Link
                    to={config.routes.chon_thiet_bi_khai_bao}
                    state={{
                        array: selectedDevices,
                        from: config.routes.khai_bao_thiet_bi,
                    }}
                >
                    <button className={cx("add-btn")}>Thêm thiết bị +</button>
                </Link>
                {/* <button onClick={handleAddRow} className={cx("add-row-btn")}>
                    Thêm dòng +
                </button> */}
                <div className="mt-5">Danh sách thiết bị</div>

                <QLTBTable
                    tableColumnsName={tableColumnsName}
                    fields={fields}
                    dataTable={selectedDevices}
                    devices={devices}
                    handleReload={handleReload}
                    setMerged={setMerged}
                    // submitData={TBKB}
                ></QLTBTable>

                <div className="row mt-5 gap-3 m-0 p-0">
                    <Link
                        to={config.routes.khai_bao_thiet_bi}
                        state={selectedDevices}
                        className={cx(
                            "create-btn",
                            "col-2 d-flex align-items-center justify-content-center"
                        )}
                    >
                        <div

                        // onClick={handleSubmit}
                        >
                            {!merged ? (
                                <span onClick={createTBKBArray}>Gộp</span>
                            ) : (
                                <span onClick={handleSubmit}>Thêm</span>
                            )}
                        </div>
                    </Link>

                    <Link
                        className={cx(
                            "cancel-btn",
                            "col-2 col-2 d-flex align-items-center justify-content-center"
                        )}
                        to={config.routes.danh_sach_thiet_bi}
                    >
                        Hủy
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default KhaiBaoThietBi;
