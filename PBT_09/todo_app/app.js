// --- 1. Khởi tạo State & LocalStorage ---
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all'; // 'all' | 'active' | 'completed'

// DOM Elements
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = {
    all: document.getElementById('filterAll'),
    active: document.getElementById('filterActive'),
    completed: document.getElementById('filterCompleted')
};

// --- 2. Hàm Tiện Ích (Helper Functions) ---
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCount() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// --- 3. Tạo Phần Tử DOM (Dùng createElement - KHÔNG dùng innerHTML) ---
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    // Span chứa text hiển thị nội dung việc cần làm
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;
    
    // Nút xóa (X)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '❌';

    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

// --- 4. Render Giao Diện Dựa Trên Lọc (Filter) ---
function render() {
    todoList.textContent = ''; // Xóa sạch danh sách cũ một cách an toàn

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // case 'all'
    });

    filteredTodos.forEach(todo => {
        const todoEl = createTodoElement(todo);
        todoList.appendChild(todoEl);
    });

    updateCount();
}

// --- 5. Xử Lý Event Delegation (Bắt sự kiện tập trung tại #todoList) ---
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const todoId = parseInt(li.dataset.id);

    // Hành động 1: Click vào text để Toggle Completed
    if (e.target.classList.contains('todo-text')) {
        todos = todos.map(todo => 
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        saveToLocalStorage();
        render();
    }

    // Hành động 2: Click vào nút ❌ để Xóa
    if (e.target.classList.contains('delete-btn')) {
        // Thêm hiệu ứng fade-out trước khi xóa khỏi DOM
        li.style.opacity = '0';
        li.style.transform = 'translateX(20px)';
        
        li.addEventListener('transitionend', () => {
            todos = todos.filter(todo => todo.id !== todoId);
            saveToLocalStorage();
            render();
        }, { once: true });
    }
});

// Xử lý Double Click (Sửa đổi Todo) thông qua Event Delegation
todoList.addEventListener('dblclick', (e) => {
    if (!e.target.classList.contains('todo-text')) return;

    const li = e.target.closest('.todo-item');
    const todoId = parseInt(li.dataset.id);
    const todoTextSpan = e.target;
    const currentTodo = todos.find(todo => todo.id === todoId);

    // Tạo ô input tạm thời để chỉnh sửa nội dung
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = currentTodo.text;

    // Ẩn văn bản và nút xóa tạm thời để chèn ô input vào thay thế
    const deleteBtn = li.querySelector('.delete-btn');
    todoTextSpan.style.display = 'none';
    deleteBtn.style.display = 'none';
    li.insertBefore(input, deleteBtn);
    input.focus();

    // Hàm lưu lại thay đổi sau khi sửa xong
    function saveEdit() {
        const newText = input.value.trim();
        if (newText) {
            todos = todos.map(todo => 
                todo.id === todoId ? { ...todo, text: newText } : todo
            );
            saveToLocalStorage();
        }
        render(); // Render lại để trả về cấu trúc ban đầu
    }

    // Lưu khi nhấn phím Enter
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') saveEdit();
    });

    // Lưu khi click ra ngoài ô input (Blur event)
    input.addEventListener('blur', saveEdit);
});

// --- 6. Xử Lý Các Sự Kiện Form & Hệ Thống Điều Khiển ---

// Thêm Todo mới
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    saveToLocalStorage();
    render();
    todoInput.value = '';
});

// Xóa tất cả Todo đã hoàn thành (Clear Completed)
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    saveToLocalStorage();
    render();
});

// Xử lý chuyển đổi bộ lọc dữ liệu (Filter All/Active/Completed)
Object.keys(filterBtns).forEach(filterType => {
    filterBtns[filterType].addEventListener('click', () => {
        // Gỡ class active cũ
        Object.values(filterBtns).forEach(btn => btn.classList.remove('active'));
        // Thêm class active vào nút vừa click
        filterBtns[filterType].classList.add('active');
        
        currentFilter = filterType;
        render();
    });
});

// --- 7. Chạy Lần Đầu Khi Tải Trang ---
render();
