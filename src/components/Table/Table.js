import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import { DeleteIcon, LineIcon, MenuIcon, PencilIcon } from "../Icons";

const cx = classNames.bind(styles);

function Table({ fields = [] }) {
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
                    <tr>
                        <td>GV00001</td>
                        <td>Nguyễn Văn A</td>
                        <td>Nam</td>
                        <td>Toán Lý Hóa</td>
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
                    <tr>
                        <td>GV00001</td>
                        <td>Nguyễn Văn A</td>
                        <td>Nam</td>
                        <td>Toán Lý Hóa</td>
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
                    <tr>
                        <td>GV00001</td>
                        <td>Nguyễn Văn A</td>
                        <td>Nam</td>
                        <td>Toán Lý Hóa</td>
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
                    <tr>
                        <td>GV00001</td>
                        <td>Nguyễn Văn A</td>
                        <td>Nam</td>
                        <td>Toán Lý Hóa</td>
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
                    <tr>
                        <td>GV00001</td>
                        <td>Nguyễn Văn A</td>
                        <td>Nam</td>
                        <td>Toán Lý Hóa</td>
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
                    <tr>
                        <td>GV00001</td>
                        <td>Nguyễn Văn A</td>
                        <td>Nam</td>
                        <td>Toán Lý Hóa</td>
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
                    <tr>
                        <td>GV00001</td>
                        <td>Nguyễn Văn A</td>
                        <td>Nam</td>
                        <td>Toán Lý Hóa</td>
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
                    <tr>
                        <td>GV00001</td>
                        <td>Nguyễn Văn A</td>
                        <td>Nam</td>
                        <td>Toán Lý Hóa</td>
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
                    <tr>
                        <td>GV00001</td>
                        <td>Nguyễn Văn A</td>
                        <td>Nam</td>
                        <td>Toán Lý Hóa</td>
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
                    <tr>
                        <td>GV00001</td>
                        <td>Nguyễn Văn A</td>
                        <td>Nam</td>
                        <td>Toán Lý Hóa</td>
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
                    {/* nếu không có giáo viên nào */}
                    {/* <tr>
                <td colspan="5" class="text-center">
                    Bạn chưa đăng khóa học nào.
                    <a href="/courses/create">Đăng khóa học</a>
                </td>
            </tr> */}
                </tbody>
            </table>
        </form>
    );
}

export default Table;
