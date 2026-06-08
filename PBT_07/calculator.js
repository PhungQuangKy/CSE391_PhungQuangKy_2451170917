### Bài B1 (15đ) — Máy tính đơn giản

Dưới đây là mã nguồn cho file `calculator.js` sử dụng JavaScript thuần (chạy được trên cả Node.js và Browser Console), đã xử lý đầy đủ các trường hợp kiểm tra dữ liệu đầu vào (edge cases) theo yêu cầu:

```javascript
function calculate(num1, operator, num2) {
    // 1. Kiểm tra xem đầu vào có phải là số hợp lệ hay không (Edge case: Input không phải số)
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || Number.isNaN(num1) || Number.isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    // 2. Kiểm tra lỗi chia cho 0 (Edge case: bao gồm cả chia lấy dư %)
    if ((operator === '/' || operator === '%') && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }

    // 3. Thực hiện phép toán dựa trên operator
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
        case "**":
            return num1 ** num2; // Phép toán lũy thừa
        default:
            // Edge case: Operator không hợp lệ
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

// --- Bộ dữ liệu Test theo yêu cầu bài toán ---
console.log(calculate(10, "+", 5));      // -> 15
console.log(calculate(10, "/", 0));      // -> "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));      // -> "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5));   // -> "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));     // -> 1024
