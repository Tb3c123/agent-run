# 📺 HƯỚNG DẪN CÀI ĐẶT & ĐIỀU KHIỂN GIẢ LẬP ANDROID & ANDROID TV

Tài liệu này hướng dẫn cách cấu hình máy ảo, tải system image và điều khiển thiết bị từ xa qua ADB phục vụ kiểm thử ứng dụng di động và ứng dụng TV thông minh.

---

## 1. YÊU CẦU TIỀN ĐỀ
Đảm bảo bạn đã cài Android SDK và đặt biến môi trường `$ANDROID_HOME`:
- Trên macOS: Thường nằm ở `~/Library/Android/sdk`
- Trên Linux: Thường nằm ở `~/Android/Sdk` hoặc `/usr/local/android-sdk`

Kiểm tra bằng lệnh:
```bash
adb version
emulator -version
```

---

## 2. SỬ DỤNG SCRIPT HỖ TRỢ: `.agent/scripts/setup-emulators.sh`

Trong mọi dự án sau khi cài `.agent`, bạn có sẵn file script tự động hóa:

### A. Dành cho Android TV 1080p (Leanback / 10-Foot UI)
```bash
# 1. Tự động tải image google_atv và khởi tạo máy ảo TV 1080p:
bash .agent/scripts/setup-emulators.sh tv-create

# 2. Khởi chạy máy ảo TV trong background:
bash .agent/scripts/setup-emulators.sh tv-start
```

### B. Dành cho Android Mobile (Điện thoại Pixel 7)
```bash
# 1. Tự động tải image google_apis và tạo máy ảo Pixel 7:
bash .agent/scripts/setup-emulators.sh mobile-create

# 2. Khởi chạy máy ảo Mobile:
bash .agent/scripts/setup-emulators.sh mobile-start
```

---

## 3. BẢNG LỆNH MÔ PHỎNG REMOTE TV BẰNG ADB

Trên Android TV, người dùng không chạm vào màn hình mà dùng **Remote Control (D-Pad)**. Để AI và bạn có thể tự động test tiêu điểm (Focus Navigation), hãy sử dụng các lệnh sau:

| Thao tác trên Remote TV | Lệnh qua Script | Lệnh ADB trực tiếp | Keycode |
| :--- | :--- | :--- | :--- |
| **Mũi tên Lên (Up)** | `bash .agent/scripts/setup-emulators.sh dpad up` | `adb shell input keyevent 19` | `KEYCODE_DPAD_UP` |
| **Mũi tên Xuống (Down)** | `bash .agent/scripts/setup-emulators.sh dpad down` | `adb shell input keyevent 20` | `KEYCODE_DPAD_DOWN` |
| **Mũi tên Trái (Left)** | `bash .agent/scripts/setup-emulators.sh dpad left` | `adb shell input keyevent 21` | `KEYCODE_DPAD_LEFT` |
| **Mũi tên Phải (Right)** | `bash .agent/scripts/setup-emulators.sh dpad right` | `adb shell input keyevent 22` | `KEYCODE_DPAD_RIGHT` |
| **Nút Chọn (OK / Center)** | `bash .agent/scripts/setup-emulators.sh dpad ok` | `adb shell input keyevent 23` | `KEYCODE_DPAD_CENTER` |
| **Nút Quay Lại (Back)** | `bash .agent/scripts/setup-emulators.sh dpad back` | `adb shell input keyevent 4` | `KEYCODE_BACK` |
| **Nút Màn Hình Chính (Home)** | `bash .agent/scripts/setup-emulators.sh dpad home` | `adb shell input keyevent 3` | `KEYCODE_HOME` |
| **Tăng âm lượng** | - | `adb shell input keyevent 24` | `KEYCODE_VOLUME_UP` |
| **Giảm âm lượng** | - | `adb shell input keyevent 25` | `KEYCODE_VOLUME_DOWN` |

---

## 4. GỢI Ý TEST FLOW CHO AI TRÊN ANDROID TV
Khi yêu cầu AI phát triển ứng dụng TV (Flutter hoặc Native Kotlin), bạn có thể bảo AI:
> *"Hãy chạy ứng dụng lên giả lập TV, sau đó gửi các lệnh ADB DPAD_RIGHT và DPAD_CENTER để kiểm tra xem thẻ video có phóng to (scale 1.1x) và có viền sáng cyan khi được focus hay không."*
