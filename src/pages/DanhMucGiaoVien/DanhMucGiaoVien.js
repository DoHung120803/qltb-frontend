import classNames from 'classnames/bind';
import styles from './DanhMucGiaoVien.module.scss';
import Table from '~/components/Table';
import { useEffect, useState } from 'react';
import * as getServices from '~/services/getServices';

const cx = classNames.bind(styles);

function DanhMucGiaoVien() {
    const tableFields = [
        'Mã giáo viên',
        'Tên giáo viên',
        'Giới tính',
        'Tổ chuyên môn',
        'Hành động',
    ];

    const [teachers, setTeachers] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchTeachers = async () => {
            const dataResponse = await getServices.getGiaoVien(page, size);
            setTeachers(dataResponse.content);
            setTotalPages(dataResponse.totalPages);
            setTotalItems(dataResponse.totalElements);
        };

        fetchTeachers();
    }, [page, size]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage <= totalPages - 1) {
            setPage(newPage);
        }
    };

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        setPage(0);
    };

    return (
        <div className={cx('wrapper', 'col-11')}>
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
                        'add-btn',
                        'col-lg-2 col-sm-4 mt-3 text-center ms-auto'
                    )}
                >
                    Thêm giáo viên
                </div>
                <Table
                    fields={tableFields}
                    teachers={teachers}
                    page={page}
                    size={size}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                />
            </div>
        </div>
    );
}

export default DanhMucGiaoVien;
