# 📁 DATABASE SCRIPTS - BỘ KỊCH BẢN NẠP DỮ LIỆU ĐỒ ÁN NOSQL

Thư mục này cung cấp trọn bộ **3 kịch bản nạp dữ liệu thật (Seed Data)** và cấu trúc bảng phục vụ chạy thử nghiệm, demo đồ án và nộp báo cáo:

| Tên File | Công Nghệ | Mục Đích & Cách Dùng |
| :--- | :--- | :--- |
| **`01_seed_neo4j.cypher`** | **Neo4j (Graph DB)** | Kịch bản Cypher nạp 12 Users, Sở thích, CLB và mạng lưới bạn bè (FoAF, Jaccard, đường đi 6 bậc). Dán vào **Neo4j Browser** (`http://localhost:7474`) hoặc chạy qua `cypher-shell`. |
| **`02_seed_mongodb.js`** | **MongoDB (Document DB)** | Kịch bản nạp toàn bộ Collections: Users, Posts, Stories 24h, Reels Video, Groups, Messages và tạo TTL Indexes. Dán vào tab `_MONGOSH_` của **MongoDB Compass** hoặc chạy `mongosh`. |
| **`03_relational_schema_and_seed.sql`** | **SQL (MySQL / PostgreSQL)** | Kịch bản CSDL Quan Hệ (RDBMS) tương đương gồm 8 bảng, khóa ngoại (FK), dữ liệu mẫu và câu truy vấn SQL tìm bạn chung FoAF để **so sánh hiệu năng với Neo4j**. |

---

## 🚀 HƯỚNG DẪN CHẠY DATA REAL NHANH NHẤT

### Cách 1: Nạp Tự Động 1-Click bằng API Backend (Khuyên dùng)
Khi backend đang chạy, bạn chỉ cần gọi API:
```bash
# Bằng PowerShell:
Invoke-RestMethod -Method Post -Uri http://localhost:5000/api/seed

# Hoặc bằng cURL:
curl -X POST http://localhost:5000/api/seed
```
Hệ thống sẽ tự động dọn dẹp và nạp đồng thời toàn bộ dữ liệu vào cả **MongoDB** và **Neo4j**.

---

### Cách 2: Chạy trực tiếp trên Neo4j Browser
1. Mở trình duyệt truy cập: **`http://localhost:7474`**
2. Đăng nhập với tài khoản: `neo4j` / mật khẩu: `password123`
3. Mở file [`01_seed_neo4j.cypher`](./01_seed_neo4j.cypher), copy toàn bộ nội dung, dán vào thanh lệnh của Neo4j Browser và nhấn nút **Run** (hoặc `Ctrl + Enter`).

---

### Cách 3: Chạy trực tiếp trên MongoDB Compass
1. Mở **MongoDB Compass**, kết nối tới `mongodb://localhost:27017`
2. Mở thanh công cụ **_MONGOSH_** ở góc dưới màn hình.
3. Mở file [`02_seed_mongodb.js`](./02_seed_mongodb.js), copy toàn bộ nội dung, dán vào cửa sổ _MONGOSH_ và nhấn **Enter**.

---

### Cách 4: Chạy trên MySQL / PostgreSQL / DBeaver (Nếu cần đối chiếu SQL)
1. Mở DBeaver / phpMyAdmin / pgAdmin hoặc MySQL Workbench.
2. Tạo database mới: `CREATE DATABASE social_network_sql; USE social_network_sql;`
3. Mở và thực thi file [`03_relational_schema_and_seed.sql`](./03_relational_schema_and_seed.sql).
