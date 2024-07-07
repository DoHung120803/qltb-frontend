import { useLocation } from "react-router-dom";
import ThemGiaoVien from "../ThemGiaoVien";

function UpdateGiaoVien() {
    const teacherData = useLocation().state;

    return <ThemGiaoVien updateData={teacherData} title="Sửa Giáo Viên" />;
}

export default UpdateGiaoVien;
