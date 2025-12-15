/* ===================================
   CarShop Home Page JavaScript
   =================================== */

// ===================================
// MOCK USER DATA - Phân quyền
// ===================================
const currentUser = {
    name: 'Nguyễn Văn A',
    role: 'USER', // 'USER' | 'SELLER' | 'ADMIN'
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=CB3634&color=fff'
};

// ===================================
// HERO SLIDER DATA
// ===================================
const heroCars = [
    {
        id: 6,
        name: 'Mercedes-Benz C200',
        price: 1699000000,
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000'
    },
    {
        id: 5,
        name: 'Ford Ranger Raptor',
        price: 1198000000,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2000'
    },
    {
        id: 1,
        name: 'Toyota Camry 2.5Q',
        price: 1235000000,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=2000'
    }
];

let currentHeroIndex = 0;

// ===================================
// HERO SLIDER FUNCTIONS
// ===================================
function updateHeroSlider() {
    const car = heroCars[currentHeroIndex];
    
    document.getElementById('heroCarName').textContent = car.name;
    document.getElementById('heroCarPrice').textContent = formatPriceShort(car.price);
    document.getElementById('heroCarImage').src = car.image;
    
    // Update dots
    document.querySelectorAll('.hero-dot').forEach((dot, index) => {
        if (index === currentHeroIndex) {
            dot.classList.add('active');
            dot.classList.remove('bg-white/30');
            dot.classList.add('bg-white');
        } else {
            dot.classList.remove('active');
            dot.classList.remove('bg-white');
            dot.classList.add('bg-white/30');
        }
    });
}

function nextHeroCar() {
    currentHeroIndex = (currentHeroIndex + 1) % heroCars.length;
    updateHeroSlider();
}

function prevHeroCar() {
    currentHeroIndex = (currentHeroIndex - 1 + heroCars.length) % heroCars.length;
    updateHeroSlider();
}

function bookTestDrive() {
    const car = heroCars[currentHeroIndex];
    alert(`Đặt lịch lái thử: ${car.name}\n\nChức năng này sẽ được triển khai trong phiên bản tiếp theo.`);
}

// Auto slide every 5 seconds
setInterval(nextHeroCar, 5000);

// ===================================
// HERO SEARCH FUNCTIONS
// ===================================
function searchFromHero() {
    const make = document.getElementById('heroMake').value;
    const condition = document.getElementById('heroCondition').value;
    
    // Scroll to cars section
    document.getElementById('cars').scrollIntoView({ behavior: 'smooth' });
    
    // Apply filters
    if (make) {
        document.getElementById('brandFilter').value = make;
    }
    
    setTimeout(() => {
        applyFilters();
    }, 500);
}

// Format price for hero (shorter version)
function formatPriceShort(price) {
    const billion = price / 1000000000;
    return billion.toFixed(3).replace('.', ',');
}

// ===================================
// DEMO DATA - Danh sách xe
// ===================================
const cars = [
    {
        id: 1,
        name: 'Toyota Camry 2.5Q',
        brand: 'Toyota',
        price: 1235000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
        year: 2023,
        mileage: '15,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng'
    },
    {
        id: 2,
        name: 'Honda Civic RS',
        brand: 'Honda',
        price: 789000000,
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
        year: 2024,
        mileage: '5,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng'
    },
    {
        id: 3,
        name: 'Mazda CX-5 Premium',
        brand: 'Mazda',
        price: 979000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
        year: 2023,
        mileage: '8,500 km',
        transmission: 'Tự động',
        fuel: 'Xăng'
    },
    {
        id: 4,
        name: 'Hyundai Tucson',
        brand: 'Hyundai',
        price: 865000000,
        status: 'deposited',
        image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800'
    },
    {
        id: 5,
        name: 'Ford Ranger Raptor',
        brand: 'Ford',
        price: 1198000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
    },
    {
        id: 6,
        name: 'Mercedes-Benz C200',
        brand: 'Mercedes',
        price: 1699000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'
    },
    {
        id: 7,
        name: 'Toyota Vios G',
        brand: 'Toyota',
        price: 545000000,
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
    },
    {
        id: 8,
        name: 'Honda CR-V L',
        brand: 'Honda',
        price: 1105000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
    },
    {
        id: 9,
        name: 'Mazda 3 Premium',
        brand: 'Mazda',
        price: 769000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
    },
    {
        id: 10,
        name: 'Hyundai Accent',
        brand: 'Hyundai',
        price: 499000000,
        status: 'deposited',
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800'
    },
    {
        id: 11,
        name: 'Ford Everest Titanium',
        brand: 'Ford',
        price: 1399000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
    },
    {
        id: 12,
        name: 'Mercedes-Benz E200',
        brand: 'Mercedes',
        price: 2299000000,
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1617531653520-bd466e4e2b5e?w=800'
    }
];

