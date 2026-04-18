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










