# HỆ THỐNG MẠNG XÃ HỘI HIỆN ĐẠI & PHÂN HỆ GỢI Ý KẾT BẠN
**Đề tài 11 - Môn Dữ liệu NoSQL (Khoa CNTT - HUIT)**  
**Giảng viên:** ThS. Nguyễn Thị Định  
**Kiến trúc:** Polyglot Persistence (Neo4j Graph Database + MongoDB Document Database)  
**Công nghệ:** Node.js (Express TypeScript) + React (Vite + TailwindCSS v4 + Vis-Network)

---

## 🌳 CÂY THƯ MỤC CHUẨN CỦA DỰ ÁN

```
DoAn/
├── backend/                             # Mã nguồn Server (Node.js Express + TypeScript)
│   ├── src/
│   │   ├── config/
│   │   │   ├── mongo.config.ts          # Kết nối MongoDB (Mongoose)
│   │   │   └── neo4j.config.ts          # Kết nối Neo4j Bolt Driver
│   │   ├── models/                      # Các Mongoose Document Schemas
│   │   │   ├── User.model.ts            # Hồ sơ người dùng
│   │   │   ├── Post.model.ts            # Bài viết bảng tin
│   │   │   ├── Story.model.ts           # Stories 24h tự hủy bằng TTL Index
│   │   │   ├── Reel.model.ts            # Video ngắn TikTok style
│   │   │   ├── Group.model.ts           # Câu lạc bộ & Hội nhóm sinh viên
│   │   │   └── Message.model.ts         # Tin nhắn hội thoại trực tiếp
│   │   ├── services/
│   │   │   ├── neo4j.service.ts         # 4 Thuật toán gợi ý Cypher, Shortest Path, Centrality
│   │   │   └── seed.service.ts          # Khởi tạo dữ liệu mẫu cho cả 2 CSDL
│   │   ├── controllers/
│   │   │   └── api.controller.ts        # Bộ điều khiển xử lý RESTful APIs
│   │   ├── routes/
│   │   │   └── api.routes.ts            # Định tuyến toàn bộ endpoints
│   │   ├── scripts/
│   │   │   └── seed.ts                  # Lệnh nạp dữ liệu: npm run seed
│   │   └── server.ts                    # Khởi động Express Server
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/                            # Mã nguồn Giao diện (React Vite + TailwindCSS v4)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx               # Thanh điều hướng trên cùng & Nút Reset Seed
│   │   │   ├── Sidebar.tsx              # Menu bên trái
│   │   │   ├── StoryBar.tsx             # Khay Stories viền Gradient động kiểu Instagram
│   │   │   ├── StoryModal.tsx           # Trình xem Story toàn màn hình có Progress Bar 5s
│   │   │   ├── PostCard.tsx             # Thẻ bài viết (Like, Bình luận, Media ảnh)
│   │   │   ├── CreatePostModal.tsx      # Khung đăng bài viết mới
│   │   │   ├── FriendSuggestions.tsx    # Widget Gợi ý kết bạn thông minh (% Match Score)
│   │   │   ├── SocialGraphExplorer.tsx  # Bản đồ Đồ thị xã hội tương tác bằng Vis-Network
│   │   │   ├── DegreesOfSeparation.tsx  # Dò tìm đường đi 6 bậc giữa 2 người bất kỳ
│   │   │   └── ChatDrawer.tsx           # Khung chat tin nhắn tức thì (MongoDB)
│   │   ├── pages/
│   │   │   ├── FeedPage.tsx             # Trang Bảng tin chính & Stories
│   │   │   ├── ReelsPage.tsx            # Trang Video ngắn lướt dọc phong cách TikTok
│   │   │   ├── FriendsPage.tsx          # Trang quản lý kết bạn & bộ lọc thuật toán
│   │   │   ├── GraphPage.tsx            # Trang khám phá đồ thị toàn màn hình
│   │   │   └── AdminPage.tsx            # Trang Quản trị viên & Thống kê Degree Centrality
│   │   ├── services/
│   │   │   └── api.ts                   # Cấu hình gọi API Axios
│   │   ├── types/
│   │   │   └── index.ts                 # Định nghĩa kiểu dữ liệu TypeScript
│   │   ├── App.tsx                      # Component chính tích hợp toàn bộ hệ thống
│   │   ├── main.tsx
│   │   └── index.css                    # Cấu hình giao diện chuẩn Tailwind v4
│   ├── package.json
│   └── vite.config.ts
│
├── docs/                                # BỘ TÀI LIỆU CHUYÊN SÂU ĐÁP ỨNG THANG ĐIỂM (10.0 ĐIỂM)
│   ├── 01_THIET_KE_CSDL.md              # Thiết kế CSDL chi tiết (7 Collections, Nodes, Edges)
│   ├── 02_BO_TRUY_VAN_NOSQL.md          # Bộ Cypher & MQL Queries cơ bản và 4 thuật toán nâng cao
│   ├── 03_IMPORT_EXPORT_BACKUP_RESTORE.md # Hướng dẫn Backup/Restore CSDL demo trước giảng viên
│   ├── 04_KIEN_TRUC_WEB_APP.md          # Thiết kế kiến trúc Web, API Endpoints, UI Components
│   ├── 05_GUI_TOOL_NEO4J_BLOOM_COMPASS.md # Báo cáo nghiên cứu và so sánh GUI Tool (Mục 1-4 thang điểm)
│   ├── 06_DU_LIEU_MAU_SEED_DATA.md      # Dữ liệu mẫu hoàn chỉnh (Users, Stories, Reels video, Groups)
│   └── 07_DE_CUONG_BAO_CAO_50_TRANG.md  # Đề cương báo cáo Word 50-60 trang & Bộ câu hỏi vấn đáp
│
├── docker-compose.yml                   # Khởi chạy cụm Neo4j + MongoDB
├── TONG_QUAN_DE_TAI.md                  # Bản đồ tổng quan dự án (Master Index)
└── MO_TA_FULL_DO_AN.md                  # BÁO CÁO TOÀN DIỆN ĐỒ ÁN ĐẦY ĐỦ 10 ĐIỂM (BẢN CHÍNH THỨC)
```

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY ỨNG DỤNG

