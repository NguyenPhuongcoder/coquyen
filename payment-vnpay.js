/* ===================================
   CarShop Payment VNPay JavaScript
   =================================== */

// Get URL parameters
function getURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        carId: parseInt(urlParams.get('carId')) || 1,
        depositPercent: parseInt(urlParams.get('depositPercent')) || 10,
        direct: urlParams.get('direct') === 'true',
        status: urlParams.get('status') // success, fail, cancel
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

// Generate transaction ID
function generateTransactionId() {
    return 'VNP' + Date.now() + Math.floor(Math.random() * 1000);
}

// Format date time
function formatDateTime() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Demo car data
const demoCarData = {
    1: { name: 'Toyota Camry 2.5Q', brand: 'Toyota', price: 1235000000 },
    2: { name: 'Honda Civic RS', brand: 'Honda', price: 789000000 },
    3: { name: 'Mazda CX-5 Premium', brand: 'Mazda', price: 979000000 }
};

let paymentData = {};

// Load payment info
function loadPaymentInfo() {
    const params = getURLParams();
    const carData = demoCarData[params.carId] || demoCarData[1];
    const depositAmount = Math.round(carData.price * (params.depositPercent / 100));
    const depositCode = generateDepositCode();
    
    // Store payment data
    paymentData = {
        carId: params.carId,
        carName: carData.name,
        carPrice: carData.price,
        depositAmount: depositAmount,
        depositPercent: params.depositPercent,
        depositCode: depositCode
    };
    
    // Update UI
    document.getElementById('carName').textContent = carData.name;
    document.getElementById('carPrice').textContent = formatPrice(carData.price);
    document.getElementById('depositAmount').textContent = formatPrice(depositAmount);
    document.getElementById('depositCode').textContent = depositCode;
    
    // Log info
    console.log('%c💳 TRANG THANH TOÁN VNPAY', 'color: #0066CC; font-size: 18px; font-weight: bold;');
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
    
    // Check if returning from VNPay
    if (params.status) {
        handlePaymentReturn(params.status);
    }
}

// Proceed to VNPay
function proceedToVNPay() {
    console.log('%c🔄 CHUYỂN ĐẾN CỔNG VNPAY', 'color: #0066CC; font-size: 16px; font-weight: bold;');
    
    // Hide pre-payment screen
    document.getElementById('prePaymentScreen').style.display = 'none';
    
    // Show loading screen
    document.getElementById('loadingScreen').style.display = 'block';
    
    // Simulate redirect to VNPay (in real app, this would be actual VNPay URL)
    setTimeout(() => {
        console.log('📌 Demo: Mô phỏng thanh toán VNPay...');
        console.log('📌 Trong thực tế, người dùng sẽ được chuyển đến cổng VNPay');
        
        // Simulate VNPay processing and return
        // In real app: window.location.href = vnpayUrl;
        // VNPay will redirect back with status parameter
        
        // For demo: randomly success or fail after 3 seconds
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2; // 80% success rate for demo
            const status = isSuccess ? 'success' : 'fail';
            
            // Simulate return from VNPay
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('status', status);
            window.location.href = currentUrl.toString();
        }, 3000);
    }, 2000);
}

// Handle payment return from VNPay
function handlePaymentReturn(status) {
    // Hide all screens
    document.getElementById('prePaymentScreen').style.display = 'none';
    document.getElementById('loadingScreen').style.display = 'none';
    
    if (status === 'success') {
        showSuccessScreen();
    } else {
        showFailureScreen();
    }
}

// Show success screen
function showSuccessScreen() {
    console.log('%c✅ THANH TOÁN THÀNH CÔNG!', 'color: #10B981; font-size: 16px; font-weight: bold;');
    console.log('VNPay đã xác nhận giao dịch');
    
    const transactionId = generateTransactionId();
    const transactionTime = formatDateTime();
    
    // Update success screen
    document.getElementById('successAmount').textContent = formatPrice(paymentData.depositAmount);
    document.getElementById('transactionId').textContent = transactionId;
    document.getElementById('transactionTime').textContent = transactionTime;
    
    // Show success screen
    document.getElementById('successScreen').style.display = 'block';
    
    console.log('─────────────────────────────────────');
    console.log('💳 Thông tin giao dịch:');
    console.log(`   • Mã GD VNPay: ${transactionId}`);
    console.log(`   • Thời gian: ${transactionTime}`);
    console.log(`   • Số tiền: ${formatPrice(paymentData.depositAmount)}`);
    console.log('═════════════════════════════════════');
}

// Show failure screen
function showFailureScreen() {
    console.log('%c❌ THANH TOÁN THẤT BẠI', 'color: #EF4444; font-size: 16px; font-weight: bold;');
    console.log('Giao dịch VNPay chưa thành công hoặc đã bị hủy');
    
    // Show failure screen
    document.getElementById('failureScreen').style.display = 'block';
}

// Retry payment
function retryPayment() {
    console.log('🔄 Thử lại thanh toán...');
    
    // Remove status parameter and reload
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('status');
    window.location.href = currentUrl.toString();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c💳 CarShop - Thanh toán VNPay', 'color: #CB3634; font-size: 16px; font-weight: bold;');
    
    loadPaymentInfo();
});
