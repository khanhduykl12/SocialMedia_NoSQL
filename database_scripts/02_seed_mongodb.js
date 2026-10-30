// ==============================================================================================
// ĐỀ TÀI: MẠNG XÃ HỘI VÀ PHÂN HỆ GỢI Ý KẾT BẠN (FRIEND RECOMMENDATION) - MÔN NOSQL (HUIT)
// FILE SCRIPT: 02_seed_mongodb.js
// MÔ TẢ: Kịch bản nạp toàn bộ Collections MongoDB: Users, Posts, Stories, Reels, Groups, Messages, Notifications
// CÁCH CHẠY:
//   Cách 1: Mở MongoDB Compass -> Kết nối mongodb://localhost:27017 -> Chọn tab _MONGOSH_ phía dưới -> Dán toàn bộ nội dung file này vào và bấm Enter.
//   Cách 2: Chạy lệnh từ terminal: mongosh mongodb://localhost:27017/social_network_db 02_seed_mongodb.js
// ==============================================================================================

use social_network_db;

print("🌱 [MongoDB Seed] Bắt đầu dọn dẹp và nạp dữ liệu mẫu phong phú và toàn diện...");

// 1. Dọn dẹp dữ liệu cũ
db.users.drop();
db.posts.drop();
db.stories.drop();
db.reels.drop();
db.groups.drop();
db.messages.drop();
db.notifications.drop();

// 2. Thiết lập Indexes quan trọng
// TTL Index cho Stories: tự động xóa sau 24h (expiresAt)
db.stories.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "email": 1 }, { unique: true });
db.posts.createIndex({ "createdAt": -1 });
db.messages.createIndex({ "conversationId": 1, "createdAt": 1 });
db.notifications.createIndex({ "recipientId": 1, "isRead": 1, "createdAt": -1 });

const now = new Date();
const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

