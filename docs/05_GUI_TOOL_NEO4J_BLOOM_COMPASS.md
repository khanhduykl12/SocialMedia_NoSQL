# TÀI LIỆU 05: NGHIÊN CỨU & SO SÁNH GUI TOOL (NEO4J BROWSER / BLOOM VS MONGODB COMPASS)
**Đề tài:** Mạng xã hội & Phân hệ gợi ý kết bạn  
**Mục tiêu:** Đáp ứng trọn vẹn Mục 1 - 4 (2.0 điểm) trong thang điểm lý thuyết & thực hành Tool.

---

## 1. GIỚI THIỆU VÀ CÀI ĐẶT CÔNG CỤ (MỤC 1: 0.5 ĐIỂM)

### 1.1. Công cụ nghiên cứu chính: **Neo4j Browser & Neo4j Desktop / Bloom**
- **Neo4j Browser:** Giao diện điều khiển nền web tương tác (Interactive Web Console) được tích hợp sẵn trên cổng `7474`, cho phép chạy các lệnh Cypher, hiển thị kết quả dưới dạng đồ thị (Force-Directed Graph), bảng dữ liệu (Table), văn bản hoặc JSON thô.
- **Neo4j Bloom:** Công cụ khám phá đồ thị nâng cao (Graph Exploration Tool) không cần viết Cypher, người dùng có thể tìm kiếm bằng ngôn ngữ tự nhiên (Search-phrases) và khám phá các cụm quan hệ trực quan.
- **Cách cài đặt:**
  1. Cài đặt qua Neo4j Desktop (phiên bản Windows Installer).
  2. Hoặc khởi chạy nhanh qua Docker:
     ```bash
     docker run -d --name neo4j-social \
       -p 7474:7474 -p 7687:7687 \
       -e NEO4J_AUTH=neo4j/password123 \
       neo4j:5-community
     ```
  3. Mở trình duyệt truy cập `http://localhost:7474`.

---

## 2. TRÌNH BÀY CHI TIẾT CÁC CHỨC NĂNG CỦA TOOL (MỤC 2: 0.5 ĐIỂM)

1. **Trực quan hóa đồ thị động (Interactive Force-Directed Layout):**
   - Các Nodes và Relationships tự động co giãn, phân cụm bằng thuật toán vật lý.
   - Cho phép kéo thả node, zoom, chọn màu sắc node, kích thước theo thuộc tính (Properties/Labels).
2. **Trình soạn thảo và thực thi Cypher (Cypher Editor & Syntax Highlighting):**
   - Hỗ trợ gợi ý từ khóa (Autocomplete), lưu lịch sử lệnh (History), ghim câu truy vấn thường dùng (Favorites/Pins).
3. **Phân tích hiệu năng truy vấn (Profile & Explain):**
   - Hỗ trợ lệnh `EXPLAIN` và `PROFILE` để xem cây thực thi truy vấn (Query Execution Plan), số phép duyệt qua node (DbHits), giúp tối ưu hóa chỉ mục (Indexes).
4. **Quản trị Metadata & Schema (Database Management):**
   - Hiển thị danh sách Labels, Relationship Types, Property Keys, kích thước Database, số lượng Node và Edge hiện có.

---

## 3. SO SÁNH ĐIỂM MẠNH, ĐIỂM YẾU VỚI MỘT GUI TOOL KHÁC (MỤC 3: 0.5 ĐIỂM)

### Bảng so sánh giữa **Neo4j Browser** và **MongoDB Compass**

| Tiêu chí | Neo4j Browser / Bloom | MongoDB Compass |
| :--- | :--- | :--- |
| **Loại mô hình dữ liệu** | Đồ thị (Graph - Nodes & Edges) | Tài liệu (Document - JSON/BSON) |
| **Giao diện trực quan hóa** | Cực mạnh về vẽ mạng lưới kết nối, đường đi, cụm cộng đồng liên kết đa chiều. | Trực quan hóa schema JSON, biểu đồ phân phối tần suất dữ liệu (Histograms), bản đồ GeoJSON. |
| **Truy vấn quan hệ nhiều bậc (Multi-hop Queries)** | Rất dễ dàng (`MATCH (a)-[*1..3]->(b)`), hiển thị ngay mạng lưới bạn bè. | Rất phức tạp (phải dùng `$graphLookup` nhiều tầng), khó quan sát được mạng lưới tổng thể. |
| **Chỉnh sửa dữ liệu trực tiếp** | Không hỗ trợ inline-edit trực tiếp trên node hình tròn (phải dùng lệnh Cypher `SET`). | Cho phép chỉnh sửa từng trường JSON trực tiếp trên bảng dữ liệu (Inline Document Editor). |
| **Phù hợp nhất cho** | Bài toán mạng xã hội, phòng chống gian lận, hệ thống gợi ý, sinh trắc học quan hệ. | Ứng dụng thương mại điện tử, bài viết blog, quản lý kho hàng, hồ sơ danh mục. |

---

## 4. NÊU BẬT ĐIỂM MẠNH CỦA TOOL VỚI CÁC LOẠI ỨNG DỤNG DATABASE (MỤC 4: 0.5 ĐIỂM)

Neo4j và các GUI Tool đồ thị (Neo4j Browser / Bloom) phát huy sức mạnh vượt trội đối với các loại ứng dụng sau:

1. **Mạng xã hội & Hệ thống gợi ý (Social Networks & Recommendation Engines):**
   - Phân tích mối quan hệ "Bạn của bạn", tìm người có sở thích tương đồng thông qua đường đi ngắn nhất mà không bị thắt cổ chai hiệu năng (JOIN bottleneck) như RDBMS.
2. **Phát hiện gian lận tài chính & Rửa tiền (Fraud Detection):**
   - Phát hiện các vòng luân chuyển tiền tròn (Circular Money Flow) hoặc các tài khoản dùng chung số điện thoại/IP/thẻ tín dụng.
3. **Mạng lưới tri thức (Knowledge Graphs) & Quản lý phụ thuộc (Dependency Management):**
   - Biểu diễn cây phả hệ, mạng lưới định tuyến viễn thông, chuỗi cung ứng logistics (Supply Chain) và quản lý vi dịch vụ (Microservices tracing).
