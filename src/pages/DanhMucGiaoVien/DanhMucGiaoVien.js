import classNames from "classnames/bind";
import styles from "./DanhMucGiaoVien.module.scss";
import Table from "~/components/Table";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import Search from "~/components/Search/Search";
import { Link } from "react-router-dom";
import config from "~/config";

const cx = classNames.bind(styles);

function DanhMucGiaoVien() {
    const tableColumnsName = [
        "Mã giáo viên",
        "Tên giáo viên",
        "Giới tính",
        "Tổ chuyên môn",
        "Hành động",
    ];

    const fields = ["maGV", "tenGV", "gioiTinh", "toCM"];

    const [teachers, setTeachers] = useState([]);
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
        const fetchTeachers = async () => {
            if (!isSearching) {
                const dataResponse = await getServices.getGiaoVien(page, size);
                setTeachers(dataResponse.content);
                setTotalPages(dataResponse.totalPages);
                setTotalItems(dataResponse.totalElements);
            }
        };

        fetchTeachers();
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
            <h2>Quản lý danh mục</h2>
            <p>Quản lý danh mục &gt; Quản lý giáo viên</p>

            <div className="row m-0">
                <Search
                    endpoint="/giao-vien/search"
                    setSearchResult={setTeachers}
                    setIsSearching={setIsSearching}
                    page={page}
                    size={size}
                    setTotalPages={setTotalPages}
                    setTotalItems={setTotalItems}
                    reload={reload}
                />
                <Link
                    to={config.routes.them_giao_vien}
                    className={cx(
                        "add-btn",
                        "col-lg-2 col-sm-4 mt-3 text-center ms-auto"
                    )}
                >
                    Thêm giáo viên
                </Link>
                <Table
                    tableColumnsName={tableColumnsName}
                    fields={fields}
                    datasTable={teachers}
                    page={page}
                    size={size}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                    linkDetail={config.routes.xem_giao_vien}
                    linkUpdate={config.routes.cap_nhat_giao_vien} // Pass linkUpdate prop
                    deleteEndpoint="giao-vien/delete"
                    handleReload={handleReload}
                />
            </div>
        </div>
    );
}

export default DanhMucGiaoVien;
