Câu 2.1:

```
function PersonalChallenge() {
    // 1. Thông tin cá nhân
    const ten = "Phùng Việt Hoàng";
    const tuoi = 21;
    const queQuan = "Hà Nội";

    // 2. Xử lý hiển thị theo giờ hiện tại
    const gioHienTai = new Date().getHours();
    let loiChao = "Chào buổi tối! 🌙";
    if (gioHienTai < 12) loiChao = "Chào buổi sáng! ☀️";
    else if (gioHienTai < 18) loiChao = "Chào buổi chiều! 🌤️";

    // 3. Tính toán BMI (Cân nặng / Chiều cao^2)
    const canNang = 65; // kg
    const chieuCao = 1.72; // mét
    const bmi = canNang / (chieuCao * chieuCao);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            {/* Thử thách 2: Chào theo giờ */}
            <h2>{loiChao}</h2>
            <hr />

            {/* Thử thách 1: Thông tin cá nhân */}
            <h3>Thông tin cá nhân:</h3>
            <p>Họ và tên: <b>{ten}</b></p>
            <p>Tuổi: {tuoi}</p>
            <p>Quê quán: {queQuan}</p>
            <hr />

            {/* Thử thách 3: Tính BMI */}
            <h3>Chỉ số sức khỏe:</h3>
            <p>Cân nặng: {canNang}kg | Chiều cao: {chieuCao}m</p>
            <p>Chỉ số BMI của bạn: <b>{bmi.toFixed(2)}</b></p>
        </div>
    );
}

export default PersonalChallenge;
```

Câu 2.2:

```
function ConditionChallenge() {
    // Dữ liệu giả lập
    const isOnline = true;
    const isLoggedIn = true;
    const stock = 0;

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            {/* 1. Trạng thái Online/Offline */}
            <h3>
                Trạng thái hệ thống: {isOnline ? "🟢 Online" : "🔴 Offline"}
            </h3>
            <hr />

            {/* 2. Hiện/ẩn menu dựa vào isLoggedIn */}
            <nav style={{ background: "#f0f0f0", padding: "10px", marginBottom: "20px" }}>
                <span>🏠 Trang chủ | 📰 Tin tức</span>
                {isLoggedIn && <span> | 👤 Hồ sơ cá nhân | ⚙️ Cài đặt</span>}
            </nav>
            <hr />

            {/* 3. Hiển thị "Hết hàng" khi stock = 0 */}
            <div style={{ border: "1px solid #ccc", padding: "15px", width: "200px" }}>
                <h4>Sản phẩm A</h4>
                <p>Số lượng kho: {stock}</p>
                {stock === 0 ? (
                    <span style={{ color: "red", fontWeight: "bold" }}>❌ Hết hàng</span>
                ) : (
                    <button>Thêm vào giỏ</button>
                )}
            </div>
        </div>
    );
}

export default ConditionChallenge;
```

Câu 2.3:

```
function ProductListChallenge() {
    // 1. Danh sách 5 sản phẩm
    const dsSanPham = [
        { id: 101, ten: "Chuột không dây", gia: 250000 },
        { id: 102, ten: "Bàn phím cơ", gia: 1200000 },
        { id: 103, ten: "Tai nghe Gaming", gia: 850000 },
        { id: 104, ten: "Màn hình 24 inch", gia: 3500000 },
        { id: 105, ten: "Lót chuột cỡ lớn", gia: 150000 }
    ];

    // 3. Tính tổng giá bằng hàm reduce của JavaScript
    const tongTien = dsSanPham.reduce((total, item) => total + item.gia, 0);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Danh sách sản phẩm</h2>
            <ul>
                {dsSanPham.map((sp) => {
                    // 2. Kiểm tra điều kiện giá > 1.000.000 để đổi màu chữ
                    const laGiaCao = sp.gia > 1000000;

                    return (
                        <li key={sp.id} style={{ margin: "10px 0" }}>
                            <span>{sp.ten} - </span>
                            <span style={{
                                color: laGiaCao ? "red" : "black",
                                fontWeight: laGiaCao ? "bold" : "normal"
                            }}>
                                {sp.gia.toLocaleString("vi-VN")}đ
                            </span>
                        </li>
                    );
                })}
            </ul>

            <hr />
            {/* Hiển thị tổng tiền */}
            <h3>Tổng giá trị: {tongTien.toLocaleString("vi-VN")}đ</h3>
        </div>
    );
}

export default ProductListChallenge;
```
