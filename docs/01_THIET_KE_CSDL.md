# TÀI LIỆU 01: THIẾT KẾ CƠ SỞ DỮ LIỆU TOÀN DIỆN (POLYGLOT PERSISTENCE)
**Đề tài:** Mạng xã hội hiện đại & Phân hệ gợi ý kết bạn  
**Mô hình:** Kết hợp Neo4j (Graph Database) + MongoDB (Document Database)  
**Tiêu chuẩn:** Đáp ứng yêu cầu Báo cáo Đồ án Chuyên ngành & Thang điểm cuối kỳ HUIT

---

## 1. TỔNG QUAN PHÂN VÙNG DỮ LIỆU (POLYGLOT PERSISTENCE ARCHITECTURE)

Trong các hệ thống mạng xã hội quy mô lớn (Meta, LinkedIn, X), không có một cơ sở dữ liệu duy nhất nào tối ưu cho mọi loại truy vấn. Dự án áp dụng mô hình kiến trúc **Polyglot Persistence**:

```
                   ┌───────────────────────────────────────────────┐
                   │            MODERN SOCIAL WEB UI               │
                   │ (React + Tailwind + Stories + Reels + Graph)  │
                   └───────────────────────┬───────────────────────┘
                                           │ REST API / WebSocket
                                           ▼
                   ┌───────────────────────────────────────────────┐
                   │             BACKEND SERVER (Node.js)          │
                   └───────────────┬───────────────────────────────┘
                                   │
              ┌────────────────────┴────────────────────┐
              ▼                                         ▼
   ┌──────────────────────┐                  ┌──────────────────────┐
   │        NEO4J         │                  │       MONGODB        │
   │   (Graph Database)   │                  │  (Document Database) │
   ├──────────────────────┤                  ├──────────────────────┤
   │ • Mạng lưới bạn bè   │                  │ • Users & Auth       │
   │ • Hội nhóm (Groups)  │                  │ • Bài viết (Posts)   │
   │ • Sở thích (Interest)│                  │ • Stories (TTL 24h)  │
   │ • Thuật toán gợi ý   │                  │ • Short Videos/Reels │
   │ • Degrees of 6 Path  │                  │ • Chat & Messages    │
   │ • Trọng số tương tác │                  │ • Thông báo (Notifs) │
   └──────────────────────┘                  └──────────────────────┘
```

---

## 2. THIẾT KẾ NEO4J GRAPH DATABASE (MÔ HÌNH ĐỒ THỊ)

### 2.1. Danh mục các Node (Đỉnh đồ thị)

| Node Label | Thuộc tính (Properties) | Kiểu dữ liệu | Mô tả ý nghĩa |
| :--- | :--- | :--- | :--- |
| **`:User`** | `id` *(Unique Key)*<br>`username`<br>`fullName`<br>`city`<br>`workplace`<br>`createdAt` | String<br>String<br>String<br>String<br>String<br>Datetime | Định danh người dùng (trùng với `_id` bên MongoDB để liên kết 1-1). Lưu các thuộc tính phục vụ tính độ tương đồng vị trí và học vấn. |
| **`:Group`** | `id` *(Unique Key)*<br>`name`<br>`privacy` | String<br>String<br>String | Hội nhóm, Câu lạc bộ sinh viên trường HUIT hoặc cộng đồng công nghệ. |
| **`:Interest`** | `id` *(Unique Key)*<br>`name` | String<br>String | Sở thích cá nhân (Công nghệ, Bóng đá, Du lịch, Âm nhạc, AI & Data). |
| **`:ReelTag`** | `name` *(Unique Key)* | String | Thẻ phân loại video ngắn (coding, travel, chill). |

---

### 2.2. Danh mục các Relationship (Cạnh đồ thị)

