import config from "~/config";
import DanhMucKhoPhong from "~/pages/DanhMucKhoPhong";
import DoanhMucGiaoVien from "~/pages/DoanhMucGiaoVien";
import DoanhMucThietBi from "~/pages/DoanhMucThietBi/DoanhMucThietBi";

// Layouts
// import { HeaderOnly } from "~/layouts";

// Pages
import Home from "~/pages/Home";
import ThemGiaoVien from "~/pages/ThemGiaoVien";
import ThemThietBi from "~/pages/ThemThietBi";
// import Following from "~/pages/Following";
// import Profile from "~/pages/Profile";
// import Upload from "~/pages/Upload";
// import Search from "~/pages/Search";
// import Live from "~/pages/Live";
// import AnimeList from "~/pages/AnimeStore";
// import Update from "~/pages/Update/Update";
// import AnimePlayer from "~/pages/AnimePlayer";
// import Login from "~/pages/Login";
// import Register from "~/pages/Register";

// Public routes
const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.danh_muc_giao_vien, component: DoanhMucGiaoVien },
    { path: config.routes.them_giao_vien, component: ThemGiaoVien },
    { path: config.routes.danh_muc_thiet_bi, component: DoanhMucThietBi },
    { path: config.routes.danh_muc_kho_phong, component: DanhMucKhoPhong },
    { path: config.routes.them_thiet_bi, component: ThemThietBi },
];

export { privateRoutes };
