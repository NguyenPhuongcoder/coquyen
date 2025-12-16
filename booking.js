/* ===================================
   CarShop Booking Page JavaScript
   =================================== */

// DEMO CAR DATA (Hard-coded)
const carData = {
    id: 1,
    name: 'Toyota Camry 2.5Q',
    brand: 'Toyota',
    price: 1235000000,
    status: 'available',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'
};

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
}

// Get status badge
function getStatusBadge(status) {
    const badges = {
        available: { 
            text: '<span class="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Còn xe', 
            class: 'bg-green-50 text-green-700 border border-green-200',
            statusText: 'Còn xe'
        },
        scheduled: { 
            text: '<span class="w-2 h-2 bg-yellow-500 rounded-full inline-block"></span> Có lịch xem', 
            class: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
            statusText: 'Có lịch xem'
        },
        deposited: { 
            text: '<span class="w-2 h-2 bg-red-500 rounded-full inline-block"></span> Đã đặt cọc', 
            class: 'bg-red-50 text-red-700 border border-red-200',
            statusText: 'Đã đặt cọc'
        }
    };
    return badges[status] || badges.available;
}

// Load car information
function loadCarInfo() {
    const badge = getStatusBadge(carData.status);
    
    // Update car info
    document.getElementById('carImage').src = carData.image;
    document.getElementById('carName').textContent = carData.name;
    document.getElementById('carBrand').textContent = carData.brand;
    document.getElementById('carYear').textContent = carData.year;
    document.getElementById('carPrice').textContent = formatPrice(carData.price);
    document.getElementById('carStatus').textContent = badge.statusText;
    
    // Update status badge
    const statusBadge = document.getElementById('carStatusBadge');
    statusBadge.innerHTML = badge.text;
    statusBadge.className = `px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${badge.class}`;
}

// Set minimum date (today)
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').setAttribute('min', today);
}

// Validate form
function validateForm() {
    let isValid = true;
    
    // Clear all errors
    document.querySelectorAll('[id$="Error"]').forEach(el => {
        el.classList.add('hidden');
        el.textContent = '';
    });
    
    // Remove error styling
    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.classList.remove('border-red-500');
    });
    
    // Validate date
    const bookingDate = document.getElementById('bookingDate');
    if (!bookingDate.value) {
        showError('dateError', 'Vui lòng chọn ngày xem xe', bookingDate);
        isValid = false;
    }
    
    // Validate time
    const bookingTime = document.getElementById('bookingTime');
    if (!bookingTime.value) {
        showError('timeError', 'Vui lòng chọn giờ xem xe', bookingTime);
        isValid = false;
    }
    
    // Validate name
    const customerName = document.getElementById('customerName');
    if (!customerName.value.trim()) {
        showError('nameError', 'Vui lòng nhập họ và tên', customerName);
        isValid = false;
    } else if (customerName.value.trim().length < 3) {
        showError('nameError', 'Họ và tên phải có ít nhất 3 ký tự', customerName);
        isValid = false;
    }
    
    // Validate phone
    const customerPhone = document.getElementById('customerPhone');
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!customerPhone.value.trim()) {
        showError('phoneError', 'Vui lòng nhập số điện thoại', customerPhone);
        isValid = false;
    } else if (!phoneRegex.test(customerPhone.value.trim())) {
        showError('phoneError', 'Số điện thoại không hợp lệ', customerPhone);
        isValid = false;
    }
    
    return isValid;
}

// Show error message
function showError(errorId, message, inputElement) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    inputElement.classList.add('border-red-500');
}

