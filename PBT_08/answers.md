### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

Dưới đây là mã nguồn viết cùng một hàm `tinhThueBaoHiem(luong)` theo 3 cách khác nhau, kèm theo phần giải thích chi tiết về sự khác biệt trong cơ chế Hoisting.

*Lưu ý về Logic:* Đề bài yêu cầu hàm trả về một object gồm `{ thuong, thuc_nhan }`. Tuy nhiên, đề bài chỉ định nghĩa công thức tính **Thuế** (Thuế = 10% nếu lương > 11 triệu, ngược lại bằng 0%). Vì vậy, trong code Logic sẽ tính toán biến `thue` dựa trên `luong`, và object trả về sẽ chứa `{ thue, thuc_nhan }` (với `thuc_nhan = luong - thue`) để đảm bảo đúng bản chất bài toán tính thuế bảo hiểm.

---

### I. Triển khai code theo 3 cách

```javascript
// Cách 1: Function Declaration (Khai báo hàm truyền thống)
function tinhThueBaoHiemExpression(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    let thuc_nhan = luong - thue;
    return { thue: thue, thuc_nhan: thuc_nhan };
}

// Cách 2: Function Expression (Biểu thức hàm - Gán vào biến)
const tinhThueBaoHiemExpression2 = function(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    let thuc_nhan = luong - thue;
    return { thue: thue, thuc_nhan: thuc_nhan };
};

// Cách 3: Arrow Function (Hàm mũi tên)
const tinhThueBaoHiemArrow = (luong) => {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    let thuc_nhan = luong - thue;
    return { thue: thue, thuc_nhan: thuc_nhan };
};

// --- Test thử nghiệm ---
console.log("Test cách 1 (Lương 20M):", tinhThueBaoHiemExpression(20000000));
console.log("Test cách 2 (Lương 10M):", tinhThueBaoHiemExpression2(10000000));
console.log("Test cách 3 (Lương 15M):", tinhThueBaoHiemArrow(15000000));
```
# Câu A2 (5đ) — Scope & Closure

## 1. Đoạn 1: Closure căn bản

### Kết quả dự đoán (Output)
```javascript
console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(c.increment()); // 3
console.log(c.decrement()); // 2
console.log(c.getCount());  // 2
```
# Câu A3 (5đ) — Array Methods

Cho mảng ban đầu:
```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNums = nums.filter(n => n % 2 === 0);
const tripledNums = nums.map(n => n * 3);
const totalSum = nums.reduce((sum, n) => sum + n, 0);
const firstGreaterThanSeven = nums.find(n => n > 7);
const hasGreaterThanTen = nums.some(n => n > 10);
const allGreaterThanZero = nums.every(n => n > 0);
const parityStrings = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);
const reversedNums = [...nums].reverse();
const reversedNums = nums.toReversed();
```
# Câu A4 (5đ) — Object Destructuring & Spread

## 1. Phần Destructuring

### Kết quả dự đoán (Output)
```javascript
console.log(name, price, ram, color); // "iPhone 16" 25990000 8 "Titan"
console.log(specs);                   // ReferenceError: specs is not defined
```
# Câu C1 (10đ) — Refactor Code

Dưới đây là đoạn code đã được refactor ngắn gọn (chỉ mất 8 dòng bên trong hàm), áp dụng đúng các tính năng `filter`, `map`, `sort`, `destructuring` và `arrow functions` theo chuẩn ES6+ để bạn sao chép thẳng lên GitHub.

```javascript
function processOrders(orders) {
  return orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => {
      const discount = total * 0.1;
      return { id, customer, total, discount, finalTotal: total - discount };
    })
    .sort((a, b) => b.finalTotal - a.finalTotal);
}
```
# Câu C2 (10đ) — Thiết kế API (Tự viết map, filter, reduce)

Dưới đây là mã nguồn triển khai đầy đủ thư viện `miniArray` bằng cách sử dụng vòng lặp căn bản để tái lập cấu trúc hoạt động nguyên bản của `Array.prototype`, kèm theo phần kịch bản kiểm thử (Test Cases) để bạn sao chép trực tiếp lên GitHub:

```javascript
const miniArray = {
  // 1. Tự viết phương thức map
  map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      // Truyền vào 3 tham số chuẩn: element, index, và mảng gốc
      result.push(fn(arr[i], i, arr));
    }
    return result;
  },

  // 2. Tự viết phương thức filter
  filter(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      // Nếu hàm callback trả về giá trị truthy thì thêm phần tử vào mảng kết quả
      if (fn(arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
    return result;
  },

  // 3. Tự viết phương thức reduce
  reduce(arr, fn, initialValue) {
    // Kiểm tra xem người dùng có truyền vào giá trị khởi tạo ban đầu hay không
    const hasInitialValue = initialValue !== undefined;
    
    // Nếu không có initialValue và mảng rỗng thì throw lỗi giống hệt built-in reduce
    if (arr.length === 0 && !hasInitialValue) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    // Thiết lập giá trị tích lũy (accumulator) và vị trí bắt đầu vòng lặp
    let accumulator = hasInitialValue ? initialValue : arr[0];
    let startIndex = hasInitialValue ? 0 : 1;

    for (let i = startIndex; i < arr.length; i++) {
      accumulator = fn(accumulator, arr[i], i, arr);
    }

    return accumulator;
  }
};

// ==========================================
// Kịch bản Kiểm thử (Test Cases từ đề bài)
// ==========================================

// Test map -> Kỳ vọng xuất ra: [2, 4, 6]
console.log(miniArray.map([1, 2, 3], x => x * 2)); 

// Test filter -> Kỳ vọng xuất ra: [3, 4]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2)); 

// Test reduce -> Kỳ vọng xuất ra: 10
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
