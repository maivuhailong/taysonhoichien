# Tây Sơn Hồi Chiến — Website hồ sơ nhân vật

Website tĩnh (HTML, CSS, JavaScript). **Không cần cài đặt**, không cần server hay cơ sở dữ liệu.

## Đăng lên GitHub Pages

1. Đăng nhập GitHub → **New repository** (ví dụ `tay-son-hoi-chien`). Chọn **Public**.
2. Giải nén file ZIP, upload **tất cả file trong thư mục** lên nhánh `main` ở **thư mục gốc** của repository, đặc biệt là `index.html`, `style.css`, `app.js`, `data.js`.
3. Vào **Settings → Pages → Build and deployment → Deploy from a branch**; chọn **main** và **/(root)** rồi **Save**.
4. Trang sẽ có địa chỉ dạng https://maivuhailong.github.io/taysonhoichien/

## Chỉnh nội dung

- Hồ sơ, kỹ năng và trích nguồn được lưu trong `data.js` (mảng `window.PROFILES`).
- Sửa tên, đoạn mô tả hoặc thông tin trong các mục `sections` rồi commit thay đổi.
- Chỉnh giao diện trong `style.css`.
- Website chỉ bao gồm **hồ sơ nhân vật**, không có địa linh hay trang luật chơi.

## Cơ sở dữ liệu

Biên tập từ `Tây Sơn Hồi Chiến (3).docx` do nhóm cung cấp. Các tư liệu là bản nháp của nhóm, chưa được xác minh độc lập toàn bộ. Các nhân vật Sơn Tinh, Thủy Tinh, Táo Quân, Chú Cuội, Thánh Gióng là hình tượng dân gian; không phải nhân vật tham chiến trong năm 1789.

Trang dùng font từ Google Fonts, nếu offline máy sẽ dùng font dự phòng. Các tính năng tìm kiếm, đọc hồ sơ và lọc phe vẫn hoạt động.
