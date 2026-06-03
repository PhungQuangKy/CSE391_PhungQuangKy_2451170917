### Câu 6.1:

```
import { useState } from "react";

function ListBasicsChallenge() {
    const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);

    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    // 3. Thử thách: Tính tuổi trung bình của danh sách sinh viên
    // Dùng hàm reduce để cộng tổng tuổi, sau đó chia cho độ dài mảng
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    const averageAge = students.length > 0 ? (totalAge / students.length).toFixed(1) : 0;

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}>
            <h2>Danh sách trái cây</h2>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>

            <hr />

            <h2>Danh sách sinh viên</h2>
            {students.map((student, index) => {
                // 2. Thử thách: Xác định màu sắc dựa vào điều kiện tuổi >= 20
                const isAdult = student.age >= 20;

                return (
                    <div
                        key={student.id}
                        style={{
                            padding: "10px",
                            margin: "8px 0",
                            background: "#f9f9f9",
                            borderRadius: "4px",
                            borderLeft: isAdult ? "5px solid #2ecc71" : "5px solid #bdc3c7", // Kẻ viền màu
                            color: isAdult ? "#27ae60" : "#333", // Đổi màu chữ xanh khi >= 20 tuổi
                            fontWeight: isAdult ? "bold" : "normal"
                        }}
                    >
                        {/* 1. Thử thách: Hiển thị STT bằng biến index (index bắt đầu từ 0 nên cần +1) */}
                        STT {index + 1}: {student.name} - {student.age} tuổi
                    </div>
                );
            })}

            {/* 3. Thử thách: Khu vực hiển thị kết quả tính toán */}
            <div style={{
                marginTop: "20px",
                padding: "12px",
                background: "#e8f4f8",
                borderRadius: "4px",
                border: "1px solid #3498db",
                color: "#2c3e50"
            }}>
                📊 <b>Thống kê:</b> Tuổi trung bình của lớp là: <strong>{averageAge}</strong> tuổi
            </div>
        </div>
    );
}

export default ListBasicsChallenge;
```

### Câu 6.2:

```
import { useState, useRef } from "react";

function CreateItemChallenge() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");

    // State quản lý việc hiển thị thông báo thành công
    const [thongBao, setThongBao] = useState(false);

    // Dùng useRef để quản lý con trỏ chuột (focus) của ô input
    const inputRef = useRef(null);

    function handleAdd() {
        // 1. Thử thách: Validate chặn không cho thêm nếu chuỗi trống hoặc chỉ toàn dấu cách
        if (newName.trim() === "") {
            alert("Tên môn học không được để trống!");
            return;
        }

        const newItem = {
            id: Date.now(), // Tạo id độc nhất dựa trên thời gian thực chạy tính bằng miligiây
            name: newName.trim()
        };

        // Thêm môn học mới vào cuối danh sách
        setItems([...items, newItem]);

        // Xóa sạch nội dung chữ đang nằm trong ô input
        setNewName("");

        // 2. Thử thách: Hiển thị "Đã thêm thành công!" tạm thời
        setThongBao(true);
        setTimeout(() => {
            setThongBao(false); // Tự động ẩn thông báo sau 2 giây
        }, 2000);

        // 3. Thử thách: Tự động đưa con trỏ chuột quay lại nhấp nháy ở ô input
        inputRef.current.focus();
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleAdd();
        }
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}>
            <h2>Thêm môn học công nghệ</h2>

            <div style={{ marginBottom: "15px", position: "relative" }}>
                <input
                    // Gắn ref để React có thể can thiệp ép focus ở hàm handleAdd
                    ref={inputRef}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyDown} // Thay cho onKeyPress đã bị loại bỏ ở các phiên bản React mới
                    placeholder="Nhập tên môn học..."
                    style={{ padding: "8px", marginRight: "10px", width: "60%", boxSizing: "border-box" }}
                />
                <button
                    onClick={handleAdd}
                    style={{ padding: "8px 16px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                    ➕ Thêm
                </button>
            </div>

            {/* 2. Hiển thị thông báo thành công có điều kiện */}
            {thongBao && (
                <div style={{ color: "#27ae60", fontWeight: "bold", marginBottom: "15px", fontSize: "14px" }}>
                    ✅ Đã thêm thành công!
                </div>
            )}

            <h3>Danh sách ({items.length} môn):</h3>
            <div style={{ border: "1px solid #eee", borderRadius: "4px" }}>
                {items.map(item => (
                    <div key={item.id} style={{
                        padding: "10px",
                        borderBottom: "1px solid #eee",
                        background: "#fff"
                    }}>
                        • {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateItemChallenge;
```

