import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherInfo() {
    const [teacher, setTeacher] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        tenGV: "",
        gioiTinh: "",
        ngaySinh: "",
        soDienThoai: "",
        diaChi: "",
        maToCM: ""
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.giaoVien) {
            setTeacher(user.giaoVien);
            setFormData({
                tenGV: user.giaoVien.tenGV,
                gioiTinh: user.giaoVien.gioiTinh,
                ngaySinh: user.giaoVien.ngaySinh,
                soDienThoai: user.giaoVien.soDienThoai,
                diaChi: user.giaoVien.diaChi,
                maToCM: user.giaoVien.maToCM
            });
        }
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/giao-vien/update/${teacher.maGV}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedTeacher = await response.json();
                setTeacher(updatedTeacher);
                setIsEditing(false);
                // Update localStorage nếu cần thiết
            } else {
                console.error("Failed to update teacher information.");
            }
        } catch (error) {
            console.error("Error updating teacher information:", error);
        }
    };

    if (!teacher) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Thông tin ADMIN</h2>
            <div style={styles.details}>
                {isEditing ? (
                    <div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Tên GV:</label>
                            <input
                                style={styles.input}
                                type="text"
                                name="tenGV"
                                value={formData.tenGV}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Giới tính:</label>
                            <input
                                style={styles.input}
                                type="text"
                                name="gioiTinh"
                                value={formData.gioiTinh}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Ngày sinh:</label>
                            <input
                                style={styles.input}
                                type="date"
                                name="ngaySinh"
                                value={formData.ngaySinh}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Số điện thoại:</label>
                            <input
                                style={styles.input}
                                type="text"
                                name="soDienThoai"
                                value={formData.soDienThoai}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Địa chỉ:</label>
                            <input
                                style={styles.input}
                                type="text"
                                name="diaChi"
                                value={formData.diaChi}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Mã tổ chuyên môn:</label>
                            <input
                                style={styles.input}
                                type="text"
                                name="maToCM"
                                value={formData.maToCM}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button style={styles.saveButton} onClick={handleSaveClick}>
                            Lưu
                        </button>
                    </div>
                ) : (
                    <div>
                        <p style={styles.item}><span style={styles.label}><b>Mã GV:</b></span> {teacher.maGV}</p>
                        <p style={styles.item}><span style={styles.label}><b>Tên GV:</b></span> {teacher.tenGV}</p>
                        <p style={styles.item}><span style={styles.label}><b>Giới tính:</b></span> {teacher.gioiTinh}</p>
                        <p style={styles.item}><span style={styles.label}><b>Ngày sinh:</b></span> {teacher.ngaySinh}</p>
                        <p style={styles.item}><span style={styles.label}><b>Số điện thoại:</b></span> {teacher.soDienThoai}</p>
                        <p style={styles.item}><span style={styles.label}><b>Địa chỉ:</b></span> {teacher.diaChi}</p>
                        <p style={styles.item}><span style={styles.label}><b>Mã tổ chuyên môn:</b></span> {teacher.maToCM}</p>
                        <button style={styles.editButton} onClick={handleEditClick}>
                            Chỉnh sửa
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '17px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 7px 14px rgba(0, 0, 0, 0.15)',
        maxWidth: '680px',
        margin: '43px auto',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    title: {
        textAlign: 'center',
        marginBottom: '26px',
        fontSize: '24px',
        fontWeight: '700',
        color: '#2c3e50',
        letterSpacing: '0.85px',
        textTransform: 'uppercase',
        wordWrap: 'break-word',
    },
    details: {
        lineHeight: '1.53',
        fontSize: '14px',
        color: '#34495e',
    },
    item: {
        margin: '13px 0',
        padding: '13px',
        borderLeft: '3.4px solid #3498db',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease, border-left-color 0.3s ease',
        wordWrap: 'break-word',
    },
    label: {
        fontWeight: '600',
        color: '#2980b9',
        fontSize: '14px',
    },
    formGroup: {
        marginBottom: '13px',
    },
    input: {
        width: '100%',
        padding: '8.5px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    editButton: {
        backgroundColor: '#242b30',
        color: '#fff',
        padding: '8.5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '17px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontSize: '14px',
    },
    saveButton: {
        backgroundColor: '#1b201c',
        color: '#fff',
        padding: '8.5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '17px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontSize: '14px',
    },
};


export default TeacherInfo;
