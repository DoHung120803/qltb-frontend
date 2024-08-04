import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import AnalysisBox from '~/components/AnalysisBox';
import { getDashboardData, getMonthlyBorrowedDevices } from '~/services/getServices';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

const cx = classNames.bind(styles);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const [dashboardData, setDashboardData] = useState({
        totalDevices: 0,
        devicesInStorage: 0,
        brokenDevices: 0,
        lostDevices: 0,
    });
    const [monthlyBorrowedData, setMonthlyBorrowedData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const data = await getDashboardData();
            setDashboardData(data);
        };

        const fetchMonthlyBorrowedData = async () => {
            const data = await getMonthlyBorrowedDevices();
            console.log('Fetched monthly borrowed data:', data); // Kiểm tra dữ liệu
            setMonthlyBorrowedData(data);
        };

        fetchDashboardData();
        fetchMonthlyBorrowedData();
    }, []);

    const generateChartData = () => {
        const months = Array(12).fill(0);

        monthlyBorrowedData.forEach(item => {
            months[item.month - 1] = item.count; // Chuyển đổi tháng thành chỉ số
        });

        console.log('Generated chart data:', months); // Kiểm tra dữ liệu biểu đồ

        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Số lượt mượn thiết bị',
                    data: months,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Chào mừng, Admin</h1>
            <div className={cx('analysis')}>
                <div className={cx('box')}>
                    <div className={cx('title')}>Tổng số thiết bị</div>
                    <div className={cx('number')}>{dashboardData.totalDevices}</div>
                </div>
                <div className={cx('box')}>
                    <div className={cx('title')}>Số thiết bị trong kho</div>
                    <div className={cx('number')}>{dashboardData.devicesInStorage}</div>
                </div>
                <div className={cx('box')}>
                    <div className={cx('title')}>Số thiết bị hỏng</div>
                    <div className={cx('number')}>{dashboardData.brokenDevices}</div>
                </div>
                <div className={cx('box')}>
                    <div className={cx('title')}>Số thiết bị mất</div>
                    <div className={cx('number')}>{dashboardData.lostDevices}</div>
                </div>
            </div>
            <div className={cx('chart')}>
                <Bar
                    data={generateChartData()}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Home;
