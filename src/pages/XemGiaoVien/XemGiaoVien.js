import { useLocation } from "react-router-dom";
import ThemGiaoVien from "../ThemGiaoVien";

function XemGiaoVien() {
    const teacherData = useLocation().state;

    return <ThemGiaoVien updateData={teacherData} title="Thông tin giáo viên" viewOnly />;
}

export default XemGiaoVien;
