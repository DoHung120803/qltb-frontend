import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Table.module.scss";
import { DeleteIcon, LineIcon, MenuIcon, PencilIcon, ViewIcon } from "../Icons";
import * as deleteServices from "~/services/deleteServices";
import { useState } from "react";
import config from "~/config";
import { suaChuaTB, timThayTB } from "~/services/updateServices";

const cx = classNames.bind(styles);

function Table({
    tableColumnsName = [],
    fields = [],
    datasTable = [],
    page,
    size,
    totalPages,
    totalItems,
    onPageChange,
    onSizeChange,
    linkUpdate,
    deleteEndpoint,
    handleReload,
    chonTBKBCustom = false,
    handleSelectedDevices,
    nonAction,
    handleCheckBox = () => {
        alert("Bạn không được phép thay đổi ở đây!");
    },
    khaiBaoHongMat = false,
    tangThietBi = false,
    viewLink,
    qldm = false,
}) {
    const [reRender, setReRender] = useState(false);

    const startItem = page * size + 1;
    const endItem = Math.min((page + 1) * size, totalItems);

    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            const response = await deleteServices._delete(deleteEndpoint, id);

            console.log(response);
            if (response?.status === 200) {
                alert("Xóa thành công ^^");
                handleReload();
            } else {
                alert("Xóa thất bại :((");
            }
        }
    };

    const handleReRender = () => setReRender(!reRender);

    const huyTangTBHandler = async (maPhieuTang) => {
        if (
            // eslint-disable-next-line no-restricted-globals
            confirm(
                "Hành động này sẽ không thể hoàn tác.\nBạn có chắc chắn muốn hủy phiếu tăng thiết bị này?"
            )
        ) {
            const response = await deleteServices._delete(
                "tang-tb/delete",
                maPhieuTang
            );

            if (response?.status === 200) {
                let choDuyetList = JSON.parse(
                    localStorage.getItem("choDuyetList")
                );
                delete choDuyetList[maPhieuTang];
                localStorage.setItem(
                    "choDuyetList",
                    JSON.stringify(choDuyetList)
                );
                alert("Hủy thành công ^^");
                handleReload();
            } else {
                alert("Hủy thất bại :((");
            }
        }
    };

    // console.log(fields);

    const handleSuaChuaTB = async (data) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Bạn có chắc chắn muốn sửa chữa thiết bị này?")) {
            const response = await suaChuaTB(data.maPhieuBao, data.maCaBietTB);
            if (response?.status === 200) {
                alert("Sửa chữa thành công ^^");
                handleReload();
            } else {
                alert("Sửa chữa thất bại :((");
            }
        }
    };

    const handleTimThayTB = async (data) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Bạn có chắc chắn muốn xác nhận thiết bị đã tìm thấy?")) {
            const response = await timThayTB(data.maPhieuBao, data.maCaBietTB);
            if (response?.status === 200) {
                alert("Xác nhận thành công ^^");
                handleReload();
            } else {
                alert("Xác nhận thất bại :((");
            }
        }
    };

    return (
        <div
            className={cx("p-0", {
                "chon-TBKB-custom": chonTBKBCustom,
                "qldm-table": qldm,
            })}
        >
            <form
                name="container-form"
                method="post"
                action="/courses/handle-form-actions"
                className={cx("mt-4 container-fluid p-0")}
            >
                <table className={cx("table-container", "table mt-5 col-12")}>
                    <thead>
                        <tr className="table-primary">
                            {tableColumnsName.map((columnName, index) => (
                                <th scope="col" key={index}>
                                    {columnName}
                                    {columnName.indexOf("Tên") >= 0 ? (
                                        <span className={cx("sort-icon")}>
                                            <MenuIcon
                                                height="2rem"
                                                width="2rem"
                                                fill="black"
                                            />
                                        </span>
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {datasTable.map((data, _index) => (
                            <tr key={_index}>
                                {fields.map((field, index) => {
                                    if (field === "suaChua") {
                                        return (
                                            <td key={index}>
                                                {data.hong ? (
                                                    <div
                                                        onClick={() =>
                                                            handleSuaChuaTB(
                                                                data
                                                            )
                                                        }
                                                        className="btn btn-primary"
                                                    >
                                                        Sửa chữa
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            handleTimThayTB(
                                                                data
                                                            )
                                                        }
                                                        className="btn btn-primary"
                                                    >
                                                        Tìm thấy
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    }
                                    if (field === "hongMat") {
                                        return (
                                            <td key={index}>
                                                {data.hong ? "Hỏng" : "Mất"}
                                            </td>
                                        );
                                    }
                                    if (field === "dangHoatDong") {
                                        return (
                                            <td key={index}>
                                                <input
                                                    className="col-8 ms-auto"
                                                    type="checkbox"
                                                    checked={data[field]}
                                                    onChange={(e) => {
                                                        handleCheckBox(
                                                            field,
                                                            _index
                                                        );
                                                        handleReRender();
                                                    }}
                                                />
                                            </td>
                                        );
                                    }
                                    if (field === "#") {
                                        return (
                                            <td key={index}>
                                                <input
                                                    onClick={(e) =>
                                                        handleSelectedDevices(
                                                            e,
                                                            data
                                                        )
                                                    }
                                                    type="checkbox"
                                                    className="checkbox-row"
                                                />
                                            </td>
                                        );
                                    } else {
                                        return (
                                            <td key={index}>{data[[field]]}</td>
                                        );
                                    }
                                })}

                                {nonAction || chonTBKBCustom || (
                                    <td>
                                        {tangThietBi ? (
                                            data.choDuyet === true ? (
                                                <div>
                                                    <Link
                                                        to={
                                                            config.routes
                                                                .duyet_tang_tb
                                                        }
                                                        state={{
                                                            request: JSON.parse(
                                                                localStorage.getItem(
                                                                    "choDuyetList"
                                                                )
                                                            )[data.maPhieuTang],
                                                            maPhieuTang:
                                                                data.maPhieuTang,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                marginRight:
                                                                    "5px",
                                                            }}
                                                            className="btn btn-primary"
                                                        >
                                                            Duyệt
                                                        </div>
                                                    </Link>
                                                    <div
                                                        onClick={() =>
                                                            huyTangTBHandler(
                                                                data.maPhieuTang
                                                            )
                                                        }
                                                        className="btn btn-danger"
                                                    >
                                                        Hủy
                                                    </div>
                                                </div>
                                            ) : (
                                                false
                                            )
                                        ) : (
                                            <Link to={linkUpdate} state={data}>
                                                <span
                                                    className={cx(
                                                        "update-icon"
                                                    )}
                                                >
                                                    <PencilIcon />
                                                    <span
                                                        className={cx(
                                                            "line-icon"
                                                        )}
                                                    >
                                                        <LineIcon />
                                                    </span>
                                                </span>
                                            </Link>
                                        )}
                                        {data.choDuyet || (
                                            <span
                                                className={cx("delete-icon")}
                                                onClick={() =>
                                                    handleDelete(
                                                        data[[fields[0]]]
                                                    )
                                                }
                                            >
                                                <DeleteIcon />
                                            </span>
                                        )}
                                        {data.choDuyet || (
                                            <Link
                                                to={viewLink}
                                                state={{ viewData: data }}
                                            >
                                                <span
                                                    className={cx("view-icon")}
                                                >
                                                    <ViewIcon />
                                                </span>
                                            </Link>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}

                        {datasTable.length === 0 && (
                            <tr>
                                <td
                                    colSpan={tableColumnsName.length}
                                    className="text-center"
                                >
                                    {"Không có có dữ liệu!"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
            {chonTBKBCustom || (
                <div className={cx("pagination")}>
                    <span>
                        <span>Hiển thị</span>
                        <select
                            value={size}
                            onChange={(e) =>
                                onSizeChange(Number(e.target.value))
                            }
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                        </select>
                    </span>
                    <span>
                        <span>{`${startItem} - ${endItem} trong ${totalItems}`}</span>
                        <button
                            onClick={() => onPageChange(page - 1)}
                            disabled={page === 0}
                        >
                            {"<"}
                        </button>
                        <button
                            onClick={() => onPageChange(page + 1)}
                            disabled={page === totalPages - 1}
                        >
                            {">"}
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
}

export default Table;
