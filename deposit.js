/* ===================================
   CarShop Deposit JavaScript
   =================================== */

// DEMO DATA - Copy từ booking-detail.js
const bookings = [
    {
        id: 1,
        carId: 1,
        carName: "Toyota Camry 2.5Q",
        carBrand: "Toyota",
        carPrice: 1235000000,
        carImage: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
        date: "2024-12-20",
        time: "09:00",
        showroom: "CarShop Showroom Quận 1",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        status: "viewed"
    },
    {
        id: 2,
        carId: 2,
        carName: "Honda Civic RS",
        carBrand: "Honda",
        carPrice: 789000000,
        carImage: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800",
        date: "2024-12-22",
        time: "14:00",
        showroom: "CarShop Showroom Quận 7",
        address: "456 Đường XYZ, Quận 7, TP.HCM",
        status: "pending"
    },
    {
        id: 3,
        carId: 3,
        carName: "Mazda CX-5 Premium",
        carBrand: "Mazda",
        carPrice: 979000000,
        carImage: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800",
        date: "2024-12-18",
        time: "10:00",
        showroom: "CarShop Showroom Bình Thạnh",
        address: "789 Đường DEF, Bình Thạnh, TP.HCM",
        status: "undecided"
    },
    {
        id: 4,
        carId: 6,
        carName: "Mercedes-Benz C200",
        carBrand: "Mercedes",
        carPrice: 1699000000,
        carImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
        date: "2024-12-15",
        time: "15:00",
        showroom: "CarShop Showroom Quận 1",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        status: "cancelled"
    },
    {
        id: 5,
        carId: 5,
        carName: "Ford Ranger Raptor",
        carBrand: "Ford",
        carPrice: 1198000000,
        carImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
        date: "2024-12-25",
        time: "16:00",
        showroom: "CarShop Showroom Thủ Đức",
        address: "321 Đường GHI, Thủ Đức, TP.HCM",
        status: "pending"
    }
];

let currentBooking = null;
const DEPOSIT_RATE = 0.1; // 10%

// Get booking ID from URL
function getBookingIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('bookingId')) || 1;
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const dayOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][date.getDay()];
    return `${dayOfWeek}, ${day}/${month}/${year}`;
}

// Check access permission
function checkAccessPermission() {
    const bookingId = getBookingIdFromURL();
    currentBooking = bookings.find(b => b.id === bookingId);
    
    // Kiểm tra booking có tồn tại không
    if (!currentBooking) {
        console.error('❌ Không tìm thấy booking!');
        alert('Không tìm thấy thông tin lịch xem xe!');
        window.location.href = 'my-bookings.html';
        return false;
    }
    
    // KIỂM TRA NGHIỆP VỤ: Chỉ cho phép đặt cọc khi status = "viewed"
    if (currentBooking.status !== 'viewed') {
        console.error('❌ Không đủ điều kiện đặt cọc!');
        console.error(`Status hiện tại: ${currentBooking.status}`);
        console.error('Yêu cầu: status = "viewed"');
        
        alert(`❌ Không thể đặt cọc!\n\nBạn cần xem xe tại showroom trước khi đặt cọc.\n\nTrạng thái hiện tại: ${getStatusText(currentBooking.status)}`);
        window.location.href = `booking-detail.html?id=${bookingId}`;
        return false;
    }
    
    return true;
}

// Get status text
function getStatusText(status) {
    const texts = {
        pending: 'Chờ xem xe',
        viewed: 'Đã xem xe',
        undecided: 'Chưa quyết định',
        cancelled: 'Đã hủy'
    };
    return texts[status] || status;
}

// Load booking data
function loadBookingData() {
    if (!currentBooking) return;
    
    // Car info
    document.getElementById('carImage').src = currentBooking.carImage;
    document.getElementById('carName').textContent = currentBooking.carName;
    document.getElementById('carBrand').textContent = currentBooking.carBrand;
    document.getElementById('carPrice').textContent = formatPrice(currentBooking.carPrice);
    
    // Booking info
    document.getElementById('bookingDate').textContent = formatDate(currentBooking.date);
    document.getElementById('bookingTime').textContent = currentBooking.time;
    document.getElementById('showroomName').textContent = currentBooking.showroom;
    document.getElementById('showroomAddress').textContent = currentBooking.address;
    
    // Deposit calculation
    const depositAmount = Math.round(currentBooking.carPrice * DEPOSIT_RATE);
    const remainingAmount = currentBooking.carPrice - depositAmount;
    
    document.getElementById('priceDisplay').textContent = formatPrice(currentBooking.carPrice);
    document.getElementById('depositAmount').textContent = formatPrice(depositAmount);
    document.getElementById('remainingAmount').textContent = formatPrice(remainingAmount);
}

