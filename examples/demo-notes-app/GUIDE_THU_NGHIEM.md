# 🚀 HƯỚNG DẪN THỬ NGHIỆM DỰ ÁN MẪU: QUICKNOTES

Chào bạn! Thư mục này (`examples/demo-notes-app/`) đã được cài sẵn bộ `.agent/`.
Dưới đây là kịch bản thử nghiệm từng bước để bạn thấy cách AI đọc hiểu các kỹ năng và dẫn dắt dự án từ đầu đến cuối một cách chuyên nghiệp.

---

## 🎯 ĐỀ BÀI MẪU: "ỨNG DỤNG GHI CHÚ NHANH (QUICKNOTES API)"
- **Mục tiêu**: Xây dựng một dịch vụ API ghi chú đơn giản (Tạo note, Xem danh sách, Tìm kiếm theo tag, Xóa note) bằng Node.js / Express hoặc Python / FastAPI.
- **Yêu cầu**: Có unit tests đầy đủ, lưu trữ dữ liệu bền vững, và tài liệu API OpenAPI.

---

## 🛠️ CÁC BƯỚC THỬ NGHIỆM VỚI AI

### BƯỚC 1: KHỞI ĐỘNG & LẬP BẢN ĐẶC TẢ (PHASE 1 - PRD)
Mở dự án này trong Antigravity (hoặc Cursor / Claude Code), nhập câu lệnh đầu tiên vào khung chat:

```text
Bắt đầu dự án: Hãy đọc hiểu các quy tắc trong .agent/rules/AGENTS.md và kích hoạt kĩ năng 01-prd-requirements để phỏng vấn tôi lập bản PRD cho ứng dụng QuickNotes!
```

👉 **Điều gì sẽ xảy ra?**
- AI sẽ **không vội vàng code ngay**.
- AI đóng vai trò **Product Manager / Tech Lead**, đặt cho bạn 3-4 câu hỏi làm rõ (Đối tượng sử dụng, các trường dữ liệu cần lưu cho một Note, định dạng trả về mong muốn).
- Bạn có thể trả lời ngắn gọn:
  > *"Ghi chú gồm có id, title, content, tags, createdAt. Lưu bằng SQLite hoặc JSON file. Cần API CRUD và tìm kiếm theo tag. Đối tượng dùng là cá nhân."*
- AI sẽ tự động tạo file `.agent/memory/PRD.md` và hỏi bạn phê duyệt (Quality Gate 1).

---

### BƯỚC 2: THIẾT KẾ KIẾN TRÚC & HỢP ĐỒNG API (PHASE 2)
Sau khi AI tạo xong PRD, bạn gõ tiếp:

```text
PRD đã chuẩn. Hãy kích hoạt kĩ năng 02-system-architecture, 03-database-strategy và 04-api-specification để thiết kế kiến trúc và hợp đồng API!
```

👉 **Điều gì sẽ xảy ra?**
- AI sẽ thiết kế cấu trúc thư mục dạng layered (Controller - Service - Repository).
- Tạo file `.agent/memory/DATABASE_SCHEMA.md` (Schema bảng `notes`).
- Tạo file `.agent/memory/openapi.yaml` (Đặc tả các endpoint: `GET /notes`, `POST /notes`, `GET /notes/search?tag=...`, `DELETE /notes/:id`).
- AI dừng lại để xin phê duyệt kiến trúc (Quality Gate 2).

---

### BƯỚC 3: CÀI ĐẶT MÔI TRƯỜNG & CHẠY SMOKE TEST (PHASE 3)
Sau khi bạn duyệt kiến trúc, bạn gõ:

```text
Kiến trúc và API hợp đồng rất tốt. Hãy tiến hành Phase 3: Setup môi trường và cài đặt dependencies.
```

👉 **Điều gì sẽ xảy ra?**
- AI sẽ kích hoạt kĩ năng `05-environment-setup`.
- AI sẽ tuân thủ luật và **hỏi ý kiến bạn**:
  > *"Bạn có muốn tôi tạo môi trường ảo và cài đặt các thư viện cần thiết không?"*
- Bạn trả lời: *"Đồng ý, hãy cài đặt"*.
- AI sẽ cài đặt các packages cần thiết và chạy Smoke Test xác nhận test runner hoạt động.

---

### BƯỚC 4: BÓC TÁCH TASK & CODE THEO TDD (PHASE 4 & 5)
Bạn gõ:

```text
Hãy bóc tách các task vào .agent/memory/tasks.md và bắt đầu triển khai code theo quy trình TDD (viết test trước, code sau)!
```

👉 **Điều gì sẽ xảy ra?**
- AI chia các đầu việc cụ thể vào `tasks.md`.
- Kích hoạt kỹ năng TDD (`06-testing-qa`) kết hợp kỹ năng stack tương ứng:
  1. Viết test case cho Note Service (`test/notes.test.js`).
  2. Chạy test -> Test Fail (Red).
  3. Viết mã nguồn nghiệp vụ xử lý Note -> Chạy test -> Test Pass (Green).
  4. Đánh dấu `[x]` vào `tasks.md`.

---

### BƯỚC 5: KIỂM TRA TIẾN ĐỘ DỰ ÁN
Bất kỳ lúc nào, bạn có thể mở terminal và gõ:

```bash
node ../../bin/agent-pack.js status
```

Hệ thống sẽ hiển thị bảng trạng thái trực quan các Phase đã hoàn thành (✅) và đang thực hiện (🔄)!
