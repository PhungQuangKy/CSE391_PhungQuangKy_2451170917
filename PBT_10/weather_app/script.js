// Khai báo các phần tử DOM cần tương tác
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const historyList = document.getElementById('history-list');

const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const successState = document.getElementById('success-state');

const weatherCity = document.getElementById('weather-city');
const weatherIcon = document.getElementById('weather-icon');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherHumidity = document.getElementById('weather-humidity');

// Quản lý trạng thái giao diện UI (Loading / Success / Error)
function switchState(state) {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    successState.classList.add('hidden');

    if (state === 'LOADING') loadingState.classList.remove('hidden');
    if (state === 'ERROR') errorState.classList.remove('hidden');
    if (state === 'SUCCESS') successState.classList.remove('hidden');
}

// Gọi API lấy dữ liệu (Sử dụng dịch vụ bất đồng bộ wttr.in định dạng JSON)
async function fetchWeather(cityName) {
    if (!cityName.trim()) return;
    
    switchState('LOADING');
    
    try {
        // Gọi API fetch giải quyết bất đồng bộ theo định dạng JSON (?format=j1)
        const response = await fetch(`https://wttr.in/${encodeURIComponent(cityName)}?format=j1`);
        
        if (!response.ok) {
            throw new Error("Không lấy được dữ liệu thời tiết");
        }
        
        const data = await response.json();
        
        // Render dữ liệu lên UI sau khi parse JSON thành công
        renderWeather(cityName, data);
        // Lưu và làm mới danh sách lịch sử tìm kiếm
        saveHistory(cityName);
        
    } catch (error) {
        console.error("Lỗi Fetch API:", error);
        switchState('ERROR');
    }
}

// Đổ dữ liệu từ Object JSON thu được vào giao diện HTML
function renderWeather(cityName, data) {
    switchState('SUCCESS');
    
    const currentCondition = data.current_condition[0];
    const tempC = currentCondition.temp_C;
    const humidity = currentCondition.humidity;
    const weatherDescText = currentCondition.lang_vi ? currentCondition.lang_vi[0].value : currentCondition.weatherDesc[0].value;
    
    // Cập nhật DOM
    weatherCity.textContent = cityName.toUpperCase();
    weatherTemp.textContent = `${tempC}°C`;
    weatherDesc.textContent = weatherDescText;
    weatherHumidity.textContent = `${humidity}%`;
    
    // Lấy icon thời tiết mặc định từ API cung cấp
    weatherIcon.src = currentCondition.weatherIconUrl[0].value;
}

// Xử lý lưu lịch sử tìm kiếm vào LocalStorage (Tối đa 5 thành phố gần nhất)
function saveHistory(cityName) {
    let history = JSON.parse(localStorage.getItem('weather_history')) || [];
    
    // Loại bỏ tên trùng lặp cũ để đẩy tên mới lên đầu danh sách
    history = history.filter(item => item.toLowerCase() !== cityName.toLowerCase());
    history.unshift(cityName);
    
    // Giới hạn cứng tối đa 5 phần tử
    if (history.length > 5) {
        history.pop();
    }
    
    localStorage.setItem('weather_history', JSON.stringify(history));
    renderHistory();
}

// Hiển thị danh sách lịch sử ra màn hình dưới dạng các thẻ tag nhỏ
function renderHistory() {
    const history = JSON.parse(localStorage.getItem('weather_history')) || [];
    historyList.innerHTML = '';
    
    history.forEach(city => {
        const item = document.createElement('span');
        item.classList.add('history-item');
        item.textContent = city;
        
        // Sự kiện Click vào item lịch sử -> kích hoạt tìm kiếm lại
        item.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        
        historyList.appendChild(item);
    });
}

// Đăng ký sự kiện Click nút Tìm kiếm
searchBtn.addEventListener('click', () => {
    fetchWeather(cityInput.value);
});

// Thêm sự kiện nhấn phím Enter trên ô Input
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather(cityInput.value);
    }
});

// Tự động load lại lịch sử khi người dùng vừa F5 tải lại trang
renderHistory();