### ⚡ Cách 1: Khởi chạy 1-Click (Khuyên dùng)
Bạn chỉ cần **nhấp đúp chuột vào file `run.bat`** tại thư mục gốc của dự án:
- File script sẽ tự động kiểm tra Docker Containers (`social_mongodb` và `social_neo4j`), tự khởi động nếu chưa chạy.
- Tự động mở 2 cửa sổ chạy **Backend Server** (Port 5000) và **Frontend Vite** (Port 5173).
- Tự động mở trình duyệt web đến địa chỉ: **`http://localhost:5173`**.
- Cung cấp Menu tương tác để nạp lại dữ liệu mẫu (`npm run seed`) hoặc dừng container bất kỳ lúc nào.

### 🛠️ Cách 2: Khởi chạy thủ công từng phần
#### 1. Khởi động Cơ sở Dữ liệu (Docker)
  *(Truy cập Neo4j Browser tại http://localhost:7474 với username: `neo4j`, password: `password123`)*

### 2. Khởi động Backend Server
```bash
cd backend
npm run dev
```
Server chạy tại: `http://localhost:5000`  
Nạp dữ liệu mẫu: `npm run seed`

### 3. Khởi động Giao diện Web Frontend
```bash
cd frontend
npm run dev
```
Truy cập ứng dụng tại: **`http://localhost:5173`**

---

## 🌟 CÁC TÍNH NĂNG ĐỘT PHÁ ĐỂ DEMO
1. **Khay Stories 24h:** Ảnh/video ngắn tự hủy sau đúng 24h bằng tính năng **MongoDB TTL Index**.
2. **Tab Reels Video ngắn:** Lướt video dọc toàn màn hình phong cách TikTok.
3. **Phân hệ Gợi ý Kết bạn Thông minh:** Lọc theo Bạn của bạn (FoAF), Cùng CLB/Hội nhóm, Độ tương đồng sở thích (Jaccard) và Điểm tổng hợp Hybrid Score.
4. **Bản đồ Đồ thị Xã hội Tương tác (Vis-Network):** Vẽ mạng lưới các node người dùng và hội nhóm chuyển động vật lý, phóng to thu nhỏ, chọn node xem chi tiết.
5. **Dò tìm Đường đi 6 Bậc (Degrees of Separation):** Thuật toán `shortestPath` Neo4j tìm mắt xích bạn bè giữa 2 người lạ.
6. **Bảng Điều Khiển Quản Trị (Admin Analytics):** Xếp hạng Top Influencer theo Degree Centrality.
