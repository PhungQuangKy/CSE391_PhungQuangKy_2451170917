---

## Câu A1: Grid System

Dựa trên đoạn mã HTML sử dụng hệ thống Grid 12 cột (Bootstrap chuẩn), dưới đây là phân tích layout tại các kích thước màn hình:

| Kích thước | < 768px (Mobile) | 768px - 991px (Tablet) | ≥ 992px (Desktop) |
| :--- | :--- | :--- | :--- |
| **Class áp dụng** | `col-12` | `col-md-6` | `col-lg-3` |
| **Số cột hiển thị** | **1 cột** | **2 cột** | **4 cột** |
| **Box layout** | Xếp chồng (100% width) | Chia đôi (50% width mỗi box) | Chia tư (25% width mỗi box) |

### Câu hỏi thêm:

* **`col-md-6` nghĩa là gì?**
    * `col`: Viết tắt của Column (cột).
    * `md`: Viết tắt của Medium (mành hình trung bình, thường là tablet ≥ 768px).
    * `6`: Chiếm 6/12 cột của hệ thống Grid (tương đương 50% chiều rộng của hàng).
    * **Ý nghĩa:** Trên các thiết bị có kích thước từ Medium trở lên, mỗi phần tử sẽ chiếm một nửa chiều rộng màn hình.

* **Tại sao không cần viết `col-sm-12`?**
    * Vì trong hệ thống Grid của Bootstrap, các class được thiết kế theo quy tắc **kế thừa từ nhỏ đến lớn**. 
    * Nếu bạn đã khai báo `col-12` (áp dụng cho kích thước nhỏ nhất - extra small), thì các mốc lớn hơn như `sm` (Small) sẽ tự động kế thừa giá trị đó trừ khi bạn khai báo một giá trị khác đè lên (như `col-md-6`). Do đó, viết `col-sm-12` là dư thừa.
 
---

## Câu A2: Utilities & Components

### 1. Giải thích class `d-none d-md-block`
Sự kết hợp này sử dụng nguyên tắc ghi đè của Mobile-First:
* **`d-none`**: Ẩn phần tử này trên tất cả các kích thước màn hình (mặc định từ mobile).
* **`d-md-block`**: Hiển thị phần tử dưới dạng khối (`display: block`) khi màn hình đạt kích thước từ **Medium (md) trở lên** (≥ 768px).
* **Kết luận**: Element này sẽ **ẩn trên Mobile** (< 768px) và chỉ **hiển thị từ Tablet/Desktop** (≥ 768px) trở lên.

### 2. Liệt kê 5 Spacing Utilities (Margin/Padding)
Hệ thống khoảng cách trong Bootstrap sử dụng công thức: `{property}{sides}-{size}`

| Utility | Giải thích |
| :--- | :--- |
| **`mt-3`** | `margin-top`: Khoảng cách phía trên (mức 3 thường là 1rem/16px). |
| **`px-4`** | `padding-left` & `padding-right`: Khoảng cách đệm hai bên trái và phải (mức 4). |
| **`mb-auto`** | `margin-bottom: auto`: Tự động đẩy phần tử khác ở phía dưới (thường dùng trong Flexbox). |
| **`ms-2`** | `margin-start`: Khoảng cách bên trái (trong chế độ đọc từ trái sang phải - LTR). |
| **`py-5`** | `padding-top` & `padding-bottom`: Khoảng cách đệm phía trên và dưới (mức 5 - mức lớn nhất). |

### 3. Sự khác nhau giữa các loại Container

| Loại | Đặc điểm hiển thị |
| :--- | :--- |
| **`.container`** | Có chiều rộng cố định (fixed width) thay đổi theo từng breakpoint. Luôn có khoảng trống hai bên trên màn hình lớn. |
| **`.container-fluid`** | Luôn chiếm **100% chiều rộng** màn hình ở mọi kích thước (full width). |
| **`.container-md`** | Chiếm 100% chiều rộng cho đến khi đạt mốc **Medium (768px)**. Từ mốc này trở lên, nó sẽ hoạt động giống `.container` (có fixed width). |

### Câu C1: Tùy biến Bootstrap & Tailwind

1. **Đổi màu `$primary`:**
   * **Công cụ:** Cần sử dụng trình biên dịch Sass (Sass compiler) như extension "Live Sass Compiler" trên VS Code.
   * **Quy trình:** Tạo file `.scss` riêng, khai báo biến màu `$primary: #E63946;` nằm phía trên dòng lệnh `@import` mã nguồn Bootstrap để ghi đè giá trị mặc định.

2. **Tại sao dùng SASS variables thay vì override trực tiếp?**
   * Khi thay đổi biến `$primary`, Bootstrap sẽ tự động tính toán lại đồng bộ tất cả các biến liên quan như màu hover, màu đổ bóng (box-shadow), và các trạng thái active của hàng loạt component (button, alert, badge...). Nếu dùng CSS thuần override `.btn-primary`, bạn sẽ phải sửa thủ công hàng chục class khác để giữ tính nhất quán.

3. **Tailwind CSS:**
   * **HTML file size:** Thường lớn hơn CSS thuần do chứa nhiều utility class trực tiếp trên thẻ.
   * **Maintainability:** Dễ bảo trì hơn vì lập trình viên có thể đọc và sửa giao diện trực tiếp tại file HTML, đồng thời dễ dàng tái sử dụng các tổ hợp class thông qua chỉ thị `@apply`.

### Câu C2: So sánh CSS thuần và Bootstrap (Navbar & Product Card)
Dựa trên việc thực hiện cùng một mẫu Navbar responsive và Product Card:

| Tiêu chí | CSS thuần (tự viết) | Bootstrap Version |
| :--- | :--- | :--- |
| **Số dòng CSS** | Cần từ 50-100 dòng để xử lý Flexbox và Media Queries. | Gần như 0 dòng CSS tùy chỉnh, chỉ dùng class có sẵn. |
| **Thời gian phát triển** | Chậm hơn do phải tính toán grid và debug trên nhiều trình duyệt. | Nhanh hơn gấp 3-4 lần do framework đã tối ưu sẵn. |
| **Khả năng tùy biến** | Tùy biến 100% theo ý muốn cá nhân. | Bị gò bó vào khung mẫu, khó tùy biến sâu nếu không giỏi Sass. |

* **NÊN dùng Bootstrap khi:** Cần làm nhanh các dự án Admin Dashboard, sản phẩm mẫu (MVP), hoặc dự án có timeline gấp.
* **KHÔNG NÊN dùng Bootstrap khi:** Cần giao diện độc bản, nghệ thuật cao, hoặc cần tối ưu dung lượng file ở mức cực nhỏ để tăng tốc độ tải trang tối đa.


