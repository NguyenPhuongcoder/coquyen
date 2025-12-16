/* ===================================
   CarShop Car Detail JavaScript
   =================================== */

// DEMO DATA - All Cars
const allCars = [
    {
        id: 1,
        name: 'Toyota Camry 2.5Q',
        brand: 'Toyota',
        price: 1235000000,
        status: 'available',
        year: 2023,
        mileage: '15,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng',
        seats: 5,
        color: 'Trắng ngọc trai',
        interiorColor: 'Nâu da bò',
        origin: 'Nhập khẩu Thái Lan',
        images: [
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=90',
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=70'
        ],
        description: 'Toyota Camry 2.5Q là mẫu sedan hạng D cao cấp với thiết kế sang trọng, động cơ mạnh mẽ và tiết kiệm nhiên liệu. Xe được trang bị đầy đủ các tính năng an toàn và tiện nghi hiện đại.',
        features: [
            'Hệ thống phanh ABS, EBD, BA',
            'Túi khí an toàn 7 túi',
            'Camera lùi + Cảm biến lùi',
            'Màn hình cảm ứng 9 inch',
            'Điều hòa tự động 2 vùng',
            'Ghế da cao cấp',
            'Cửa sổ trời Panorama',
            'Hệ thống âm thanh JBL'
        ]
    },
    {
        id: 2,
        name: 'Honda Civic RS',
        brand: 'Honda',
        price: 789000000,
        status: 'scheduled',
        year: 2024,
        mileage: '5,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng',
        seats: 5,
        color: 'Đỏ thể thao',
        interiorColor: 'Đen',
        origin: 'Nhập khẩu Thái Lan',
        images: [
            'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
            'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=90',
            'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
            'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=70'
        ],
        description: 'Honda Civic RS thế hệ mới với thiết kế thể thao, năng động. Động cơ 1.5L Turbo mạnh mẽ, tiết kiệm nhiên liệu. Nội thất hiện đại với công nghệ Honda Sensing.',
        features: [
            'Honda Sensing - An toàn chủ động',
            'Động cơ 1.5L VTEC Turbo',
            'Màn hình HUD',
            'Sạc không dây',
            'Ghế lái chỉnh điện 8 hướng',
            'Đèn LED toàn bộ',
            'Phanh tay điện tử',
            'Cruise Control thích ứng'
        ]
    },
    {
        id: 3,
        name: 'Mazda CX-5 Premium',
        brand: 'Mazda',
        price: 979000000,
        status: 'available',
        year: 2023,
        mileage: '8,500 km',
        transmission: 'Tự động',
        fuel: 'Xăng',
        seats: 5,
        color: 'Xanh đen',
        interiorColor: 'Đen',
        origin: 'Nhập khẩu Nhật Bản',
        images: [
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=90',
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=70'
        ],
        description: 'Mazda CX-5 Premium với công nghệ SkyActiv tiên tiến, thiết kế Kodo đẳng cấp. Xe SUV 5 chỗ hoàn hảo cho gia đình với không gian rộng rãi và tính năng an toàn vượt trội.',
        features: [
            'Hệ thống i-Activsense',
            'Màn hình HUD màu',
            'Ghế da Nappa cao cấp',
            'Hệ thống âm thanh Bose 10 loa',
            'Cửa sổ trời điện',
            'Đèn LED thích ứng',
            'Kiểm soát hành trình radar',
            'Cảnh báo điểm mù BSM'
        ]
    },
    {
        id: 4,
        name: 'Hyundai Tucson',
        brand: 'Hyundai',
        price: 865000000,
        status: 'deposited',
        year: 2023,
        mileage: '12,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng',
        seats: 5,
        color: 'Bạc',
        interiorColor: 'Đen',
        origin: 'Lắp ráp trong nước',
        images: [
            'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800',
            'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=90',
            'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80',
            'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=70'
        ],
        description: 'Hyundai Tucson thế hệ mới với thiết kế tương lai, công nghệ hiện đại. SUV 5 chỗ đa dụng với không gian nội thất rộng rãi và tiện nghi cao cấp.',
        features: [
            'SmartSense - An toàn thông minh',
            'Màn hình kép 10.25 inch',
            'Chìa khóa thông minh',
            'Khởi động từ xa',
            'Điều hòa tự động 2 vùng',
            'Cửa cốp điện',
            'Đèn LED Parametric',
            'Sạc điện thoại không dây'
        ]
    },
    {
        id: 5,
        name: 'Ford Ranger Raptor',
        brand: 'Ford',
        price: 1198000000,
        status: 'available',
        year: 2023,
        mileage: '10,000 km',
        transmission: 'Tự động',
        fuel: 'Dầu',
        seats: 5,
        color: 'Xanh dương',
        interiorColor: 'Đen',
        origin: 'Nhập khẩu Thái Lan',
        images: [
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=90',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=70'
        ],
        description: 'Ford Ranger Raptor - Chiếc bán tải hiệu suất cao với động cơ V6 mạnh mẽ, hệ thống treo FOX Racing, thiết kế thể thao đầy uy lực. Hoàn hảo cho địa hình off-road.',
        features: [
            'Động cơ V6 3.0L Bi-Turbo',
            'Hệ thống treo FOX Racing',
            'Chế độ lái địa hình',
            'Màn hình SYNC 4A 12 inch',
            'Camera 360 độ',
            'Ghế Recaro thể thao',
            'Hệ thống âm thanh B&O',
            'Cruise Control thích ứng'
        ]
    },
    {
        id: 6,
        name: 'Mercedes-Benz C200',
        brand: 'Mercedes',
        price: 1699000000,
        status: 'available',
        year: 2019,
        mileage: '45,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng',
        seats: 5,
        color: 'Đen',
        interiorColor: 'Kem',
        origin: 'Nhập khẩu Đức',
        images: [
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=90',
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=70'
        ],
        description: 'Mercedes-Benz C200 - Biểu tượng của sự sang trọng và đẳng cấp. Thiết kế tinh tế, nội thất cao cấp với chất liệu da Artico, công nghệ MBUX thông minh.',
        features: [
            'Hệ thống MBUX thông minh',
            'Màn hình cảm ứng 10.25 inch',
            'Ghế da Artico cao cấp',
            'Hệ thống âm thanh Burmester',
            'Đèn LED Multibeam',
            'Cửa sổ trời Panorama',
            'Hệ thống treo Agility Control',
            'Chìa khóa thông minh Keyless-Go'
        ]
    },
    {
        id: 7,
        name: 'Toyota Vios G',
        brand: 'Toyota',
        price: 545000000,
        status: 'scheduled',
        year: 2024,
        mileage: '2,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng',
        seats: 5,
        color: 'Trắng',
        interiorColor: 'Đen',
        origin: 'Lắp ráp trong nước',
        images: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=90',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=70'
        ],
        description: 'Toyota Vios G - Sedan hạng B bán chạy nhất Việt Nam. Thiết kế trẻ trung, vận hành êm ái, tiết kiệm nhiên liệu. Lựa chọn hoàn hảo cho gia đình trẻ.',
        features: [
            'Động cơ 1.5L Dual VVT-i',
            'Hệ thống phanh ABS, EBD, BA',
            'Túi khí an toàn 7 túi',
            'Màn hình cảm ứng 7 inch',
            'Camera lùi',
            'Cảm biến lùi',
            'Chìa khóa thông minh',
            'Khởi động bằng nút bấm'
        ]
    },
    {
        id: 8,
        name: 'Honda CR-V L',
        brand: 'Honda',
        price: 1105000000,
        status: 'available',
        year: 2023,
        mileage: '18,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng',
        seats: 7,
        color: 'Xám',
        interiorColor: 'Đen',
        origin: 'Nhập khẩu Thái Lan',
        images: [
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=90',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=70'
        ],
        description: 'Honda CR-V L - SUV 7 chỗ cao cấp với không gian rộng rãi, công nghệ Honda Sensing tiên tiến. Động cơ 1.5L Turbo mạnh mẽ, tiết kiệm nhiên liệu.',
        features: [
            'Honda Sensing - An toàn chủ động',
            'Động cơ 1.5L VTEC Turbo',
            'Màn hình cảm ứng 7 inch',
            'Camera 360 độ',
            'Cửa sổ trời Panorama',
            'Ghế da cao cấp',
            'Điều hòa tự động 2 vùng',
            'Phanh tay điện tử'
        ]
    },
    {
        id: 9,
        name: 'Mazda 3 Premium',
        brand: 'Mazda',
        price: 769000000,
        status: 'available',
        year: 2024,
        mileage: '3,500 km',
        transmission: 'Tự động',
        fuel: 'Xăng',
        seats: 5,
        color: 'Đỏ Soul',
        interiorColor: 'Đen',
        origin: 'Nhập khẩu Thái Lan',
        images: [
            'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
            'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=90',
            'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
            'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=70'
        ],
        description: 'Mazda 3 Premium - Sedan hạng C với thiết kế Kodo đẳng cấp, công nghệ SkyActiv tiên tiến. Trải nghiệm lái thể thao, nội thất sang trọng.',
        features: [
            'Hệ thống i-Activsense',
            'Màn hình HUD màu',
            'Ghế da cao cấp',
            'Hệ thống âm thanh Bose 12 loa',
            'Đèn LED thích ứng',
            'Cửa sổ trời điện',
            'Cruise Control thích ứng',
            'Cảnh báo điểm mù BSM'
        ]
    },
    {
        id: 10,
        name: 'Hyundai Accent',
        brand: 'Hyundai',
        price: 499000000,
        status: 'deposited',
        year: 2023,
        mileage: '20,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng',
        seats: 5,
        color: 'Bạc',
        interiorColor: 'Đen',
        origin: 'Lắp ráp trong nước',
        images: [
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=90',
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=70'
        ],
        description: 'Hyundai Accent - Sedan hạng B với thiết kế hiện đại, tiết kiệm nhiên liệu. Trang bị đầy đủ tiện nghi, giá cả phải chăng.',
        features: [
            'Động cơ 1.5L Smartstream',
            'Hệ thống phanh ABS, EBD',
            'Túi khí an toàn 6 túi',
            'Màn hình cảm ứng 8 inch',
            'Camera lùi',
            'Cảm biến lùi',
            'Điều hòa tự động',
            'Chìa khóa thông minh'
        ]
    },
    {
        id: 11,
        name: 'Ford Everest Titanium',
        brand: 'Ford',
        price: 1399000000,
        status: 'available',
        year: 2023,
        mileage: '15,500 km',
        transmission: 'Tự động',
        fuel: 'Dầu',
        seats: 7,
        color: 'Đen',
        interiorColor: 'Nâu',
        origin: 'Nhập khẩu Thái Lan',
        images: [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=90',
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=70'
        ],
        description: 'Ford Everest Titanium - SUV 7 chỗ cao cấp với khả năng vận hành mạnh mẽ, nội thất sang trọng. Động cơ diesel 2.0L Bi-Turbo tiết kiệm nhiên liệu.',
        features: [
            'Động cơ 2.0L Bi-Turbo Diesel',
            'Hệ thống dẫn động 4WD',
            'Màn hình SYNC 3 - 8 inch',
            'Camera 360 độ',
            'Cửa cốp điện',
            'Ghế da cao cấp',
            'Điều hòa tự động 3 vùng',
            'Hệ thống âm thanh B&O'
        ]
    },
    {
        id: 12,
        name: 'Mercedes-Benz E200',
        brand: 'Mercedes',
        price: 2299000000,
        status: 'scheduled',
        year: 2022,
        mileage: '25,000 km',
        transmission: 'Tự động',
        fuel: 'Xăng',
        seats: 5,
        color: 'Trắng',
        interiorColor: 'Đen',
        origin: 'Nhập khẩu Đức',
        images: [
            'https://images.unsplash.com/photo-1617531653520-bd466e4e2b5e?w=800',
            'https://images.unsplash.com/photo-1617531653520-bd466e4e2b5e?w=800&q=90',
            'https://images.unsplash.com/photo-1617531653520-bd466e4e2b5e?w=800&q=80',
            'https://images.unsplash.com/photo-1617531653520-bd466e4e2b5e?w=800&q=70'
        ],
        description: 'Mercedes-Benz E200 - Sedan hạng sang với thiết kế đẳng cấp, công nghệ hiện đại. Nội thất xa hoa với chất liệu cao cấp, trải nghiệm lái êm ái.',
        features: [
            'Hệ thống MBUX thế hệ mới',
            'Màn hình kép 12.3 inch',
            'Ghế da Nappa massage',
            'Hệ thống âm thanh Burmester 3D',
            'Đèn LED Digital Light',
            'Cửa sổ trời Panorama',
            'Hệ thống treo Air Body Control',
            'Gói an toàn PRE-SAFE'
        ]
    }
];

