// --- 1. Dữ liệu hình ảnh giả lập (9 bức ảnh) ---
const mockImages = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `Hình ảnh phong cảnh số ${i + 1}`,
    src: `https://placehold.co/800x600/3b82f6/ffffff?text=Image+${i + 1}`
}));

// --- 2. Khởi tạo Trạng thái (State) ---
let currentImgIndex = -1;
let isSlideshowActive = false;
let slideshowIntervalId = null;
let filteredCommands = [];
let activeCommandIndex = 0;
let lastFocusedElement = null; // Quản lý focus khi đóng modal

// Đăng ký danh sách tập lệnh cho Command Palette
const commands = [
    ...mockImages.map(img => ({ text: `Mở xem ảnh: ${img.title}`, action: () => openLightbox(img.id - 1), shortcut: `${img.id}` })),
    { text: "Bật / Tắt Slideshow tự động", action: () => toggleSlideshow(), shortcut: "Space" },
    { text: "Đóng cửa sổ hiện tại", action: () => closeAllOverlays(), shortcut: "Esc" }
];

// Elements DOM
const galleryGrid = document.querySelector('.gallery-grid');
const lightboxModal = document.getElementById('lightboxModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const slideshowBadge = document.getElementById('slideshowBadge');
const commandPalette = document.getElementById('commandPalette');
const paletteSearch = document.getElementById('paletteSearch');
const commandList = document.getElementById('commandList');

// --- 3. Render giao diện Gallery lúc khởi chạy ---
function initGallery() {
    mockImages.forEach((img, idx) => {
        const itemBtn = document.createElement('button');
        itemBtn.className = 'gallery-item';
        itemBtn.setAttribute('role', 'listitem');
        itemBtn.setAttribute('aria-label', `Xem ${img.title}. Nhấn phím số ${idx + 1} để mở nhanh.`);
        
        const badge = document.createElement('span');
        badge.className = 'photo-number';
        badge.textContent = idx + 1;

        const image = document.createElement('img');
        image.src = img.src;
        image.alt = img.title;

        itemBtn.append(badge, image);
        
        // Sự kiện click mở ảnh
        itemBtn.addEventListener('click', () => openLightbox(idx));
        galleryGrid.appendChild(itemBtn);
    });
}

// --- 4. Quản lý logic Lightbox Gallery ---
function openLightbox(index) {
    lastFocusedElement = document.activeElement; // Lưu vết element đang focus
    currentImgIndex = index;
    
    lightboxModal.setAttribute('aria-hidden', 'false');
    updateLightboxContent();
    document.getElementById('closeModalBtn').focus(); // Chuyển focus vào nút đóng modal
}

function updateLightboxContent() {
    const currentImg = mockImages[currentImgIndex];
    modalImg.src = currentImg.src;
    modalImg.alt = currentImg.title;
    modalCaption.textContent = currentImg.title;
}

function closeLightbox() {
    lightboxModal.setAttribute('aria-hidden', 'true');
    stopSlideshow();
    currentImgIndex = -1;
    if (lastFocusedElement) lastFocusedElement.focus(); // Trả lại vị trí focus cũ
}

function navigateImage(direction) {
    if (currentImgIndex === -1) return;
    if (direction === 'next') {
        currentImgIndex = (currentImgIndex + 1) % mockImages.length;
    } else {
        currentImgIndex = (currentImgIndex - 1 + mockImages.length) % mockImages.length;
    }
    updateLightboxContent();
}

function toggleSlideshow() {
    if (currentImgIndex === -1) return;
    isSlideshowActive = !isSlideshowActive;
    if (isSlideshowActive) {
        slideshowBadge.textContent = "Slideshow: Bật";
        slideshowIntervalId = setInterval(() => navigateImage('next'), 2000);
    } else {
        stopSlideshow();
    }
}

function stopSlideshow() {
    isSlideshowActive = false;
    slideshowBadge.textContent = "Slideshow: Tắt";
    if (slideshowIntervalId) {
        clearInterval(slideshowIntervalId);
        slideshowIntervalId = null;
    }
}

// --- 5. Quản lý Command Palette ---
function openCommandPalette() {
    commandPalette.setAttribute('aria-hidden', 'false');
    paletteSearch.value = "";
    activeCommandIndex = 0;
    renderCommands(commands);
    paletteSearch.focus();
}

function closeCommandPalette() {
    commandPalette.setAttribute('aria-hidden', 'true');
}

function closeAllOverlays() {
    closeLightbox();
    closeCommandPalette();
}

function renderCommands(cmdArray) {
    filteredCommands = cmdArray;
    commandList.textContent = "";

    if (cmdArray.length === 0) {
        const li = document.createElement('li');
        li.className = 'command-item';
        li.textContent = "Không tìm thấy lệnh hợp lệ...";
        commandList.appendChild(li);
        return;
    }

    cmdArray.forEach((cmd, idx) => {
        const li = document.createElement('li');
        li.className = 'command-item';
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', idx === activeCommandIndex ? 'true' : 'false');
        
        const textSpan = document.createElement('span');
        textSpan.textContent = cmd.text;

        const shortcutSpan = document.createElement('span');
        shortcutSpan.className = 'command-shortcut';
        shortcutSpan.textContent = cmd.shortcut;

        li.append(textSpan, shortcutSpan);
        
        li.addEventListener('click', () => {
            cmd.action();
            closeCommandPalette();
        });

        commandList.appendChild(li);
    });
    
    // Đảm bảo phần tử được chọn luôn cuộn vào vùng nhìn thấy
    const activeEl = commandList.children[activeCommandIndex];
    if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
}

// --- 6. Xử lý Keyboard Shortcuts toàn hệ thống ---
document.addEventListener('keydown', (e) => {
    const isPaletteOpen = commandPalette.getAttribute('aria-hidden') === 'false';
    const isLightboxOpen = lightboxModal.getAttribute('aria-hidden') === 'false';

    // 1. Phím tắt mở Command Palette: Ctrl + K (hoặc Cmd + K trên Mac)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCommandPalette();
        return;
    }

    // 2. Phím chung để đóng tất cả: Escape
    if (e.key === 'Escape') {
        closeAllOverlays();
        return;
    }

    // 3. Xử lý điều hướng bên trong Command Palette đang bật
    if (isPaletteOpen) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeCommandIndex = (activeCommandIndex + 1) % filteredCommands.length;
            renderCommands(filteredCommands);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeCommandIndex = (activeCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
            renderCommands(filteredCommands);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[activeCommandIndex]) {
                filteredCommands[activeCommandIndex].action();
                closeCommandPalette();
            }
        }
        return; // Ngắt xử lý các phím tắt khác khi palette đang mở
    }

    // 4. Xử lý phím tắt khi xem ảnh lớn (Lightbox)
    if (isLightboxOpen) {
        if (e.key === 'ArrowRight') {
            navigateImage('next');
        } else if (e.key === 'ArrowLeft') {
            navigateImage('prev');
        } else if (e.key === ' ') { // Phím Space
            e.preventDefault(); // Chặn hành vi cuộn trang mặc định của Space
            toggleSlideshow();
        }
    }

    // 5. Phím tắt số nhanh (1-9) để mở trực tiếp ảnh ứng dụng
    if (!isPaletteOpen && e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (index < mockImages.length) {
            openLightbox(index);
        }
    }
});

// Xử lý tìm kiếm Filter của Command Palette Realtime
paletteSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const matched = commands.filter(cmd => cmd.text.toLowerCase().includes(query));
    activeCommandIndex = 0;
    renderCommands(matched);
});

// Gắn sự kiện click thủ công cho các nút điều hướng trên giao diện Lightbox
document.getElementById('prevBtn').addEventListener('click', () => navigateImage('prev'));
document.getElementById('nextBtn').addEventListener('click', () => navigateImage('next'));
document.getElementById('closeModalBtn').addEventListener('click', closeLightbox);

// Khởi chạy ứng dụng
initGallery();
