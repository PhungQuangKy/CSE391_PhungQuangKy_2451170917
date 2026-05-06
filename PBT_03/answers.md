##Câu A1:

1. Inline CSS (CSS nội dòng)

Cách này viết các thuộc tính định dạng trực tiếp vào thuộc tính style của thẻ HTML.

`Ví dụ: <h1 style="color: blue; font-size: 20px;">Chào bạn</h1>`

Ưu điểm: Nhanh chóng, tiện lợi khi muốn test nhanh hoặc chỉ định dạng cho đúng một phần tử duy nhất.

Nhược điểm: Làm code HTML trở nên lộn xộn, khó quản lý; không thể tái sử dụng cho các phần tử khác.

Khi nào nên dùng: Dùng cho các thay đổi nhỏ, duy nhất hoặc khi gửi email HTML (vốn đòi hỏi inline style để hiển thị chính xác).

2. Internal CSS (CSS nội bộ)

CSS được đặt trong cặp thẻ <style> và thường nằm trong phần <head> của file HTML.

Ví dụ:

```HTML
<head>
    <style>
        p { color: red; }
    </style>
</head>
```
Ưu điểm: Quản lý phong cách cho toàn bộ một trang web duy nhất rất tốt; không cần tạo thêm file bên ngoài.

Nhược điểm: Chỉ áp dụng được cho trang hiện tại; nếu muốn đổi giao diện cho cả website 100 trang thì phải sửa 100 lần.

Khi nào nên dùng: Dùng khi bạn xây dựng một "Single Page" (trang đơn) hoặc website có cấu trúc phong cách rất đặc thù cho từng trang.

3. External CSS (CSS bên ngoài)

CSS được viết trong một file riêng biệt có đuôi .css và nhúng vào HTML thông qua thẻ <link>.

`Ví dụ: <link rel="stylesheet" href="style.css">`

Ưu điểm: Tốt nhất cho thực tế. Tách biệt hoàn toàn nội dung (HTML) và giao diện (CSS); dễ dàng thay đổi giao diện toàn bộ website chỉ bằng việc sửa một file duy nhất; giúp trang tải nhanh hơn nhờ cơ chế cache của trình duyệt.

Nhược điểm: Tốn thêm một yêu cầu kết nối (request) để tải file CSS về.

Khi nào nên dùng: Dùng cho mọi dự án thực tế, website có nhiều trang.

Câu hỏi thêm: Cách nào "thắng"?

Nếu cùng một element được áp dụng cả 3 cách cùng lúc, thứ tự ưu tiên (cách nào "thắng") sẽ là:

Inline CSS > Internal CSS / External CSS (Tùy thuộc vào việc thẻ nào đứng sau trong file HTML).

Giải thích tại sao:

Độ ưu tiên về vị trí: Quy tắc chung của CSS là "Càng gần phần tử hơn thì độ ưu tiên càng cao". Inline CSS nằm ngay trong thẻ nên có độ ưu tiên cao nhất.

Thứ tự đọc mã: Trình duyệt đọc mã từ trên xuống dưới. Đối với Internal và External, nếu chúng có cùng độ ưu tiên về bộ chọn (selector), thì cái nào được định nghĩa sau cùng sẽ đè lên cái đứng trước (Quy tắc Cascade - Dòng thác).

Lưu ý: Tuy nhiên, nếu có thuộc tính !important ở bất kỳ cách nào, nó sẽ phá vỡ quy luật trên và dành quyền ưu tiên cao nhất.

##Câu A2:

1. Phân tích Selectors

h1 → Chọn: ShopTLU (Vì đây là thẻ h1 duy nhất trong trang).

.price → Chọn: 25.990.000đ và 45.990.000đ (Có hai thẻ <p> có class này trong hai thẻ <article>).

#app header → Chọn: Toàn bộ nội dung bên trong thẻ <header> (Gồm h1 và nav).

nav a:first-child → Chọn: Home (Phần tử <a> đầu tiên nằm trong thẻ nav).

.product.featured h2 → Chọn: MacBook Pro (Thẻ h2 nằm bên trong thẻ <article> có cả hai class là product và featured).

article > p → Chọn: Tất cả các thẻ <p> là con trực tiếp của article (Gồm: 25.990.000đ, Mô tả sản phẩm... của iPhone và 45.990.000đ, Mô tả sản phẩm... của MacBook).

a[href="/"] → Chọn: Home (Thẻ <a> có thuộc tính href chính xác là /).

.top-bar.dark h1 → Chọn: ShopTLU (Thẻ h1 nằm trong thẻ có cả hai class top-bar và dark).