// ===================================
// STATE MANAGEMENT
// ===================================
let filteredCars = [...cars];

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Format giá VND
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Get status badge
function getStatusBadge(status) {
    const badges = {
        available: { 
            text: '<span class="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Còn xe', 
            class: 'bg-green-50 text-green-700 border border-green-200' 
        },
        scheduled: { 
            text: '<span class="w-2 h-2 bg-yellow-500 rounded-full inline-block"></span> Có lịch xem', 
            class: 'bg-yellow-50 text-yellow-700 border border-yellow-200' 
        },
        deposited: { 
            text: '<span class="w-2 h-2 bg-red-500 rounded-full inline-block"></span> Đã đặt cọc', 
            class: 'bg-red-50 text-red-700 border border-red-200' 
        }
    };
    return badges[status] || badges.available;
}

// Get action buttons based on user role and car status
function getActionButtons(car) {
    const buttons = [];
    
    // Nút "Xem chi tiết" - Hiển thị cho tất cả
    buttons.push(`
        <button 
            onclick="viewCarDetail(${car.id})"
            class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
        >
            Xem chi tiết
        </button>
    `);
    
    // Phân quyền theo role
    if (currentUser.role === 'USER') {
        // USER: Chỉ hiển thị "Đặt lịch xem xe" nếu xe còn available
        if (car.status === 'available') {
            buttons.push(`
                <button 
                    onclick="bookAppointment(${car.id})"
                    class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
                >
                    Đặt lịch xem
                </button>
            `);
        }
    } else if (currentUser.role === 'SELLER' || currentUser.role === 'ADMIN') {
        // SELLER/ADMIN: Hiển thị nút quản lý
        buttons.push(`
            <button 
                onclick="editCar(${car.id})"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
                Chỉnh sửa
            </button>
        `);
    }
    
    return buttons.join('');
}

// ===================================
// RENDER FUNCTIONS
// ===================================

