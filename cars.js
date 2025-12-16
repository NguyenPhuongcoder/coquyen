/* ===================================
   CarShop Cars Listing JavaScript
   =================================== */

// ===================================
// DEMO DATA - All Cars
// ===================================
const allCars = [
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
        image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800',
        year: 2023,
        mileage: '12,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng'
    },
    {
        id: 5,
        name: 'Ford Ranger Raptor',
        brand: 'Ford',
        price: 1198000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
        year: 2023,
        mileage: '10,000 km',
        transmission: 'Tự động',
        fuel: 'Dầu'
    },
    {
        id: 6,
        name: 'Mercedes-Benz C200',
        brand: 'Mercedes',
        price: 1699000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
        year: 2019,
        mileage: '45,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng'
    },
    {
        id: 7,
        name: 'Toyota Vios G',
        brand: 'Toyota',
        price: 545000000,
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        year: 2024,
        mileage: '2,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng'
    },
    {
        id: 8,
        name: 'Honda CR-V L',
        brand: 'Honda',
        price: 1105000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
        year: 2023,
        mileage: '18,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng'
    },
    {
        id: 9,
        name: 'Mazda 3 Premium',
        brand: 'Mazda',
        price: 769000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
        year: 2024,
        mileage: '3,500 km',
        transmission: 'Tự động',
        fuel: 'Xăng'
    },
    {
        id: 10,
        name: 'Hyundai Accent',
        brand: 'Hyundai',
        price: 499000000,
        status: 'deposited',
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
        year: 2023,
        mileage: '20,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng'
    },
    {
        id: 11,
        name: 'Ford Everest Titanium',
        brand: 'Ford',
        price: 1399000000,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
        year: 2023,
        mileage: '15,500 km',
        transmission: 'Tự động',
        fuel: 'Dầu'
    },
    {
        id: 12,
        name: 'Mercedes-Benz E200',
        brand: 'Mercedes',
        price: 2299000000,
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1617531653520-bd466e4e2b5e?w=800',
        year: 2022,
        mileage: '25,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng'
    }
];

// ===================================
// STATE MANAGEMENT
// ===================================
let filteredCars = [...allCars];
let currentPage = 1;
const carsPerPage = 9;
let currentView = 'grid';

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Format price
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

// ===================================
// FILTER FUNCTIONS
// ===================================

function applyFilters() {
    // Get search query
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
    // Get selected brands
    const selectedBrands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
    
    // Get selected statuses
    const selectedStatuses = Array.from(document.querySelectorAll('.status-filter:checked')).map(cb => cb.value);
    
    // Get price range
    const priceRange = document.querySelector('input[name="priceRange"]:checked').value;
    
    // Get sort option
    const sortOption = document.getElementById('sortSelect').value;
    
    // Filter cars
    filteredCars = allCars.filter(car => {
        // Search filter
        if (searchQuery && !car.name.toLowerCase().includes(searchQuery) && !car.brand.toLowerCase().includes(searchQuery)) {
            return false;
        }
        
        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(car.brand)) {
            return false;
        }
        
        // Status filter
        if (selectedStatuses.length > 0 && !selectedStatuses.includes(car.status)) {
            return false;
        }
        
        // Price range filter
        if (priceRange !== 'all') {
            const priceInMillions = car.price / 1000000;
            if (priceRange === '0-500' && priceInMillions >= 500) return false;
            if (priceRange === '500-800' && (priceInMillions < 500 || priceInMillions >= 800)) return false;
            if (priceRange === '800-1200' && (priceInMillions < 800 || priceInMillions >= 1200)) return false;
            if (priceRange === '1200-plus' && priceInMillions < 1200) return false;
        }
        
        return true;
    });
    
    // Sort cars
    if (sortOption === 'price-asc') {
        filteredCars.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
        filteredCars.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
        filteredCars.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Reset to page 1
    currentPage = 1;
    
    // Update UI
    updateResultCount();
    renderCars();
    renderPagination();
}

function resetFilters() {
    // Reset search
    document.getElementById('searchInput').value = '';
    
    // Reset brand checkboxes
    document.querySelectorAll('.brand-filter').forEach(cb => cb.checked = false);
    
    // Reset status checkboxes
    document.querySelectorAll('.status-filter').forEach(cb => cb.checked = false);
    
    // Reset price range
    document.querySelector('input[name="priceRange"][value="all"]').checked = true;
    
    // Reset sort
    document.getElementById('sortSelect').value = 'default';
    
    // Apply filters
    applyFilters();
}

function updateResultCount() {
    document.getElementById('resultCount').textContent = filteredCars.length;
    document.getElementById('totalCars').textContent = filteredCars.length;
}

// ===================================
// RENDER FUNCTIONS
// ===================================

