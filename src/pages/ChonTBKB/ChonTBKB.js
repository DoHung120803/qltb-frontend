import classNames from "classnames/bind";
import styles from "./ChonTBKB.module.scss";
import Table from "~/components/Table";
import {useEffect, useState} from "react";
import * as getServices from "~/services/getServices";
import Search from "~/components/Search/Search";
import config from "~/config";
import {Link, useLocation, useNavigate} from "react-router-dom";
import $ from "jquery";
import {getAllThietBiCoTheMuon} from "~/services/getServices";

const cx = classNames.bind(styles);

function ChonTBKB() {
    const [state, setState] = useState(useLocation().state || []);

    const tableColumnsName =
        state?.from === config.routes.ghi_giam ||
        state?.from === config.routes.them_phieu_muon ||
        state?.from === config.routes.khai_bao_hong_mat
            ? [
                "#",
                "Mã cá biệt TB",
                "Tên nhóm thiết bị",
                "Kho phòng",
                "Hạn sử dụng",
                "Trạng thái",
                "Tình trạng",
                "Đang hoạt động",
            ]
            : ["#", "Mã nhóm thiết bị", "Tên nhóm thiết bị", "Loại thiết bị"];


    const fields =
        state?.from === config.routes.ghi_giam ||
        state?.from === config.routes.them_phieu_muon ||
        state?.from === config.routes.khai_bao_hong_mat
            ? [
                "#",
                "maCaBietTB",
                "tenNTB",
                "khoPhong",
                "hanSuDung",
                "trangThai",
                "tinhTrang",
                "dangHoatDong",
            ]
            : ["#", "maNTB", "tenNTB", "loaiTB"];

    const [devices, setDevices] = useState([]);
    // const state = useLocation().state;
    const [selectedDevices, setSelectedDevices] = useState(state?.array || []);
    const [isSearching, setIsSearching] = useState(false);
    const [reload, setReload] = useState(false);

    const navigator = useNavigate();

    const handleReload = () => {
        setReload(!reload);
    };

    // useEffect(() => {
    //     setPage(0);
    // }, [isSearching]);

    useEffect(() => {
        const fetchDevices = async () => {
            if (!isSearching) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                if (
                    state?.from === config.routes.ghi_giam ||
                    state?.from === config.routes.khai_bao_hong_mat
                ) {
                    const dataResponse =
                        await getServices.getAllThietBiChuaThanhLy();
                    const filteredDevices = dataResponse.filter(
                        (device) =>
                            !selectedDevices.some(
                                (selected) =>
                                    selected.maCaBietTB === device.maCaBietTB
                            )
                    );
                    setDevices(filteredDevices);
                    // setDevices(dataResponse);
                    return;
                } else if (state?.from === config.routes.them_phieu_muon) {
                    const dataResponse =
                        await getServices.getAllThietBiCoTheMuon();
                    const filteredDevices = dataResponse.filter(
                        (device) =>
                            !selectedDevices.some(
                                (selected) =>
                                    selected.maCaBietTB === device.maCaBietTB
                            )
                    );
                    setDevices(filteredDevices);
                    // setDevices(dataResponse);
                    return;
                }
                const dataResponse = await getServices.getAllDevices();
                setDevices(dataResponse);
            }
        };

        fetchDevices();
    }, [isSearching, reload]);

    const handleSelectedDevices = (e, data) => {
        if (state?.from === config.routes.khai_bao_hong_mat) {
            if (e.target.checked) {
                setSelectedDevices([data]);
                // Dùng một bộ định danh để xác định checkbox hiện tại
                state.request.maCaBietTB = data.maCaBietTB;
                const checkboxes = document.querySelectorAll(".checkbox-row");
                checkboxes.forEach((checkbox) => {
                    if (checkbox !== e.target) {
                        checkbox.checked = false;
                    }
                });
            } else {
                setSelectedDevices([]);
            }
        } else {
            if (e.target.checked) {
                setSelectedDevices([...selectedDevices, data]);
            } else {
                setSelectedDevices(
                    selectedDevices.filter(
                        (device) => device.maTB !== data.maTB
                    )
                );
            }
        }
    };

    console.log(selectedDevices);

    return (
        <div className={cx("wrapper", "col-11")}>
            <h2>Chọn thiết bị</h2>

            <div className="row m-0">
                <Search
                    endpoint="/dm-thiet-bi/search/all"
                    setSearchResult={setDevices}
                    setIsSearching={setIsSearching}
                    reload={reload}
                    chonTBKBCustom
                />
                <Link
                    className={cx(
                        "add-btn",
                        "col-lg-2 col-sm-4 mt-3 text-center ms-auto"
                    )}
                    to={config.routes.them_thiet_bi}
                >
                    <div></div>
                </Link>
                <div
                    className={cx("total-selected", "col-12 text-end")}
                >{`${selectedDevices.length} thiết bị được chọn`}</div>
                <Table
                    tableColumnsName={tableColumnsName}
                    fields={fields}
                    datasTable={devices}
                    linkUpdate={config.routes.update_thiet_bi}
                    handleReload={handleReload}
                    chonTBKBCustom={true}
                    handleSelectedDevices={handleSelectedDevices}
                    khaiBaoHongMat={
                        state?.from === config.routes.khai_bao_hong_mat
                    }
                />

                <div className="row mt-5 gap-3 m-0 p-0">
                    <Link
                        to={state?.from}
                        state={{
                            selectedDevices,
                            request: state?.request,
                        }}
                        className={cx(
                            "create-btn",
                            "col-2 d-flex align-items-center justify-content-center"
                        )}
                    >
                        <div

                            // onClick={handleSubmit}
                        >
                            Thêm
                        </div>
                    </Link>

                    <Link
                        className={cx(
                            "cancel-btn",
                            "col-2 col-2 d-flex align-items-center justify-content-center"
                        )}
                        to={state?.from}
                        state={{
                            selectedDevices,
                            request: state?.request,
                        }}
                    >
                        Hủy
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ChonTBKB;
