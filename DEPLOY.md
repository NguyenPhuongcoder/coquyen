# 🚀 Hướng dẫn Deploy CarShop lên GitHub Pages

## ✅ Đã hoàn thành

Code đã được push lên GitHub repository: 
**https://github.com/NguyenPhuongcoder/coquyen**

## 📋 Các bước tiếp theo để enable GitHub Pages

### Bước 1: Truy cập Settings
1. Mở repository: https://github.com/NguyenPhuongcoder/coquyen
2. Click vào tab **Settings** (ở menu trên cùng)

### Bước 2: Enable GitHub Pages
1. Scroll xuống phần **Pages** (menu bên trái)
2. Hoặc truy cập trực tiếp: https://github.com/NguyenPhuongcoder/coquyen/settings/pages

### Bước 3: Cấu hình Source
1. Trong phần **Source**, chọn:
   - Branch: **main**
   - Folder: **/ (root)**
2. Click **Save**

### Bước 4: Đợi Deploy
- GitHub sẽ tự động build và deploy
- Quá trình này mất khoảng 1-2 phút
- Bạn sẽ thấy thông báo: "Your site is live at..."

## 🌐 URL sau khi deploy

Website của bạn sẽ có địa chỉ:
```
https://nguyenphuongcoder.github.io/coquyen/
```

Trang đăng nhập:
```
https://nguyenphuongcoder.github.io/coquyen/carshop-auth/login.html
```

Trang quên mật khẩu:
```
https://nguyenphuongcoder.github.io/coquyen/carshop-auth/forgot-password.html
```

## 🧪 Test sau khi deploy

### 1. Đăng nhập thông thường
- Customer: `customer@carshop.vn` / `0901234567` | Pass: `123456`
- Seller: `seller@carshop.vn` / `0912345678` | Pass: `123456`
- Admin: `admin@carshop.vn` / `0923456789` | Pass: `123456`

### 2. Đăng nhập Social (Mock Mode)
- Click nút Google hoặc Facebook
- Tự động tạo user mock và redirect

### 3. Quên mật khẩu
- Nhập email bất kỳ
- Mã OTP hiển thị trong Console (F12)
- Test flow 3 bước

## 🔄 Update code sau này

Khi bạn thay đổi code, chạy các lệnh sau:

```bash
# Add tất cả thay đổi
git add .

# Commit với message
git commit -m "Mô tả thay đổi của bạn"

# Push lên GitHub
git push

# GitHub Pages sẽ tự động deploy lại
```

## 📱 Chia sẻ

Sau khi deploy xong, bạn có thể chia sẻ link:
- **Trang chủ**: https://nguyenphuongcoder.github.io/coquyen/
- **Login**: https://nguyenphuongcoder.github.io/coquyen/carshop-auth/login.html

## 🐛 Troubleshooting

### Website không hiển thị
1. Kiểm tra GitHub Pages đã enable chưa
2. Đợi 1-2 phút để GitHub build
3. Clear cache browser (Ctrl + F5)

### CSS không load
1. Kiểm tra đường dẫn file trong HTML
2. Đảm bảo file `style.css` đã được commit

### JavaScript không chạy
1. Mở Console (F12) xem lỗi
2. Kiểm tra tất cả file .js đã được commit

## 📞 Support

Nếu gặp vấn đề, check:
1. Repository settings: https://github.com/NguyenPhuongcoder/coquyen/settings
2. Actions tab để xem build status: https://github.com/NguyenPhuongcoder/coquyen/actions
3. Console browser (F12) để debug

---

**Chúc bạn deploy thành công! 🎉**
