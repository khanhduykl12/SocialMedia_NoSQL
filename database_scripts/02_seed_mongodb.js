// ==============================================================================================
// ĐỀ TÀI: MẠNG XÃ HỘI VÀ PHÂN HỆ GỢI Ý KẾT BẠN (FRIEND RECOMMENDATION) - MÔN NOSQL (HUIT)
// FILE SCRIPT: 02_seed_mongodb.js
// MÔ TẢ: Kịch bản nạp toàn bộ Collections MongoDB: Users, Posts, Stories, Reels, Groups, Messages
// CÁCH CHẠY:
//   Cách 1: Mở MongoDB Compass -> Kết nối mongodb://localhost:27017 -> Chọn tab _MONGOSH_ phía dưới -> Dán toàn bộ nội dung file này vào và bấm Enter.
//   Cách 2: Chạy lệnh từ terminal: mongosh mongodb://localhost:27017/social_network_db 02_seed_mongodb.js
// ==============================================================================================

use social_network_db;

print("🌱 [MongoDB Seed] Bắt đầu dọn dẹp và nạp dữ liệu mẫu phong phú...");

// 1. Dọn dẹp dữ liệu cũ
db.users.drop();
db.posts.drop();
db.stories.drop();
db.reels.drop();
db.groups.drop();
db.messages.drop();

// 2. Thiết lập Indexes quan trọng
// TTL Index cho Stories: tự động xóa sau 24h (expiresAt)
db.stories.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "email": 1 }, { unique: true });
db.posts.createIndex({ "createdAt": -1 });
db.messages.createIndex({ "conversationId": 1, "createdAt": 1 });

const now = new Date();
const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

