# TÀI LIỆU 04: KIẾN TRÚC WEB APPLICATION ĐẦY ĐỦ TÍNH NĂNG (MODERN SOCIAL MEDIA)
**Đề tài:** Mạng xã hội hiện đại & Phân hệ gợi ý kết bạn  
**Công nghệ:** Node.js (Express / TypeScript) + React (Vite / TailwindCSS / Vis-Network / Lucide-React)  
**Mục tiêu:** Xây dựng mạng xã hội giao diện cực kỳ hiện đại, hỗ trợ Stories 24h, Reels Video ngắn cuộn dọc, Chat, và Đồ thị bạn bè.

---

## 1. CẤU TRÚC GIAO DIỆN & CÁC MÀN HÌNH NỔI BẬT

Giao diện được thiết kế theo cảm hứng kết hợp giữa **Instagram Web + Threads + Facebook**:

```
┌────────────────────────────────────────────────────────────────────────┐
│  LOGO    🔍 Tìm kiếm       🏠 Feed   🎬 Reels   👥 Bạn bè   📊 Đồ thị │
├────────────────────────────┬─────────────────────────────┬─────────────┤
│  MENU ĐIỀU HƯỚNG BÊN TRÁI │  KHÔNG GIAN NỘI DUNG CHÍNH  │ CỘT PHẢI    │
│                            │                             │             │
│  • Trang chủ               │  [+] [O] [O] [O] [O] [O]    │ ⭐ GỢI Ý    │
│  • Bảng tin (Feed)         │  (Story Bar viền gradient)  │    KẾT BẠN  │
│  • Khám phá Reels          │                             │  • An (98%) │
│  • Mạng lưới đồ thị        │  ┌───────────────────────┐  │  • Đức (92%)│
│  • CLB / Hội nhóm          │  │ Khung Đăng bài viết   │  │             │
│  • Tin nhắn (3)            │  └───────────────────────┘  │ 💬 TIN NHẮN │
│  • Trang cá nhân           │  ┌───────────────────────┐  │   GẦN ĐÂY   │
│  • Admin Analytics         │  │ Bảng tin bài viết     │  │             │
│                            │  │ Ảnh + Video + Bình luận│  │ 🌐 MINI    │
│                            │  └───────────────────────┘  │    GRAPH    │
└────────────────────────────┴─────────────────────────────┴─────────────┘
```

---

## 2. CÁC TÍNH NĂNG HIỆN ĐẠI (SHOWCASE FEATURES)

### 1. Thanh Stories 24h (`StoryBar.tsx` & `StoryViewerModal.tsx`)
- Nằm ngay đầu Newsfeed:
  - Nút đầu tiên: `[+] Tạo tin của bạn`.
  - Các avatar bạn bè có **vòng tròn viền gradient động (Instagram style)** biểu thị có story mới chưa xem.
- Khi bấm vào: Mở trình xem Story toàn màn hình (Modal) với thanh **Progress bar 5 giây** tự động chuyển story tiếp theo.
- Tự động xóa sau 24h nhờ MongoDB TTL Index.

### 2. Phân hệ Video Ngắn Reels (`ReelsFeed.tsx`)
- Tab **Reels**: Giao diện cuộn video dọc toàn màn hình (Vertical Snap Scroll kiểu TikTok / Reels).
- Tự động phát khi cuộn tới (Autoplay & Loop).
- Cột nút tương tác nổi bên phải video:
  - Nút Thả tim (Hiển thị số tim).
  - Nút Bình luận (Mở drawer comment bên cạnh).
  - Nút Chia sẻ (Copy link).
  - Đĩa nhạc quay tròn góc dưới + Tên bài hát.

### 3. Phân hệ Gợi ý Kết bạn Thông minh (`FriendSuggestions.tsx`)
- Thẻ Card người dùng gợi ý kèm theo:
  - Avatar, Tên, Chức danh.
  - **Badge Độ phù hợp (Match Score %)**: Tính bằng thuật toán Hybrid Graph Score.
  - Số bạn chung & tên bạn chung mẫu.
  - Nút **[Kết bạn]** và **[Bỏ qua]**.
  - Bộ lọc đổi thuật toán: *Lọc theo Bạn chung (FoAF)*, *Lọc theo CLB*, *Lọc theo Sở thích (Jaccard)*.

### 4. Khám phá Đồ thị Mạng Xã Hội Trực quan (`SocialGraphExplorer.tsx`)
- Sử dụng thư viện **Vis-Network**.
- Trực quan hóa toàn bộ mạng lưới người dùng và các CLB dưới dạng đồ thị bong bóng nguyên tử 2D.
- Kéo thả node, bấm vào để làm nổi bật (Highlight) các đường kết nối và tìm đường đi ngắn nhất (Shortest Path 6 bậc).

### 5. Chat & Nhắn tin Thời gian thực (`ChatDrawer.tsx`)
- Cửa sổ tin nhắn pop-up hoặc trang tin nhắn chuyên biệt.
- Gửi tin nhắn tức thì, hiển thị trạng thái đã đọc.

---

## 3. DANH SÁCH RESTful API ENDPOINTS ĐẦY ĐỦ

```
POST   /api/auth/register                   # Đăng ký
POST   /api/auth/login                      # Đăng nhập

GET    /api/stories/feed                    # Lấy danh sách Stories còn hạn của bạn bè
POST   /api/stories                         # Đăng Story mới (tự gán expiresAt = +24h)
POST   /api/stories/:id/view                # Đánh dấu đã xem Story

GET    /api/reels/feed                      # Lấy danh sách Video ngắn thịnh hành
POST   /api/reels                           # Đăng Reel mới
POST   /api/reels/:id/like                  # Thả tim Reel

GET    /api/posts/feed                      # Lấy Bảng tin Newsfeed bài viết
POST   /api/posts                           # Đăng bài viết
POST   /api/posts/:id/like                  # Like bài viết

GET    /api/friends                         # Danh sách bạn bè hiện tại (Neo4j)
POST   /api/friends/request/:id             # Gửi lời mời kết bạn
POST   /api/friends/accept/:id              # Đồng ý kết bạn
GET    /api/recommendations/friends         # Gợi ý kết bạn thông minh (Query Neo4j)

GET    /api/graph/network-data              # Dữ liệu Nodes & Edges cho Vis-Network
GET    /api/graph/shortest-path             # Tìm đường đi 6 bậc giữa 2 người

GET    /api/chat/:friendId                  # Lịch sử tin nhắn
POST   /api/chat/:friendId                  # Gửi tin nhắn

GET    /api/groups                          # Danh sách CLB / Nhóm
POST   /api/groups/:id/join                 # Tham gia CLB
```
