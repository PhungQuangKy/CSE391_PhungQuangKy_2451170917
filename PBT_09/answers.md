# Phần A — Lý Thuyết & Bài Tập Ngắn

---

## Câu A1 (5đ) — DOM Tree

### 1. Sơ đồ cây DOM (DOM Tree)
```text
document
└── div#app
    ├── header
    │   ├── h1
    │   │   └── "Todo App"
    │   └── nav
    │       ├── a.active (href="#") ── "All"
    │       ├── a (href="#") ── "Active"
    │       └── a (href="#") ── "Completed"
    └── main
        ├── form#todoForm
        │   ├── input#todoInput (type="text")
        │   └── button (type="submit") ── "Add"
        └── ul#todoList
            ├── li.todo-item ── "Learn HTML"
            └── li.todo-item.completed ── "Learn CSS"
```
# Phần DOM nâng cao — innerHTML vs textContent & Event Bubbling

---

## Câu A2 (5đ) — innerHTML vs textContent

### 1. Sự khác nhau & Ví dụ khi nào dùng mỗi cái
* **`innerHTML`**:
  * *Cách hoạt động:* Trả về hoặc thiết lập nội dung dạng chuỗi HTML, cho phép trình duyệt biên dịch và render các thẻ HTML (như `<div>`, `<strong>`,...).
  * *Khi nào dùng:* Khi bạn muốn chèn một đoạn mã hoặc cấu trúc giao diện có chứa thẻ HTML từ nguồn dữ liệu an toàn đã được kiểm soát (ví dụ: tạo danh sách động từ cấu trúc mảng nội bộ).
* **`textContent`**:
  * *Cách hoạt động:* Chỉ lấy hoặc thiết lập nội dung thuần văn bản (plain text). Tất cả các ký tự định dạng HTML truyền vào sẽ bị coi là chuỗi chữ thông thường, không bị trình duyệt biên dịch thành thẻ.
  * *Khi nào dùng:* Khi bạn chỉ muốn cập nhật nội dung văn bản (như tiêu đề, số lượng sản phẩm, nội dung thông báo) hoặc khi hiển thị dữ liệu do người dùng nhập vào để tránh các nguy cơ bảo mật.

### 2. Câu hỏi bảo mật: Tại sao `innerHTML` gây lỗ hổng XSS & Cách sửa

#### Tại sao gây lỗ hổng XSS?
Vì `innerHTML` sẽ thông qua trình duyệt để phân tích cú pháp chuỗi ký tự nhận được. Nếu kẻ tấn công cố tình nhập một đoạn mã script ẩn hoặc các thẻ HTML mang thuộc tính kích hoạt sự kiện (như lỗi tải ảnh bên dưới), đoạn mã đó sẽ lập tức được thực thi ngay trên trình duyệt của người dùng, dẫn đến việc lộ thông tin token, cookie hoặc chiếm quyền điều khiển tài khoản.

#### Cách sửa mã nguồn minh họa
Thay vì gán trực tiếp bằng thuộc tính `innerHTML`, hãy chuyển sang sử dụng `textContent` để biến chuỗi độc hại thành văn bản thuần vô hại:

```javascript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;

// CÁCH SỬA AN TOÀN: Thay innerHTML bằng textContent
document.querySelector("#result").textContent = userInput; 
// Trình duyệt sẽ hiển thị đúng chuỗi "<img src=x onerror=...>" ra màn hình chứ không kích hoạt mã độc.
```

##A3 : 
BUTTON
INNER
OUTER

