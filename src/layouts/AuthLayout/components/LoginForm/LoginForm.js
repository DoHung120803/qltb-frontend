import classNames from "classnames/bind";
import { useState } from "react";
import styles from "../Form.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigator = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        if (username !== "hiendang") {
            alert("Sai tên đăng nhập");
            setUsername("");
            return;
        }

        if (password !== "123456") {
            alert("Sai mật khẩu");
            setPassword("");
            return;
        }

        localStorage.setItem("user", JSON.stringify({ username, password }));
        navigator("/");

        // await loginServices.login(request, navigator);
    };

    return (
        <div className={cx("container")}>
            <form className={cx("form")}>
                <h3 className={cx("title")}>School Device Management</h3>

                <label>Username</label>
                <input
                    type="text"
                    placeholder="Email or Phone"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button
                    onClick={(event) => handleLogin(event)}
                    className={cx("login-btn")}
                >
                    Log In
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
