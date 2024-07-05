import $ from "jquery";

export const unClickDashBoardSubItem = (setIsChoose) => {
    $("[class*='sub-item']").each(function () {
        // Lấy tất cả các class của phần tử hiện tại và chuyển thành mảng
        var classes = $(this).attr("class").split(" ");
        classes.forEach((className) => {
            // Kiểm tra nếu class chứa chuỗi 'click'
            if (className.includes("click")) {
                // Xóa class đó
                $(this).removeClass(className);
            }
        });
    });
};
