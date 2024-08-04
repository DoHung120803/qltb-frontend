import classNames from "classnames/bind";
import styles from "./DanhSachThietBi.module.scss";
import Table from "~/components/Table";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import Search from "~/components/Search/Search";
import config from "~/config";
import { Link } from "react-router-dom";
import { data } from "jquery";
import { changeActivating } from "~/services/updateServices";

const cx = classNames.bind(styles);

function DanhSachThietBi() {
    const tableColumnsName = [
        "Mã nhóm TB",
        "Mã cá biệt TB",
        "Tên thiết bị",
        "Kho/Phòng",
        "Ngày nhập",
        "Trạng thái",
        "Tình trạng sử dụng",
        "Đang hoạt động",
    ];

    const fields = [
        "maNTB",
        "maCaBietTB",
        "tenNTB",
        "khoPhong",
        "ngayNhap",
        "trangThai",
        "tinhTrang",
        "dangHoatDong",
    ];

    const [devices, setDevices] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [reload, setReload] = useState(false);

    const isKhaiBao = localStorage.getItem("khai-bao") === true;

    const handleReload = () => {
        setReload(!reload);
    };

    useEffect(() => {
        setPage(0);
    }, [isSearching]);

    useEffect(() => {
        const fetchDevices = async () => {
            if (!isSearching) {
                const dataResponse = await getServices.getDSThietBi(page, size);
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

    const handleCheckBox = (field, _index) => {
        const maCaBietTB = devices[_index].maCaBietTB;

        const changeActive = async (maCaBietTB) => {
            const response = await changeActivating(maCaBietTB);
            if (response === undefined) {
                return alert(
                    "Có lỗi xảy ra.\nKhông thể thay đổi trạng thái hoạt động của thiết bị có mã cá biệt " +
                        maCaBietTB
                );
            }
            devices[_index][field] = !devices[_index][field];
            handleReload();
        };
        changeActive(maCaBietTB);
    };

    return (
        <div className={cx("wrapper", "col-11")}>
            <h2>Quản lý thiết bị</h2>
            <p>Quản lý thiết bị &gt; Danh sách thiết bị</p>

            <div className="row m-0">
                <Search
                    endpoint="/thiet-bi/search"
                    setSearchResult={setDevices}
                    setIsSearching={setIsSearching}
                    page={page}
                    size={size}
                    setTotalPages={setTotalPages}
                    setTotalItems={setTotalItems}
                    reload={reload}
                    setPage={setPage}
                />
                {isKhaiBao && (
                    <Link
                        className={cx(
                            "add-btn",
                            "col-lg-1 col-sm-3 mt-3 text-center ms-auto"
                        )}
                        to={config.routes.khai_bao_thiet_bi}
                    >
                        <div>Khai báo</div>
                    </Link>
                )}
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
                    handleReload={handleReload}
                    nonAction
                    handleCheckBox={handleCheckBox}
                />
            </div>
        </div>
    );
}

export default DanhSachThietBi;
