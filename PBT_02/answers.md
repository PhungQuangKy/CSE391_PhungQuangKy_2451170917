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

##Câu A2:

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

##Câu A3:

Tại sao <label for="email"> quan trọng cho người dùng screen reader?

Liên kết dữ liệu: Thuộc tính for kết nối trực tiếp văn bản mô tả với ô nhập liệu (id). Khi người dùng khiếm thị dùng screen reader (trình đọc màn hình) tab vào ô input, thiết bị sẽ đọc to nội dung trong thẻ <label> tương ứng.

Xác định mục đích: Nếu không có <label>, trình đọc màn hình có thể chỉ thông báo là "Edit text, rỗng", khiến người dùng không biết ô đó yêu cầu nhập Email, Họ tên hay Mật khẩu.

Mở rộng vùng tương tác: Giúp người dùng có vấn đề về vận động dễ dàng click vào dòng chữ mô tả để kích hoạt ô nhập liệu thay vì phải click chính xác vào ô input nhỏ.

2. Khi nào dùng <fieldset> + <legend>? Cho ví dụ cụ thể.
Khi nào dùng: Dùng để nhóm các phần tử có liên quan lại với nhau trong một form dài hoặc phức tạp. Nó giúp tạo ra một ranh giới logic và ngữ nghĩa cho các nhóm dữ liệu.

Tác dụng: <fieldset> bao quanh nhóm, còn <legend> đóng vai trò là tiêu đề cho nhóm đó. Trình đọc màn hình sẽ đọc tiêu đề legend trước khi đọc từng mục bên trong, giúp người dùng hiểu bối cảnh.

Ví dụ cụ thể: Nhóm các câu hỏi về "Địa chỉ nhận hàng" hoặc "Thông tin thanh toán".

```html
<fieldset>
  <legend>Phương thức thanh toán</legend>
  <input type="radio" id="visa" name="payment">
  <label for="visa">Thẻ Visa</label><br>
  <input type="radio" id="momo" name="payment">
  <label for="momo">Ví MoMo</label>
</fieldset>
```
3. aria-label dùng khi nào? Tại sao KHÔNG nên dùng khi đã có <label>?

Khi nào dùng aria-label: Dùng khi một phần tử tương tác (như nút bấm, ô nhập liệu) không có văn bản hiển thị trên màn hình để mô tả. Ví dụ: Một nút bấm chỉ có icon "X" để đóng cửa sổ, ta dùng aria-label="Đóng" để trình đọc màn hình hiểu được.

Tại sao không nên dùng khi đã có <label>:

Gây nhiễu: Nếu dùng cả hai, trình đọc màn hình có thể đọc lặp lại thông tin hoặc ưu tiên aria-label mà bỏ qua nội dung label thực tế, gây rối cho người dùng.

Nguyên tắc ưu tiên: HTML thuần (<label>) luôn tốt hơn các thuộc tính ARIA. label vừa hỗ trợ người dùng screen reader, vừa hỗ trợ người dùng bình thường (bằng cách hiển thị chữ và cho phép click), trong khi aria-label là "vô hình" với người mắt sáng.

Dễ bảo trì: Sử dụng <label> giúp mã nguồn nhất quán và dễ SEO hơn.

##Câu A4:

1. Thuộc tính loading="lazy" trên thẻ <img>

Giải thích: Đây là tính năng "tải chậm". Trình duyệt sẽ trì hoãn việc tải hình ảnh cho đến khi người dùng cuộn trang đến gần vị trí của hình ảnh đó.

Cải thiện:

Tốc độ tải trang (Initial Load Time): Giảm lượng dữ liệu phải tải ban đầu, giúp trang web hiển thị nhanh hơn.

Tiết kiệm băng thông: Không tải những hình ảnh mà người dùng chưa xem tới.

Khi nào KHÔNG nên dùng: Không dùng cho các ảnh nằm trong "Above the fold" (phần màn hình hiện ra ngay lập tức khi vừa tải trang, như Banner chính hoặc Logo). Nếu dùng lazy load ở đây, ảnh sẽ bị hiện ra chậm, gây cảm giác lag.

