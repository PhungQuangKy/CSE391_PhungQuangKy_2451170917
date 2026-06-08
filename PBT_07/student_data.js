### Bài B2 — Xử lý dữ liệu sinh viên

Dưới đây là mã nguồn đầy đủ cho file `student_data.js`, thực hiện tất cả 7 yêu cầu (bao gồm cả câu hỏi Bonus) bằng cách sử dụng vòng lặp và câu lệnh `if/else` thuần túy:

```javascript
// Cho mảng dữ liệu:
const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// --- Khởi tạo các biến để phục vụ tính toán và thống kê ---
// Biến đếm số lượng mỗi xếp loại (Yêu cầu 4)
let countGioi = 0;
let countKha = 0;
let countTB = 0;
let countYeu = 0;

// Biến lưu sinh viên có điểm TB cao nhất và thấp nhất (Yêu cầu 5)
let maxAvgStudent = null;
let minAvgStudent = null;

// Biến tính tổng điểm toàn lớp cho từng môn (Yêu cầu 6)
let totalMath = 0;
let totalPhysics = 0;
let totalCs = 0;

// Biến tính tổng điểm TB theo giới tính (Yêu cầu 7 - Bonus)
let totalAvgMale = 0;
let countMale = 0;
let totalAvgFemale = 0;
let countFemale = 0;


// --- IN BẢNG KẾT QUẢ (Yêu cầu 1, 2, 3) ---
console.log("| STT | Tên     | TB     | Xếp loại   |");
console.log("|-----|---------|--------|------------|");

for (let i = 0; i < students.length; i++) {
    const sv = students[i];

    // 1. Tính điểm trung bình (math*0.4 + physics*0.3 + cs*0.3)
    let avg = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    // Làm tròn 1 chữ số thập phân cho đẹp bảng kết quả
    avg = Math.round(avg * 10) / 10; 

    // 2. Xếp loại
    let rank = "";
    if (avg >= 8.0) {
        rank = "Giỏi";
        countGioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        countKha++;
    } else if (avg >= 5.0) {
        rank = "Trung bình";
        countTB++;
    } else {
        rank = "Yếu";
        countYeu++;
    }

    // 3. In dòng kết quả của sinh viên hiện tại ra bảng
    // Sử dụng padEnd để căn chỉnh các cột thẳng hàng giống như định dạng markdown mẫu
    const sttStr = (i + 1).toString().padEnd(3);
    const nameStr = sv.name.padEnd(7);
    const avgStr = avg.toFixed(1).padEnd(6);
    console.log(`| ${sttStr} | ${nameStr} | ${avgStr} | ${rank.padEnd(10)} |`);

    // --- Tích hợp tính toán các yêu cầu thống kê phía dưới ---
    // 5. Tìm SV có điểm TB cao nhất và thấp nhất
    if (maxAvgStudent === null || avg > (maxAvgStudent.math * 0.4 + maxAvgStudent.physics * 0.3 + maxAvgStudent.cs * 0.3)) {
        maxAvgStudent = sv;
    }
    if (minAvgStudent === null || avg < (minAvgStudent.math * 0.4 + minAvgStudent.physics * 0.3 + minAvgStudent.cs * 0.3)) {
        minAvgStudent = sv;
    }

    // 6. Cộng dồn điểm để tính điểm TB môn toàn lớp
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCs += sv.cs;

    // 7. Thống kê theo giới tính (Bonus)
    if (sv.gender === "M") {
        totalAvgMale += avg;
        countMale++;
    } else if (sv.gender === "F") {
        totalAvgFemale += avg;
        countFemale++;
    }
}

console.log("\n============================================\n");

// 4. In số lượng SV mỗi xếp loại
console.log("4. Thống kê số lượng xếp loại:");
console.log(`- Giỏi: ${countGioi} SV`);
console.log(`- Khá: ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu: ${countYeu} SV\n`);

// 5. In SV có điểm TB cao nhất và thấp nhất
const maxAvgValue = Math.round((maxAvgStudent.math * 0.4 + maxAvgStudent.physics * 0.3 + maxAvgStudent.cs * 0.3) * 10) / 10;
const minAvgValue = Math.round((minAvgStudent.math * 0.4 + minAvgStudent.physics * 0.3 + minAvgStudent.cs * 0.3) * 10) / 10;
console.log("5. Tìm kiếm sinh viên:");
console.log(`- SV có điểm TB cao nhất: ${maxAvgStudent.name} (${maxAvgValue} điểm)`);
console.log(`- SV có điểm TB thấp nhất: ${minAvgStudent.name} (${minAvgValue} điểm)\n`);

// 6. In điểm TB toàn lớp cho từng môn
const classAvgMath = Math.round((totalMath / students.length) * 10) / 10;
const classAvgPhysics = Math.round((totalPhysics / students.length) * 10) / 10;
const classAvgCs = Math.round((totalCs / students.length) * 10) / 10;
console.log("6. Điểm trung bình môn toàn lớp:");
console.log(`- Toán (Math): ${classAvgMath}`);
console.log(`- Vật lý (Physics): ${classAvgPhysics}`);
console.log(`- Tin học (CS): ${classAvgCs}\n`);

// 7. Bonus: In điểm TB theo giới tính
const classAvgMale = countMale > 0 ? Math.round((totalAvgMale / countMale) * 10) / 10 : 0;
const classAvgFemale = countFemale > 0 ? Math.round((totalAvgFemale / countFemale) * 10) / 10 : 0;
console.log("7. Bonus - Điểm trung bình theo giới tính:");
console.log(`- Điểm TB của các bạn Nam (M): ${classAvgMale}`);
console.log(`- Điểm TB của các bạn Nữ (F): ${classAvgFemale}`);
