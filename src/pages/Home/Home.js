import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import AnalysisBox from "~/components/AnalysisBox";

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}>Chào mừng, Admin</h1>
            <div className={cx("analysis", "col-10")}>
                <div className="d-flex gap-4">
                    <AnalysisBox title={"Tổng số thiết bị"} number={123} />
                    <AnalysisBox title={"Tổng số thiết bị"} number={123} />
                    <AnalysisBox title={"Tổng số thiết bị"} number={123} />
                    <AnalysisBox title={"Tổng số thiết bị"} number={123} />
                </div>
            </div>
        </div>
    );
}

export default Home;
