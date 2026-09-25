# 📦 HƯỚNG DẪN CÀI ĐẶT & KHỞI TẠO BỘ AGENT (INSTALLATION GUIDE)

Tài liệu này hướng dẫn chi tiết cách tải về, cài đặt và sử dụng bộ công cụ **Agent-Pack** trên các môi trường máy tính khác nhau (macOS, Linux, Windows qua WSL/Git Bash).

---

## 1. YÊU CẦU MÔI TRƯỜNG
- **Node.js**: Phiên bản 16.0 trở lên (`node -v`).
- **Git**: Đã cài đặt trên máy (`git --version`).
- Bộ công cụ hoàn toàn chạy bằng Node.js core modules, **không yêu cầu `npm install` các thư viện nặng nề bên ngoài**, đảm bảo tốc độ thực thi tức thì (0ms startup latency).

---

## 2. CÁC CÁCH CÀI ĐẶT

### Cách 1: Tải về từ Git và Sử dụng Cục Bộ (Khuyên dùng trong nội bộ)
```bash
# 1. Clone repository về máy của bạn (ví dụ vào thư mục ~/tools/agent)
git clone <url-to-this-repo> ~/tools/agent

# 2. Di chuyển vào thư mục dự án bạn muốn phát triển
cd /path/to/my-new-project

# 3. Chạy lệnh cài đặt bộ .agent vào dự án
node ~/tools/agent/bin/agent-pack.js init
```

### Cách 2: Cài đặt Toàn Cục (Global CLI)
Nếu bạn muốn gõ lệnh `agent-pack` ở bất kỳ đâu trong terminal:
```bash
# Tạo symlink toàn cục từ thư mục repo
cd ~/tools/agent
npm link

# Bây giờ bạn có thể đi tới bất kỳ thư mục nào và gõ trực tiếp:
cd /path/to/my-project
agent-pack init
```

### Cách 3: Chạy bằng Script `install.sh`
```bash
# Cài đặt vào thư mục hiện tại
bash ~/tools/agent/install.sh .

# Hoặc cài đặt vào thư mục con
bash ~/tools/agent/install.sh ./my-web-app
```

---

## 3. KIỂM TRA MÔI TRƯỜNG BẰNG LỆNH DOCTOR

Trước khi bắt đầu dự án, bạn nên kiểm tra xem máy tính đã có sẵn các trình biên dịch, runtime và SDK cần thiết chưa:

```bash
agent-pack doctor
# hoặc:
node ~/tools/agent/bin/agent-pack.js doctor
```

Kết quả in ra sẽ phân tích rõ ràng:
- ✅ Node.js & NPM
- ✅ Git Version Control
- ✅ Python 3 Runtime
- ✅ Docker Engine
- ✅ Flutter SDK
- ✅ Go Programming Language
- ✅ Android Debug Bridge (ADB)
- ✅ Android Emulator CLI

---

## 4. XEM TIẾN ĐỘ DỰ ÁN BẰNG LỆNH STATUS

Bất kỳ lúc nào trong quá trình AI đang làm việc, bạn có thể kiểm tra xem dự án đang ở giai đoạn (Phase) nào:

```bash
agent-pack status
# hoặc:
node ~/tools/agent/bin/agent-pack.js status
```

Hệ thống sẽ đọc trực tiếp từ `.agent/memory/project_state.json` và hiển thị trực quan:
- Tech Stack nhận diện.
- Phase đang kích hoạt.
- Trạng thái từng cổng kiểm soát: `✅ DONE`, `🔄 IN_PROGRESS`, hoặc `⏳ NOT_STARTED`.
