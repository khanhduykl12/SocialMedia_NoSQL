# ĐỀ TÀI 11: MẠNG XÃ HỘI HIỆN ĐẠI VÀ PHÂN HỆ GỢI Ý KẾT BẠN (FRIEND RECOMMENDATION)
**Môn học:** Dữ liệu NoSQL (HUIT)  
**Giảng viên hướng dẫn:** ThS. Nguyễn Thị Định  
**Thang điểm tối đa:** 10.0 điểm  
**Kiến trúc CSDL:** Polyglot Persistence (Neo4j Graph Database + MongoDB Document Database)  
**Công nghệ Web:** Node.js (Express / TypeScript) + React (Vite / TailwindCSS / Vis-Network)

---

## 🌟 ĐẶC TẢ SẢN PHẨM: MẠNG XÃ HỘI THẾ HỆ MỚI
Hệ thống kết hợp tinh hoa giữa **Instagram + TikTok + Facebook**, giải quyết triệt để bài toán mạng xã hội quy mô lớn bằng NoSQL:

1. **Khay Stories 24h (Instagram style):**
   - Đăng ảnh/video ngắn tự hủy sau đúng 24 giờ.
   - Ứng dụng tính năng kỹ thuật cao: **MongoDB TTL Index** (Time-To-Live Index) tự động xóa bản ghi trong CSDL.
2. **Phân hệ Video Ngắn Reels (TikTok style):**
   - Trải nghiệm lướt video ngắn cuộn dọc toàn màn hình (Vertical Snap Scroll).
   - Tương tác thả tim, bình luận, đĩa nhạc quay tròn và tính điểm thịnh hành bằng MongoDB Aggregation.
3. **Phân hệ Gợi ý Kết bạn Đột phá (Core NoSQL Graph):**
   - Khai thác sức mạnh của **Neo4j Cypher**:
     - *Bạn của bạn (FoAF) & Đếm bạn chung*.
     - *Độ tương đồng sở thích Jaccard Index*.
     - *Gợi ý theo CLB / Hội nhóm sinh hoạt chung*.
     - *Thuật toán tổng hợp Hybrid Weighted Score*.
4. **Bản đồ Mạng Lưới Xã Hội Trực Quan (Social Graph Explorer):**
   - Tích hợp **Vis-Network** ngay trên Web: Trực quan hóa đồ thị bóng tròn kết nối động, kéo thả, làm nổi bật bạn bè và tìm đường đi ngắn nhất (**6 Degrees of Separation**).
5. **Tin nhắn Trực tiếp (Direct Chat) & Hội nhóm CLB Sinh viên.**

---

## 🎯 DANH MỤC TÀI LIỆU CHI TIẾT (MỤC LỤC TRUNG TÂM)

