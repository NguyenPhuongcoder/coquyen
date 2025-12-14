/* ===================================
   CarShop Forgot Password JavaScript
   =================================== */

// DOM Elements
const emailForm = document.getElementById('emailForm');
const otpForm = document.getElementById('otpForm');
const newPasswordForm = document.getElementById('newPasswordForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

// Step Indicators
const step1Indicator = document.getElementById('step1Indicator');
const step2Indicator = document.getElementById('step2Indicator');
const step3Indicator = document.getElementById('step3Indicator');

// Email Step
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const sendOtpButton = document.getElementById('sendOtpButton');
const sendOtpText = document.getElementById('sendOtpText');
const sendOtpSpinner = document.getElementById('sendOtpSpinner');

// OTP Step
const otpInputs = [
    document.getElementById('otp1'),
    document.getElementById('otp2'),
    document.getElementById('otp3'),
    document.getElementById('otp4'),
    document.getElementById('otp5'),
    document.getElementById('otp6')
];
const emailDisplay = document.getElementById('emailDisplay');
const otpError = document.getElementById('otpError');
const verifyOtpButton = document.getElementById('verifyOtpButton');
const verifyOtpText = document.getElementById('verifyOtpText');
const verifyOtpSpinner = document.getElementById('verifyOtpSpinner');
const resendOtpButton = document.getElementById('resendOtpButton');
const countdownSpan = document.getElementById('countdown');

// Password Step
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const newPasswordError = document.getElementById('newPasswordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const resetPasswordButton = document.getElementById('resetPasswordButton');
const resetPasswordText = document.getElementById('resetPasswordText');
const resetPasswordSpinner = document.getElementById('resetPasswordSpinner');
const toggleNewPassword = document.getElementById('toggleNewPassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

// State
let currentStep = 1;
let userEmail = '';
let generatedOtp = '';
let resendCountdown = 0;
let countdownInterval = null;

// ===================================
// Validation Functions
// ===================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(inputElement, errorElement, message) {
    inputElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(inputElement, errorElement) {
    inputElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function showGlobalError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// ===================================
// Step Navigation
// ===================================
function goToStep(step) {
    currentStep = step;
    
    // Hide all forms
    document.querySelectorAll('.step-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Update step indicators
    [step1Indicator, step2Indicator, step3Indicator].forEach((indicator, index) => {
        indicator.classList.remove('active', 'completed');
        if (index + 1 < step) {
            indicator.classList.add('completed');
        } else if (index + 1 === step) {
            indicator.classList.add('active');
        }
    });
    
    // Show current form
    if (step === 1) {
        emailForm.classList.add('active');
    } else if (step === 2) {
        otpForm.classList.add('active');
    } else if (step === 3) {
        newPasswordForm.classList.add('active');
    }
}

// ===================================
// Step 1: Email Submission
// ===================================
emailForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Validate email
    if (!email) {
        showError(emailInput, emailError, 'Vui lòng nhập email');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError(emailInput, emailError, 'Email không hợp lệ');
        return;
    }
    
    clearError(emailInput, emailError);
    
    // Show loading
    sendOtpButton.disabled = true;
    sendOtpText.classList.add('hidden');
    sendOtpSpinner.classList.remove('hidden');
    
    try {
        // Mock API call
        await mockSendOTP(email);
        
        userEmail = email;
        emailDisplay.textContent = email;
        
        // Go to step 2
        goToStep(2);
        
        // Start countdown
        startResendCountdown();
        
        // Focus first OTP input
        otpInputs[0].focus();
        
    } catch (error) {
        showGlobalError(error.message);
    } finally {
        sendOtpButton.disabled = false;
        sendOtpText.classList.remove('hidden');
        sendOtpSpinner.classList.add('hidden');
    }
});

// ===================================
// Step 2: OTP Verification
// ===================================

// OTP Input Auto-focus
otpInputs.forEach((input, index) => {
    input.addEventListener('input', function(e) {
        const value = e.target.value;
        
        // Only allow numbers
        if (!/^\d*$/.test(value)) {
            e.target.value = '';
            return;
        }
        
        // Move to next input
        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });
    
    input.addEventListener('keydown', function(e) {
        // Move to previous input on backspace
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
    
    // Paste handling
    input.addEventListener('paste', function(e) {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        
        if (/^\d+$/.test(pastedData)) {
            pastedData.split('').forEach((char, i) => {
                if (otpInputs[i]) {
                    otpInputs[i].value = char;
                }
            });
            otpInputs[Math.min(pastedData.length, 5)].focus();
        }
    });
});

otpForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get OTP value
    const otp = otpInputs.map(input => input.value).join('');
    
    if (otp.length !== 6) {
        otpError.textContent = 'Vui lòng nhập đầy đủ 6 số';
        otpError.classList.add('show');
        return;
    }
    
    otpError.classList.remove('show');
    
    // Show loading
    verifyOtpButton.disabled = true;
    verifyOtpText.classList.add('hidden');
    verifyOtpSpinner.classList.remove('hidden');
    
    try {
        // Mock API call
        await mockVerifyOTP(otp);
        
        // Go to step 3
        goToStep(3);
        
        // Focus password input
        newPasswordInput.focus();
        
    } catch (error) {
        showGlobalError(error.message);
        
        // Clear OTP inputs
        otpInputs.forEach(input => input.value = '');
        otpInputs[0].focus();
        
    } finally {
        verifyOtpButton.disabled = false;
        verifyOtpText.classList.remove('hidden');
        verifyOtpSpinner.classList.add('hidden');
    }
});

// Resend OTP
resendOtpButton.addEventListener('click', async function() {
    if (resendCountdown > 0) return;
    
    try {
        await mockSendOTP(userEmail);
        startResendCountdown();
        
        // Clear OTP inputs
        otpInputs.forEach(input => input.value = '');
        otpInputs[0].focus();
        
        showGlobalError('Mã OTP mới đã được gửi!');
    } catch (error) {
        showGlobalError(error.message);
    }
});

function startResendCountdown() {
    resendCountdown = 60;
    resendOtpButton.disabled = true;
    
    countdownInterval = setInterval(() => {
        resendCountdown--;
        countdownSpan.textContent = `(${resendCountdown}s)`;
        
        if (resendCountdown <= 0) {
            clearInterval(countdownInterval);
            resendOtpButton.disabled = false;
            countdownSpan.textContent = '';
        }
    }, 1000);
}

// ===================================
// Step 3: Reset Password
// ===================================

// Toggle password visibility
toggleNewPassword.addEventListener('click', function() {
    togglePasswordVisibility(newPasswordInput, this);
});

toggleConfirmPassword.addEventListener('click', function() {
    togglePasswordVisibility(confirmPasswordInput, this);
});

function togglePasswordVisibility(input, button) {
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    
    const icon = button.querySelector('svg');
    if (type === 'text') {
        icon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
        `;
    } else {
        icon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        `;
    }
}

newPasswordForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    let hasError = false;
    
    // Validate new password
    if (!newPassword) {
        showError(newPasswordInput, newPasswordError, 'Vui lòng nhập mật khẩu mới');
        hasError = true;
    } else if (newPassword.length < 6) {
        showError(newPasswordInput, newPasswordError, 'Mật khẩu phải có ít nhất 6 ký tự');
        hasError = true;
    } else {
        clearError(newPasswordInput, newPasswordError);
    }
    
    // Validate confirm password
    if (!confirmPassword) {
        showError(confirmPasswordInput, confirmPasswordError, 'Vui lòng xác nhận mật khẩu');
        hasError = true;
    } else if (newPassword !== confirmPassword) {
        showError(confirmPasswordInput, confirmPasswordError, 'Mật khẩu xác nhận không khớp');
        hasError = true;
    } else {
        clearError(confirmPasswordInput, confirmPasswordError);
    }
    
    if (hasError) return;
    
    // Show loading
    resetPasswordButton.disabled = true;
    resetPasswordText.classList.add('hidden');
    resetPasswordSpinner.classList.remove('hidden');
    
    try {
        // Mock API call
        await mockResetPassword(userEmail, newPassword);
        
        // Hide form and show success
        newPasswordForm.classList.remove('active');
        successMessage.classList.remove('hidden');
        
    } catch (error) {
        showGlobalError(error.message);
    } finally {
        resetPasswordButton.disabled = false;
        resetPasswordText.classList.remove('hidden');
        resetPasswordSpinner.classList.add('hidden');
    }
});

// ===================================
// Mock API Functions
// ===================================
function mockSendOTP(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Generate random 6-digit OTP
            generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log(`%c📧 OTP sent to ${email}: ${generatedOtp}`, 'color: #CB3634; font-weight: bold;');
            resolve({ success: true });
        }, 1500);
    });
}

function mockVerifyOTP(otp) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (otp === generatedOtp) {
                console.log('%c✅ OTP verified successfully', 'color: #10B981; font-weight: bold;');
                resolve({ success: true });
            } else {
                reject({ message: 'Mã OTP không đúng. Vui lòng thử lại.' });
            }
        }, 1000);
    });
}

function mockResetPassword(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`%c🔒 Password reset for ${email}`, 'color: #10B981; font-weight: bold;');
            resolve({ success: true });
        }, 1500);
    });
}

// ===================================
// Console Info
// ===================================
console.log('%c🚗 CarShop Forgot Password System', 'color: #CB3634; font-size: 16px; font-weight: bold;');
console.log('%cTest với bất kỳ email hợp lệ nào', 'color: #4B5563; font-size: 14px;');
console.log('Mã OTP sẽ hiển thị trong console sau khi gửi');
