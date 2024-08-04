import { useLocation } from "react-router-dom";
import ThemGiaoVien from "../ThemGiaoVien";
import { useState } from "react";

function UpdateGiaoVien() {
    const [teacherData, setTeacherData] = useState(useLocation().state);

    return <ThemGiaoVien updateData={teacherData} title="Sửa Giáo Viên" />;
}

export default UpdateGiaoVien;
