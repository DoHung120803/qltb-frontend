import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./DashBoard.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function DashBoardItem({
    children,
    to,
    subItem = false,
    icon,
    title,
    more = "",
    selected,
    handleSelected,
}) {
    const [isChoose, setIsChoose] = useState(false);

    const handleOnClick = () => {
        setIsChoose(!isChoose);

        if (!subItem) {
            if (selected === title) {
                handleSelected("");
            } else {
                handleSelected(title);
            }
        }
    };

    return (
        <div>
            <NavLink
                className={(nav) =>
                    cx("item", "d-flex col-12", {
                        "sub-item": subItem,
                        click: subItem && nav.isActive,
                    })
                }
                to={to}
                onClick={handleOnClick}
            >
                <div className="col-10 d-flex">
                    {subItem ? (
                        <span className={cx("more", "col-1 align-self-center")}>
                            &gt;
                        </span>
                    ) : (
                        <span className={cx("icon")}>{icon}</span>
                    )}
                    <span className={cx("title")}>{title}</span>
                </div>
                {subItem || (
                    <span className={cx("more", "col-2")}>
                        {selected !== title ? more : ""}
                    </span>
                )}
            </NavLink>
            {selected === title ? children : ""}
        </div>
    );
}

export default DashBoardItem;
