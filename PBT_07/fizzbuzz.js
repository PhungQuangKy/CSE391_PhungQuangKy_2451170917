### Bài B4 (10đ) — FizzBuzz nâng cao

Dưới đây là mã nguồn cho file `fizzbuzz.js`, bao gồm cả phiên bản Classic lặp từ 1 đến 100 và hàm giải quyết phiên bản nâng cao (Custom với động bộ quy tắc bất kỳ):

```javascript
// ==========================================
// VERSION 1: Classic
// In từ 1 đến 100. Chia hết cho 3 -> "Fizz", chia hết cho 5 -> "Buzz", chia hết cả 2 -> "FizzBuzz"
// ==========================================
console.log("--- VERSION 1: CLASSIC (1 - 100) ---");

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}


console.log("\n==========================================\n");


// ==========================================
// VERSION 2: Custom
// Viết hàm customFizzBuzz(n, rules) hoạt động với BẤT KỲ bộ rules nào
// rules = mảng [{ divisor: 3, word: "Fizz" }, { divisor: 5, word: "Buzz" }, ...]
// ==========================================
console.log("--- VERSION 2: CUSTOM FIZZBUZZ ---");

function customFizzBuzz(n, rules) {
    // Duyệt từ 1 đến n
    for (let i = 1; i <= n; i++) {
        let resultString = "";

        // Duyệt qua từng quy tắc (rule) trong mảng rules được truyền vào
        for (let j = 0; j < rules.length; j++) {
            // Nếu i chia hết cho divisor của rule hiện tại thì ghép chữ (word) vào
            if (i % rules[j].divisor === 0) {
                resultString += rules[j].word;
            }
        }

        // Nếu chuỗi kết quả không rỗng (tức là chia hết cho ít nhất một ước trong bộ quy tắc)
        // Thì in chuỗi đó ra. Ngược lại, in chính số i đó.
        if (resultString !== "") {
            console.log(`${i} = "${resultString}"`);
        } else {
            console.log(i);
        }
    }
}

// --- Bộ dữ liệu Test theo yêu cầu bài toán ---
const testRules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

// Chạy test với n = 110 để kiểm tra rõ các điểm mốc (21, 15, 35, 105)
customFizzBuzz(110, testRules);
