import config from "~/config";
import DanhMucGiaoVien from "~/pages/DanhMucGiaoVien";
import DanhMucKhoPhong from "~/pages/DanhMucKhoPhong";
import DanhMucThietBi from "~/pages/DanhMucThietBi";
import Home from "~/pages/Home";
import ThemGiaoVien from "~/pages/ThemGiaoVien";
import ThemThietBi from "~/pages/ThemThietBi";
import UpdateGiaoVien from "~/pages/UpdateGiaoVien/UpdateGiaoVien";
import UpdateThietBi from "~/pages/UpdateThietBi";
import XemGiaoVien from "~/pages/XemGiaoVien";

// private routes
const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.danh_muc_giao_vien, component: DanhMucGiaoVien },
    { path: config.routes.them_giao_vien, component: ThemGiaoVien },
    { path: config.routes.xem_giao_vien, component: XemGiaoVien }, // Thêm dòng này
    { path: config.routes.danh_muc_thiet_bi, component: DanhMucThietBi },
    { path: config.routes.danh_muc_kho_phong, component: DanhMucKhoPhong },
    { path: config.routes.them_thiet_bi, component: ThemThietBi },
    { path: config.routes.update_giao_vien, component: UpdateGiaoVien },
    { path: config.routes.update_thiet_bi, component: UpdateThietBi },
];

export { privateRoutes };
