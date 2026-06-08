// --- 1. Khai báo dữ liệu sản phẩm (Ít nhất 12 sản phẩm thuộc 4 categories) ---
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/400x300/2563eb/ffffff?text=iPhone+16", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24", price: 22990000, category: "phone", image: "https://placehold.co/400x300/3b82f6/ffffff?text=Galaxy+S24", rating: 4.6, inStock: true },
    { id: 3, name: "Xiaomi 14 Ultra", price: 19990000, category: "phone", image: "https://placehold.co/400x300/10b981/ffffff?text=Xiaomi+14", rating: 4.5, inStock: false },
    { id: 4, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/400x300/6366f1/ffffff?text=MacBook+M3", rating: 4.9, inStock: true },
    { id: 5, name: "Asus ROG Strix", price: 34500000, category: "laptop", image: "https://placehold.co/400x300/ec4899/ffffff?text=ROG+Strix", rating: 4.7, inStock: true },
    { id: 6, name: "Dell XPS 13", price: 31200000, category: "laptop", image: "https://placehold.co/400x300/14b8a6/ffffff?text=Dell+XPS", rating: 4.4, inStock: true },
    { id: 7, name: "iPad Pro M4", price: 26490000, category: "tablet", image: "https://placehold.co/400x300/a855f7/ffffff?text=iPad+Pro", rating: 4.8, inStock: true },
    { id: 8, name: "Samsung Galaxy Tab S9", price: 17990000, category: "tablet", image: "https://placehold.co/400x300/f59e0b/ffffff?text=Galaxy+Tab", rating: 4.3, inStock: true },
    { id: 9, name: "Lenovo Xiaoxin Pad", price: 5490000, category: "tablet", image: "https://placehold.co/400x300/84cc16/ffffff?text=Xiaoxin+Pad", rating: 4.1, inStock: false },
    { id: 10, name: "Apple Watch Ultra 2", price: 21990000, category: "watch", image: "https://placehold.co/400x300/ef4444/ffffff?text=Apple+Watch", rating: 4.7, inStock: true },
    { id: 11, name: "Garmin Fenix 7 Pro", price: 18500000, category: "watch", image: "https://placehold.co/400x300/64748b/ffffff?text=Garmin+Fenix", rating: 4.6, inStock: true },
    { id: 12, name: "Galaxy Watch Ultra", price: 16990000, category: "watch", image: "https://placehold.co/400x300/06b6d4/ffffff?text=Galaxy+Watch", rating: 4.5, inStock: true }
];

// --- 2. Quản lý trạng thái ứng dụng (State) ---
let cartCount = 0;
let activeCategory = "all";
let searchQuery = "";
let currentSort = "default";

// --- 3. Đởi tạo Layout Giao diện bằng JS (100% Core DOM Elements) ---
const app = document.getElementById("app");
const container = document.createElement("div");
container.className = "container";

// Cấu trúc khối Header
const header = document.createElement("header");
const title = document.createElement("h1");
title.textContent = "Tech Catalog";

const headerRight = document.createElement("div");
headerRight.className = "header-right";

const toggleDarkBtn = document.createElement("button");
toggleDarkBtn.className = "btn-toggle-dark";
toggleDarkBtn.textContent = "🌙 Dark Mode";

const cartIconWrapper = document.createElement("div");
cartIconWrapper.className = "cart-icon-wrapper";
cartIconWrapper.textContent = "🛒";
const cartBadge = document.createElement("span");
cartBadge.className = "cart-badge";
cartBadge.textContent = "0";
cartIconWrapper.appendChild(cartBadge);

headerRight.append(toggleDarkBtn, cartIconWrapper);
header.append(title, headerRight);

// Khối chức năng Điều khiển (Controls Bar)
const controlsBar = document.createElement("div");
controlsBar.className = "controls-bar";

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Tìm kiếm sản phẩm nhanh...";
searchInput.className = "search-input";

const categoryFilters = document.createElement("div");
categoryFilters.className = "category-filters";
const categories = ["all", "phone", "laptop", "tablet", "watch"];
categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `category-btn ${cat === 'all' ? 'active' : ''}`;
    btn.textContent = cat.toUpperCase();
    btn.dataset.category = cat;
    categoryFilters.appendChild(btn);
});

const sortSelect = document.createElement("select");
sortSelect.className = "sort-select";
const sortOptions = [
    { value: "default", text: "Sắp xếp theo..." },
    { value: "priceAsc", text: "Giá tăng dần" },
    { value: "priceDesc", text: "Giá giảm dần" },
    { value: "nameAsc", text: "Tên A-Z" },
    { value: "ratingDesc", text: "Đánh giá cao nhất" }
];
sortOptions.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.text;
    sortSelect.appendChild(option);
});

