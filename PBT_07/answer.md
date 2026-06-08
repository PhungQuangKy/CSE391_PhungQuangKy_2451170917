

## Câu A1: var / let / const

Dưới đây là bảng dự đoán kết quả đầu ra cho các đoạn mã JavaScript và giải thích chi tiết cơ chế hoạt động của chúng.

| Đoạn | Dự đoán Output | Kết quả thực tế | Giải thích chi tiết |
| :--- | :--- | :--- | :--- |
| **Đoạn 1** | `undefined` | `undefined` | **Hoisting với `var`**: Biến `x` được đưa lên đầu phạm vi nhưng chưa được gán giá trị. Khác với `let`, `var` không gây lỗi khi gọi trước khi khai báo. |
| **Đoạn 2** | **ReferenceError** | **ReferenceError** | **Temporal Dead Zone (TDZ)**: Biến `let` cũng được hoist nhưng không được khởi tạo. Truy cập `y` trước dòng khai báo sẽ gây lỗi "cannot access before initialization". |
| **Đoạn 3** | **TypeError** | **TypeError** | **Tính bất biến của `const`**: Bạn không thể gán lại giá trị mới cho một biến đã khai báo bằng `const`. Dòng `z = 20` vi phạm quy tắc này. |
| **Đoạn 4** | `[1, 2, 3, 4]` | `[1, 2, 3, 4]` | **Tham chiếu mảng**: `const` ngăn chặn việc gán lại biến, nhưng cho phép thay đổi nội dung bên trong (mutate) như thêm phần tử vào mảng thông qua phương thức `.push()`. |
| **Đoạn 5** | `Trong block: 2` <br> `Ngoài block: 1` | `Trong block: 2` <br> `Ngoài block: 1` | **Block Scope**: `let` có phạm vi trong cặp ngoặc `{}`. Biến `a` bên trong là một biến độc lập (shadowing), không làm ảnh hưởng đến giá trị của `a` ở phạm vi bên ngoài. |

---

### Giải thích các kết quả bất ngờ

1. **Cơ chế Hoisting (Đoạn 1):** JavaScript "ngầm" đưa khai báo `var x` lên trên cùng, nên lệnh `console.log` tìm thấy biến nhưng giá trị lúc đó chưa được nạp (nên là `undefined`).
2. **Temporal Dead Zone (Đoạn 2):** Dù `let` cũng bị hoist nhưng nó nằm trong "vùng chết tạm thời". Bạn không thể chạm vào nó cho đến khi dòng code khai báo thực sự được chạy.
3. **Tính chất của `const` với Object/Array (Đoạn 4):** `const` bảo vệ "địa chỉ" của biến chứ không bảo vệ "nội dung" bên trong địa chỉ đó. Vì vậy, thêm phần tử vào mảng hoàn toàn hợp lệ, nhưng viết `arr = [5]` thì sẽ lỗi ngay.

## Câu A2: Data Types & Coercion

Dưới đây là bảng dự đoán kết quả cho các biểu thức ép kiểu trong JavaScript:

| Lệnh | Dự đoán Output | Giải thích chi tiết |
| :--- | :--- | :--- |
| `console.log(typeof null);` | `"object"` | Một lỗi kỹ thuật từ phiên bản đầu tiên của JS vẫn được giữ lại để đảm bảo tính tương thích. |
| `console.log(typeof undefined);` | `"undefined"` | `undefined` là một kiểu dữ liệu nguyên thủy riêng biệt. |
| `console.log(typeof NaN);` | `"number"` | Dù có nghĩa là "Không phải số", nhưng về mặt kỹ thuật nó thuộc kiểu dữ liệu Number. |
| `console.log("5" + 3);` | `"53"` | Toán tử `+` khi gặp chuỗi sẽ ưu tiên thực hiện phép nối chuỗi (concatenation). |
| `console.log("5" - 3);` | `2` | Toán tử `-` chỉ dùng cho toán học, nên JS ép chuỗi `"5"` thành số `5` để tính. |
| `console.log("5" * "3");` | `15` | Cả hai chuỗi được ép kiểu về số để thực hiện phép nhân. |
| `console.log(true + true);` | `2` | `true` được ép thành số `1`, biểu thức trở thành $1 + 1 = 2$. |
| `console.log([] + []);` | `""` | Hai mảng rỗng khi cộng lại sẽ bị ép về hai chuỗi rỗng và nối với nhau. |
| `console.log([] + {});` | `"[object Object]"` | Mảng rỗng thành `""`, Object thành `"[object Object]"`, kết quả là nối chuỗi. |
| `console.log({} + []);` | `0` | Trong một số môi trường, `{}` được coi là block rỗng, lệnh trở thành `+[]` (ép kiểu mảng rỗng về số). |

