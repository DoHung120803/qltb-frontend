import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Table.module.scss";
import { DeleteIcon, LineIcon, MenuIcon, PencilIcon } from "../Icons";
import * as deleteServices from "~/services/deleteServices";
import { useState } from "react";

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
}) {
    const [reRender, setReRender] = useState(false);

    const startItem = page * size + 1;
    const endItem = Math.min((page + 1) * size, totalItems);

    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            const response = await deleteServices._delete(deleteEndpoint, id);

            console.log(response);
            if (response.status === 204) {
                alert("Xóa thành công ^^");
                handleReload();
            } else {
                alert("Xóa thất bại :((");
            }
        }
    };

    const handleReRender = () => setReRender(!reRender);

    // console.log(fields);

    return (
        <div
            className={cx("p-0", {
                "chon-TBKB-custom": chonTBKBCustom,
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
                                        <Link to={linkUpdate} state={data}>
                                            <span className={cx("update-icon")}>
                                                <PencilIcon />
                                                <span
                                                    className={cx("line-icon")}
                                                >
                                                    <LineIcon />
                                                </span>
                                            </span>
                                        </Link>
                                        <span
                                            className={cx("delete-icon")}
                                            onClick={() =>
                                                handleDelete(data[[fields[0]]])
                                            }
                                        >
                                            <DeleteIcon />
                                        </span>
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
