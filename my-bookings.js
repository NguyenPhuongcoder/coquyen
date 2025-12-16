/* ===================================
   CarShop My Bookings JavaScript
   =================================== */

// DEMO DATA - Danh sách lịch xem xe
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
        status: "viewed" // pending | viewed | undecided | cancelled
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

// STATE
let filteredBookings = [...bookings];
let currentPage = 1;
const bookingsPerPage = 3;

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
    const dayOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()];
    return `${dayOfWeek}, ${day}/${month}/${year}`;
}

// Get status config
function getStatusConfig(status) {
    const configs = {
        pending: {
            icon: '🟡',
            text: 'Chờ xem xe',
            class: 'bg-yellow-100 text-yellow-800 border border-yellow-300'
        },
        viewed: {
            icon: '🔵',
            text: 'Đã xem xe',
            class: 'bg-blue-100 text-blue-800 border border-blue-300'
        },
        undecided: {
            icon: '⚪',
            text: 'Chưa quyết định',
            class: 'bg-gray-100 text-gray-800 border border-gray-300'
        },
        cancelled: {
            icon: '🔴',
            text: 'Đã hủy lịch',
            class: 'bg-red-100 text-red-800 border border-red-300'
        }
    };
    return configs[status] || configs.pending;
}

// Calculate stats
function calculateStats() {
    const stats = {
        pending: bookings.filter(b => b.status === 'pending').length,
        viewed: bookings.filter(b => b.status === 'viewed').length,
        undecided: bookings.filter(b => b.status === 'undecided').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length
    };
    
    document.getElementById('statPending').textContent = stats.pending;
    document.getElementById('statViewed').textContent = stats.viewed;
    document.getElementById('statUndecided').textContent = stats.undecided;
    document.getElementById('statCancelled').textContent = stats.cancelled;
}

// Apply filters
function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    // Filter by status
    if (statusFilter === 'all') {
        filteredBookings = [...bookings];
    } else {
        filteredBookings = bookings.filter(b => b.status === statusFilter);
    }
    
    // Sort
    if (sortFilter === 'date-desc') {
        filteredBookings.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortFilter === 'date-asc') {
        filteredBookings.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortFilter === 'price-desc') {
        filteredBookings.sort((a, b) => b.carPrice - a.carPrice);
    } else if (sortFilter === 'price-asc') {
        filteredBookings.sort((a, b) => a.carPrice - b.carPrice);
    }
    
    // Reset to page 1
    currentPage = 1;
    
    // Update UI
    updateResultCount();
    renderBookingsList();
    renderPagination();
}

// Filter by status (from stats cards)
function filterByStatus(status) {
    document.getElementById('statusFilter').value = status;
    applyFilters();
}

// Update result count
function updateResultCount() {
    document.getElementById('resultCount').textContent = filteredBookings.length;
}