---

### Giải thích tại sao `"5" + 3` và `"5" - 3` cho kết quả khác nhau

Sự khác biệt nằm ở cách JavaScript xử lý **Type Coercion** (ép kiểu tự động) cho từng loại toán tử:

* **Với toán tử cộng (`+`):** Đây là toán tử có tính "đa năng". Nếu có ít nhất một toán hạng là **String**, JavaScript sẽ ưu tiên chuyển đổi tất cả sang chuỗi để thực hiện **nối chuỗi**. Vì vậy, `3` (số) bị biến thành `"3"` (chuỗi) để ghép với `"5"`, tạo ra `"53"`.
* **Với toán tử trừ (`-`):** Toán tử này chỉ có một mục đích duy nhất là thực hiện **phép tính số học**. Nó không tồn tại khái niệm "trừ chuỗi". Do đó, JavaScript buộc phải ép kiểu chuỗi `"5"` về kiểu **Number** để thực hiện phép toán $5 - 3$, cho ra kết quả là `2`.

> **Mẹo nhỏ:** Các toán tử như `*`, `/`, và `%` cũng hoạt động giống như toán tử `-`, luôn ưu tiên ép kiểu về số.


## Câu A3: So sánh == vs ===

Dưới đây là bảng dự đoán kết quả cho các phép so sánh trong JavaScript:

| Lệnh | Dự đoán | Giải thích chi tiết |
| :--- | :--- | :--- |
| `console.log(5 == "5");` | `true` | **Loose Equality**: JS ép kiểu chuỗi `"5"` thành số `5` trước khi so sánh giá trị. |
| `console.log(5 === "5");` | `false` | **Strict Equality**: So sánh cả giá trị và kiểu dữ liệu (Number vs String). |
| `console.log(null == undefined);` | `true` | Quy tắc đặc biệt trong JS: hai giá trị này được coi là bằng nhau khi dùng `==`. |
| `console.log(null === undefined);` | `false` | Khác kiểu dữ liệu (`object` vs `undefined`). |
| `console.log(NaN == NaN);` | `false` | **Đặc biệt**: `NaN` là giá trị duy nhất trong JS không bằng chính nó. |
| `console.log(0 == false);` | `true` | `false` được ép kiểu về số là `0`. |
| `console.log(0 === false);` | `false` | Khác kiểu dữ liệu (`number` vs `boolean`). |
| `console.log("" == false);` | `true` | Cả hai đều được ép kiểu về số là `0` khi so sánh bằng `==`. |

---

### Quy tắc: Nên dùng `==` hay `===`? Tại sao?

Từ giờ trở đi, bạn **luôn luôn nên ưu tiên dùng `===` (và `!==`)**.

**Tại sao?**
1. **Tính chính xác (Predictability):** `===` yêu cầu cả giá trị và kiểu dữ liệu phải khớp nhau. Điều này giúp bạn kiểm soát code tốt hơn, tránh những trường hợp ép kiểu "kỳ quặc" như `"" == false`.
2. **Tránh lỗi tiềm ẩn:** Việc dùng `==` có thể dẫn đến những kết quả logic sai lệch mà bạn không ngờ tới (ví dụ: một biến chưa nhận giá trị có thể vô tình khớp với điều kiện kiểm tra).
3. **Hiệu năng:** Về mặt lý thuyết, `===` nhanh hơn một chút vì JavaScript không phải tốn thêm bước thực hiện các quy tắc ép kiểu phức tạp trước khi so sánh.
4. **Clean Code:** Hầu hết các công cụ kiểm tra code (Linting) và các tiêu chuẩn lập trình hiện đại (như Airbnb JS Style Guide) đều bắt buộc sử dụng `===`.

