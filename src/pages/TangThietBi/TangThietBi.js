import classNames from "classnames/bind";
import styles from "./TangThietBi.module.scss";
import Table from "~/components/Table";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import Search from "~/components/Search/Search";
import config from "~/config";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function TangThietBi() {
    const tableColumnsName = [
        "Mã phiếu tăng",
        "Ngày lập",
        "Nguồn cấp",
        "Nội dung",
        "Hành động",
    ];

    const fields = ["maPhieuTang", "ngayLap", "nguonCap", "noiDung"];

    const [devices, setDevices] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [reload, setReload] = useState(false);

    const handleReload = () => {
        setReload(!reload);
    };

    useEffect(() => {
        setPage(0);
    }, [isSearching]);

    useEffect(() => {
        const fetchDevices = async () => {
            if (!isSearching) {
                const dataResponse = await getServices.getTangTB(page, size);
                setDevices(dataResponse.content);
                setTotalPages(dataResponse.totalPages);
                setTotalItems(dataResponse.totalElements);
            }
        };

        fetchDevices();
    }, [page, size, isSearching, reload]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage <= totalPages - 1) {
            setPage(newPage);
        }
    };

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        setPage(0);
    };

    return (
        <div className={cx("wrapper", "col-11")}>
            <h2>Quản lý thiết bị</h2>
            <p>Quản lý thiết bị &gt; Tăng thiết bị</p>

            <div className="row m-0">
                <Search
                    endpoint="/dm-thiet-bi/search"
                    setSearchResult={setDevices}
                    setIsSearching={setIsSearching}
                    page={page}
                    size={size}
                    setTotalPages={setTotalPages}
                    setTotalItems={setTotalItems}
                    reload={reload}
                />
                <Link
                    className={cx(
                        "add-btn",
                        "col-lg-2 col-sm-4 mt-3 text-center ms-auto"
                    )}
                    to={config.routes.ghi_tang}
                >
                    <div>Ghi tăng</div>
                </Link>
                <Table
                    tableColumnsName={tableColumnsName}
                    fields={fields}
                    datasTable={devices}
                    page={page}
                    size={size}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                    linkUpdate={config.routes.update_thiet_bi}
                    deleteEndpoint="dm-thiet-bi/delete"
                    handleReload={handleReload}
                />
            </div>
        </div>
    );
}

export default TangThietBi;
