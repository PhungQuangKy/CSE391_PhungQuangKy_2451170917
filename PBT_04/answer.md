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