// Handle checkbox change
function handleCheckboxChange() {
    const checkbox = document.getElementById('confirmCheckbox');
    const depositBtn = document.getElementById('depositBtn');
    
    depositBtn.disabled = !checkbox.checked;
}

// Handle deposit
function handleDeposit() {
    const checkbox = document.getElementById('confirmCheckbox');
    
    if (!checkbox.checked) {
        alert('Vui lòng xác nhận đồng ý đặt cọc!');
        return;
    }
    
    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const paymentTexts = {
        bank: 'Chuyển khoản ngân hàng',
        vnpay: 'VNPay',
        showroom: 'Thanh toán tại showroom'
    };
    
    const depositAmount = Math.round(currentBooking.carPrice * DEPOSIT_RATE);
    
    console.log('%c💰 ĐẶT CỌC MUA XE', 'color: #10B981; font-size: 18px; font-weight: bold;');
    console.log('═════════════════════════════════════');
    console.log('📋 Thông tin đặt cọc:');
    console.log(`   • Booking ID: ${currentBooking.id}`);
    console.log(`   • Xe: ${currentBooking.carName}`);
    console.log(`   • Giá xe: ${formatPrice(currentBooking.carPrice)}`);
    console.log(`   • Tiền đặt cọc (10%): ${formatPrice(depositAmount)}`);
    console.log(`   • Phương thức: ${paymentTexts[paymentMethod]}`);
    console.log('═════════════════════════════════════');
    
    // Show loading
    showLoading();
    
    // Simulate processing (1.5s)
    setTimeout(() => {
        hideLoading();
        
        // Success alert
        alert(`✅ Đặt cọc mua xe thành công!\n\nXe: ${currentBooking.carName}\nSố tiền đặt cọc: ${formatPrice(depositAmount)}\nPhương thức: ${paymentTexts[paymentMethod]}\n\nChúng tôi sẽ liên hệ với bạn sớm nhất để hoàn tất thủ tục!`);
        
        console.log('%c✅ Đặt cọc thành công!', 'color: #10B981; font-size: 16px; font-weight: bold;');
        console.log('➡️  Chuyển đến trang trạng thái đơn hàng...');
        
        // Redirect to order status page
        window.location.href = `order-status.html?bookingId=${currentBooking.id}`;
    }, 1500);
}

// Show loading overlay
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle radio button visual state
function setupRadioButtons() {
    const radios = document.querySelectorAll('input[name="payment"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Reset all
            document.querySelectorAll('.payment-method').forEach(method => {
                const circle = method.querySelector('div[style*="border-radius: 50%"]');
                const dot = method.querySelector('.radio-dot');
                if (circle) circle.style.borderColor = '#D0D0D0';
                if (dot) dot.style.display = 'none';
            });
            
            // Set checked
            if (this.checked) {
                const parent = this.closest('.payment-method');
                const circle = parent.querySelector('div[style*="border-radius: 50%"]');
                const dot = parent.querySelector('.radio-dot');
                if (circle) circle.style.borderColor = '#CB3634';
                if (dot) dot.style.display = 'block';
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🚗 CarShop - Đặt cọc mua xe', 'color: #CB3634; font-size: 18px; font-weight: bold;');
    console.log('═════════════════════════════════════');
    
    // Check access permission
    if (!checkAccessPermission()) {
        return;
    }
    
    console.log('✅ Kiểm tra quyền truy cập: Hợp lệ');
    console.log(`📋 Booking ID: ${currentBooking.id}`);
    console.log(`🚗 Xe: ${currentBooking.carName}`);
    console.log(`📊 Trạng thái: ${currentBooking.status}`);
    console.log('═════════════════════════════════════');
    
    // Load booking data
    loadBookingData();
    
    // Setup checkbox listener
    const checkbox = document.getElementById('confirmCheckbox');
    checkbox.addEventListener('change', handleCheckboxChange);
    
    // Setup radio buttons
    setupRadioButtons();
    
    console.log('💡 Trang đã sẵn sàng!');
    console.log('📌 Vui lòng chọn phương thức thanh toán và xác nhận đồng ý.');
});
