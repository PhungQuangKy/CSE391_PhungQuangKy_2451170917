### Câu C2 (10đ) — Bài toán thực tế: Tính hóa đơn nhà hàng

Dưới đây là mã nguồn JavaScript hoàn chỉnh để giải quyết bài toán tính toán và in hóa đơn nhà hàng dựa trên các quy tắc giảm giá, thuế VAT, phí Tip và định dạng hiển thị dạng bảng text nghệ thuật (ASCII table):

*Lưu ý về quy tắc:* Đề bài ghi là **Ngày thứ 3 (Wednesday)** -> Trong JavaScript, hàm `new Date().getDay()` trả về `3` chính là ngày **Thứ Tư (Wednesday)**, còn Thứ Ba là `2`. Đoạn code dưới đây sẽ check giá trị `3` (Wednesday) theo đúng text tiếng Anh của đề bài để tự động giảm thêm 5%.

```javascript
// 1. Định nghĩa dữ liệu đầu vào (Input)
const order = [
    { name: "Phở bò", quantity: 2, price: 65000 },
    { name: "Trà đá", quantity: 3, price: 5000 },
    { name: "Bún chả", quantity: 1, price: 55000 }
];

// Hàm tính toán và in hóa đơn (Nhận vào danh sách món, ngày trong tuần tự chọn, và có tính tip hay không)
function printRestaurantInvoice(cart, customDay = null, includeTip = true) {
    // --- BƯỚC 1: TÍNH TỔNG CỘNG CHƯA GIẢM TRỪ ---
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].quantity;
    }

    // --- BƯỚC 2: XỬ LÝ QUY TẮC GIẢM GIÁ (DISCOUNT) ---
    let discountPercent = 0;
    if (subtotal > 1000000) {
        discountPercent = 15; // Tổng > 1 triệu giảm 15%
    } else if (subtotal > 500000) {
        discountPercent = 10; // Tổng > 500k giảm 10%
    }

    // Kiểm tra giảm giá ngày thứ Tư (Wednesday)
    // Nếu không truyền ngày custom, hệ thống tự lấy ngày hiện tại của máy
    const currentDay = customDay !== null ? customDay : new Date().getDay(); 
    if (currentDay === 3) { // 3 đại diện cho Wednesday trong JavaScript Date
        discountPercent += 5;
    }

    let discountAmount = (subtotal * discountPercent) / 100;
    let totalAfterDiscount = subtotal - discountAmount;

    // --- BƯỚC 3: TÍNH THUẾ VAT VÀ TIỀN TIP ---
    let vatAmount = (totalAfterDiscount * 8) / 100; // VAT 8% tính trên tổng sau giảm giá
    let tipAmount = includeTip ? (totalAfterDiscount * 5) / 100 : 0; // Tip 5% (optional)

    // --- BƯỚC 4: TÍNH TỔNG SỐ TIỀN PHẢI THANH TOÁN ---
    let finalTotal = totalAfterDiscount + vatAmount + tipAmount;

    // --- BƯỚC 5: IN HÓA ĐƠN ĐỊNH DẠNG ASCII ART TABLE ---
    // Hàm bổ trợ định dạng tiền tệ sang dạng 200.000đ
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN') + "đ";
    };

    console.log("┌──────────────────────────────────────────┐");
    console.log("│             HÓA ĐƠN NHÀ HÀNG             │");
    console.log("├──────────────────────────────────────────┤");

    // In danh sách các món ăn đã gọi
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const itemTotal = item.price * item.quantity;
        
        // Định dạng chuỗi hiển thị tiền rút gọn như mẫu (ví dụ: @65k)
        const shortPrice = `${item.price / 1000}k`;
        const shortTotal = `${itemTotal / 1000}k`;
        
        // Tạo dòng text cho món ăn
        const lineText = `${i + 1}. ${item.name.padEnd(8)} x${item.quantity}   @${shortPrice.padEnd(4)} = ${shortTotal}`;
        console.log(`│ ${lineText.padEnd(40)} │`);
    }

    console.log("├──────────────────────────────────────────┤");
    
    // In các thông số tổng hợp tài chính
    console.log(`│ Tổng cộng:        ${formatCurrency(subtotal).padStart(21)} │`);
    console.log(`│ Giảm giá (${discountPercent}%):    ${formatCurrency(discountAmount).padStart(21)} │`);
    console.log(`│ VAT (8%):         ${formatCurrency(vatAmount).padStart(21)} │`);
    console.log(`│ Tip (5%):         ${formatCurrency(tipAmount).padStart(21)} │`);
    
    console.log("├──────────────────────────────────────────┤");
    console.log(`│ THANH TOÁN:       ${formatCurrency(finalTotal).padStart(21)} │`);
    console.log("└──────────────────────────────────────────┘");
}

// --- CHẠY THỬ NGHIỆM ĐỂ KIỂM TRA ---

// Test 1: Chạy theo dữ liệu mẫu của đề bài (Tổng 200k, không rơi vào mốc giảm giá nào, ngày bình thường)
console.log("--- BỘ DỮ LIỆU TEST MẪU (Không giảm giá) ---");
printRestaurantInvoice(order, 1, true); // Ngày thứ 2 (Monday), có Tip

// Test 2: Test trường hợp rơi vào ngày Thứ Tư (Wednesday) để xem
