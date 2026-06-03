### Câu 5.1:

```
import { useState } from "react";

function ClickEventsChallenge() {
    // 1. State cho thử thách đổi màu ngẫu nhiên
    const [bgColor, setBgColor] = useState("#3498db");

    // 2. State cho thử thách đếm click riêng biệt của từng nút
    const [countBtn1, setCountBtn1] = useState(0);
    const [countBtn2, setCountBtn2] = useState(0);

    // 3. State cho thử thách nút Like toggle
    const [isLiked, setIsLiked] = useState(false);

    // Hàm xử lý đổi màu ngẫu nhiên (Hex Color)
    function handleRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        setBgColor(color);
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h2>Thử thách Sự kiện Click</h2>
            <hr />

            {/* Thử thách 1: Đổi màu ngẫu nhiên */}
            <div style={{ marginBottom: "30px" }}>
                <h3>1. Đổi màu ngẫu nhiên</h3>
                <div style={{
                    width: "100%",
                    height: "80px",
                    backgroundColor: bgColor,
                    borderRadius: "8px",
                    transition: "background 0.3s",
                    marginBottom: "10px"
                }} />
                {/* Truyền hàm KHÔNG có dấu () */}
                <button onClick={handleRandomColor}>Đổi màu ngẫu nhiên 🎨</button>
            </div>

            {/* Thử thách 2: Đếm số lần click riêng biệt */}
            <div style={{ marginBottom: "30px" }}>
                <h3>2. Bộ đếm độc lập</h3>
                <div style={{ display: "flex", gap: "15px" }}>
                    <button onClick={() => setCountBtn1(countBtn1 + 1)}>
                        Nút A ({countBtn1})
                    </button>
                    <button onClick={() => setCountBtn2(countBtn2 + 1)}>
                        Nút B ({countBtn2})
                    </button>
                </div>
            </div>

            {/* Thử thách 3: Nút Like toggle */}
            <div style={{ marginBottom: "30px" }}>
                <h3>3. Nút Like (Toggle)</h3>
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    style={{
                        padding: "8px 16px",
                        fontSize: "16px",
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        borderRadius: "20px",
                        background: isLiked ? "#ffebe9" : "#fff",
                        color: isLiked ? "#e74c3c" : "#333"
                    }}
                >
                    {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
                </button>
            </div>
        </div>
    );
}

export default ClickEventsChallenge;
```

### Câu 5.2:

```
import { useState } from "react";

function InputEventsChallenge() {
    const [email, setEmail] = useState("");

    // 1. Kiểm tra email hợp lệ (chứa ký tự "@")
    const isValidEmail = email.includes("@");

    // 3. Logic đếm số từ (Word Count) bằng JavaScript
    // Tách chuỗi bằng khoảng trắng, lọc bỏ các khoảng trắng thừa
    const tuHopLe = email.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = tuHopLe.length;

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}>
            <h2>Thử thách Sự kiện Input</h2>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Nhập văn bản / Email:
                </label>
                <input
                    value={email}
                    // Bắt sự kiện onChange realtime
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Gõ văn bản hoặc nhập email..."
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box"
                    }}
                />
            </div>

            {/* 3. Thử thách: Đếm số từ */}
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                📊 Số từ: <b>{wordCount}</b> từ | Số ký tự: <b>{email.length}</b>
            </p>

            {/* 1. Thử thách: Email Validation */}
            {email && (
                <p style={{
                    margin: "5px 0",
                    fontSize: "14px",
                    color: isValidEmail ? "green" : "red",
                    fontWeight: "bold"
                }}>
                    {isValidEmail ? "✓ Định dạng có vẻ là email" : "✕ Chưa đúng cấu trúc email (thiếu @)"}
                </p>
            )}

            <hr style={{ margin: "20px 0" }} />

            {/* 2. Thử thách: Hiển thị Preview realtime */}
            <h3>👀 Vùng xem trước (Preview):</h3>
            <div style={{
                background: "#f9f9f9",
                padding: "15px",
                borderRadius: "4px",
                border: "1px dashed #bbb",
                minHeight: "40px",
                wordBreak: "break-all"
            }}>
                {email ? (
                    <span style={{ color: "#333" }}>{email}</span>
                ) : (
                    <i style={{ color: "#aaa" }}>Chưa có nội dung xem trước...</i>
                )}
            </div>
        </div>
    );
}

export default InputEventsChallenge;
```

### Câu 5.3:

