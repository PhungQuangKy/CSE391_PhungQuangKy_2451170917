##Câu A1:
1. Thẻ <meta viewport> chuẩn và giải thích  
Cấu trúc chuẩn nhất thường dùng trong HTML5:  
<meta name="viewport" content="width=device-width, initial-scale=1.0">  
Giải thích các thuộc tính:

name="viewport": Khai báo cho trình duyệt biết đây là chỉ thị thiết lập khung nhìn (viewport).

width=device-width: Đặt chiều rộng của trang web bằng với chiều rộng màn hình của thiết bị (ví dụ: màn hình điện thoại rộng 375px thì viewport cũng là 375px thay vì mặc định 980px của desktop).

initial-scale=1.0: Thiết lập mức độ thu phóng (zoom) ban đầu là 100% khi trang web vừa tải xong.  
2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào?
Nếu không có thẻ Meta Viewport, các trình duyệt di động (như Safari trên iPhone) sẽ mặc định coi trang web là giao diện Desktop:

Hiển thị thu nhỏ toàn bộ: iPhone sẽ giả định chiều rộng trang web là khoảng 980px, sau đó "ép" (scale) toàn bộ chiều rộng đó vào màn hình điện thoại nhỏ xíu.

Hậu quả: Chữ và hình ảnh sẽ trở nên cực kỳ nhỏ, người dùng phải dùng hai ngón tay để phóng to (zoom in) và cuộn ngang mới có thể đọc được nội dung.

3. Mobile-First và Desktop-First  
So sánh sự khác biệt  
Mobile-First: Thiết kế cho màn hình nhỏ nhất trước, sau đó dùng Media Queries để mở rộng cho màn hình lớn hơn (min-width).

Desktop-First: Thiết kế cho màn hình máy tính trước, sau đó dùng Media Queries để thu nhỏ hoặc ẩn bớt các thành phần cho màn hình nhỏ (max-width).

Ví dụ CSS với breakpoint 768px  
Cách 1: Mobile-First  
```css
.container { width: 100%; }

/* Giao diện cho máy tính (>= 768px) */
@media (min-width: 768px) {
    .container { width: 750px; }
}
```
Cách 2: Desktop-First  
```css
/* Giao diện cho máy tính (mặc định) */
.container { width: 750px; }

/* Giao diện cho điện thoại (< 768px) */
@media (max-width: 767px) {
    .container { width: 100%; }
}
```
Tại sao Mobile-First được khuyên dùng?  
Hiệu suất: Giúp thiết bị di động tải ít tài nguyên hơn, ưu tiên những nội dung quan trọng nhất.

Trải nghiệm người dùng: Đảm bảo trang web hoạt động tốt trên thiết bị nhỏ nhất trước khi thêm các tính năng phức tạp trên máy tính.

SEO: Google ưu tiên xếp hạng các trang web tối ưu theo chuẩn Mobile-First.

##Câu A2:

---

## Câu A2: Breakpoints

Dưới đây là bảng tổng hợp các Breakpoints chuẩn theo tài liệu Bootstrap 5, kèm theo thiết bị đại diện và gợi ý hiển thị lưới sản phẩm:

| Breakpoint | Kích thước Pixel | Thiết bị đại diện | Lưới sản phẩm gợi ý |
| :--- | :--- | :--- | :--- |
| **Extra small (xs)** | < 576px | Điện thoại đứng (Portrait) | 1 cột (chiếm 100% chiều rộng) |
| **Small (sm)** | ≥ 576px | Điện thoại nằm ngang (Landscape) | 2 cột |
| **Medium (md)** | ≥ 768px | Máy tính bảng (Tablets) | 2 hoặc 3 cột |
| **Large (lg)** | ≥ 992px | Laptop, màn hình máy tính nhỏ | 3 hoặc 4 cột |
| **Extra large (xl)** | ≥ 1200px | Màn hình máy tính lớn (Desktop) | 4 cột |
| **Extra extra large (xxl)** | ≥ 1400px | Màn hình siêu lớn (Ultra-wide) | 4 hoặc 6 cột |