// Render danh sách xe
function renderCars(carsToRender) {
    const carsGrid = document.getElementById('carsGrid');
    const noResults = document.getElementById('noResults');
    const resultCount = document.getElementById('resultCount');
    
    // Update result count
    resultCount.textContent = carsToRender.length;
    
    if (carsToRender.length === 0) {
        carsGrid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    carsGrid.innerHTML = carsToRender.map(car => {
        const badge = getStatusBadge(car.status);
        const actionButtons = getActionButtons(car);
        
        return `
            <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <!-- Car Image -->
                <div class="relative h-48 overflow-hidden">
                    <img 
                        src="${car.image}" 
                        alt="${car.name}"
                        class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onerror="this.src='https://via.placeholder.com/800x450?text=Car+Image'"
                    >
                    <!-- Status Badge -->
                    <div class="absolute top-3 right-3">
                        <span class="px-3 py-1 rounded-full text-xs font-semibold ${badge.class}">
                            ${badge.text}
                        </span>
                    </div>
                </div>
                
                <!-- Car Info -->
                <div class="p-5">
                    <h3 class="text-lg font-bold text-gray-900 mb-1 line-clamp-1">${car.name}</h3>
                    <p class="text-sm text-gray-600 mb-3">${car.brand}</p>
                    
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-2xl font-bold text-primary">${formatPrice(car.price)}</span>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex gap-2">
                        ${actionButtons}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ===================================
// FILTER & SEARCH FUNCTIONS
// ===================================

// Apply all filters
function applyFilters() {
    const brandFilter = document.getElementById('brandFilter').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
    // Filter by brand
    filteredCars = cars.filter(car => {
        if (brandFilter && car.brand.toLowerCase() !== brandFilter) return false;
        return true;
    });
    
    // Filter by status
    if (statusFilter) {
        filteredCars = filteredCars.filter(car => car.status === statusFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
        filteredCars = filteredCars.filter(car => 
            car.name.toLowerCase().includes(searchQuery) ||
            car.brand.toLowerCase().includes(searchQuery)
        );
    }
    
    // Sort
    if (sortFilter === 'price-asc') {
        filteredCars.sort((a, b) => a.price - b.price);
    } else if (sortFilter === 'price-desc') {
        filteredCars.sort((a, b) => b.price - a.price);
    }
    
    renderCars(filteredCars);
}

// ===================================
// ACTION HANDLERS
// ===================================

// View car detail
function viewCarDetail(carId) {
    console.log(`Viewing car detail: ${carId}`);
    // Redirect to car detail page
    window.location.href = `car-detail.html?id=${carId}`;
}

// Book appointment (USER only)
function bookAppointment(carId) {
    const car = cars.find(c => c.id === carId);
    console.log(`Booking appointment for: ${car.name}`);
    alert(`Đặt lịch xem xe: ${car.name}\n\nChức năng này sẽ được triển khai trong phiên bản tiếp theo.`);
    // In production: Redirect to booking page
    // window.location.href = `booking.html?carId=${carId}`;
}

// Edit car (SELLER/ADMIN only)
function editCar(carId) {
    const car = cars.find(c => c.id === carId);
    console.log(`Editing car: ${car.name}`);
    alert(`Chỉnh sửa xe: ${car.name}\n\nChức năng này dành cho SELLER/ADMIN.`);
    // In production: Redirect to edit page
    // window.location.href = `edit-car.html?id=${carId}`;
}

// ===================================
// UI INTERACTIONS
// ===================================

// Toggle user menu
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('hidden');
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Close user menu when clicking outside
document.addEventListener('click', function(event) {
    const userDropdown = document.getElementById('userDropdown');
    const userMenu = document.getElementById('userMenu');
    
    if (!userDropdown.contains(event.target)) {
        userMenu.classList.add('hidden');
    }
});

// ===================================
// HOT CARS SECTION
// ===================================
function renderHotCars() {
    const hotCarsGrid = document.getElementById('hotCarsGrid');
    
    // Get first 6 available cars
    const hotCars = cars.filter(car => car.status === 'available').slice(0, 6);
    
    hotCarsGrid.innerHTML = hotCars.map(car => {
        const badge = getStatusBadge(car.status);
        const actionButtons = getActionButtons(car);
        
        return `
            <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                <!-- Car Image -->
                <div class="relative h-52 overflow-hidden bg-gray-100">
                    <img 
                        src="${car.image}" 
                        alt="${car.name}"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onerror="this.src='https://via.placeholder.com/800x450?text=Car+Image'"
                    >
                    <!-- Hot Badge - Ribbon Style -->
                    <div class="absolute top-0 left-0">
                        <div class="bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 text-xs font-bold shadow-lg flex items-center gap-1.5">
                            <span>🔥</span>
                            <span>HOT</span>
                        </div>
                    </div>
                    <!-- Status Badge -->
                    <div class="absolute top-3 right-3">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${badge.class} shadow-md backdrop-blur-sm">
                            ${badge.text}
                        </span>
                    </div>
                </div>
                
                <!-- Car Info -->
                <div class="p-5">
                    <!-- Name & Brand -->
                    <div class="mb-3">
                        <h3 class="text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary transition-colors">${car.name}</h3>
                        <p class="text-sm text-gray-500">${car.brand} • ${car.year || 2023}</p>
                    </div>
                    
                    <!-- Specs -->
                    <div class="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-100">
                        <div class="flex items-center gap-1.5 text-xs text-gray-600">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                            <span>${car.mileage || '0 km'}</span>
                        </div>
                        <div class="flex items-center gap-1.5 text-xs text-gray-600">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                            </svg>
                            <span>${car.transmission || 'Tự động'}</span>
                        </div>
                        <div class="flex items-center gap-1.5 text-xs text-gray-600">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                            </svg>
                            <span>${car.fuel || 'Xăng'}</span>
                        </div>
                    </div>
                    
                    <!-- Price -->
                    <div class="mb-4">
                        <div class="text-3xl font-bold text-primary">${formatPrice(car.price)}</div>
                        <p class="text-xs text-gray-500 mt-1">Giá niêm yết</p>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex gap-2">
                        ${actionButtons}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ===================================
// EVENT LISTENERS
// ===================================

// Header search
document.getElementById('headerSearch').addEventListener('input', function(e) {
    // Scroll to cars section and apply search
    if (e.target.value) {
        document.getElementById('cars').scrollIntoView({ behavior: 'smooth' });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Set user info
    document.getElementById('userName').textContent = currentUser.name;
    
    // Render hot cars
    renderHotCars();
    
    // Log current user role for debugging
    console.log('%c🚗 CarShop Home Page', 'color: #CB3634; font-size: 16px; font-weight: bold;');
    console.log(`%cCurrent User: ${currentUser.name}`, 'color: #4B5563; font-weight: bold;');
    console.log(`%cRole: ${currentUser.role}`, 'color: #4B5563; font-weight: bold;');
    console.log('%c---', 'color: #D1D5DB;');
    console.log(`%cTotal Cars: ${cars.length}`, 'color: #10B981;');
    
    // Role-based UI adjustments
    if (currentUser.role === 'SELLER' || currentUser.role === 'ADMIN') {
        console.log('%c✅ SELLER/ADMIN mode: Edit buttons enabled', 'color: #3B82F6;');
    } else {
        console.log('%c✅ USER mode: Booking buttons enabled', 'color: #10B981;');
    }
});

// ===================================
// EXPORT FOR TESTING (Optional)
// ===================================
window.carShop = {
    currentUser,
    cars,
    viewCarDetail,
    bookAppointment,
    editCar,
    applyFilters
};
