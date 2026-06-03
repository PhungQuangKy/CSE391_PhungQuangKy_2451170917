Bài 1.1:

1. Tại sao component chỉ render 1 lần?  
   Khi trang đc tải lại lần đầu:

- component LifecycleDemo ở ví dụ trên chỉ chạy đúng 1 lần duy nhất khi trang web được tải vì giao diện của nó hoàn toàn là tĩnh (static).
- React nhận lệnh hiển thị <LifecycleDemo />.
- Nó sẽ chạy hàm LifecycleDemo(), in ra dòng log, lấy về cục HTML (JSX) rồi "đắp" lên màn hình cho người dùng nhìn thấy. Quá trình này gọi là Mounting gắn component vào cây DOM.

2. Khi nào component sẽ render lại?
   Component sẽ render lại khi có sự thay đổi ảnh hưởng đến nó, phổ biến nhất là:

- State thay đổi
- Props thay đổi
- Component cha render lại

Câu 1.2:

1. Chạy BadCounter => nhấn nút => thấy gì?  
   Trên màn hình (UI): Con số vẫn giữ nguyên là 0, không hề thay đổi.  
   Trong Console: Giá trị biến count vẫn tăng lên 1, 2, 3... đều đặn sau mỗi lần nhấn.  
   Lý do: Biến thường thay đổi nhưng không kích hoạt cơ chế re-render để vẽ lại giao diện.

2. Chạy GoodCounter => nhấn nút => thấy gì?  
   Trên màn hình (UI): Con số lập tức cập nhật tăng dần theo số lần bấm.  
    Lý do: Hàm setCount thông báo cho React biết dữ liệu đã đổi, React lập tức chạy lại component để cập nhật giao diện mới.

3. Mở Console => thấy log "render" mấy lần?  
   Với BadCounter: Log chỉ xuất hiện 1 lần duy nhất khi tải trang. Nhấn nút bao nhiêu lần cũng không xuất hiện thêm log nào vì component không bị re-render.  
   Với GoodCounter: Log xuất hiện mỗi khi bạn nhấn nút. Nhấn N lần thì hiển thị thêm N lần log.

Câu 1.3:  
Phân tích luồng chạy thực tế của FlowDemo:

1. Lần đầu tải trang (Mount): \* Hàm FlowDemo() chạy => Log "Component render!" hiện lần một

- Khởi tạo step = 1.
- Màn hình hiển thị: "Bước hiện tại: 1" và dòng chữ "👋 Bước 1: Xin chào!".

2. Khi nhấn nút "Bước tiếp theo" (User Action):

- Hàm setStep(2) được gọi => Kích hoạt Re-render.
- Hàm FlowDemo() chạy lại lần 2 => Log "Component render!" hiện lần 2.
- Giá trị step bây giờ là 2.

3. Khi nhấn nút "Quay lại đầu" lúc đang ở Bước 1:

- Hàm setStep(1) được gọi. Vì giá trị cũ là 1, giá trị mới vẫn là 1, React thông minh nhận biết và không re-render lại => Không có log mới trong console.
