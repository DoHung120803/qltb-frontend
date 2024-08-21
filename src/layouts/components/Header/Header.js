import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./Header.module.scss";
import { AvatarIcon, CaretDownIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div
            className={cx(
                "wrapper",
                "container-fluid col-12 justify-content-end d-flex align-items-center"
            )}
        >
            <div className={cx("user-info", "col-lg-2")} onClick={toggleMenu}>
                <span>
                    <b>Admin</b>
                </span>
                <span className={cx("avatar")}>
                    <AvatarIcon />
                </span>
                <span>
                    <CaretDownIcon />
                </span>

                {isMenuOpen && (
                    <div className={cx("dropdown-menu")}>
                        <div className={cx("menu-item")}>Xem thông tin</div>
                        <div className={cx("menu-item")}>Đổi mật khẩu</div>
                        <div className={cx("menu-item")}>Đăng xuất</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