function renderCars() {
    const carsGrid = document.getElementById('carsGrid');
    const noResults = document.getElementById('noResults');
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    const carsToShow = filteredCars.slice(startIndex, endIndex);
    
    // Show/hide no results
    if (filteredCars.length === 0) {
        carsGrid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    // Render cars
    if (currentView === 'grid') {
        carsGrid.className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8';
        carsGrid.innerHTML = carsToShow.map(car => renderCarCard(car)).join('');
    } else {
        carsGrid.className = 'space-y-4 mb-8';
        carsGrid.innerHTML = carsToShow.map(car => renderCarList(car)).join('');
    }
}

function renderCarCard(car) {
    const badge = getStatusBadge(car.status);
    
    return `
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <!-- Car Image -->
            <div class="relative h-44 overflow-hidden bg-gray-100">
                <img 
                    src="${car.image}" 
                    alt="${car.name}"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onerror="this.src='https://via.placeholder.com/800x450?text=Car+Image'"
                >
                <!-- Status Badge -->
                <div class="absolute top-2 right-2">
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${badge.class} shadow-md backdrop-blur-sm">
                        ${badge.text}
                    </span>
                </div>
            </div>
            
            <!-- Car Info -->
            <div class="p-4">
                <!-- Name & Brand -->
                <div class="mb-2">
                    <h3 class="text-base font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary transition-colors">${car.name}</h3>
                    <p class="text-xs text-gray-500">${car.brand} • ${car.year || 2023}</p>
                </div>
                
                <!-- Specs -->
                <div class="grid grid-cols-3 gap-1.5 mb-3 pb-3 border-b border-gray-100">
                    <div class="flex items-center gap-1 text-xs text-gray-600">
                        <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        <span class="text-xs">${car.mileage || '0 km'}</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs text-gray-600">
                        <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                        </svg>
                        <span class="text-xs">${car.transmission || 'Tự động'}</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs text-gray-600">
                        <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                        </svg>
                        <span class="text-xs">${car.fuel || 'Xăng'}</span>
                    </div>
                </div>
                
                <!-- Price & CTA -->
                <div class="flex items-center justify-between gap-2">
                    <div>
                        <p class="text-lg font-bold text-primary">${formatPrice(car.price)}</p>
                    </div>
                    <button onclick="viewCarDetail(${car.id})" class="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors text-xs whitespace-nowrap">
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderCarList(car) {
    const badge = getStatusBadge(car.status);
    
    return `
        <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div class="flex flex-col md:flex-row">
                <!-- Car Image -->
                <div class="relative md:w-80 h-56 overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                        src="${car.image}" 
                        alt="${car.name}"
                        class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onerror="this.src='https://via.placeholder.com/800x450?text=Car+Image'"
                    >
                    <!-- Status Badge -->
                    <div class="absolute top-3 right-3">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${badge.class} shadow-md backdrop-blur-sm">
                            ${badge.text}
                        </span>
                    </div>
                </div>
                
                <!-- Car Info -->
                <div class="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors">${car.name}</h3>
                        <p class="text-sm text-gray-500 mb-4">${car.brand} • ${car.year || 2023}</p>
                        
                        <!-- Specs -->
                        <div class="flex flex-wrap gap-4 mb-4">
                            <div class="flex items-center gap-2 text-sm text-gray-600">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                                <span>${car.mileage || '0 km'}</span>
                            </div>
                            <div class="flex items-center gap-2 text-sm text-gray-600">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                                </svg>
                                <span>${car.transmission || 'Tự động'}</span>
                            </div>
                            <div class="flex items-center gap-2 text-sm text-gray-600">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                                </svg>
                                <span>${car.fuel || 'Xăng'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Price & CTA -->
                    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                            <p class="text-3xl font-bold text-primary">${formatPrice(car.price)}</p>
                        </div>
                        <button onclick="viewCarDetail(${car.id})" class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// PAGINATION
// ===================================

function renderPagination() {
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Hide pagination if only 1 page or no results
    if (totalPages <= 1) {
        document.getElementById('pagination').classList.add('hidden');
        return;
    }
    
    document.getElementById('pagination').classList.remove('hidden');
    
    // Update prev/next buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Render page numbers
    let pagesHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            pagesHTML += `<button class="w-10 h-10 bg-primary text-white font-semibold rounded-lg">${i}</button>`;
        } else {
            pagesHTML += `<button onclick="goToPage(${i})" class="w-10 h-10 border-2 border-gray-300 hover:border-primary hover:text-primary rounded-lg transition-colors">${i}</button>`;
        }
    }
    
    pageNumbers.innerHTML = pagesHTML;
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);
    
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    
    renderCars();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToPage(page) {
    currentPage = page;
    renderCars();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// VIEW TOGGLE
// ===================================

function setView(view) {
    currentView = view;
    
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    
    if (view === 'grid') {
        gridBtn.classList.add('bg-white', 'shadow-sm');
        gridBtn.classList.remove('bg-transparent');
        listBtn.classList.remove('bg-white', 'shadow-sm');
        listBtn.classList.add('bg-transparent');
    } else {
        listBtn.classList.add('bg-white', 'shadow-sm');
        listBtn.classList.remove('bg-transparent');
        gridBtn.classList.remove('bg-white', 'shadow-sm');
        gridBtn.classList.add('bg-transparent');
    }
    
    renderCars();
}

// ===================================
// ACTIONS
// ===================================

function viewCarDetail(carId) {
    window.location.href = `car-detail.html?id=${carId}`;
}

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initial render
    updateResultCount();
    renderCars();
    renderPagination();
    
    // Header search
    document.getElementById('headerSearch').addEventListener('input', function(e) {
        document.getElementById('searchInput').value = e.target.value;
        applyFilters();
    });
    
    console.log('%c🚗 CarShop - Danh sách xe', 'color: #CB3634; font-size: 16px; font-weight: bold;');
    console.log(`Total cars: ${allCars.length}`);
});


// ===================================
// UI INTERACTIONS (FROM HOME)
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
    
    if (userDropdown && !userDropdown.contains(event.target)) {
        userMenu.classList.add('hidden');
    }
});
