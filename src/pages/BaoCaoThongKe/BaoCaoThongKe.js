import classNames from "classnames/bind";
import styles from "./BaoCaoThongKe.module.scss";
import { useEffect, useState } from "react";
import * as createServices from "~/services/createServices";
import { useNavigate } from "react-router-dom";
import * as updateServices from "~/services/updateServices";
import config from "~/config";
import { baoCaoThongKe } from "~/services/getServices";
import saveAs from "file-saver";

const cx = classNames.bind(styles);

function BaoCaoThongKe({ updateData = false, title }) {
    const xlsx = require("xlsx");
    const ExcelJS = require("exceljs");

    const requestDefault = {
        option: "",
        tuNgay: new Date().toISOString().split("T")[0],
        denNgay: new Date().toISOString().split("T")[0],
    };

    const [request, setRequest] = useState(requestDefault);

    const navigator = useNavigate();

    useEffect(() => {
        console.log(updateData);
        if (updateData) {
            setRequest(updateData);
        }
    }, []);

    const handleChange = (e, field) => {
        setRequest((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!request.option) {
            alert("Chưa chọn báo cáo thống kê");
            return;
        }

        let response = null;

        if (request.option === "op1") {
            response = await baoCaoThongKe(request);
            op1(response);
            return;
        }

        if (request.option === "op2") {
            response = await baoCaoThongKe(request);
            op2(response);
            return;
        }

        if (request.option === "op3") {
            response = await baoCaoThongKe(request);
            op3(response);
            return;
        }

        if (request.option === "op4") {
            response = await baoCaoThongKe(request);
            op4(response);
            return;
        }

        if (request.option === "op5") {
            response = await baoCaoThongKe(request);
            op5(response);
            return;
        }

        if (request.option === "op6") {
            response = await baoCaoThongKe(request);
            op6(response);
            return;
        }

        if (request.option === "op7") {
            response = await baoCaoThongKe(request);
            op7(response);
            return;
        }
    };

    const tkslTBTheoNhomTB = (data) => {
        // Tạo một workbook mới
        const workbook = xlsx.utils.book_new();

        // Chuyển đổi mảng thành một worksheet với tiêu đề
        const array_data = [
            ["Mã NTB", "Tên NTB", "Số lượng"], // Tiêu đề cột
            ...data.map((item) => [item.maNTB, item.tenNTB, item.soLuong]), // Dữ liệu
        ];

        // Chuyển đổi mảng thành worksheet
        const worksheet = xlsx.utils.aoa_to_sheet(array_data);

        // Thêm worksheet vào workbook
        xlsx.utils.book_append_sheet(workbook, worksheet, "Thiết bị");

        // Ghi workbook vào file
        xlsx.writeFile(workbook, "Thống kê số lượng theo nhóm thiết bị.xlsx");

        console.log("Đã ghi dữ liệu vào file tksltheontb.xlsx");
    };

    const op7 = async (data) => {
        const spaceAdders = 0;
        // Tạo một workbook mới
        const wb = new ExcelJS.Workbook();

        // Tạo một worksheet mới cho thông tin thêm
        const infoSheet = wb.addWorksheet("Thông tin");

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([
            "",
            "STT",
            "Tên nhóm TB",
            "Số lượng mất",
            "Số lượng hỏng",
            "Số lượng tiêu hao",
        ]); // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        data.forEach((item, index) => {
            infoSheet.addRow([
                "",
                index + 1,
                item.tenNTB,
                item.soLuongMat,
                item.soLuongHong,
                item.soThietBiTieuHao,
            ]);
        });

        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        // infoSheet.addRow(["Nam Định, ngày 5 tháng 8 năm 2024"]);
        // infoSheet.addRow(["Người lập báo cáo"]);

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A" + (2 + spaceAdders)).value =
            "Phòng Giáo dục & Đào tạo huyện Xuân Trường";
        infoSheet.mergeCells(
            "A" + (2 + spaceAdders) + ":G" + (2 + spaceAdders)
        ); // Gộp ô từ A2 đến G2

        infoSheet.getCell("A" + (3 + spaceAdders)).value =
            "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells(
            "A" + (3 + spaceAdders) + ":G" + (3 + spaceAdders)
        ); // Gộp ô từ A3 đến G3

        infoSheet.getCell("A" + (5 + spaceAdders)).value =
            "Thống kê số lượng thiết bị hỏng, mất, tiêu hao";
        infoSheet.mergeCells(
            "A" + (5 + spaceAdders) + ":G" + (5 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 12}`
        ).value = `Nam Định, ngày ${new Date().getDate()} tháng ${new Date().getMonth()} năm ${new Date().getFullYear()}`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 12}:G${
                data.length + spaceAdders + 12
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 13}`
        ).value = `Người lập báo cáo`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 13}:G${
                data.length + spaceAdders + 13
            }`
        ); // Gộp ô từ A5 đến

        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).value = `Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 14}:G${
                data.length + spaceAdders + 14
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 15}`
        ).value = `Đặng Thu Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 15}:G${
                data.length + spaceAdders + 15
            }`
        ); // Gộp ô từ A5 đến

        // tổng cộng
        infoSheet.getCell(`B${data.length + 9}`).value = "Tổng cộng";
        infoSheet.mergeCells(`B${data.length + 9}:C${data.length + 9}`); // Gộp ô từ A5 đến

        // tổng số lượng
        infoSheet.getCell(`D${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.soLuongMat,
            0
        );

        // tổng số lượng dùng được
        infoSheet.getCell(`E${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.soLuongHong,
            0
        );

        // tổng số lượng hỏng
        infoSheet.getCell(`F${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.soThietBiTieuHao,
            0
        );

        // infoSheet.getCell('A6').value = "Mã NTB, Tên NTB, Số lượng";
        // infoSheet.mergeCells('A6:E6'); // Gộp ô từ A6 đến E6

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 2, row: data.length + 9 }, // tổng cộng
            //
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { bold: true, size: 14 };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        // tất cả mọi cột có width là 20
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const topBorder = { style: "thin" };
        const bottomBorder = { style: "thin" };
        const leftBorder = { style: "thin" };
        const rightBorder = { style: "thin" };
        const borderStyle = {
            top: topBorder,
            bottom: bottomBorder,
            left: leftBorder,
            right: rightBorder,
        };

        // viền
        for (let row = 8; row <= 8 + data.length + 1; row++) {
            // nếu có tổng cộng thì + 1
            for (
                let col = 2;
                col <= 1 + Object.keys(data[0]).length + 1;
                col++
            ) {
                // B = 2, G = 7
                const cell = infoSheet.getCell(row, col);
                cell.border = borderStyle;
            }
        }

        // Tạo buffer cho workbook và tải xuống
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "report.xlsx");
    };

    const op6 = async (data) => {
        if (data.length === 0) {
            alert("Không có dữ liệu nào trong khoảng thời gian này");
            return;
        }
        const spaceAdders = 0;
        // Tạo một workbook mới
        const wb = new ExcelJS.Workbook();

        // Tạo một worksheet mới cho thông tin thêm
        const infoSheet = wb.addWorksheet("Thông tin");

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([
            "",
            "STT",
            "Mã Cá Biệt TB",
            "Tên TB",
            "Nguời mượn",
            "Ngày mượn",
            "Ngày hẹn trả",
            "Quá hạn",
        ]); // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        data.forEach((item, index) => {
            infoSheet.addRow([
                "",
                index + 1,
                item.maCaBietTB,
                item.tenTB,
                item.nguoiMuon,
                item.ngayMuon,
                item.ngayHenTra,
                item.quaHan,
            ]);
        });

        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        // infoSheet.addRow(["Nam Định, ngày 5 tháng 8 năm 2024"]);
        // infoSheet.addRow(["Người lập báo cáo"]);

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A" + (2 + spaceAdders)).value =
            "Phòng Giáo dục & Đào tạo huyện Xuân Trường";
        infoSheet.mergeCells(
            "A" + (2 + spaceAdders) + ":I" + (2 + spaceAdders)
        ); // Gộp ô từ A2 đến G2

        infoSheet.getCell("A" + (3 + spaceAdders)).value =
            "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells(
            "A" + (3 + spaceAdders) + ":I" + (3 + spaceAdders)
        ); // Gộp ô từ A3 đến G3

        infoSheet.getCell("A" + (5 + spaceAdders)).value =
            "Báo cáo thiết bị mượn quá hạn";
        infoSheet.mergeCells(
            "A" + (5 + spaceAdders) + ":I" + (5 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            "A" + (6 + spaceAdders)
        ).value = `Thời gian: ${request.tuNgay} - ${request.denNgay}`;
        infoSheet.mergeCells(
            "A" + (6 + spaceAdders) + ":I" + (6 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 12}`
        ).value = `Nam Định, ngày ${new Date().getDate()} tháng ${new Date().getMonth()} năm ${new Date().getFullYear()}`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 12}:H${
                data.length + spaceAdders + 12
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 13}`
        ).value = `Người lập báo cáo`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 13}:H${
                data.length + spaceAdders + 13
            }`
        ); // Gộp ô từ A5 đến

        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).value = `Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 14}:H${
                data.length + spaceAdders + 14
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 15}`
        ).value = `Đặng Thu Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 15}:H${
                data.length + spaceAdders + 15
            }`
        ); // Gộp ô từ A5 đến

        // infoSheet.getCell('A6').value = "Mã NTB, Tên NTB, Số lượng";
        // infoSheet.mergeCells('A6:E6'); // Gộp ô từ A6 đến E6

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            //
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { bold: true, size: 14 };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        // tất cả mọi cột có width là 20
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const topBorder = { style: "thin" };
        const bottomBorder = { style: "thin" };
        const leftBorder = { style: "thin" };
        const rightBorder = { style: "thin" };
        const borderStyle = {
            top: topBorder,
            bottom: bottomBorder,
            left: leftBorder,
            right: rightBorder,
        };

        // viền
        for (let row = 8; row <= 8 + data.length; row++) {
            // nếu có tổng cộng thì + 1
            for (
                let col = 2;
                col <= 1 + Object.keys(data[0]).length + 1;
                col++
            ) {
                // nếu thêm cột thì + 1
                // B = 2, G = 7
                const cell = infoSheet.getCell(row, col);
                cell.border = borderStyle;
            }
        }

        // Tạo buffer cho workbook và tải xuống
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "report.xlsx");
    };

    const op5 = async (data) => {
        if (data.length === 0) {
            alert("Không có dữ liệu nào trong khoảng thời gian này");
            return;
        }
        const spaceAdders = 0;
        // Tạo một workbook mới
        const wb = new ExcelJS.Workbook();

        // Tạo một worksheet mới cho thông tin thêm
        const infoSheet = wb.addWorksheet("Thông tin");

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([
            "",
            "STT",
            "Mã Cá Biệt TB",
            "Tên TB",
            "Nguời mượn",
            "Ngày mượn",
            "Ngày hẹn trả",
        ]); // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        data.forEach((item, index) => {
            infoSheet.addRow([
                "",
                index + 1,
                item.maCaBietTB,
                item.tenTB,
                item.nguoiMuon,
                item.ngayMuon,
                item.ngayHenTra,
            ]);
        });

        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        // infoSheet.addRow(["Nam Định, ngày 5 tháng 8 năm 2024"]);
        // infoSheet.addRow(["Người lập báo cáo"]);

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A" + (2 + spaceAdders)).value =
            "Phòng Giáo dục & Đào tạo huyện Xuân Trường";
        infoSheet.mergeCells(
            "A" + (2 + spaceAdders) + ":H" + (2 + spaceAdders)
        ); // Gộp ô từ A2 đến G2

        infoSheet.getCell("A" + (3 + spaceAdders)).value =
            "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells(
            "A" + (3 + spaceAdders) + ":H" + (3 + spaceAdders)
        ); // Gộp ô từ A3 đến G3

        infoSheet.getCell("A" + (5 + spaceAdders)).value =
            "Báo cáo thiết bị đang mượn";
        infoSheet.mergeCells(
            "A" + (5 + spaceAdders) + ":H" + (5 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            "A" + (6 + spaceAdders)
        ).value = `Thời gian: ${request.tuNgay} - ${request.denNgay}`;
        infoSheet.mergeCells(
            "A" + (6 + spaceAdders) + ":H" + (6 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 12}`
        ).value = `Nam Định, ngày ${new Date().getDate()} tháng ${new Date().getMonth()} năm ${new Date().getFullYear()}`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 12}:G${
                data.length + spaceAdders + 12
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 13}`
        ).value = `Người lập báo cáo`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 13}:G${
                data.length + spaceAdders + 13
            }`
        ); // Gộp ô từ A5 đến

        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).value = `Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 14}:G${
                data.length + spaceAdders + 14
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 15}`
        ).value = `Đặng Thu Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 15}:G${
                data.length + spaceAdders + 15
            }`
        ); // Gộp ô từ A5 đến

        // infoSheet.getCell('A6').value = "Mã NTB, Tên NTB, Số lượng";
        // infoSheet.mergeCells('A6:E6'); // Gộp ô từ A6 đến E6

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            //
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { bold: true, size: 14 };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        // tất cả mọi cột có width là 20
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const topBorder = { style: "thin" };
        const bottomBorder = { style: "thin" };
        const leftBorder = { style: "thin" };
        const rightBorder = { style: "thin" };
        const borderStyle = {
            top: topBorder,
            bottom: bottomBorder,
            left: leftBorder,
            right: rightBorder,
        };

        // viền
        for (let row = 8; row <= 8 + data.length; row++) {
            // nếu có tổng cộng thì + 1
            for (
                let col = 2;
                col <= 1 + Object.keys(data[0]).length + 1;
                col++
            ) {
                // nếu thêm cột thì + 1
                // B = 2, G = 7
                const cell = infoSheet.getCell(row, col);
                cell.border = borderStyle;
            }
        }

        // Tạo buffer cho workbook và tải xuống
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "report.xlsx");
    };

    const op4 = async (data) => {
        if (data.length === 0) {
            alert("Không có dữ liệu nào trong khoảng thời gian này");
            return;
        }
        const spaceAdders = 0;
        // Tạo một workbook mới
        const wb = new ExcelJS.Workbook();

        // Tạo một worksheet mới cho thông tin thêm
        const infoSheet = wb.addWorksheet("Thông tin");

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([
            "",
            "STT",
            "Mã nhóm TB",
            "Tên nhóm TB",
            "Số lượt mượn",
        ]); // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        let currIndex = 9;
        let stt = 1;
        data.forEach((item, index) => {
            infoSheet.getCell("B" + currIndex).value =
                "Giáo Viên: " + item.tenGV;
            infoSheet.mergeCells("B" + currIndex + ":E" + currIndex);
            const cellTGV = infoSheet.getCell(currIndex, 2);
            cellTGV.font = { bold: true, color: { argb: "FF0000" } };
            cellTGV.alignment = { vertical: "middle", horizontal: "left" };
            item.thongTins.forEach((item2, index2) => {
                infoSheet.addRow([
                    "",
                    stt,
                    item2.maNTB,
                    item2.tenNTB,
                    item2.soLuotMuon,
                ]);
                stt++;
            });
            infoSheet.getCell(
                "B" + (currIndex + item.thongTins.length + 1)
            ).value = "Tổng Cộng";
            infoSheet.mergeCells(
                "B" +
                    (currIndex + item.thongTins.length + 1) +
                    ":D" +
                    (currIndex + item.thongTins.length + 1)
            );
            infoSheet.getCell(
                "E" + (currIndex + item.thongTins.length + 1)
            ).value = item.thongTins.reduce(
                (acc, item) => acc + item.soLuotMuon,
                0
            );
            const cell = infoSheet.getCell(
                currIndex + item.thongTins.length + 1,
                2
            );
            cell.font = { bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
            currIndex += item.thongTins.length + 1 + 1;
        });

        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        // infoSheet.addRow(["Nam Định, ngày 5 tháng 8 năm 2024"]);
        // infoSheet.addRow(["Người lập báo cáo"]);

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A" + (2 + spaceAdders)).value =
            "Phòng Giáo dục & Đào tạo huyện Xuân Trường";
        infoSheet.mergeCells(
            "A" + (2 + spaceAdders) + ":F" + (2 + spaceAdders)
        ); // Gộp ô từ A2 đến G2

        infoSheet.getCell("A" + (3 + spaceAdders)).value =
            "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells(
            "A" + (3 + spaceAdders) + ":F" + (3 + spaceAdders)
        ); // Gộp ô từ A3 đến G3

        infoSheet.getCell("A" + (5 + spaceAdders)).value =
            "Báo cáo tình hình mượn thiết bị của giáo viên";
        infoSheet.mergeCells(
            "A" + (5 + spaceAdders) + ":F" + (5 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            "A" + (6 + spaceAdders)
        ).value = `Thời gian: ${request.tuNgay} - ${request.denNgay}`;
        infoSheet.mergeCells(
            "A" + (6 + spaceAdders) + ":F" + (6 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        const allDataRows =
            data.reduce((acc, item) => acc + item.thongTins.length, 0) +
            data.length * 2;

        infoSheet.getCell(
            `E${allDataRows + spaceAdders + 12}`
        ).value = `Nam Định, ngày ${new Date().getDate()} tháng ${new Date().getMonth()} năm ${new Date().getFullYear()}`;
        infoSheet.mergeCells(
            `E${allDataRows + spaceAdders + 12}:G${
                allDataRows + spaceAdders + 12
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${allDataRows + spaceAdders + 13}`
        ).value = `Người lập báo cáo`;
        infoSheet.mergeCells(
            `E${allDataRows + spaceAdders + 13}:G${
                allDataRows + spaceAdders + 13
            }`
        ); // Gộp ô từ A5 đến

        infoSheet.getCell(`E${allDataRows + spaceAdders + 14}`).value = `Hiền`;
        infoSheet.mergeCells(
            `E${allDataRows + spaceAdders + 14}:G${
                allDataRows + spaceAdders + 14
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${allDataRows + spaceAdders + 15}`
        ).value = `Đặng Thu Hiền`;
        infoSheet.mergeCells(
            `E${allDataRows + spaceAdders + 15}:G${
                allDataRows + spaceAdders + 15
            }`
        ); // Gộp ô từ A5 đến

        // infoSheet.getCell('A6').value = "Mã NTB, Tên NTB, Số lượng";
        // infoSheet.mergeCells('A6:E6'); // Gộp ô từ A6 đến E6

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            // //
            { col: 5, row: allDataRows + 12 },
            { col: 5, row: allDataRows + 13 },
            { col: 5, row: allDataRows + 14 },
            { col: 5, row: allDataRows + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { bold: true, size: 14 };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        // tất cả mọi cột có width là 20
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const topBorder = { style: "thin" };
        const bottomBorder = { style: "thin" };
        const leftBorder = { style: "thin" };
        const rightBorder = { style: "thin" };
        const borderStyle = {
            top: topBorder,
            bottom: bottomBorder,
            left: leftBorder,
            right: rightBorder,
        };

        // viền
        for (let row = 8; row <= 8 + allDataRows; row++) {
            // nếu có tổng cộng thì + 1
            for (
                let col = 2;
                col <= 1 + Object.keys(data[0]).length + 2;
                col++
            ) {
                // nếu thêm cột thì + 1
                // B = 2, G = 7
                const cell = infoSheet.getCell(row, col);
                cell.border = borderStyle;
            }
        }

        // Tạo buffer cho workbook và tải xuống
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "report.xlsx");
    };

    const op3 = async (data) => {
        if (data.length === 0) {
            alert("Không có dữ liệu nào trong khoảng thời gian này");
            return;
        }
        const spaceAdders = Object.keys(data[0]).length - 4;
        // Tạo một workbook mới
        const wb = new ExcelJS.Workbook();

        // Tạo một worksheet mới cho thông tin thêm
        const infoSheet = wb.addWorksheet("Thông tin");

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([
            "",
            "STT",
            "Mã Cá Biệt TB",
            "Tên TB",
            "Ngày thanh lý",
            "Lý do thanh lý",
        ]); // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        data.forEach((item, index) => {
            infoSheet.addRow([
                "",
                index + 1,
                item.maCaBietTB,
                item.tenTB,
                item.ngayThanhLy,
                item.lyDoThanhLy,
            ]);
        });

        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        // infoSheet.addRow(["Nam Định, ngày 5 tháng 8 năm 2024"]);
        // infoSheet.addRow(["Người lập báo cáo"]);

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A" + (2 + spaceAdders)).value =
            "Phòng Giáo dục & Đào tạo huyện Xuân Trường";
        infoSheet.mergeCells(
            "A" + (2 + spaceAdders) + ":G" + (2 + spaceAdders)
        ); // Gộp ô từ A2 đến G2

        infoSheet.getCell("A" + (3 + spaceAdders)).value =
            "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells(
            "A" + (3 + spaceAdders) + ":G" + (3 + spaceAdders)
        ); // Gộp ô từ A3 đến G3

        infoSheet.getCell("A" + (5 + spaceAdders)).value =
            "Thống kê thiết bị thanh lý";
        infoSheet.mergeCells(
            "A" + (5 + spaceAdders) + ":G" + (5 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            "A" + (6 + spaceAdders)
        ).value = `Thời gian: ${request.tuNgay} - ${request.denNgay}`;
        infoSheet.mergeCells(
            "A" + (6 + spaceAdders) + ":G" + (6 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 12}`
        ).value = `Nam Định, ngày ${new Date().getDate()} tháng ${new Date().getMonth()} năm ${new Date().getFullYear()}`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 12}:G${
                data.length + spaceAdders + 12
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 13}`
        ).value = `Người lập báo cáo`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 13}:G${
                data.length + spaceAdders + 13
            }`
        ); // Gộp ô từ A5 đến

        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).value = `Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 14}:G${
                data.length + spaceAdders + 14
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 15}`
        ).value = `Đặng Thu Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 15}:G${
                data.length + spaceAdders + 15
            }`
        ); // Gộp ô từ A5 đến

        // infoSheet.getCell('A6').value = "Mã NTB, Tên NTB, Số lượng";
        // infoSheet.mergeCells('A6:E6'); // Gộp ô từ A6 đến E6

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            //
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { bold: true, size: 14 };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        // tất cả mọi cột có width là 20
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const topBorder = { style: "thin" };
        const bottomBorder = { style: "thin" };
        const leftBorder = { style: "thin" };
        const rightBorder = { style: "thin" };
        const borderStyle = {
            top: topBorder,
            bottom: bottomBorder,
            left: leftBorder,
            right: rightBorder,
        };

        // viền
        for (let row = 8; row <= 8 + data.length; row++) {
            // nếu có tổng cộng thì + 1
            for (
                let col = 2;
                col <= 1 + Object.keys(data[0]).length + 1;
                col++
            ) {
                // nếu thêm cột thì + 1
                // B = 2, G = 7
                const cell = infoSheet.getCell(row, col);
                cell.border = borderStyle;
            }
        }

        // Tạo buffer cho workbook và tải xuống
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "report.xlsx");
    };

    const op2 = async (data) => {
        if (data.length === 0) {
            alert("Không có dữ liệu nào trong khoảng thời gian này");
            return;
        }
        const spaceAdders = Object.keys(data[0]).length - 4;
        // Tạo một workbook mới
        const wb = new ExcelJS.Workbook();

        // Tạo một worksheet mới cho thông tin thêm
        const infoSheet = wb.addWorksheet("Thông tin");

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([
            "",
            "STT",
            "Tên NTB",
            "ĐVT",
            "Tổng số lượng tăng",
            "Tổng giá trị",
        ]); // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        data.forEach((item, index) => {
            infoSheet.addRow([
                "",
                index + 1,
                item.tenNTB,
                item.donViTinh,
                item.tongSoLuongTang,
                item.tongGiaTri,
            ]);
        });

        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        // infoSheet.addRow(["Nam Định, ngày 5 tháng 8 năm 2024"]);
        // infoSheet.addRow(["Người lập báo cáo"]);

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A" + (2 + spaceAdders)).value =
            "Phòng Giáo dục & Đào tạo huyện Xuân Trường";
        infoSheet.mergeCells(
            "A" + (2 + spaceAdders) + ":G" + (2 + spaceAdders)
        ); // Gộp ô từ A2 đến G2

        infoSheet.getCell("A" + (3 + spaceAdders)).value =
            "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells(
            "A" + (3 + spaceAdders) + ":G" + (3 + spaceAdders)
        ); // Gộp ô từ A3 đến G3

        infoSheet.getCell("A" + (5 + spaceAdders)).value =
            "Thống kê số lượng thiết bị tăng theo nhóm thiết bị";
        infoSheet.mergeCells(
            "A" + (5 + spaceAdders) + ":G" + (5 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            "A" + (6 + spaceAdders)
        ).value = `Thời gian: ${request.tuNgay} - ${request.denNgay}`;
        infoSheet.mergeCells(
            "A" + (6 + spaceAdders) + ":G" + (6 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 12}`
        ).value = `Nam Định, ngày ${new Date().getDate()} tháng ${new Date().getMonth()} năm ${new Date().getFullYear()}`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 12}:G${
                data.length + spaceAdders + 12
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 13}`
        ).value = `Người lập báo cáo`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 13}:G${
                data.length + spaceAdders + 13
            }`
        ); // Gộp ô từ A5 đến

        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).value = `Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 14}:G${
                data.length + spaceAdders + 14
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 15}`
        ).value = `Đặng Thu Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 15}:G${
                data.length + spaceAdders + 15
            }`
        ); // Gộp ô từ A5 đến

        // tổng cộng
        infoSheet.getCell(`B${data.length + 9}`).value = "Tổng cộng";
        infoSheet.mergeCells(`B${data.length + 9}:D${data.length + 9}`); // Gộp ô từ A5 đến

        // tổng số lượng tăng
        infoSheet.getCell(`E${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.tongSoLuongTang,
            0
        );

        // tổng giá trị
        infoSheet.getCell(`F${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.tongSoLuongTang * item.tongGiaTri,
            0
        );

        // infoSheet.getCell('A6').value = "Mã NTB, Tên NTB, Số lượng";
        // infoSheet.mergeCells('A6:E6'); // Gộp ô từ A6 đến E6

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 2, row: data.length + 9 }, // tổng cộng
            //
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { bold: true, size: 14 };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        // tất cả mọi cột có width là 20
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const topBorder = { style: "thin" };
        const bottomBorder = { style: "thin" };
        const leftBorder = { style: "thin" };
        const rightBorder = { style: "thin" };
        const borderStyle = {
            top: topBorder,
            bottom: bottomBorder,
            left: leftBorder,
            right: rightBorder,
        };

        // viền
        for (let row = 8; row <= 8 + data.length + 1; row++) {
            // nếu có tổng cộng thì + 1
            for (
                let col = 2;
                col <= 1 + Object.keys(data[0]).length + 1;
                col++
            ) {
                // nếu thêm cột thì + 1
                // B = 2, G = 7
                const cell = infoSheet.getCell(row, col);
                cell.border = borderStyle;
            }
        }

        // Tạo buffer cho workbook và tải xuống
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "report.xlsx");
    };

    const op1 = async (data) => {
        const spaceAdders = Object.keys(data[0]).length - 5;
        // Tạo một workbook mới
        const wb = new ExcelJS.Workbook();

        // Tạo một worksheet mới cho thông tin thêm
        const infoSheet = wb.addWorksheet("Thông tin");

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([
            "",
            "Mã NTB",
            "Tên NTB",
            "Tổng Số lượng",
            "Số TB dùng được",
            "Số thiết bị hỏng",
        ]); // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        data.forEach((item) => {
            infoSheet.addRow([
                "",
                item.maNTB,
                item.tenNTB,
                item.tongSoLuong,
                item.dungDuoc,
                item.hong,
            ]);
        });

        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        // infoSheet.addRow(["Nam Định, ngày 5 tháng 8 năm 2024"]);
        // infoSheet.addRow(["Người lập báo cáo"]);

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A" + (2 + spaceAdders)).value =
            "Phòng Giáo dục & Đào tạo huyện Xuân Trường";
        infoSheet.mergeCells(
            "A" + (2 + spaceAdders) + ":G" + (2 + spaceAdders)
        ); // Gộp ô từ A2 đến G2

        infoSheet.getCell("A" + (3 + spaceAdders)).value =
            "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells(
            "A" + (3 + spaceAdders) + ":G" + (3 + spaceAdders)
        ); // Gộp ô từ A3 đến G3

        infoSheet.getCell("A" + (5 + spaceAdders)).value =
            "Thống kê số lượng thiết bị theo nhóm thiết bị";
        infoSheet.mergeCells(
            "A" + (5 + spaceAdders) + ":G" + (5 + spaceAdders)
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 12}`
        ).value = `Nam Định, ngày ${new Date().getDate()} tháng ${new Date().getMonth()} năm ${new Date().getFullYear()}`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 12}:G${
                data.length + spaceAdders + 12
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 13}`
        ).value = `Người lập báo cáo`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 13}:G${
                data.length + spaceAdders + 13
            }`
        ); // Gộp ô từ A5 đến

        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).value = `Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 14}:G${
                data.length + spaceAdders + 14
            }`
        ); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + spaceAdders + 15}`
        ).value = `Đặng Thu Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 15}:G${
                data.length + spaceAdders + 15
            }`
        ); // Gộp ô từ A5 đến

        // tổng cộng
        infoSheet.getCell(`B${data.length + 9}`).value = "Tổng cộng";
        infoSheet.mergeCells(`B${data.length + 9}:C${data.length + 9}`); // Gộp ô từ A5 đến

        // tổng số lượng
        infoSheet.getCell(`D${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.tongSoLuong,
            0
        );

        // tổng số lượng dùng được
        infoSheet.getCell(`E${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.dungDuoc,
            0
        );

        // tổng số lượng hỏng
        infoSheet.getCell(`F${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.hong,
            0
        );

        // infoSheet.getCell('A6').value = "Mã NTB, Tên NTB, Số lượng";
        // infoSheet.mergeCells('A6:E6'); // Gộp ô từ A6 đến E6

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 2, row: data.length + 9 }, // tổng cộng
            //
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { bold: true, size: 14 };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        // tất cả mọi cột có width là 20
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const topBorder = { style: "thin" };
        const bottomBorder = { style: "thin" };
        const leftBorder = { style: "thin" };
        const rightBorder = { style: "thin" };
        const borderStyle = {
            top: topBorder,
            bottom: bottomBorder,
            left: leftBorder,
            right: rightBorder,
        };

        // viền
        for (let row = 8; row <= 8 + data.length + 1; row++) {
            // nếu có tổng cộng thì + 1
            for (let col = 2; col <= 1 + Object.keys(data[0]).length; col++) {
                // B = 2, G = 7
                const cell = infoSheet.getCell(row, col);
                cell.border = borderStyle;
            }
        }

        // Tạo buffer cho workbook và tải xuống
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "report.xlsx");
    };

    /*
    const excel = async (data) => {
        

        // Tạo một workbook mới
        const wb = new ExcelJS.Workbook();

        // Tạo một worksheet mới cho thông tin thêm
        const infoSheet = wb.addWorksheet("Thông tin");

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]);
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([
            "",
            "Mã NTB",
            "Tên NTB",
            "Tổng Số lượng",
            "Số TB dùng được",
            "Số thiết bị hỏng",
        ]); // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        data.forEach((item) => {
            infoSheet.addRow([
                "",
                item.maNTB,
                item.tenNTB,
                item.tongSoLuong,
                item.dungDuoc,
                item.hong,
            ]);
        });

        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        infoSheet.addRow([]); // Thêm hàng trống
        // infoSheet.addRow(["Nam Định, ngày 5 tháng 8 năm 2024"]);
        // infoSheet.addRow(["Người lập báo cáo"]);

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A2").value =
            "Phòng Giáo dục & Đào tạo huyện Xuân Trường";
        infoSheet.mergeCells("A2:G2"); // Gộp ô từ A2 đến G2

        infoSheet.getCell("A3").value = "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells("A3:G3"); // Gộp ô từ A3 đến G3

        infoSheet.getCell("A5").value =
            "Thống kê số lượng thiết bị theo nhóm thiết bị";
        infoSheet.mergeCells("A5:G5"); // Gộp ô từ A5 đến G5

        infoSheet.getCell(
            `E${data.length + 12}`
        ).value = `Nam Định, ngày ${new Date().getDate()} tháng ${new Date().getMonth()} năm ${new Date().getFullYear()}`;
        infoSheet.mergeCells(`E${data.length + 12}:G${data.length + 12}`); // Gộp ô từ A5 đến G5

        infoSheet.getCell(`E${data.length + 13}`).value = `Người lập báo cáo`;
        infoSheet.mergeCells(`E${data.length + 13}:G${data.length + 13}`); // Gộp ô từ A5 đến

        infoSheet.getCell(`E${data.length + 14}`).value = `Hiền`;
        infoSheet.mergeCells(`E${data.length + 14}:G${data.length + 14}`); // Gộp ô từ A5 đến G5

        infoSheet.getCell(`E${data.length + 15}`).value = `Đặng Thu Hiền`;
        infoSheet.mergeCells(`E${data.length + 15}:G${data.length + 15}`); // Gộp ô từ A5 đến

        // tổng cộng
        infoSheet.getCell(`B${data.length + 9}`).value = "Tổng cộng";
        infoSheet.mergeCells(`B${data.length + 9}:C${data.length + 9}`); // Gộp ô từ A5 đến

        // tổng số lượng
        infoSheet.getCell(`D${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.tongSoLuong,
            0
        );

        // tổng số lượng dùng được
        infoSheet.getCell(`E${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.dungDuoc,
            0
        );

        // tổng số lượng hỏng
        infoSheet.getCell(`F${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.hong,
            0
        );

        // infoSheet.getCell('A6').value = "Mã NTB, Tên NTB, Số lượng";
        // infoSheet.mergeCells('A6:E6'); // Gộp ô từ A6 đến E6

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 2, row: 2 },
            { col: 2, row: 3 },
            { col: 2, row: 5 },
            { col: 2, row: 6 },
            { col: 2, row: data.length + 9 }, // tổng cộng
            //
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { bold: true, size: 14 };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        // tất cả mọi cột có width là 20
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const topBorder = { style: "thin" };
        const bottomBorder = { style: "thin" };
        const leftBorder = { style: "thin" };
        const rightBorder = { style: "thin" };
        const borderStyle = {
            top: topBorder,
            bottom: bottomBorder,
            left: leftBorder,
            right: rightBorder,
        };

        // viền
        for (let row = 8; row <= 17; row++) {
            for (let col = 2; col <= 6; col++) {
                // B = 2, G = 7
                const cell = infoSheet.getCell(row, col);
                cell.border = borderStyle;
            }
        }

        // Tạo buffer cho workbook và tải xuống
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "report.xlsx");
    };
    */

    return (
        <div className={cx("wrapper", "col-lg-9 col-sm-12")}>
            <h1 className={cx("title")}>{title || "Báo cáo thống kê"}</h1>

            <div className="row">
                <span className="col-lg-12 col-md-12 mt-5 d-flex flex-column">
                    <label className="">Chọn báo cáo thống kê</label>
                    <select
                        value={request.option}
                        onChange={(e) => handleChange(e, "option")}
                    >
                        <option value="">--- Chọn báo cáo thống kê ---</option>
                        <option value="op1">
                            Thống kê số lượng thiết bị theo nhóm thiết bị
                        </option>
                        <option value="op2">
                            Thống kê thiết bị tăng theo nhóm thiết bị
                        </option>
                        <option value="op3">Thống kê thiết bị thanh lý</option>
                        <option value="op4">
                            Báo cáo tình hình mượn thiết bị của giáo viên (số
                            lượt mượn thiết bị)
                        </option>
                        <option value="op5">Báo cáo thiết bị đang mượn</option>
                        <option value="op6">
                            Báo cáo thiết bị mượn quá hạn
                        </option>
                        <option value="op7">
                            Báo cáo theo dõi hỏng, mất, tiêu hao
                        </option>
                    </select>
                </span>
                <span
                    style={{ fontSize: "2.5rem", fontWeight: "bold" }}
                    className="col-lg-12 col-md-12 mt-5 d-flex flex-column text-center"
                >
                    Điều kiện lọc
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Từ ngày</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.tuNgay}
                        onChange={(e) => handleChange(e, "tuNgay")}
                    />
                </span>
                <span className="col-lg-6 col-md-5 mt-5 d-flex flex-column">
                    <label className="">Đến ngày</label>
                    <input
                        className={cx("input")}
                        type="date"
                        value={request.denNgay}
                        onChange={(e) => handleChange(e, "denNgay")}
                    />
                </span>
            </div>
            <div className="row mt-5 gap-3 m-0">
                <div
                    className={cx(
                        "create-btn",
                        "col-2 d-flex align-items-center justify-content-center"
                    )}
                    onClick={handleSubmit}
                >
                    {updateData ? "Cập nhật" : "Xuất file"}
                </div>

                <div
                    className={cx(
                        "cancel-btn",
                        "col-2 col-2 d-flex align-items-center justify-content-center"
                    )}
                    onClick={() => {
                        setRequest(requestDefault);
                    }}
                >
                    Hủy
                </div>
            </div>
        </div>
    );
}

export default BaoCaoThongKe;