// STATE
let currentCar = null;
let currentImageIndex = 0;
let isFavorite = false;

// Get car ID from URL
function getCarIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price);
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

// Load car details
function loadCarDetails() {
    const carId = getCarIdFromURL();
    currentCar = allCars.find(car => car.id === carId);
    
    if (!currentCar) {
        alert('Không tìm thấy xe!');
        window.location.href = 'cars.html';
        return;
    }
    
    // Update page title
    document.title = `${currentCar.name} - CarShop`;
    
    // Breadcrumb
    document.getElementById('breadcrumbCarName').textContent = currentCar.name;
    
    // Main image
    document.getElementById('mainImage').src = currentCar.images[0];
    document.getElementById('mainImage').alt = currentCar.name;
    
    // Status badge
    const badge = getStatusBadge(currentCar.status);
    const statusBadge = document.getElementById('statusBadge');
    statusBadge.innerHTML = badge.text;
    statusBadge.className = `px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${badge.class}`;
    
    // Thumbnails
    renderThumbnails();
    
    // Car info
    document.getElementById('carName').textContent = currentCar.name;
    document.getElementById('carBrand').textContent = currentCar.brand;
    document.getElementById('carPrice').textContent = formatPrice(currentCar.price);
    document.getElementById('carYear').textContent = currentCar.year;
    document.getElementById('carMileage').textContent = currentCar.mileage;
    document.getElementById('carTransmission').textContent = currentCar.transmission;
    document.getElementById('carFuel').textContent = currentCar.fuel;
    
    // Specs
    document.getElementById('specBrand').textContent = currentCar.brand;
    document.getElementById('specModel').textContent = currentCar.name;
    document.getElementById('specYear').textContent = currentCar.year;
    document.getElementById('specOrigin').textContent = currentCar.origin;
    document.getElementById('specMileage').textContent = currentCar.mileage;
    document.getElementById('specTransmission').textContent = currentCar.transmission;
    document.getElementById('specFuel').textContent = currentCar.fuel;
    document.getElementById('specSeats').textContent = `${currentCar.seats} chỗ`;
    document.getElementById('specColor').textContent = currentCar.color;
    document.getElementById('specInteriorColor').textContent = currentCar.interiorColor;
    
    // Description
    document.getElementById('carDescription').innerHTML = `<p>${currentCar.description}</p>`;
    
    // Features
    renderFeatures();
    
    // Calculate loan
    calculateLoan();
    
    // Render similar cars
    renderSimilarCars();
}

