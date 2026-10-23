# TÀI LIỆU 07: ĐỀ CƯƠNG BÁO CÁO 50 - 60 TRANG & KỊCH BẢN BẢO VỆ CUỐI KỲ
**Môn học:** Dữ liệu NoSQL - HUIT  
**Giảng viên:** ThS. Nguyễn Thị Định  
**Quy chuẩn định dạng:** Font Times New Roman, Size 13, Paragraph Spacing 1.5 lines, độ dài từ 50 - 60 trang  
**Mục tiêu:** Đáp ứng trọn vẹn Mục 10 (2.0 điểm) trong thang điểm đánh giá.

---

## 1. PHÂN CHIA NHIỆM VỤ THÀNH VIÊN NHÓM (TỐI ĐA 3 SINH VIÊN)

| Thành viên | Vai trò phụ trách chính | Công việc cụ thể | Tỷ lệ hoàn thành |
| :--- | :--- | :--- | :---: |
| **Sinh viên 1** *(Nhóm trưởng)* | **Phụ trách Cơ sở dữ liệu & Thuật toán Đồ thị** | • Nghiên cứu lý thuyết Tool Neo4j Browser & Bloom (Mục 1-4).<br>• Thiết kế Graph Schema & xây dựng 4 thuật toán gợi ý kết bạn Cypher (FoAF, Jaccard, Hybrid, Shortest Path).<br>• Thực hiện kịch bản Backup/Restore CSDL Neo4j.<br>• Phụ trách Chương 2 và Chương 3 trong báo cáo. | 100% |
| **Sinh viên 2** | **Phụ trách Cơ sở dữ liệu Tài liệu & Backend API** | • Thiết kế MongoDB Schema (Users, Stories với TTL Index, Reels, Chat, Posts).<br>• Xây dựng Express Backend kết nối đa CSDL (Neo4j Driver + Mongoose).<br>• Thực hiện kịch bản Backup/Restore MongoDB bằng mongodump/mongorestore.<br>• Phụ trách Chương 4 (Backend API) và slide thuyết trình. | 100% |
| **Sinh viên 3** | **Phụ trách Giao diện Frontend & Trực quan hóa Đồ thị** | • Xây dựng giao diện React Vite + TailwindCSS hiện đại (Feed, Stories Bar 24h, Reels cuộn dọc TikTok style).<br>• Tích hợp thư viện Vis-Network trực quan hóa mạng lưới đồ thị bạn bè.<br>• Làm video demo dự phòng, kiểm thử toàn diện hệ thống.<br>• Phụ trách Chương 1, Chương 5 và tổng hợp cuốn báo cáo Word. | 100% |

---

## 2. CẤU TRÚC ĐỀ CƯƠNG QUYỂN BÁO CÁO CHI TIẾT (50 - 60 TRANG)

