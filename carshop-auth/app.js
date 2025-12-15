/* ===================================
   CarShop Authentication JavaScript
   =================================== */

// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailOrPhoneInput = document.getElementById('emailOrPhone');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginButton = document.getElementById('loginButton');
const buttonText = document.getElementById('buttonText');
const buttonSpinner = document.getElementById('buttonSpinner');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const rememberMeCheckbox = document.getElementById('rememberMe');

// ===================================
// Toggle Password Visibility
// ===================================
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    // Toggle icon
    const eyeIcon = document.getElementById('eyeIcon');
    if (type === 'text') {
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
        `;
    } else {
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        `;
    }
});

// ===================================
// Validation Functions
// ===================================

// Validate Email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate Phone Number (Vietnam format)
function isValidPhone(phone) {
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Validate Email or Phone
function validateEmailOrPhone(value) {
    if (!value.trim()) {
        return { valid: false, message: 'Vui lòng nhập email hoặc số điện thoại' };
    }
    
    // Check if it's email or phone
    if (value.includes('@')) {
        if (!isValidEmail(value)) {
            return { valid: false, message: 'Email không hợp lệ' };
        }
    } else {
        if (!isValidPhone(value)) {
            return { valid: false, message: 'Số điện thoại không hợp lệ' };
        }
    }
    
    return { valid: true, message: '' };
}

// Validate Password
function validatePassword(password) {
    if (!password) {
        return { valid: false, message: 'Vui lòng nhập mật khẩu' };
    }
    
    if (password.length < 6) {
        return { valid: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
    }
    
    return { valid: true, message: '' };
}

// Show Error Message
function showError(inputElement, errorElement, message) {
    inputElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear Error Message
function clearError(inputElement, errorElement) {
    inputElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// ===================================
// Real-time Validation
// ===================================
emailOrPhoneInput.addEventListener('blur', function() {
    const validation = validateEmailOrPhone(this.value);
    if (!validation.valid) {
        showError(emailOrPhoneInput, emailError, validation.message);
    } else {
        clearError(emailOrPhoneInput, emailError);
    }
});

emailOrPhoneInput.addEventListener('input', function() {
    if (emailError.classList.contains('show')) {
        clearError(emailOrPhoneInput, emailError);
    }
});

passwordInput.addEventListener('blur', function() {
    const validation = validatePassword(this.value);
    if (!validation.valid) {
        showError(passwordInput, passwordError, validation.message);
    } else {
        clearError(passwordInput, passwordError);
    }
});

passwordInput.addEventListener('input', function() {
    if (passwordError.classList.contains('show')) {
        clearError(passwordInput, passwordError);
    }
});

// ===================================
// Mock API Call - Simulate Backend
// ===================================
function mockLoginAPI(credentials) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock user database
            const mockUsers = [
                { email: 'customer@carshop.vn', phone: '0901234567', password: '123456', role: 'USER' },
                { email: 'seller@carshop.vn', phone: '0912345678', password: '123456', role: 'SELLER' },
                { email: 'admin@carshop.vn', phone: '0923456789', password: '123456', role: 'ADMIN' }
            ];
            
            // Find user
            const user = mockUsers.find(u => 
                (u.email === credentials.emailOrPhone || u.phone === credentials.emailOrPhone) 
                && u.password === credentials.password
            );
            
            if (user) {
                resolve({
                    success: true,
                    role: user.role,
                    user: {
                        email: user.email,
                        role: user.role
                    }
                });
            } else {
                reject({
                    success: false,
                    message: 'Email/Số điện thoại hoặc mật khẩu không đúng'
                });
            }
        }, 1500); // Simulate network delay
    });
}

// ===================================
// Role-based Redirect
// ===================================
function redirectByRole(role) {
    const routes = {
        'USER': '/cars',
        'SELLER': '/seller/dashboard',
        'ADMIN': '/admin/dashboard'
    };
    
    const redirectUrl = routes[role] || '/';
    
    // Show success message
    successMessage.classList.remove('hidden');
    
    // Redirect after 1 second
    setTimeout(() => {
        console.log(`Redirecting to home page`);
        window.location.href = '../home.html';
    }, 1000);
}

// ===================================
// Form Submit Handler
// ===================================
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Hide previous messages
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    // Get form values
    const emailOrPhone = emailOrPhoneInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    
    // Validate inputs
    const emailValidation = validateEmailOrPhone(emailOrPhone);
    const passwordValidation = validatePassword(password);
    
    let hasError = false;
    
    if (!emailValidation.valid) {
        showError(emailOrPhoneInput, emailError, emailValidation.message);
        hasError = true;
    }
    
    if (!passwordValidation.valid) {
        showError(passwordInput, passwordError, passwordValidation.message);
        hasError = true;
    }
    
    if (hasError) return;
    
    // Show loading state
    loginButton.disabled = true;
    buttonText.classList.add('hidden');
    buttonSpinner.classList.remove('hidden');
    
    try {
        // Call mock API
        const response = await mockLoginAPI({ emailOrPhone, password });
        
        // Save to localStorage if remember me is checked
        if (rememberMe) {
            localStorage.setItem('carshop_remember', emailOrPhone);
        } else {
            localStorage.removeItem('carshop_remember');
        }
        
        // Save user session (mock)
        sessionStorage.setItem('carshop_user', JSON.stringify(response.user));
        
        // Redirect based on role
        redirectByRole(response.role);
        
    } catch (error) {
        // Show error message
        errorText.textContent = error.message;
        errorMessage.classList.remove('hidden');
        
        // Reset button state
        loginButton.disabled = false;
        buttonText.classList.remove('hidden');
        buttonSpinner.classList.add('hidden');
    }
});

// ===================================
// Social Login Handler (Mock)
// ===================================
function handleSocialLogin(provider) {
    console.log(`Social login with: ${provider}`);
    alert(`Mock: Đăng nhập bằng ${provider.toUpperCase()}\n\nTrong production, sẽ redirect đến OAuth provider.`);
    
    // In production, redirect to OAuth provider
    // Example: window.location.href = `/auth/${provider}`;
}

// ===================================
// Load Remembered Email/Phone
// ===================================
window.addEventListener('DOMContentLoaded', function() {
    const rememberedEmail = localStorage.getItem('carshop_remember');
    if (rememberedEmail) {
        emailOrPhoneInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }
});

// ===================================
// Console Info for Testing
// ===================================
console.log('%c🚗 CarShop Authentication System', 'color: #CB3634; font-size: 16px; font-weight: bold;');
console.log('%cMock Test Accounts:', 'color: #4B5563; font-size: 14px; font-weight: bold;');
console.log('👤 Customer: customer@carshop.vn / 0901234567 | Password: 123456');
console.log('🏪 Seller: seller@carshop.vn / 0912345678 | Password: 123456');
console.log('⚙️ Admin: admin@carshop.vn / 0923456789 | Password: 123456');
