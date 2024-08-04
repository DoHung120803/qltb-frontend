import { useState } from "react";
import { useLocation } from "react-router-dom";
import GhiTang from "../GhiTang";

function DuyetTangTB() {
    const [duyetTangTBData, setDuyetTangTBData] = useState(useLocation().state);
    console.log(duyetTangTBData);
    return <GhiTang duyetTangTBData={duyetTangTBData} />;
}

export default DuyetTangTB;