// Render bookings list (CORPORATE STYLE)
function renderBookingsList() {
    const container = document.getElementById('bookingsList');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredBookings.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'flex';
    emptyState.style.display = 'none';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * bookingsPerPage;
    const endIndex = startIndex + bookingsPerPage;
    const bookingsToShow = filteredBookings.slice(startIndex, endIndex);
    
    container.innerHTML = bookingsToShow.map(booking => {
        const statusConfig = getStatusConfig(booking.status);
        
        return `
            <div class="corporate-card" style="padding: 24px;">
                <div style="display: flex; gap: 24px; flex-wrap: wrap;">
                    <!-- Car Image -->
                    <div style="width: 180px; height: 135px; flex-shrink: 0; border-radius: 4px; overflow: hidden; border: 1px solid #E0E0E0;">
                        <img 
                            src="${booking.carImage}" 
                            alt="${booking.carName}"
                            style="width: 100%; height: 100%; object-fit: cover;"
                        >
                    </div>
                    
                    <!-- Booking Info -->
                    <div style="flex: 1; min-width: 300px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
                            <div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #1A1A1A; margin-bottom: 8px;">${booking.carName}</h3>
                                <div style="display: flex; align-items: center; gap: 12px; font-size: 14px;">
                                    <span style="color: #666666; font-weight: 500;">${booking.carBrand}</span>
                                    <span style="width: 4px; height: 4px; background: #CCCCCC; border-radius: 50%;"></span>
                                    <span style="color: #CB3634; font-weight: 700;">${formatPrice(booking.carPrice)}</span>
                                </div>
                            </div>
                            <span class="status-badge ${getStatusBadgeClass(booking.status)}">${statusConfig.text}</span>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #F0F0F0;">
                            <div>
                                <p style="font-size: 11px; color: #999999; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Ngày xem</p>
                                <p style="font-size: 14px; font-weight: 600; color: #1A1A1A;">${formatDate(booking.date)}</p>
                            </div>
                            <div>
                                <p style="font-size: 11px; color: #999999; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Giờ hẹn</p>
                                <p style="font-size: 14px; font-weight: 600; color: #1A1A1A;">${booking.time}</p>
                            </div>
                            <div>
                                <p style="font-size: 11px; color: #999999; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Showroom</p>
                                <p style="font-size: 14px; font-weight: 600; color: #1A1A1A;">${booking.showroom}</p>
                            </div>
                        </div>
                        
                        <button 
                            onclick="viewBookingDetail(${booking.id})"
                            class="btn-primary"
                        >
                            Xem chi tiết lịch hẹn
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get status badge class
function getStatusBadgeClass(status) {
    const classes = {
        pending: 'status-pending',
        viewed: 'status-viewed',
        undecided: 'status-undecided',
        cancelled: 'status-cancelled'
    };
    return classes[status] || 'status-pending';
}

// Get status border color
function getStatusBorderColor(status) {
    const colors = {
        pending: 'border-yellow-500',
        viewed: 'border-blue-500',
        undecided: 'border-gray-500',
        cancelled: 'border-red-500'
    };
    return colors[status] || 'border-gray-300';
}

// Render pagination (CORPORATE STYLE)
function renderPagination() {
    const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
    const container = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'flex';
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button 
            onclick="changePage(${currentPage - 1})"
            ${currentPage === 1 ? 'disabled' : ''}
            class="pagination-btn"
        >
            ‹ Trước
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `
                <button class="pagination-btn active">
                    ${i}
                </button>
            `;
        } else {
            paginationHTML += `
                <button 
                    onclick="changePage(${i})"
                    class="pagination-btn"
                >
                    ${i}
                </button>
            `;
        }
    }
    
    // Next button
    paginationHTML += `
        <button 
            onclick="changePage(${currentPage + 1})"
            ${currentPage === totalPages ? 'disabled' : ''}
            class="pagination-btn"
        >
            Sau ›
        </button>
    `;
    
    container.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderBookingsList();
    renderPagination();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// View booking detail (redirect to detail page)
function viewBookingDetail(bookingId) {
    // Redirect to booking detail page
    window.location.href = `booking-detail.html?id=${bookingId}`;
}

// OLD: View booking detail (open modal) - REMOVED
function viewBookingDetailOLD(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;
    
    const statusConfig = getStatusConfig(booking.status);
    const modalContent = document.getElementById('modalContent');
    
    // Render modal content
    modalContent.innerHTML = `
        <!-- Status Badge -->
        <div class="flex justify-center mb-6">
            <div class="${statusConfig.class} px-6 py-3 rounded-2xl shadow-md inline-flex items-center gap-2">
                <span class="text-2xl">${statusConfig.icon}</span>
                <span class="text-lg font-bold">${statusConfig.text}</span>
            </div>
        </div>
        
        <!-- Car Image -->
        <div class="relative h-64 rounded-xl overflow-hidden mb-6">
            <img 
                src="${booking.carImage}" 
                alt="${booking.carName}"
                class="w-full h-full object-cover"
            >
        </div>
        
        <!-- Car Info -->
        <div class="mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">${booking.carName}</h3>
            <p class="text-gray-600 mb-4">${booking.carBrand}</p>
            <p class="text-3xl font-bold text-primary">${formatPrice(booking.carPrice)}</p>
        </div>
        
        <!-- Booking Info -->
        <div class="bg-gray-50 rounded-xl p-6 mb-6">
            <h4 class="text-lg font-bold text-gray-900 mb-4">Thông tin lịch hẹn</h4>
            <div class="space-y-3">
                <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <div>
                        <p class="text-xs text-gray-500">Ngày xem xe</p>
                        <p class="text-sm font-semibold text-gray-900">${formatDate(booking.date)}</p>
                    </div>
                </div>
                <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                        <p class="text-xs text-gray-500">Giờ xem xe</p>
                        <p class="text-sm font-semibold text-gray-900">${booking.time}</p>
                    </div>
                </div>
                <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    <div>
                        <p class="text-xs text-gray-500">Showroom</p>
                        <p class="text-sm font-semibold text-gray-900">${booking.showroom}</p>
                    </div>
                </div>
                <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <div>
                        <p class="text-xs text-gray-500">Địa chỉ</p>
                        <p class="text-sm font-semibold text-gray-900">${booking.address}</p>
                    </div>
                </div>
            </div>
        </div>
        
        ${renderModalActions(booking)}
    `;
    
    // Show modal
    document.getElementById('bookingModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Render modal actions based on status
function renderModalActions(booking) {
    switch (booking.status) {
        case 'pending':
            return `
                <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div class="text-sm text-yellow-800">
                            <p class="font-semibold mb-1">Lịch hẹn đang chờ</p>
                            <p>Vui lòng đến showroom đúng thời gian đã đăng ký. Nhân viên sẽ hỗ trợ bạn xem xe.</p>
                        </div>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button 
                        onclick="closeModal()"
                        class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                    >
                        Đóng
                    </button>
                </div>
            `;
            
        case 'viewed':
            return `
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div class="text-sm text-blue-800">
                            <p class="font-semibold mb-1">Bạn đã xem xe thành công</p>
                            <p>Nếu bạn hài lòng với xe, vui lòng đặt cọc để tiếp tục quy trình mua xe.</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <button 
                        onclick="markAsUndecided(${booking.id})"
                        class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                    >
                        Chưa quyết định
                    </button>
                    <button 
                        onclick="goToDeposit(${booking.id})"
                        class="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        <span>ĐẶT CỌC MUA XE</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            `;
            
        case 'undecided':
            return `
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div class="text-sm text-gray-800">
                            <p class="font-semibold mb-1">Bạn chưa quyết định</p>
                            <p>Bạn có thể quay lại đặt cọc bất cứ lúc nào khi đã sẵn sàng.</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <button 
                        onclick="closeModal()"
                        class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                    >
                        Đóng
                    </button>
                    <button 
                        onclick="goToDeposit(${booking.id})"
                        class="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all"
                    >
                        Đặt cọc ngay
                    </button>
                </div>
            `;
            
        case 'cancelled':
            return `
                <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        <div class="text-sm text-red-800">
                            <p class="font-semibold mb-1">Lịch hẹn đã bị hủy</p>
                            <p>Lịch hẹn này đã bị hủy. Nếu bạn vẫn quan tâm, vui lòng đặt lịch mới.</p>
                        </div>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button 
                        onclick="closeModal()"
                        class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                    >
                        Đóng
                    </button>
                </div>
            `;
            
        default:
            return '';
    }
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    calculateStats();
    updateResultCount();
    renderBookingsList();
    renderPagination();
    
    console.log('%c🚗 CarShop - Lịch xem xe của tôi', 'color: #CB3634; font-size: 16px; font-weight: bold;');
    console.log(`Total bookings: ${bookings.length}`);
    console.log('─────────────────────────────────────');
    console.log('📊 Thống kê:');
    console.log(`   • Chờ xem: ${bookings.filter(b => b.status === 'pending').length}`);
    console.log(`   • Đã xem: ${bookings.filter(b => b.status === 'viewed').length}`);
    console.log(`   • Chưa quyết định: ${bookings.filter(b => b.status === 'undecided').length}`);
    console.log(`   • Đã hủy: ${bookings.filter(b => b.status === 'cancelled').length}`);
    console.log('─────────────────────────────────────');
    console.log('💡 Click vào stats card để lọc theo trạng thái');
});