### Câu 6.3:

```
import { useState, useRef } from "react";

function DeleteItemChallenge() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" }
    ]);

    // Các State phục vụ Thử thách
    const [thongBaoXoa, setThongBaoXoa] = useState(""); // Lưu: "Đã xóa [Tên]"
    const [lastItemsState, setLastItemsState] = useState(null); // Lưu danh sách cũ để Hoàn tác
    const [showUndo, setShowUndo] = useState(false); // Bật/tắt nút Hoàn tác

    // Dùng useRef để giữ ID của setTimeout, tránh lỗi click xóa liên tục bị loạn bộ đếm
    const undoTimerRef = useRef(null);

    function handleDelete(id, name) {
        // 3. Thử thách: Chỉ cho xóa khi người dùng bấm Confirm xác nhận
        const xacNhan = window.confirm(`Bạn có chắc chắn muốn xóa sinh viên "${name}" không?`);
        if (!xacNhan) return;

        // Xóa cũ đi, xóa bộ đếm cũ nếu có
        if (undoTimerRef.current) clearTimeout(undoTimerRef.current);

        // Sao lưu danh sách HIỆN TẠI trước khi xóa để chuẩn bị cho nút Hoàn tác
        setLastItemsState(items);

        // Thực hiện xóa bằng hàm .filter()
        setItems(items.filter(item => item.id !== id));

        // 1. Thử thách: Hiển thị thông báo kèm tên phần tử vừa xóa
        setThongBaoXoa(`Đã xóa sinh viên "${name}"`);

        // 2. Thử thách: Kích hoạt hiển thị nút "Hoàn tác"
        setShowUndo(true);

        // Tự động đóng cơ hội Hoàn tác và ẩn thông báo sau 5 giây (5000ms)
        undoTimerRef.current = setTimeout(() => {
            setShowUndo(false);
            setThongBaoXoa("");
            setLastItemsState(null);
        }, 5000);
    }

    // Hàm xử lý khi người dùng nhấn nút "Hoàn tác"
    function handleUndo() {
        if (lastItemsState) {
            // Khôi phục lại mảng dữ liệu cũ đã sao lưu
            setItems(lastItemsState);

            // Dọn dẹp trạng thái và bộ đếm
            setShowUndo(false);
            setThongBaoXoa("🔄 Đã khôi phục dữ liệu thành công!");
            setLastItemsState(null);
            if (undoTimerRef.current) clearTimeout(undoTimerRef.current);

            // Ẩn dòng chữ khôi phục sau 2 giây cho sạch giao diện
            setTimeout(() => setThongBaoXoa(""), 2000);
        }
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}>
            <h2>Quản lý xóa sinh viên</h2>

            {/* Khu vực hiển thị thông báo xóa và nút HOÀN TÁC */}
            {thongBaoXoa && (
                <div style={{
                    background: showUndo ? "#fff3cd" : "#d4edda",
                    color: showUndo ? "#856404" : "#155724",
                    padding: "12px",
                    borderRadius: "4px",
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid"
                }}>
                    <span>{thongBaoXoa}</span>
                    {/* 2. Thử thách: Nút Hoàn tác xuất hiện trong vòng 5 giây */}
                    {showUndo && (
                        <button
                            onClick={handleUndo}
                            style={{
                                background: "#007bff",
                                color: "white",
                                border: "none",
                                padding: "4px 10px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            ↩ Hoàn tác (5s)
                        </button>
                    )}
                </div>
            )}

            {items.length === 0 ? (
                <p style={{ color: "#999", textAlign: "center", padding: "20px", border: "1px dashed #ccc" }}>
                    Danh sách trống không còn sinh viên nào.
                </p>
            ) : (
                items.map(item => (
                    <div key={item.id} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        margin: "5px 0",
                        background: "#f9f9f9",
                        border: "1px solid #eee",
                        borderRadius: "4px"
                    }}>
                        <span>{item.name}</span>
                        <button
                            // Truyền thêm item.name vào hàm xử lý sự kiện
                            onClick={() => handleDelete(item.id, item.name)}
                            style={{
                                background: "#e74c3c",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            Xóa
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default DeleteItemChallenge;
```

