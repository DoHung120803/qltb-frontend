import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import { DeleteIcon, LineIcon, MenuIcon, PencilIcon } from "../Icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Table({ fields = [], teachers = [] }) {
    return (
        <form
            name="container-form"
            class="mt-4 container-fluid p-0"
            method="post"
            action="/courses/handle-form-actions"
        >
            <table class={cx("table-container", "table mt-5 col-12")}>
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

                    {/* nếu không có giáo viên nào */}
                    {teachers.length == 0 && (
                        <tr>
                            <td colspan="5" class="text-center">
                                {"Không có giáo viên nào. "}
                                <Link to="/quan-ly-doanh-muc/them-giao-vien">
                                    Thêm giáo viên
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </form>
    );
}

export default Table;
