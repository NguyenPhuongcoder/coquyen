/* ===================================
   CarShop Admin Reports JavaScript
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
// Logout Function
// ===================================
function handleLogout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        console.log('%c🚪 Logging out...', 'color: #EF4444; font-weight: bold;');
        sessionStorage.removeItem('carshop_user');
        window.location.href = 'carshop-auth/login.html';
    }
}

// ===================================
// Global Variables
// ===================================
let revenueChart = null;
let salesChart = null;
let currentTimeRange = 'week';

// ===================================
// Data by Time Range
// ===================================
const dataByTimeRange = {
    week: {
        labels: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        revenue: [3.2, 4.5, 3.8, 5.1, 4.2, 6.3, 5.8],
        sales: [2, 3, 2, 4, 3, 5, 4],
        reportData: [
            { date: 'Chủ nhật, 15/12', revenue: '3.2 tỷ', sales: 2, customers: 5, conversion: '40%' },
            { date: 'Thứ hai, 16/12', revenue: '4.5 tỷ', sales: 3, customers: 7, conversion: '43%' },
            { date: 'Thứ ba, 17/12', revenue: '3.8 tỷ', sales: 2, customers: 6, conversion: '33%' },
            { date: 'Thứ tư, 18/12', revenue: '5.1 tỷ', sales: 4, customers: 9, conversion: '44%' },
            { date: 'Thứ năm, 19/12', revenue: '4.2 tỷ', sales: 3, customers: 8, conversion: '38%' },
            { date: 'Thứ sáu, 20/12', revenue: '6.3 tỷ', sales: 5, customers: 12, conversion: '42%' },
            { date: 'Thứ bảy, 21/12', revenue: '5.8 tỷ', sales: 4, customers: 10, conversion: '40%' }
        ]
    },
    month: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        revenue: [12.5, 15.2, 18.7, 22.3, 19.8, 25.4, 28.9, 31.2, 27.6, 33.8, 36.5, 42.1],
        sales: [8, 10, 12, 15, 13, 17, 19, 21, 18, 23, 25, 28],
        reportData: [
            { date: 'Tháng 1/2024', revenue: '12.5 tỷ', sales: 8, customers: 20, conversion: '40%' },
            { date: 'Tháng 2/2024', revenue: '15.2 tỷ', sales: 10, customers: 24, conversion: '42%' },
            { date: 'Tháng 3/2024', revenue: '18.7 tỷ', sales: 12, customers: 28, conversion: '43%' },
            { date: 'Tháng 4/2024', revenue: '22.3 tỷ', sales: 15, customers: 35, conversion: '43%' },
            { date: 'Tháng 5/2024', revenue: '19.8 tỷ', sales: 13, customers: 32, conversion: '41%' },
            { date: 'Tháng 6/2024', revenue: '25.4 tỷ', sales: 17, customers: 40, conversion: '43%' },
            { date: 'Tháng 7/2024', revenue: '28.9 tỷ', sales: 19, customers: 45, conversion: '42%' },
            { date: 'Tháng 8/2024', revenue: '31.2 tỷ', sales: 21, customers: 48, conversion: '44%' },
            { date: 'Tháng 9/2024', revenue: '27.6 tỷ', sales: 18, customers: 42, conversion: '43%' },
            { date: 'Tháng 10/2024', revenue: '33.8 tỷ', sales: 23, customers: 52, conversion: '44%' },
            { date: 'Tháng 11/2024', revenue: '36.5 tỷ', sales: 25, customers: 56, conversion: '45%' },
            { date: 'Tháng 12/2024', revenue: '42.1 tỷ', sales: 28, customers: 62, conversion: '45%' }
        ]
    },
    year: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        revenue: [145, 178, 215, 268, 312, 365],
        sales: [95, 118, 142, 178, 206, 241],
        reportData: [
            { date: 'Năm 2019', revenue: '145 tỷ', sales: 95, customers: 235, conversion: '40%' },
            { date: 'Năm 2020', revenue: '178 tỷ', sales: 118, customers: 285, conversion: '41%' },
            { date: 'Năm 2021', revenue: '215 tỷ', sales: 142, customers: 340, conversion: '42%' },
            { date: 'Năm 2022', revenue: '268 tỷ', sales: 178, customers: 420, conversion: '42%' },
            { date: 'Năm 2023', revenue: '312 tỷ', sales: 206, customers: 480, conversion: '43%' },
            { date: 'Năm 2024', revenue: '365 tỷ', sales: 241, customers: 545, conversion: '44%' }
        ]
    }
};

// ===================================
// Render Revenue Line Chart
// ===================================
function renderRevenueLineChart() {
    const ctx = document.getElementById('revenueLineChart');
    const timeData = dataByTimeRange[currentTimeRange];
    
    // Destroy existing chart
    if (revenueChart) {
        revenueChart.destroy();
    }
    
    const data = {
        labels: timeData.labels,
        datasets: [{
            label: 'Doanh thu',
            data: timeData.revenue,
            backgroundColor: 'rgba(203, 54, 52, 0.1)',
            borderColor: '#CB3634',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#CB3634',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
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
                            return 'Doanh thu: ' + context.parsed.y + ' tỷ VNĐ';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#E5E7EB',
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
    
    revenueChart = new Chart(ctx, config);
    console.log('📊 Revenue line chart rendered');
}

// ===================================
// Render Sales Bar Chart
// ===================================
function renderSalesBarChart() {
    const ctx = document.getElementById('salesBarChart');
    const timeData = dataByTimeRange[currentTimeRange];
    
    // Destroy existing chart
    if (salesChart) {
        salesChart.destroy();
    }
    
    const data = {
        labels: timeData.labels,
        datasets: [{
            label: 'Số xe bán',
            data: timeData.sales,
            backgroundColor: '#CB3634',
            borderColor: '#CB3634',
            borderWidth: 1,
            borderRadius: 4
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
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
                            return 'Số xe: ' + context.parsed.y + ' chiếc';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#666666',
                        font: {
                            size: 12,
                            weight: 600
                        },
                        stepSize: 5
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
    
    salesChart = new Chart(ctx, config);
    console.log('📊 Sales bar chart rendered');
}

// ===================================
// Render Report Table
// ===================================
function renderReportTable() {
    const tbody = document.getElementById('reportTableBody');
    const timeData = dataByTimeRange[currentTimeRange];
    
    tbody.innerHTML = timeData.reportData.map(row => `
        <tr style="border-bottom: 1px solid #F0F0F0;">
            <td style="padding: 16px; font-size: 14px; color: #1A1A1A; font-weight: 600;">${row.date}</td>
            <td style="padding: 16px; font-size: 14px; color: #CB3634; font-weight: 700;">${row.revenue}</td>
            <td style="padding: 16px; font-size: 14px; color: #1A1A1A;">${row.sales} xe</td>
            <td style="padding: 16px; font-size: 14px; color: #1A1A1A;">${row.customers} người</td>
            <td style="padding: 16px; font-size: 14px; color: #10B981; font-weight: 600;">${row.conversion}</td>
        </tr>
    `).join('');
}

// ===================================
// Update Summary Cards
// ===================================
function updateSummaryCards() {
    const timeData = dataByTimeRange[currentTimeRange];
    
    // Calculate totals
    const totalRevenue = timeData.revenue.reduce((sum, val) => sum + val, 0);
    const totalSales = timeData.sales.reduce((sum, val) => sum + val, 0);
    const totalCustomers = timeData.reportData.reduce((sum, row) => sum + row.customers, 0);
    const avgConversion = (totalSales / totalCustomers * 100).toFixed(0);
    
    // Get previous period data for comparison
    const previousPeriodData = getPreviousPeriodData();
    const prevRevenue = previousPeriodData.revenue.reduce((sum, val) => sum + val, 0);
    const prevSales = previousPeriodData.sales.reduce((sum, val) => sum + val, 0);
    const prevCustomers = previousPeriodData.reportData.reduce((sum, row) => sum + row.customers, 0);
    const prevConversion = (prevSales / prevCustomers * 100);
    
    // Calculate changes
    const revenueChange = ((totalRevenue - prevRevenue) / prevRevenue * 100).toFixed(1);
    const salesChange = ((totalSales - prevSales) / prevSales * 100).toFixed(1);
    const customersChange = ((totalCustomers - prevCustomers) / prevCustomers * 100).toFixed(1);
    const conversionChange = (avgConversion - prevConversion).toFixed(1);
    
    // Update UI
    document.getElementById('totalRevenue').textContent = totalRevenue.toFixed(1) + ' tỷ';
    document.getElementById('totalSales').textContent = totalSales;
    document.getElementById('newCustomers').textContent = totalCustomers;
    document.getElementById('conversionRate').textContent = avgConversion + '%';
    
    // Update change indicators
    updateChangeIndicator('revenueChange', revenueChange);
    updateChangeIndicator('salesChange', salesChange);
    updateChangeIndicator('customersChange', customersChange);
    updateChangeIndicator('conversionChange', conversionChange);
}

// ===================================
// Get Previous Period Data
// ===================================
function getPreviousPeriodData() {
    // Simulate previous period data (in real app, this would come from backend)
    const previousData = {
        week: {
            revenue: [2.8, 4.1, 3.5, 4.8, 3.9, 5.9, 5.2],
            sales: [2, 3, 2, 3, 3, 4, 4],
            reportData: [
                { customers: 5 }, { customers: 7 }, { customers: 6 },
                { customers: 8 }, { customers: 8 }, { customers: 11 }, { customers: 9 }
            ]
        },
        month: {
            revenue: [11.2, 14.1, 17.3, 20.8, 18.5, 23.9, 27.2, 29.5, 26.1, 31.8, 34.2, 39.5],
            sales: [7, 9, 11, 14, 12, 16, 18, 20, 17, 22, 24, 26],
            reportData: [
                { customers: 18 }, { customers: 22 }, { customers: 26 }, { customers: 33 },
                { customers: 30 }, { customers: 38 }, { customers: 43 }, { customers: 46 },
                { customers: 40 }, { customers: 50 }, { customers: 54 }, { customers: 58 }
            ]
        },
        year: {
            revenue: [135, 165, 198, 248, 285, 312],
            sales: [88, 110, 132, 165, 188, 206],
            reportData: [
                { customers: 220 }, { customers: 268 }, { customers: 315 }, 
                { customers: 390 }, { customers: 438 }, { customers: 480 }
            ]
        }
    };
    
    return previousData[currentTimeRange];
}

// ===================================
// Update Change Indicator
// ===================================
function updateChangeIndicator(elementId, changeValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const isPositive = parseFloat(changeValue) >= 0;
    const arrow = isPositive ? '↑' : '↓';
    const colorClass = isPositive ? 'positive' : 'negative';
    
    element.className = `summary-change ${colorClass}`;
    element.textContent = `${arrow} ${Math.abs(changeValue)}% so với kỳ trước`;
}

// ===================================
// Handle Time Range Change
// ===================================
function handleTimeRangeChange() {
    const select = document.getElementById('timeRangeFilter');
    currentTimeRange = select.value;
    
    console.log(`📅 Time range changed to: ${currentTimeRange}`);
    
    // Re-render charts, table, and summary cards
    renderRevenueLineChart();
    renderSalesBarChart();
    renderReportTable();
    updateSummaryCards();
}

// ===================================
// Export Report to CSV
// ===================================
function exportReport() {
    const timeRange = document.getElementById('timeRangeFilter').value;
    const reportType = document.getElementById('reportTypeFilter').value;
    const timeData = dataByTimeRange[currentTimeRange];
    
    console.log('%c📥 Exporting report...', 'color: #10B981; font-weight: bold;');
    console.log(`   • Time range: ${timeRange}`);
    console.log(`   • Report type: ${reportType}`);
    
    // Prepare CSV content
    let csvContent = '\uFEFF'; // UTF-8 BOM for Excel compatibility
    
    // Header
    csvContent += 'BÁO CÁO THỐNG KÊ CARSHOP\n';
    csvContent += `Khoảng thời gian: ${getTimeRangeText(timeRange)}\n`;
    csvContent += `Loại báo cáo: ${getReportTypeText(reportType)}\n`;
    csvContent += `Ngày xuất: ${new Date().toLocaleString('vi-VN')}\n`;
    csvContent += '\n';
    
    // Summary statistics
    csvContent += 'TỔNG QUAN\n';
    csvContent += 'Chỉ số,Giá trị\n';
    csvContent += `Tổng doanh thu,${calculateTotalRevenue(timeData.revenue)} tỷ VNĐ\n`;
    csvContent += `Tổng xe bán,${calculateTotalSales(timeData.sales)} xe\n`;
    csvContent += `Trung bình doanh thu/kỳ,${calculateAverage(timeData.revenue).toFixed(1)} tỷ VNĐ\n`;
    csvContent += `Trung bình xe bán/kỳ,${calculateAverage(timeData.sales).toFixed(0)} xe\n`;
    csvContent += '\n';
    
    // Detailed data table
    csvContent += 'CHI TIẾT\n';
    csvContent += 'Ngày,Doanh thu,Xe bán,Khách hàng,Tỷ lệ chuyển đổi\n';
    
    timeData.reportData.forEach(row => {
        csvContent += `${row.date},${row.revenue},${row.sales},${row.customers},${row.conversion}\n`;
    });
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `BaoCao_CarShop_${timeRange}_${timestamp}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`✅ Report exported: ${filename}`);
    alert(`✅ Xuất báo cáo thành công!\n\nFile: ${filename}\n\nFile CSV đã được tải xuống. Bạn có thể mở bằng Excel hoặc Google Sheets.`);
}

// Helper functions for export
function getTimeRangeText(range) {
    const texts = {
        week: '7 ngày qua',
        month: '30 ngày qua (12 tháng)',
        year: '12 tháng qua (6 năm)'
    };
    return texts[range] || range;
}

function getReportTypeText(type) {
    const texts = {
        all: 'Tất cả',
        revenue: 'Doanh thu',
        sales: 'Bán hàng',
        customer: 'Khách hàng'
    };
    return texts[type] || type;
}

function calculateTotalRevenue(revenueArray) {
    return revenueArray.reduce((sum, val) => sum + val, 0).toFixed(1);
}

function calculateTotalSales(salesArray) {
    return salesArray.reduce((sum, val) => sum + val, 0);
}

function calculateAverage(array) {
    return array.reduce((sum, val) => sum + val, 0) / array.length;
}

// ===================================
// Initialize Reports
// ===================================
function initReports() {
    console.log('%c📊 CarShop Admin - Thống kê & Báo cáo', 'color: #CB3634; font-size: 18px; font-weight: bold;');
    console.log('═════════════════════════════════════');
    console.log('📈 Rendering charts and reports...');
    console.log(`   • Time range: ${currentTimeRange}`);
    console.log('   • Revenue Line Chart');
    console.log('   • Sales Bar Chart');
    console.log('   • Report Table');
    console.log('   • Summary Cards');
    console.log('═════════════════════════════════════');
    
    // Render all components
    renderRevenueLineChart();
    renderSalesBarChart();
    renderReportTable();
    updateSummaryCards();
    
    console.log('✅ All charts and reports loaded successfully!');
}

// ===================================
// Initialize on page load
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    if (!checkAdminAuth()) {
        return;
    }
    
    // Initialize reports
    initReports();
});