```
MỤC LỤC
DANH MỤC TỪ VIẾT TẮT
DANH MỤC HÌNH VẼ VÀ BẢNG BIỂU

LỜI MỞ ĐẦU ..................................................................... (Trang 1 - 3)
  1. Lý do chọn đề tài
  2. Mục tiêu nghiên cứu
  3. Phạm vi và đối tượng nghiên cứu
  4. Cấu trúc quyển báo cáo

CHƯƠNG 1: TỔNG QUAN VỀ CƠ SỞ DỮ LIỆU NOSQL VÀ CÔNG CỤ QUẢN TRỊ ................... (Trang 4 - 15)
  1.1. Giới thiệu tổng quan về NoSQL và các mô hình dữ liệu chính
       (Document, Key-Value, Column-family, Graph)
  1.2. Cơ sở dữ liệu đồ thị Neo4j và ngôn ngữ truy vấn Cypher
  1.3. Cơ sở dữ liệu tài liệu MongoDB và Aggregation Pipeline
  1.4. Nghiên cứu công cụ quản trị GUI Tool: Neo4j Browser & Neo4j Bloom (Mục 1-4 thang điểm)
       1.4.1. Hướng dẫn cài đặt và cấu hình Neo4j Web Interface
       1.4.2. Các chức năng cốt lõi: Soạn thảo Cypher, giải thích truy vấn (PROFILE/EXPLAIN)
       1.4.3. So sánh ưu - nhược điểm của Neo4j Browser với MongoDB Compass
       1.4.4. Phân tích bài toán mạng xã hội: Tại sao Graph Database là lựa chọn tối ưu?

CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG MẠNG XÃ HỘI ............................ (Trang 16 - 28)
  2.1. Yêu cầu bài toán và các ca sử dụng (Use Cases)
       2.1.1. Sơ đồ Use Case tổng thể hệ thống
       2.1.2. Phân hệ Gợi ý kết bạn (Friend Recommendation)
       2.1.3. Phân hệ Tin ngắn 24h (Stories) và Video ngắn (Reels)
       2.1.4. Phân hệ Hội nhóm CLB và Nhắn tin trực tiếp
  2.2. Thiết kế kiến trúc đa cơ sở dữ liệu (Polyglot Persistence Architecture)
  2.3. Thiết kế Cơ sở dữ liệu Đồ thị trên Neo4j
       2.3.1. Thiết kế các Nodes (:User, :Group, :Interest, :ReelTag)
       2.3.2. Thiết kế các Relationships (:FRIENDS_WITH, :MEMBER_OF, :INTERACTED_WITH,...)
  2.4. Thiết kế Cơ sở dữ liệu Tài liệu trên MongoDB
       2.4.1. Từ điển dữ liệu chi tiết cho 7 Collections
       2.4.2. Thiết kế chỉ mục đặc biệt: TTL Index cho Stories tự hủy 24h

CHƯƠNG 3: XÂY DỰNG BỘ THUẬT TOÁN GỢI Ý KẾT BẠN & TRUY VẤN NÂNG CAO ................ (Trang 29 - 40)
  3.1. Thuật toán bạn của bạn (FoAF) và Đếm số bạn chung (Mutual Friends)
  3.2. Thuật toán gợi ý qua Hội nhóm / CLB sinh hoạt chung
  3.3. Thuật toán Jaccard Similarity tính độ tương đồng sở thích
  3.4. Thuật toán Hybrid Recommendation kết hợp đa trọng số
  3.5. Thuật toán tìm đường đi ngắn nhất (Shortest Path - 6 Degrees of Separation)
  3.6. Thuật toán MongoDB Aggregation: Lọc Newsfeed cá nhân hóa và Xếp hạng Reels thịnh hành
  3.7. Kỹ thuật Import/Export và Sao lưu - Phục hồi dữ liệu (Mục 6 thang điểm)

CHƯƠNG 4: TRIỂN KHAI VÀ KẾT QUẢ ĐẠT ĐƯỢC (DEMO ỨNG DỤNG) ......................... (Trang 41 - 54)
  4.1. Môi trường triển khai (Docker Compose, Node.js, React)
  4.2. Triển khai Backend API và cơ chế kết nối 2 CSDL
  4.3. Giao diện ứng dụng thực tế (Chụp màn hình kèm chú thích chi tiết)
       4.3.1. Giao diện Bảng tin (Feed) và Khay Stories viền gradient
       4.3.2. Giao diện Lướt video ngắn Reels cuộn dọc TikTok style
       4.3.3. Giao diện Phân hệ Gợi ý kết bạn thông minh với % Match Score
       4.3.4. Giao diện Trực quan hóa Mạng lưới Đồ thị bạn bè (Vis-Network)
       4.3.5. Giao diện Khung chat trực tiếp và Danh sách Hội nhóm CLB
       4.3.6. Màn hình Quản trị viên (Admin Analytics) thống kê Top Influencer

CHƯƠNG 5: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN ........................................... (Trang 55 - 57)
  5.1. Những kết quả đạt được đối chiếu với yêu cầu đề tài
  5.2. Đánh giá ưu điểm và hạn chế
  5.3. Hướng phát triển trong tương lai (Áp dụng Graph Neural Networks - GNN)

TÀI LIỆU THAM KHẢO .............................................................. (Trang 58 - 59)
PHỤ LỤC: MÃ NGUỒN CÁC TRUY VẤN VÀ CẤU HÌNH DOCKER ................................ (Trang 60)
```

