import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./LichSuTra.module.scss";
import Table from "~/components/Table";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import Search from "~/components/Search/Search";
import config from "~/config";

const cx = classNames.bind(styles);

function LichSuTra() {
    const tableColumnsName = [
        "Mã phiếu trả",
        "Tên giáo viên",
        "Ngày mượn",
        "Ngày trả",
        "Hành động"
    ];

    const fields = [
        "maPhieuTra",
        "tenGiaoVien",
        "ngayMuon",
        "ngayTra"
    ];

    const [returns, setReturns] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    const handleReload = () => {
        setReload(!reload);
    };

    useEffect(() => {
        setPage(0);
    }, [isSearching]);

    useEffect(() => {
        const fetchReturns = async () => {
            if (!isSearching) {
                const dataResponse = await getServices.getLichSuTra(page, size);
                const formattedData = dataResponse.content.map(item => ({
                    maPhieuTra: item.maPhieuTra,
                    tenGiaoVien: item.tenGiaoVien,
                    ngayMuon: item.ngayMuon,
                    ngayTra: item.ngayTra,
                    chiTietTraTBList: item.chiTietTraTBList, // Bao gồm thông tin chi tiết thiết bị
                }));
                setReturns(formattedData);
                setTotalPages(dataResponse.totalPages);
                setTotalItems(dataResponse.totalElements);
            }
        };

        fetchReturns();
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleView = (data) => {
        navigate(config.routes.xem_phieu_tra, {
            state: { viewData: data },
        });
    };

    return (
        <div className={cx("wrapper", "col-11")}>
            <h2>Lịch sử trả</h2>
            <p>Quản lý mượn trả &gt; Lịch sử trả</p>

            <div className="row m-0">
                <Search
                    endpoint="/tra-tb/search"
                    setSearchResult={setReturns}
                    setIsSearching={setIsSearching}
                    page={page}
                    size={size}
                    setTotalPages={setTotalPages}
                    setTotalItems={setTotalItems}
                    reload={reload}
                />
                <div className="table-wrapper">
                    <Table
                        tableColumnsName={tableColumnsName}
                        fields={fields}
                        datasTable={returns.map(returnItem => ({
                            ...returnItem,
                            ngayMuon: formatDate(returnItem.ngayMuon),
                            ngayTra: formatDate(returnItem.ngayTra)
                        }))}
                        page={page}
                        size={size}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        onPageChange={handlePageChange}
                        onSizeChange={handleSizeChange}
                        handleReload={handleReload}
                        viewLink={config.routes.xem_phieu_tra} // Đảm bảo đường dẫn chính xác
                        onView={handleView} // Sử dụng handleView để chuyển hướng
                        isLichSuTra={true} // Đánh dấu là Lịch sử trả
                    />
                </div>
            </div>
        </div>
    );
}

export default LichSuTra;
