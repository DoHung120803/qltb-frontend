import classNames from "classnames/bind";
import {Link, useNavigate} from "react-router-dom";
import styles from "./Table.module.scss";
import {DeleteIcon, LineIcon, MenuIcon, PencilIcon} from "../Icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as deleteServices from "~/services/deleteServices";

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
                   linkDetail,
                   linkUpdate, // Add linkUpdate prop
                   deleteEndpoint,
                   handleReload,
               }) {
    const navigate = useNavigate();
    const startItem = page * size + 1;
    const endItem = Math.min((page + 1) * size, totalItems);

    const handleDelete = async (id) => {
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xóa?',
            buttons: [
                {
                    label: 'Có',
                    onClick: async () => {
                        const response = await deleteServices._delete(deleteEndpoint, id);

                        console.log(response);
                        if (response.status === 204) {
                            alert("Xóa thành công ^^");
                            handleReload();
                        } else {
                            alert("Xóa thất bại :((");
                        }
                    }
                },
                {
                    label: 'Không',
                    onClick: () => {}
                }
            ]
        });
    };

    const handleRowClick = (data) => {
        navigate(linkDetail, { state: data });
    };

    return (
        <div className="p-0">
            <form
                name="container-form"
                className="mt-4 container-fluid p-0"
                method="post"
                action="/courses/handle-form-actions"
            >
                <table className={cx("table-container", "table mt-5 col-12")}>
                    <thead>
                    <tr className="table-primary">
                        {tableColumnsName.map((columnName, index) => (
                            <th scope="col" key={index}>
                                {columnName}
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
                    {datasTable.map((data, index) => (
                        <tr key={index} onDoubleClick={() => handleRowClick(data)}>
                            {fields.map((field, index) => (
                                <td key={index}>{data[field]}</td>
                            ))}
                            <td>
                                <Link to={linkUpdate} state={data}>
                                    <span className={cx("update-icon")}>
                                        <PencilIcon/>
                                        <span className={cx("line-icon")}>
                                            <LineIcon/>
                                        </span>
                                    </span>
                                </Link>
                                <span
                                    className={cx("delete-icon")}
                                    onClick={() => handleDelete(data[fields[0]])}
                                >
                                    <DeleteIcon/>
                                </span>
                            </td>
                        </tr>
                    ))}

                    {datasTable.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                {"Không có dữ liệu!"}
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
                        disabled={page === totalPages - 1}
                    >
                        {">"}
                    </button>
                </span>
            </div>
        </div>
    );
}

export default Table;
