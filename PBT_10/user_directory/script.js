// Biến toàn cục lưu trữ danh sách local (Client-side state)
let localUsers = [];

// ==========================================
// 1. TÁCH RIÊNG API LAYER (Xử lý bất đồng bộ HTTP)
// ==========================================
const api = {
    baseURL: "[https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)",

    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error("Không thể tải danh sách người dùng.");
        return await response.ok ? response.json() : [];
    },

    async getUser(id) {
        const response = await fetch(`${`${this.baseURL}/users`}/${id}`);
        if (!response.ok) throw new Error(`Không thể tải chi tiết user có ID: ${id}`);
        return await response.json();
    },

    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!response.ok) throw new Error("Lỗi khi thêm thành viên mới.");
        return await response.json();
    },

    async updateUser(id, data) {
        const response = await fetch(`${`${this.baseURL}/users`}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!response.ok) throw new Error("Lỗi khi cập nhật thông tin.");
        return await response.json();
    },

    async deleteUser(id) {
        const response = await fetch(`${`${this.baseURL}/users`}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error("Gặp lỗi trong quá trình thực hiện xóa.");
        return true;
    }
};

// ==========================================
// 2. TÁCH RIÊNG UI LAYER (Xử lý DOM và hiển thị)
// ==========================================
const ui = {
    container: document.getElementById('user-list-container'),
    modal: document.getElementById('user-modal'),
    form: document.getElementById('user-form'),
    modalTitle: document.getElementById('modal-title'),
    toastContainer: document.getElementById('toast-container'),

    renderUsers(users) {
        this.container.innerHTML = '';
        if (users.length === 0) {
            this.container.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#666;">Không tìm thấy kết quả phù hợp</p>';
            return;
        }

        users.forEach(user => {
            const card = document.createElement('div');
            card.classList.add('user-card');
            card.innerHTML = `
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <p>✉️ ${user.email}</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-secondary edit-btn" data-id="${user.id}">Sửa</button>
                    <button class="btn btn-danger delete-btn" data-id="${user.id}">Xóa</button>
                </div>
            `;
            this.container.appendChild(card);
        });
        this.registerCardEvents();
    },

    showLoading() {
        this.container.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.classList.add('skeleton-card');
            skeleton.innerHTML = `
                <div class="skeleton-line title"></div>
                <div class="skeleton-line text"></div>
                <div class="skeleton-line btn-space"></div>
            `;
            this.container.appendChild(skeleton);
        }
    },

    hideLoading() {
        // Hàm renderUsers chạy ngay sau đó sẽ tự động dọn sạch vùng container
    },

    showError(message) {
        this.showToast(message, 'toast-error');
    },

    showSuccess(message) {
        this.showToast(message, 'toast-success');
    },

    showToast(message, className) {
        const toast = document.createElement('div');
        toast.className = `toast ${className}`;
        toast.textContent = message;
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    },

    openModal(mode, user = null) {
        this.modal.classList.remove('hidden');
        if (mode === 'EDIT' && user) {
            this.modalTitle.textContent = "Cập Nhật Thông Tin";
            document.getElementById('form-user-id').value = user.id;
            document.getElementById('form-name').value = user.name;
            document.getElementById('form-email').value = user.email;
        } else {
            this.modalTitle.textContent = "Thêm User Mới";
            this.form.reset();
            document.getElementById('form-user-id').value = '';
        }
    },

    closeModal() {
        this.modal.classList.add('hidden');
        this.form.reset();
    },

    registerCardEvents() {
        // Đăng ký ủy quyền sự kiện sửa cho các thẻ nút tương ứng
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                const targetUser = localUsers.find(u => u.id == id);
                if (targetUser) ui.openModal('EDIT', targetUser);
            });
        });

        // Đăng ký ủy quyền sự kiện xóa kèm hộp thoại Confirm
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                if (confirm("Bạn có chắc chắn muốn xóa thành viên này không?")) {
                    try {
                        // Gọi DELETE API layer
                        await api.deleteUser(id);
                        
                        // Cập nhật mảng cục bộ ngay lập tức (Không cần reload)
                        localUsers = localUsers.filter(u => u.id != id);
                        ui.renderUsers(localUsers);
                        ui.showSuccess("Xóa tài khoản thành công!");
                    } catch (err) {
                        ui.showError(err.message);
                    }
                }
            });
        });
    }
};

// ==========================================
// 3. LOGIC ĐIỀU HƯỚNG VÀ SỰ KIỆN TOÀN CỤC
// ==========================================

// Sự kiện tải danh sách ban đầu (READ)
document.addEventListener('DOMContentLoaded', async () => {
    ui.showLoading();
    try {
        localUsers = await api.getUsers();
        ui.renderUsers(localUsers);
    } catch (err) {
        ui.showError(err.message);
    }
});

// Sự kiện lọc tìm kiếm cục bộ (SEARCH - Client-side filter)
document.getElementById('search-input').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = localUsers.filter(user => 
        user.name.toLowerCase().includes(keyword) || 
        user.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(filtered);
});

// Điều khiển đóng mở Modal cửa sổ
document.getElementById('open-add-modal-btn').addEventListener('click', () => ui.openModal('ADD'));
document.getElementById('close-modal-btn').addEventListener('click', () => ui.closeModal());

// Sự kiện submit lưu Form (Xử lý cả CREATE & UPDATE)
ui.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('form-user-id').value;
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const payload = { name, email };

    try {
        if (id) {
            // Trường hợp UPDATE
            const updatedData = await api.updateUser(id, payload);
            
            // Tìm và sửa đổi phần tử tương ứng trong mảng local mà không ép reload trang
            const index = localUsers.findIndex(u => u.id == id);
            if (index !== -1) {
                localUsers[index] = { ...localUsers[index], name: updatedData.name, email: updatedData.email };
            }
            ui.showSuccess("Cập nhật thông tin thành công!");
        } else {
            // Trường hợp CREATE
            const newUserData = await api.createUser(payload);
            
            // Vì API luôn giả lập id = 11, tạo ID ngẫu nhiên cho mảng cục bộ để tránh trùng khóa ID
            newUserData.id = localUsers.length > 0 ? Math.max(...localUsers.map(u => u.id)) + 1 : 1;
            
            localUsers.unshift(newUserData); // Đẩy phần tử mới lên trên cùng danh sách
            ui.showSuccess("Thêm tài khoản thành viên thành công!");
        }
        
        ui.renderUsers(localUsers);
        ui.closeModal();
    } catch (err) {
        ui.showError(err.message);
    }
});
