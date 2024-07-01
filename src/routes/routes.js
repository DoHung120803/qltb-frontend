import config from "~/config";
import DoanhMucGiaoVien from "~/pages/DoanhMucGiaoVien";

// Layouts
// import { HeaderOnly } from "~/layouts";

// Pages
import Home from "~/pages/Home";
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
    { path: config.routes.doanh_muc_giao_vien, component: DoanhMucGiaoVien },
];

export { privateRoutes };
