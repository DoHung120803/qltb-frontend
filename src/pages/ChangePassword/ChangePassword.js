import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handlePasswordChange = async () => {
        // Reset trạng thái lỗi và thành công
        setError("");
        setSuccess("");

        // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu có khớp hay không
        if (newPassword !== newPasswordConfirm) {
            setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }

        // Lấy dữ liệu người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        // Kiểm tra xem thông tin người dùng có tồn tại không
        if (!user) {
            setError("Không tìm thấy thông tin người dùng.");
            return;
        }

        try {
            const userId = user.id; // Lấy userId từ localStorage
            const response = await fetch(`http://localhost:8080/api/change-password?userId=${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Lấy accessToken từ localStorage
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            // Xử lý response từ server
            if (response.ok) {
                setSuccess("Mật khẩu đã được đổi thành công.");
                // Reset lại các trường mật khẩu
                setCurrentPassword("");
                setNewPassword("");
                setNewPasswordConfirm("");
            } else {
                // Lấy thông tin lỗi từ server
                const data = await response.json();
                setError(data.message || "Có lỗi xảy ra.");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setError("Không thể kết nối đến server."); // Thông báo lỗi kết nối
        }
    };


    // Inline styles
    const styles = {
        container: {
            maxWidth: '400px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
        },
        heading: {
            marginBottom: '20px',
            fontSize: '24px',
            textAlign: 'center',
        },
        input: {
            marginBottom: '15px',
            padding: '10px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100%',
            boxSizing: 'border-box',
        },
        button: {
            padding: '10px',
            fontSize: '14px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#4f5a60',
            color: '#fff',
            cursor: 'pointer',
            marginTop: '10px',
            width: '100%',
            textAlign: 'center',
            boxSizing: 'border-box',
        },
        error: {
            color: '#2c2424',
            marginBottom: '10px',
            textAlign: 'center',
        },
        success: {
            color: '#2ecc71',
            marginBottom: '10px',
            textAlign: 'center',
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Đổi mật khẩu</h2>
            {error && <div style={styles.error}>{error}</div>}
            {success && <div style={styles.success}>{success}</div>}
            <input
                type="password"
                placeholder="Mật khẩu hiện tại"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                style={styles.input}
            />
            <button onClick={handlePasswordChange} style={styles.button}>Lưu</button>
            <button onClick={() => navigate(-1)} style={{...styles.button, backgroundColor: '#000000'}}>Quay lại</button>
        </div>
    );
}

export default ChangePassword;
