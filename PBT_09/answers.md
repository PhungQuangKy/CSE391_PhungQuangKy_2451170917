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

## Câu C1 (8đ) — Debug DOM Code

### 1. Các lỗi tìm thấy và cách khắc phục (8 lỗi)

| STT | Vị trí / Đoạn code lỗi | Nguyên nhân | Cách khắc phục |
| :--- | :--- | :--- | :--- |
| **1** | `addEventListener("onclick", ...)` | Sử dụng sai tên sự kiện trong phương thức `addEventListener`. Không được phép có tiền tố `on`. | Đổi `"onclick"` thành `"click"`. |
| **2** | `countDisplay = count;` *(trong nút Reset)* | Gán trực tiếp giá trị số vào biến chứa DOM Element khiến biến bị mất tham chiếu đến thẻ HTML và không cập nhật giao diện. | Đổi thành `countDisplay.textContent = count;`. |
| **3** | `historyList.innerHTML = null;` *(trong nút Reset)* | Gán giá trị `null` vào thuộc tính chuỗi `innerHTML` không đúng chuẩn (trình duyệt sẽ tự ép kiểu thành chuỗi `"null"`). | Đổi thành chuỗi rỗng: `historyList.innerHTML = "";`. |
| **4** | `item.remove;` *(trong nút Clear History)* | Thiếu cặp dấu ngoặc đơn `()` khiến phương thức xóa phần tử không được thực thi. | Sửa thành gọi hàm: `item.remove();`. |
| **5** | `count = localStorage.getItem("count");` | Dữ liệu lấy từ `localStorage` luôn luôn là kiểu chuỗi (`string`). Khi thực hiện `count++` ở lần nhấn tiếp theo, JS sẽ bị lỗi nối chuỗi thay vì cộng số (ví dụ: `"0" + 1 = "01"`). | Ép kiểu về dạng số bằng cách dùng `Number()` hoặc `parseInt()`. |
| **6** | `count = localStorage.getItem("count");` | Nếu lần đầu truy cập trang (chưa có dữ liệu trong kho lưu trữ), câu lệnh trả về `null` khiến giao diện hiển thị chữ "null". | Thêm giá trị dự phòng mặc định: `|| 0`. |
| **7** | *Thiếu logic khôi phục lịch sử khi load trang* | Trong sự kiện `"beforeunload"` có lưu `historyList.innerHTML`, nhưng khi sự kiện `"load"` kích hoạt thì hoàn toàn bỏ quên việc hiển thị lại chuỗi này. | Bổ sung câu lệnh lấy dữ liệu từ `localStorage` và gán ngược lại vào `historyList.innerHTML`. |
| **8** | `li.addEventListener("click", ...)` | *(Hệ quả từ lỗi 7)* Nếu chỉ nạp lại giao diện bằng chuỗi `innerHTML` thô từ storage, tất cả các thẻ `<li>` cũ sẽ bị mất sạch các hàm lắng nghe sự kiện xóa đã gán ban đầu. | Sử dụng giải pháp **Event Delegation** (lắng nghe sự kiện click tập trung tại thẻ cha `#history`) để quản lý việc xóa cho cả phần tử cũ lẫn mới. |

---

### 2. Mã nguồn hoàn chỉnh sau khi sửa lỗi (Clean Code)

