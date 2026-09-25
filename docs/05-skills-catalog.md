# 📚 TRA CỨU HỆ THỐNG KỸ NĂNG CỦA AGENT (SKILLS CATALOG)

Bộ kỹ năng của Agent-Pack được phân bổ rõ ràng thành **2 Hộp (Folders)** nhằm đảm bảo mã nguồn sinh ra có tính chuẩn xác cao nhất theo từng ngôn ngữ và nền tảng.

---

## 🗂️ HỘP 1: `skills/01-core/` (9 KỸ NĂNG QUY TRÌNH CỐT LÕI)

| STT | Tên Kỹ Năng | Mô Tả & Nhiệm Vụ Của AI | Sản Phẩm Đầu Ra |
| :--- | :--- | :--- | :--- |
| **01** | `01-prd-requirements` | Phỏng vấn làm rõ nghiệp vụ, personas, phạm vi MVP, user stories, acceptance criteria. | `.agent/memory/PRD.md` |
| **02** | `02-system-architecture` | Đánh giá kiến trúc (Clean/Hexagonal/Modular Monolith), vẽ sơ đồ luồng dữ liệu, lập ADR. | `.agent/memory/ARCHITECTURE.md` |
| **03** | `03-database-strategy` | Thiết kế sơ đồ quan hệ thực thể ERD (Mermaid), chuẩn hóa bảng, index, khóa ngoại. | `.agent/memory/DATABASE_SCHEMA.md` |
| **04** | `04-api-specification` | Thiết kế hợp đồng API Contract-First chuẩn OpenAPI 3.0 (REST/GraphQL/gRPC). | `.agent/memory/openapi.yaml` |
| **05** | `05-environment-setup` | **Hỏi ý kiến tạo môi trường ảo (.venv)**, cài đặt packages, smoke test runner. | `.venv`, `node_modules`, smoke test pass |
| **06** | `06-testing-qa` | Chu trình TDD (Red-Green-Refactor), viết Unit / Widget / Integration tests. | Test suite pass 100% |
| **07** | `07-security-audit` | Quét rò rỉ Secrets, kiểm tra OWASP Top 10 (SQLi, XSS, CSRF, Auth, CORS). | Báo cáo kiểm định an toàn |
| **08** | `08-devops-deployment` | Đóng gói Docker multi-stage, docker-compose môi trường local, GitHub Actions CI. | `Dockerfile`, `docker-compose.yml` |
| **09** | `09-integrations-env` | Quản trị `.env.agent`, đồng bộ 2 chiều Jira Cloud và GitHub Issues qua script. | Task đồng bộ trạng thái |

---

## 🗂️ HỘP 2: `skills/02-stacks/` (16 KỸ NĂNG CHUYÊN SÂU THEO NỀN TẢNG)

### 1. Nhóm Web & Frontend Hiện Đại
- **`web-nextjs-react`**: Next.js App Router, Server Components (RSC), Server Actions, Tailwind CSS, TanStack Query, Zustand.
- **`web-vue-nuxt`**: Nuxt 3, Vue Composition API `<script setup>`, Pinia, Nitro server engine.

### 2. Nhóm Backend & Microservices Hiệu Năng Cao
- **`backend-node-nest`**: NestJS, TypeScript DI, Prisma/Drizzle ORM, Zod validation, JWT Guards.
- **`backend-python-fastapi`**: FastAPI async, Pydantic v2, SQLAlchemy 2.0 Async Session, Alembic migrations.
- **`backend-go-service`**: Go Idiomatic, Gin/Fiber, pgx connection pool, Goroutines/Channels concurrency, gRPC.
- **`backend-java-spring`**: Spring Boot 3, Java 21, Spring Data JPA / Hibernate, Spring Security 6.
- **`backend-rust-axum`**: Rust, Axum web framework, Tokio async runtime, SQLx compile-time query, Serde.

### 3. Nhóm Di Động & Smart TV (Cross-Platform & Native)
- **`flutter-core`**: BLoC / Riverpod, Clean Architecture (Data/Domain/Presentation), Dio Interceptors, Hive/Isar cache.
- **`flutter-android-tv`**: **10-foot UI, D-Pad Remote FocusNode, FocusTraversalGroup, TV Banner, Leanback Launcher**.
- **`flutter-mobile`**: Android (Gradle/Manifest/Permissions) & iOS (Podfile/Info.plist/Cupertino).
- **`flutter-web`**: Responsive LayoutBuilder, GoRouter path URL strategy (không dấu `#`), Wasm.
- **`android-kotlin-compose`**: Kotlin 2.0, Jetpack Compose, Coroutines, StateFlow, Room DB, Hilt DI.
- **`android-tv-kotlin`**: Compose for TV (`androidx.tv.material3`), Leanback, `FocusRequester`, xử lý phím D-Pad.
- **`ios-swift-swiftui`**: Swift 5/6, SwiftUI declarative layouts, SwiftData, Swift Concurrency (`async/await`, `actor`).
- **`mobile-react-native`**: React Native, Expo SDK 51+, Expo Router, NativeWind (Tailwind), Reanimated.

### 4. Nhóm Trí Tuệ Nhân Tạo & Dữ Liệu
- **`ai-rag-llm`**: Vector DB (PgVector/Chroma), LangChain/LlamaIndex, Chiến lược Chunking văn bản, Semantic Search, Guardrails chống Prompt Injection.