```
import { useState, useEffect } from "react";

function KeyboardEventsChallenge() {
    // 1. State cho Game Đoán Phím
    const targetKeys = ["A", "S", "D", "F", "W", "E", "R"];
    const [targetKey, setTargetKey] = useState("A");
    const [gameMessage, setGameMessage] = useState("Nhấn phím hiển thị bên dưới!");

    // 2. State cho Di Chuyển Ô Vuông (Vị trí X, Y)
    const [position, setPosition] = useState({ x: 50, y: 50 });

    // 3. State cho Phím Tắt Đổi Màu Nền (Ctrl + D)
    const [bgColor, setBgColor] = useState("#ffffff");

    // Hàm đổi phím ngẫu nhiên cho Game
    function pickRandomKey() {
        const randomIndex = Math.floor(Math.random() * targetKeys.length);
        setTargetKey(targetKeys[randomIndex]);
    }

    // Hàm xử lý sự kiện bàn phím tập trung trên toàn bộ vùng chịu trách nhiệm
    function handleGlobalKeyDown(event) {
        const keyUpper = event.key.toUpperCase();

        // Thử thách 3: Bắt phím tắt Ctrl + D (Ngăn trình duyệt mở Bookmark mặc định)
        if (event.ctrlKey && keyUpper === "D") {
            event.preventDefault(); // Chặn hành vi mặc định của trình duyệt
            const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            setBgColor(randomColor);
            return; // Thoát hàm sớm
        }

        // Thử thách 1: Game đoán phím
        if (targetKeys.includes(keyUpper)) {
            if (keyUpper === targetKey) {
                setGameMessage("🎉 Chính xác! Đang đổi phím mới...");
                pickRandomKey();
            } else {
                setGameMessage(`❌ Sai rồi! Thử lại với phím [ ${targetKey} ] nhé.`);
            }
        }

        // Thử thách 2: Di chuyển ô vuông bằng phím mũi tên (Arrow)
        const step = 15; // Khoảng cách di chuyển mỗi lần nhấn
        if (event.key === "ArrowUp") {
            setPosition(prev => ({ ...prev, y: Math.max(0, prev.y - step) }));
        } else if (event.key === "ArrowDown") {
            setPosition(prev => ({ ...prev, y: Math.min(100, prev.y + step) }));
        } else if (event.key === "ArrowLeft") {
            setPosition(prev => ({ ...prev, x: Math.max(0, prev.x - step) }));
        } else if (event.key === "ArrowRight") {
            setPosition(prev => ({ ...prev, x: Math.min(250, prev.x + step) }));
        }
    }

    return (
        <div
            onKeyDown={handleGlobalKeyDown}
            tabIndex={0}
            style={{
                padding: "20px",
                fontFamily: "sans-serif",
                backgroundColor: bgColor,
                minHeight: "100vh",
                outline: "none" // Ẩn viền xanh khi div được focus
            }}
        >
            <h2>Thử thách Sự kiện Bàn phím (Bấm vào vùng trống để kích hoạt)</h2>
            <p style={{ color: "#666", fontSize: "14px" }}>💡 Mẹo: Nhấn <b>Ctrl + D</b> để thay đổi màu nền!</p>
            <hr />

            {/* Thử thách 1: Game đoán phím */}
            <div style={{ marginBottom: "30px", background: "rgba(255,255,255,0.8)", padding: "15px", borderRadius: "8px" }}>
                <h3>1. Game đoán phím nhanh</h3>
                <p>Hãy nhấn phím: <strong style={{ fontSize: "24px", color: "#2c3e50" }}>{targetKey}</strong></p>
                <p>Trạng thái: <b>{gameMessage}</b></p>
            </div>

            {/* Thử thách 2: Ô vuông di chuyển */}
            <div style={{ marginBottom: "30px", background: "rgba(255,255,255,0.8)", padding: "15px", borderRadius: "8px" }}>
                <h3>2. Điều khiển ô vuông (Dùng các phím mũi tên ↑ ↓ ← →)</h3>
                <div style={{
                    position: "relative",
                    width: "300px",
                    height: "150px",
                    background: "#ddd",
                    borderRadius: "4px",
                    overflow: "hidden"
                }}>
                    <div style={{
                        position: "absolute",
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#e74c3c",
                        borderRadius: "4px",
                        transition: "all 0.1s ease-out" // Giúp chuyển động mượt hơn
                    }} />
                </div>
            </div>
        </div>
    );
}

export default KeyboardEventsChallenge;
```

