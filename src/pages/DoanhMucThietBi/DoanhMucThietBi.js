import classNames from "classnames/bind";
import styles from "./DoanhMucThietBi.module.scss";

const cx = classNames.bind(styles);

function DoanhMucThietBi() {
    return (
        <div className={cx("wrapper", "col-11 mt-5")}>
            <h2>Quản lý danh mục</h2>
            <p>Quản lý danh mục &gt; Quản lý thiết bị</p>

            <div className="row m-0">
                <input
                    type="text"
                    className="col-lg-2 col-sm-6 mt-5"
                    placeholder="Nhập tên thiết bị"
                />
                <div
                    className={cx(
                        "add-btn",
                        "col-lg-2 col-sm-4 mt-5 text-center ms-auto"
                    )}
                >
                    Thêm thiết bị
                </div>
            </div>
        </div>
    );
}

export default DoanhMucThietBi;
