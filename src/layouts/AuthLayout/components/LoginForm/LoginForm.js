import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Login Response:', data);

            if (!response.ok) {
                throw new Error(data.message || "Invalid credentials");
            }

            // Store token and user data in localStorage
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to the home page or dashboard
            navigate("/");

        } catch (error) {
            console.error('Login Error:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleLogin}>
                <h3 style={titleStyle}>QUẢN LÝ THIẾT BỊ TRƯỜNG HỌC</h3>

                {errorMessage && (
                    <div style={errorMessageStyle}>{errorMessage}</div>
                )}

                <label style={labelStyle}>Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    style={inputStyle}
                />

                <label style={labelStyle}>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    style={inputStyle}
                />

                <button type="submit" style={loginBtnStyle}>
                    Log In
                </button>
            </form>
        </div>
    );
}

// Inline styles based on provided CSS
const containerStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #515360, #adb4bf)",
    fontFamily: "'Arial', sans-serif",
};

const formStyle = {
    width: "380px",
    padding: "40px 30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
    animation: "fadeIn 0.5s ease-in-out",
    textAlign: "center",
    '@media (max-width: 400px)': {
        width: "90%",
    },
};

const titleStyle = {
    fontSize: "26px",
    fontWeight: "700",
    color: "#2f3a47",
    textAlign: "center",
    marginBottom: "25px",
    textTransform: "uppercase",
    letterSpacing: "1px",
};

const labelStyle = {
    display: "block",
    fontSize: "14px",
    color: "#555555",
    marginBottom: "8px",
    textTransform: "uppercase",
    fontWeight: "600",
    textAlign: "left",
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #dddddd",
    borderRadius: "6px",
    fontSize: "15px",
    color: "#333333",
    backgroundColor: "#f9f9f9",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxSizing: "border-box",
};

const loginBtnStyle = {
    width: "100%",
    padding: "12px 20px",
    backgroundColor: "#2f3a47",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
};

const errorMessageStyle = {
    color: "#e74c3c",
    fontSize: "14px",
    marginBottom: "20px",
    textAlign: "center",
    backgroundColor: "#fdecea",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #e74c3c",
};

const switchTextStyle = {
    fontSize: "14px",
    color: "#555555",
    textAlign: "center",
    marginTop: "20px",
};

const linkStyle = {
    color: "#2f3a47",
    textDecoration: "none",
    fontWeight: "600",
    cursor: "pointer",
    ':hover': {
        textDecoration: "underline",
        color: "#7c82ac",
    },
};

export default LoginForm;
