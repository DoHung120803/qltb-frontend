import classNames from "classnames/bind";
import styles from "./MuonTraThietBi.module.scss";
import Table from "~/components/Table";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import Search from "~/components/Search/Search";
import config from "~/config";
import { Link, useNavigate } from "react-router-dom";
import * as updateServices from "~/services/updateServices";

const cx = classNames.bind(styles);

function MuonTraThietBi() {
    const tableColumnsName = [
        "Mã phiếu mượn",
        "Tên giáo viên",
        "Ngày mượn",
        "Ngày hẹn trả",
        "Trạng thái",
        "Mượn/Trả",
        "Hành động",
    ];

    const fields = ["maPhieuMuon", "giaoVien", "ngayMuon", "ngayHenTra", "trangThai"];

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

    const handleDelete = async (loan, event) => {
        event.preventDefault();
        await updateServices.updateMuonTB(loan.maPhieuMuon, {
            trangThai: "Chưa mượn",
        });

        for (let chiTiet of loan.chiTietMuonTBList) {
            await updateServices.updateStatusTB(chiTiet.maCaBietTB, {
                trangThai: "Trong kho",
            });
        }

        handleReload();
    };

    const handleRecordLoan = async (loan, event) => {
        event.preventDefault();
        await updateServices.updateMuonTB(loan.maPhieuMuon, {
            trangThai: "Đang mượn",
        });

        for (let chiTiet of loan.chiTietMuonTBList) {
            await updateServices.updateStatusTB(chiTiet.maCaBietTB, {
                trangThai: "Đang mượn",
            });
        }

        handleReload();
    };

    const handleRecordReturn = async (loan) => {
        navigate(config.routes.them_phieu_tra, {
            state: {
                viewData: {
                    maPhieuMuon: loan.maPhieuMuon,
                    ngayMuon: loan.ngayMuon,
                    ngayHenTra: loan.ngayHenTra,
                    giaoVien: loan.giaoVien,
                    chiTietTraTBList: loan.chiTietMuonTBList || [], // Dữ liệu chi tiết về thiết bị
                },
            },
        });
    };


    const renderMuontTra = (loan) => {
        if (loan.trangThai === "Đã trả") {
            return null;
        }
        return (
            <div className={cx("action-buttons")}>
                {loan.trangThai === "Quá hạn" ? (
                    <button
                        className={cx("record-btn")}
                        onClick={() => handleRecordReturn(loan)}
                    >
                        Ghi trả
                    </button>
                ) : (
                    <>
                        {loan.trangThai === "Đang mượn" ? (
                            <button
                                className={cx("delete-btn")}
                                onClick={(e) => handleDelete(loan, e)}
                            >
                                Xóa mượn
                            </button>
                        ) : (
                            <button
                                className={cx("record-loan-btn")}
                                onClick={(e) => handleRecordLoan(loan, e)}
                            >
                                Ghi mượn
                            </button>
                        )}
                        <button
                            className={cx("record-btn")}
                            onClick={() => handleRecordReturn(loan)}
                        >
                            Ghi trả
                        </button>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className={cx("wrapper", "col-11")}>
            <h2>Quản lý mượn thiết bị</h2>
            <p>Quản lý mượn thiết bị &gt; Mượn thiết bị</p>

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
                <div className="col-lg-4 col-sm-8 mt-3 ms-auto d-flex justify-content-end">
                    <Link
                        className={cx(
                            "add-btn",
                            "text-center me-3"
                        )}
                        to={config.routes.them_phieu_muon}
                    >
                        <div>Thêm phiếu mượn</div>
                    </Link>
                    <Link
                        className={cx(
                            "add-btn",
                            "text-center"
                        )}
                        to={config.routes.lich_su_tra}
                    >
                        <div>Xem lịch sử</div>
                    </Link>
                </div>
                <Table
                    tableColumnsName={tableColumnsName}
                    fields={[...fields, "muonTra"]}
                    datasTable={loans}
                    page={page}
                    size={size}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                    linkUpdate={config.routes.update_phieu_muon}
                    deleteEndpoint="/muon-tb"
                    handleReload={handleReload}
                    viewLink={config.routes.them_phieu_muon}
                    renderMuontTra={renderMuontTra}
                    isMuonTraThietBi={true}
                />
            </div>
        </div>
    );
}

export default MuonTraThietBi;
