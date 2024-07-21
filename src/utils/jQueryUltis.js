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

export const getGhiGiamTenTBSelectTags = () => {
    return $(".ghi-giam-tenTB-select-tag");
};

export const getGhiGiamKPSelectTags = () => {
    return $(".ghi-giam-KP-select-tag");
};
