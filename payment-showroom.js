/* ===================================
   CarShop Payment Showroom JavaScript
   =================================== */

// Get URL parameters
function getURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        carId: parseInt(urlParams.get('carId')) || 1,
        depositPercent: parseInt(urlParams.get('depositPercent')) || 10,
        direct: urlParams.get('direct') === 'true'
    };
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
}

// Generate deposit code
function generateDepositCode() {
    const date = new Date();
    const dateStr = date.getFullYear() + 
                   (date.getMonth() + 1).toString().padStart(2, '0') + 
                   date.getDate().toString().padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CS-DC-${dateStr}-${randomNum}`;
}

// Format date time
function formatDateTime(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Demo car data
const demoCarData = {
    1: { name: 'Toyota Camry 2.5Q', brand: 'Toyota', price: 1235000000 },
    2: { name: 'Honda Civic RS', brand: 'Honda', price: 789000000 },
    3: { name: 'Mazda CX-5 Premium', brand: 'Mazda', price: 979000000 }
};

let paymentData = {};
let countdownInterval = null;
let deadlineTime = null;

// Calculate deadline (24 hours from now or end of next business day)
function calculateDeadline() {
    const now = new Date();
    
    // Option 1: 24 hours from now (simple approach)
    const deadline = new Date(now.getTime() + (24 * 60 * 60 * 1000));
    
    // Option 2: End of next business day (more realistic)
    // const deadline = new Date(now);
    // deadline.setDate(deadline.getDate() + 1);
    // deadline.setHours(17, 0, 0, 0); // 5:00 PM next day
    
    return deadline;
}

// Load payment info
function loadPaymentInfo() {
    const params = getURLParams();
    const carData = demoCarData[params.carId] || demoCarData[1];
    const depositAmount = Math.round(carData.price * (params.depositPercent / 100));
    const depositCode = generateDepositCode();
    
    // Calculate deadline
    deadlineTime = calculateDeadline();
    
    // Store payment data
    paymentData = {
        carId: params.carId,
        carName: carData.name,
        carPrice: carData.price,
        depositAmount: depositAmount,
        depositPercent: params.depositPercent,
        depositCode: depositCode,
        deadline: deadlineTime
    };
    
    // Update UI
    document.getElementById('carName').textContent = carData.name;
    document.getElementById('carPrice').textContent = formatPrice(carData.price);
    document.getElementById('depositAmount').textContent = formatPrice(depositAmount);
    document.getElementById('depositCode').textContent = depositCode;
    document.getElementById('deadlineDate').textContent = formatDateTime(deadlineTime);
    
    // Log info
    console.log('%c🏢 TRANG THANH TOÁN TẠI SHOWROOM', 'color: #F59E0B; font-size: 18px; font-weight: bold;');
    console.log('═════════════════════════════════════');
    console.log('🚗 Thông tin xe:');
    console.log(`   • ID: ${params.carId}`);
    console.log(`   • Tên xe: ${carData.name}`);
    console.log(`   • Giá xe: ${formatPrice(carData.price)}`);
    console.log('─────────────────────────────────────');
    console.log('💰 Thông tin đặt cọc:');
    console.log(`   • Mức đặt cọc: ${params.depositPercent}%`);
    console.log(`   • Số tiền: ${formatPrice(depositAmount)}`);
    console.log(`   • Mã đặt cọc: ${depositCode}`);
    console.log(`   • Loại: ${params.direct ? 'Đặt cọc trực tiếp (chưa xem xe)' : 'Đặt cọc sau khi xem xe'}`);
    console.log('─────────────────────────────────────');
    console.log('⏰ Thời hạn thanh toán:');
    console.log(`   • Hạn chót: ${formatDateTime(deadlineTime)}`);
    console.log('═════════════════════════════════════');
    
    // Start countdown
    startCountdown();
}

// Start countdown timer
function startCountdown() {
    // Update immediately
    updateCountdown();
    
    // Update every second
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Update countdown display
function updateCountdown() {
    const now = new Date();
    const timeLeft = deadlineTime - now;
    
    // Check if expired
    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        showExpiredState();
        return;
    }
    
    // Calculate hours, minutes, seconds
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update display
    document.getElementById('hoursDisplay').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutesDisplay').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('secondsDisplay').textContent = seconds.toString().padStart(2, '0');
    
    // Change color if less than 1 hour left
    const countdownBoxes = document.querySelectorAll('.countdown-box');
    if (hours === 0 && minutes < 60) {
        countdownBoxes.forEach(box => {
            box.style.background = 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)';
        });
    }
}

// Show expired state
function showExpiredState() {
    console.log('%c⏰ HẾT HẠN THANH TOÁN', 'color: #DC2626; font-size: 16px; font-weight: bold;');
    console.log('Đơn đặt cọc đã hết hạn và bị hủy tự động');
    
    // Update status badge
    const statusBadge = document.getElementById('statusBadge');
    statusBadge.innerHTML = '<span class="w-2 h-2 bg-gray-500 rounded-full inline-block"></span> Đã hết hạn';
    statusBadge.className = 'px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-300';
    
    // Update countdown display to show 00:00:00
    document.getElementById('hoursDisplay').textContent = '00';
    document.getElementById('minutesDisplay').textContent = '00';
    document.getElementById('secondsDisplay').textContent = '00';
    
    // Change countdown boxes to gray
    const countdownBoxes = document.querySelectorAll('.countdown-box');
    countdownBoxes.forEach(box => {
        box.style.background = 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
    });
    
    // Show expired message
    const warningBox = document.querySelector('.bg-red-50');
    if (warningBox) {
        warningBox.innerHTML = `
            <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div class="flex-1">
                    <h3 class="font-bold text-gray-900 mb-2">Đơn đặt cọc đã hết hạn</h3>
                    <p class="text-sm text-gray-700 leading-relaxed mb-2">
                        Thời gian giữ xe đã kết thúc. Đơn đặt cọc của bạn đã bị hủy tự động.
                    </p>
                    <p class="text-sm text-gray-700 leading-relaxed">
                        Vui lòng đặt cọc lại nếu bạn vẫn muốn mua xe này.
                    </p>
                </div>
            </div>
        `;
        warningBox.className = 'bg-gray-50 border border-gray-200 rounded-lg p-5';
    }
    
    // Disable map button
    const mapButton = document.querySelector('button[onclick="openMaps()"]');
    if (mapButton) {
        mapButton.disabled = true;
        mapButton.className = 'w-full bg-gray-300 text-gray-500 py-4 rounded-lg font-bold text-lg cursor-not-allowed';
        mapButton.textContent = 'ĐƠN ĐÃ HẾT HẠN';
    }
}

// Open Google Maps
function openMaps() {
    const address = 'CarShop Showroom Quận 1, 123 Đường ABC, Quận 1, TP.HCM';
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    console.log('🗺️  Mở Google Maps...');
    console.log(`📍 Địa chỉ: ${address}`);
    
    window.open(mapsUrl, '_blank');
}

// Go to home page
function goToHome() {
    window.location.href = 'home.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🏢 CarShop - Thanh toán tại showroom', 'color: #CB3634; font-size: 16px; font-weight: bold;');
    
    loadPaymentInfo();
});

// Clean up interval on page unload
window.addEventListener('beforeunload', function() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
});
