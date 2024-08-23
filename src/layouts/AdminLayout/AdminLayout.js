import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx("wrapper", "col-12 d-flex")}>
            <Sidebar />

            <div className={cx("col-10")}>
                <Header />
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default AdminLayout;
