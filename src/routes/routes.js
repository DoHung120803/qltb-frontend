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
import TangThietBi from "~/pages/TangThietBi";
import ThanhLyThietBi from "~/pages/ThanhLyThietBi";
import ThemGiaoVien from "~/pages/ThemGiaoVien";
import ThemThietBi from "~/pages/ThemThietBi";
import UpdateGiaoVien from "~/pages/UpdateGiaoVien/UpdateGiaoVien";
import UpdateThietBi from "~/pages/UpdateThietBi";
import KhaiBaoHongMat from "~/pages/KhaiBaoHongMat";
import TheoDoiHongMat from "~/pages/TheoDoiHongMat";
import UpdateGhiGiam from "~/pages/UpdateGhiGiam";
import Login from "~/pages/Login";
import DuyetTangTB from "~/pages/DuyetTangTB";
import BaoCaoThongKe from "~/pages/BaoCaoThongKe";
import UpdateHongMat from "~/pages/UpdateHongMat";

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
    { path: config.routes.tang_thiet_bi, component: TangThietBi },
    { path: config.routes.thanh_ly_thiet_bi, component: ThanhLyThietBi },
    { path: config.routes.khai_bao_hong_mat, component: KhaiBaoHongMat },
    { path: config.routes.theo_doi_hong_mat, component: TheoDoiHongMat },
    { path: config.routes.update_ghi_giam, component: UpdateGhiGiam },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.duyet_tang_tb, component: DuyetTangTB },
    { path: config.routes.bao_cao_thong_ke, component: BaoCaoThongKe },
    { path: config.routes.update_hong_mat, component: UpdateHongMat },
];

export { privateRoutes };
