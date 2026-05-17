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


