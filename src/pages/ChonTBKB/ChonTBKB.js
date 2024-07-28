import classNames from "classnames/bind";
import styles from "./ChonTBKB.module.scss";
import Table from "~/components/Table";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import Search from "~/components/Search/Search";
import config from "~/config";
import { Link, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function ChonTBKB() {
    const tableColumnsName = [
        "#",
        "Mã nhóm thiết bị",
        "Tên nhóm thiết bị",
        "Loại thiết bị",
    ];

    const fields = ["#", "maNTB", "tenNTB", "loaiTB"];

    const [devices, setDevices] = useState([]);
    const state = useLocation().state;
    const [selectedDevices, setSelectedDevices] = useState(state?.array || []);
    const [isSearching, setIsSearching] = useState(false);
    const [reload, setReload] = useState(false);

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
                if (state?.from === config.routes.ghi_giam) {
                    const dataResponse = await getServices.getInDSThietBi();
                    setDevices(dataResponse);
                    return;
                }
                const dataResponse = await getServices.getAllDevices();
                setDevices(dataResponse);
            }
        };

        fetchDevices();
    }, [isSearching, reload]);

    const handleSelectedDevices = (e, data) => {
        if (e.target.checked) {
            setSelectedDevices([...selectedDevices, data]);
        } else {
            setSelectedDevices(
                selectedDevices.filter((device) => device.maTB !== data.maTB)
            );
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
                />

                <div className="row mt-5 gap-3 m-0 p-0">
                    <Link
                        to={state?.from}
                        state={selectedDevices}
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

                    <div
                        className={cx(
                            "cancel-btn",
                            "col-2 col-2 d-flex align-items-center justify-content-center"
                        )}
                        // onClick={() => navigator(config.routes.danh_muc_giao_vien)}
                    >
                        Hủy
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChonTBKB;
