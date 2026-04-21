##Câu A1:

1.
Bước 1 : DNS Lookup: Trình duyệt truy vấn máy chủ DNS để tìm địa chỉ IP tương ứng với tên miền

Bước 2 : Gửi HTTP Request: Sau khi có IP, trình duyệt gửi một yêu cầu (thường là phương thức GET) đến máy chủ của Shopee qua Internet.

Bước 3 : Xử lý tại Server: Máy chủ nhận yêu cầu, xử lý dữ liệu và chuẩn bị các tài nguyên (HTML, CSS, hình ảnh...).

Bước 4 : Trả về HTTP Response: Server gửi phản hồi kèm theo mã trạng thái (ví dụ 200 OK) và nội dung file về cho trình duyệt.

Bước 5 : Browser Rendering: Trình duyệt nhận dữ liệu và thực hiện quá trình render (Parse HTML, Parse CSS, Execute JS) để hiển thị giao diện cho người dùng.

2.

<img width="848" height="888" alt="image" src="https://github.com/user-attachments/assets/3e862b74-f92d-474f-9d08-7e37dd9bed49" />

##Câu A2:

-Dùng thẻ `<div>` cho đầu trang thay vì thẻ `<header>`

-Dùng thẻ `<div class = "menu">` thay vì thẻ `<nav>`

-Dùng thẻ `<div class="main">` thay vì thẻ `<main>`

-Dùng thẻ `<div class="footer">` thay vì thẻ `<footer>`

*Sửa lại: 
```html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <div><a href="/">Trang chủ</a></div>
        <div><a href="/products">Sản phẩm</a></div>
    </nav>
</header>
<main>
    <div class="product">
        <div class="title">iPhone 16 Pro</div>
        <div class="price">25.990.000đ</div>
        <div class="image"><img src="iphone.jpg"></div>
    </div>
</main>
<footer>© 2026 ShopTLU</footer>
```
##Câu A3:

Hộp 1

Text A Text B

Hộp 2

Text C Text D

Hộp 3

*Giải thích:
```
-Thẻ <div> luôn bắt đầu trên một dòng mới và kéo dài hết chiều rộng còn lại của hàng
-Thẻ Inline (<span> và <strong>) : Chỉ chiếm vừa đủ không gian của nội dung bên trong nó. Các thẻ inline sẽ nằm cùng một hàng với nhau nếu còn đủ chỗ. Thẻ <strong> nội dung bên trong sẽ đc bôi đậm
```
##Câu A4:

`<thead>` (Table Header): Dùng để bao bọc các hàng tiêu đề của bảng. Thông tin ở đây giúp người dùng biết nội dung của các cột bên dưới là gì.

`<tbody>` (Table Body): Chứa dữ liệu chính của bảng. Đây là phần nội dung thay đổi nhiều nhất.

`<tfoot>` (Table Footer): Dùng cho các hàng tổng kết hoặc chú thích ở cuối bảng (ví dụ: Tổng tiền, Ghi chú).

Tại sao KHÔNG NÊN dùng table để tạo layout trang web?

-Vì thẻ `<table>` sinh ra là để hiển thị dữ liệu dạng bảng (như danh sách sinh viên, bảng điểm), không phải để dựng khung giao diện.

-Bảng có cấu trúc rất cứng nhắc. Trên màn hình điện thoại, bảng không thể tự động xếp chồng các cột lên nhau một cách linh hoạt như CSS Flexbox hay Grid.

-Trình duyệt thường phải đợi tải hết toàn bộ nội dung trong thẻ <table> mới bắt đầu hiển thị bảng đó ra màn hình. Điều này làm trải nghiệm người dùng bị chậm lại so với việc dùng các thẻ `<div>` hoặc thẻ Semantic.

