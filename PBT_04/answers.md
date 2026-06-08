##Câu A1:
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Theo luồng tài liệu tự nhiên |  | Giá trị mặc định, không cần tùy chỉnh vị trí. |
| `relative` | Có | Chính vị trí ban đầu của nó | Có | Làm gốc tọa độ cho phần tử con dùng absolute. |
| `absolute` | Không | Phần tử cha gần nhất có position khác static | Có | Đặt icon, label hoặc trang trí đè lên một khung ảnh/thẻ. |
| `fixed` | Không | Viewport (cửa sổ trình duyệt) |  | Thanh Menu (Header), nút "Back to Top" luôn hiện diện. |
| `sticky` | Có | Phần tử cha và Viewport | Có(đến giới hạn của cha) | Tiêu đề bảng hoặc Menu dính lại khi cuộn trang đến nó. |

1. Khi nào absolute tham chiếu body?  
Phần tử mang position: absolute sẽ tham chiếu đến thẻ body (thực tế là Initial Containing Block) khi tất cả các phần tử cha bao bọc nó đều có position: static (giá trị mặc định).

2. Khi nào tham chiếu parent?  
Nó sẽ tham chiếu đến parent (phần tử cha) khi phần tử cha đó được thiết lập một giá trị position khác static (thường người ta dùng position: relative cho cha để làm mốc).

3. Giải thích khái niệm "nearest positioned ancestor"  
Cụm từ này có nghĩa là "Phần tử tổ tiên gần nhất có thiết lập vị trí".

Ancestor (Tổ tiên): Có thể là cha, ông, hoặc các cấp cao hơn bao ngoài phần tử đó.

Positioned: Là phần tử có thuộc tính position mang giá trị: relative, absolute, fixed, hoặc sticky.

Cơ chế: Khi bạn dùng absolute, trình duyệt sẽ "nhìn" ngược lên trên để tìm xem có ông/cha nào đã được định vị (positioned) hay chưa. Nó sẽ dừng lại ở ông/cha gần nó nhất để lấy đó làm mốc tọa độ căn chỉnh top, right, bottom, left. Nếu tìm mãi không thấy ai, nó mới chọn thẻ body.

##Câu A2:

Trường hợp 1: Flexbox cơ bản
Dự đoán: 4 items sẽ nằm trên 1 hàng duy nhất. Vì có flex: 1, cả 4 items sẽ tự động co giãn để có chiều rộng bằng nhau và lấp đầy 100% chiều rộng của container.

Sơ đồ:  
[  Item 1  ][  Item 2  ][  Item 3  ][  Item 4  ]

Trường hợp 2: Flex-wrap  
Dự đoán: Bố cục gồm 3 hàng, mỗi hàng 2 cột.

Mỗi item chiếm 45% width + 2.5% margin mỗi bên = 50% tổng không gian.

Vì flex-wrap: wrap, cứ 2 items là đủ 100% nên item thứ 3 sẽ bị đẩy xuống hàng mới.

Sơ đồ:  
[ Item 1 ] [ Item 2 ]
[ Item 3 ] [ Item 4 ]
[ Item 5 ] [ Item 6 ]

Trường hợp 3: Alignment  
Dự đoán: 3 items nằm trên 1 hàng, giãn đều ra sát hai mép và căn giữa theo chiều dọc.

space-between: Item 1 sát trái, Item 3 sát phải, Item 2 nằm chính giữa.

align-items: center: Các item sẽ căn giữa so với chiều cao của container.

Sơ đồ:  
[Item 1]      [Item 2]      [Item 3]

Trường hợp 4: Grid cố định & linh hoạt  
Dự đoán: 1 hàng có 3 cột.

Cột 1 và 3 cố định 200px.

Cột 2 (1fr) sẽ chiếm toàn bộ phần diện tích còn lại ở giữa.

Có khoảng cách 20px giữa các cột.

Sơ đồ:  
[ 200px ] [ --- 1fr --- ] [ 200px ]

Trường hợp 5: Grid Repeat
Dự đoán: Bố cục gồm 3 hàng.

Hàng 1: 3 items (1, 2, 3).

Hàng 2: 3 items (4, 5, 6).

Hàng 3: Chỉ có 1 item (số 7) nằm ở cột đầu tiên bên trái.

Tất cả các cột có chiều rộng bằng nhau.

