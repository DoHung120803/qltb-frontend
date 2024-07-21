import classNames from "classnames/bind";
import styles from "./DashBoard.module.scss";
import { DashboardIcon } from "~/components/Icons";
import { Link } from "react-router-dom";
import config from "~/config";

const cx = classNames.bind(styles);

function DashBoard({ children, onClick }) {
    return (
        <nav className={cx("dashboard", "col-12")}>
            <Link className={cx("dashboard-link")} to={config.routes.home}>
                <div className="mt-4" onClick={onClick}>
                    <span className={cx("dashboard-icon")}>
                        <DashboardIcon />
                    </span>
                    <span className={cx("dashboard-text")}>Dashboard</span>
                </div>
            </Link>

            {children}
        </nav>
    );
}

export default DashBoard;