### Câu 5.4:

```
import { useState } from "react";

function FormEventsChallenge() {
    // State lưu trữ dữ liệu của các ô Input trong Form
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    // State lưu trữ thông báo lỗi realtime của từng ô
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [submitted, setSubmitted] = useState(false);

    // Hàm validate dữ liệu dùng chung cho cả khi gõ (realtime) và khi submit
    function validateField(name, value, currentFormData = formData) {
        let errorMessage = "";

        if (name === "email") {
            if (!value.trim()) {
                errorMessage = "Email không được để trống!";
            } else if (!value.includes("@")) {
                errorMessage = "Email không hợp lệ (phải chứa ký tự @)!";
            }
        }

        if (name === "password") {
            if (!value) {
                errorMessage = "Mật khẩu không được để trống!";
            } else if (value.length < 6) {
                errorMessage = "Mật khẩu phải có ít nhất 6 ký tự!";
            }
        }

        if (name === "confirmPassword") {
            if (!value) {
                errorMessage = "Vui lòng xác nhận lại mật khẩu!";
            } else if (value !== currentFormData.password) {
                errorMessage = "Mật khẩu xác nhận không trùng khớp!";
            }
        }

        return errorMessage;
    }

    // Xử lý thay đổi dữ liệu và báo lỗi REALTIME
    function handleChange(event) {
        const { name, value } = event.target;

        // 1. Cập nhật dữ liệu nhập vào formData
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);

        // 2. Kiểm tra lỗi trực tiếp dựa trên dữ liệu vừa gõ
        const errorMsg = validateField(name, value, updatedFormData);
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMsg
        }));
    }

    // Xử lý khi Submit Form
    function handleSubmit(event) {
        event.preventDefault(); // 🛑 BẮT BUỘC: Ngăn reload trang mặc định

        // Kiểm tra lỗi tổng thể lần cuối trước khi cho qua
        const emailError = validateField("email", formData.email);
        const passwordError = validateField("password", formData.password);
        const confirmError = validateField("confirmPassword", formData.confirmPassword);

        if (emailError || passwordError || confirmError) {
            setErrors({
                email: emailError,
                password: passwordError,
                confirmPassword: confirmError
            });
            alert("Vui lòng sửa các lỗi hiển thị trên form trước khi đăng ký!");
            return;
        }

        setSubmitted(true);
    }

    function handleReset() {
        setFormData({ email: "", password: "", confirmPassword: "" });
        setErrors({ email: "", password: "", confirmPassword: "" });
        setSubmitted(false);
    }

    // Style nhanh cho dòng báo lỗi
    const errorStyle = { color: "#e74c3c", fontSize: "13px", marginTop: "4px", display: "block" };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px", margin: "0 auto" }}>
            <h2>Thử thách Form Events & Validation</h2>

            {!submitted ? (
                <form onSubmit={handleSubmit} noValidate>
                    {/* Ô nhập Email */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", border: errors.email ? "1px solid red" : "1px solid #ccc" }}
                        />
                        {errors.email && <span style={errorStyle}>{errors.email}</span>}
                    </div>

                    {/* Ô nhập Mật khẩu */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>Mật khẩu:</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", border: errors.password ? "1px solid red" : "1px solid #ccc" }}
                        />
                        {errors.password && <span style={errorStyle}>{errors.password}</span>}
                    </div>

                    {/* Ô xác nhận mật khẩu */}
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>Xác nhận mật khẩu:</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", border: errors.confirmPassword ? "1px solid red" : "1px solid #ccc" }}
                        />
                        {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" style={{ padding: "8px 16px", background: "#3498db", color: "white", border: "none", cursor: "pointer", marginRight: "10px" }}>
                        Đăng ký ngay
                    </button>
                    <button type="button" onClick={handleReset} style={{ padding: "8px 16px", background: "#95a5a6", color: "white", border: "none", cursor: "pointer" }}>
                        Xóa form
                    </button>
                </form>
            ) : (
                <div style={{ background: "#d4edda", color: "#155724", padding: "15px", borderRadius: "4px" }}>
                    <h3>✅ Đăng ký tài khoản thành công!</h3>
                    <p>Hệ thống đã ghi nhận email: <strong>{formData.email}</strong></p>
                    <button onClick={handleReset} style={{ marginTop: "10px", padding: "6px 12px", cursor: "pointer" }}>Gửi lại</button>
                </div>
            )}
        </div>
    );
}

export default FormEventsChallenge;
```
