import { useLocation } from "react-router-dom";
import { useState } from "react";
import KhaiBaoHongMat from "../KhaiBaoHongMat";

function UpdateHongMat() {
    const data = useLocation().state;
    const [updateData, setUpdateData] = useState(data);

    return <KhaiBaoHongMat updateData={updateData} />;
}

export default UpdateHongMat;
