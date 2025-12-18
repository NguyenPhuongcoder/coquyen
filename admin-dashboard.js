/* ===================================
   CarShop Admin Dashboard JavaScript
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

// DEMO DATA - Dashboard Statistics
const dashboardData = {
    totalCars: 120,
    availableCars: 75,
    reservedCars: 25,
    soldCars: 20,
    recentOrders: [
        {
            car: "Toyota Camry 2.5Q",
            customer: "Nguyễn Văn A",
            status: "reserved",
            date: "20/12/2024"
        },
        {
            car: "Honda Civic RS",
            customer: "Trần Thị B",
            status: "sold",
            date: "19/12/2024"
        },
        {
            car: "Mazda CX-5 Premium",
            customer: "Lê Văn C",
            status: "reserved",
            date: "18/12/2024"
        },
        {
            car: "Mercedes-Benz C200",
            customer: "Phạm Thị D",
            status: "sold",
            date: "17/12/2024"
        },
        {
            car: "Ford Ranger Raptor",
            customer: "Hoàng Văn E",
            status: "reserved",
            date: "16/12/2024"
        },
        {
            car: "BMW 320i",
            customer: "Đỗ Thị F",
            status: "sold",
            date: "15/12/2024"
        },
        {
            car: "Hyundai Tucson",
            customer: "Vũ Văn G",
            status: "available",
            date: "14/12/2024"
        },
        {
            car: "Kia Seltos",
            customer: "Bùi Thị H",
            status: "reserved",
            date: "13/12/2024"
        }
    ]
};

// Get status config
function getStatusConfig(status) {
    const configs = {
        available: {
            text: 'Đang bán',
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

// Render statistics
function renderStatistics() {
    document.getElementById('totalCars').textContent = dashboardData.totalCars;
    document.getElementById('availableCars').textContent = dashboardData.availableCars;
    document.getElementById('reservedCars').textContent = dashboardData.reservedCars;
    document.getElementById('soldCars').textContent = dashboardData.soldCars;
}

// Render recent orders table
function renderRecentOrders() {
    const tbody = document.getElementById('recentOrdersTable');
    
    if (dashboardData.recentOrders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: #999999;">
                    Chưa có đơn hàng nào
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = dashboardData.recentOrders.map(order => {
        const statusConfig = getStatusConfig(order.status);
        
        return `
            <tr>
                <td style="font-weight: 600;">${order.car}</td>
                <td>${order.customer}</td>
                <td>
                    <span class="status-badge ${statusConfig.class}">
                        ${statusConfig.text}
                    </span>
                </td>
                <td style="color: #666666;">${order.date}</td>
            </tr>
        `;
    }).join('');
}

// Render revenue chart
function renderRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    
    // Demo data - Doanh thu 12 tháng (tỷ VNĐ)
    const revenueData = {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
            label: 'Doanh thu (tỷ VNĐ)',
            data: [12.5, 15.2, 18.7, 22.3, 19.8, 25.4, 28.9, 31.2, 27.6, 33.8, 36.5, 42.1],
            backgroundColor: 'rgba(203, 54, 52, 0.1)',
            borderColor: '#CB3634',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#CB3634',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };
    
    const config = {
        type: 'line',
        data: revenueData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1A1A1A',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#CB3634',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' tỷ VNĐ';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#E0E0E0',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#666666',
                        font: {
                            size: 12,
                            weight: 600
                        },
                        callback: function(value) {
                            return value + ' tỷ';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#666666',
                        font: {
                            size: 12,
                            weight: 600
                        }
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
    
    console.log('📊 Revenue chart rendered successfully');
}

// Logout function
function handleLogout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        console.log('%c🚪 Logging out...', 'color: #EF4444; font-weight: bold;');
        
        // Clear session
        sessionStorage.removeItem('carshop_user');
        
        // Redirect to login
        window.location.href = 'carshop-auth/login.html';
    }
}

// Initialize dashboard
function initDashboard() {
    console.log('%c🚗 CarShop Admin Dashboard', 'color: #CB3634; font-size: 18px; font-weight: bold;');
    console.log('═════════════════════════════════════');
    console.log('📊 Dashboard Statistics:');
    console.log(`   • Total Cars: ${dashboardData.totalCars}`);
    console.log(`   • Available: ${dashboardData.availableCars}`);
    console.log(`   • Reserved: ${dashboardData.reservedCars}`);
    console.log(`   • Sold: ${dashboardData.soldCars}`);
    console.log('═════════════════════════════════════');
    console.log(`📋 Recent Orders: ${dashboardData.recentOrders.length} orders`);
    console.log('═════════════════════════════════════');
    
    // Render all components
    renderStatistics();
    renderRecentOrders();
    renderRevenueChart();
    
    console.log('✅ Dashboard loaded successfully!');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    if (!checkAdminAuth()) {
        return; // Stop execution if not authenticated
    }
    
    // Initialize dashboard
    initDashboard();
});
