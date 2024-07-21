import config from "~/config";
import ChonTBKB from "~/pages/ChonTBKB";
import DanhMucGiaoVien from "~/pages/DanhMucGiaoVien";
import DanhMucKhoPhong from "~/pages/DanhMucKhoPhong";
import DanhMucThietBi from "~/pages/DanhMucThietBi";
import DanhSachThietBi from "~/pages/DanhSachThietBi/DanhSachThietBi";
import GhiGiam from "~/pages/GhiGiam";
import GhiTang from "~/pages/GhiTang";

// Layouts
// import { HeaderOnly } from "~/layouts";

// Pages
import Home from "~/pages/Home";
import KhaiBaoThietBi from "~/pages/KhaiBaoThietBi";
import ThemGiaoVien from "~/pages/ThemGiaoVien";
import ThemThietBi from "~/pages/ThemThietBi";
import UpdateGiaoVien from "~/pages/UpdateGiaoVien/UpdateGiaoVien";
import UpdateThietBi from "~/pages/UpdateThietBi";

// private routes
const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.danh_muc_giao_vien, component: DanhMucGiaoVien },
    { path: config.routes.them_giao_vien, component: ThemGiaoVien },
    { path: config.routes.danh_muc_thiet_bi, component: DanhMucThietBi },
    { path: config.routes.danh_muc_kho_phong, component: DanhMucKhoPhong },
    { path: config.routes.them_thiet_bi, component: ThemThietBi },
    { path: config.routes.update_giao_vien, component: UpdateGiaoVien },
    { path: config.routes.update_thiet_bi, component: UpdateThietBi },
    { path: config.routes.danh_sach_thiet_bi, component: DanhSachThietBi },
    { path: config.routes.chon_thiet_bi_khai_bao, component: ChonTBKB },
    { path: config.routes.khai_bao_thiet_bi, component: KhaiBaoThietBi },
    { path: config.routes.ghi_giam, component: GhiGiam },
    { path: config.routes.ghi_tang, component: GhiTang },
];

export { privateRoutes };