controlsBar.append(searchInput, categoryFilters, sortSelect);

// Lưới hiển thị danh sách sản phẩm
const productsGrid = document.createElement("div");
productsGrid.className = "products-grid";

container.append(header, controlsBar, productsGrid);
app.appendChild(container);


// --- 4. Định nghĩa các Core Functions theo đúng yêu cầu ---

// Hàm thực thi bộ lọc và tìm kiếm kết hợp để render ra giao diện chuẩn xác nhất
function masterRender() {
    let result = [...products];

    // 1. Thực thi lọc Category
    if (activeCategory !== "all") {
        result = result.filter(p => p.category === activeCategory);
    }

    // 2. Thực thi tìm kiếm Realtime
    if (searchQuery) {
        result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 3. Thực thi Sắp xếp dữ liệu (Sort)
    if (currentSort === "priceAsc") result.sort((a, b) => a.price - b.price);
    else if (currentSort === "priceDesc") result.sort((a, b) => b.price - a.price);
    else if (currentSort === "nameAsc") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (currentSort === "ratingDesc") result.sort((a, b) => b.rating - a.rating);

    renderProducts(result);
}

// Chức năng: Tạo cấu trúc hiển thị HTML Card qua createElement và đưa lên giao diện
function renderProducts(productsList) {
    productsGrid.textContent = ""; // Xóa sạch dữ liệu cũ an toàn

    if (productsList.length === 0) {
        const noProduct = document.createElement("p");
        noProduct.textContent = "Không tìm thấy sản phẩm nào phù hợp.";
        noProduct.style.gridColumn = "1/-1";
        noProduct.style.textAlign = "center";
        productsGrid.appendChild(noProduct);
        return;
    }

    productsList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        const img = document.createElement("img");
        img.src = product.image;
        img.className = "product-img";
        img.alt = product.name;

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = product.name;

        const meta = document.createElement("div");
        meta.className = "product-meta";
        const ratingSpan = document.createElement("span");
        ratingSpan.textContent = `⭐ ${product.rating}`;
        const stockSpan = document.createElement("span");
        stockSpan.className = "stock-status";
        stockSpan.textContent = product.inStock ? "Còn hàng" : "Hết hàng";
        stockSpan.style.color = product.inStock ? "#10b981" : "#ef4444";
        meta.append(ratingSpan, stockSpan);

        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = product.price.toLocaleString('vi-VN') + " đ";

        const addCartBtn = document.createElement("button");
        addCartBtn.className = "btn-add-cart";
        addCartBtn.textContent = product.inStock ? "Thêm vào giỏ" : "Tạm hết hàng";
        addCartBtn.disabled = !product.inStock;

        // Sự kiện click trực tiếp nút thêm vào giỏ hàng (Không kích hoạt mở Modal)
        addCartBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Chặn lan truyền nổi bọt để tránh kích hoạt click mở Card Modal
            cartCount++;
            cartBadge.textContent = cartCount;
            cartBadge.classList.add("bump");
            setTimeout(() => cartBadge.classList.remove("bump"), 200);
        });

        // Sự kiện click mở Modal chi tiết sản phẩm
        card.addEventListener("click", () => showProductModal(product));

        info.append(name, meta, price, addCartBtn);
        card.append(img, info);
        productsGrid.appendChild(card);
    });
}

// Chức năng: Sinh động chi tiết sản phẩm qua cấu trúc Modal dynamically
function showProductModal(product) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close";
    closeBtn.textContent = "×";

    const img = document.createElement("img");
    img.className = "modal-img";
    img.src = product.image;

    const title = document.createElement("h2");
    title.textContent = product.name;

    const desc = document.createElement("p");
    desc.textContent = `Đây là sản phẩm dòng cao cấp thuộc danh mục phân loại ${product.category}. Được trang bị phần cứng tối tân kèm theo điểm đánh giá của các chuyên gia công nghệ lên tới ${product.rating}/5 sao toàn diện.`;
    desc.style.lineHeight = "1.6";

    content.append(closeBtn, img, title, desc);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Xử lý đóng modal an toàn
    const closeModal = () => overlay.remove();
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });
}


// --- 5. Liên kết Quản lý Toàn bộ Các Sự Kiện Hệ Thống (EventListeners) ---

// Search Realtime qua event `input`
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    masterRender();
});

// Lọc qua Category bằng danh sách các nút bấm điều hướng
categoryFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".category-btn");
    if (!btn) return;

    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    activeCategory = btn.dataset.category;
    masterRender();
});

// Sắp xếp dữ liệu khi thay đổi thẻ Select Dropdown
sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    masterRender();
});

// Xử lý bật tắt Dark Mode toàn diện hệ thống
toggleDarkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    toggleDarkBtn.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
});


// --- 6. Khởi động chạy lần đầu ---
masterRender();
