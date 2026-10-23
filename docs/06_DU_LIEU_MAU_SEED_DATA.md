# TÀI LIỆU 06: BỘ DỮ LIỆU MẪU ĐẦY ĐỦ (STORIES, REELS, GROUPS & GRAPH)
**Đề tài:** Mạng xã hội hiện đại & Phân hệ gợi ý kết bạn  
**Mục tiêu:** Nạp sẵn dữ liệu sống động gồm Stories có thể xem ngay, Video Reels cuộn xem mượt mà, và Đồ thị bạn bè để demo.

---

## 1. SCRIPT MONGODB SEED DATA (`seed_mongo.js`)
Dán vào **MongoDB Compass** hoặc chạy qua lệnh `mongosh`:

```javascript
use social_network_db;

// 1. Xóa sạch dữ liệu cũ
db.users.drop();
db.groups.drop();
db.posts.drop();
db.stories.drop();
db.reels.drop();
db.messages.drop();

// 2. Tạo TTL Index cho Stories (Tự hủy sau 24h)
db.stories.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

// 3. Nạp Danh sách Users
db.users.insertMany([
  {
    _id: "usr_101",
    username: "vanan",
    email: "an.nguyen@gmail.com",
    role: "user",
    profile: {
      fullName: "Nguyễn Văn An",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      bio: "Sinh viên CNTT HUIT • Lập trình viên Fullstack & NoSQL",
      city: "Hồ Chí Minh",
      school: "HUIT",
      workplace: "HUIT",
      interests: ["Công nghệ", "Bóng đá", "AI & Data"]
    },
    createdAt: new Date()
  },
  {
    _id: "usr_102",
    username: "thibinh",
    email: "binh.tran@gmail.com",
    role: "user",
    profile: {
      fullName: "Trần Thị Bình",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      bio: "Yêu thích thiết kế UI/UX và nhiếp ảnh đường phố 📸",
      city: "Hồ Chí Minh",
      school: "HUIT",
      workplace: "HUIT",
      interests: ["Công nghệ", "Âm nhạc"]
    },
    createdAt: new Date()
  },
  {
    _id: "usr_104",
    username: "minhduc",
    email: "duc.pham@gmail.com",
    role: "user",
    profile: {
      fullName: "Phạm Minh Đức",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
      bio: "Devops & Cloud Enthusiast 🚀",
      city: "Hồ Chí Minh",
      school: "HUIT",
      workplace: "HUIT",
      interests: ["Công nghệ", "Bóng đá", "AI & Data"]
    },
    createdAt: new Date()
  }
]);

// 4. Nạp Stories 24h (Có ảnh đẹp hiển thị ngay trên Story Bar)
const now = new Date();
const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

db.stories.insertMany([
  {
    _id: "story_01",
    authorId: "usr_102", // Trần Thị Bình
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    caption: "Hôm nay trời Sài Gòn thật đẹp ☀️",
    viewers: [{ userId: "usr_101", viewedAt: now }],
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_02",
    authorId: "usr_104", // Phạm Minh Đức
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    caption: "Debug xong tính năng đồ thị Neo4j rồi anh em ơi! 🎉",
    viewers: [],
    createdAt: now,
    expiresAt: in24h
  }
]);

// 5. Nạp Short Videos (Reels / TikTok style có video mp4 trực tiếp)
db.reels.insertMany([
  {
    _id: "reel_01",
    authorId: "usr_104",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
    caption: "Góc làm việc chuẩn phong cách lập trình viên NoSQL 💻 #coding #developer #huit",
    musicTitle: "Lofi Coding Beats - Study Chill",
    tags: ["coding", "nosql", "tech"],
    likeCount: 154,
    commentCount: 28,
    viewsCount: 3420,
    createdAt: now
  },
  {
    _id: "reel_02",
    authorId: "usr_102",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600",
    caption: "Khám phá phong cảnh thiên nhiên cuối tuần sau kỳ thi căng thẳng 🌿 #travel #chill",
    musicTitle: "Aesthetic Morning - Chillhop Music",
    tags: ["travel", "chill"],
    likeCount: 290,
    commentCount: 45,
    viewsCount: 5120,
    createdAt: now
  }
]);

// 6. Nạp Posts Bảng Tin
db.posts.insertMany([
  {
    _id: "post_01",
    authorId: "usr_101",
    content: "Chào cả lớp NoSQL HUIT! Dự án Mạng xã hội của tụi mình đã tích hợp đầy đủ Stories 24h, Reels Video ngắn và Gợi ý kết bạn bằng Neo4j!",
    mediaUrls: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"],
    privacy: "public",
    likes: ["usr_102", "usr_104"],
    likeCount: 2,
    commentCount: 1,
    createdAt: now
  }
]);

// 7. Nạp Hội nhóm CLB
db.groups.insertMany([
  {
    _id: "grp_301",
    name: "CLB Tin học HUIT",
    description: "Câu lạc bộ học tập và nghiên cứu công nghệ thông tin",
    coverUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
    creatorId: "usr_101",
    memberCount: 3,
    privacy: "public",
    createdAt: now
  }
]);
```