*Ngoại lệ duy nhất:* Đôi khi người ta dùng `if (variable == null)` để kiểm tra nhanh xem biến đó là `null` hoặc `undefined`. Tuy nhiên, ngay cả trường hợp này, dùng `===` cho từng cái vẫn được coi là tường minh hơn.

## Câu A4: Truthy & Falsy

### 1. Danh sách TẤT CẢ các giá trị Falsy trong JavaScript
Trong JavaScript, chỉ có duy nhất 8 giá trị sau đây được coi là **Falsy** (khi đưa vào câu lệnh điều kiện sẽ trả về `false`):
1. `false`: Từ khóa boolean false.
2. `0`: Số không.
3. `-0`: Số không âm.
4. `0n`: BigInt không.
5. `""`, `''`, `` (chuỗi rỗng).
6. `null`: Giá trị rỗng.
7. `undefined`: Biến chưa xác định.
8. `NaN`: Not a Number.

**Tất cả các giá trị khác ngoài danh sách này đều là Truthy (bao gồm cả mảng rỗng `[]` và đối tượng rỗng `{}`).**

---

### 2. Dự đoán kết quả các câu lệnh điều kiện

| Lệnh | Kết quả | Giải thích |
| :--- | :--- | :--- |
| `if ("0") console.log("A");` | **In "A"** | Một chuỗi không rỗng (dù chứa số 0) vẫn là **Truthy**. |
| `if ("") console.log("B");` | **KHÔNG in** | Chuỗi rỗng là **Falsy**. |
| `if ([]) console.log("C");` | **In "C"** | Một mảng (dù rỗng) luôn là **Truthy**. |
| `if ({}) console.log("D");` | **In "D"** | Một đối tượng (dù rỗng) luôn là **Truthy**. |
| `if (null) console.log("E");` | **KHÔNG in** | `null` là **Falsy**. |
| `if (0) console.log("F");` | **KHÔNG in** | Số `0` là **Falsy**. |
| `if (-1) console.log("G");` | **In "G"** | Mọi số khác `0` (kể cả số âm) đều là **Truthy**. |
| `if (" ") console.log("H");` | **In "H"** | Chuỗi chứa khoảng trắng không phải chuỗi rỗng nên là **Truthy**. |

---

**Kết luận:** Những chữ cái được in ra màn hình là: **A, C, D, G, H**.

### Câu A5 (5đ) — Template Literals

