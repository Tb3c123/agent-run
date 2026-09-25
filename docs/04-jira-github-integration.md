# 🔗 HƯỚNG DẪN KẾT NỐI & ĐỒNG BỘ JIRA / GITHUB (.agent/.env.agent)

Agent-Pack áp dụng chiến lược **Local-First, Jira-Bridge**:
- Trong khi code hàng ngày: AI đọc ghi task trực tiếp trên `.agent/memory/tasks.md` để đạt độ trễ **0ms** và **100% offline**.
- Khi cần quản trị theo Sprint/Milestone: Sử dụng script `sync-tickets.js` để đẩy/kéo với Jira Cloud và GitHub.

---

## 1. CÁCH LẤY CREDENTIALS

### A. Jira Cloud (Atlassian)
1. Đăng nhập vào trang quản lý Atlassian API Tokens: [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).
2. Nhấn nút **Create API token**, đặt tên ví dụ `agent-sync-token`.
3. Sao chép chuỗi token và điền vào `.agent/.env.agent`:
   ```env
   JIRA_HOST=https://your-company.atlassian.net
   JIRA_EMAIL=your-email@company.com
   JIRA_API_TOKEN=ATATT3xFfGF0...
   JIRA_PROJECT_KEY=PROJ   # Ví dụ ticket PROJ-101 thì key là PROJ
   ```

### B. GitHub Personal Access Token (PAT)
1. Đăng nhập GitHub -> Vào **Settings** -> **Developer settings** -> **Personal access tokens** -> **Fine-grained tokens**.
2. Phân quyền tối thiểu an toàn:
   - *Contents*: Read and Write
   - *Pull requests*: Read and Write
   - *Issues*: Read and Write
3. Điền vào `.agent/.env.agent`:
   ```env
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
   GITHUB_REPO_OWNER=username_hoac_org
   GITHUB_REPO_NAME=ten_repository
   ```

---

## 2. CÁC LỆNH ĐỒNG BỘ CÓ SẴN

Sau khi điền token vào `.agent/.env.agent`, bạn có thể chạy các lệnh sau:

### 1. Kiểm tra kết nối tài khoản:
```bash
node .agent/scripts/sync-tickets.js --test
```
Nếu thành công, terminal sẽ báo:
`✅ Jira Connected successfully as: [Tên của bạn]`
`✅ GitHub Connected successfully as: [Username]`

### 2. Kéo (Pull) Ticket từ Jira về thành task local:
```bash
node .agent/scripts/sync-tickets.js --pull
```

### 3. Đẩy (Push) Task đã hoàn thành `[x]` lên Jira cập nhật trạng thái `Done`:
```bash
node .agent/scripts/sync-tickets.js --push
```

---

## 3. AN TOÀN BẢO MẬT
Toàn bộ thư mục `.agent/` và file chứa token `.agent/.env.agent` được CLI tự động thêm vào `.gitignore` của dự án mục tiêu. Nhờ đó toàn bộ hệ thống Agent-Pack chỉ hoạt động cục bộ trên máy lập trình viên, tuyệt đối không bị commit hay đẩy (push) vào repository mã nguồn của dự án.