// Render thumbnails
function renderThumbnails() {
    const gallery = document.getElementById('thumbnailGallery');
    gallery.innerHTML = currentCar.images.map((img, index) => `
        <div 
            onclick="selectImage(${index})"
            class="cursor-pointer rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-primary' : 'border-gray-200'} hover:border-primary transition-all"
        >
            <img src="${img}" alt="Thumbnail ${index + 1}" class="w-full h-20 object-cover">
        </div>
    `).join('');
}

// Select image
function selectImage(index) {
    currentImageIndex = index;
    document.getElementById('mainImage').src = currentCar.images[index];
    renderThumbnails();
}

// Next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentCar.images.length;
    selectImage(currentImageIndex);
}

// Previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentCar.images.length) % currentCar.images.length;
    selectImage(currentImageIndex);
}

// Render features
function renderFeatures() {
    const featuresContainer = document.getElementById('carFeatures');
    featuresContainer.innerHTML = currentCar.features.map(feature => `
        <div class="flex items-center gap-2 text-gray-700">
            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-sm">${feature}</span>
        </div>
    `).join('');
}

// Calculate loan
function calculateLoan() {
    if (!currentCar) return;
    
    const price = currentCar.price;
    const downPaymentPercent = parseInt(document.getElementById('downPaymentSlider').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const interestRate = 0.08; // 8% per year
    
    const downPayment = price * (downPaymentPercent / 100);
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    document.getElementById('downPaymentPercent').textContent = `${downPaymentPercent}%`;
    document.getElementById('downPaymentAmount').textContent = formatPrice(downPayment) + ' VNĐ';
    document.getElementById('loanAmount').textContent = formatPrice(loanAmount) + ' VNĐ';
    document.getElementById('monthlyPayment').textContent = formatPrice(Math.round(monthlyPayment)) + ' VNĐ';
}

// Toggle favorite
function toggleFavorite() {
    isFavorite = !isFavorite;
    const icon = document.getElementById('favoriteIcon');
    
    if (isFavorite) {
        icon.classList.remove('text-gray-400');
        icon.classList.add('text-red-500', 'fill-current');
    } else {
        icon.classList.remove('text-red-500', 'fill-current');
        icon.classList.add('text-gray-400');
    }
}

// Render similar cars
function renderSimilarCars() {
    const similarCarsContainer = document.getElementById('similarCars');
    const similarCars = allCars
        .filter(car => car.id !== currentCar.id && car.brand === currentCar.brand)
        .slice(0, 4);
    
    if (similarCars.length === 0) {
        similarCarsContainer.innerHTML = '<p class="text-gray-500 col-span-full text-center py-8">Không có xe tương tự</p>';
        return;
    }
    
    similarCarsContainer.innerHTML = similarCars.map(car => {
        const badge = getStatusBadge(car.status);
        return `
            <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer" onclick="viewCarDetail(${car.id})">
                <div class="relative h-48 overflow-hidden">
                    <img src="${car.images[0]}" alt="${car.name}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300">
                    <div class="absolute top-3 right-3">
                        <span class="px-3 py-1 rounded-full text-xs font-semibold ${badge.class}">
                            ${badge.text}
                        </span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-bold text-gray-900 mb-1 line-clamp-1">${car.name}</h3>
                    <p class="text-sm text-gray-600 mb-3">${car.brand}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-xl font-bold text-primary">${formatPrice(car.price)} VNĐ</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// View car detail
function viewCarDetail(carId) {
    window.location.href = `car-detail.html?id=${carId}`;
}

// Contact actions
function callSeller() {
    alert('Gọi điện: 1900 xxxx\n\nChức năng này sẽ được triển khai trong phiên bản tiếp theo.');
}

function sendMessage() {
    alert(`Nhắn tin về xe: ${currentCar.name}\n\nChức năng này sẽ được triển khai trong phiên bản tiếp theo.`);
}

function bookTestDrive() {
    window.location.href = `booking.html?carId=${currentCar.id}`;
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
    loadCarDetails();
    
    console.log('%c🚗 CarShop - Chi tiết xe', 'color: #CB3634; font-size: 16px; font-weight: bold;');
    console.log(`Car ID: ${getCarIdFromURL()}`);
    console.log(`Car Name: ${currentCar?.name}`);
});
