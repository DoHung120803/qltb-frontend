import { useLocation } from "react-router-dom";
import ThemThietBi from "../ThemThietBi";

function UpdateThietBi() {
    const deviceData = useLocation().state;
    return <ThemThietBi updateData={deviceData} title="Sửa Thiết Bị" />;
}

export default UpdateThietBi;
