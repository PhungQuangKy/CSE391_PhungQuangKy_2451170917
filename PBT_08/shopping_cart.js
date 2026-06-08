# B2: Module Giỏ hàng sử dụng Closure

Dưới đây là toàn bộ mã nguồn hoàn chỉnh của hàm `createCart` cùng phần kịch bản kiểm thử (Test Cases) được định dạng sẵn trong một khối lệnh Markdown duy nhất để bạn dễ dàng copy thẳng lên GitHub.

```javascript
function createCart() {
    // Private data - Biến cục bộ được bảo vệ bởi Closure
    let items = [];
    let currentDiscount = { type: 'none', value: 0, code: '' };

    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;
            
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Thêm bản sao của product kết hợp trường quantity để tránh mutate object gốc ngoài hàm
                items.push({ ...product, quantity });
            }
        },
        
        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const existingItem = items.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity = newQuantity;
            }
        },
        
        // Tính tổng tiền (Sau khi đã áp dụng discount nếu có)
        getTotal() {
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (currentDiscount.type === 'percentage') {
                return subTotal * (1 - currentDiscount.value);
            } else if (currentDiscount.type === 'fixed') {
                // Đảm bảo tổng tiền không bị âm nếu giá trị giảm lớn hơn giá trị giỏ hàng
                return Math.max(0, subTotal - currentDiscount.value);
            }
            
            return subTotal;
        },
        
        // Áp dụng mã giảm giá
        // Codes: "SALE10" → -10%, "SALE20" → -20%, "FREESHIP" → -30000
        applyDiscount(code) {
            switch (code) {
                case "SALE10":
                    currentDiscount = { type: 'percentage', value: 0.1, code };
                    break;
                case "SALE20":
                    currentDiscount = { type: 'percentage', value: 0.2, code };
                    break;
                case "FREESHIP":
                    currentDiscount = { type: 'fixed', value: 30000, code };
                    break;
                default:
                    console.log(`Mã giảm giá "${code}" không hợp lệ.`);
            }
        },
        
        // In giỏ hàng dạng bảng chuẩn đẹp theo yêu cầu đề bài
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng       │");
            
            items.forEach((item, index) => {
                const no = String(index + 1).padEnd(1);
                const name = item.name.padEnd(13);
                const qty = String(item.quantity).padStart(2);
                const price = item.price.toLocaleString('vi-VN').padStart(10);
                const total = (item.price * item.quantity).toLocaleString('vi-VN').padStart(10);
                
                console.log(`│ ${no} │ ${name} │ ${qty} │ ${price}  │ ${total}  │`);
            });
            
            console.log("├──────────────────────────────────────────────┤");
            
            // Nếu có áp dụng mã giảm giá, hiển thị thêm thông tin giảm giá
            if (currentDiscount.type !== 'none') {
                const discountText = `Mã giảm giá đã áp dụng: ${currentDiscount.code}`;
                console.log(`│ ${discountText.padEnd(44)} │`);
            }
            
            const finalTotalStr = this.getTotal().toLocaleString('vi-VN') + "đ";
            const footerText = `Tổng cộng: ${finalTotalStr}`.padStart(41);
            console.log(`│ ${footerText}   │`);
            console.log("└──────────────────────────────────────────────┘");
        },
        
        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },
        
        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            currentDiscount = { type: 'none', value: 0, code: '' };
        }
    };
}

// ==========================================
// Kịch bản Kiểm thử (Test Cases từ đề bài)
// ==========================================
const cart = createCart();

// Thêm các sản phẩm test
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Trùng id 1 -> Tăng quantity lên 2

// Khởi chạy in giỏ hàng lần đầu
cart.printCart();

// Áp dụng mã ưu đãi giảm 10%
cart.applyDiscount("SALE10");
cart.printCart();

// Kiểm tra bộ đếm số lượng và chức năng xóa sản phẩm
console.log("Số SP:", cart.getItemCount());   // Kỳ vọng ra: 4

cart.removeItem(3);                          // Xóa AirPods Pro (đang có số lượng là 2)
console.log("Sau xóa:", cart.getItemCount()); // Kỳ vọng ra: 2
