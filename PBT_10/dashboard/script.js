// Các Elements UI toàn cục
const refreshBtn = document.getElementById('refresh-btn');
const fetchTimeSpan = document.getElementById('fetch-time');
const globalLoading = document.getElementById('global-loading');

// Danh sách các API endpoints xử lý dữ liệu thô
const apis = [
    "https://jsonplaceholder.typicode.com/users/1",
    "https://dog.ceo/api/breeds/image/random",
    "https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current_weather=true"
];

// Hàm đặt widget về trạng thái loading ban đầu
function setWidgetLoading(index) {
    const contentDiv = document.querySelector(`#widget-${index} .card-content`);
    contentDiv.innerHTML = `<p class="loading-text">Đang tải dữ liệu...</p>`;
}

// Hàm render dữ liệu thành công cho từng widget cụ thể
function renderWidget(index, data) {
    const contentDiv = document.querySelector(`#widget-${index} .card-content`);
    
    if (index === 0) {
        // Render JSONPlaceholder User
        contentDiv.innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company?.name || 'N/A'}</p>
        `;
    } else if (index === 1) {
        // Render Dog API
        contentDiv.innerHTML = `<img src="${data.message}" class="dog-img" alt="Dog">`;
    } else if (index === 2) {
        // Render Open-Meteo Weather
        const weather = data.current_weather;
        contentDiv.innerHTML = `
            <p><strong>Nhiệt độ:</strong> ${weather?.temperature}°C</p>
            <p><strong>Tốc độ gió:</strong> ${weather?.windspeed} km/h</p>
        `;
    }
}

// Hàm render thông tin lỗi riêng biệt cho từng widget
function renderWidgetError(index, message) {
    const contentDiv = document.querySelector(`#widget-${index} .card-content`);
    contentDiv.innerHTML = `<p class="error-text">Lỗi tải dữ liệu: ${message || 'Không thể kết nối API'}</p>`;
}

// Hàm xử lý chính (Bắt buộc dùng Promise.allSettled theo yêu cầu đề bài)
async function loadDashboard() {
    const startTime = Date.now();
    
    // 1. Hiển thị loading tổng thể & riêng cho từng widget
    globalLoading.classList.remove('hidden');
    for (let i = 0; i < apis.length; i++) {
        setWidgetLoading(i);
    }

    try {
        // 2. Gọi song song cả 3 APIs 
        const results = await Promise.allSettled([
            fetch(apis[0]).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }),
            fetch(apis[1]).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }),
            fetch(apis[2]).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        ]);

        // 3. Duyệt qua kết quả trả về của từng API
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                renderWidget(index, result.value);
            } else {
                // Sử dụng lý do lỗi (reason.message) truyền vào UI
                renderWidgetError(index, result.reason.message);
            }
        });
    } catch (generalError) {
        console.error("Lỗi xử lý hệ thống:", generalError);
    } finally {
        // 4. Ẩn loading tổng thể và tính thời gian tải
        globalLoading.classList.add('hidden');
        const duration = Date.now() - startTime;
        fetchTimeSpan.textContent = `Data loaded in ${duration} ms`;
    }
}

// Lắng nghe sự kiện click vào nút "Refresh All" để nạp lại dữ liệu
refreshBtn.addEventListener('click', loadDashboard);

// Tự động chạy lần đầu tiên khi trang web được tải xong
window.addEventListener('DOMContentLoaded', loadDashboard);
