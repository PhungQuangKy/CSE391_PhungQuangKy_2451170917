##Câu A1: 

1. type="email" → Ô nhập text, tự kiểm tra định dạng có ký tự @ và tên miền → Dùng cho form đăng ký tài khoản hoặc nhận bản tin khuyến mãi (Newsletter).

2. type="password" → Ô nhập text ẩn ký tự (dấu chấm/sao), bảo vệ tính riêng tư → Dùng cho ô nhập mật khẩu đăng nhập hoặc mật khẩu thanh toán.

3. type="number" → Ô nhập số kèm nút tăng/giảm, chỉ cho phép nhập ký tự số → Dùng để chọn số lượng (Quantity) sản phẩm muốn mua trong giỏ hàng.

4. type="tel" → Ô nhập văn bản, tự động tối ưu bàn phím số trên điện thoại → Dùng để nhập số điện thoại người mua trong phần thông tin giao hàng.

5. type="date" → Ô nhập hiển thị bảng lịch (Date picker) để chọn ngày → Dùng để khách hàng chọn ngày giao hàng mong muốn hoặc nhập ngày sinh để nhận quà.

6. type="range" → Thanh trượt chọn giá trị trong một khoảng (min-max) → Dùng làm bộ lọc (Filter) tìm kiếm sản phẩm theo tầm giá hoặc kích thước.

7. type="search" → Ô nhập text có nút "x" để xóa nhanh nội dung, tối ưu cho tìm kiếm → Dùng cho thanh tìm kiếm tên sản phẩm trên trang chủ.

8. type="color" → Ô hiển thị bảng chọn màu sắc (Color picker) → Dùng cho bộ lọc tìm kiếm sản phẩm theo màu sắc (ví dụ: tìm áo màu xanh, đỏ...).

9. type="file" → Nút bấm mở cửa sổ chọn tệp tin từ thiết bị → Dùng để khách hàng tải ảnh thực tế của sản phẩm lên phần đánh giá (Review).

10. type="checkbox" → Ô tích chọn (có thể chọn nhiều giá trị cùng lúc) → Dùng trong bộ lọc thuộc tính sản phẩm (chọn cùng lúc nhiều thương hiệu, nhiều size).

##A2:

Trường hợp 1: <input type="text" required value=""> (User để trống)

Kết quả: Trình duyệt ngăn chặn việc gửi form và hiển thị thông báo lỗi (ví dụ: "Please fill out this field").

Tại sao: Thuộc tính required bắt buộc trường nhập liệu không được để trống khi nhấn Submit.

Trường hợp 2: <input type="email" value="abc"> (User gõ "abc")

Kết quả: Trình duyệt báo lỗi dữ liệu không hợp lệ (ví dụ: "Please enter an email address").

Tại sao: type="email" yêu cầu dữ liệu phải có định dạng email chuẩn (phải có ký tự @). "abc" thiếu định dạng này nên bị từ chối.

Trường hợp 3: <input type="number" min="1" max="10" value="15"> (User gõ 15)

Kết quả: Trình duyệt báo lỗi giá trị vượt quá giới hạn (ví dụ: "Value must be less than or equal to 10").

Tại sao: Thuộc tính max="10" giới hạn giá trị cao nhất là 10. Con số 15 vi phạm quy tắc này.

Trường hợp 4: <input type="text" pattern="[0-9]{10}" value="abc123"> (User gõ "abc123")

Kết quả: Trình duyệt báo lỗi định dạng không khớp (ví dụ: "Please match the requested format").

Tại sao: Thuộc tính pattern="[0-9]{10}" yêu cầu dữ liệu phải là một chuỗi gồm đúng 10 chữ số (từ 0-9). Chuỗi "abc123" chứa chữ cái và không đủ độ dài.

Trường hợp 5: <input type="password" minlength="8" value="123"> (User gõ "123")

Kết quả: Trình duyệt báo lỗi độ dài quá ngắn (ví dụ: "Please lengthen this text to 8 characters or more").

Tại sao: Thuộc tính minlength="8" bắt buộc chuỗi nhập vào phải có ít nhất 8 ký tự. Chuỗi "123" chỉ có 3 ký tự.
