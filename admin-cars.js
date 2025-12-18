/* ===================================
   CarShop Admin Cars Management JavaScript
   =================================== */

// ===================================
// Check Admin Authentication (DISABLED FOR DEVELOPMENT)
// ===================================
function checkAdminAuth() {
    // Auto-create admin session if not exists
    const userSession = sessionStorage.getItem('carshop_user');
    
    if (!userSession) {
        const adminUser = {
            email: 'admin@carshop.com',
            name: 'Admin User',
            role: 'ADMIN'
        };
        sessionStorage.setItem('carshop_user', JSON.stringify(adminUser));
        console.log('%c✅ Auto-login as admin (development mode)', 'color: #10B981; font-weight: bold;');
    }
    
    console.log('%c✅ Admin access granted', 'color: #10B981; font-weight: bold;');
    return true;
}

// ===================================
// Global Variables for Image Management
// ===================================
let addCarImages = []; // Array to store multiple images for add modal
let editCarImages = []; // Array to store multiple images for edit modal

// ===================================
// DEMO DATA - Cars
// ===================================
let carsData = [
    {
        id: 1,
        name: "Toyota Camry 2.5Q",
        brand: "Toyota",
        price: 1235000000,
        status: "available",
        images: [
            "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
            "https://images.unsplash.com/photo-1621007947084-c7f5c4a3f86f?w=800",
            "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80"
        ],
        year: 2022,
        createdAt: "2024-01-15"
    },
    {
        id: 2,
        name: "Honda Civic RS",
        brand: "Honda",
        price: 789000000,
        status: "available",
        images: [
            "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800",
            "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=90"
        ],
        year: 2023,
        createdAt: "2024-02-20"
    },
    {
        id: 3,
        name: "Mazda CX-5 Premium",
        brand: "Mazda",
        price: 979000000,
        status: "reserved",
        images: [
            "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800",
            "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=85",
            "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=75"
        ],
        year: 2023,
        createdAt: "2024-03-10"
    },
    {
        id: 4,
        name: "Hyundai Tucson",
        brand: "Hyundai",
        price: 799000000,
        status: "available",
        images: ["https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800"],
        year: 2022,
        createdAt: "2024-04-05"
    },
    {
        id: 5,
        name: "Ford Ranger Raptor",
        brand: "Ford",
        price: 1198000000,
        status: "available",
        images: [
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=90"
        ],
        year: 2023,
        createdAt: "2024-05-12"
    },
    {
        id: 6,
        name: "Mercedes-Benz C200",
        brand: "Mercedes",
        price: 1699000000,
        status: "sold",
        images: [
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=85",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=75",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=65"
        ],
        year: 2022,
        createdAt: "2024-06-18"
    },
    {
        id: 7,
        name: "BMW 320i",
        brand: "BMW",
        price: 1899000000,
        status: "available",
        images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"],
        year: 2023,
        createdAt: "2024-07-22"
    },
    {
        id: 8,
        name: "Kia Seltos",
        brand: "Kia",
        price: 689000000,
        status: "reserved",
        images: [
            "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800",
            "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80"
        ],
        year: 2023,
        createdAt: "2024-08-30"
    },
    {
        id: 9,
        name: "Vinfast VF8",
        brand: "Vinfast",
        price: 1050000000,
        status: "available",
        images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"],
        year: 2023,
        createdAt: "2024-09-14"
    },
    {
        id: 10,
        name: "Audi A4",
        brand: "Audi",
        price: 1799000000,
        status: "available",
        images: [
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=85"
        ],
        year: 2022,
        createdAt: "2024-10-08"
    },
    {
        id: 11,
        name: "Lexus ES 250",
        brand: "Lexus",
        price: 2690000000,
        status: "sold",
        images: ["https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800"],
        year: 2023,
        createdAt: "2024-11-02"
    },
    {
        id: 12,
        name: "Mitsubishi Xpander",
        brand: "Mitsubishi",
        price: 555000000,
        status: "available",
        images: ["https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800"],
        year: 2022,
        createdAt: "2024-12-01"
    }
];

