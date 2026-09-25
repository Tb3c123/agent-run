# Hướng Dẫn Cấu Hình Môi Trường & Dịch Vụ Ngoại Vi (.agent/.env.agent)

Tài liệu này hướng dẫn bạn cách lấy các API Token cần thiết để AI có thể tự động đồng bộ task lên Jira, tạo Pull Request trên GitHub, hoặc trích xuất thiết kế từ Figma.

---

## 1. Cấu hình GitHub Token (`GITHUB_TOKEN`)

AI sử dụng token này để:
- Tạo các nhánh tính năng (feature branch) chuẩn.
- Tự động mở Pull Request kèm bản tóm tắt thay đổi khi hoàn thành task.
- Tạo release notes và commit code.

### Cách lấy token:
1. Đăng nhập vào GitHub -> Nhấn vào ảnh đại diện góc trên bên phải -> Chọn **Settings**.
2. Cuộn xuống menu bên trái -> Chọn **Developer settings** -> **Personal access tokens** -> **Fine-grained tokens** (hoặc Tokens classic).
3. Nhấn **Generate new token**:
   - **Repository access**: Chọn *Only select repositories* (chọn repo hiện tại).
   - **Permissions**:
     - *Contents*: Read and Write (để commit code/tạo tag).
     - *Pull requests*: Read and Write (để tạo PR).
     - *Issues*: Read and Write (nếu dùng GitHub Issues).
4. Sao chép chuỗi token (dạng `ghp_...` hoặc `github_pat_...`) và dán vào file `.agent/.env.agent`:
   ```env
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
   GITHUB_REPO_OWNER=ten_to_chuc_hoac_user
   GITHUB_REPO_NAME=ten_repository
   ```

---

## 2. Cấu hình Jira Cloud Token (`JIRA_API_TOKEN`)

AI sử dụng thông tin Jira để:
- Đọc danh sách tickets trong Sprint về cập nhật bảng task local (`.agent/memory/tasks.md`).
- Tự động chuyển trạng thái ticket trên Jira (To Do -> In Progress -> Done) kèm link commit/PR khi code xong.

### Cách lấy token:
1. Đăng nhập vào trang quản trị Atlassian: [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).
2. Nhấn nút **Create API token**.
3. Đặt nhãn (Label), ví dụ: `agent-pack-token` -> Nhấn **Create**.
4. Sao chép chuỗi token và điền vào `.agent/.env.agent`:
   ```env
   JIRA_HOST=https://your-company.atlassian.net
   JIRA_EMAIL=your-email@company.com
   JIRA_API_TOKEN=your_jira_token_here
   JIRA_PROJECT_KEY=ABC   # Mã tiền tố của dự án (ví dụ ABC-101 thì là ABC)
   ```

---

## 3. Cấu hình Figma (Tùy chọn)

Nếu bạn có bản thiết kế UI/UX trên Figma, AI có thể đọc các design tokens (màu sắc, typography, khoảng cách) để sinh code CSS/Tailwind/Flutter chính xác:
1. Mở Figma -> Vào **Settings** -> **Account** -> Cuộn xuống mục **Personal access tokens**.
2. Nhấn **Generate new token** -> Copy chuỗi token.
3. Điền vào `.agent/.env.agent`:
   ```env
   FIGMA_ACCESS_TOKEN=figd_xxxxxxxxxxxx
   FIGMA_FILE_KEY=key_nam_tren_url_figma_file
   ```

---

## 4. Kiểm tra kết nối

Sau khi điền token vào `.agent/.env.agent`, bạn có thể kiểm tra kết nối bằng cách chạy:
```bash
node .agent/scripts/sync-tickets.js --test
```
Nếu cấu hình đúng, công cụ sẽ hiển thị thông báo kết nối thành công tới GitHub/Jira!
