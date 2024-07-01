import classNames from "classnames/bind";
import styles from "./DoanhMucGiaoVien.module.scss";

const cx = classNames.bind(styles);

function DoanhMucGiaoVien() {
    return (
        <div className={cx("wrapper", "col-11 mt-5")}>
            <h2>Quản lý danh mục</h2>
            <p>Quản lý danh mục &gt; Quản lý giáo viên</p>

            <div className="row m-0">
                <input
                    type="text"
                    className="col-lg-2 col-sm-6 mt-5"
                    placeholder="Nhập tên giáo viên"
                />
                <div
                    className={cx(
                        "add-btn",
                        "col-lg-2 col-sm-4 mt-5 text-center ms-auto"
                    )}
                >
                    Thêm giáo viên
                </div>
            </div>
        </div>
    );
}

export default DoanhMucGiaoVien;
