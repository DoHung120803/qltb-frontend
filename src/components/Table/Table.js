import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import { DeleteIcon, LineIcon, MenuIcon, PencilIcon } from "../Icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Table({
    fields = [],
    teachers = [],
    page,
    size,
    totalPages,
    totalItems,
    onPageChange,
    onSizeChange,
}) {
    const startItem = page * size + 1;
    const endItem = Math.min((page + 1) * size, totalItems);

    return (
        <div>
            <form
                name="container-form"
                className="mt-4 container-fluid p-0"
                method="post"
                action="/courses/handle-form-actions"
            >
                <table className={cx("table-container", "table mt-5 col-12")}>
                    <thead>
                        <tr className="table-primary">
                            {fields.map((field, index) => (
                                <th scope="col" key={index}>
                                    {field}
                                    <span className={cx("sort-icon")}>
                                        <MenuIcon
                                            height="2rem"
                                            width="2rem"
                                            fill="black"
                                        />
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr key={index}>
                                <td>{teacher.maGV}</td>
                                <td>{teacher.tenGV}</td>
                                <td>{teacher.gioiTinh}</td>
                                <td>
                                    {teacher.maToCM === "TCM00001"
                                        ? "Toán Lý"
                                        : teacher.maToCM === "TCM00002"
                                        ? "Văn Sử"
                                        : "Tổng Hợp"}
                                </td>
                                <td>
                                    <span className={cx("update-icon")}>
                                        <PencilIcon />
                                        <span className={cx("line-icon")}>
                                            <LineIcon />
                                        </span>
                                    </span>
                                    <span>
                                        <DeleteIcon />
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {teachers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    {"Không có giáo viên nào. "}
                                    <Link to="/quan-ly-danh-muc/them-giao-vien">
                                        Thêm giáo viên
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
            <div className={cx("pagination")}>
                <span>
                    <span>Hiển thị</span>
                    <select
                        value={size}
                        onChange={(e) => onSizeChange(Number(e.target.value))}
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
                        disabled={page === totalPages}
                    >
                        {">"}
                    </button>
                </span>
            </div>
        </div>
    );
}

export default Table;
