# Bài tập nâng cao — Higher-Order Functions

Dưới đây là toàn bộ mã nguồn hoàn chỉnh định nghĩa 4 hàm higher-order phổ biến (`pipe`, `memoize`, `debounce`, và `retry`) được đóng gói sẵn trong một khối Markdown để bạn dễ dàng sao chép lên GitHub.

```javascript
// ==========================================
// 1. pipe() – Nối chuỗi functions
// ==========================================
function pipe(...fns) {
    // Nhận vào giá trị ban đầu x, dùng reduce để chuyển kết quả hàm trước làm tham số cho hàm sau
    return function(initialValue) {
        return fns.reduce((currentValue, currentFn) => currentFn(currentValue), initialValue);
    };
}

// --- TEST PIPE ---
const process = pipe(
    x => x * 2,           // 5 -> 10
    x => x + 10,          // 10 -> 20
    x => x.toString(),    // 20 -> "20"
    x => "Kết quả: " + x
);
console.log(process(5)); // -> "Kết quả: 20"


// ==========================================
// 2. memoize() – Cache kết quả
// ==========================================
function memoize(fn) {
    // Tạo một vùng lưu trữ cache bằng Object nằm trong closure
    const cache = {};
    
    return function(...args) {
        // Chuyển mảng các tham số thành chuỗi key (ví dụ: "[1000000]")
        const key = JSON.stringify(args);
        
        // Nếu đã tồn tại kết quả trong cache, trả về luôn không cần tính lại
        if (key in cache) {
            return cache[key];
        }
        
        // Nếu chưa có, thực thi hàm gốc và lưu kết quả vào cache
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// --- TEST MEMOIZE ---
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000)); // -> "Đang tính..." -> 499999500000
console.log(expensiveCalc(1000000)); // -> (Không in "Đang tính...", lấy trực tiếp từ cache!) -> 499999500000


// ==========================================
// 3. debounce() – Chờ user ngừng gõ mới thực hiện
// ==========================================
function debounce(fn, delay) {
    let timeoutId = null;
    
    return function(...args) {
        // Mỗi khi hàm được gọi, xóa bộ đếm thời gian của lần gọi trước đó
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Thiết lập bộ đếm thời gian mới
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// --- TEST DEBOUNCE ---
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Gọi liên tục giả lập hành động gõ phím nhanh của người dùng
search("a");
search("ab");
search("abc"); 
// -> Sau 500ms kể từ lượt gọi "abc", màn hình chỉ in đúng 1 lần duy nhất: "Searching: abc"


// ==========================================
// 4. retry() – Thử lại nếu lỗi (Async/Await)
// ==========================================
async function retry(fn, maxAttempts = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Chờ hàm async thực thi (sử dụng await để bắt lỗi nếu có reject/throw)
            return await fn();
        } catch (error) {
            lastError = error;
            console.warn(`Lần thử ${attempt} thất bại. Đang thử lại...`);
        }
    }
    
    // Nếu vượt quá số lần thử mà vẫn lỗi thì throw lỗi cuối cùng ra ngoài
    throw new Error(`Thực thi thất bại sau ${maxAttempts} lần thử. Lỗi gốc: ${lastError.message}`);
}

// --- TEST RETRY ---
// Giả lập một hàm gọi API có tỉ lệ lỗi cao
let count = 0;
const unstableFetch = async () => {
    count++;
    if (count < 3) {
        throw new Error("Lỗi kết nối mạng!");
    }
    return { status: 200, data: "Thành công!" };
};

// Thực thi chạy thử nghiệm hàm retry
retry(unstableFetch, 3)
    .then(res => console.log("Kết quả cuối cùng:", res))
    .catch(err => console.error(err.message));
