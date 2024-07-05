import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import {
    MenuIcon,
    QuanLyDoanhMucIcon,
    QuanLyMuonTraIcon,
    QuanLyThietBiIcon,
} from "~/components/Icons";
import DashBoard from "./DashBoard";
import DashBoardItem from "./DashBoard/DashBoardItem";
import config from "~/config";
import { useState } from "react";

const cx = classNames.bind(styles);

function Sidebar() {
    const [selected, setSelected] = useState(false);

    const handleSelected = (title) => {
        setSelected(title);
    };

    return (
        <aside className={cx("wrapper", "col-2")}>
            <div className={cx("top-rectangle")}>
                <span className={cx("menu-icon", "col-12")}>
                    <MenuIcon />
                </span>
            </div>
            {/* <div className={cx("dashboard")}></div> */}
            <DashBoard onClick={() => handleSelected("")}>
                <DashBoardItem
                    icon={<QuanLyDoanhMucIcon />}
                    title="Quản lý danh mục"
                    more=">"
                    selected={selected}
                    handleSelected={handleSelected}
                >
                    <DashBoardItem
                        icon={<QuanLyDoanhMucIcon />}
                        title="Danh mục giáo viên"
                        subItem
                        to={config.routes.danh_muc_giao_vien}
                        selected={selected}
                        handleSelected={handleSelected}
                    />
                    <DashBoardItem
                        icon={<QuanLyDoanhMucIcon />}
                        title="Doanh mục thiết bị"
                        subItem
                        to={config.routes.danh_muc_thiet_bi}
                        selected={selected}
                        handleSelected={handleSelected}
                    />
                    <DashBoardItem
                        icon={<QuanLyDoanhMucIcon />}
                        title="Doanh mục kho phòng"
                        subItem
                        to={config.routes.danh_muc_kho_phong}
                    />
                </DashBoardItem>

                <DashBoardItem
                    icon={<QuanLyThietBiIcon />}
                    title="Quản lý thiết bị"
                    // to={"/quan-ly-doanh-muc"}
                    more=">"
                    selected={selected}
                    handleSelected={handleSelected}
                >
                    <DashBoardItem
                        icon={<QuanLyDoanhMucIcon />}
                        title="Danh sách thiết bị"
                        subItem
                        to={config.routes.danh_muc_giao_vien}
                        selected={selected}
                        handleSelected={handleSelected}
                    />
                    <DashBoardItem
                        icon={<QuanLyDoanhMucIcon />}
                        title="Tăng thiết bị"
                        subItem
                        selected={selected}
                        handleSelected={handleSelected}
                    />
                    <DashBoardItem
                        icon={<QuanLyDoanhMucIcon />}
                        title="Giảm thiết bị"
                        subItem
                        selected={selected}
                        handleSelected={handleSelected}
                    />
                    <DashBoardItem
                        icon={<QuanLyDoanhMucIcon />}
                        title="Theo dõi hỏng mất"
                        subItem
                        to={config.routes.danh_muc_giao_vien}
                        selected={selected}
                        handleSelected={handleSelected}
                    />
                    <DashBoardItem
                        icon={<QuanLyDoanhMucIcon />}
                        title="Kiểm kê"
                        subItem
                        selected={selected}
                        handleSelected={handleSelected}
                    />
                    <DashBoardItem
                        icon={<QuanLyDoanhMucIcon />}
                        title="Thanh lý thiết bị"
                        subItem
                    />
                </DashBoardItem>
                <DashBoardItem
                    icon={<QuanLyMuonTraIcon />}
                    title="Quản lý mượn trả"
                    // to={"/quan-ly-doanh-muc"}
                />
                <DashBoardItem
                    icon={<QuanLyDoanhMucIcon />}
                    title="Báo cáo thống kê"
                    // to={"/quan-ly-doanh-muc"}
                />
            </DashBoard>
        </aside>
    );
}

export default Sidebar;
