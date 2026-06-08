// 1. Máy tạo ngẫu nhiên 1 số từ 1 đến 100
const targetNumber = Math.floor(Math.random() * 100) + 1;

// Khởi tạo các biến quản lý trạng thái trò chơi
let attempts = 0;             // Đếm số lần đoán (Yêu cầu 3)
const maxAttempts = 7;        // Giới hạn 7 lần đoán (Yêu cầu 5)
const guessedNumbers = [];    // Mảng lưu vết các số đã đoán để tránh trùng
let hasWon = false;           // Trạng thái kiểm tra xem user đã thắng chưa

alert("Chào mừng bạn đến với trò chơi đoán số từ 1 đến 100! Bạn có tối đa 7 lượt đoán.");

// Vòng lặp chạy game dựa trên số lượt đoán
while (attempts < maxAttempts) {
    let input = prompt(`Lượt đoán thứ ${attempts + 1}/${maxAttempts}. Nhập số bạn đoán (1-100):`);
    
    // Nếu bấm "Cancel" (Hủy), dừng trò chơi luôn
    if (input === null) {
        alert("Bạn đã thoát trò chơi.");
        break;
    }
    
    // Chuyển đổi dữ liệu nhập vào thành số nguyên
    let guess = parseInt(input.trim(), 10);

    // --- Yêu cầu thêm: Validate input (Chỉ chấp nhận số 1-100) ---
    if (Number.isNaN(guess) || guess < 1 || guess > 100) {
        alert("Lỗi: Vui lòng chỉ nhập một số hợp lệ trong khoảng từ 1 đến 100!");
        continue; // Bỏ qua lượt nhập lỗi này, không tính vào số lần đoán
    }

    // --- Yêu cầu thêm: Kiểm tra trùng số đã đoán trước đó ---
    let isDuplicated = false;
    for (let i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            isDuplicated = true;
            break;
        }
    }
    
    if (isDuplicated) {
        alert("Bạn đã đoán số này rồi!");
        continue; // Bỏ qua, không tính lượt đoán
    }

    // Nếu input hợp lệ và không trùng, ghi nhận lượt đoán hợp lệ
    attempts++;
    guessedNumbers.push(guess);

    // 2. So sánh và máy trả lời kết quả
    if (guess === targetNumber) {
        // 4. Khi đoán đúng, hiển thị thông báo chiến thắng và số lần đoán
        alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
        hasWon = true;
        break;
    } else if (guess < targetNumber) {
        alert("Cao hơn"); // Số máy chọn cao hơn số user đoán
    } else {
        alert("Thấp hơn"); // Số máy chọn thấp hơn số user đoán
    }
}

// 5. Nếu hết lượt mà vẫn chưa đoán đúng -> Thua, hiển thị đáp án
if (!hasWon && attempts === maxAttempts) {
    alert(`Hết lượt! Bạn đã thua cuộc. Đáp án chính xác là: ${targetNumber}`);
}