// Handle form submit
function handleSubmit(event) {
    event.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = {
        car: {
            id: carData.id,
            name: carData.name,
            brand: carData.brand,
            price: carData.price,
            year: carData.year
        },
        booking: {
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value
        },
        customer: {
            name: document.getElementById('customerName').value.trim(),
            phone: document.getElementById('customerPhone').value.trim(),
            email: document.getElementById('customerEmail').value.trim() || null,
            note: document.getElementById('customerNote').value.trim() || null
        }
    };
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitIcon = document.getElementById('submitIcon');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    submitBtn.disabled = true;
    submitText.textContent = 'Đang xử lý...';
    submitIcon.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        // Log data to console
        console.log('%c🎉 ĐẶT LỊCH XEM XE THÀNH CÔNG!', 'color: #10B981; font-size: 16px; font-weight: bold;');
        console.log('%c📋 THÔNG TIN ĐẶT LỊCH:', 'color: #3B82F6; font-size: 14px; font-weight: bold;');
        console.log('─────────────────────────────────────');
        console.log('🚗 Thông tin xe:');
        console.log(`   • Tên xe: ${formData.car.name}`);
        console.log(`   • Hãng: ${formData.car.brand}`);
        console.log(`   • Năm: ${formData.car.year}`);
        console.log(`   • Giá: ${formatPrice(formData.car.price)}`);
        console.log('─────────────────────────────────────');
        console.log('📅 Thời gian xem xe:');
        console.log(`   • Ngày: ${formData.booking.date}`);
        console.log(`   • Giờ: ${formData.booking.time}`);
        console.log('─────────────────────────────────────');
        console.log('👤 Thông tin khách hàng:');
        console.log(`   • Họ tên: ${formData.customer.name}`);
        console.log(`   • Số điện thoại: ${formData.customer.phone}`);
        if (formData.customer.email) {
            console.log(`   • Email: ${formData.customer.email}`);
        }
        if (formData.customer.note) {
            console.log(`   • Ghi chú: ${formData.customer.note}`);
        }
        console.log('─────────────────────────────────────');
        console.log('%cDữ liệu JSON:', 'color: #8B5CF6; font-weight: bold;');
        console.log(JSON.stringify(formData, null, 2));
        
        // Show success alert
        alert('Đặt lịch xem xe thành công!\n\nChúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận lịch hẹn.\n\nVui lòng kiểm tra console để xem chi tiết thông tin đặt lịch.');
        
        // Reset form
        document.getElementById('bookingForm').reset();
        
        // Reset button state
        submitBtn.disabled = false;
        submitText.textContent = 'XÁC NHẬN ĐẶT LỊCH XEM XE';
        submitIcon.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
        
        // Optional: Redirect to home page after 2 seconds
        setTimeout(() => {
            // window.location.href = 'home.html';
        }, 2000);
        
    }, 1500); // Simulate 1.5s processing time
}

// Go back to car detail page
function goBack() {
    window.history.back();
}

// UI Interactions
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('hidden');
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Close user menu when clicking outside
document.addEventListener('click', function(event) {
    const userDropdown = document.getElementById('userDropdown');
    const userMenu = document.getElementById('userMenu');
    
    if (userDropdown && !userDropdown.contains(event.target)) {
        userMenu.classList.add('hidden');
    }
});

// Real-time validation on input
function setupRealTimeValidation() {
    const inputs = ['bookingDate', 'bookingTime', 'customerName', 'customerPhone'];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('blur', function() {
            // Only validate if user has started typing
            if (this.value) {
                validateForm();
            }
        });
        
        // Remove error on input
        input.addEventListener('input', function() {
            this.classList.remove('border-red-500');
            const errorId = inputId.replace('booking', '').replace('customer', '').toLowerCase() + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Load car info
    loadCarInfo();
    
    // Set minimum date
    setMinDate();
    
    // Setup form validation
    setupRealTimeValidation();
    
    // Handle form submit
    document.getElementById('bookingForm').addEventListener('submit', handleSubmit);
    
    console.log('%c🚗 CarShop - Đặt lịch xem xe', 'color: #CB3634; font-size: 16px; font-weight: bold;');
    console.log(`Car: ${carData.name}`);
});
