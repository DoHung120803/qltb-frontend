import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import {
    BaoCaoThongKeIcon,
    MenuIcon,
    QuanLyDoanhMucIcon,
    QuanLyMuonTraIcon,
    QuanLyThietBiIcon,
} from "~/components/Icons";
import DashBoard from "./DashBoard";
import DashBoardItem from "./DashBoard/DashBoardItem";

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx("wrapper", "col-2")}>
            <div className={cx("top-rectangle")}>
                <span className={cx("menu-icon", "col-12")}>
                    <MenuIcon />
                </span>
            </div>
            {/* <div className={cx("dashboard")}></div> */}
            <DashBoard>
                <DashBoardItem
                    icon={<QuanLyDoanhMucIcon />}
                    title="Quản lý danh mục"
                    // to={"/quan-ly-doanh-muc"}
                />
                <DashBoardItem
                    icon={<QuanLyThietBiIcon />}
                    title="Quản lý thiết bị"
                    // to={"/quan-ly-doanh-muc"}
                />
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