2. Thẻ <source> trong <video>

Tại sao nên cung cấp nhiều <source>:

Tính tương thích: Mỗi trình duyệt (Chrome, Safari, Firefox) hỗ trợ các bộ mã hóa (codec) khác nhau. Cung cấp nhiều định dạng giúp video có thể chạy được trên mọi nền tảng.

Cơ chế dự phòng: Trình duyệt sẽ đọc từ trên xuống dưới và chọn định dạng đầu tiên mà nó hỗ trợ.

3 format video web phổ biến:

MP4 (H.264): Phổ biến nhất, hỗ trợ hầu hết mọi trình duyệt.

WebM: Định dạng mở của Google, tối ưu dung lượng tốt cho web.

Ogg/Theora: Định dạng mã nguồn mở (hiện ít dùng hơn MP4 và WebM).

3. Thuộc tính alt trên thẻ <img>
Công dụng:

Cung cấp văn bản thay thế nếu ảnh bị lỗi không hiển thị được.

Hỗ trợ trình đọc màn hình (Screen Reader) cho người khiếm thị hiểu nội dung ảnh.

Giúp SEO (Google Image Search) hiểu được nội dung của bức ảnh.

Viết alt tốt cho 3 trường hợp:

Ảnh sản phẩm iPhone 16: alt="Điện thoại iPhone 16 Pro Max màu Titan Sa Mạc nhìn từ mặt trước" (Mô tả chi tiết để hỗ trợ bán hàng).

Ảnh trang trí (decorative): alt="" (Để trống để trình đọc màn hình tự động bỏ qua, tránh làm phiền người dùng bằng những thông tin không quan trọng).

Ảnh biểu đồ doanh thu Q1/2026: alt="Biểu đồ cột doanh thu Quý 1 năm 2026 đạt mức tăng trưởng 15% so với cùng kỳ năm trước" (Tóm tắt thông tin cốt lõi mà biểu đồ đang biểu thị).

##Câu A5:

1. Khi nào dùng Cách 1 (<img> đơn thuần)

Cách 1 dùng cho các hình ảnh mang tính chất nội dung trực tiếp, thường được đặt trong đoạn văn hoặc đóng vai trò như một phần bổ trợ mà không cần chú thích tách biệt bên ngoài.

Đặc điểm: Ảnh là một phần của luồng văn bản (inline flow). Nếu bỏ ảnh đi, đoạn văn có thể mất đi ý nghĩa hoặc sự minh họa trực quan ngay tại điểm đó.

Ví dụ thực tế 1: Một biểu tượng cảm xúc (emoji) hoặc một icon nhỏ minh họa nằm ngay cạnh tiêu đề bài viết.

Ví dụ thực tế 2: Hình ảnh đại diện (avatar) của tác giả nằm cạnh tên trong phần giới thiệu bài viết.

2. Khi nào dùng Cách 2 (<figure> + <figcaption>)

Cách 2 dùng cho các hình ảnh là một đơn vị nội dung độc lập (self-contained). Nó có thể bao gồm chú thích để cung cấp thêm thông tin chi tiết (giá cả, tên đầy đủ, nguồn...).

Đặc điểm: Bạn có thể di chuyển cả khối <figure> này ra vị trí khác (như xuống cuối trang hoặc sang một sidebar) mà không làm hỏng cấu trúc logic của bài viết chính. Nó thường được dùng khi bạn muốn trình bày ảnh một cách trang trọng, có tổ chức.

Ví dụ thực tế 1: Danh mục sản phẩm trên trang E-commerce, nơi ảnh sản phẩm đi kèm với tên và giá tiền ngay bên dưới để khách hàng dễ nhìn.

Ví dụ thực tế 2: Một biểu đồ thống kê trong bài báo khoa học kèm theo chú thích "Hình 1.1: Tốc độ tăng trưởng kinh tế năm 2026".
