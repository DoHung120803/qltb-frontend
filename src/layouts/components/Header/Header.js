import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { CaretDownIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function Header() {
    return (
        <div
            className={cx(
                "wrapper",
                "container-fluid col-12 justify-content-end d-flex align-items-center"
            )}
        >
            <div className={cx("user-info", "col-lg-2")}>
                <span>
                    <b>Admin</b>
                </span>
                <img
                    className={cx("avatar")}
                    alt="avatar"
                    src="https://freesvg.org/storage/img/thumb/abstract-user-flat-4.png"
                />
                <span>
                    <CaretDownIcon />
                </span>
            </div>
        </div>
    );
}

export default Header;
