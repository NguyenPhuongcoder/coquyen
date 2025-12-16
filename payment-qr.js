/* ===================================
   CarShop Payment QR JavaScript
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

// Demo car data (should match car-detail.js)
const demoCarData = {
    1: { name: 'Toyota Camry 2.5Q', brand: 'Toyota', price: 1235000000 },
    2: { name: 'Honda Civic RS', brand: 'Honda', price: 789000000 },
    3: { name: 'Mazda CX-5 Premium', brand: 'Mazda', price: 979000000 }
};

// Load payment info
function loadPaymentInfo() {
    const params = getURLParams();
    const carData = demoCarData[params.carId] || demoCarData[1];
    const depositAmount = Math.round(carData.price * (params.depositPercent / 100));
    const depositCode = generateDepositCode();
    
    // Update UI
    document.getElementById('carName').textContent = carData.name;
    document.getElementById('carPrice').textContent = formatPrice(carData.price);
    document.getElementById('depositAmount').textContent = formatPrice(depositAmount);
    document.getElementById('depositCode').textContent = depositCode;
    
    // Log info
    console.log('%c💳 TRANG CHUYỂN KHOẢN ĐẶT CỌC', 'color: #3B82F6; font-size: 18px; font-weight: bold;');
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
    console.log('═════════════════════════════════════');
    
    // Simulate auto-confirmation after 10 seconds (for demo)
    simulatePaymentConfirmation();
}

// Simulate payment confirmation (Demo only)
function simulatePaymentConfirmation() {
    console.log('⏳ Đang chờ xác nhận chuyển khoản...');
    console.log('📌 Demo: Hệ thống sẽ tự động xác nhận sau 10 giây');
    
    setTimeout(() => {
        confirmPaymentSuccess();
    }, 10000); // 10 seconds for demo
}

// Confirm payment success
function confirmPaymentSuccess() {
    console.log('%c✅ CHUYỂN KHOẢN THÀNH CÔNG!', 'color: #10B981; font-size: 16px; font-weight: bold;');
    console.log('Hệ thống đã tự động xác nhận giao dịch');
    
    // Hide QR card
    document.getElementById('qrCard').style.display = 'none';
    
    // Update status card to success
    const statusCard = document.getElementById('statusCard');
    statusCard.style.display = 'none';
    
    // Show success card
    const successCard = document.getElementById('successCard');
    successCard.style.display = 'block';
    
    // Scroll to success card
    successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c💳 CarShop - Chuyển khoản đặt cọc', 'color: #CB3634; font-size: 16px; font-weight: bold;');
    
    loadPaymentInfo();
});