### Ví dụ minh họa bằng Code (Mobile-First)
Nếu bạn đang sử dụng hệ thống Grid (12 cột) của CSS hoặc Bootstrap, cấu trúc cho một sản phẩm thường như sau:

```html
<div class="product-item col-12 col-sm-6 col-md-4 col-lg-3">
    </div>
```

## Câu A3: Media Queries

Dựa trên đoạn mã CSS Mobile-First đã cho, dưới đây là bảng xác định giá trị `width` của `.container` tương ứng với từng kích thước màn hình:

| Chiều rộng màn hình | `.container` width | Giải thích |
| :--- | :--- | :--- |
| **375px (iPhone SE)** | **100%** | Nhỏ hơn mốc 576px, nhận giá trị mặc định. |
| **600px** | **540px** | Thỏa mãn `min-width: 576px`. |
| **800px** | **720px** | Thỏa mãn `min-width: 768px`. |
| **1000px** | **960px** | Thỏa mãn `min-width: 992px`. |
| **1400px** | **1140px** | Thỏa mãn `min-width: 1200px`. |

### Phân tích quy tắc ghi đè (Override):
Trong cách viết **Mobile-First** sử dụng `min-width`, trình duyệt sẽ ưu tiên áp dụng quy tắc nằm ở mốc cao nhất mà màn hình đó đạt được. Ví dụ:
- Màn hình **800px** vừa thỏa mãn `min-width: 576px` vừa thỏa mãn `min-width: 768px`. 
- Vì quy tắc `768px` nằm sau nên nó sẽ ghi đè quy tắc `576px`, kết quả là width nhận giá trị **720px**.

---

## Câu A4: SCSS Basics

### 1. Giải thích 4 tính năng chính của SCSS

| Tính năng | Giải thích | Ví dụ |
| :--- | :--- | :--- |
| **Variables** | Cho phép lưu trữ các giá trị (màu sắc, font, kích thước) vào một tên biến để tái sử dụng nhiều lần. | `$primary-color: #3498db;` <br> `button { color: $primary-color; }` |
| **Nesting** | Cho phép viết các trình chọn CSS lồng nhau, giúp phản ánh cấu trúc phân cấp của HTML và code gọn gàng hơn. | `.nav { ul { list-style: none; } li { display: inline; } }` |
| **Mixins** | Là một nhóm các khai báo CSS có thể tái sử dụng trong toàn bộ stylesheet, có thể truyền tham số vào. | `@mixin flex-center { display: flex; justify-content: center; }` <br> `.box { @include flex-center; }` |
| **Inheritance (@extend)** | Cho phép một bộ chọn chia sẻ hoặc kế thừa tập hợp các thuộc tính CSS từ một bộ chọn khác. | `.message { border: 1px solid #ccc; }` <br> `.success { @extend .message; border-color: green; }` |

### 2. Tại sao trình duyệt KHÔNG đọc được file `.scss`?
Trình duyệt web chỉ có khả năng hiểu và xử lý các file CSS tiêu chuẩn. SCSS là một **tiền xử lý CSS (CSS Preprocessor)**, nó chứa các cú pháp đặc biệt (biến, hàm, lồng nhau) mà engine của trình duyệt không được thiết kế để thông dịch trực tiếp.

### 3. Cần bước gì để chuyển SCSS → CSS?
Để chuyển đổi, chúng ta cần một bước gọi là **Compilation (Biên dịch)**:
* Sử dụng một trình biên dịch (Compiler) như **Sass (Dart Sass)**, **Node-sass** hoặc các công cụ tích hợp trong VS Code (như Live Sass Compiler).
* Công cụ này sẽ quét file `.scss`, xử lý các logic bên trong và xuất ra một file `.css` thuần túy để liên kết (link) vào file HTML.