| Tên quan hệ (Edge) | Cấu trúc quan hệ | Thuộc tính (Properties) | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- | :--- |
| **`FRIENDS_WITH`** | `(:User)-[:FRIENDS_WITH]->(:User)` | `since`: Datetime | Tình bạn chính thức 2 chiều giữa 2 người dùng. |
| **`SENT_REQUEST`** | `(:User)-[:SENT_REQUEST]->(:User)` | `createdAt`: Datetime | Lời mời kết bạn đang chờ người nhận phản hồi. |
| **`BLOCKS`** | `(:User)-[:BLOCKS]->(:User)` | `since`: Datetime | Chặn người dùng (loại trừ khỏi mọi thuật toán gợi ý). |
| **`INTERACTED_WITH`**| `(:User)-[:INTERACTED_WITH]->(:User)` | `weight`: Integer<br>`lastDate`: Datetime | Trọng số tương tác tự động tăng khi like bài, xem story hoặc nhắn tin cho nhau. |
| **`MEMBER_OF`** | `(:User)-[:MEMBER_OF]->(:Group)` | `role`: "admin" \| "member"<br>`joinedAt`: Datetime | Tham gia hội nhóm / CLB. |
| **`INTERESTED_IN`** | `(:User)-[:INTERESTED_IN]->(:Interest)`| `level`: "high" \| "medium" | Gắn sở thích cho người dùng để tính chỉ số Jaccard. |
| **`WATCHED`** | `(:User)-[:WATCHED]->(:ReelTag)` | `liked`: Boolean<br>`count`: Integer | Thói quen xem video ngắn để gợi ý bạn cùng gu giải trí. |

---

## 3. THIẾT KẾ MONGODB (DOCUMENT DATABASE)

Tên Database: `social_network_db`

### 3.1. Collection: `users` (Tài khoản & Hồ sơ cá nhân)
```json
{
  "_id": "usr_101",
  "username": "vanan",
  "email": "an.nguyen@gmail.com",
  "passwordHash": "$2b$10$e8QO...hash...",
  "role": "user", // "user" | "admin"
  "profile": {
    "fullName": "Nguyễn Văn An",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    "bio": "Sinh viên CNTT HUIT • Lập trình viên Fullstack & NoSQL",
    "city": "Hồ Chí Minh",
    "school": "Đại học Công Thương TP.HCM (HUIT)",
    "workplace": "HUIT",
    "interests": ["Công nghệ", "Bóng đá", "AI & Data"]
  },
  "isActive": true,
  "createdAt": "2026-01-15T08:00:00.000Z",
  "updatedAt": "2026-04-10T10:00:00.000Z"
}
```
*Index:* `{ "username": 1 }` (unique), `{ "email": 1 }` (unique).

---

### 3.2. Collection: `stories` (Stories tự hủy sau 24 giờ)
> **Đặc trưng NoSQL:** Sử dụng cơ chế TTL Index tự động giải phóng bộ nhớ.

```json
{
  "_id": "story_701",
  "authorId": "usr_101",
  "mediaType": "image", // "image" | "video"
  "mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
  "caption": "Buổi sáng tại khuôn viên HUIT thật đẹp!",
  "viewers": [
    { "userId": "usr_102", "viewedAt": "2026-04-12T08:30:00.000Z" }
  ],
  "viewCount": 1,
  "createdAt": "2026-04-12T08:00:00.000Z",
  "expiresAt": "2026-04-13T08:00:00.000Z"
}
```
*Chỉ mục đặc biệt (TTL Index):*
```javascript
db.stories.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });
```

---

### 3.3. Collection: `reels` (Video ngắn phong cách TikTok)
```json
{
  "_id": "reel_601",
  "authorId": "usr_104",
  "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "thumbnailUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
  "caption": "Góc làm việc chuẩn phong cách lập trình viên NoSQL 💻 #coding #nosql #tech",
  "musicTitle": "Original Sound - Lofi Beats Chill",
  "tags": ["coding", "nosql", "tech"],
  "likes": ["usr_101", "usr_102", "usr_103"],
  "likeCount": 3,
  "commentCount": 5,
  "viewsCount": 1280,
  "createdAt": "2026-04-11T19:00:00.000Z"
}
```
*Index:* `{ "tags": 1 }`, `{ "likeCount": -1 }`, `{ "createdAt": -1 }`.

---

### 3.4. Collection: `posts` (Bài viết trên Bảng tin)
```json
{
  "_id": "post_501",
  "authorId": "usr_101",
  "groupId": null, // null nếu là bài viết cá nhân, có ID nếu đăng trong nhóm
  "content": "Hoàn thành phân hệ gợi ý kết bạn thông minh với Neo4j và MongoDB!",
  "mediaUrls": [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
  ],
  "privacy": "public", // "public" | "friends" | "private"
  "likes": ["usr_102", "usr_103", "usr_104"],
  "likeCount": 3,
  "commentCount": 2,
  "createdAt": "2026-04-10T14:20:00.000Z",
  "updatedAt": "2026-04-10T14:20:00.000Z"
}
```
*Index:* `{ "authorId": 1, "createdAt": -1 }`, `{ "groupId": 1 }`.