##Câu B3:
```
Lỗi 1: Dòng 1 — Thiếu khai báo html trong DOCTYPE — Sửa: Thay <!DOCTYPE> bằng <!DOCTYPE html>.

Lỗi 2: Dòng 3 — Thiếu thẻ đóng cho <title> — Sửa: Thêm </title> sau nội dung tiêu đề.

Lỗi 3: Dòng 4 — Sai định dạng thuộc tính charset — Sửa: Thay utf8 bằng utf-8 (có dấu gạch ngang).

Lỗi 4: Dòng 6 — Thẻ <h1> không được đóng đúng cách — Sửa: Đổi <h1>Welcome...<h1> thành <h1>Welcome...</h1>.

Lỗi 5: Dòng 10 — Thẻ <a> đóng sai cú pháp — Sửa: Đổi <a>Trang chủ<a> thành <a href="home">Trang chủ</a>.

Lỗi 6: Dòng 17 — Thuộc tính src của ảnh thiếu dấu ngoặc kép — Sửa: Đổi thành src="iphone.jpg" và nên thêm thuộc tính alt.

Lỗi 7: Dòng 19 — Sai thứ tự đóng thẻ lồng nhau (Overlap) — Sửa: Đổi <p>Giá: <b>25...đ</p></b> thành <p>Giá: <b>25...đ</b></p>.

Lỗi 8: Dòng 34 — Sử dụng thẻ <main> lần thứ hai — Sửa: Một trang web chỉ được phép có duy nhất một thẻ <main>. Đoạn nội dung sidebar nên dùng thẻ <aside>.

Lỗi 9: Dòng 38 — Thẻ <footer> thiếu thẻ đóng </footer> — Sửa: Thêm </footer> sau đoạn văn bản bản quyền.

Lỗi 10: Tổng thể — Cấu trúc phân cấp sai — Sửa: Thẻ <header> và <h1> nên được bọc trong một khối chung, không nên để <h1> nằm ngoài header hoặc trôi lơ lửng trên đầu một cách rời rạc.
```

##Câu C2:
```
Quan điểm "dùng <div> cho tất cả mọi thứ" tuy nghe có vẻ tiết kiệm thời gian trước mắt, nhưng thực tế lại đang tạo ra những món "nợ kỹ thuật" khổng lồ cho dự án

về lâu dài vì việc sử dụng Semantic HTML không chỉ là vấn đề thẩm mỹ mà còn là nền tảng cốt lõi của một sản phẩm web chuyên nghiệp. Trước hết, về mặt SEO, các

công cụ tìm kiếm như Google dựa vào cấu trúc thẻ để hiểu trọng tâm nội dung; một trang web tràn ngập thẻ <div> sẽ khiến bot gặp khó khăn trong việc phân loại

thông tin, từ đó làm giảm thứ hạng hiển thị so với đối thủ. Thứ hai, về khả năng tiếp cận (Accessibility), những người dùng khiếm thị sử dụng trình đọc màn hình

sẽ không thể điều hướng hiệu quả nếu thiếu các cột mốc như <nav>, <main> hay <footer>, khiến sản phẩm của chúng ta trở nên thiếu nhân văn và bị giới hạn đối tượng

sử dụng. Một ví dụ điển hình là khi bạn dùng thẻ <button>, trình duyệt sẽ tự động hỗ trợ tương tác bằng bàn phím và phím Space, trong khi nếu dùng <div

class="btn">, bạn sẽ phải tốn thêm nhiều thời gian viết JavaScript chỉ để tái lập những tính năng mặc định đó. Tuy nhiên, điều này không có nghĩa là loại bỏ hoàn

toàn <div>, vì nó vẫn là lựa chọn phù hợp nhất cho các trường hợp mang tính chất trình bày thuần túy (Layout Purpose), chẳng hạn như dùng làm các khối bọc trung

gian để áp dụng thuộc tính display: flex hoặc grid nhằm căn chỉnh giao diện mà không làm thay đổi ý nghĩa ngữ nghĩa của tài liệu. Việc học các thẻ mới không hề

lãng phí, mà chính là cách giúp chúng ta viết code sạch hơn, tối ưu hơn và chuyên nghiệp hơn trong mắt đồng nghiệp lẫn khách hàng.











