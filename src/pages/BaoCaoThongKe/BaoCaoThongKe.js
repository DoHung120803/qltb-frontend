import classNames from "classnames/bind";
import styles from "./BaoCaoThongKe.module.scss";
import { useEffect, useState } from "react";
import * as createServices from "~/services/createServices";
import { useNavigate } from "react-router-dom";
import * as updateServices from "~/services/updateServices";
import config from "~/config";
import { baoCaoKiemKeTB, baoCaoThongKe } from "~/services/getServices";
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

    const [requestOp8, setRequestOp8] = useState({
        tuNgay: new Date().toISOString().split("T")[0],
        denNgay: new Date().toISOString().split("T")[0],
        dangHoatDong: true,
        dungDuoc: true,
        hong: true,
        mat: true,
    });

    const navigator = useNavigate();

    useEffect(() => {
        console.log(updateData);
        if (updateData) {
            setRequest(updateData);
        }
    }, []);

    const handleChange = (e, field) => {
        if (
            field === "dangHoatDong" ||
            field === "dungDuoc" ||
            field === "hong" ||
            field === "mat"
        ) {
            setRequestOp8((prev) => ({ ...prev, [field]: e.target.checked }));
            return;
        }

        setRequest((prev) => ({ ...prev, [field]: e.target.value }));
    };

    console.log(requestOp8);

    const baoCaoKiemKe = async () => {
        const response = await baoCaoKiemKeTB(requestOp8);
        op8(response);
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

        if (request.option === "op8") {
            baoCaoKiemKe();
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

    const op8 = async (data) => {
        if (data.length === 0) {
            alert("Không có dữ liệu nào trong khoảng thời gian này");
            return;
        }

        const wb = new ExcelJS.Workbook();
        const infoSheet = wb.addWorksheet("Thông tin");

        // Định nghĩa font chữ chung
        const commonFont = { name: 'Times New Roman', size: 12 };

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([
            "",
            "STT",
            "Mã nhóm thiết bị",
            "Mã cá biệt thiết bị",
            "Tên thiết bị",
            "Kho/Phòng",
            "Trạng thái",
            "Tình trạng sử dụng",
            "Đang hoạt động",
        ]).font = commonFont; // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        data.forEach((item, index) => {
            infoSheet.addRow([
                "",
                index + 1,
                item.maNTB,
                item.maCaBietTB,
                item.tenNTB,
                item.khoPhong,
                item.trangThai,
                item.tinhTrang,
                item.dangHoatDong ? "Có" : "Không",
            ]).font = commonFont;
        });

        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A2").value = "Phòng Giáo dục & Đào tạo Huyện Xuân Trường";
        infoSheet.mergeCells("A2:I2");
        infoSheet.getCell("A2").font = { ...commonFont, bold: true };
        infoSheet.getCell("A2").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A3").value = "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells("A3:I3");
        infoSheet.getCell("A3").font = { ...commonFont, bold: true };
        infoSheet.getCell("A3").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A5").value = "Báo cáo kiểm kê thiết bị";
        infoSheet.mergeCells("A5:I5");
        infoSheet.getCell("A5").font = { ...commonFont, bold: true };
        infoSheet.getCell("A5").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.mergeCells("A6:I6");
        infoSheet.getCell("A6").font = commonFont;
        infoSheet.getCell("A6").alignment = { vertical: "middle", horizontal: "center" };

        const currentDate = new Date();
        infoSheet.getCell(`E${data.length + 12}`).value = `Nam Định, ngày ${currentDate.getDate()} tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`;
        infoSheet.mergeCells(`E${data.length + 12}:H${data.length + 12}`);
        infoSheet.getCell(`E${data.length + 12}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 12}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 13}`).value = `Người lập báo cáo`;
        infoSheet.mergeCells(`E${data.length + 13}:H${data.length + 13}`);
        infoSheet.getCell(`E${data.length + 13}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 13}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 14}`).value = `Hiền`;
        infoSheet.mergeCells(`E${data.length + 14}:H${data.length + 14}`);
        infoSheet.getCell(`E${data.length + 14}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 14}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 15}`).value = `Đặng Thị Thu Hiền`;
        infoSheet.mergeCells(`E${data.length + 15}:H${data.length + 15}`);
        infoSheet.getCell(`E${data.length + 15}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 15}`).alignment = { vertical: "middle", horizontal: "center" };

        // Định dạng in đậm và căn giữa cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { ...commonFont, bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const borderStyle = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        };

        // Thêm viền cho bảng dữ liệu
        for (let row = 8; row <= 8 + data.length; row++) {
            for (let col = 2; col <= 9; col++) {
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
    const op7 = async (data) => {
        if (data.length === 0) {
            alert("Không có dữ liệu nào trong khoảng thời gian này");
            return;
        }

        const wb = new ExcelJS.Workbook();
        const infoSheet = wb.addWorksheet("Thông tin");

        // Định nghĩa font chữ chung
        const commonFont = { name: 'Times New Roman', size: 12 };

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([
            "",
            "STT",
            "Tên nhóm thiết bị",
            "Số lượng mất",
            "Số lượng hỏng",
            "Số lượng tiêu hao",
        ]).font = commonFont; // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        data.forEach((item, index) => {
            infoSheet.addRow([
                "",
                index + 1,
                item.tenNTB,
                item.soLuongMat,
                item.soLuongHong,
                item.soThietBiTieuHao,
            ]).font = commonFont;
        });

        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A2").value = "Phòng Giáo dục & Đào tạo Huyện Xuân Trường";
        infoSheet.mergeCells("A2:G2");
        infoSheet.getCell("A2").font = { ...commonFont, bold: true };
        infoSheet.getCell("A2").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A3").value = "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells("A3:G3");
        infoSheet.getCell("A3").font = { ...commonFont, bold: true };
        infoSheet.getCell("A3").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A5").value = "Thống kê số lượng thiết bị hỏng, mất, tiêu hao";
        infoSheet.mergeCells("A5:G5");
        infoSheet.getCell("A5").font = { ...commonFont, bold: true };
        infoSheet.getCell("A5").alignment = { vertical: "middle", horizontal: "center" };

        const currentDate = new Date();
        infoSheet.getCell(`E${data.length + 12}`).value = `Nam Định, ngày ${currentDate.getDate()} tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`;
        infoSheet.mergeCells(`E${data.length + 12}:G${data.length + 12}`);
        infoSheet.getCell(`E${data.length + 12}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 12}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 13}`).value = `Người lập báo cáo`;
        infoSheet.mergeCells(`E${data.length + 13}:G${data.length + 13}`);
        infoSheet.getCell(`E${data.length + 13}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 13}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 14}`).value = `Hiền`;
        infoSheet.mergeCells(`E${data.length + 14}:G${data.length + 14}`);
        infoSheet.getCell(`E${data.length + 14}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 14}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 15}`).value = `Đặng Thị Thu Hiền`;
        infoSheet.mergeCells(`E${data.length + 15}:G${data.length + 15}`);
        infoSheet.getCell(`E${data.length + 15}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 15}`).alignment = { vertical: "middle", horizontal: "center" };

        // Định dạng in đậm và căn giữa cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 2, row: data.length + 9 },
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { ...commonFont, bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const borderStyle = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        };

        // Thêm viền cho bảng dữ liệu
        for (let row = 8; row <= 8 + data.length + 1; row++) {
            for (let col = 2; col <= 6; col++) {
                const cell = infoSheet.getCell(row, col);
                cell.border = borderStyle;
            }
        }

        // Tính toán tổng số lượng
        infoSheet.getCell(`B${data.length + 9}`).value = "Tổng cộng";
        infoSheet.mergeCells(`B${data.length + 9}:C${data.length + 9}`);
        infoSheet.getCell(`B${data.length + 9}`).font = { ...commonFont, bold: true };
        infoSheet.getCell(`B${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`D${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.soLuongMat,
            0
        ).toString();
        infoSheet.getCell(`D${data.length + 9}`).font = commonFont;
        infoSheet.getCell(`D${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.soLuongHong,
            0
        ).toString();
        infoSheet.getCell(`E${data.length + 9}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`F${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.soThietBiTieuHao,
            0
        ).toString();
        infoSheet.getCell(`F${data.length + 9}`).font = commonFont;
        infoSheet.getCell(`F${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

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

        // Define currentDate at the beginning of the function
        const currentDate = new Date();

        const wb = new ExcelJS.Workbook();
        const infoSheet = wb.addWorksheet("Thông tin");

        // Định nghĩa font chữ chung
        const commonFont = { name: 'Times New Roman', size: 12 };

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([
            "",
            "STT",
            "Mã Cá Biệt Thiết Bị",
            "Tên Thiết Bị",
            "Người Mượn",
            "Ngày Mượn",
            "Ngày Hẹn Trả",
            "Số Ngày Quá Hạn",
        ]).font = { ...commonFont, bold: true }; // Tiêu đề cột

        // Thêm dữ liệu vào worksheet
        data.forEach((item, index) => {
            const ngayHenTra = new Date(item.ngayHenTra);
            const daysOverdue = Math.max(0, Math.ceil((currentDate - ngayHenTra) / (1000 * 60 * 60 * 24)));

            infoSheet.addRow([
                "",
                index + 1,
                item.maCaBietTB,
                item.tenTB,
                item.nguoiMuon,
                item.ngayMuon,
                item.ngayHenTra,
                daysOverdue > 0 ? daysOverdue : "Không",
            ]).font = commonFont;
        });

        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A2").value = "Phòng Giáo dục & Đào tạo huyện Xuân Trường";
        infoSheet.mergeCells("A2:I2");
        infoSheet.getCell("A2").font = { ...commonFont, bold: true };
        infoSheet.getCell("A2").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A3").value = "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells("A3:I3");
        infoSheet.getCell("A3").font = { ...commonFont, bold: true };
        infoSheet.getCell("A3").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A5").value = "Báo cáo thiết bị mượn quá hạn";
        infoSheet.mergeCells("A5:I5");
        infoSheet.getCell("A5").font = { ...commonFont, bold: true };
        infoSheet.getCell("A5").alignment = { vertical: "middle", horizontal: "center" };

        // Sử dụng currentDate để điền thông tin ngày tháng
        infoSheet.getCell(`E${data.length + 12}`).value = `Nam Định, ngày ${currentDate.getDate()} tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`;
        infoSheet.mergeCells(`E${data.length + 12}:H${data.length + 12}`);
        infoSheet.getCell(`E${data.length + 12}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 12}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 13}`).value = `Người lập báo cáo`;
        infoSheet.mergeCells(`E${data.length + 13}:H${data.length + 13}`);
        infoSheet.getCell(`E${data.length + 13}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 13}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 14}`).value = `Hiền`;
        infoSheet.mergeCells(`E${data.length + 14}:H${data.length + 14}`);
        infoSheet.getCell(`E${data.length + 14}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 14}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 15}`).value = `Đặng Thị Thu Hiền`;
        infoSheet.mergeCells(`E${data.length + 15}:H${data.length + 15}`);
        infoSheet.getCell(`E${data.length + 15}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 15}`).alignment = { vertical: "middle", horizontal: "center" };

        // Định dạng in đậm và căn giữa cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { ...commonFont, bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const borderStyle = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        };

        // Thêm viền cho bảng dữ liệu
        for (let row = 8; row <= 8 + data.length; row++) {
            for (let col = 2; col <= 8; col++) {
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

        const wb = new ExcelJS.Workbook();
        const infoSheet = wb.addWorksheet("Thông tin");

        // Định nghĩa font chữ chung
        const commonFont = { name: 'Times New Roman', size: 12 };

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([
            "",
            "STT",
            "Mã Cá Biệt Thiết Bị",
            "Tên Thiết Bị",
            "Người Mượn",
            "Ngày Mượn",
            "Ngày Hẹn Trả",
        ]).font = { ...commonFont, bold: true }; // Tiêu đề cột

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
            ]).font = commonFont;
        });

        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A2").value = "Phòng Giáo dục & Đào tạo Huyện Xuân Trường";
        infoSheet.mergeCells("A2:H2");
        infoSheet.getCell("A2").font = { ...commonFont, bold: true };
        infoSheet.getCell("A2").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A3").value = "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells("A3:H3");
        infoSheet.getCell("A3").font = { ...commonFont, bold: true };
        infoSheet.getCell("A3").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A5").value = "Báo cáo thiết bị đang mượn";
        infoSheet.mergeCells("A5:H5");
        infoSheet.getCell("A5").font = { ...commonFont, bold: true };
        infoSheet.getCell("A5").alignment = { vertical: "middle", horizontal: "center" };

        const currentDate = new Date();
        infoSheet.getCell(`E${data.length + 12}`).value = `Nam Định, ngày ${currentDate.getDate()} tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`;
        infoSheet.mergeCells(`E${data.length + 12}:G${data.length + 12}`);
        infoSheet.getCell(`E${data.length + 12}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 12}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 13}`).value = `Người lập báo cáo`;
        infoSheet.mergeCells(`E${data.length + 13}:G${data.length + 13}`);
        infoSheet.getCell(`E${data.length + 13}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 13}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 14}`).value = `Hiền`;
        infoSheet.mergeCells(`E${data.length + 14}:G${data.length + 14}`);
        infoSheet.getCell(`E${data.length + 14}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 14}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + 15}`).value = `Đặng Thị Thu Hiền`;
        infoSheet.mergeCells(`E${data.length + 15}:G${data.length + 15}`);
        infoSheet.getCell(`E${data.length + 15}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 15}`).alignment = { vertical: "middle", horizontal: "center" };

        // Định dạng in đậm và căn giữa cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { ...commonFont, bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const borderStyle = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        };

        // Thêm viền cho bảng dữ liệu
        for (let row = 8; row <= 8 + data.length; row++) {
            for (let col = 2; col <= 7; col++) {
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

        const wb = new ExcelJS.Workbook();
        const infoSheet = wb.addWorksheet("Thông tin");

        // Định nghĩa font chữ chung
        const commonFont = { name: 'Times New Roman', size: 12 };

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        infoSheet.addRow([
            "",
            "STT",
            "Mã nhóm Thiết Bị",
            "Tên nhóm Thiết Bị",
            "Số lượt mượn",
        ]).font = { ...commonFont, bold: true }; // Tiêu đề cột

        let currIndex = 9;
        let stt = 1;
        data.forEach((item) => {
            infoSheet.getCell("B" + currIndex).value = "Giáo Viên: " + item.tenGV;
            infoSheet.mergeCells("B" + currIndex + ":E" + currIndex);
            const cellTGV = infoSheet.getCell(currIndex, 2);
            cellTGV.font = { bold: true, color: { argb: "FF0000" }, name: 'Times New Roman', size: 12 };
            cellTGV.alignment = { vertical: "middle", horizontal: "left" };

            item.thongTins.forEach((item2) => {
                infoSheet.addRow([
                    "",
                    stt,
                    item2.maNTB,
                    item2.tenNTB,
                    item2.soLuotMuon,
                ]).font = commonFont;
                stt++;
            });

            infoSheet.getCell("B" + (currIndex + item.thongTins.length + 1)).value = "Tổng Cộng";
            infoSheet.mergeCells("B" + (currIndex + item.thongTins.length + 1) + ":D" + (currIndex + item.thongTins.length + 1));
            infoSheet.getCell("E" + (currIndex + item.thongTins.length + 1)).value = item.thongTins.reduce((acc, item) => acc + item.soLuotMuon, 0);
            const cell = infoSheet.getCell(currIndex + item.thongTins.length + 1, 2);
            cell.font = { ...commonFont, bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
            currIndex += item.thongTins.length + 2;
        });

        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A2").value = "Phòng Giáo dục & Đào tạo Huyện Xuân Trường";
        infoSheet.mergeCells("A2:F2");
        infoSheet.getCell("A2").font = { ...commonFont, bold: true };
        infoSheet.getCell("A2").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A3").value = "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells("A3:F3");
        infoSheet.getCell("A3").font = { ...commonFont, bold: true };
        infoSheet.getCell("A3").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A5").value = "Báo cáo tình hình mượn thiết bị của giáo viên";
        infoSheet.mergeCells("A5:F5");
        infoSheet.getCell("A5").font = { ...commonFont, bold: true };
        infoSheet.getCell("A5").alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A6").value = `Thời gian: ${request.tuNgay} - ${request.denNgay}`;
        infoSheet.mergeCells("A6:F6");
        infoSheet.getCell("A6").font = { ...commonFont, bold: true };
        infoSheet.getCell("A6").alignment = { vertical: "middle", horizontal: "center" };

        const allDataRows = data.reduce((acc, item) => acc + item.thongTins.length, 0) + data.length * 2;

        const currentDate = new Date();
        infoSheet.getCell(`E${allDataRows + 12}`).value = `Nam Định, ngày ${currentDate.getDate()} tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`;
        infoSheet.mergeCells(`E${allDataRows + 12}:G${allDataRows + 12}`);
        infoSheet.getCell(`E${allDataRows + 12}`).font = commonFont;
        infoSheet.getCell(`E${allDataRows + 12}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${allDataRows + 13}`).value = `Người lập báo cáo`;
        infoSheet.mergeCells(`E${allDataRows + 13}:G${allDataRows + 13}`);
        infoSheet.getCell(`E${allDataRows + 13}`).font = commonFont;
        infoSheet.getCell(`E${allDataRows + 13}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${allDataRows + 14}`).value = `Hiền`;
        infoSheet.mergeCells(`E${allDataRows + 14}:G${allDataRows + 14}`);
        infoSheet.getCell(`E${allDataRows + 14}`).font = commonFont;
        infoSheet.getCell(`E${allDataRows + 14}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${allDataRows + 15}`).value = `Đặng Thị Thu Hiền`;
        infoSheet.mergeCells(`E${allDataRows + 15}:G${allDataRows + 15}`);
        infoSheet.getCell(`E${allDataRows + 15}`).font = commonFont;
        infoSheet.getCell(`E${allDataRows + 15}`).alignment = { vertical: "middle", horizontal: "center" };

        // Định dạng in đậm và căn giữa cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 5, row: allDataRows + 12 },
            { col: 5, row: allDataRows + 13 },
            { col: 5, row: allDataRows + 14 },
            { col: 5, row: allDataRows + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { ...commonFont, bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const borderStyle = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        };

        // Thêm viền cho bảng dữ liệu
        for (let row = 8; row <= 8 + allDataRows; row++) {
            for (let col = 2; col <= 6; col++) {
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
        const wb = new ExcelJS.Workbook();
        const infoSheet = wb.addWorksheet("Thông tin");

        // Định nghĩa font chữ chung
        const commonFont = { name: 'Times New Roman', size: 12 };

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        infoSheet.addRow([
            "",
            "STT",
            "Mã Cá Biệt Thiết Bị",
            "Tên Thiết Bị",
            "Ngày Thanh Lý",
            "Lý Do Thanh Lý",
        ]).font = { ...commonFont, bold: true }; // Tiêu đề cột

        data.forEach((item, index) => {
            infoSheet.addRow([
                "",
                index + 1,
                item.maCaBietTB,
                item.tenTB,
                item.ngayThanhLy,
                item.lyDoTL,
            ]).font = commonFont;
        });

        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A" + (2 + spaceAdders)).value =
            "Phòng Giáo dục & Đào tạo Huyện Xuân Trường";
        infoSheet.mergeCells(
            "A" + (2 + spaceAdders) + ":G" + (2 + spaceAdders)
        );
        infoSheet.getCell("A" + (2 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (2 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A" + (3 + spaceAdders)).value =
            "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells(
            "A" + (3 + spaceAdders) + ":G" + (3 + spaceAdders)
        );
        infoSheet.getCell("A" + (3 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (3 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A" + (5 + spaceAdders)).value =
            "Thống kê thiết bị thanh lý";
        infoSheet.mergeCells(
            "A" + (5 + spaceAdders) + ":G" + (5 + spaceAdders)
        );
        infoSheet.getCell("A" + (5 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (5 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A" + (6 + spaceAdders)).value =
            `Thời gian: ${request.tuNgay} - ${request.denNgay}`;
        infoSheet.mergeCells(
            "A" + (6 + spaceAdders) + ":G" + (6 + spaceAdders)
        );
        infoSheet.getCell("A" + (6 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (6 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        const currentDate = new Date();
        infoSheet.getCell(
            `E${data.length + spaceAdders + 12}`
        ).value = `Nam Định, ngày ${currentDate.getDate()} tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 12}:G${data.length + spaceAdders + 12}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 12}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 12}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + spaceAdders + 13}`).value = `Người lập báo cáo`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 13}:G${data.length + spaceAdders + 13}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 13}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 13}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).value = `Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 14}:G${data.length + spaceAdders + 14}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + spaceAdders + 15}`).value = `Đặng Thị Thu Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 15}:G${data.length + spaceAdders + 15}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 15}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 15}`).alignment = { vertical: "middle", horizontal: "center" };

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { ...commonFont, bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const borderStyle = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        };

        // Thêm viền cho bảng dữ liệu
        for (let row = 8; row <= 8 + data.length; row++) {
            for (let col = 2; col <= 6; col++) {
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
        const wb = new ExcelJS.Workbook();
        const infoSheet = wb.addWorksheet("Thông tin");

        // Định nghĩa font chữ chung
        const commonFont = { name: 'Times New Roman', size: 12 };

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        infoSheet.addRow([
            "",
            "STT",
            "Tên nhóm thiết bị",
            "Đơn Vị Tính",
            "Tổng Số Lượng Tăng",
            "Tổng Giá Trị",
        ]).font = { ...commonFont, bold: true }; // Tiêu đề cột

        data.forEach((item, index) => {
            infoSheet.addRow([
                "",
                index + 1,
                item.tenNTB,
                item.donViTinh,
                item.tongSoLuongTang,
                item.tongGiaTri,
            ]).font = commonFont;
        });

        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A" + (2 + spaceAdders)).value =
            "Phòng Giáo dục & Đào tạo Huyện Xuân Trường";
        infoSheet.mergeCells(
            "A" + (2 + spaceAdders) + ":G" + (2 + spaceAdders)
        );
        infoSheet.getCell("A" + (2 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (2 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A" + (3 + spaceAdders)).value =
            "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells(
            "A" + (3 + spaceAdders) + ":G" + (3 + spaceAdders)
        );
        infoSheet.getCell("A" + (3 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (3 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A" + (5 + spaceAdders)).value =
            "Thống kê số lượng thiết bị tăng theo nhóm thiết bị";
        infoSheet.mergeCells(
            "A" + (5 + spaceAdders) + ":G" + (5 + spaceAdders)
        );
        infoSheet.getCell("A" + (5 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (5 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A" + (6 + spaceAdders)).value =
            `Thời gian: ${request.tuNgay} - ${request.denNgay}`;
        infoSheet.mergeCells(
            "A" + (6 + spaceAdders) + ":G" + (6 + spaceAdders)
        );
        infoSheet.getCell("A" + (6 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (6 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        const currentDate = new Date();
        infoSheet.getCell(
            `E${data.length + spaceAdders + 12}`
        ).value = `Nam Định, ngày ${currentDate.getDate()} tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 12}:G${data.length + spaceAdders + 12}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 12}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 12}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + spaceAdders + 13}`).value = `Người lập báo cáo`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 13}:G${data.length + spaceAdders + 13}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 13}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 13}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).value = `Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 14}:G${data.length + spaceAdders + 14}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + spaceAdders + 15}`).value = `Đặng Thị Thu Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 15}:G${data.length + spaceAdders + 15}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 15}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 15}`).alignment = { vertical: "middle", horizontal: "center" };

        // Tổng cộng
        infoSheet.getCell(`B${data.length + 9}`).value = "Tổng cộng";
        infoSheet.mergeCells(`B${data.length + 9}:D${data.length + 9}`);
        infoSheet.getCell(`B${data.length + 9}`).font = { ...commonFont, bold: true };
        infoSheet.getCell(`B${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

        // Tổng số lượng tăng
        infoSheet.getCell(`E${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.tongSoLuongTang,
            0
        );
        infoSheet.getCell(`E${data.length + 9}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

        // Tổng giá trị
        infoSheet.getCell(`F${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.tongSoLuongTang * item.tongGiaTri,
            0
        );
        infoSheet.getCell(`F${data.length + 9}`).font = commonFont;
        infoSheet.getCell(`F${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 2, row: data.length + 9 }, // Tổng cộng
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { ...commonFont, bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const borderStyle = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        };

        // Thêm viền cho bảng dữ liệu
        for (let row = 8; row <= 8 + data.length + 1; row++) {
            for (let col = 2; col <= 6; col++) {
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
        if (data.length === 0) {
            alert("Không có dữ liệu nào trong khoảng thời gian này");
            return;
        }

        const spaceAdders = Object.keys(data[0]).length - 5;
        const wb = new ExcelJS.Workbook();
        const infoSheet = wb.addWorksheet("Thông tin");

        // Định nghĩa font chữ chung
        const commonFont = { name: 'Times New Roman', size: 12 };

        // Thêm tiêu đề và dữ liệu vào worksheet
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont;
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        infoSheet.addRow([
            "",
            "Mã nhóm thiết bị",
            "Tên nhóm thiết bị",
            "Tổng số lượng",
            "Số thiết bị dùng được",
            "Số thiết bị hỏng",
        ]).font = { ...commonFont, bold: true }; // Tiêu đề cột

        data.forEach((item) => {
            infoSheet.addRow([
                "",
                item.maNTB,
                item.tenNTB,
                item.tongSoLuong,
                item.dungDuoc,
                item.hong,
            ]).font = commonFont;
        });

        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống
        infoSheet.addRow([]).font = commonFont; // Thêm hàng trống

        // Gộp ô và đặt giá trị cho ô đầu tiên trong phạm vi gộp
        infoSheet.getCell("A" + (2 + spaceAdders)).value =
            "Phòng Giáo dục & Đào tạo Huyện Xuân Trường";
        infoSheet.mergeCells(
            "A" + (2 + spaceAdders) + ":G" + (2 + spaceAdders)
        );
        infoSheet.getCell("A" + (2 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (2 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A" + (3 + spaceAdders)).value =
            "Trường THCS Đặng Xuân Khu";
        infoSheet.mergeCells(
            "A" + (3 + spaceAdders) + ":G" + (3 + spaceAdders)
        );
        infoSheet.getCell("A" + (3 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (3 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell("A" + (5 + spaceAdders)).value =
            "Thống kê số lượng thiết bị theo nhóm thiết bị";
        infoSheet.mergeCells(
            "A" + (5 + spaceAdders) + ":G" + (5 + spaceAdders)
        );
        infoSheet.getCell("A" + (5 + spaceAdders)).font = { ...commonFont, bold: true };
        infoSheet.getCell("A" + (5 + spaceAdders)).alignment = { vertical: "middle", horizontal: "center" };

        const currentDate = new Date();
        infoSheet.getCell(
            `E${data.length + spaceAdders + 12}`
        ).value = `Nam Định, ngày ${currentDate.getDate()} tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 12}:G${data.length + spaceAdders + 12}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 12}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 12}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + spaceAdders + 13}`).value = `Người lập báo cáo`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 13}:G${data.length + spaceAdders + 13}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 13}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 13}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).value = `Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 14}:G${data.length + spaceAdders + 14}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 14}`).alignment = { vertical: "middle", horizontal: "center" };

        infoSheet.getCell(`E${data.length + spaceAdders + 15}`).value = `Đặng Thị Thu Hiền`;
        infoSheet.mergeCells(
            `E${data.length + spaceAdders + 15}:G${data.length + spaceAdders + 15}`
        );
        infoSheet.getCell(`E${data.length + spaceAdders + 15}`).font = commonFont;
        infoSheet.getCell(`E${data.length + spaceAdders + 15}`).alignment = { vertical: "middle", horizontal: "center" };

        // Tổng cộng
        infoSheet.getCell(`B${data.length + 9}`).value = "Tổng cộng";
        infoSheet.mergeCells(`B${data.length + 9}:C${data.length + 9}`);
        infoSheet.getCell(`B${data.length + 9}`).font = { ...commonFont, bold: true };
        infoSheet.getCell(`B${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

        // Tổng số lượng
        infoSheet.getCell(`D${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.tongSoLuong,
            0
        );
        infoSheet.getCell(`D${data.length + 9}`).font = commonFont;
        infoSheet.getCell(`D${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

        // Tổng số thiết bị dùng được
        infoSheet.getCell(`E${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.dungDuoc,
            0
        );
        infoSheet.getCell(`E${data.length + 9}`).font = commonFont;
        infoSheet.getCell(`E${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

        // Tổng số thiết bị hỏng
        infoSheet.getCell(`F${data.length + 9}`).value = data.reduce(
            (acc, item) => acc + item.hong,
            0
        );
        infoSheet.getCell(`F${data.length + 9}`).font = commonFont;
        infoSheet.getCell(`F${data.length + 9}`).alignment = { vertical: "middle", horizontal: "center" };

        // Định dạng in đậm cho các ô cụ thể
        const boldCells = [
            { col: 1, row: 2 },
            { col: 1, row: 3 },
            { col: 1, row: 5 },
            { col: 1, row: 6 },
            { col: 2, row: data.length + 9 }, // Tổng cộng
            { col: 5, row: data.length + 12 },
            { col: 5, row: data.length + 13 },
            { col: 5, row: data.length + 14 },
            { col: 5, row: data.length + 15 },
        ];
        boldCells.forEach(({ col, row }) => {
            const cell = infoSheet.getCell(row, col);
            cell.font = { ...commonFont, bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Set column widths cho worksheet
        infoSheet.columns.forEach((column) => {
            column.width = 20;
        });

        const borderStyle = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        };

        // Thêm viền cho bảng dữ liệu
        for (let row = 8; row <= 8 + data.length + 1; row++) {
            for (let col = 2; col <= 6; col++) {
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
            "Phòng Giáo dục & Đào tạo Huyện Xuân Trường";
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

        infoSheet.getCell(`E${data.length + 15}`).value = `Đặng Thị Thu Hiền`;
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
                        <option value="op8">Báo cáo kiểm kê thiết bị</option>
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
                {request.option === "op8" && (
                    <>
                        <span
                            className={cx(
                                "check-box",
                                "col-lg-3 col-md-5 mt-5 justify-content-center"
                            )}
                        >
                            <label className="">Đang hoạt động</label>
                            <input
                                className={cx("input")}
                                type="checkbox"
                                // value={request.tbTieuHao}
                                checked={requestOp8.dangHoatDong}
                                onChange={(e) =>
                                    handleChange(e, "dangHoatDong")
                                }
                            />
                        </span>
                        <span
                            className={cx(
                                "check-box",
                                "col-lg-3 col-md-5 mt-5 justify-content-center"
                            )}
                        >
                            <label className="">Dùng được</label>
                            <input
                                className={cx("input")}
                                type="checkbox"
                                // value={request.tbTieuHao}
                                checked={requestOp8.dungDuoc}
                                onChange={(e) => handleChange(e, "dungDuoc")}
                            />
                        </span>
                        <span
                            className={cx(
                                "check-box",
                                "col-lg-3 col-md-5 mt-5 justify-content-center"
                            )}
                        >
                            <label className="">Hỏng</label>
                            <input
                                className={cx("input")}
                                type="checkbox"
                                // value={request.tbTieuHao}
                                checked={requestOp8.hong}
                                onChange={(e) => handleChange(e, "hong")}
                            />
                        </span>
                        <span
                            className={cx(
                                "check-box",
                                "col-lg-3 col-md-5 mt-5 justify-content-center"
                            )}
                        >
                            <label className="">Mất</label>
                            <input
                                className={cx("input")}
                                type="checkbox"
                                // value={request.tbTieuHao}
                                checked={requestOp8.mat}
                                onChange={(e) => handleChange(e, "mat")}
                            />
                        </span>
                    </>
                )}
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