// Store original data for search/filter
let filteredCars = [...carsData];

// ===================================
// Format Functions
// ===================================
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// ===================================
// Get Status Config
// ===================================
function getStatusConfig(status) {
    const configs = {
        available: {
            text: 'Còn xe',
            class: 'status-available'
        },
        reserved: {
            text: 'Đã đặt cọc',
            class: 'status-reserved'
        },
        sold: {
            text: 'Đã bán',
            class: 'status-sold'
        }
    };
    return configs[status] || configs.available;
}

// ===================================
// Render Cars Table
// ===================================
function renderCarsTable() {
    const tbody = document.getElementById('carsTableBody');
    
    if (filteredCars.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 60px 20px; color: #999999;">
                    <svg style="width: 48px; height: 48px; margin: 0 auto 16px; opacity: 0.3;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div style="font-size: 16px; font-weight: 600;">Không tìm thấy xe nào</div>
                    <div style="font-size: 14px; margin-top: 8px;">Thử tìm kiếm với từ khóa khác</div>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filteredCars.map(car => {
        const statusConfig = getStatusConfig(car.status);
        const mainImage = car.images && car.images.length > 0 ? car.images[0] : 'https://via.placeholder.com/80x60?text=No+Image';
        
        return `
            <tr>
                <td>
                    <img src="${mainImage}" alt="${car.name}" class="car-thumbnail">
                </td>
                <td style="font-weight: 600;">${car.name}</td>
                <td>${car.brand}</td>
                <td style="font-weight: 700; color: #CB3634;">${formatPrice(car.price)}</td>
                <td>
                    <span class="status-badge ${statusConfig.class}">
                        ${statusConfig.text}
                    </span>
                </td>
                <td style="color: #666666;">${formatDate(car.createdAt)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action view" onclick="openViewModal(${car.id})">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                            Xem
                        </button>
                        <button class="btn-action edit" onclick="openEditModal(${car.id})">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            Sửa
                        </button>
                        <button class="btn-action delete" onclick="deleteCar(${car.id})">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            Xóa
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ===================================
// Search Function
// ===================================
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredCars = [...carsData];
    } else {
        filteredCars = carsData.filter(car => {
            return car.name.toLowerCase().includes(searchTerm) || 
                   car.brand.toLowerCase().includes(searchTerm);
        });
    }
    
    console.log(`🔍 Search: "${searchTerm}" - Found ${filteredCars.length} cars`);
    renderCarsTable();
}

// ===================================
// View Modal
// ===================================
function openViewModal(carId) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return;
    
    const statusConfig = getStatusConfig(car.status);
    const images = car.images || [];
    
    const modalBody = document.getElementById('viewModalBody');
    modalBody.innerHTML = `
        <div class="form-group">
            <label class="form-label">Ảnh xe (${images.length} ảnh)</label>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; margin-top: 12px;">
                ${images.map((img, index) => `
                    <div style="position: relative; border: ${index === 0 ? '2px solid #CB3634' : '1px solid #E0E0E0'}; border-radius: 6px; overflow: hidden;">
                        <img src="${img}" alt="${car.name} - Ảnh ${index + 1}" style="width: 100%; height: 150px; object-fit: cover; cursor: pointer;" onclick="window.open('${img}', '_blank')">
                        ${index === 0 ? '<div style="position: absolute; top: 4px; left: 4px; background: #CB3634; color: #FFFFFF; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 3px;">ẢNH CHÍNH</div>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Tên xe</label>
            <div style="padding: 12px 16px; background: #F5F5F5; border-radius: 4px; font-weight: 600;">
                ${car.name}
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Hãng xe</label>
            <div style="padding: 12px 16px; background: #F5F5F5; border-radius: 4px;">
                ${car.brand}
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Năm sản xuất</label>
            <div style="padding: 12px 16px; background: #F5F5F5; border-radius: 4px;">
                ${car.year}
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Giá bán</label>
            <div style="padding: 12px 16px; background: #F5F5F5; border-radius: 4px; font-weight: 700; color: #CB3634; font-size: 18px;">
                ${formatPrice(car.price)}
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Trạng thái</label>
            <div style="padding: 12px 16px; background: #F5F5F5; border-radius: 4px;">
                <span class="status-badge ${statusConfig.class}">
                    ${statusConfig.text}
                </span>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Ngày tạo</label>
            <div style="padding: 12px 16px; background: #F5F5F5; border-radius: 4px;">
                ${formatDate(car.createdAt)}
            </div>
        </div>
    `;
    
    document.getElementById('viewModal').classList.add('active');
    console.log(`👁️  View car: ${car.name} (${images.length} images)`);
}

function closeViewModal() {
    document.getElementById('viewModal').classList.remove('active');
}

// ===================================
// Edit Modal
// ===================================
function openEditModal(carId) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return;
    
    document.getElementById('editCarId').value = car.id;
    document.getElementById('editCarName').value = car.name;
    document.getElementById('editCarBrand').value = car.brand;
    document.getElementById('editCarYear').value = car.year;
    document.getElementById('editCarPrice').value = car.price;
    document.getElementById('editCarStatus').value = car.status;
    
    // Load current images into gallery
    editCarImages = car.images && car.images.length > 0 ? [...car.images] : [];
    renderEditImageGallery();
    
    document.getElementById('editModal').classList.add('active');
    console.log(`✏️  Edit car: ${car.name} (${editCarImages.length} images)`);
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    document.getElementById('editForm').reset();
    editCarImages = []; // Clear images
    renderEditImageGallery();
}

function saveEdit() {
    const carId = parseInt(document.getElementById('editCarId').value);
    const name = document.getElementById('editCarName').value.trim();
    const brand = document.getElementById('editCarBrand').value.trim();
    const year = parseInt(document.getElementById('editCarYear').value);
    const price = parseInt(document.getElementById('editCarPrice').value);
    const status = document.getElementById('editCarStatus').value;
    
    // Validation
    if (!name || !brand || !year || !price || price <= 0) {
        alert('❌ Vui lòng điền đầy đủ thông tin hợp lệ!');
        return;
    }
    
    if (year < 2000 || year > 2025) {
        alert('❌ Năm sản xuất không hợp lệ! (2000-2025)');
        return;
    }
    
    if (editCarImages.length === 0) {
        alert('❌ Vui lòng thêm ít nhất 1 ảnh!');
        return;
    }
    
    // Find and update car
    const carIndex = carsData.findIndex(c => c.id === carId);
    if (carIndex === -1) {
        alert('❌ Không tìm thấy xe!');
        return;
    }
    
    const oldCar = {...carsData[carIndex]};
    
    carsData[carIndex] = {
        ...carsData[carIndex],
        name,
        brand,
        year,
        price,
        images: [...editCarImages],
        status
    };
    
    console.log('%c✅ Car updated successfully!', 'color: #10B981; font-weight: bold;');
    console.log('Old data:', oldCar);
    console.log('New data:', carsData[carIndex]);
    
    // Update filtered cars
    filteredCars = [...carsData];
    
    // Re-render table
    renderCarsTable();
    
    // Close modal
    closeEditModal();
    
    alert(`✅ Cập nhật xe thành công!\n\nXe: ${name}\nHãng: ${brand}\nNăm: ${year}\nGiá: ${formatPrice(price)}\nSố ảnh: ${editCarImages.length}\nTrạng thái: ${getStatusConfig(status).text}`);
}

// ===================================
// Delete Car
// ===================================
async function deleteCar(carId) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return;
    
    const statusConfig = getStatusConfig(car.status);
    const imageCount = car.images ? car.images.length : 0;
    
    // Detailed confirmation message with HTML formatting
    const confirmMessage = `
        <div style="background: #FEF2F2; border-left: 4px solid #DC2626; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
            <div style="font-weight: 700; color: #991B1B; margin-bottom: 8px; font-size: 15px;">⚠️ CẢNH BÁO</div>
            <div style="color: #7F1D1D; font-size: 13px; line-height: 1.6;">
                • Hành động này <strong>KHÔNG THỂ HOÀN TÁC</strong><br>
                • Tất cả dữ liệu xe sẽ bị xóa vĩnh viễn<br>
                • Bao gồm <strong>${imageCount} ảnh</strong> đã upload
            </div>
        </div>
        
        <div style="background: #F5F5F5; padding: 16px; border-radius: 4px; border: 1px solid #E0E0E0;">
            <div style="font-weight: 700; color: #1A1A1A; margin-bottom: 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">📋 Thông tin xe</div>
            <table style="width: 100%; font-size: 13px;">
                <tr style="border-bottom: 1px solid #E0E0E0;">
                    <td style="padding: 8px 0; color: #666666; font-weight: 600;">Tên xe:</td>
                    <td style="padding: 8px 0; color: #1A1A1A; font-weight: 700;">${car.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E0E0E0;">
                    <td style="padding: 8px 0; color: #666666; font-weight: 600;">Hãng:</td>
                    <td style="padding: 8px 0; color: #1A1A1A;">${car.brand}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E0E0E0;">
                    <td style="padding: 8px 0; color: #666666; font-weight: 600;">Năm SX:</td>
                    <td style="padding: 8px 0; color: #1A1A1A;">${car.year}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E0E0E0;">
                    <td style="padding: 8px 0; color: #666666; font-weight: 600;">Giá bán:</td>
                    <td style="padding: 8px 0; color: #CB3634; font-weight: 700;">${formatPrice(car.price)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E0E0E0;">
                    <td style="padding: 8px 0; color: #666666; font-weight: 600;">Trạng thái:</td>
                    <td style="padding: 8px 0;"><span class="status-badge ${statusConfig.class}">${statusConfig.text}</span></td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #666666; font-weight: 600;">Số ảnh:</td>
                    <td style="padding: 8px 0; color: #1A1A1A;">${imageCount} ảnh</td>
                </tr>
            </table>
        </div>
    `;
    
    const confirmed = await showCustomConfirm('XÁC NHẬN XÓA XE', confirmMessage);
    
    if (!confirmed) {
        console.log('❌ Delete cancelled by user');
        return;
    }
    
    // Remove from data
    const oldLength = carsData.length;
    carsData = carsData.filter(c => c.id !== carId);
    filteredCars = filteredCars.filter(c => c.id !== carId);
    
    console.log('%c🗑️  Car deleted successfully!', 'color: #EF4444; font-weight: bold;');
    console.log('Deleted car:', car);
    console.log(`Total cars: ${oldLength} → ${carsData.length}`);
    
    // Re-render table
    renderCarsTable();
    
    // Success message with HTML formatting
    const successMessage = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 64px; height: 64px; background: #DCFCE7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                <svg style="width: 32px; height: 32px; color: #16A34A;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
            </div>
            <div style="font-size: 18px; font-weight: 700; color: #166534; margin-bottom: 8px;">Đã xóa xe thành công!</div>
        </div>
        
        <div style="background: #F5F5F5; padding: 16px; border-radius: 4px; border: 1px solid #E0E0E0; margin-bottom: 16px;">
            <div style="font-weight: 700; color: #1A1A1A; margin-bottom: 8px; font-size: 13px;">Xe đã xóa:</div>
            <div style="font-size: 15px; font-weight: 700; color: #CB3634; margin-bottom: 4px;">${car.name}</div>
            <div style="font-size: 13px; color: #666666;">
                ${car.brand} • ${car.year} • ${formatPrice(car.price)}
            </div>
        </div>
        
        <div style="background: #FFFBEB; border: 1px solid #FDE68A; padding: 12px; border-radius: 4px;">
            <div style="font-size: 13px; color: #92400E; display: flex; align-items: center; gap: 8px;">
                <svg style="width: 16px; height: 16px;" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
                <span><strong>Tổng số xe còn lại:</strong> ${carsData.length} xe</span>
            </div>
        </div>
    `;
    
    showCustomAlert('Xóa xe thành công', successMessage, 'success');
}

// ===================================
// Add Car Modal
// ===================================
function openAddModal() {
    addCarImages = []; // Reset images array
    renderAddImageGallery();
    document.getElementById('addModal').classList.add('active');
    console.log('➕ Opening add car modal');
}

function closeAddModal() {
    document.getElementById('addModal').classList.remove('active');
    document.getElementById('addForm').reset();
    addCarImages = []; // Clear images
    renderAddImageGallery();
}

function saveAdd() {
    const name = document.getElementById('addCarName').value.trim();
    const brand = document.getElementById('addCarBrand').value.trim();
    const year = parseInt(document.getElementById('addCarYear').value);
    const price = parseInt(document.getElementById('addCarPrice').value);
    const status = document.getElementById('addCarStatus').value;
    
    // Validation
    if (!name || !brand || !year || !price) {
        alert('❌ Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    if (year < 2000 || year > 2025) {
        alert('❌ Năm sản xuất không hợp lệ! (2000-2025)');
        return;
    }
    
    if (price <= 0) {
        alert('❌ Giá bán phải lớn hơn 0!');
        return;
    }
    
    if (addCarImages.length === 0) {
        alert('❌ Vui lòng thêm ít nhất 1 ảnh!');
        return;
    }
    
    // Generate new ID
    const newId = Math.max(...carsData.map(c => c.id)) + 1;
    
    // Create new car
    const newCar = {
        id: newId,
        name,
        brand,
        year,
        price,
        images: [...addCarImages],
        status,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Add to data
    carsData.push(newCar);
    filteredCars = [...carsData];
    
    console.log('%c✅ Car added successfully!', 'color: #10B981; font-weight: bold;');
    console.log('New car:', newCar);
    console.log('Total cars:', carsData.length);
    
    // Re-render table
    renderCarsTable();
    
    // Close modal
    closeAddModal();
    
    alert(`✅ Thêm xe mới thành công!\n\nXe: ${name}\nHãng: ${brand}\nNăm: ${year}\nGiá: ${formatPrice(price)}\nSố ảnh: ${addCarImages.length}\nTrạng thái: ${getStatusConfig(status).text}\n\nTổng số xe: ${carsData.length}`);
}

// ===================================
// Logout Function
// ===================================
function handleLogout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        console.log('%c🚪 Logging out...', 'color: #EF4444; font-weight: bold;');
        
        // Clear session
        sessionStorage.removeItem('carshop_user');
        
        // Redirect to login
        window.location.href = 'carshop-auth/login.html';
    }
}

// ===================================
// Initialize
// ===================================
function initCarsManagement() {
    console.log('%c🚗 CarShop Admin - Quản lý xe', 'color: #CB3634; font-size: 18px; font-weight: bold;');
    console.log('═════════════════════════════════════');
    console.log(`📊 Total cars: ${carsData.length}`);
    console.log(`   • Available: ${carsData.filter(c => c.status === 'available').length}`);
    console.log(`   • Reserved: ${carsData.filter(c => c.status === 'reserved').length}`);
    console.log(`   • Sold: ${carsData.filter(c => c.status === 'sold').length}`);
    console.log('═════════════════════════════════════');
    
    // Render table
    renderCarsTable();
    
    console.log('✅ Cars management loaded successfully!');
}

// ===================================
// Image Gallery Management - ADD MODAL
// ===================================
function handleAddImageUpload(event) {
    const files = event.target.files;
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                addCarImages.push(e.target.result);
                renderAddImageGallery();
            };
            reader.readAsDataURL(file);
        }
    }
}

function addImageFromUrl() {
    const url = document.getElementById('addCarImageUrl').value.trim();
    
    if (!url) {
        alert('❌ Vui lòng nhập URL ảnh!');
        return;
    }
    
    // Test if URL is valid image
    const img = new Image();
    img.onload = function() {
        addCarImages.push(url);
        renderAddImageGallery();
        document.getElementById('addCarImageUrl').value = '';
        console.log('✅ Image added from URL');
    };
    img.onerror = function() {
        alert('❌ Không thể tải ảnh từ URL này!');
    };
    img.src = url;
}

function renderAddImageGallery() {
    const gallery = document.getElementById('addImageGallery');
    const hiddenInput = document.getElementById('addCarImage');
    
    if (addCarImages.length === 0) {
        gallery.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 20px; color: #999999; font-size: 14px;">Chưa có ảnh nào</div>';
        hiddenInput.value = '';
        return;
    }
    
    gallery.innerHTML = addCarImages.map((img, index) => `
        <div style="position: relative; border: ${index === 0 ? '2px solid #CB3634' : '1px solid #E0E0E0'}; border-radius: 6px; overflow: hidden;">
            <img src="${img}" style="width: 100%; height: 120px; object-fit: cover;">
            ${index === 0 ? '<div style="position: absolute; top: 4px; left: 4px; background: #CB3634; color: #FFFFFF; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 3px;">CHÍNH</div>' : ''}
            <div style="position: absolute; top: 4px; right: 4px; display: flex; gap: 4px;">
                ${index !== 0 ? `<button type="button" onclick="setAddMainImage(${index})" style="width: 24px; height: 24px; background: #FFFFFF; border: none; border-radius: 3px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Đặt làm ảnh chính">
                    <svg style="width: 14px; height: 14px; color: #CB3634;" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                </button>` : ''}
                <button type="button" onclick="removeAddImage(${index})" style="width: 24px; height: 24px; background: #EF4444; border: none; border-radius: 3px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Xóa ảnh">
                    <svg style="width: 14px; height: 14px; color: #FFFFFF;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
    
    // Update hidden input with first image (main image)
    hiddenInput.value = addCarImages[0] || '';
}

function setAddMainImage(index) {
    const temp = addCarImages[index];
    addCarImages.splice(index, 1);
    addCarImages.unshift(temp);
    renderAddImageGallery();
    console.log('⭐ Main image updated');
}

function removeAddImage(index) {
    addCarImages.splice(index, 1);
    renderAddImageGallery();
    console.log('🗑️  Image removed');
}

// ===================================
// Image Gallery Management - EDIT MODAL
// ===================================
function handleEditImageUpload(event) {
    const files = event.target.files;
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                editCarImages.push(e.target.result);
                renderEditImageGallery();
            };
            reader.readAsDataURL(file);
        }
    }
}