### Câu 6.4:

```
import { useState } from "react";

function UpdateItemChallenge() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");

    // State quản lý việc hiển thị thông báo "Đã lưu!"
    const [thongBaoLuu, setThongBaoLuu] = useState(false);

    // Bắt đầu sửa
    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
    }

    // Lưu sửa
    function saveEdit() {
        // 2. Thử thách: Validate chặn không cho lưu nếu tên trống hoặc tuổi trống
        if (editName.trim() === "") {
            alert("Tên sinh viên không được để trống!");
            return;
        }
        if (editAge === "" || parseInt(editAge) <= 0) {
            alert("Tuổi phải là số lớn hơn 0!");
            return;
        }

        // Cập nhật phần tử trùng ID trong mảng thông qua .map()
        setItems(items.map(item =>
            item.id === editingId
                ? { ...item, name: editName.trim(), age: parseInt(editAge) }
                : item
        ));

        setEditingId(null); // Thoát chế độ sửa

        // 3. Thử thách: Hiển thị thông báo "Đã lưu!" trong vòng 2 giây
        setThongBaoLuu(true);
        setTimeout(() => {
            setThongBaoLuu(false);
        }, 2000);
    }

    // Hủy sửa
    function cancelEdit() {
        setEditingId(null);
    }

    // Xử lý phím tắt
    function handleKeyDown(event) {
        if (event.key === "Enter") saveEdit();
        if (event.key === "Escape") cancelEdit();
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}>
            <h2>Quản lý sửa thông tin</h2>

            {/* 3. Vùng hiển thị thông báo "Đã lưu!" có điều kiện */}
            {thongBaoLuu && (
                <div style={{
                    background: "#d4edda",
                    color: "#155724",
                    padding: "10px",
                    borderRadius: "4px",
                    marginBottom: "15px",
                    fontWeight: "bold",
                    fontSize: "14px"
                }}>
                    ✅ Đã lưu thay đổi thành công!
                </div>
            )}

            {items.map(item => (
                <div key={item.id} style={{
                    padding: "12px",
                    margin: "8px 0",
                    background: editingId === item.id ? "#eef6fc" : "#f9f9f9", // Đổi nền dòng đang sửa
                    border: editingId === item.id ? "1px dashed #3498db" : "1px solid #eee",
                    borderRadius: "4px"
                }}>
                    {editingId === item.id ? (
                        // ================= CHẾ ĐỘ SỬA =================
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={handleKeyDown} // Dùng onKeyDown thay cho onKeyPress
                                autoFocus
                                // 1. Thử thách: Highlight ô input bằng viền xanh đậm khi sửa
                                style={{
                                    padding: "6px",
                                    border: "2px solid #3498db",
                                    borderRadius: "4px",
                                    outline: "none",
                                    flex: 2
                                }}
                            />
                            <input
                                type="number"
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)}
                                onKeyDown={handleKeyDown}
                                // 1. Thử thách: Highlight tương tự cho ô nhập tuổi
                                style={{
                                    padding: "6px",
                                    border: "2px solid #3498db",
                                    borderRadius: "4px",
                                    outline: "none",
                                    width: "60px"
                                }}
                            />
                            <button onClick={saveEdit} style={{ background: "#27ae60", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" }}>
                                Lưu
                            </button>
                            <button onClick={cancelEdit} style={{ background: "#95a5a6", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" }}>
                                Hủy
                            </button>
                        </div>
                    ) : (
                        // ================= CHẾ ĐỘ XEM =================
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>{item.name} - <b>{item.age}</b> tuổi</span>
                            <button onClick={() => startEdit(item)} style={{ background: "#3498db", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                                ✏️ Sửa
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UpdateItemChallenge;
```
