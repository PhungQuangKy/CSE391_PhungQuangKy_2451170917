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
