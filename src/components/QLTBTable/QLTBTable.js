import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import $ from "jquery";
import styles from "./QLTBTable.module.scss";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import * as jQueryUtils from "~/utils/jQueryUltis";
import { huyThanhLyTB } from "~/services/updateServices";

const cx = classNames.bind(styles);

function QLTBTable({
    devices = [],
    tableColumnsName = [],
    fields = [],
    dataTable = [],
    handleReload,
    setMerged,
    ghiGiamCustom,
    ghiTangCustom,
    from,
    updateDataThanhLy = false,
    view,
}) {
    // const [reRender, setReRender] = useState(false);
    const [khoOptions, setKhoOptions] = useState({}); // Quản lý options của kho cho mỗi
    const [reRender, setReRender] = useState(false);

    // fetch dữ liệu khi Thêm thiết bị và dán dữ liệu vào datatable tương ứng
    useEffect(() => {
        if (!ghiGiamCustom) {
            return;
        }
        const ghiGiamTenTBSelectTags = jQueryUtils.getGhiGiamTenTBSelectTags();
        // const ghiGiamKPSelectTags = jQueryUtils.getGhiGiamKPSelectTags();

        ghiGiamTenTBSelectTags.each((index, element) => {
            if (element.value) {
                fetchKhoOptions(element.value, index);
                // dataTable[index].maKP = ghiGiamKPSelectTags[index].value;
            }
        });
    }, []);

    // Hàm fetch dữ liệu kho chứa dựa vào maNTB
    const fetchKhoOptions = async (maNTB, _index) => {
        let endpoint = `/ds-thiet-bi/kho-phong/${maNTB}`; // thay đổi tùy từng component
        const response = await getServices.getKhoPhongs(endpoint);
        setKhoOptions((prev) => ({ ...prev, [_index]: response }));
        if (!dataTable[_index].maKP) {
            dataTable[_index].maKP = response[0].maKP;
        }
        if (!dataTable[_index].hong) {
            getDSTBByMaTBAndMaKP(maNTB, response[0].maKP, _index);
        }
        return response; // response là mảng các kho chứa mới fetch được
    };

    const handleChangeTenTB = async (maNTB, _index) => {
        const response = await fetchKhoOptions(maNTB, _index);
        dataTable[_index].maKP = response[0].maKP;
        getDSTBByMaTBAndMaKP(maNTB, response[0].maKP, _index);
    };

    const getDSTBByMaTBAndMaKP = async (maNTB, maKP, _index) => {
        const response = await getServices.getDSTBByMaTBAndMaKP(maNTB, maKP);
        dataTable[_index].hong = response.hong;
        dataTable[_index].conDungDuoc = response.soLuong - response.hong;
        setReRender(!reRender);
    };

    // // Hàm xử lý khi kho phòng thay đổi
    // const handleKhoChange = async (e, maNTB, rowIndex) => {
    //     const maKP = e.target.value;
    //     const response = await fetch(`/api/data/${maNTB}/${maKP}`);
    //     const newData = await response.json();
    //     // Cập nhật dữ liệu của dòng tương ứng trong dataTable
    //     const updatedDataTable = dataTable.map((item, index) => {
    //         if (index === rowIndex) {
    //             return { ...item, ...newData };
    //         }
    //         return item;
    //     });
    //     // Giả sử bạn có một hàm setState để cập nhật dataTable
    //     // setDataTable(updatedDataTable);
    // };

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const handleDelete = (index) => {
        if (view) {
            alert("Không thể xóa trong chế độ xem!");
            return;
        }
        dataTable.splice(index, 1);
        handleReload();
    };

    const huyThanhLyHandler = async (e, _index) => {
        e.preventDefault();
        if (
            // eslint-disable-next-line no-restricted-globals
            confirm(
                "Hành động này sẽ không thể hoàn tác.\nBạn có chắc muốn hủy thanh lý thiết bị này?"
            )
        ) {
            const response = await huyThanhLyTB(dataTable[_index].maCaBietTB);
            if (response?.status !== 200) {
                return alert("Có lỗi xảy ra. Hủy thanh lý không thành công!");
            }
            alert("Hủy thanh lý thành công!");
            dataTable.splice(_index, 1);
            handleReload();
        }
    };

    const handleDeleteRow = (index) => {
        const updatedDataTable = dataTable.filter((_, i) => i !== index);
        handleReload(updatedDataTable);
    };

    return (
        <div
            className={cx("chon-TBKB-custom", "p-0", {
                "ghi-giam-custom": ghiGiamCustom,
                "ghi-tang-custom": ghiTangCustom,
            })}
        >
            <form
                name="container-form"
                method="post"
                action="/courses/handle-form-actions"
                className={cx("mt-4 container-fluid p-0")}
            >
                <table className={cx("table-container", "table mt-5 col-12")}>
                    <thead>
                        <tr className="table-primary">
                            {tableColumnsName.map((columnName, index) => (
                                <th scope="col" key={index}>
                                    {columnName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((data, _index) => {
                            if (ghiGiamCustom) {
                                data.tongGiam = data.hong + data.conDungDuoc;
                            }
                            if (ghiTangCustom) {
                                data.thanhTienString = VND.format(
                                    data.donGia * data.soLuong
                                );
                            }
                            return (
                                <tr key={_index}>
                                    {fields.map((field, index) => {
                                        // if (field === "donViTinh") {
                                        //     return (
                                        //         <td key={index}>
                                        //             {data[field]}
                                        //         </td>
                                        //     );
                                        // }
                                        if (field === "lyDoTL") {
                                            return (
                                                <td
                                                    className="col-2 p-0"
                                                    key={index}
                                                >
                                                    <input
                                                        style={{
                                                            border: "none",
                                                        }}
                                                        type="text"
                                                        value={
                                                            data[field]
                                                        }
                                                        onChange={(e) => {
                                                            if (
                                                                updateDataThanhLy
                                                            ) {
                                                                return;
                                                            }
                                                            handleReload();
                                                            data[field] =
                                                                e.target.value;
                                                            setMerged(false);
                                                        }}
                                                    />
                                                </td>
                                            );
                                        }
                                        if (field === "tenTB") {
                                            return (
                                                <td
                                                    style={{
                                                        paddingLeft: "0",
                                                    }}
                                                    key={index}
                                                >
                                                    <select
                                                        style={{
                                                            border: "none",
                                                            paddingLeft: "1px",
                                                        }}
                                                        className={cx({
                                                            "ghi-giam-tenTB-select-tag":
                                                                ghiGiamCustom,
                                                        })}
                                                        onChange={(e) => {
                                                            data.maNTB =
                                                                e.target.value;
                                                            data.tenTB =
                                                                e.target.options[
                                                                    e.target.selectedIndex
                                                                ].text;
                                                            if (ghiTangCustom) {
                                                                data.donViTinh =
                                                                    devices.find(
                                                                        (
                                                                            device
                                                                        ) =>
                                                                            device.maNTB ===
                                                                            data.maNTB
                                                                    ).donViTinh;
                                                            }
                                                            if (ghiGiamCustom) {
                                                                handleChangeTenTB(
                                                                    e.target
                                                                        .value,
                                                                    _index
                                                                );
                                                            }
                                                            handleReload();
                                                            setMerged(false);
                                                        }}
                                                    >
                                                        {Object.keys(data)
                                                            .length > 0 &&
                                                        Object.keys(
                                                            data
                                                        ).includes("tenTB") ? (
                                                            <option
                                                                value={
                                                                    //data.tenTB
                                                                    data.maNTB
                                                                }
                                                            >
                                                                {data.tenTB}
                                                            </option>
                                                        ) : (
                                                            <option value="">
                                                                Chọn thiết bị
                                                            </option>
                                                        )}
                                                        {devices.map(
                                                            (device, index) => {
                                                                if (
                                                                    Object.keys(
                                                                        data
                                                                    ).length >
                                                                        0 &&
                                                                    device.maNTB ===
                                                                        data.maNTB
                                                                ) {
                                                                    return false;
                                                                }
                                                                return (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            device.maNTB
                                                                        }
                                                                    >
                                                                        {
                                                                            device.tenTB
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                </td>
                                            );
                                        }
                                        if (
                                            field === "soLuong" ||
                                            field === "hong" ||
                                            field === "conDungDuoc" ||
                                            field === "donGia"
                                        ) {
                                            return (
                                                <td className="" key={index}>
                                                    <input
                                                        style={{
                                                            border: "none",
                                                        }}
                                                        type="number"
                                                        min={1}
                                                        value={data[field]}
                                                        onChange={(e) => {
                                                            handleReload();
                                                            data[field] =
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                );
                                                            setMerged(false);
                                                        }}
                                                    />
                                                </td>
                                            );
                                        }
                                        if (
                                            field === "ngayNhap" ||
                                            field === "hanSuDung"
                                        ) {
                                            return (
                                                <td className="" key={index}>
                                                    <input
                                                        style={{
                                                            border: "none",
                                                        }}
                                                        type="date"
                                                        min={1}
                                                        value={
                                                            data[field] ||
                                                            new Date()
                                                                .toISOString()
                                                                .split("T")[0]
                                                        }
                                                        onChange={(e) => {
                                                            handleReload();
                                                            data[field] =
                                                                e.target.value;

                                                            setMerged(false);
                                                        }}
                                                    />
                                                </td>
                                            );
                                        }

                                        if (field === "maKP") {
                                            if (ghiGiamCustom) {
                                                return (
                                                    <td
                                                        style={{
                                                            paddingLeft: "0",
                                                        }}
                                                        key={index}
                                                        className="p-0"
                                                    >
                                                        <select
                                                            value={data[field]}
                                                            className={cx({
                                                                "ghi-giam-KP-select-tag":
                                                                    ghiGiamCustom,
                                                            })}
                                                            onChange={(e) => {
                                                                data.maKP =
                                                                    e.target.value;
                                                                getDSTBByMaTBAndMaKP(
                                                                    data.maNTB,
                                                                    data.maKP,
                                                                    _index
                                                                );
                                                                setMerged(
                                                                    false
                                                                );
                                                                handleReload();
                                                            }}
                                                            style={{
                                                                border: "none",
                                                                paddingLeft:
                                                                    "1px",
                                                            }}
                                                        >
                                                            {khoOptions[
                                                                _index
                                                            ]?.map((kho) => (
                                                                <option
                                                                    key={
                                                                        kho.maKP
                                                                    }
                                                                    value={
                                                                        kho.maKP
                                                                    }
                                                                >
                                                                    {kho.tenKP}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                );
                                            } else {
                                                return (
                                                    <td
                                                        style={{
                                                            paddingLeft: "0",
                                                        }}
                                                        key={index}
                                                        className=""
                                                    >
                                                        <select
                                                            style={{
                                                                border: "none",
                                                                paddingLeft:
                                                                    "1px",
                                                            }}
                                                            value={
                                                                data[field] ||
                                                                "KP00001"
                                                            }
                                                            onChange={(e) => {
                                                                data[field] =
                                                                    e.target.value;
                                                                handleReload();
                                                                setMerged(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            <option value="KP00001">
                                                                Kho A
                                                            </option>
                                                            <option value="KP00002">
                                                                Kho B
                                                            </option>
                                                            <option value="KP00003">
                                                                Kho C
                                                            </option>
                                                        </select>
                                                    </td>
                                                );
                                            }
                                        }
                                        return (
                                            <td key={index}>{data[[field]]}</td>
                                        );
                                    })}
                                    {updateDataThanhLy ? (
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={(e) =>
                                                    huyThanhLyHandler(e, _index)
                                                }
                                            >
                                                Hủy thanh lý
                                            </button>
                                        </td>
                                    ) : (
                                        <td>
                                            <span
                                                onClick={handleDelete}
                                                className={cx("delete-btn")}
                                            >
                                                x
                                            </span>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}

                        {dataTable.length === 0 && (
                            <tr>
                                <td
                                    colSpan={fields.length + 1}
                                    className="text-center"
                                >
                                    {"Không có có dữ liệu!"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default QLTBTable;