// 3. Nạp 12 Người dùng phong phú (Users)
db.users.insertMany([
  {
    _id: "usr_101",
    username: "khanhduy",
    email: "duy.nguyen@gmail.com",
    passwordHash: "123456",
    role: "admin",
    profile: {
      fullName: "Nguyễn Khánh Duy",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      bio: "Sinh viên CNTT HUIT • Lập trình viên Fullstack & Nghiên cứu NoSQL",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Khoa CNTT - HUIT",
      interests: ["Công nghệ", "Bóng đá", "AI & Data"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_102",
    username: "thibinh",
    email: "binh.tran@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Trần Thị Bình",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      bio: "UI/UX Designer • Yêu thích thiết kế tối giản và nhiếp ảnh đường phố 📸",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Goonly Studio",
      interests: ["Công nghệ", "UI/UX Design", "Âm nhạc"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_103",
    username: "vancuong",
    email: "cuong.le@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Lê Văn Cường",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      bio: "Senior Backend Engineer • Yêu thích Distributed Systems & Cloud",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "FPT Software",
      interests: ["Công nghệ", "Bóng đá", "AI & Data"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_104",
    username: "minhduc",
    email: "duc.pham@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Phạm Minh Đức",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
      bio: "Cloud & Database Architect • Đam mê đồ thị mạng xã hội Neo4j 🚀",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Khoa CNTT - HUIT",
      interests: ["Công nghệ", "Bóng đá", "AI & Data"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_105",
    username: "thudung",
    email: "dung.hoang@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Hoàng Thu Dung",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      bio: "Data Analyst & Travel Blogger • Khám phá dữ liệu và thế giới ✈️",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "VNG Corporation",
      interests: ["Du lịch", "AI & Data", "Âm nhạc"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_106",
    username: "hoangnam",
    email: "nam.do@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Đỗ Hoàng Nam",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      bio: "AI Engineer • Xây dựng các hệ thống gợi ý thông minh với Graph GNN",
      city: "Hà Nội",
      school: "Đại học Bách Khoa",
      workplace: "Zalo AI Lab",
      interests: ["Công nghệ", "AI & Data"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_107",
    username: "thuylinh",
    email: "linh.vu@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Vũ Thùy Linh",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      bio: "Product Manager • FinTech & E-Commerce Solutions",
      city: "Hồ Chí Minh",
      school: "Đại học Kinh Tế TP.HCM",
      workplace: "MoMo Fintech",
      interests: ["Du lịch", "Âm nhạc", "UI/UX Design"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_108",
    username: "quocbao",
    email: "bao.trinh@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Trịnh Quốc Bảo",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      bio: "Mobile Engineer • Flutter & Swift Enthusiast",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Tiki Tech",
      interests: ["Công nghệ", "Bóng đá", "Du lịch"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_109",
    username: "myhanh",
    email: "hanh.dinh@huit.edu.vn",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Đinh Mỹ Hạnh",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      bio: "Giảng viên Khoa Công nghệ Thông tin - HUIT",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Đại học Công Thương TP.HCM",
      interests: ["Công nghệ", "AI & Data"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_110",
    username: "tuananh",
    email: "anh.bui@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Bùi Tuấn Anh",
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
      bio: "DevOps Engineer • Kubernetes, Docker & CI/CD pipeline",
      city: "Hồ Chí Minh",
      school: "HUIT",
      workplace: "Shopee Vietnam",
      interests: ["Công nghệ", "Bóng đá"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_111",
    username: "ngoclan",
    email: "lan.phan@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Phan Ngọc Lan",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      bio: "Cyber Security Researcher • Bảo mật ứng dụng & Database NoSQL",
      city: "Hà Nội",
      school: "Học viện Kỹ thuật Mật mã",
      workplace: "Viettel Cyber Security",
      interests: ["Công nghệ", "AI & Data"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_112",
    username: "thanhtung",
    email: "tung.mai@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Mai Thanh Tùng",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
      bio: "Lập trình viên Web React & NodeJS • Thành viên CLB Tin Học HUIT",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "HUIT",
      interests: ["Công nghệ", "Bóng đá"]
    },
    createdAt: now,
    updatedAt: now
  }
]);

// 4. Nạp Hội nhóm / CLB (Groups)
db.groups.insertMany([
  {
    _id: "grp_301",
    name: "CLB Tin học HUIT",
    description: "Câu lạc bộ học tập, chia sẻ kinh nghiệm lập trình và nghiên cứu công nghệ khoa CNTT trường HUIT.",
    coverUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
    creatorId: "usr_101",
    memberCount: 5,
    privacy: "public",
    createdAt: now
  },
  {
    _id: "grp_302",
    name: "Cộng đồng Dev Sài Gòn",
    description: "Diễn đàn trao đổi kỹ thuật cho lập trình viên Backend, Frontend và DevOps tại TP. Hồ Chí Minh.",
    coverUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    creatorId: "usr_103",
    memberCount: 3,
    privacy: "public",
    createdAt: now
  },
  {
    _id: "grp_303",
    name: "NoSQL & Big Data Lab",
    description: "Nhóm nghiên cứu chuyên sâu về MongoDB, Neo4j, Redis, Cassandra và xử lý dữ liệu lớn.",
    coverUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    creatorId: "usr_104",
    memberCount: 3,
    privacy: "public",
    createdAt: now
  },
  {
    _id: "grp_304",
    name: "UI/UX Design Vietnam",
    description: "Nơi chia sẻ case study, layout thiết kế giao diện hiện đại và các trào lưu thẩm mỹ mới.",
    coverUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800",
    creatorId: "usr_102",
    memberCount: 2,
    privacy: "public",
    createdAt: now
  }
]);

// 5. Nạp Stories 24h
db.stories.insertMany([
  {
    _id: "story_01",
    authorId: "usr_102",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    caption: "Chuyến dã ngoại cuối tuần của CLB HUIT 🌿 Trời hôm nay trong xanh tuyệt đẹp!",
    viewers: [{ userId: "usr_101", viewedAt: now }],
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_02",
    authorId: "usr_104",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    caption: "Code xuyên đêm với thuật toán đồ thị Neo4j 💻 Đã tối ưu hóa tốc độ truy vấn!",
    viewers: [],
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_03",
    authorId: "usr_105",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    caption: "Bình minh trên biển Vũng Tàu 🌅 Nạp lại năng lượng sau tuần học tập căng thẳng.",
    viewers: [],
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_04",
    authorId: "usr_108",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    caption: "Setup góc làm việc mới với 2 màn hình 🚀 Sẵn sàng cho buổi demo đồ án NoSQL!",
    viewers: [],
    createdAt: now,
    expiresAt: in24h
  }
]);

// 6. Nạp Short Video Reels
db.reels.insertMany([
  {
    _id: "reel_01",
    authorId: "usr_104",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
    caption: "Góc làm việc chuẩn phong cách lập trình viên NoSQL 💻 #coding #developer #huit #neo4j",
    musicTitle: "Lofi Coding Beats - Study Chill",
    tags: ["coding", "nosql", "tech", "huit"],
    likeCount: 154,
    commentCount: 28,
    viewsCount: 3420,
    likes: ["usr_101", "usr_102"],
    createdAt: now
  },
  {
    _id: "reel_02",
    authorId: "usr_102",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600",
    caption: "Khám phá phong cảnh thiên nhiên cuối tuần sau kỳ thi căng thẳng 🌿 #travel #chill #design",
    musicTitle: "Aesthetic Morning - Chillhop Music",
    tags: ["travel", "chill", "lifestyle"],
    likeCount: 290,
    commentCount: 45,
    viewsCount: 5120,
    likes: ["usr_101", "usr_104"],
    createdAt: now
  }
]);

// 7. Nạp Bài viết Bảng tin (Multi-Photo Posts)
db.posts.insertMany([
  {
    _id: "post_01",
    authorId: "usr_101",
    content: "Chào cả lớp NoSQL - Khoa CNTT HUIT! 🎉\n\nDự án Đề tài 11: Mạng xã hội & Phân hệ gợi ý kết bạn của tụi mình đã chính thức hoàn thiện với:\n✅ Bảng tin Timeline với bố cục ảnh đa tầng phong cách Goonly ấm áp\n✅ Phân hệ gợi ý kết bạn thông minh kết hợp 4 thuật toán trên đồ thị Neo4j (FoAF, Jaccard, Common Groups, Hybrid)\n✅ Hộp thư tin nhắn hai chiều và Stories 24h tự hủy bằng TTL Index!",
    mediaUrls: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800"
    ],
    privacy: "public",
    likes: ["usr_102", "usr_103", "usr_104"],
    likeCount: 48,
    comments: [
      { authorId: "usr_102", content: "Chúc mừng nhóm nhé! Giao diện tone màu ấm nhìn rất sang và dễ nhìn!", createdAt: now },
      { authorId: "usr_104", content: "Thuật toán FoAF và Jaccard gợi ý bạn bè chuẩn đét luôn Duy ơi!", createdAt: now }
    ],
    commentCount: 12,
    createdAt: new Date(now.getTime() - 30 * 60000)
  },
  {
    _id: "post_02",
    authorId: "usr_102",
    content: "Vừa hoàn thiện xong bộ Design System phong cách Goonly Warm Dribbble cho ứng dụng mạng xã hội! Sự kết hợp giữa nền kem #FAF7F2, chữ nâu trầm #1C1713 và viền ấm mang lại cảm giác cực kỳ thư giãn và cao cấp ✨ Mọi người thích giao diện sáng hay dark mode hơn?",
    mediaUrls: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_105", "usr_107"],
    likeCount: 92,
    comments: [],
    commentCount: 18,
    createdAt: new Date(now.getTime() - 90 * 60000)
  },
  {
    _id: "post_03",
    authorId: "usr_104",
    content: "Đo đạc hiệu năng giữa Neo4j và SQL truyền thống cho bài toán tìm bạn của bạn (FoAF) bậc 3:\n- Trên RDBMS (MySQL/PostgreSQL) với 3 lần JOIN: mất trung bình 340ms khi dữ liệu tăng dần.\n- Trên đồ thị Neo4j với Pointer Hopping: chỉ mất 12ms! Đồ thị thực sự là chân ái cho các mạng lưới xã hội 🚀🔥",
    mediaUrls: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_103"],
    likeCount: 78,
    comments: [],
    commentCount: 14,
    createdAt: new Date(now.getTime() - 150 * 60000)
  },
  {
    _id: "post_04",
    authorId: "usr_103",
    content: "Kiến trúc Microservices kết hợp giữa MongoDB (Document Model để lưu trữ linh hoạt bài viết, tin nhắn, phản hồi) và Neo4j (Graph Model để giải quyết các truy vấn đồ thị quan hệ phức tạp) chính là giải pháp tối ưu hàng đầu hiện nay.",
    mediaUrls: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_104"],
    likeCount: 64,
    comments: [],
    commentCount: 9,
    createdAt: new Date(now.getTime() - 240 * 60000)
  },
  {
    _id: "post_05",
    authorId: "usr_105",
    content: "Một góc làm việc đầy cảm hứng tại VNG Campus chiều nay. Làm việc với dữ liệu mạng xã hội lớn luôn đem lại nhiều thách thức thú vị ☀️🌿",
    mediaUrls: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_102"],
    likeCount: 110,
    comments: [],
    commentCount: 16,
    createdAt: new Date(now.getTime() - 360 * 60000)
  },
  {
    _id: "post_06",
    authorId: "usr_109",
    content: "Khoa Công nghệ Thông tin - HUIT đánh giá rất cao đồ án Đề tài 11 về Mạng xã hội và phân hệ gợi ý kết bạn. Các bạn sinh viên đã vận dụng rất tốt cả lý thuyết và thực tiễn giữa MongoDB và Neo4j!",
    mediaUrls: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_102", "usr_103", "usr_104", "usr_108"],
    likeCount: 245,
    comments: [
      { authorId: "usr_101", content: "Dạ chúng em cảm ơn cô ạ!", createdAt: now }
    ],
    commentCount: 42,
    createdAt: new Date(now.getTime() - 500 * 60000)
  }
]);

// 8. Nạp Tin nhắn Hai Chiều (Messages)
db.messages.insertMany([
  {
    _id: "msg_01",
    conversationId: "conv_usr_101_usr_102",
    senderId: "usr_102",
    receiverId: "usr_101",
    text: "Chào Duy! Cậu kiểm tra xong thuật toán gợi ý kết bạn trên đồ thị Neo4j chưa?",
    isRead: true,
    createdAt: new Date(now.getTime() - 7200000)
  },
  {
    _id: "msg_02",
    conversationId: "conv_usr_101_usr_102",
    senderId: "usr_101",
    receiverId: "usr_102",
    text: "Chào Bình! Tớ vừa test xong, tốc độ duyệt đồ thị và tìm bạn chung cực nhanh luôn!",
    isRead: true,
    createdAt: new Date(now.getTime() - 3600000)
  },
  {
    _id: "msg_03",
    conversationId: "conv_usr_101_usr_102",
    senderId: "usr_102",
    receiverId: "usr_101",
    text: "Tuyệt vời, giao diện phong cách Goonly tone ấm nhìn cũng rất ưng ý nữa 👍",
    isRead: true,
    createdAt: new Date(now.getTime() - 1800000)
  },
  {
    _id: "msg_04",
    conversationId: "conv_usr_101_usr_103",
    senderId: "usr_103",
    receiverId: "usr_101",
    text: "Duy ơi, slide thuyết trình đồ án NoSQL thứ 6 tuần này xong hết chưa em?",
    isRead: true,
    createdAt: new Date(now.getTime() - 5400000)
  },
  {
    _id: "msg_05",
    conversationId: "conv_usr_101_usr_103",
    senderId: "usr_101",
    receiverId: "usr_103",
    text: "Dạ em đã chuẩn bị xong cả đề cương 50 trang lẫn phần demo trực tiếp rồi anh Cường!",
    isRead: true,
    createdAt: new Date(now.getTime() - 2700000)
  },
  {
    _id: "msg_06",
    conversationId: "conv_usr_101_usr_104",
    senderId: "usr_104",
    receiverId: "usr_101",
    text: "Đức vừa thêm thuật toán đường nối 6 bậc (Shortest Path), test thử nhé Duy!",
    isRead: true,
    createdAt: new Date(now.getTime() - 1200000)
  }
]);

print("✅ [MongoDB Seed] Nạp toàn bộ dữ liệu MongoDB thành công!");
