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

##Câu A3:

Trường hợp 1: content-box (mặc định)

Chiều rộng hiển thị = 450px

(Tính toán: 400px width + 40px padding + 10px border)

Không gian chiếm trên trang = 470px

(Tính toán: 450px chiều rộng hiển thị + 20px margin)

Trường hợp 2: border-box

Chiều rộng hiển thị = 400px

(Vì border-box bao gồm cả padding và border vào trong width đã khai báo)

Kích thước content thực tế = 350px

(Tính toán: 400px width - 40px padding - 10px border)

Không gian chiếm trên trang = 420px

(Tính toán: 400px chiều rộng hiển thị + 20px margin)

Trường hợp 3: Margin collapse

Khoảng cách giữa box-a và box-b = 40px

Giải thích: Khi hai lề dọc (vertical margins) chạm nhau, trình duyệt sẽ gộp chúng lại và chỉ lấy giá trị lớn nhất (40px), chứ không cộng dồn (65px).

Nâng cao: Lề âm (Negative Margin)

Khoảng cách = 30px

Giải thích: Khi gộp lề có lề âm, khoảng cách cuối cùng bằng tổng đại số của lề dương lớn nhất và lề âm (40px + (-10px) = 30px).

##Câu A4:

1. Tính specificity score:
- Rule A (p): (0, 0, 1)
- Rule B (.price): (0, 1, 0)
- Rule C (#main-price): (1, 0, 0)
- Rule D (p.price): (0, 1, 1)

2. Element có màu đỏ (red). 
Giải thích: Rule C có ID selector, mang trọng số ưu tiên cao nhất trong 4 quy tắc.

3. Element có màu cam (orange). 
Giải thích: Inline style có độ ưu tiên cao hơn các selector trong file CSS.

4. Element có màu đen (black). 
Giải thích: !important phá vỡ mọi quy tắc về Specificity, ép trình duyệt ưu tiên Rule A bất chấp score thấp.

##Câu B2:

Phần 1: So sánh kích thước

Hộp 1 (content-box): Chiều rộng thực tế = 350px

Tính toán: 300px (width) + 20px2 (padding) + 5px2 (border) = 350px.

Hộp 2 (border-box): Chiều rộng thực tế = 300px

Tính toán: Trình duyệt tự co phần content lại còn 250px để tổng cộng (content + padding + border) luôn đúng bằng 300px.

Giải thích sự khác biệt:

Với content-box, thuộc tính width chỉ áp dụng cho vùng chứa nội dung. Mọi phần đệm (padding) và đường viền (border) sẽ được cộng thêm vào bên ngoài, làm phần tử to ra hơn so với khai báo ban đầu.

Với border-box, thuộc tính width là con số tổng cuối cùng của phần tử. Trình duyệt sẽ tự động trừ đi padding và border để tìm ra không gian còn lại cho content. Điều này giúp lập trình viên kiểm soát layout cực kỳ chính xác.

##Câu B3:

1. Liệt kê 10 rules + specificity score:

* : (0, 0, 0)

p : (0, 0, 1)

body p : (0, 0, 2)

.text : (0, 1, 0)

p.text : (0, 1, 1)

.text.highlight : (0, 2, 0)

p.text:nth-child(1) : (0, 2, 1)

#demo : (1, 0, 0)

p#demo : (1, 0, 1)

#demo.text : (1, 1, 0)

2. Element cuối cùng hiển thị màu gì? Tại sao?

Màu sắc: Teal (Xanh mòng két).

Giải thích: Vì selector #demo.text có specificity score cao nhất (1, 1, 0). Trong CSS, trình duyệt sẽ ưu tiên rule có trọng số cao nhất (so sánh lần lượt từ cột ID, sau đó đến Class, cuối cùng là Element).

4. Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.

Kết quả: KHÔNG đổi.

Giải thích: Khi các selector có độ ưu tiên khác nhau, trình duyệt luôn chọn selector có trọng số cao nhất bất kể nó nằm ở vị trí nào trong file. Thứ tự viết code (quy tắc "vào sau thắng") chỉ có tác dụng khi hai selector có cùng mức độ ưu tiên (cùng score).

##Câu C1:

1. Chiều rộng thực tế:
- Sidebar: 342px
- Content: 722px

2. Giải thích: Tổng chiều rộng 2 cột (1064px) vượt quá chiều rộng container (960px) nên content bị đẩy xuống.

3. Cách sửa:
- Cách 1: Thêm box-sizing: border-box cho tất cả phần tử.
- Cách 2: Giảm width của sidebar xuống 258px và content xuống 598px.

##Câu C2:

1. "Sản phẩm A" (h2 trong #featured)
font-size: 20px

Giải thích: Selector .card .title nhắm trực tiếp vào thẻ h2 có class .title. Mặc dù thẻ cha .container có font-size: 14px, nhưng quy tắc nhắm trực tiếp (direct target) luôn thắng quy tắc kế thừa (inheritance).

color: green

Giải thích: Có 3 selector cùng tranh chấp: .card { color: blue; } (kế thừa), #featured .title { color: red; } (specificity cao), và .highlight { color: green !important; }. Vì có thuộc tính !important, nên màu xanh lá cây sẽ thắng tuyệt đối bất kể specificity.

2. "Mô tả sản phẩm" (p trong card featured)
color: blue

Giải thích: Thẻ p này có quy tắc .card p { color: inherit; }. Từ khóa inherit buộc thẻ p phải lấy màu từ thẻ cha trực tiếp của nó là .card. Mà .card đang có thuộc tính color: blue;. Do đó, thẻ p sẽ có màu xanh dương.

3. "Sản phẩm B" (h2 trong card thứ hai)
font-size: 20px

Giải thích: Tương tự câu 1, selector .card .title nhắm trực tiếp vào thẻ này nên nó nhận giá trị 20px.

color: blue (Kế thừa từ .card)

Giải thích: Trong CSS đã cho, không có selector nào nhắm trực tiếp vào màu sắc của h2 này (vì nó không nằm trong #featured và không có class .highlight). Do đó, nó kế thừa màu từ thẻ cha .card có color: blue;.

4. "Mô tả sản phẩm B" (p.highlight)
color: green

Giải thích: Mặc dù có quy tắc .card p { color: inherit; } nhắm vào thẻ p, nhưng selector .highlight { color: green !important; } nhắm trực tiếp vào class của thẻ p này và có !important. Trọng số của !important là cao nhất trong quá trình Cascade.
