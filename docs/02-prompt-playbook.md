# 📖 BỘ PROMPT CHUẨN ĐIỀU PHỐI DỰ ÁN (PROMPT PLAYBOOK)

Tài liệu này cung cấp **bộ câu lệnh Prompt chuẩn từng bước** (Copy & Paste) để bạn ra lệnh cho AI trong suốt vòng đời phát triển phần mềm (SDLC). Mỗi câu prompt được thiết kế để kích hoạt đúng kỹ năng, giữ AI đi đúng hướng và không bao giờ nhảy cóc quy trình.

---

## 📑 MỤC LỤC QUY TRÌNH PROMPT
0. [Bước 0: Khảo sát & Thiết lập Cấu hình (Phase 0: Config Check)](#bước-0-khảo-sát--thiết-lập-cấu-hình-phase-0-config-check)
1. [Bước 1: Khởi động & Đặc tả yêu cầu (Phase 1: PRD)](#bước-1-khởi-động--đặc-tả-yêu-cầu-phase-1-prd)
2. [Bước 2: Thiết kế Kiến trúc, CSDL & Hợp đồng API (Phase 2)](#bước-2-thiết-kế-kiến-trúc-csdl--hợp-đồng-api-phase-2)
3. [Bước 3: Khởi tạo Môi trường ảo & Cài đặt Dependencies (Phase 3)](#bước-3-khởi-tạo-môi-trường-ảo--cài-đặt-dependencies-phase-3)
4. [Bước 4: Bóc tách Task & Đồng bộ Jira (Phase 4)](#bước-4-bóc-tách-task--đồng-bộ-jira-phase-4)
5. [Bước 5: Viết code theo chu trình TDD (Phase 5)](#bước-5-viết-code-theo-chu-trình-tdd-phase-5)
6. [Bước 6: Rà soát Bảo mật & Tối ưu (Phase 6)](#bước-6-rà-soát-bảo-mật--tối-ưu-phase-6)
7. [Bước 7: Đóng gói Docker & Thiết lập CI/CD (Phase 7)](#bước-7-đóng-gói-docker--thiết-lập-cicd-phase-7)
8. [Prompt cho các tình huống đặc biệt (Thêm tính năng, Fix bug, Giả lập TV)](#các-prompt-tình-huống-đặc-biệt)

---

> 💡 **Lưu ý**: Trước khi bắt đầu, hãy đảm bảo dự án của bạn đã được cài đặt bộ `.agent/` (bằng câu Prompt tự động hoặc lệnh Terminal theo hướng dẫn tại [README gốc](../README.md)).

---

## BƯỚC 0: KHẢO SÁT & THIẾT LẬP CẤU HÌNH (PHASE 0: CONFIG CHECK)

Trước khi bắt đầu đặc tả nghiệp vụ, bạn có thể yêu cầu AI khảo sát xem dự án có cần kết nối các công cụ quản trị hoặc môi trường bên ngoài không.

### 💬 Prompt 0.1: Yêu cầu AI kiểm tra cấu hình ban đầu
Copy và dán vào khung chat của AI:

```text
Bắt đầu dự án: Hãy đọc hiểu file .agent/rules/AGENTS.md. Trước khi lập PRD, hãy kiểm tra và hỏi tôi xem dự án có cần thiết lập cấu hình tích hợp nào không (như kết nối Jira Cloud, GitHub Issues, Figma, máy ảo giả lập Android/TV, hoặc các API keys trong .agent/.env.agent) để chuẩn bị trước cho dự án!
```

> **Hành vi của AI**: AI sẽ đóng vai Tech Lead, liệt kê 4 nhóm cấu hình và hỏi bạn:
> 1. **Quản lý Task**: Có cần đồng bộ với Jira Cloud hoặc GitHub Issues không?
> 2. **Thiết kế UI/UX**: Có token Figma để import thiết kế không?
> 3. **Môi trường & Thiết bị**: Dự án có cần chạy máy ảo Android Mobile hoặc Android TV 10-foot UI không?
> 4. **API Keys & Biến môi trường**: Có cần điền OpenAI/Gemini/Anthropic API keys trong `.agent/.env.agent` không?
> 
> 👉 **Nếu bạn cần cấu hình**: AI sẽ hướng dẫn bạn điền thông tin vào `.agent/.env.agent` hoặc chạy script khởi tạo máy ảo.  
> 👉 **Nếu chưa cần ngay**: Bạn chỉ cần trả lời *"Bỏ qua cấu hình, bắt đầu làm PRD ngay"* để chuyển sang Bước 1.

---

## BƯỚC 1: KHỞI ĐỘNG & ĐẶC TẢ YÊU CẦU (PHASE 1: PRD)

### 💬 Prompt 1.1: Yêu cầu AI phỏng vấn làm rõ nghiệp vụ
Copy và dán vào khung chat của AI:

```text
Bắt đầu dự án: Hãy đọc hiểu các quy tắc trong .agent/rules/AGENTS.md và kích hoạt kỹ năng 01-core/01-prd-requirements. 
Hãy đóng vai Product Manager / Tech Lead, phỏng vấn tôi từng bước để làm rõ: bài toán cốt lõi, người dùng mục tiêu (personas), phạm vi MVP và các tiêu chí nghiệm thu (acceptance criteria). Chưa viết bất kỳ dòng code nào lúc này!
```

> **Hành vi của AI**: AI sẽ dừng lại, không sinh code bừa bãi. AI sẽ đặt 3-5 câu hỏi trọng tâm về bài toán của bạn.

---

### 💬 Prompt 1.2: Cung cấp thông tin trả lời & Tạo PRD
Sau khi bạn trả lời các câu hỏi của AI, gửi tiếp:

```text
Dưới đây là câu trả lời của tôi cho các câu hỏi trên:
[Điền tóm tắt ý tưởng / câu trả lời của bạn vào đây]

Hãy tổng hợp lại toàn bộ và xuất ra bản tài liệu hoàn chỉnh tại .agent/memory/PRD.md theo đúng mẫu chuẩn.
```

---

### 💬 Prompt 1.3: Phê duyệt Cổng 1 (Quality Gate 1 Sign-Off)
Sau khi đọc file `.agent/memory/PRD.md` do AI tạo ra và thấy hài lòng:

```text
Tôi chính thức phê duyệt bản PRD tại .agent/memory/PRD.md (Đạt Quality Gate 1). Hãy cập nhật trạng thái trong .agent/memory/project_state.json và sẵn sàng bước sang Phase 2.
```

---

## BƯỚC 2: THIẾT KẾ KIẾN TRÚC, CSDL & HỢP ĐỒNG API (PHASE 2)

### 💬 Prompt 2.1: Yêu cầu thiết kế toàn diện hệ thống
Copy và dán:

```text
Chúng ta bước vào Phase 2: Hãy kích hoạt lần lượt các kỹ năng:
1. 01-core/02-system-architecture: Thiết kế kiến trúc tổng thể, mô hình phân tầng và ghi nhận quyết định vào .agent/memory/ARCHITECTURE.md.
2. 01-core/03-database-strategy: Vẽ sơ đồ ERD Mermaid và đặc tả cấu trúc bảng, khóa chính/ngoại, index tại .agent/memory/DATABASE_SCHEMA.md.
3. 01-core/04-api-specification: Thiết kế hợp đồng API chuẩn Contract-First tại .agent/memory/openapi.yaml.

Hãy trình bày chi tiết và chờ tôi phê duyệt trước khi đi tiếp!
```

---

### 💬 Prompt 2.2: Phê duyệt Cổng 2 (Quality Gate 2 Sign-Off)
Sau khi kiểm tra kiến trúc, CSDL và API hợp đồng:

```text
Tôi phê duyệt thiết kế Kiến trúc, Database Schema và OpenAPI contract (Đạt Quality Gate 2). Hãy cập nhật project_state.json và chuyển sang Phase 3.
```

---

## BƯỚC 3: KHỞI TẠO MÔI TRƯỜNG ẢO & CÀI ĐẶT DEPENDENCIES (PHASE 3)

### 💬 Prompt 3.1: Yêu cầu chuẩn bị môi trường
Copy và dán:

```text
Chúng ta bước vào Phase 3: Hãy kích hoạt kỹ năng 01-core/05-environment-setup.
Hãy kiểm tra xem dự án cần môi trường ảo gì (Python .venv, isolated node_modules, Flutter doctor, v.v.). Hãy hỏi ý kiến tôi trước khi tạo, sau đó cài đặt các gói cần thiết và chạy Smoke Test kiểm tra test runner!
```

> **Hành vi của AI**: AI sẽ hỏi bạn: *"Bạn có muốn tạo môi trường ảo .venv / kiểm tra SDK không?"*. Bạn chỉ cần gõ *"Đồng ý, hãy tạo"* và AI sẽ tự động thực thi.

---

## BƯỚC 4: BÓC TÁCH TASK & ĐỒNG BỘ JIRA (PHASE 4)

### 💬 Prompt 4.1: Bóc tách công việc vào Backlog
Copy và dán:

```text
Bước vào Phase 4: Hãy bóc tách toàn bộ các tính năng từ PRD và API spec thành danh sách task chi tiết, nguyên tử (atomic) và có thể kiểm thử độc lập vào file .agent/memory/tasks.md. 
Nếu có cấu hình Jira trong .agent/.env.agent, hãy hỗ trợ đồng bộ ticket.
```

---

## BƯỚC 5: VIẾT CODE THEO CHU TRÌNH TDD (PHASE 5)

### 💬 Prompt 5.1: Thực hiện tính năng đầu tiên theo TDD
Copy và dán (thay tên tính năng tương ứng):

```text
Bước vào Phase 5: Chúng ta bắt đầu triển khai [Tên tính năng, ví dụ: Authentication & JWT Login].
Hãy kích hoạt kỹ năng 01-core/06-testing-qa cùng kỹ năng stack chuyên sâu [ví dụ: 02-stacks/backend-node-nest hoặc web-nextjs-react hoặc android-tv-kotlin].
Thực hiện nghiêm ngặt chu trình TDD:
1. Viết test case trước (Red).
2. Viết mã nguồn tối giản để test vượt qua (Green).
3. Tối ưu mã nguồn (Refactor).
4. Chạy toàn bộ test suite đảm bảo 100% pass và đánh dấu [x] vào .agent/memory/tasks.md!
```

---

## BƯỚC 6: RÀ SOÁT BẢO MẬT & TỐI ƯU (PHASE 6)

### 💬 Prompt 6.1: Quét bảo mật toàn diện
Sau khi các tính năng đã code xong:

```text
Bước vào Phase 6: Hãy kích hoạt kỹ năng 01-core/07-security-audit.
Tiến hành quét toàn bộ codebase:
- Kiểm tra rò rỉ Secrets / API Key trong code và git history.
- Rà soát lỗ hổng OWASP Top 10 (SQL Injection, XSS, CSRF, Broken Auth, IDOR).
- Chạy lệnh kiểm tra lỗ hổng thư viện phụ thuộc (npm audit / pip-audit).
Báo cáo chi tiết các vấn đề tìm thấy và đề xuất bản vá!
```

---

## BƯỚC 7: ĐÓNG GÓI DOCKER & THIẾT LẬP CI/CD (PHASE 7)

### 💬 Prompt 7.1: Đóng gói và chuẩn bị bàn giao
Copy và dán:

```text
Bước vào Phase 7: Hãy kích hoạt kỹ năng 01-core/08-devops-deployment.
1. Tạo Dockerfile multi-stage build tối ưu kích thước và bảo mật (chạy bằng non-root user).
2. Tạo file docker-compose.yml kết nối đầy đủ App, Database và Redis.
3. Thiết lập GitHub Actions workflow tại .github/workflows/ci.yml để tự động lint, test và build Docker image.
Kiểm tra bản build Docker thành công để đạt Quality Gate 4!
```

---

## CÁC PROMPT TÌNH HUỐNG ĐẶC BIỆT

### 🛠️ Tình huống 1: Thêm một tính năng mới vào dự án có sẵn
```text
Tôi muốn bổ sung thêm tính năng mới: [Mô tả tính năng, ví dụ: Tính năng Đánh dấu ghi chú yêu thích].
Hãy đọc quy trình trong .agent/workflows/new-feature.md, cập nhật lại PRD, Schema DB, OpenAPI spec, bổ sung task vào tasks.md và viết test trước khi code!
```

### 🐛 Tình huống 2: Sửa lỗi (Bug Fix) an toàn
```text
Dự án gặp lỗi sau: [Mô tả lỗi hoặc dán log lỗi].
Hãy tuân thủ nghiêm ngặt quy trình trong .agent/workflows/fix-bug.md:
1. Viết một bài automated test để tái hiện chính xác lỗi này (test phải fail trước).
2. Khoanh vùng nguyên nhân gốc rễ (Root Cause Analysis).
3. Áp dụng bản vá tối giản và chạy lại toàn bộ test suite để đảm bảo không bị lỗi hồi quy (regression)!
```

### 📺 Tình huống 3: Chuẩn bị giả lập Android TV & Test Remote
```text
Tôi cần chuẩn bị môi trường giả lập Android TV 1080p để kiểm thử điều khiển D-Pad.
Hãy hướng dẫn tôi chạy file script .agent/scripts/setup-emulators.sh tv-create và hướng dẫn cách gửi lệnh ADB điều hướng D-Pad!
```

### 🔄 Tình huống 4: Đồng bộ trạng thái lên Jira Cloud
```text
Tôi đã hoàn thành xong Milestone 1. Hãy kiểm tra các task đã tick [x] trong .agent/memory/tasks.md và chạy script sync-tickets.js để cập nhật trạng thái các ticket tương ứng trên Jira sang Done!
```