// 3. Nạp 20 Người dùng thực tế (Users)
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
      bio: "Sinh viên CNTT HUIT • Lập trình viên Fullstack & Đam mê kiến trúc NoSQL",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Khoa CNTT - HUIT",
      interests: ["Công nghệ", "Bóng đá", "AI & Data", "Thể thao & Cầu lông"]
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
      bio: "UI/UX Designer • Yêu thích thiết kế tối giản, cà phê và nhiếp ảnh đường phố 📸",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Goonly Studio",
      interests: ["Công nghệ", "UI/UX Design", "Âm nhạc", "Nhiếp ảnh"]
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
      bio: "Senior Backend Engineer • Yêu thích Distributed Systems, Cloud & Cafe cóc ☕",
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
      bio: "Cloud & Database Architect • Thích nghiên cứu cấu trúc dữ liệu đồ thị mạng xã hội 🚀",
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
      bio: "Data Analyst & Travel Blogger • Thích phân tích dữ liệu và vi vu khám phá thế giới ✈️",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "VNG Corporation",
      interests: ["Du lịch", "AI & Data", "Âm nhạc", "Ẩm thực Sài Gòn"]
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
      bio: "AI Engineer • Xây dựng các mô hình đề xuất thông minh và mạng nơ-ron đồ thị 🤖",
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
      bio: "Product Designer • Nghệ thuật typography, trải nghiệm người dùng và mèo 🐱",
      city: "Hồ Chí Minh",
      school: "Đại học Kiến Trúc",
      workplace: "MoMo Fintech",
      interests: ["UI/UX Design", "Âm nhạc", "Du lịch"]
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
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
      bio: "Mobile App Developer • Chuyên React Native & Flutter • Mê đá banh cuối tuần ⚽",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Tiki Tech",
      interests: ["Công nghệ", "Du lịch", "Bóng đá"]
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
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      bio: "Giảng viên Khoa CNTT - HUIT • Nghiên cứu Cơ sở dữ liệu phân tán & Big Data 📚",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Đại học Công Thương TP.HCM (HUIT)",
      interests: ["Công nghệ", "AI & Data", "Tiếng Anh & Sách"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_110",
    username: "tuananh",
    email: "anh.bui@shopee.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Bùi Tuấn Anh",
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
      bio: "DevOps Engineer • Tự động hoá CI/CD, hạ tầng đám mây và Kubernetes 🐳",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Shopee Vietnam",
      interests: ["Công nghệ", "Bóng đá", "Thể thao & Cầu lông"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_111",
    username: "ngoclan",
    email: "lan.phan@viettel.vn",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Phan Ngọc Lan",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      bio: "Chuyên viên An toàn thông tin • Yêu thích bảo mật, guitar acoustic và podcast 🎧",
      city: "Hà Nội",
      school: "Học viện Kỹ thuật Mật mã",
      workplace: "Viettel Cyber Security",
      interests: ["Công nghệ", "Âm nhạc", "Tiếng Anh & Sách"]
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
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      bio: "Sinh viên năm cuối CNTT HUIT • Chuyên môn Web Frontend & Đang làm đồ án tốt nghiệp",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Khoa CNTT - HUIT",
      interests: ["Công nghệ", "Bóng đá", "Du lịch"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_113",
    username: "hoanglong",
    email: "long.nguyen@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Nguyễn Hoàng Long",
      avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
      bio: "Sinh viên Thiết kế Đồ họa HUIT • Nhiếp ảnh gia tự do • Thích săn ảnh hoàng hôn 🌅",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Freelance Photographer",
      interests: ["Nhiếp ảnh", "UI/UX Design", "Du lịch"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_114",
    username: "baongoc",
    email: "ngoc.le@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Lê Bảo Ngọc",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      bio: "Thành viên CLB Cầu lông HUIT • Yêu thể thao, thích du lịch trải nghiệm và ăn vặt 🏸",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "HUIT Sports Club",
      interests: ["Thể thao & Cầu lông", "Du lịch", "Ẩm thực Sài Gòn"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_115",
    username: "giahuy",
    email: "huy.truong@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Trương Gia Huy",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      bio: "Frontend Developer • Fan cứng của React, Tailwind và các hiệu ứng web mượt mà ✨",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Tech Startup",
      interests: ["Công nghệ", "UI/UX Design", "Âm nhạc"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_116",
    username: "phuongthao",
    email: "thao.vo@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Võ Phương Thảo",
      avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
      bio: "Chủ nhiệm CLB Tiếng Anh HUIT • Đam mê đọc sách, tranh biện và chia sẻ học bổng 📖",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "English Club HUIT",
      interests: ["Tiếng Anh & Sách", "Du lịch", "Âm nhạc"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_117",
    username: "quangkhai",
    email: "khai.lam@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Lâm Quang Khải",
      avatarUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150",
      bio: "Data Engineer • Đam mê giải quyết bài toán luồng dữ liệu thời gian thực và Big Data",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Data Platform Team",
      interests: ["Công nghệ", "AI & Data"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_118",
    username: "quynhchi",
    email: "chi.duong@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Dương Quỳnh Chi",
      avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150",
      bio: "Content Creator • Thích quay vlog đời thường sinh viên và khám phá các quán ăn ngon 🍜",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "GenZ Media",
      interests: ["Ẩm thực Sài Gòn", "Nhiếp ảnh", "Du lịch"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_119",
    username: "ducthang",
    email: "thang.ho@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Hồ Đức Thắng",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      bio: "Kỹ sư Hệ thống Nhúng & IoT • Đam mê phần cứng thông minh và nhà thông minh",
      city: "Đà Nẵng",
      school: "Đại học Bách Khoa Đà Nẵng",
      workplace: "SmartHome Lab",
      interests: ["Công nghệ", "AI & Data"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_120",
    username: "ngocbich",
    email: "bich.nguyen@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Nguyễn Ngọc Bích",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      bio: "Sinh viên Quản trị Kinh doanh HUIT • Đam mê khởi nghiệp công nghệ và Marketing số 💡",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Student Startup HUIT",
      interests: ["Tiếng Anh & Sách", "Ẩm thực Sài Gòn", "UI/UX Design"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_121",
    username: "dinhtrong",
    email: "trong.tran@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Trần Đình Trọng",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      bio: "Đội trưởng tuyển Bóng đá HUIT • Yêu thể thao, rèn luyện thể lực và du lịch bụi ⚽",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "CLB Bóng Đá Sinh Viên HUIT",
      interests: ["Bóng đá", "Thể thao & Cầu lông", "Du lịch"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_122",
    username: "quynhnhu",
    email: "nhu.pham@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Phạm Quỳnh Như",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      bio: "Sinh viên Khoa Ngoại ngữ HUIT • Thích giao lưu bạn bè quốc tế và nghe nhạc Jazz 🎷",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Hội Tiếng Anh & Du Học HUIT",
      interests: ["Tiếng Anh & Sách", "Âm nhạc", "Du lịch"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_123",
    username: "minhkhoi",
    email: "khoi.dang@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Đặng Minh Khôi",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      bio: "Game Developer • Đam mê Unity, Unreal Engine và đồ họa không gian 3D 🎮",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Game Studio",
      interests: ["Công nghệ", "Âm nhạc", "UI/UX Design"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_124",
    username: "haiyen",
    email: "yen.nguyen@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Nguyễn Hải Yến",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      bio: "Sinh viên Khoa Du lịch HUIT • Thích chụp ảnh cảnh quan và review món ngon Việt Nam 🌸",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "HUIT Tourism",
      interests: ["Du lịch", "Nhiếp ảnh", "Ẩm thực Sài Gòn"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_125",
    username: "quochuy",
    email: "huy.bui@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Bùi Quốc Huy",
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
      bio: "Kỹ sư Mạng & Quản trị Hệ thống • Đam mê hệ điều hành Linux và mạng không dây 💻",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "HUIT Network Center",
      interests: ["Công nghệ", "Bóng đá"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_126",
    username: "anhtuyet",
    email: "tuyet.hoang@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Hoàng Ánh Tuyết",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      bio: "Graphic Designer • Chuyên thiết kế nhận diện thương hiệu và poster sự kiện sinh viên 🎨",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "CLB Nhiếp ảnh & Media HUIT",
      interests: ["UI/UX Design", "Nhiếp ảnh", "Âm nhạc"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_127",
    username: "trongnghia",
    email: "nghia.do@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Đỗ Trọng Nghĩa",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      bio: "Sinh viên An toàn Thông tin HUIT • Thích săn lỗ hổng bảo mật và lập trình bảo mật 🛡️",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "CLB Tin học HUIT",
      interests: ["Công nghệ", "AI & Data"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_128",
    username: "camtu",
    email: "tu.le@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Lê Cẩm Tú",
      avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
      bio: "Thành viên ban truyền thông Đoàn trường HUIT • Đam mê viết content và chụp ảnh sự kiện 🎤",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Đoàn Thanh Niên HUIT",
      interests: ["Nhiếp ảnh", "Tiếng Anh & Sách", "Ẩm thực Sài Gòn"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_129",
    username: "quoctoan",
    email: "toan.vu@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Vũ Quốc Toàn",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
      bio: "Cầu thủ phong trào CLB Cầu lông HUIT • Đam mê thể thao, gym và leo núi 🏔️",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "CLB Cầu lông & Thể thao HUIT",
      interests: ["Thể thao & Cầu lông", "Bóng đá", "Du lịch"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_130",
    username: "thanhtruc",
    email: "truc.phan@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Phan Thanh Trúc",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      bio: "Sinh viên Tài chính Ngân hàng HUIT • Thích đọc sách kinh doanh, đầu tư và cà phê một mình ☕",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Khoa Tài chính - HUIT",
      interests: ["Tiếng Anh & Sách", "Ẩm thực Sài Gòn"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_131",
    username: "tanphat",
    email: "phat.nguyen@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Nguyễn Tấn Phát",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      bio: "Data Analyst thực tập sinh • Chuyên phân tích xu hướng thị trường và dự báo dữ liệu 📈",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Fintech Lab",
      interests: ["Công nghệ", "AI & Data"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_132",
    username: "thaonhi",
    email: "nhi.huynh@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Huỳnh Thảo Nhi",
      avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150",
      bio: "Vlogger ẩm thực học đường • Chia sẻ địa điểm ăn uống ngon bổ rẻ khu Tân Phú cho sinh viên 🍜",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Food Blogger",
      interests: ["Ẩm thực Sài Gòn", "Du lịch", "Nhiếp ảnh"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_133",
    username: "minhtri",
    email: "tri.cao@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Cao Minh Trí",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      bio: "Frontend Developer • Đam mê trải nghiệm người dùng, web accessibility và tối ưu hiệu năng ⚡",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Cộng đồng Dev Sài Gòn",
      interests: ["Công nghệ", "UI/UX Design"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_134",
    username: "dieulinh",
    email: "linh.dinh@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Đinh Diệu Linh",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      bio: "Phó chủ nhiệm CLB Tiếng Anh HUIT • IELTS 8.0 • Thích diễn thuyết và lan tỏa văn hóa đọc 📚",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "Hội Tiếng Anh & Du Học HUIT",
      interests: ["Tiếng Anh & Sách", "Âm nhạc", "Du lịch"]
    },
    createdAt: now,
    updatedAt: now
  },
  {
    _id: "usr_135",
    username: "giabao",
    email: "bao.vuong@gmail.com",
    passwordHash: "123456",
    role: "user",
    profile: {
      fullName: "Vương Gia Bảo",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      bio: "Nhiếp ảnh gia phim và tư liệu đường phố • Thích lùng sục góc phố Sài Gòn xưa 🎞️",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "CLB Nhiếp ảnh & Media HUIT",
      interests: ["Nhiếp ảnh", "UI/UX Design", "Du lịch"]
    },
    createdAt: now,
    updatedAt: now
  }
]);

// 4. Nạp 6 Câu Lạc Bộ Sinh Viên
db.groups.insertMany([
  {
    _id: "grp_301",
    name: "CLB Tin học HUIT",
    description: "Câu lạc bộ học thuật & nghiên cứu công nghệ thông tin khoa CNTT HUIT",
    coverUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
    creatorId: "usr_101",
    memberCount: 12,
    privacy: "public"
  },
  {
    _id: "grp_302",
    name: "Cộng đồng Dev Sài Gòn",
    description: "Diễn đàn kết nối lập trình viên Fullstack, Backend & DevOps tại TP.HCM",
    coverUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600",
    creatorId: "usr_103",
    memberCount: 18,
    privacy: "public"
  },
  {
    _id: "grp_303",
    name: "CLB Nhiếp ảnh & Media HUIT",
    description: "Không gian giao lưu nhiếp ảnh, quay dựng video ngắn và nghệ thuật thị giác cho sinh viên",
    coverUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    creatorId: "usr_113",
    memberCount: 9,
    privacy: "public"
  },
  {
    _id: "grp_304",
    name: "UI/UX Design Vietnam",
    description: "Cộng đồng chia sẻ kiến thức thiết kế giao diện, trải nghiệm người dùng và Design System",
    coverUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600",
    creatorId: "usr_102",
    memberCount: 8,
    privacy: "public"
  },
  {
    _id: "grp_305",
    name: "CLB Cầu lông & Thể thao HUIT",
    description: "Giao lưu thể thao, rèn luyện sức khỏe và tổ chức giải đấu nội bộ sinh viên trường HUIT",
    coverUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600",
    creatorId: "usr_114",
    memberCount: 14,
    privacy: "public"
  },
  {
    _id: "grp_306",
    name: "Hội Tiếng Anh & Du Học HUIT",
    description: "Luyện phản xạ tiếng Anh giao tiếp, chia sẻ tài liệu IELTS và săn học bổng du học",
    coverUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
    creatorId: "usr_116",
    memberCount: 11,
    privacy: "public"
  }
]);

// 5. Nạp 8 Stories Khoảnh khắc 24h
db.stories.insertMany([
  {
    _id: "story_01",
    authorId: "usr_102",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    caption: "Cuối tuần dạo phố Tân Phú và lên ý tưởng thiết kế mới 🌿",
    viewers: [{ userId: "usr_101", viewedAt: now }],
    viewCount: 24,
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_01_v",
    authorId: "usr_102",
    mediaType: "video",
    mediaUrl: "/videos/story_coffee.mp4",
    caption: "Tách cà phê sáng và góc làm việc của Designer ☕🌿",
    viewers: [],
    viewCount: 45,
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_admin_v",
    authorId: "usr_101",
    mediaType: "video",
    mediaUrl: "/videos/reel_classroom.mp4",
    caption: "Chạy thử nghiệm hệ thống mạng xã hội NoSQL thành công 🚀💻",
    viewers: [],
    viewCount: 89,
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_02",
    authorId: "usr_104",
    mediaType: "video",
    mediaUrl: "/videos/story_campus.mp4",
    caption: "Không khí sinh viên HUIT giờ tan trường náo nhiệt 🎓✨",
    viewers: [],
    viewCount: 52,
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_03",
    authorId: "usr_105",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    caption: "Biển Phú Quốc mùa này trong xanh tuyệt đẹp 🌊",
    viewers: [],
    viewCount: 42,
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_04",
    authorId: "usr_113",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800",
    caption: "Hoàng hôn buông trên sân thượng trường HUIT chiều nay 📸",
    viewers: [],
    viewCount: 35,
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_05",
    authorId: "usr_114",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
    caption: "Trận giao hữu cầu lông chiều thứ 7 quá cháy cùng hội bạn 🏸",
    viewers: [],
    viewCount: 28,
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_06",
    authorId: "usr_115",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    caption: "Setup góc làm việc mới, sẵn sàng chiến đồ án tốt nghiệp 💻",
    viewers: [],
    viewCount: 31,
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_07",
    authorId: "usr_116",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800",
    caption: "Một cuốn sách hay bên tách trà chiều tĩnh lặng ☕📖",
    viewers: [],
    viewCount: 16,
    createdAt: now,
    expiresAt: in24h
  },
  {
    _id: "story_08",
    authorId: "usr_118",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    caption: "Khám phá quán bánh tráng nướng ngon đỉnh chóp gần cổng trường 🍜",
    viewers: [],
    viewCount: 45,
    createdAt: now,
    expiresAt: in24h
  }
]);

// 6. Nạp 18 Reels Video Đa Dạng và Phong Phú (TikTok / Facebook Reels style)
db.reels.insertMany([
  {
    _id: "reel_01",
    authorId: "usr_102",
    videoUrl: "/videos/reel_classroom.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
    caption: "Một ngày thực hành lập trình và thiết kế giao diện tại phòng máy HUIT 💻✨",
    musicTitle: "Lofi Coding Beats - HUIT Studio",
    likes: ["usr_101", "usr_103", "usr_104", "usr_115", "usr_126"],
    likeCount: 248,
    comments: [
      { authorId: "usr_101", content: "Màu video đẹp và góc quay mượt mà quá!", createdAt: now },
      { authorId: "usr_115", content: "Cực kỳ thích phong cách làm việc này luôn", createdAt: now }
    ],
    commentCount: 32,
    createdAt: now
  },
  {
    _id: "reel_02",
    authorId: "usr_113",
    videoUrl: "/videos/reel_campus.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    caption: "Khuôn viên trường HUIT giờ ra chơi tấp nập và tràn đầy sức trẻ 🏫🌿",
    musicTitle: "Sunset Melodies 2026",
    likes: ["usr_101", "usr_102", "usr_114", "usr_135"],
    likeCount: 312,
    comments: [
      { authorId: "usr_102", content: "Góc chụp nghệ thuật quá Long ơi!", createdAt: now }
    ],
    commentCount: 24,
    createdAt: now
  },
  {
    _id: "reel_03",
    authorId: "usr_114",
    videoUrl: "/videos/reel_walking.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500",
    caption: "Dạo phố Sài Gòn cuối tuần nạp năng lượng sau tuần học căng thẳng 🚶‍♂️✨",
    musicTitle: "Energy Street Beat",
    likes: ["usr_101", "usr_108", "usr_110", "usr_129"],
    likeCount: 284,
    comments: [
      { authorId: "usr_108", content: "Góc quay phố thị nhìn chill thật sự!", createdAt: now }
    ],
    commentCount: 26,
    createdAt: now
  },
  {
    _id: "reel_04",
    authorId: "usr_108",
    videoUrl: "/videos/reel_animation.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500",
    caption: "Thước phim hoạt hình 3D đồ án tốt nghiệp sinh viên xuất sắc 🐰🎨",
    musicTitle: "Big Buck Cinematic Audio",
    likes: ["usr_101", "usr_103", "usr_112"],
    likeCount: 415,
    comments: [
      { authorId: "usr_112", content: "Kỹ xảo 3D mượt mà và chuyển động đỉnh cao quá!", createdAt: now }
    ],
    commentCount: 38,
    createdAt: now
  },
  {
    _id: "reel_05",
    authorId: "usr_118",
    videoUrl: "/videos/reel_portrait.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500",
    caption: "Vlog chia sẻ bí quyết cân bằng giữa việc học đại học và làm thêm 🌸📖",
    musicTitle: "Tasty Acoustic Vlog",
    likes: ["usr_101", "usr_102", "usr_132"],
    likeCount: 420,
    comments: [
      { authorId: "usr_132", content: "Cách chia sẻ tự nhiên và truyền cảm hứng lắm bạn!", createdAt: now }
    ],
    commentCount: 45,
    createdAt: now
  },
  {
    _id: "reel_06",
    authorId: "usr_121",
    videoUrl: "/videos/reel_1.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500",
    caption: "Góc hoa rực rỡ bên thềm giảng đường HUIT vào sáng sớm 🌸☕",
    musicTitle: "Nature Bloom Harmony",
    likes: ["usr_101", "usr_103", "usr_108"],
    likeCount: 350,
    comments: [
      { authorId: "usr_101", content: "Thước phim timelapse hoa nở đỉnh quá!", createdAt: now }
    ],
    commentCount: 38,
    createdAt: now
  },
  {
    _id: "reel_07",
    authorId: "usr_116",
    videoUrl: "/videos/reel_club_party.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500",
    caption: "Party chúc mừng câu lạc bộ hoàn thành xuất sắc kỳ học mới 🥳🎉",
    musicTitle: "Celebration Dance Beats",
    likes: ["usr_101", "usr_122", "usr_134"],
    likeCount: 275,
    comments: [
      { authorId: "usr_134", content: "Hôm ấy vui quá trời vui luôn cả nhà ơi!", createdAt: now }
    ],
    commentCount: 29,
    createdAt: now
  },
  {
    _id: "reel_08",
    authorId: "usr_135",
    videoUrl: "/videos/reel_coding_lab.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=500",
    caption: "Hội thảo học thuật phân tích kiến trúc dữ liệu Polyglot NoSQL MongoDB & Neo4j 🎓💡",
    musicTitle: "Academic Tech Lecture",
    likes: ["usr_101", "usr_102", "usr_113"],
    likeCount: 390,
    comments: [
      { authorId: "usr_113", content: "Nội dung báo cáo thực chiến và rất thuyết phục!", createdAt: now }
    ],
    commentCount: 42,
    createdAt: now
  },
  {
    _id: "reel_09",
    authorId: "usr_103",
    videoUrl: "/videos/reel_student_vlog.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
    caption: "Phỏng vấn nhanh các bạn sinh viên năm 3 HUIT về định hướng nghề nghiệp ngành IT 🎤💼",
    musicTitle: "Inspiring Chillhop Podcast",
    likes: ["usr_101", "usr_104", "usr_105", "usr_111"],
    likeCount: 365,
    comments: [
      { authorId: "usr_105", content: "Rất thực tế và nhiều lời khuyên bổ ích!", createdAt: now }
    ],
    commentCount: 28,
    createdAt: now
  },
  {
    _id: "reel_10",
    authorId: "usr_105",
    videoUrl: "/videos/reel_campus_tour.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
    caption: "Check-in khuôn viên và góc học tập yên tĩnh tại thư viện HUIT mùa thi cử 📚☕",
    musicTitle: "Study Vibes Ambient Piano",
    likes: ["usr_101", "usr_102", "usr_107", "usr_120"],
    likeCount: 430,
    comments: [
      { authorId: "usr_102", content: "Thư viện trường mình nhìn lúc nào cũng hiện đại!", createdAt: now }
    ],
    commentCount: 36,
    createdAt: now
  },
  {
    _id: "reel_11",
    authorId: "usr_111",
    videoUrl: "/videos/reel_morning_coffee.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500",
    caption: "Buổi sáng thiết kế giao diện Figma cùng tách Latte nóng hổi nạp năng lượng sáng tạo ☕🎨",
    musicTitle: "Coffee Shop Acoustic Guitar",
    likes: ["usr_101", "usr_102", "usr_103", "usr_118"],
    likeCount: 512,
    comments: [
      { authorId: "usr_118", content: "Nhìn góc làm việc chill quá chị ơi!", createdAt: now }
    ],
    commentCount: 49,
    createdAt: now
  },
  {
    _id: "reel_12",
    authorId: "usr_112",
    videoUrl: "/videos/reel_3d_project.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
    caption: "Demo chuyển động nhân vật 3D trên Unity Engine cho đồ án Game Design 🎮👾",
    musicTitle: "Cyberpunk Synthwave 80s",
    likes: ["usr_101", "usr_108", "usr_115", "usr_125"],
    likeCount: 478,
    comments: [
      { authorId: "usr_108", content: "Animation mượt mà quá Kiên ơi, đỉnh!", createdAt: now }
    ],
    commentCount: 39,
    createdAt: now
  },
  {
    _id: "reel_13",
    authorId: "usr_115",
    videoUrl: "/videos/reel_street_sunset.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
    caption: "Đạp xe ngắm hoàng hôn quận Tân Phú sau ca thực hành vi mạch điện tử 🚲🌅",
    musicTitle: "Sunset Chillhop Beat",
    likes: ["usr_101", "usr_104", "usr_114"],
    likeCount: 295,
    comments: [
      { authorId: "usr_104", content: "Hoàng hôn hôm nay đẹp xuất sắc!", createdAt: now }
    ],
    commentCount: 22,
    createdAt: now
  },
  {
    _id: "reel_14",
    authorId: "usr_107",
    videoUrl: "/videos/reel_2.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
    caption: "Khoảnh khắc nhảy Flashmob chào đón tân sinh viên HUIT cực kỳ bùng nổ 💃🔥",
    musicTitle: "High Energy Dance EDM",
    likes: ["usr_101", "usr_116", "usr_118", "usr_130"],
    likeCount: 620,
    comments: [
      { authorId: "usr_116", content: "Năng lượng tuổi trẻ HUIT đỉnh của chóp!", createdAt: now }
    ],
    commentCount: 58,
    createdAt: now
  },
  {
    _id: "reel_15",
    authorId: "usr_104",
    videoUrl: "/videos/reel_classroom.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
    caption: "Buổi diễn tập phòng chống tấn công mạng và khai thác lỗ hổng bảo mật CTF 🛡️💻",
    musicTitle: "Cyber Threat Lab Music",
    likes: ["usr_101", "usr_103", "usr_106"],
    likeCount: 388,
    comments: [
      { authorId: "usr_101", content: "Kịch bản tấn công - phòng thủ rất sắc nét!", createdAt: now }
    ],
    commentCount: 31,
    createdAt: now
  },
  {
    _id: "reel_16",
    authorId: "usr_110",
    videoUrl: "/videos/reel_walking.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500",
    caption: "Thử thách 10.000 bước chân mỗi ngày duy trì sức khỏe cho dân Lập trình 👟🏃‍♂️",
    musicTitle: "Fitness Motivation Beat",
    likes: ["usr_101", "usr_105", "usr_114", "usr_128"],
    likeCount: 334,
    comments: [
      { authorId: "usr_105", content: "Thói quen quá tốt cần duy trì nè!", createdAt: now }
    ],
    commentCount: 25,
    createdAt: now
  },
  {
    _id: "reel_17",
    authorId: "usr_101",
    videoUrl: "/videos/reel_campus.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500",
    caption: "Chào đón thành viên mới tham gia mạng xã hội học thuật HUIT Goonly! Chúc các bạn học tập tốt 🌟🤝",
    musicTitle: "Inspirational Future Bass",
    likes: ["usr_102", "usr_103", "usr_104", "usr_105", "usr_108", "usr_111"],
    likeCount: 780,
    comments: [
      { authorId: "usr_102", content: "Admin tâm huyết quá, giao diện và tính năng mượt mà lắm!", createdAt: now }
    ],
    commentCount: 88,
    createdAt: now
  },
  {
    _id: "reel_18",
    authorId: "usr_106",
    videoUrl: "/videos/reel_portrait.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500",
    caption: "Kinh nghiệm ôn thi chứng chỉ quốc tế CCNA và AWS Cloud cho sinh viên IT 🌐☁️",
    musicTitle: "Focus Lo-fi Study Session",
    likes: ["usr_101", "usr_103", "usr_115"],
    likeCount: 445,
    comments: [
      { authorId: "usr_115", content: "Tài liệu chia sẻ chi tiết và dễ hiểu lắm bạn!", createdAt: now }
    ],
    commentCount: 41,
    createdAt: now
  }
]);

// 7. Nạp 10 Bài viết Bảng tin (Posts)
db.posts.insertMany([
  {
    _id: "post_01",
    authorId: "usr_102",
    content: "Cuối tuần bình yên bên tách cà phê ấm và những bản phác thảo thiết kế mới 🌿 Chuẩn bị thật chu đáo cho buổi báo cáo đồ án mạng xã hội sắp tới cùng team!",
    mediaUrls: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_103", "usr_104", "usr_115"],
    likeCount: 128,
    comments: [
      { authorId: "usr_101", content: "Ảnh chụp góc này nghệ thuật và ấm cúng quá Bình!", createdAt: now },
      { authorId: "usr_104", content: "Chúc nhóm mình đạt điểm tuyệt đối nhé!", createdAt: now },
      { authorId: "usr_115", content: "Tone màu ảnh nhìn thích mắt thật sự", createdAt: now }
    ],
    commentCount: 28,
    createdAt: new Date(now.getTime() - 15 * 60000)
  },
  {
    _id: "post_02",
    authorId: "usr_104",
    content: "Vừa hoàn thiện xong phân hệ gợi ý kết bạn thông minh kết hợp lưu trữ kép! Tốc độ tìm bạn chung và đo độ tương đồng sở thích phản hồi siêu tốc dưới 8ms 🚀⚡",
    mediaUrls: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_102", "usr_103", "usr_108"],
    likeCount: 95,
    comments: [
      { authorId: "usr_103", content: "Kiến trúc này chạy mượt mà và tối ưu rất tốt đấy Đức!", createdAt: now },
      { authorId: "usr_101", content: "Sơ đồ mạng lưới trực quan nhìn trực diện rất thuyết phục!", createdAt: now }
    ],
    commentCount: 16,
    createdAt: new Date(now.getTime() - 45 * 60000)
  },
  {
    _id: "post_03",
    authorId: "usr_103",
    content: "Chiều nay CLB Tin học HUIT tổ chức buổi chia sẻ kỹ năng thực chiến dành cho sinh viên năm 3 và năm cuối. Mọi người ghé phòng máy lầu 4 tham gia giao lưu và nhận quà nhé! 💻☕",
    mediaUrls: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_102", "usr_104", "usr_108", "usr_112"],
    likeCount: 172,
    comments: [
      { authorId: "usr_101", content: "Em có mặt đúng giờ anh Cường nhé!", createdAt: now },
      { authorId: "usr_112", content: "Em đăng ký một chỗ ngồi hàng đầu ạ!", createdAt: now }
    ],
    commentCount: 38,
    createdAt: new Date(now.getTime() - 110 * 60000)
  },
  {
    _id: "post_04",
    authorId: "usr_113",
    content: "Bộ ảnh chụp nhanh hoàng hôn tại sân trường HUIT chiều hôm qua. Ánh nắng vàng buông xuống toà nhà đẹp như một thước phim thanh xuân 📸🌇",
    mediaUrls: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_102", "usr_114", "usr_118"],
    likeCount: 135,
    comments: [
      { authorId: "usr_118", content: "Trường mình lên ảnh nhìn thơ mộng quá anh Long ơi!", createdAt: now }
    ],
    commentCount: 19,
    createdAt: new Date(now.getTime() - 180 * 60000)
  },
  {
    _id: "post_05",
    authorId: "usr_114",
    content: "CLB Cầu lông HUIT mở đợt tuyển thành viên mới cho kỳ học này! Bạn nào yêu thích thể thao, muốn rèn luyện sức khỏe sau giờ học căng thẳng thì đăng ký cùng team mình nha 🏸✨",
    mediaUrls: [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_108", "usr_110"],
    likeCount: 88,
    comments: [
      { authorId: "usr_101", content: "Cuối tuần này giao hữu một trận đơn nha Ngọc!", createdAt: now },
      { authorId: "usr_110", content: "Cho mình đăng ký tham gia với nhé!", createdAt: now }
    ],
    commentCount: 14,
    createdAt: new Date(now.getTime() - 260 * 60000)
  },
  {
    _id: "post_06",
    authorId: "usr_105",
    content: "Một góc làm việc đầy cảm hứng tại văn phòng chiều nay. Làm việc với các tập dữ liệu người dùng lớn đem lại rất nhiều góc nhìn thú vị về hành vi cộng đồng ☀️📊",
    mediaUrls: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_102", "usr_107"],
    likeCount: 115,
    comments: [
      { authorId: "usr_102", content: "Văn phòng tràn ngập ánh sáng tự nhiên thích quá chị Dung ơi", createdAt: now }
    ],
    commentCount: 12,
    createdAt: new Date(now.getTime() - 340 * 60000)
  },
  {
    _id: "post_07",
    authorId: "usr_115",
    content: "Giao diện phong cách tối giản với tông màu ấm áp lấy cảm hứng từ các nền tảng hiện đại. Từng nút bấm, hiệu ứng chuyển trang đều được chau chuốt kỹ càng để mang lại cảm giác thân thiện nhất!",
    mediaUrls: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_102", "usr_104"],
    likeCount: 104,
    comments: [
      { authorId: "usr_101", content: "Trải nghiệm mượt và màu sắc dễ chịu lắm Huy!", createdAt: now }
    ],
    commentCount: 11,
    createdAt: new Date(now.getTime() - 420 * 60000)
  },
  {
    _id: "post_08",
    authorId: "usr_109",
    content: "Khoa Công nghệ Thông tin - HUIT đánh giá cao đồ án tốt nghiệp Đề tài 11 về Mạng xã hội và phân hệ gợi ý kết bạn thông minh. Các bạn sinh viên đã thể hiện sự đầu tư chỉn chu cả về mô hình kỹ thuật lẫn trải nghiệm người dùng!",
    mediaUrls: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_102", "usr_103", "usr_104", "usr_108", "usr_112"],
    likeCount: 260,
    comments: [
      { authorId: "usr_101", content: "Dạ chúng em cảm ơn cô Hạnh đã tận tình hướng dẫn ạ!", createdAt: now },
      { authorId: "usr_104", content: "Cảm ơn cô và các thầy cô trong khoa ạ!", createdAt: now }
    ],
    commentCount: 45,
    createdAt: new Date(now.getTime() - 520 * 60000)
  },
  {
    _id: "post_09",
    authorId: "usr_116",
    content: "Buổi sinh hoạt cuối tuần của CLB Tiếng Anh HUIT với chủ đề 'Thuyết trình tự tin trước đám đông'. Chúc mừng các bạn thành viên mới đã có màn thể hiện rất xuất sắc 👏🗣️",
    mediaUrls: [
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_120"],
    likeCount: 92,
    comments: [
      { authorId: "usr_120", content: "Buổi sinh hoạt bổ ích và mọi người năng nổ lắm!", createdAt: now }
    ],
    commentCount: 8,
    createdAt: new Date(now.getTime() - 600 * 60000)
  },
  {
    _id: "post_10",
    authorId: "usr_118",
    content: "Một buổi chiều la cà hàng quán quanh trường HUIT cùng hội bạn. Món bún đậu mắm tôm và chè bưởi ở đường Chế Lan Viên vẫn là chân ái của sinh viên Tân Phú! 🍜😋",
    mediaUrls: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
    ],
    privacy: "public",
    likes: ["usr_101", "usr_102", "usr_114"],
    likeCount: 148,
    comments: [
      { authorId: "usr_114", content: "Hôm nào rủ team cầu lông đi ăn chung nữa nha Chi!", createdAt: now }
    ],
    commentCount: 24,
    createdAt: new Date(now.getTime() - 700 * 60000)
  }
]);

// 8. Nạp Messages Đầy Đủ
db.messages.insertMany([
  {
    _id: "msg_01",
    conversationId: "conv_usr_101_usr_102",
    senderId: "usr_102",
    receiverId: "usr_101",
    text: "Chào Duy! Cậu kiểm tra xong phần giao diện bảng tin và gợi ý bạn bè chưa?",
    isRead: true,
    createdAt: new Date(now.getTime() - 7200000)
  },
  {
    _id: "msg_02",
    conversationId: "conv_usr_101_usr_102",
    senderId: "usr_101",
    receiverId: "usr_102",
    text: "Chào Bình! Tớ vừa hoàn thiện xong, font chữ và màu sắc phong cách Goonly tone ấm nhìn rất êm mắt!",
    isRead: true,
    createdAt: new Date(now.getTime() - 5400000)
  },
  {
    _id: "msg_03",
    conversationId: "conv_usr_101_usr_102",
    senderId: "usr_102",
    receiverId: "usr_101",
    text: "Tuyệt vời, tớ thấy phần story và reels chạy cũng rất mượt mà 👍",
    isRead: true,
    createdAt: new Date(now.getTime() - 3600000)
  },
  {
    _id: "msg_04",
    conversationId: "conv_usr_101_usr_102",
    senderId: "usr_101",
    receiverId: "usr_102",
    text: "Chiều mai nhóm mình hẹn cà phê ở Highland đối diện trường duyệt lại lần cuối nhé!",
    isRead: true,
    createdAt: new Date(now.getTime() - 1800000)
  },
  {
    _id: "msg_05",
    conversationId: "conv_usr_101_usr_102",
    senderId: "usr_102",
    receiverId: "usr_101",
    text: "Okie Duy, 2h chiều mai tớ có mặt nha!",
    isRead: true,
    createdAt: new Date(now.getTime() - 900000)
  },
  {
    _id: "msg_06",
    conversationId: "conv_usr_101_usr_103",
    senderId: "usr_103",
    receiverId: "usr_101",
    text: "Duy ơi, slide thuyết trình đồ án tốt nghiệp thứ 6 tuần này nhóm chuẩn bị ổn chưa em?",
    isRead: true,
    createdAt: new Date(now.getTime() - 8600000)
  },
  {
    _id: "msg_07",
    conversationId: "conv_usr_101_usr_103",
    senderId: "usr_101",
    receiverId: "usr_103",
    text: "Dạ em đã chuẩn bị xong cả đề cương chi tiết lẫn kịch bản demo tính năng rồi anh Cường!",
    isRead: true,
    createdAt: new Date(now.getTime() - 6200000)
  },
  {
    _id: "msg_08",
    conversationId: "conv_usr_101_usr_103",
    senderId: "usr_103",
    receiverId: "usr_101",
    text: "Tốt lắm, nhớ nhấn mạnh sự khác biệt giữa mô hình quan hệ SQL và đồ thị khi tính bạn chung nhé.",
    isRead: true,
    createdAt: new Date(now.getTime() - 3100000)
  },
  {
    _id: "msg_09",
    conversationId: "conv_usr_101_usr_104",
    senderId: "usr_104",
    receiverId: "usr_101",
    text: "Đức vừa tối ưu thuật toán tìm bạn 6 bậc xong, cậu vào bấm thử xem đường kết nối nhé!",
    isRead: true,
    createdAt: new Date(now.getTime() - 4000000)
  },
  {
    _id: "msg_10",
    conversationId: "conv_usr_101_usr_104",
    senderId: "usr_101",
    receiverId: "usr_104",
    text: "Đã thử rồi Đức ơi, thuật toán tìm ra đường đi ngắn nhất chỉ trong vài miligiây!",
    isRead: true,
    createdAt: new Date(now.getTime() - 2000000)
  },
  {
    _id: "msg_11",
    conversationId: "conv_usr_101_usr_108",
    senderId: "usr_108",
    receiverId: "usr_101",
    text: "Duy ơi, chủ nhật này sân bóng Tân Thắng đá giao hữu lúc 5h chiều, tham gia được không?",
    isRead: true,
    createdAt: new Date(now.getTime() - 5000000)
  },
  {
    _id: "msg_12",
    conversationId: "conv_usr_101_usr_108",
    senderId: "usr_101",
    receiverId: "usr_108",
    text: "Chắc chắn rồi Bảo, tớ rủ thêm Cường và Đức đi cùng luôn cho đủ đội!",
    isRead: true,
    createdAt: new Date(now.getTime() - 2500000)
  },
  {
    _id: "msg_13",
    conversationId: "conv_usr_101_usr_114",
    senderId: "usr_114",
    receiverId: "usr_101",
    text: "Duy ơi, tuần này CLB Cầu lông trường mình có buổi sinh hoạt thứ 5, nhớ mang vợt nha!",
    isRead: true,
    createdAt: new Date(now.getTime() - 3500000)
  },
  {
    _id: "msg_14",
    conversationId: "conv_usr_101_usr_114",
    senderId: "usr_101",
    receiverId: "usr_114",
    text: "Okie Ngọc! Chiều thứ 5 học xong ca 2 tớ qua nhà thi đấu liền.",
    isRead: true,
    createdAt: new Date(now.getTime() - 1500000)
  }
]);

// 9. Nạp Thông báo mẫu (Notifications)
db.notifications.insertMany([
  {
    _id: "notif_01",
    recipientId: "usr_101",
    senderId: "usr_104",
    type: "FRIEND_REQUEST",
    message: "Phạm Minh Đức đã gửi lời mời kết bạn cùng bạn",
    link: "/friends",
    isRead: false,
    createdAt: new Date(now.getTime() - 15 * 60 * 1000)
  },
  {
    _id: "notif_02",
    recipientId: "usr_101",
    senderId: "usr_102",
    type: "POST_LIKED",
    message: "Trần Thị Bình đã thích bài viết của bạn",
    link: "/feed",
    isRead: false,
    createdAt: new Date(now.getTime() - 60 * 60 * 1000)
  },
  {
    _id: "notif_03",
    recipientId: "usr_101",
    senderId: "usr_103",
    type: "POST_COMMENT",
    message: "Lê Văn Cường đã bình luận vào bài viết của bạn",
    link: "/feed",
    isRead: true,
    createdAt: new Date(now.getTime() - 3 * 3600 * 1000)
  },
  {
    _id: "notif_04",
    recipientId: "usr_101",
    senderId: "usr_114",
    type: "GROUP_INVITE",
    message: "Lê Bảo Ngọc đã mời bạn tham gia CLB Cầu lông & Thể thao HUIT",
    link: "/friends",
    isRead: true,
    createdAt: new Date(now.getTime() - 10 * 3600 * 1000)
  },
  {
    _id: "notif_05",
    recipientId: "usr_101",
    senderId: "usr_115",
    type: "POST_LIKED",
    message: "Trương Gia Huy đã thích bài viết của bạn",
    link: "/feed",
    isRead: true,
    createdAt: new Date(now.getTime() - 18 * 3600 * 1000)
  }
]);

print("✅ [MongoDB Seed] Khởi tạo hoàn tất toàn bộ 20 Users, 6 CLB, Posts, Stories, Reels và Messages!");