---

## 3. BỘ CÂU HỎI VẤN ĐÁP THƯỜNG GẶP KHI BẢO VỆ ĐỀ TÀI

### Câu 1: *"Tại sao phải dùng cả Neo4j lẫn MongoDB mà không dùng 1 CSDL duy nhất?"*
* **Trả lời mẫu:**  
  *"Thưa cô, đây là kiến trúc Polyglot Persistence được các mạng xã hội lớn như Meta và LinkedIn áp dụng. Neo4j là Graph Database, có cấu trúc Index-Free Adjacency giúp các phép duyệt đồ thị nhiều bậc (như tìm bạn của bạn, bạn chung, shortest path) chạy với độ phức tạp cực thấp $O(1)$ cho mỗi bước nhảy, không bị hiện tượng Join Bottleneck như SQL. Tuy nhiên, Neo4j không tối ưu để lưu trữ dữ liệu phi cấu trúc lớn như bài viết, hình ảnh, video mp4 hay tin nhắn. Do đó, nhóm kết hợp MongoDB (Document Database) để quản lý nội dung và tận dụng tính năng TTL Index cho Stories 24h, giúp hệ thống vừa có tốc độ tính toán đồ thị siêu nhanh, vừa linh hoạt trong việc lưu trữ nội dung đa phương tiện."*

### Câu 2: *"Cơ chế TTL Index của MongoDB cho Story 24h hoạt động như thế nào?"*
* **Trả lời mẫu:**  
  *"Thưa cô, MongoDB cung cấp chỉ mục Time-To-Live (TTL Index) trên trường có định dạng Date. Nhóm thiết lập trường `expiresAt` có giá trị bằng thời gian tạo cộng thêm 24 tiếng. Một tiến trình ngầm (Background Thread) trong MongoDB chạy định kỳ mỗi 60 giây một lần để quét các document có `expiresAt <= thời gian hiện tại` và tự động giải phóng bản ghi đó khỏi ổ đĩa mà không cần gọi lệnh DELETE từ phía ứng dụng."*

### Câu 3: *"Thuật toán Hybrid Recommendation của nhóm tính điểm gợi ý dựa trên công thức gì?"*
* **Trả lời mẫu:**  
  *"Thưa cô, nhóm tính điểm dựa trên tổng có trọng số của 4 tiêu chí được thực thi trực tiếp bằng Cypher Query trên Neo4j:*  
  $$\text{Score} = (MutualFriends \times 3) + (CommonGroups \times 2.5) + (SameCity \times 2) + (SameSchool \times 2)$$  
  *Những người có điểm cao nhất sẽ được sắp xếp lên đầu danh sách kèm theo nhãn lý do gợi ý cụ thể cho người dùng."*

### Câu 4: *"Làm sao đảm bảo dữ liệu giữa Neo4j và MongoDB luôn đồng bộ khi người dùng đăng ký hoặc xóa tài khoản?"*
* **Trả lời mẫu:**  
  *"Thưa cô, nhóm dùng ID dạng chuỗi UUID thống nhất giữa 2 bên. Khi người dùng đăng ký, Backend dùng transaction hoặc cơ chế tạo tuần tự: tạo Document bên MongoDB trước để lấy `_id`, sau đó dùng chính `_id` đó làm khóa duy nhất để tạo Node `:User {id: _id}` bên Neo4j. Khi xóa tài khoản, lệnh xóa sẽ kích hoạt đồng thời xóa Document trên MongoDB và lệnh `DETACH DELETE` node trên Neo4j."*