Dưới đây là 3 cách nối chuỗi được viết lại bằng cú pháp **Template Literal (backtick `)** giúp code sạch sẽ và dễ đọc hơn:

```javascript
// Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```


### Câu C1 (10đ) — Debug JavaScript

Dưới đây là danh sách chi tiết các lỗi tìm thấy (bao gồm cả lỗi ẩn liên quan đến `var` trong vòng lặp), giải thích nguyên nhân, cách sửa và mã nguồn hoàn chỉnh sau khi fix.

---

### I. Danh sách liệt kê và giải thích các lỗi (Ít nhất 6 lỗi)

| STT | Vị trí lỗi / Đoạn code lỗi | Nguyên nhân | Cách sửa |
| :--- | :--- | :--- | :--- |
| **1** | Thừa dấu `}` ở dòng số 4: `if (...) { return ... } }` | Dấu đóng ngoặc nhọn `}` bị thừa ngay sau câu lệnh `return`, làm đóng hàm sớm và khiến phần code phía dưới bị lỗi cú pháp. | Xóa bớt một dấu `}` thừa. |
| **2** | Thiếu dấu chấm phẩy hoặc dấu phân tách lệnh ở dòng 3 và dòng 7. | JavaScript có cơ chế tự động chèn dấu chấm phẩy (ASI), nhưng việc thiếu `;` ở các dòng gán biến hoặc `return` dễ gây lỗi khi gộp code hoặc debug. | Thêm dấu `;` vào cuối các câu lệnh. |
| **3** | Toán tử gán thay vì so sánh: `if (giaSauGiam = 0)` | Sử dụng một dấu bằng `=` là phép gán giá trị `0` cho biến, kết quả luôn trả về `falsy` khiến khối lệnh bên trong không bao giờ chạy. | Sửa thành toán tử so sánh nghiêm ngặt `===` (`giaSauGiam === 0`). |
| **4** | Truyền sai kiểu dữ liệu (String thay vì Number): `tinhGiaGiamGia("100000", 20)` | Tham số đầu tiên đang bị truyền dưới dạng chuỗi `"100000"`. Dù JS có tự ép kiểu khi nhân chia, nhưng truyền đúng kiểu số sẽ chuẩn hóa dữ liệu và tránh lỗi logic. | Sửa lại thành kiểu số: `tinhGiaGiamGia(100000, 20)`. |
| **5** | Gọi sai tên hàm: `tinhGiaGiamGia` vs `tinhGiaGiamGia` (Sai hoa/thường) | Hàm được định nghĩa là `tinhGiaGiamGia` (chữ **G** đầu tiên viết thường), nhưng khi gọi ở dưới Test lại viết là `tinhGiaGiamGia` (chữ **G** viết hoa). JS phân biệt chữ hoa chữ thường nên sẽ báo lỗi `ReferenceError`. | Sửa tất cả các lượt gọi hàm bên dưới thành `tinhGiaGiamGia`. |
| **6** | **Lỗi ẩn:** Sử dụng `var i = 0` trong vòng lặp kết hợp `setTimeout`. | Do `var` có phạm vi là `function-scope` (hoặc global), cả 5 callback của `setTimeout` đều tham chiếu chung tới một biến `i`. Khi 1 giây trôi qua, vòng lặp đã chạy xong và `i` đã tăng lên `5`. Kết quả là màn hình in ra 5 lần "Item 5" thay vì từ 0 đến 4. | Thay đổi `var` thành `let` để tận dụng cơ chế `block-scope`. Mỗi lần lặp sẽ tạo ra một phạm vi biến `i` độc lập. |

---

### II. Giải thích chi tiết lỗi ẩn của `var` và tại sao sửa bằng `let`

* **Vấn đề với `var`:** Biến khai báo bằng `var` không có phạm vi khối (block scope) mà có phạm vi hàm hoặc toàn cục. Khi vòng lặp `for` chạy, nó thực hiện tăng giá trị của `i` lên cực kỳ nhanh và kết thúc tại `i = 5`. Lúc này, các hàm `setTimeout` mới bắt đầu hết thời gian chờ (1000ms) và xếp hàng để thực thi. Khi chúng chạy và tìm giá trị của `i`, chúng đều nhìn vào biến `i` chung của hệ thống lúc này đã bằng `5`. Do đó kết quả in ra là 5 dòng `Item 5`.
* **Giải pháp với `let`:** Khi thay thế bằng `let`, `let` hỗ trợ **Block Scope** (phạm vi trong khối ngoặc nhọn `{}`). Mỗi một chu kỳ lặp (iteration) của vòng `for`, JavaScript sẽ tạo ra một môi trường biến `i` hoàn toàn mới và "đóng băng" giá trị của `i` tại thời điểm đó cho hàm `setTimeout` bên trong sử dụng (tương tự cơ chế closure). Vì vậy, kết quả sẽ in đúng thứ tự: `Item 0`, `Item 1`, `Item 2`, `Item 3`, `Item 4`.

---

### III. Đoạn code sau khi đã sửa toàn bộ lỗi

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    var giamGia = giaBan * phanTramGiam / 100;
    let giaSauGiam = giaBan - giamGia;

    if
