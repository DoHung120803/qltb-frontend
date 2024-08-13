import { useLocation } from "react-router-dom";
import ThemPhieuMuon from "../ThemPhieuMuon";
import { useState } from "react";

function UpdatePhieuMuon() {
    const data = useLocation().state;
    const [updateData, setUpdateData] = useState(data);

    return <ThemPhieuMuon updateDataMuon={updateData} />;
}

export default UpdatePhieuMuon;
