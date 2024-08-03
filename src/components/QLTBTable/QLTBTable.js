import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import $ from "jquery";
import styles from "./QLTBTable.module.scss";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";
import * as jQueryUtils from "~/utils/jQueryUltis";

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
                   }) {
    const [khoOptions, setKhoOptions] = useState({});
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        if (!ghiGiamCustom) {
            return;
        }
        const ghiGiamTenTBSelectTags = jQueryUtils.getGhiGiamTenTBSelectTags();

        ghiGiamTenTBSelectTags.each((index, element) => {
            if (element.value) {
                fetchKhoOptions(element.value, index);
            }
        });
    }, []);

    const fetchKhoOptions = async (maNTB, _index) => {
        let endpoint = `/ds-thiet-bi/kho-phong/${maNTB}`;
        const response = await getServices.getKhoPhongs(endpoint);
        setKhoOptions((prev) => ({ ...prev, [_index]: response }));
        if (!dataTable[_index].maKP) {
            dataTable[_index].maKP = response[0].maKP;
        }
        if (!dataTable[_index].hong) {
            getDSTBByMaTBAndMaKP(maNTB, response[0].maKP, _index);
        }
        return response;
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

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

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
                                    if (field === "lyDoThanhLy") {
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
                                                        data[field] ||
                                                        "Thanh lý định kỳ"
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
                                            <td className="p-0" key={index}>
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
                                            <td className="p-0" key={index}>
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
                                                    className="p-0"
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
                                <td>
                                        <span
                                            className={cx("delete-btn")}
                                            onClick={() => handleDeleteRow(_index)}
                                        >
                                            x
                                        </span>
                                </td>
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
