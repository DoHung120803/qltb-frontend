import classNames from "classnames/bind";
import styles from "./AnalysisBox.module.scss";

const cx = classNames.bind(styles);

function AnalysisBox({ title, number }) {
    return (
        <div className={cx("box")}>
            <p className={cx("title")}>{title}</p>
            <br></br>
            <h1 className={cx("number")}>{number}</h1>
        </div>
    );
}

export default AnalysisBox;
