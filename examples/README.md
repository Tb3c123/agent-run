# 🚀 DỰ ÁN MẪU THỬ NGHIỆM: QUICKNOTES API

Thư mục này (`examples/`) là kịch bản mẫu giúp bạn thực hành điều phối AI phát triển một ứng dụng hoàn chỉnh từ đầu đến cuối theo quy trình SDLC chuẩn.

> 💡 **Lưu ý**: Thư mục này dùng để **thử nghiệm nhanh** quy trình. Khi bạn bắt tay vào làm một **dự án hoàn toàn mới**, hãy tạo một thư mục riêng biệt bên ngoài (ví dụ: `mkdir my-new-app && cd my-new-app`).

Sau khi đã cài đặt bộ `.agent/` vào thư mục này (theo hướng dẫn ở [README gốc](../README.md)), bạn chỉ cần lần lượt **copy & paste các câu Prompt dưới đây vào AI** để cùng AI hoàn thành dự án:

---

## 🎯 ĐỀ BÀI MẪU: "ỨNG DỤNG GHI CHÚ NHANH (QUICKNOTES API)"
- **Mục tiêu**: Xây dựng một dịch vụ API ghi chú đơn giản (Tạo note, Xem danh sách, Tìm kiếm theo tag, Xóa note) bằng Node.js / Express hoặc Python / FastAPI.
- **Yêu cầu**: Có unit tests đầy đủ, lưu trữ dữ liệu bền vững, và tài liệu API OpenAPI.

---

## 🛠️ CÁC BƯỚC THỰC HIỆN VỚI AI

### BƯỚC 1: KHỞI ĐỘNG & LẬP BẢN ĐẶC TẢ (PHASE 1 - PRD)
Mở dự án này trong AI IDE (**Antigravity**, **Cursor**, **Claude Code**...), copy câu prompt này và gửi cho AI:

```text
Bắt đầu dự án: Hãy đọc hiểu các quy tắc trong .agent/rules/AGENTS.md và kích hoạt kĩ năng 01-core/01-prd-requirements để phỏng vấn tôi lập bản PRD cho ứng dụng QuickNotes! Chưa viết bất kỳ dòng code nào lúc này!
```

👉 **Điều gì sẽ xảy ra?**
- AI sẽ **không vội vàng code ngay**.
- AI đóng vai trò **Product Manager / Tech Lead**, đặt cho bạn 3-4 câu hỏi làm rõ (Đối tượng sử dụng, các trường dữ liệu cần lưu cho một Note, định dạng trả về mong muốn).
- Bạn có thể trả lời ngắn gọn:
  > *"Ghi chú gồm có id, title, content, tags, createdAt. Lưu bằng SQLite hoặc JSON file. Cần API CRUD và tìm kiếm theo tag. Đối tượng dùng là cá nhân."*
- AI sẽ tự động tạo file `.agent/memory/PRD.md` và hỏi bạn phê duyệt (Quality Gate 1).

---

### BƯỚC 2: THIẾT KẾ KIẾN TRÚC & HỢP ĐỒNG API (PHASE 2)
Sau khi bạn duyệt PRD, gửi tiếp:

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
Sau khi duyệt kiến trúc, bạn gửi:

```text
Kiến trúc và API hợp đồng rất tốt. Hãy tiến hành Phase 3: Setup môi trường và cài đặt dependencies.
```

👉 **Điều gì sẽ xảy ra?**
- AI sẽ kích hoạt kĩ năng `05-environment-setup`.
- AI tuân thủ nguyên tắc và **hỏi ý kiến bạn**:
  > *"Bạn có muốn tôi tạo môi trường ảo và cài đặt các thư viện cần thiết không?"*
- Bạn trả lời: *"Đồng ý, hãy cài đặt"*.
- AI cài đặt các packages cần thiết và chạy Smoke Test xác nhận test runner hoạt động.

---

### BƯỚC 4: BÓC TÁCH TASK & PHÁT TRIỂN THEO TDD (PHASE 4 & 5)
Sau khi môi trường sẵn sàng, bạn gửi:

```text
Môi trường đã sẵn sàng. Hãy kích hoạt kĩ năng 06-testing-qa và lập danh sách tasks vào .agent/memory/tasks.md, sau đó viết test trước rồi mới viết code (TDD).
```

👉 **Điều gì sẽ xảy ra?**
- AI bóc tách các task nhỏ, tự viết Unit Test trước (Test Fail / Red).
- Viết code nghiệp vụ để pass test (Test Pass / Green).
- Đánh dấu `[x]` vào `tasks.md`.

---

### BƯỚC 5: RÀ SOÁT BẢO MẬT & ĐÓNG GÓI DOCKER (PHASE 6 & 7)
Cuối cùng, gửi prompt hoàn thiện:

```text
Toàn bộ test đã pass. Hãy kích hoạt 07-security-audit và 08-devops-deployment để rà soát an toàn và tạo Dockerfile hoàn chỉnh!
```

👉 **Kết quả cuối cùng:** Bạn có một ứng dụng QuickNotes chuẩn công nghiệp, có test đầy đủ, container hóa Docker và sẵn sàng deploy production!
