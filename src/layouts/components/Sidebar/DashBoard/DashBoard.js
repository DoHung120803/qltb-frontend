import classNames from "classnames/bind";
import styles from "./DashBoard.module.scss";
import { DashboardIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function DashBoard({ children }) {
    return (
        <nav className={cx("dashboard")}>
            <div className="mt-4">
                <span className={cx("dashboard-icon")}>
                    <DashboardIcon />
                </span>
                <span className={cx("dashboard-text")}>DashBoard</span>
            </div>

            {children}
        </nav>
    );
}

export default DashBoard;
