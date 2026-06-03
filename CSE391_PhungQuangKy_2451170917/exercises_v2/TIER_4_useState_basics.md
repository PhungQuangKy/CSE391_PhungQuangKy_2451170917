### Câu 4.1:

```
import { useState } from "react";

function NumberStateChallenge() {
    const [count, setCount] = useState(0);

    // 2 & 3. Xử lý logic màu sắc và trạng thái dựa vào giá trị count hiện tại
    let mauSac = "black";
    let trangThai = "Số không";

    if (count > 0) {
        mauSac = "green";
        trangThai = "Số dương";
    } else if (count < 0) {
        mauSac = "red";
        trangThai = "Số âm";
    }

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "sans-serif" }}>
            {/* Thay đổi màu sắc dựa theo biến mauSac */}
            <h2 style={{ color: mauSac }}>Bộ đếm: {count}</h2>

            {/* Hiển thị trạng thái Số dương / Số âm */}
            <p>Trạng thái: <b>{trangThai}</b></p>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button onClick={() => setCount(count + 1)}>Tăng (+1)</button>
                <button onClick={() => setCount(count - 1)}>Giảm (-1)</button>

                {/*Thêm nút Tăng 5 */}
                <button onClick={() => setCount(count + 5)}>Tăng (+5)</button>

                <button onClick={() => setCount(count * 2)}>Nhân đôi</button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
        </div>
    );
}

export default NumberStateChallenge;
```

### Câu 4.2:

```
import { useState } from "react";

function StringStateChallenge() {
    // State cho thử thách 1 & 2
    const [email, setEmail] = useState("");

    // State cho thử thách 3 (Mật khẩu và trạng thái Ẩn/Hiện)
    const [password, setPassword] = useState("");
    const [hienMatKhau, setHienMatKhau] = useState(false);

    // 2. Kiểm tra email hợp lệ (chứa ký tự "@")
    const laEmailHopLe = email.includes("@");

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}>
            <h2>Thử thách Controlled Input</h2>

            {/* 1 & 2. Ô nhập Email + Đếm ký tự + Kiểm tra hợp lệ */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginTop: "5px" }}>
                    {/* Thử thách 1: Đếm số ký tự */}
                    <span style={{ color: email.length > 100 ? "red" : "#666" }}>
                        {email.length}/100 ký tự
                    </span>

                    {/* Thử thách 2: Báo email hợp lệ */}
                    {email && (
                        <span style={{ color: laEmailHopLe ? "green" : "red", fontWeight: "bold" }}>
                            {laEmailHopLe ? "✓ Email hợp lệ" : "✕ Thiếu ký tự @"}
                        </span>
                    )}
                </div>
            </div>

            {/* 3. Ô nhập mật khẩu với nút Ẩn/Hiện */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Mật khẩu:</label>
                <div style={{ display: "flex" }}>
                    <input
                        // Thay đổi type giữa "password" và "text" dựa vào state hienMatKhau
                        type={hienMatKhau ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        style={{ flex: 1, padding: "8px" }}
                    />
                    <button
                        type="button"
                        onClick={() => setHienMatKhau(!hienMatKhau)}
                        style={{ padding: "8px 12px", cursor: "pointer" }}
                    >
                        {hienMatKhau ? "Ẩn" : "Hiện"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StringStateChallenge;
```

### Câu 4.3:

