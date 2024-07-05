import classNames from "classnames/bind";
import styles from "./DoanhMucGiaoVien.module.scss";
import Table from "~/components/Table";
import { useEffect, useState } from "react";
import * as getServices from "~/services/getServices";

const cx = classNames.bind(styles);

function DoanhMucGiaoVien() {
    const tableFields = [
        "Mã giáo viên",
        "Tên giáo viên",
        "Giới tính",
        "Tổ chuyên môn",
        "Hành động",
    ];

    const [response, setResponse] = useState([]);
    const [request, setRequest] = useState({ page: 0, size: 10 });

    useEffect(() => {
        const fetch = async () => {
            const dataResponse = await getServices.getGiaoVien(
                request.page,
                request.size
            );
            setResponse(dataResponse);
        };

        fetch();
    }, [request]);

    return (
        <div className={cx("wrapper", "col-11")}>
            <h2>Quản lý danh mục</h2>
            <p>Quản lý danh mục &gt; Quản lý giáo viên</p>

            <div className="row m-0">
                <input
                    type="text"
                    className="col-lg-2 col-sm-6 mt-3"
                    placeholder="Nhập tên giáo viên"
                />
                <div
                    className={cx(
                        "add-btn",
                        "col-lg-2 col-sm-4 mt-3 text-center ms-auto"
                    )}
                >
                    Thêm giáo viên
                </div>
                <Table fields={tableFields} tableData={response.content} />
            </div>
        </div>
    );
}

export default DoanhMucGiaoVien;
