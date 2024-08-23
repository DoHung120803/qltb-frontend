import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { AvatarIcon, CaretDownIcon } from "~/components/Icons";
import config from "~/config";

const cx = classNames.bind(styles);

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const navigate = useNavigate();

    // Toggle the dropdown menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle logout logic
    const handleLogout = () => {
        // Remove token and user information from localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        navigate(config.routes.login);
    };

    // Close the modal
    const closeModal = () => {
        setIsLogoutModalOpen(false);
    };

    // Open the logout confirmation modal
    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
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
                        <Link to={config.routes.infor_giao_vien} className={cx("menu-item")}>
                            Xem thông tin
                        </Link>
                        <div className={cx("menu-item")}>
                            <Link
                                to={config.routes.change_password}
                                style={{color: "#2c3e50", textDecoration: "none"}}
                            >
                                Đổi mật khẩu
                            </Link>
                        </div>

                        <div
                            className={cx("menu-item")}
                            onClick={openLogoutModal}
                        >
                            Đăng xuất
                        </div>
                    </div>
                )}
            </div>

            {/* Modal xác nhận đăng xuất */}
            {isLogoutModalOpen && (
                <div className={cx("modal")}>
                    <div className={cx("modal-content")}>
                        <h2>Xác nhận đăng xuất</h2>
                        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
                        <button onClick={handleLogout} className={cx("confirm-btn")}>
                            Có
                        </button>
                        <button
                            onClick={closeModal}
                            className={cx("cancel-btn")}
                        >
                            Không
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