```
import { useState } from "react";

function BooleanStateChallenge() {
    // 1. State ẩn/hiện mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    // 2. State đóng/mở Accordion
    const [isOpen, setIsOpen] = useState(false);

    // 3. State bật/tắt bóng đèn
    const [isLightOn, setIsLightOn] = useState(false);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}>
            <h2>Thử thách Toggle (Boolean)</h2>
            <hr />

            {/* Thử thách 1: Hiện/Ẩn mật khẩu */}
            <div style={{ marginBottom: "30px" }}>
                <h3>1. Ẩn/Hiện mật khẩu</h3>
                <div style={{ display: "flex", gap: "5px" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        defaultValue="hoang12345"
                        style={{ padding: "8px", flex: 1 }}
                    />
                    <button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "🙈 Ẩn" : "👁️ Hiện"}
                    </button>
                </div>
            </div>

            {/* Thử thách 2: Accordion đơn giản */}
            <div style={{ marginBottom: "30px" }}>
                <h3>2. Accordion</h3>
                <div style={{ border: "1px solid #ccc", borderRadius: "4px" }}>
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ background: "#f0f0f0", padding: "10px", cursor: "pointer", fontWeight: "bold" }}
                    >
                        {isOpen ? "▼ Điều khoản sử dụng" : "► Điều khoản sử dụng"}
                    </div>
                    {isOpen && (
                        <div style={{ padding: "10px", borderTop: "1px solid #ccc", fontSize: "14px" }}>
                            Đây là nội dung điều khoản chi tiết. Bạn cần tuân thủ các quy định khi tham gia khóa học này.
                        </div>
                    )}
                </div>
            </div>

            {/* Thử thách 3: Bật/Tắt bóng đèn */}
            <div style={{ marginBottom: "30px", textAlign: "center" }}>
                <h3>3. Bật/Tắt bóng đèn</h3>
                <div style={{ fontSize: "50px", margin: "10px 0", filter: isLightOn ? "none" : "grayscale(100%)" }}>
                    💡
                </div>
                <button
                    onClick={() => setIsLightOn(!isLightOn)}
                    style={{
                        padding: "8px 16px",
                        background: isLightOn ? "#f1c40f" : "#bdc3c7",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    {isLightOn ? "TẮT ĐÈN" : "BẬT ĐÈN"}
                </button>
            </div>
        </div>
    );
}

export default BooleanStateChallenge;
```

### Câu 4.4:

```
import { useState } from "react";

function MultipleStatesChallenge() {
    // Khai báo các State cần thiết
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // Thử thách 1: Thêm state Email
    const [age, setAge] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Hàm xử lý khi nhấn nút Đăng ký
    function handleSubmit() {
        // Kiểm tra xem đã nhập đủ thông tin chưa
        if (name.trim() === "" || email.trim() === "" || age === "") {
            alert("Vui lòng nhập đầy đủ họ tên, email và tuổi!");
            return;
        }

        // Kiểm tra email cơ bản
        if (!email.includes("@")) {
            alert("Email không hợp lệ (thiếu ký tự @)!");
            return;
        }

        // Thử thách 2: Validate tuổi phải từ 1 đến 99
        const tuoiSo = Number(age);
        if (tuoiSo <= 0 || tuoiSo >= 100) {
            alert("Tuổi phải lớn hơn 0 và nhỏ hơn 100!");
            return;
        }

        // Nếu tất cả hợp lệ thì đổi trạng thái submitted sang true
        setSubmitted(true);
    }

    // Hàm reset form quay lại từ đầu
    function handleReset() {
        setName("");
        setEmail("");
        setAge("");
        setIsStudent(false);
        setSubmitted(false);
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}>
            <h2>Form đăng ký thành viên</h2>

            {!submitted ? (
                // GIAO DIỆN FORM ĐIỀN THÔNG TIN
                <div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ display: "block" }}>Tên: </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: "100%", padding: "6px" }}
                        />
                    </div>

                    {/* Thử thách 1: Ô nhập Email */}
                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ display: "block" }}>Email: </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", padding: "6px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ display: "block" }}>Tuổi: </label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={{ width: "100%", padding: "6px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isStudent}
                                onChange={(e) => setIsStudent(e.target.checked)}
                            />
                            Là sinh viên
                        </label>
                    </div>

                    <button
                        onClick={handleSubmit}
                        style={{ padding: "8px 16px", background: "#2ecc71", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                    >
                        Đăng ký
                    </button>
                </div>
            ) : (
                // GIAO DIỆN HIỂN THỊ KHI ĐĂNG KÝ THÀNH CÔNG
                <div style={{ background: "#d4edda", color: "#155724", padding: "15px", borderRadius: "4px", border: "1px solid #c3e6cb" }}>
                    {/* Thử thách 3: Hiển thị lời chào kèm tên */}
                    <h3>✅ Xin chào {name}!</h3>
                    <p><b>Đăng ký tài khoản thành công với thông tin:</b></p>
                    <ul style={{ paddingLeft: "20px" }}>
                        <li>Email: {email}</li>
                        <li>Tuổi: {age} tuổi</li>
                        <li>Sinh viên: {isStudent ? "Có" : "Không"}</li>
                    </ul>
                    <button
                        onClick={handleReset}
                        style={{ padding: "6px 12px", background: "#fff", border: "1px solid #155724", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}
                    >
                        Đăng ký lại
                    </button>
                </div>
            )}
        </div>
    );
}

export default MultipleStatesChallenge;
```