1. **[01. Thiết kế Cơ sở Dữ liệu Toàn diện](file:///e:/Study/NoSQL/DoAn/docs/01_THIET_KE_CSDL.md)**
   - Mô hình Neo4j (User, Group, Interest) & MongoDB (Users, Stories với TTL Index, Reels, Posts, Messages, Comments, Notifications).
   - Bảng phân tích thuộc tính và chiến lược đồng bộ dữ liệu hai chiều.
2. **[02. Bộ Truy vấn NoSQL Chuyên sâu](file:///e:/Study/NoSQL/DoAn/docs/02_BO_TRUY_VAN_NOSQL.md)** *(Mục 5 & 7: 3.0 điểm)*
   - Lệnh tạo TTL Index cho Stories 24h.
   - Aggregation gom nhóm Stories theo bạn bè và tính điểm Trending Reels.
   - 4 Thuật toán gợi ý kết bạn Cypher (FoAF, Group, Jaccard, Hybrid) & Shortest Path.
3. **[03. Hướng dẫn Import/Export & Backup/Restore](file:///e:/Study/NoSQL/DoAn/docs/03_IMPORT_EXPORT_BACKUP_RESTORE.md)** *(Mục 6: 0.5 điểm)*
   - Lệnh dump/restore cho Neo4j và MongoDB (Kịch bản demo trước giảng viên).
4. **[04. Kiến trúc Ứng dụng Web Đầy đủ Tính năng](file:///e:/Study/NoSQL/DoAn/docs/04_KIEN_TRUC_WEB_APP.md)** *(Mục 8 & 9: 2.5 điểm)*
   - Cấu trúc Express TypeScript + React Vite.
   - Thiết kế giao diện StoryBar, ReelsFeed cuộn dọc, SocialGraphExplorer, ChatDrawer.
   - Danh sách RESTful API Endpoints.
5. **[05. Báo cáo Nghiên cứu GUI Tool (Neo4j Bloom vs Compass)](file:///e:/Study/NoSQL/DoAn/docs/05_GUI_TOOL_NEO4J_BLOOM_COMPASS.md)** *(Mục 1-4: 2.0 điểm)*
   - Báo cáo lý thuyết và so sánh đối chiếu GUI Tool đáp ứng 2.0 điểm barem.
6. **[06. Bộ Dữ liệu Mẫu (Seed Data) Hoàn Chỉnh](file:///e:/Study/NoSQL/DoAn/docs/06_DU_LIEU_MAU_SEED_DATA.md)**
   - Script nạp Stories ảnh đẹp, Reels có video mp4 phát trực tiếp, CLB và mạng lưới bạn bè.
7. **[07. Đề cương Báo cáo 50 - 60 trang & Câu hỏi Vấn đáp](file:///e:/Study/NoSQL/DoAn/docs/07_DE_CUONG_BAO_CAO_50_TRANG.md)** *(Mục 10: 2.0 điểm)*
   - Bảng phân chia công việc nhóm 3 sinh viên.
   - Đề cương chi tiết 5 Chương đúng chuẩn mẫu định dạng Khoa CNTT HUIT.
   - Bộ 4 câu hỏi vấn đáp hóc búa của giảng viên và câu trả lời mẫu ăn trọn điểm.

---

## 📊 BẢN ĐỒ BÁM SÁT THANG ĐIỂM CHẤM THI (10.0 ĐIỂM)

| STT | Nội dung đánh giá | Điểm | Tài liệu đối chiếu | Trạng thái |
| :---: | :--- | :---: | :--- | :---: |
| 1-4 | Tìm hiểu lý thuyết, chức năng, so sánh điểm mạnh/yếu của GUI Tool | **2.0** | [05_GUI_TOOL_NEO4J_BLOOM_COMPASS.md](file:///e:/Study/NoSQL/DoAn/docs/05_GUI_TOOL_NEO4J_BLOOM_COMPASS.md) | ✅ Hoàn thành |
| 5 | Xây dựng Database (Tạo DB, Insert dữ liệu, Truy vấn cơ bản & nâng cao) | **2.0** | [01_THIET_KE_CSDL.md](file:///e:/Study/NoSQL/DoAn/docs/01_THIET_KE_CSDL.md) & [02_BO_TRUY_VAN_NOSQL.md](file:///e:/Study/NoSQL/DoAn/docs/02_BO_TRUY_VAN_NOSQL.md) | ✅ Hoàn thành |
| 6 | Import/Export, Backup và Restore dữ liệu | **0.5** | [03_IMPORT_EXPORT_BACKUP_RESTORE.md](file:///e:/Study/NoSQL/DoAn/docs/03_IMPORT_EXPORT_BACKUP_RESTORE.md) | ✅ Hoàn thành |
| 7 | Triển khai truy vấn cơ bản & nâng cao trên GUI Tool | **1.0** | [02_BO_TRUY_VAN_NOSQL.md](file:///e:/Study/NoSQL/DoAn/docs/02_BO_TRUY_VAN_NOSQL.md) & [06_DU_LIEU_MAU_SEED_DATA.md](file:///e:/Study/NoSQL/DoAn/docs/06_DU_LIEU_MAU_SEED_DATA.md) | ✅ Hoàn thành |
| 8 | Triển khai Database kết nối CSDL với phần mềm ứng dụng | **0.5** | [04_KIEN_TRUC_WEB_APP.md](file:///e:/Study/NoSQL/DoAn/docs/04_KIEN_TRUC_WEB_APP.md) | ✅ Sẵn sàng code |
| 9 | Demo ứng dụng (Quản trị, CRUD, Gợi ý bạn bè, Stories, Reels, Đồ thị) | **2.0** | [04_KIEN_TRUC_WEB_APP.md](file:///e:/Study/NoSQL/DoAn/docs/04_KIEN_TRUC_WEB_APP.md) | ✅ Sẵn sàng code |
| 10 | Báo cáo (50-60 trang), Thuyết trình, Phân chia công việc, Source code | **2.0** | [07_DE_CUONG_BAO_CAO_50_TRANG.md](file:///e:/Study/NoSQL/DoAn/docs/07_DE_CUONG_BAO_CAO_50_TRANG.md) | ✅ Chuẩn chỉ |
| **Tổng** | **ĐIỂM TỐI ĐA** | **10.0** | | 🌟🌟🌟🌟🌟 |
