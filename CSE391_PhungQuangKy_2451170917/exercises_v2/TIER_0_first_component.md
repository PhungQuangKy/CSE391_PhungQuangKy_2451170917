Bài 0.1:

1. File .jsx khác gì .js?

- Về bản chất đây đều là JavaScript
- Sự khác biệt:  
   .jsx:
- Chứa JavaScript + JSX
- Thường dùng cho React Component
- JSX phải được Babel/Vite chuyển đổi thành JavaScript

  .js:

- Chứa JavaScript thông thường
- Không nhất thiết có giao diện React
- Có thể chạy trực tiếp bởi JS Engine  
  Vd:  
   .jsx:

```
<h1>Xin chào React!</h1>
```

-> .js:

```
React.createElement("h1", null, "Xin chào React!");
```

2. Tại sao phải `export default App`?

- Trong React mỗi file được coi là một module độc lập. Các biến, hàm hay component bạn tạo ra trong file đó mặc định là riêng tư – các file khác không thể nhìn thấy hay sử dụng được.
- `export default App` cho phép component App được sử dụng ở file khác.

3. Thử xóa export default App → chuyện gì xảy ra?

- Nếu xóa dòng `export default App`, ứng dụng của bạn sẽ lập tức bị lỗi crash và màn hình trình duyệt sẽ trắng xóa hoặc hiển thị một bảng thông báo lỗi lớn. Do `main.jsx` đang yêu cầu lấy một default export, nhưng `App.jsx`không cung cấp nữa.

Bài 0.2:  
Bài 1:

```
function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserProfile;
```

Bài 2:

```
function ProductInfo() {
    return (
        <div className="product">
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p>
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button>Mua ngay</button>
        </div>
    );
}

export default ProductInfo;
```