---

### 3.5. Collection: `comments` (Bình luận bài viết & Reels)
```json
{
  "_id": "cmt_801",
  "targetType": "post", // "post" | "reel"
  "targetId": "post_501",
  "authorId": "usr_102",
  "content": "Thuật toán tính điểm bạn chung chạy mượt không An?",
  "createdAt": "2026-04-10T14:35:00.000Z"
}
```

---

### 3.6. Collection: `groups` (Hội nhóm & Câu lạc bộ)
```json
{
  "_id": "grp_301",
  "name": "CLB Tin học HUIT",
  "description": "Nơi sinh hoạt học thuật của sinh viên Khoa Công nghệ Thông tin HUIT",
  "coverUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
  "creatorId": "usr_101",
  "memberCount": 45,
  "privacy": "public",
  "createdAt": "2026-02-01T09:00:00.000Z"
}
```

---

### 3.7. Collection: `conversations` & `messages` (Phân hệ Nhắn tin Trực tiếp)
```json
// Collection: conversations
{
  "_id": "conv_101_102",
  "participants": ["usr_101", "usr_102"],
  "lastMessage": {
    "senderId": "usr_102",
    "text": "Alo An ơi, kiểm tra giúp mình đồ thị kết nối nhé",
    "sentAt": "2026-04-12T16:00:00.000Z"
  },
  "updatedAt": "2026-04-12T16:00:00.000Z"
}

// Collection: messages
{
  "_id": "msg_901",
  "conversationId": "conv_101_102",
  "senderId": "usr_102",
  "text": "Alo An ơi, kiểm tra giúp mình đồ thị kết nối nhé",
  "isRead": true,
  "createdAt": "2026-04-12T16:00:00.000Z"
}
```
*Index:* `{ "conversationId": 1, "createdAt": -1 }`.

---

### 3.8. Collection: `notifications` (Thông báo người dùng)
```json
{
  "_id": "notif_901",
  "recipientId": "usr_101",
  "senderId": "usr_104",
  "type": "FRIEND_REQUEST", // "FRIEND_REQUEST" | "POST_LIKED" | "GROUP_INVITE"
  "message": "Phạm Minh Đức đã gửi lời mời kết bạn",
  "link": "/friends",
  "isRead": false,
  "createdAt": "2026-04-12T16:05:00.000Z"
}
```
*Index:* `{ "recipientId": 1, "isRead": 1, "createdAt": -1 }`.

---

## 4. CHIẾN LƯỢC ĐỒNG BỘ DỮ LIỆU HAI CHIỀU (DATA SYNCHRONIZATION)

Để đảm bảo tính nhất quán dữ liệu (Data Consistency) giữa 2 cơ sở dữ liệu:
1. **Khóa liên kết duy nhất (Cross-Database Key):** Khóa chính `_id` dạng String của MongoDB được ánh xạ 1-1 chính xác vào thuộc tính `id` của Node `:User` và `:Group` trong Neo4j.
2. **Nguyên tắc phân nhiệm (Separation of Concerns):**
   - **Tất cả các phép duyệt đồ thị (Graph Traversal):** Tìm bạn chung, gợi ý bạn bè, đo khoảng cách ngắn nhất, tính số thành viên chung nhóm -> Đẩy cho **Neo4j**.
   - **Tất cả các thao tác chứa nội dung lớn (Blobs/Documents):** Bài viết, ảnh, video mp4, nội dung chat, hồ sơ chi tiết, stories 24h tự hủy -> Đẩy cho **MongoDB**.
3. **Mô hình truy vấn kết hợp (Join-at-Application-Layer):**
   - Ví dụ trang chủ Newsfeed: Backend truy vấn Neo4j lấy mảng `friendIds` (chỉ mất ~2ms) -> Truyền mảng này vào MongoDB qua câu lệnh `{ authorId: { $in: friendIds } }` để kéo bài viết đầy đủ thông tin về cho Frontend render.