---

## 2. SCRIPT NEO4J CYPHER GRAPH SEED DATA
Sao chép vào **Neo4j Browser** (http://localhost:7474):

```cypher
// 1. Xóa sạch dữ liệu cũ
MATCH (n) DETACH DELETE n;

// 2. Tạo Sở thích & Hội nhóm
CREATE (i1:Interest {id: "int_1", name: "Công nghệ"})
CREATE (i2:Interest {id: "int_2", name: "Bóng đá"})
CREATE (i3:Interest {id: "int_3", name: "Du lịch"})
CREATE (i4:Interest {id: "int_4", name: "Âm nhạc"})
CREATE (i5:Interest {id: "int_5", name: "AI & Data"});

CREATE (g1:Group {id: "grp_301", name: "CLB Tin học HUIT", privacy: "public"})
CREATE (g2:Group {id: "grp_302", name: "Cộng đồng Dev Sài Gòn", privacy: "public"});

// 3. Tạo Users
CREATE (u1:User {id: "usr_101", username: "vanan", fullName: "Nguyễn Văn An", city: "Hồ Chí Minh", workplace: "HUIT"})
CREATE (u2:User {id: "usr_102", username: "thibinh", fullName: "Trần Thị Bình", city: "Hồ Chí Minh", workplace: "HUIT"})
CREATE (u3:User {id: "usr_103", username: "vancuong", fullName: "Lê Văn Cường", city: "Hồ Chí Minh", workplace: "FPT Software"})
CREATE (u4:User {id: "usr_104", username: "minhduc", fullName: "Phạm Minh Đức", city: "Hồ Chí Minh", workplace: "HUIT"})
CREATE (u5:User {id: "usr_105", username: "thudung", fullName: "Hoàng Thu Dung", city: "Hồ Chí Minh", workplace: "VNG"})
CREATE (u8:User {id: "usr_108", username: "quocbao", fullName: "Trịnh Quốc Bảo", city: "Hồ Chí Minh", workplace: "Tiki"});

// 4. Liên kết Sở thích & Nhóm
CREATE (u1)-[:INTERESTED_IN]->(i1), (u1)-[:INTERESTED_IN]->(i2), (u1)-[:INTERESTED_IN]->(i5)
CREATE (u2)-[:INTERESTED_IN]->(i1), (u2)-[:INTERESTED_IN]->(i4)
CREATE (u4)-[:INTERESTED_IN]->(i1), (u4)-[:INTERESTED_IN]->(i2), (u4)-[:INTERESTED_IN]->(i5)

CREATE (u1)-[:MEMBER_OF {role: "admin", joinedAt: datetime()}]->(g1)
CREATE (u2)-[:MEMBER_OF {role: "member", joinedAt: datetime()}]->(g1)
CREATE (u4)-[:MEMBER_OF {role: "member", joinedAt: datetime()}]->(g1)

// 5. Quan hệ bạn bè
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u2), (u2)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u3), (u3)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u2)
CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u3)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u8), (u8)-[:FRIENDS_WITH {since: datetime()}]->(u1);
```