function editAddImageFromUrl() {
    const url = document.getElementById('editCarImageUrl').value.trim();
    
    if (!url) {
        alert('❌ Vui lòng nhập URL ảnh!');
        return;
    }
    
    // Test if URL is valid image
    const img = new Image();
    img.onload = function() {
        editCarImages.push(url);
        renderEditImageGallery();
        document.getElementById('editCarImageUrl').value = '';
        console.log('✅ Image added from URL');
    };
    img.onerror = function() {
        alert('❌ Không thể tải ảnh từ URL này!');
    };
    img.src = url;
}

function renderEditImageGallery() {
    const gallery = document.getElementById('editImageGallery');
    const hiddenInput = document.getElementById('editCarImage');
    
    if (editCarImages.length === 0) {
        gallery.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 20px; color: #999999; font-size: 14px;">Chưa có ảnh nào</div>';
        hiddenInput.value = '';
        return;
    }
    
    gallery.innerHTML = editCarImages.map((img, index) => `
        <div style="position: relative; border: ${index === 0 ? '2px solid #CB3634' : '1px solid #E0E0E0'}; border-radius: 6px; overflow: hidden;">
            <img src="${img}" style="width: 100%; height: 120px; object-fit: cover;">
            ${index === 0 ? '<div style="position: absolute; top: 4px; left: 4px; background: #CB3634; color: #FFFFFF; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 3px;">CHÍNH</div>' : ''}
            <div style="position: absolute; top: 4px; right: 4px; display: flex; gap: 4px;">
                ${index !== 0 ? `<button type="button" onclick="setEditMainImage(${index})" style="width: 24px; height: 24px; background: #FFFFFF; border: none; border-radius: 3px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Đặt làm ảnh chính">
                    <svg style="width: 14px; height: 14px; color: #CB3634;" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                </button>` : ''}
                <button type="button" onclick="removeEditImage(${index})" style="width: 24px; height: 24px; background: #EF4444; border: none; border-radius: 3px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Xóa ảnh">
                    <svg style="width: 14px; height: 14px; color: #FFFFFF;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
    
    // Update hidden input with first image (main image)
    hiddenInput.value = editCarImages[0] || '';
}

function setEditMainImage(index) {
    const temp = editCarImages[index];
    editCarImages.splice(index, 1);
    editCarImages.unshift(temp);
    renderEditImageGallery();
    console.log('⭐ Main image updated');
}

function removeEditImage(index) {
    editCarImages.splice(index, 1);
    renderEditImageGallery();
    console.log('🗑️  Image removed');
}

// ===================================
// Custom Confirm Modal
// ===================================
let confirmCallback = null;

function showCustomConfirm(title, message) {
    return new Promise((resolve) => {
        confirmCallback = resolve;
        document.getElementById('customConfirmTitle').textContent = title;
        document.getElementById('customConfirmMessage').innerHTML = message;
        document.getElementById('customConfirmModal').classList.add('active');
    });
}

function closeCustomConfirm(result) {
    document.getElementById('customConfirmModal').classList.remove('active');
    if (confirmCallback) {
        confirmCallback(result);
        confirmCallback = null;
    }
}

// ===================================
// Custom Alert Modal
// ===================================
function showCustomAlert(title, message, type = 'success') {
    const modal = document.getElementById('customAlertModal');
    const header = document.getElementById('customAlertHeader');
    const titleEl = document.getElementById('customAlertTitleText');
    const icon = document.getElementById('customAlertIcon');
    const messageEl = document.getElementById('customAlertMessage');
    
    titleEl.textContent = title;
    messageEl.innerHTML = message;
    
    // Style based on type
    if (type === 'success') {
        header.style.background = '#F0FDF4';
        header.style.borderBottom = '2px solid #86EFAC';
        titleEl.style.color = '#166534';
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>';
        icon.style.color = '#16A34A';
    } else if (type === 'error') {
        header.style.background = '#FEF2F2';
        header.style.borderBottom = '2px solid #FCA5A5';
        titleEl.style.color = '#991B1B';
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        icon.style.color = '#DC2626';
    } else if (type === 'warning') {
        header.style.background = '#FFFBEB';
        header.style.borderBottom = '2px solid #FCD34D';
        titleEl.style.color = '#92400E';
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>';
        icon.style.color = '#F59E0B';
    }
    
    modal.classList.add('active');
}

function closeCustomAlert() {
    document.getElementById('customAlertModal').classList.remove('active');
}

// ===================================
// Initialize on page load
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    if (!checkAdminAuth()) {
        return;
    }
    
    // Initialize cars management
    initCarsManagement();
});
