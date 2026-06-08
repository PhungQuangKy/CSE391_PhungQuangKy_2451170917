// Cấu hình phân trang sử dụng API ảnh miễn phí Lorem Picsum
let currentPage = 1;
const limitPerPage = 20;
let isFetching = false;

const galleryGrid = document.getElementById('gallery-grid');
const loadTrigger = document.getElementById('load-trigger');
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

// ========================================================
// 1. HÀM FETCH VÀ PHÂN TÍCH DỮ LIỆU API (ASYNCHRONOUS)
// ========================================================
async function loadMorePhotos() {
    if (isFetching) return; // Ngăn chặn việc gọi lặp lại khi request trước chưa xong
    isFetching = true;
    
    try {
        // Gọi API phân trang lấy danh sách 20 ảnh tiếp theo
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limitPerPage}`);
        
        if (!response.ok) throw new Error("Lỗi khi kết nối dịch vụ API ảnh");
        
        const photoList = await response.json();
        
        if (photoList.length === 0) {
            loadTrigger.innerHTML = "<p>🎉 Đã tải hết toàn bộ bộ sưu tập hình ảnh!</p>";
            photoObserver.unobserve(loadTrigger); // Tắt bộ theo dõi nếu hết ảnh
            return;
        }

        renderGalleryItems(photoList);
        currentPage++; // Tăng số trang lên chuẩn bị cho lần cuộn tiếp theo
        
    } catch (error) {
        console.error("Gặp sự cố:", error);
        alert("Không thể tải thêm hình ảnh do mất kết nối mạng.");
    } finally {
        isFetching = false;
    }
}

// ========================================================
// 2. XỬ LÝ RENDER DOM, LAZY LOADING VÀ LIGHTBOX (UI LAYER)
// ========================================================
function renderGalleryItems(photos) {
    photos.forEach(photo => {
        // Tạo cấu trúc thẻ bọc ảnh để làm placeholder
        const itemCard = document.createElement('div');
        itemCard.classList.add('gallery-item');
        
        // Tạo thẻ img ứng dụng kỹ thuật Lazy Loading
        // Đường dẫn ảnh gốc được giấu tạm vào thuộc tính 'data-src'
        const imgElement = document.createElement('img');
        imgElement.setAttribute('data-src', photo.download_url);
        imgElement.alt = `Photo by ${photo.author}`;
        
        // Đăng ký sự kiện Click vào Card -> Mở hộp thoại phóng to ảnh (Lightbox)
        itemCard.addEventListener('click', () => {
            lightboxImg.src = photo.download_url;
            lightboxModal.classList.remove('hidden');
        });

        itemCard.appendChild(imgElement);
        galleryGrid.appendChild(itemCard);

        // Đăng ký đưa thẻ ảnh vào bộ giám sát Lazy Load
        lazyImageObserver.observe(imgElement);
    });
}

// Thiết lập IntersectionObserver cho việc tự động kích hoạt Lazy Load ảnh khi xuất hiện trong viewport
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Di chuyển link ảnh từ 'data-src' sang thuộc tính 'src' chính thức để kích hoạt tải ảnh
            img.src = img.getAttribute('data-src');
            
            img.onload = () => {
                img.classList.add('loaded'); // Kích hoạt hiệu ứng mượt Fade-in qua CSS
            };
            
            observer.unobserve(img); // Giải phóng tài nguyên ngừng giám sát ảnh này
        }
    });
}, {
    rootMargin: "0px 0px 200px 0px" // Tải trước ảnh khi người dùng cuộn cách nó 200px để mượt trải nghiệm
});

// Thiết lập IntersectionObserver cho cơ chế Infinite Scroll (Cuộn vô hạn)
const photoObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, {
    rootMargin: "100px" // Tự động load trước khi người dùng chạm đáy hẳn 100px
});

// Bắt đầu theo dõi phần tử trigger ở đáy trang để kích hoạt cuộn vô hạn
photoObserver.observe(loadTrigger);

// Đăng ký các sự kiện tắt đóng cửa sổ phóng to ảnh Lightbox
closeLightbox.addEventListener('click', () => lightboxModal.classList.add('hidden'));
lightboxModal.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightboxModal.classList.add('hidden');
    }
});