```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

// Sử dụng Event Delegation cho danh sách history (Giải quyết triệt để lỗi mất sự kiện click xóa khi tải lại trang)
historyList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        deleteHistory(e.target);
    }
});

// Xử lý sự kiện nút tăng giá trị (Increment)
document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;
    
    // Tạo và lưu history mới
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
});

// Xử lý sự kiện nút giảm giá trị (Decrement) - [Sửa lỗi 1: "onclick" -> "click"]
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
    
    // Đồng bộ thêm lịch sử giảm
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
});

// Xử lý sự kiện nút làm mới (Reset) - [Sửa lỗi 2 & 3: Reset DOM text và innerHTML chuẩn xác]
document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count; 
    historyList.innerHTML = ""; 
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Xóa toàn bộ lịch sử (Clear all history) - [Sửa lỗi 4: item.remove -> item.remove()]
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); 
    });
});

// Lưu dữ liệu vào localStorage khi người dùng rời hoặc reload trang
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Tải dữ liệu từ localStorage khi vừa truy cập trang - [Sửa lỗi 5, 6, 7 & 8: Ép kiểu và khôi phục UI]
window.addEventListener("load", () => {
    // Lấy dữ liệu, ép kiểu số và set mặc định bằng 0 nếu chưa có dữ liệu
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    
    // Khôi phục lại toàn bộ danh sách lịch sử dạng HTML
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
        historyList.innerHTML = savedHistory;
    }
});
```

## Câu C2 (7đ) — Performance

### 1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE? Event Delegation giải quyết thế nào?

#### Tại sao là Bad Practice?
* **Tốn dung lượng bộ nhớ (Memory Consumption):** Mỗi lần gọi `addEventListener`, trình duyệt phải khởi tạo và duy trì một đối tượng hàm (Event Listener Object) trong bộ nhớ. Việc nhân bản lên 1000 phần tử sẽ tiêu tốn đáng kể RAM, làm ứng dụng chạy nặng nề, đặc biệt trên các thiết bị cấu hình yếu.
* **Suy giảm hiệu năng (Performance Hit):** Quá trình duyệt qua vòng lặp để gắn sự kiện lúc khởi chạy (Initial Load Time) sẽ làm chậm thời gian phản hồi của trang web.
* **Khó khăn khi quản lý dữ liệu động (Dynamic Elements):** Khi có phần tử mới được thêm vào danh sách (ví dụ: người dùng tạo thêm item mới), phần tử đó hoàn toàn không có sự kiện. Ta lại phải viết thêm code để bind sự kiện thủ công cho nó, hoặc nếu phần tử bị xóa đi mà không gỡ bỏ lắng nghe sự kiện (`removeEventListener`), rất dễ gây ra hiện tượng rò rỉ bộ nhớ (**Memory Leak**).

#### Event Delegation giải quyết như thế nào?
Thay vì gắn 1000 sự kiện cho 1000 thẻ con, **Event Delegation (Ủy quyền sự kiện)** lợi dụng cơ chế **Event Bubbling (Nổi bọt sự kiện)** để chỉ gắn duy nhất **1 event listener** lên một thẻ cha chung ngoài cùng (ví dụ: thẻ `<ul>` hoặc `<div>` bao quanh).

* Khi bất kỳ thẻ con nào được tương tác, sự kiện click sẽ tự động nổi bọt (bubbling) lên thẻ cha.
* Tại thẻ cha, chúng ta chỉ cần dùng thuộc tính `e.target` để kiểm tra chính xác phần tử con nào thực sự được click thông qua các hàm như `e.target.matches()` hoặc `e.target.closest()`.
* **Kết quả:** Tiết kiệm bộ nhớ tối đa (1 event so với 1000 events), tăng tốc độ tải trang, và tự động áp dụng được cho tất cả các phần tử con được thêm mới vào DOM sau này mà không cần bind lại.

---

### 2. Refactor mã nguồn sử dụng `DocumentFragment`

#### Đoạn code sau khi Refactor:
```javascript
// Khởi tạo một bộ nhớ đệm DocumentFragment nằm ngoài cây DOM chính
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // Đưa phần tử vào fragment (Thao tác này chỉ diễn ra trong bộ nhớ, không gây reflow)
    fragment.appendChild(div);
}

// Đẩy toàn bộ 1000 phần tử từ fragment vào DOM thực tế (Chỉ gây đúng 1 lần reflow duy nhất)
document.body.appendChild(fragment);
```
