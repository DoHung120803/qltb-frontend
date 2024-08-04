import classNames from "classnames/bind";
import styles from "./MuonTraThietBi.module.scss";
import Table from "~/components/Table";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import * as updateServices from "~/services/updateServices"; // Import update services
import Search from "~/components/Search/Search";
import config from "~/config";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function MuonTraThietBi() {
    const tableColumnsName = [
        "Mã phiếu mượn",
        "Tên giáo viên",
        "Ngày mượn",
        "Ngày hẹn trả",
        "Trạng thái",
        "",
        "Hành động",
    ];

    const fields = [
        "maPhieuMuon",
        "giaoVien",
        "ngayMuon",
        "ngayHenTra",
        "trangThai",
        "muonTra"
    ];

    const [loans, setLoans] = useState([]);
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
        const fetchLoans = async () => {
            if (!isSearching) {
                const dataResponse = await getServices.getMuonTB(page, size);
                setLoans(dataResponse.content);
                setTotalPages(dataResponse.totalPages);
                setTotalItems(dataResponse.totalElements);
            }
        };

        fetchLoans();
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

    const handleDelete = async (loan, event) => {
        event.preventDefault();
        await updateServices.updateMuonTB(loan.maPhieuMuon, { trangThai: "Chưa mượn" });
        handleReload();
    };

    const handleRecordLoan = async (loan, event) => {
        event.preventDefault();
        await updateServices.updateMuonTB(loan.maPhieuMuon, { trangThai: "Đang mượn" });
        handleReload();
    };

    const handleRecordReturn = async (loan) => {
        // Navigate to record return and reload the data after the return is recorded
        navigate(config.routes.them_phieu_tra, { state: { loan } });
    };

    const renderMuontTra = (loan) => {
        if (loan.trangThai === "Đã trả") {
            return null;
        }
        return (
            <div className={cx("action-buttons")}>
                {loan.trangThai === "Quá hạn" ? (
                    <button className={cx("record-btn")} onClick={() => handleRecordReturn(loan)}>Ghi trả</button>
                ) : (
                    <>
                        {loan.trangThai === "Đang mượn" ? (
                            <button className={cx("delete-btn")} onClick={(e) => handleDelete(loan, e)}>Xóa mượn</button>
                        ) : (
                            <button className={cx("record-loan-btn")} onClick={(e) => handleRecordLoan(loan, e)}>Ghi mượn</button>
                        )}
                        <button className={cx("record-btn")} onClick={() => handleRecordReturn(loan)}>Ghi trả</button>
                    </>
                )}
            </div>
        );
    };

    const renderActions = (loan) => {
        if (loan.trangThai === "Chưa mượn") {
            return (
                <div className={cx("action-buttons")}>
                    <Link to={`${config.routes.update_phieu_muon}/${loan.maPhieuMuon}`} className={cx("edit-btn")}>
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className={cx("delete-icon-btn")} onClick={(e) => handleDelete(loan, e)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={cx("wrapper", "col-11")}>
            <h2>Quản lý mượn trả</h2>
            <p>Quản lý mượn trả &gt; Mượn trả thiết bị</p>

            <div className="row m-0">
                <Search
                    endpoint="/muon-tb/search"
                    setSearchResult={setLoans}
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
                    to={config.routes.them_phieu_muon}
                >
                    <div>Thêm phiếu mượn</div>
                </Link>
                <Link
                    className={cx(
                        "add-btn",
                        "col-lg-2 col-sm-4 mt-3 text-center"
                    )}
                    to={config.routes.lich_su_tra}
                >
                    <div>Lịch sử trả</div>
                </Link>
                <div className="table-wrapper">
                    <Table
                        tableColumnsName={tableColumnsName}
                        fields={fields}
                        datasTable={loans.map(loan => ({
                            ...loan,
                            ngayMuon: formatDate(loan.ngayMuon),
                            ngayHenTra: formatDate(loan.ngayHenTra),
                            muonTra: renderMuontTra(loan),
                            actions: renderActions(loan)
                        }))}
                        page={page}
                        size={size}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        onPageChange={handlePageChange}
                        onSizeChange={handleSizeChange}
                        handleReload={handleReload}
                        // isMuonTraThietBi prop is not passed, default behavior is applied
                    />
                </div>
            </div>
        </div>
    );
}

export default MuonTraThietBi;