Sơ đồ:  
[ Item 1 ] [ Item 2 ] [ Item 3 ]
[ Item 4 ] [ Item 5 ] [ Item 6 ]
[ Item 7 ]

##Câu C1:  
1. Navigation bar ngang (logo + menu + buttons)

Lựa chọn: Flexbox.

Giải thích: Thanh điều hướng thường là bố cục một chiều (hàng ngang). Flexbox rất mạnh trong việc phân bổ không gian dọc theo trục chính, giúp dễ dàng đẩy logo sang trái, menu ra giữa và buttons sang phải bằng justify-content.

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)

Lựa chọn: Grid.

Giải thích: Đây là bố cục dạng lưới hai chiều hoàn hảo. Với grid-template-columns: repeat(3, 1fr), bạn có thể đảm bảo các cột luôn đều nhau. Grid tự động xử lý việc rớt hàng cho số lượng ảnh không xác định mà không cần tính toán phức tạp như Flexbox.

3. Layout blog: main content + sidebar

Lựa chọn: Grid (hoặc kết hợp cả hai).

Giải thích: Grid phù hợp nhất để xây dựng khung sườn (vỏ ngoài) của trang web. Nó giúp định vị chính xác vị trí của Content và Sidebar trên cùng một hệ thống lưới, giữ cho bố cục ổn định và dễ quản lý hơn khi thay đổi kích thước màn hình.

4. Footer với 4 cột thông tin

Lựa chọn: Kết hợp cả hai.

Giải thích: Sử dụng Grid để chia toàn bộ Footer thành 4 cột đều nhau (cấu trúc tổng thể). Sau đó, sử dụng Flexbox bên trong mỗi cột để sắp xếp các danh sách liên kết theo chiều dọc và căn chỉnh icon mạng xã hội.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

Lựa chọn: Flexbox.

Giải thích: Mặc dù card có cấu trúc dọc, nhưng Flexbox với flex-direction: column là giải pháp tối ưu để xử lý tình huống "nút dính đáy". Bạn chỉ cần đặt margin-top: auto cho nút bấm, nó sẽ tự động bị đẩy xuống dưới cùng của card bất kể độ dài của phần text ở giữa.

##Câu C2:

Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống  
Nguyên nhân: Mặc định, các thẻ .card (flex items) sẽ có chiều cao bằng nhau nhờ thuộc tính align-items: stretch của cha. Tuy nhiên, các thành phần bên trong mỗi card (tiêu đề, văn bản) có độ dài khác nhau khiến nút bấm không nằm thẳng hàng ở đáy.

Cách sửa: Thiết lập thẻ .card thành một flex container theo chiều dọc và sử dụng margin-top: auto cho nút bấm.

Code sửa:
```css
.card {
    width: 30%;
    margin: 1.5%;
    display: flex;          /* Biến card thành flex container */
    flex-direction: column; /* Xếp nội dung theo cột */
}

.card .btn {
    padding: 10px;
    margin-top: auto;      /* Đẩy nút xuống sát đáy card */
}
```

Lỗi 2: Items không căn giữa cả ngang lẫn dọc trong container 100vh  
Nguyên nhân: Thuộc tính text-align: center chỉ có tác dụng căn giữa văn bản theo chiều ngang bên trong thẻ con. Nó không giúp căn giữa bản thân thẻ .hero-content bên trong vùng chứa .hero.

Cách sửa: Sử dụng bộ đôi justify-content và align-items trên flex container cha (.hero).

Code sửa:
```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center;     /* Căn giữa theo chiều dọc */
}

.hero-content {
    /* Không cần text-align nếu chỉ muốn căn giữa khối */
}
```

Lỗi 3: Sidebar bị co lại khi content quá dài
Nguyên nhân: Theo cơ chế mặc định của Flexbox, thuộc tính flex-shrink có giá trị là 1, cho phép các phần tử co lại nếu không gian cha bị thiếu. Khi phần .content quá dài, nó sẽ lấn át và ép width: 250px của sidebar nhỏ lại.

Cách sửa: Thiết lập flex-shrink: 0 cho sidebar để ngăn chặn việc bị co lại, hoặc sử dụng thuộc tính flex: 0 0 250px.

Code sửa:
```css
.sidebar {
    width: 250px;
    flex-shrink: 0; /* Ngăn sidebar bị co lại */
}

.content {
    flex: 1; /* Chiếm toàn bộ phần còn lại */
}
```
