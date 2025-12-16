/* ===================================
   CarShop Booking Detail JavaScript
   =================================== */

// DEMO DATA - Copy từ my-bookings.js
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

// Get booking ID from URL
function getBookingIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
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

// Get status config (CORPORATE STYLE)
function getStatusConfig(status) {
    const configs = {
        pending: {
            text: 'Chờ xem xe',
            badgeClass: 'status-pending',
            description: {
                title: 'Lịch hẹn đang chờ',
                message: 'Vui lòng đến showroom đúng thời gian đã đăng ký. Nhân viên sẽ hỗ trợ bạn xem xe và tư vấn chi tiết.',
                alertClass: 'alert-warning'
            }
        },
        viewed: {
            text: 'Đã xem xe',
            badgeClass: 'status-viewed',
            description: {
                title: 'Bạn đã xem xe thành công',
                message: 'Bạn có thể tiếp tục đặt cọc để giữ xe. Đây là bước quan trọng để hoàn tất quy trình mua xe.',
                alertClass: 'alert-info'
            }
        },
        undecided: {
            text: 'Chưa quyết định',
            badgeClass: 'status-undecided',
            description: {
                title: 'Bạn chưa quyết định mua xe',
                message: 'Bạn có thể quay lại bất cứ lúc nào để tiếp tục mua xe. Vui lòng liên hệ showroom nếu cần tư vấn thêm.',
                alertClass: 'alert-warning'
            }
        },
        cancelled: {
            text: 'Đã hủy lịch',
            badgeClass: 'status-cancelled',
            description: {
                title: 'Lịch hẹn đã bị hủy',
                message: 'Lịch hẹn xem xe của bạn đã bị hủy. Nếu bạn vẫn quan tâm đến xe này, vui lòng đặt lịch mới.',
                alertClass: 'alert-danger'
            }
        }
    };
    return configs[status] || configs.pending;
}

// Load booking details
function loadBookingDetails() {
    const bookingId = getBookingIdFromURL();
    currentBooking = bookings.find(b => b.id === bookingId);
    
    if (!currentBooking) {
        alert('Không tìm thấy lịch hẹn!');
        window.location.href = 'my-bookings.html';
        return;
    }
    
    const statusConfig = getStatusConfig(currentBooking.status);
    
    // Update page title
    document.title = `Chi tiết lịch xem ${currentBooking.carName} - CarShop`;
    
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
    
    // Status badge
    renderStatusBadge(statusConfig);
    
    // Status description
    renderStatusDescription(statusConfig);
    
    // Action buttons
    renderActionButtons();
}

// Render status badge (CORPORATE STYLE)
function renderStatusBadge(statusConfig) {
    const container = document.getElementById('statusBadge');
    container.innerHTML = `
        <span class="status-badge ${statusConfig.badgeClass}">${statusConfig.text}</span>
    `;
}

// Render status description (CORPORATE STYLE)
function renderStatusDescription(statusConfig) {
    const container = document.getElementById('statusDescription');
    const desc = statusConfig.description;
    
    container.innerHTML = `
        <div class="alert-box ${desc.alertClass}">
            <strong>${desc.title}</strong><br>
            ${desc.message}
        </div>
    `;
}

