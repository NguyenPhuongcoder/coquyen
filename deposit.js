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

// Demo saved addresses from user profile
const savedAddresses = [
    {
        id: 1,
        label: 'Nhà riêng',
        address: '123 Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP. Hồ Chí Minh',
        isDefault: true
    },
    {
        id: 2,
        label: 'Văn phòng',
        address: '456 Lê Văn Việt, Phường Tăng Nhơn Phú A, Quận 9, TP. Hồ Chí Minh',
        isDefault: false
    },
    {
        id: 3,
        label: 'Nhà bố mẹ',
        address: '789 Võ Văn Ngân, Phường Linh Chiểu, Thủ Đức, TP. Hồ Chí Minh',
        isDefault: false
    }
];

let selectedAddressId = null; // Track selected saved address

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
        alert('❌ Vui lòng xác nhận đồng ý đặt cọc!');
        return;
    }
    
    // Validate pickup date
    const pickupDate = document.getElementById('pickupDate').value;
    if (!pickupDate) {
        alert('❌ Vui lòng chọn ngày dự kiến lấy xe!');
        document.getElementById('pickupDate').focus();
        return;
    }
    
    // Validate pickup date is in the future
    const selectedDate = new Date(pickupDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('❌ Ngày lấy xe phải là ngày trong tương lai!');
        document.getElementById('pickupDate').focus();
        return;
    }
    
    // Get pickup schedule data
    const timeSlot = document.querySelector('input[name="timeSlot"]:checked').value;
    const pickupLocation = document.querySelector('input[name="pickupLocation"]:checked').value;
    const pickupNotes = document.getElementById('pickupNotes').value.trim();
    
    // Validate delivery address if delivery option is selected
    let deliveryAddress = '';
    let deliveryAddressLabel = '';
    if (pickupLocation === 'delivery') {
        // Check if a saved address is selected
        if (selectedAddressId) {
            const selectedAddr = savedAddresses.find(a => a.id === selectedAddressId);
            if (selectedAddr) {
                deliveryAddress = selectedAddr.address;
                deliveryAddressLabel = selectedAddr.label;
            }
        } else {
            // Check if new address is entered
            deliveryAddress = document.getElementById('deliveryAddress').value.trim();
            deliveryAddressLabel = 'Địa chỉ mới';
        }
        
        // Validate address exists
        if (!deliveryAddress) {
            alert('❌ Vui lòng chọn địa chỉ giao xe hoặc nhập địa chỉ mới!');
            return;
        }
        
        // Validate new address length if it's a new address
        if (!selectedAddressId && deliveryAddress.length < 20) {
            alert('❌ Vui lòng nhập địa chỉ đầy đủ (tối thiểu 20 ký tự)!');
            document.getElementById('deliveryAddress').focus();
            return;
        }
    }
    
    const timeSlotTexts = {
        morning: 'Buổi sáng (08:00 – 11:30)',
        afternoon: 'Buổi chiều (13:30 – 17:00)'
    };
    
    const locationTexts = {
        showroom: 'Nhận xe tại showroom CarShop Quận 1',
        delivery: 'Giao xe tận nơi'
    };
    
    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const paymentTexts = {
        bank: 'Chuyển khoản ngân hàng',
        vnpay: 'VNPay',
        showroom: 'Thanh toán tại showroom'
    };
    
    const depositAmount = Math.round(currentBooking.carPrice * DEPOSIT_RATE);
    
    console.log('%c💰 ĐẶT CỌC MUA XE & ĐẶT LỊCH LẤY XE', 'color: #10B981; font-size: 18px; font-weight: bold;');
    console.log('═════════════════════════════════════');
    console.log('📋 Thông tin đặt cọc:');
    console.log(`   • Booking ID: ${currentBooking.id}`);
    console.log(`   • Xe: ${currentBooking.carName}`);
    console.log(`   • Giá xe: ${formatPrice(currentBooking.carPrice)}`);
    console.log(`   • Tiền đặt cọc (10%): ${formatPrice(depositAmount)}`);
    console.log(`   • Phương thức: ${paymentTexts[paymentMethod]}`);
    console.log('─────────────────────────────────────');
    console.log('📅 Thông tin lịch lấy xe:');
    console.log(`   • Ngày dự kiến: ${formatDate(pickupDate)}`);
    console.log(`   • Khung giờ: ${timeSlotTexts[timeSlot]}`);
    console.log(`   • Địa điểm: ${locationTexts[pickupLocation]}`);
    if (pickupLocation === 'delivery' && deliveryAddress) {
        console.log(`   • Địa chỉ giao xe (${deliveryAddressLabel}): ${deliveryAddress}`);
    }
    if (pickupNotes) {
        console.log(`   • Ghi chú: ${pickupNotes}`);
    }
    console.log('═════════════════════════════════════');
    
    // Get payment method BEFORE showing loading
    const selectedPaymentMethod = paymentMethod;
    
    // Get URL params for redirect
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('carId') || currentBooking.carId;
    const depositPercent = urlParams.get('depositPercent') || '10';
    
    // Check payment method and redirect accordingly
    if (selectedPaymentMethod === 'bank') {
        console.log('%c💳 CHUYỂN ĐẾN TRANG THANH TOÁN QR', 'color: #3B82F6; font-size: 16px; font-weight: bold;');
        console.log('➡️  Phương thức: Chuyển khoản ngân hàng');
        console.log(`➡️  URL: payment-qr.html?carId=${carId}&depositPercent=${depositPercent}&direct=true`);
        
        // Show loading briefly then redirect
        showLoading();
        setTimeout(() => {
            window.location.href = `payment-qr.html?carId=${carId}&depositPercent=${depositPercent}&direct=true`;
        }, 800);
        return;
    }
    
    if (selectedPaymentMethod === 'vnpay') {
        console.log('%c💳 CHUYỂN ĐẾN TRANG THANH TOÁN VNPAY', 'color: #0066CC; font-size: 16px; font-weight: bold;');
        console.log('➡️  Phương thức: VNPay');
        console.log(`➡️  URL: payment-vnpay.html?carId=${carId}&depositPercent=${depositPercent}&direct=true`);
        
        // Show loading briefly then redirect
        showLoading();
        setTimeout(() => {
            window.location.href = `payment-vnpay.html?carId=${carId}&depositPercent=${depositPercent}&direct=true`;
        }, 800);
        return;
    }
    
    if (selectedPaymentMethod === 'showroom') {
        console.log('%c🏢 CHUYỂN ĐẾN TRANG THANH TOÁN TẠI SHOWROOM', 'color: #F59E0B; font-size: 16px; font-weight: bold;');
        console.log('➡️  Phương thức: Thanh toán tại showroom');
        console.log(`➡️  URL: payment-showroom.html?carId=${carId}&depositPercent=${depositPercent}&direct=true`);
        
        // Show loading briefly then redirect
        showLoading();
        setTimeout(() => {
            window.location.href = `payment-showroom.html?carId=${carId}&depositPercent=${depositPercent}&direct=true`;
        }, 800);
        return;
    }
    
    // For other payment methods (shouldn't reach here), show loading and success message
    showLoading();
    
    // Simulate processing (1.5s)
    setTimeout(() => {
        hideLoading();
        
        // For other payment methods, show success message
        let successMessage = `✅ Đặt cọc mua xe thành công!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚗 Xe: ${currentBooking.carName}
💰 Số tiền đặt cọc: ${formatPrice(depositAmount)}
💳 Phương thức: ${paymentTexts[paymentMethod]}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 LỊCH LẤY XE DỰ KIẾN:

• Ngày: ${formatDate(pickupDate)}
• Khung giờ: ${timeSlotTexts[timeSlot]}
• Địa điểm: ${locationTexts[pickupLocation]}`;

        if (pickupLocation === 'delivery' && deliveryAddress) {
            successMessage += `
• Địa chỉ giao xe (${deliveryAddressLabel}):
  ${deliveryAddress}`;
        }

        successMessage += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 LƯU Ý:
Showroom sẽ liên hệ xác nhận lịch chính thức sau khi hoàn tất hợp đồng mua bán và các thủ tục liên quan.`;

        if (pickupLocation === 'delivery') {
            successMessage += `

💰 Phí giao xe sẽ được tính thêm và thông báo trước khi giao.`;
        }

        successMessage += `

Cảm ơn quý khách đã tin tưởng CarShop!`;
        
        alert(successMessage);
        
        console.log('%c✅ Đặt cọc & đặt lịch lấy xe thành công!', 'color: #10B981; font-size: 16px; font-weight: bold;');
        console.log('➡️  Chuyển đến trang lịch sử đơn hàng...');
        
        // Redirect to my bookings page
        window.location.href = 'my-bookings.html';
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
    // Payment method radio buttons
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
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
    
    // Time slot radio buttons
    const timeSlotRadios = document.querySelectorAll('input[name="timeSlot"]');
    timeSlotRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Reset all
            document.querySelectorAll('.time-slot-option label').forEach(label => {
                label.style.borderColor = '#D0D0D0';
                label.style.background = '#FFFFFF';
                const circle = label.querySelector('div[style*="border-radius: 50%"]:first-child');
                const dot = label.querySelector('.time-radio-dot');
                if (circle) circle.style.borderColor = '#D0D0D0';
                if (dot) dot.style.display = 'none';
            });
            
            // Set checked
            if (this.checked) {
                const label = this.nextElementSibling;
                label.style.borderColor = '#CB3634';
                label.style.background = '#FFF5F5';
                const circle = label.querySelector('div[style*="border-radius: 50%"]:first-child');
                const dot = label.querySelector('.time-radio-dot');
                if (circle) circle.style.borderColor = '#CB3634';
                if (dot) dot.style.display = 'block';
            }
        });
    });
    
    // Pickup location radio buttons
    const locationRadios = document.querySelectorAll('input[name="pickupLocation"]');
    locationRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Reset all to unchecked state
            document.querySelectorAll('.location-option label').forEach(label => {
                label.style.border = '1px solid #E0E0E0';
                label.style.background = '#FFFFFF';
                label.style.padding = '16px 20px';
                label.style.boxShadow = 'none';
                
                const circle = label.querySelector('div[style*="border-radius: 50%"]:first-child');
                const dot = label.querySelector('.location-radio-dot');
                const icon = label.querySelector('svg');
                const description = label.querySelector('div[style*="padding-left: 28px"]');
                
                if (circle) circle.style.borderColor = '#D0D0D0';
                if (dot) dot.style.display = 'none';
                if (icon) icon.style.color = '#999999';
                if (description) description.style.color = '#999999';
            });
            
            // Set checked state
            if (this.checked) {
                const label = this.nextElementSibling;
                label.style.border = '2px solid #CB3634';
                label.style.background = '#FFF5F5';
                label.style.padding = '18px 20px';
                label.style.boxShadow = '0 2px 4px rgba(203, 54, 52, 0.1)';
                
                const circle = label.querySelector('div[style*="border-radius: 50%"]:first-child');
                const dot = label.querySelector('.location-radio-dot');
                const icon = label.querySelector('svg');
                const description = label.querySelector('div[style*="padding-left: 28px"]');
                
                if (circle) circle.style.borderColor = '#CB3634';
                if (dot) dot.style.display = 'block';
                if (icon) icon.style.color = '#CB3634';
                if (description) description.style.color = '#666666';
                
                // Show/hide delivery address section
                toggleDeliveryAddress(this.value);
            }
        });
    });
}

// Toggle delivery address section
function toggleDeliveryAddress(pickupLocation) {
    const deliverySection = document.getElementById('deliveryAddressSection');
    const deliveryAddressInput = document.getElementById('deliveryAddress');
    const newAddressInput = document.getElementById('newAddressInput');
    const addNewBtn = document.getElementById('addNewAddressBtn');
    
    if (pickupLocation === 'delivery') {
        deliverySection.style.display = 'block';
        
        // Render saved addresses
        renderSavedAddresses();
        
        // Select default address if available
        const defaultAddr = savedAddresses.find(a => a.isDefault);
        if (defaultAddr && !selectedAddressId) {
            selectSavedAddress(defaultAddr.id);
        }
        
        // Reset new address input state
        newAddressInput.style.display = 'none';
        addNewBtn.style.display = 'flex';
        
        console.log('📍 Delivery address section shown');
    } else {
        deliverySection.style.display = 'none';
        deliveryAddressInput.removeAttribute('required');
        deliveryAddressInput.value = '';
        selectedAddressId = null;
        newAddressInput.style.display = 'none';
        addNewBtn.style.display = 'flex';
        console.log('📍 Delivery address section hidden');
    }
}

// Set minimum date for pickup (tomorrow)
function setMinimumPickupDate() {
    const pickupDateInput = document.getElementById('pickupDate');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    pickupDateInput.setAttribute('min', minDate);
    
    console.log(`📅 Minimum pickup date set to: ${minDate}`);
}

// Render saved addresses
function renderSavedAddresses() {
    const container = document.getElementById('savedAddressesList');
    
    if (savedAddresses.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';
    
    savedAddresses.forEach(addr => {
        const isSelected = selectedAddressId === addr.id;
        const borderColor = isSelected ? '#CB3634' : '#E0E0E0';
        const bgColor = isSelected ? '#FFF5F5' : '#FFFFFF';
        const checkDisplay = isSelected ? 'flex' : 'none';
        
        html += `
            <div 
                class="saved-address-card" 
                data-address-id="${addr.id}"
                onclick="selectSavedAddress(${addr.id})"
                style="
                    padding: 16px;
                    border: 2px solid ${borderColor};
                    border-radius: 6px;
                    background: ${bgColor};
                    cursor: pointer;
                    transition: all 0.2s ease;
                    position: relative;
                "
            >
                <div style="display: flex; justify-content: space-between; align-items: start; gap: 12px;">
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span style="font-size: 14px; font-weight: 700; color: #1A1A1A;">${addr.label}</span>
                            ${addr.isDefault ? '<span style="font-size: 11px; font-weight: 700; color: #CB3634; background: #FFF5F5; padding: 2px 8px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.5px;">Mặc định</span>' : ''}
                        </div>
                        <div style="font-size: 13px; color: #666666; line-height: 1.5;">
                            ${addr.address}
                        </div>
                    </div>
                    <div style="
                        width: 24px;
                        height: 24px;
                        border: 2px solid ${isSelected ? '#CB3634' : '#D0D0D0'};
                        border-radius: 50%;
                        display: ${checkDisplay};
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                        background: #FFFFFF;
                    ">
                        <div style="width: 12px; height: 12px; background: #CB3634; border-radius: 50%;"></div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    console.log(`📍 Rendered ${savedAddresses.length} saved addresses`);
}

// Select saved address
function selectSavedAddress(addressId) {
    selectedAddressId = addressId;
    
    // Hide new address input if it was shown
    const newAddressInput = document.getElementById('newAddressInput');
    const addNewBtn = document.getElementById('addNewAddressBtn');
    newAddressInput.style.display = 'none';
    addNewBtn.style.display = 'flex';
    
    // Clear new address input
    document.getElementById('deliveryAddress').value = '';
    
    // Re-render to update selection
    renderSavedAddresses();
    
    const selectedAddr = savedAddresses.find(a => a.id === addressId);
    console.log(`✅ Selected address: ${selectedAddr.label} - ${selectedAddr.address}`);
}

// Toggle new address input
function toggleNewAddressInput() {
    const newAddressInput = document.getElementById('newAddressInput');
    const addNewBtn = document.getElementById('addNewAddressBtn');
    
    if (newAddressInput.style.display === 'none' || !newAddressInput.style.display) {
        // Show new address input
        newAddressInput.style.display = 'block';
        addNewBtn.style.display = 'none';
        
        // Deselect saved addresses
        selectedAddressId = null;
        renderSavedAddresses();
        
        // Focus on input
        document.getElementById('deliveryAddress').focus();
        
        console.log('📝 New address input shown');
    } else {
        // Hide new address input
        newAddressInput.style.display = 'none';
        addNewBtn.style.display = 'flex';
        
        // Clear input
        document.getElementById('deliveryAddress').value = '';
        
        console.log('📝 New address input hidden');
    }
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
    
    // Set minimum pickup date
    setMinimumPickupDate();
    
    console.log('💡 Trang đã sẵn sàng!');
    console.log('📌 Vui lòng điền thông tin lịch lấy xe, chọn phương thức thanh toán và xác nhận đồng ý.');
});
