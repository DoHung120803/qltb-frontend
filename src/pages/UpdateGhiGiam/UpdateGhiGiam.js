import { useLocation } from "react-router-dom";
import GhiGiam from "../GhiGiam";
import { useState } from "react";

function UpdateGhiGiam() {
    const data = useLocation().state;
    const [updateData, setUpdateData] = useState(data);

    return <GhiGiam updateDataThanhLy={updateData} />;
}

export default UpdateGhiGiam;