// Render action buttons (CORPORATE STYLE)
function renderActionButtons() {
    const container = document.getElementById('actionButtons');
    
    switch (currentBooking.status) {
        case 'pending':
            // ❌ KHÔNG hiển thị nút đặt cọc
            container.innerHTML = `
                <button 
                    onclick="window.location.href='my-bookings.html'"
                    class="btn-secondary"
                    style="width: 100%;"
                >
                    Quay lại danh sách
                </button>
            `;
            break;
            
        case 'viewed':
            // ✅ CHỈ trạng thái này mới được đặt cọc
            container.innerHTML = `
                <button 
                    onclick="goToDeposit()"
                    class="btn-primary"
                    style="width: 100%;"
                >
                    ĐẶT CỌC MUA XE
                </button>
                <button 
                    onclick="markAsUndecided()"
                    class="btn-secondary"
                    style="width: 100%;"
                >
                    Chưa quyết định
                </button>
            `;
            break;
            
        case 'undecided':
            // ❌ KHÔNG hiển thị nút đặt cọc
            container.innerHTML = `
                <button 
                    onclick="window.location.href='my-bookings.html'"
                    class="btn-secondary"
                    style="width: 100%;"
                >
                    Quay lại danh sách
                </button>
            `;
            break;
            
        case 'cancelled':
            // ❌ Disable toàn bộ hành động
            container.innerHTML = `
                <button 
                    onclick="window.location.href='my-bookings.html'"
                    class="btn-secondary"
                    style="width: 100%;"
                >
                    Quay lại danh sách
                </button>
            `;
            break;
    }
}

// Mark as undecided
function markAsUndecided() {
    if (confirm('Bạn chưa quyết định mua xe này?\n\nBạn có thể quay lại đặt cọc bất cứ lúc nào!')) {
        alert('Đã cập nhật trạng thái: Chưa quyết định');
        window.location.href = 'my-bookings.html';
    }
}

// Go to deposit page (CHỈ khi status = "viewed")
function goToDeposit() {
    // Kiểm tra điều kiện nghiệp vụ
    if (currentBooking.status !== 'viewed') {
        alert('❌ Không thể đặt cọc!\n\nBạn chỉ có thể đặt cọc sau khi đã xem xe tại showroom.');
        return;
    }
    
    console.log('%c💰 ĐẶT CỌC MUA XE', 'color: #10B981; font-size: 16px; font-weight: bold;');
    console.log('─────────────────────────────────────');
    console.log('Booking ID:', currentBooking.id);
    console.log('Car:', currentBooking.carName);
    console.log('Price:', formatPrice(currentBooking.carPrice));
    console.log('Status:', currentBooking.status);
    console.log('─────────────────────────────────────');
    console.log('✅ Điều kiện hợp lệ: Đã xem xe');
    console.log('➡️  Chuyển đến trang đặt cọc...');
    
    alert(`✅ Chuyển đến trang đặt cọc!\n\nXe: ${currentBooking.carName}\nGiá: ${formatPrice(currentBooking.carPrice)}\n\n(Trang deposit.html sẽ được phát triển tiếp theo)`);
    
    // Redirect to deposit page
    window.location.href = `deposit.html?bookingId=${currentBooking.id}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadBookingDetails();
    
    console.log('%c🚗 CarShop - Chi tiết lịch xem xe', 'color: #CB3634; font-size: 16px; font-weight: bold;');
    console.log('═════════════════════════════════════');
    console.log(`📋 Booking ID: ${getBookingIdFromURL()}`);
    console.log(`🚗 Xe: ${currentBooking?.carName}`);
    console.log(`💰 Giá: ${formatPrice(currentBooking?.carPrice)}`);
    console.log(`📊 Trạng thái: ${currentBooking?.status}`);
    console.log('═════════════════════════════════════');
    console.log('📌 NGHIỆP VỤ:');
    console.log('   • Chờ xem xe → ❌ KHÔNG được đặt cọc');
    console.log('   • Đã xem xe → ✅ ĐƯỢC đặt cọc');
    console.log('   • Chưa quyết định → ❌ KHÔNG được đặt cọc');
    console.log('   • Đã hủy → ❌ Disable toàn bộ');
    console.log('═════════════════════════════════════');
    
    if (currentBooking?.status === 'viewed') {
        console.log('%c✅ Trạng thái hợp lệ: Có thể đặt cọc!', 'color: #10B981; font-weight: bold;');
    } else {
        console.log('%c❌ Trạng thái không hợp lệ: Không thể đặt cọc!', 'color: #EF4444; font-weight: bold;');
    }
});
