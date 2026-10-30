-- ==============================================================================================
-- ĐỀ TÀI: MẠNG XÃ HỘI VÀ PHÂN HỆ GỢI Ý KẾT BẠN (FRIEND RECOMMENDATION) - MÔN NOSQL (HUIT)
-- FILE SCRIPT: 03_relational_schema_and_seed.sql
-- MÔ TẢ: Kịch bản CSDL Quan Hệ (RDBMS: PostgreSQL / MySQL) tương đương để đối chiếu với NoSQL (MongoDB + Neo4j)
-- MỤC ĐÍCH: 
--   1. Phục vụ nộp kèm đồ án cho giáo viên xem xét cấu trúc thực thể quan hệ (ERD).
--   2. So sánh hiệu năng giữa SQL (Multiple JOINs) và NoSQL (Neo4j Graph Traversal & MongoDB Document).
-- ==============================================================================================

-- -------------------------------------------------------------
-- BƯỚC 1: KHỞI TẠO CẤU TRÚC BẢNG (SCHEMA DEFINITION)
-- -------------------------------------------------------------

DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS post_likes;
DROP TABLE IF EXISTS post_comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS stories;
DROP TABLE IF EXISTS reels;
DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS user_interests;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;

-- 1. Bảng Người dùng (Users)
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    city VARCHAR(100),
    school VARCHAR(150),
    workplace VARCHAR(150),
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Quan hệ Bạn bè (Friendships) - Bảng nối nhiều-nhiều
CREATE TABLE friendships (
    user_id_1 VARCHAR(50) NOT NULL,
    user_id_2 VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'accepted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id_1, user_id_2),
    FOREIGN KEY (user_id_1) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_2) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Bảng Sở thích (Interests)
CREATE TABLE interests (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 4. Bảng Nối Người dùng - Sở thích (User_Interests)
CREATE TABLE user_interests (
    user_id VARCHAR(50) NOT NULL,
    interest_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, interest_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
);

-- 5. Bảng Hội nhóm / CLB (Groups)
CREATE TABLE groups (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    cover_url TEXT,
    creator_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Bảng Thành viên Hội nhóm (Group_Members)
CREATE TABLE group_members (
    group_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    role VARCHAR(20) DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Bảng Bài viết (Posts)
CREATE TABLE posts (
    id VARCHAR(50) PRIMARY KEY,
    author_id VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    media_urls TEXT, -- Lưu dạng JSON array chuỗi URL
    privacy VARCHAR(20) DEFAULT 'public',
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Bảng Tin nhắn (Messages)
CREATE TABLE messages (
    id VARCHAR(50) PRIMARY KEY,
    conversation_id VARCHAR(100) NOT NULL,
    sender_id VARCHAR(50) NOT NULL,
    receiver_id VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 9. Bảng Tin ngắn 24h (Stories) - Trong RDBMS phải dùng cron job DELETE thay vì TTL Index!
CREATE TABLE stories (
    id VARCHAR(50) PRIMARY KEY,
    author_id VARCHAR(50) NOT NULL,
    media_type VARCHAR(20) DEFAULT 'image',
    media_url TEXT NOT NULL,
    caption TEXT,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 10. Bảng Video ngắn (Reels)
CREATE TABLE reels (
    id VARCHAR(50) PRIMARY KEY,
    author_id VARCHAR(50) NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    music_title VARCHAR(150) DEFAULT 'Original Audio',
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 11. Bảng Thông báo (Notifications)
CREATE TABLE notifications (
    id VARCHAR(50) PRIMARY KEY,
    recipient_id VARCHAR(50) NOT NULL,
    sender_id VARCHAR(50) NOT NULL,
    type VARCHAR(30) DEFAULT 'FRIEND_REQUEST',
    message TEXT NOT NULL,
    link VARCHAR(100) DEFAULT '/friends',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- -------------------------------------------------------------
-- BƯỚC 2: NẠP DỮ LIỆU MẪU ĐỒ ÁN (DATA SEED)
-- -------------------------------------------------------------

-- 1. Nạp 20 Users
INSERT INTO users (id, username, email, password_hash, full_name, avatar_url, bio, city, school, workplace, role) VALUES
('usr_101', 'khanhduy', 'duy.nguyen@gmail.com', '123456', 'Nguyễn Khánh Duy', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 'Sinh viên CNTT HUIT • Lập trình viên Fullstack & Đam mê kiến trúc NoSQL', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Khoa CNTT - HUIT', 'admin'),
('usr_102', 'thibinh', 'binh.tran@gmail.com', '123456', 'Trần Thị Bình', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'UI/UX Designer • Yêu thích thiết kế tối giản, cà phê và nhiếp ảnh đường phố 📸', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Goonly Studio', 'user'),
('usr_103', 'vancuong', 'cuong.le@gmail.com', '123456', 'Lê Văn Cường', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Senior Backend Engineer • Yêu thích Distributed Systems, Cloud & Cafe cóc ☕', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'FPT Software', 'user'),
('usr_104', 'minhduc', 'duc.pham@gmail.com', '123456', 'Phạm Minh Đức', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', 'Cloud & Database Architect • Thích nghiên cứu cấu trúc dữ liệu đồ thị mạng xã hội 🚀', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Khoa CNTT - HUIT', 'user'),
('usr_105', 'thudung', 'dung.hoang@gmail.com', '123456', 'Hoàng Thu Dung', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', 'Data Analyst & Travel Blogger • Thích phân tích dữ liệu và vi vu khám phá thế giới ✈️', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'VNG Corporation', 'user'),
('usr_106', 'hoangnam', 'nam.do@gmail.com', '123456', 'Đỗ Hoàng Nam', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'AI Engineer • Xây dựng các mô hình đề xuất thông minh và mạng nơ-ron đồ thị 🤖', 'Hà Nội', 'Đại học Bách Khoa', 'Zalo AI Lab', 'user'),
('usr_107', 'thuylinh', 'linh.vu@gmail.com', '123456', 'Vũ Thùy Linh', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', 'Product Designer • Nghệ thuật typography, trải nghiệm người dùng và mèo 🐱', 'Hồ Chí Minh', 'Đại học Kiến Trúc', 'MoMo Fintech', 'user'),
('usr_108', 'quocbao', 'bao.trinh@gmail.com', '123456', 'Trịnh Quốc Bảo', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', 'Mobile App Developer • Chuyên React Native & Flutter • Mê đá banh cuối tuần ⚽', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Tiki Tech', 'user'),
('usr_109', 'myhanh', 'hanh.dinh@huit.edu.vn', '123456', 'Đinh Mỹ Hạnh', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', 'Giảng viên Khoa CNTT - HUIT • Nghiên cứu Cơ sở dữ liệu phân tán & Big Data 📚', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Đại học Công Thương TP.HCM', 'user'),
('usr_110', 'tuananh', 'anh.bui@shopee.com', '123456', 'Bùi Tuấn Anh', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', 'DevOps Engineer • Tự động hoá CI/CD, hạ tầng đám mây và Kubernetes 🐳', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Shopee Vietnam', 'user'),
('usr_111', 'ngoclan', 'lan.phan@viettel.vn', '123456', 'Phan Ngọc Lan', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Chuyên viên An toàn thông tin • Yêu thích bảo mật, guitar acoustic và podcast 🎧', 'Hà Nội', 'Học viện Kỹ thuật Mật mã', 'Viettel Cyber Security', 'user'),
('usr_112', 'thanhtung', 'tung.mai@gmail.com', '123456', 'Mai Thanh Tùng', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', 'Sinh viên năm cuối CNTT HUIT • Chuyên môn Web Frontend & Đang làm đồ án tốt nghiệp', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Khoa CNTT - HUIT', 'user'),
('usr_113', 'hoanglong', 'long.nguyen@gmail.com', '123456', 'Nguyễn Hoàng Long', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150', 'Sinh viên Thiết kế Đồ họa HUIT • Nhiếp ảnh gia tự do • Thích săn ảnh hoàng hôn 🌅', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Freelance Photographer', 'user'),
('usr_114', 'baongoc', 'ngoc.le@gmail.com', '123456', 'Lê Bảo Ngọc', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 'Thành viên CLB Cầu lông HUIT • Yêu thể thao, thích du lịch trải nghiệm và ăn vặt 🏸', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'HUIT Sports Club', 'user'),
('usr_115', 'giahuy', 'huy.truong@gmail.com', '123456', 'Trương Gia Huy', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', 'Frontend Developer • Fan cứng của React, Tailwind và các hiệu ứng web mượt mà ✨', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Tech Startup', 'user'),
('usr_116', 'phuongthao', 'thao.vo@gmail.com', '123456', 'Võ Phương Thảo', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150', 'Chủ nhiệm CLB Tiếng Anh HUIT • Đam mê đọc sách, tranh biện và chia sẻ học bổng 📖', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'English Club HUIT', 'user'),
('usr_117', 'quangkhai', 'khai.lam@gmail.com', '123456', 'Lâm Quang Khải', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150', 'Data Engineer • Đam mê giải quyết bài toán luồng dữ liệu thời gian thực và Big Data', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Data Platform Team', 'user'),
('usr_118', 'quynhchi', 'chi.duong@gmail.com', '123456', 'Dương Quỳnh Chi', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150', 'Content Creator • Thích quay vlog đời thường sinh viên và khám phá các quán ăn ngon 🍜', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'GenZ Media', 'user'),
('usr_119', 'ducthang', 'thang.ho@gmail.com', '123456', 'Hồ Đức Thắng', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'Kỹ sư Hệ thống Nhúng & IoT • Đam mê phần cứng thông minh và nhà thông minh', 'Đà Nẵng', 'Đại học Bách Khoa Đà Nẵng', 'SmartHome Lab', 'user'),
('usr_120', 'ngocbich', 'bich.nguyen@gmail.com', '123456', 'Nguyễn Ngọc Bích', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 'Sinh viên Quản trị Kinh doanh HUIT • Đam mê khởi nghiệp công nghệ và Marketing số 💡', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Student Startup HUIT', 'user'),
('usr_121', 'dinhtrong', 'trong.tran@gmail.com', '123456', 'Trần Đình Trọng', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Tiền đạo đội tuyển bóng đá HUIT • Yêu thể thao, tinh thần đồng đội và bóng đá phủi ⚽', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'CLB Bóng Đá Sinh Viên HUIT', 'user'),
('usr_122', 'quynhnhu', 'nhu.pham@gmail.com', '123456', 'Phạm Quỳnh Như', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 'Phó chủ nhiệm CLB Tiếng Anh HUIT • Đam mê săn học bổng du học và nhạc Indie 🎧', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Hội Tiếng Anh & Du Học HUIT', 'user'),
('usr_123', 'minhkhoi', 'khoi.dang@gmail.com', '123456', 'Đặng Minh Khôi', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Game Designer • Thích vẽ 2D/3D concept, xây dựng thế giới game nhập vai 🎮', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Game Studio', 'user'),
('usr_124', 'haiyen', 'yen.nguyen@gmail.com', '123456', 'Nguyễn Hải Yến', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', 'Sinh viên Du lịch HUIT • Thích chụp ảnh phong cảnh, xê dịch và trải nghiệm văn hoá 🌸', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'HUIT Tourism', 'user'),
('usr_125', 'quochuy', 'huy.bui@gmail.com', '123456', 'Bùi Quốc Huy', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', 'Kỹ sư Quản trị mạng • Thích tìm hiểu kiến trúc mạng máy tính, Cisco và máy chủ Linux 🖥️', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'HUIT Network Center', 'user'),
('usr_126', 'anhtuyet', 'tuyet.hoang@gmail.com', '123456', 'Hoàng Ánh Tuyết', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'Videographer CLB Media HUIT • Yêu thích dựng phim, màu sắc cinematic và âm nhạc sống động 🎬', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'CLB Nhiếp ảnh & Media HUIT', 'user'),
('usr_127', 'trongnghia', 'nghia.do@gmail.com', '123456', 'Đỗ Trọng Nghĩa', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', 'Thành viên ban học thuật CLB Tin học • Thích giải thuật, cấu trúc dữ liệu và Hackathon 🏆', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'CLB Tin học HUIT', 'user'),
('usr_128', 'camtu', 'tu.le@gmail.com', '123456', 'Lê Cẩm Tú', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150', 'Cán bộ Đoàn Thanh niên HUIT • Thích hoạt động tình nguyện, kết nối cộng đồng và tổ chức sự kiện ✨', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Đoàn Thanh Niên HUIT', 'user'),
('usr_129', 'quoctoan', 'toan.vu@gmail.com', '123456', 'Vũ Quốc Toàn', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', 'Vận động viên cầu lông đơn nam HUIT • Đam mê thể thao, rèn luyện thể lực hàng ngày 🏸', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'CLB Cầu lông & Thể thao HUIT', 'user'),
('usr_130', 'thanhtruc', 'truc.phan@gmail.com', '123456', 'Phan Thanh Trúc', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', 'Sinh viên Tài chính HUIT • Thích phân tích thị trường chứng khoán và kinh doanh nhỏ 📈', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Khoa Tài chính - HUIT', 'user'),
('usr_131', 'tanphat', 'phat.nguyen@gmail.com', '123456', 'Nguyễn Tấn Phát', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'Chuyên viên phân tích định lượng • Đam mê mô hình toán tài chính và Data Science 📊', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Fintech Lab', 'user'),
('usr_132', 'thaonhi', 'nhi.huynh@gmail.com', '123456', 'Huỳnh Thảo Nhi', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150', 'Food Reviewer Sài Gòn • Mê ẩm thực đường phố, cà phê bệt và trà sữa cùng bạn bè 🧋', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Food Blogger', 'user'),
('usr_133', 'minhtri', 'tri.cao@gmail.com', '123456', 'Cao Minh Trí', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Lập trình viên Go/Rust • Yêu thích hệ thống phân tán chịu tải cao và mã nguồn mở ⚡', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Cộng đồng Dev Sài Gòn', 'user'),
('usr_134', 'dieulinh', 'linh.dinh@gmail.com', '123456', 'Đinh Diệu Linh', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 'Thành viên ban truyền thông CLB Tiếng Anh • Thích viết lách, dịch sách và văn học phương Tây 📚', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Hội Tiếng Anh & Du Học HUIT', 'user'),
('usr_135', 'giabao', 'bao.vuong@gmail.com', '123456', 'Vương Gia Bảo', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', 'Trưởng ban kỹ thuật CLB Media • Đam mê dựng visual effects và thiết kế đồ hoạ chuyển động 🎥', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'CLB Nhiếp ảnh & Media HUIT', 'user');

-- 2. Nạp 10 Sở thích
INSERT INTO interests (id, name) VALUES
('int_1', 'Công nghệ'),
('int_2', 'Bóng đá'),
('int_3', 'Du lịch'),
('int_4', 'Âm nhạc'),
('int_5', 'AI & Data'),
('int_6', 'UI/UX Design'),
('int_7', 'Nhiếp ảnh'),
('int_8', 'Thể thao & Cầu lông'),
('int_9', 'Ẩm thực Sài Gòn'),
('int_10', 'Tiếng Anh & Sách');

-- 3. Nạp Liên kết Sở thích
INSERT INTO user_interests (user_id, interest_id) VALUES
('usr_101', 'int_1'), ('usr_101', 'int_2'), ('usr_101', 'int_5'), ('usr_101', 'int_8'),
('usr_102', 'int_1'), ('usr_102', 'int_4'), ('usr_102', 'int_6'), ('usr_102', 'int_7'),
('usr_103', 'int_1'), ('usr_103', 'int_2'), ('usr_103', 'int_5'),
('usr_104', 'int_1'), ('usr_104', 'int_2'), ('usr_104', 'int_5'),
('usr_105', 'int_3'), ('usr_105', 'int_4'), ('usr_105', 'int_5'), ('usr_105', 'int_9'),
('usr_106', 'int_1'), ('usr_106', 'int_5'),
('usr_107', 'int_3'), ('usr_107', 'int_4'), ('usr_107', 'int_6'),
('usr_108', 'int_1'), ('usr_108', 'int_2'), ('usr_108', 'int_3'),
('usr_110', 'int_1'), ('usr_110', 'int_2'), ('usr_110', 'int_8'),
('usr_112', 'int_1'), ('usr_112', 'int_2'), ('usr_112', 'int_3'),
('usr_113', 'int_6'), ('usr_113', 'int_7'), ('usr_113', 'int_3'),
('usr_114', 'int_8'), ('usr_114', 'int_3'), ('usr_114', 'int_9'),
('usr_115', 'int_1'), ('usr_115', 'int_6'), ('usr_115', 'int_4'),
('usr_116', 'int_10'), ('usr_116', 'int_3'), ('usr_116', 'int_4'),
('usr_117', 'int_1'), ('usr_117', 'int_5'),
('usr_118', 'int_9'), ('usr_118', 'int_7'), ('usr_118', 'int_3'),
('usr_119', 'int_1'), ('usr_119', 'int_5'),
('usr_120', 'int_10'), ('usr_120', 'int_9'), ('usr_120', 'int_6');

-- 4. Nạp 6 CLB / Hội nhóm
INSERT INTO groups (id, name, description, cover_url, creator_id) VALUES
('grp_301', 'CLB Tin học HUIT', 'Câu lạc bộ học thuật & nghiên cứu công nghệ thông tin khoa CNTT HUIT', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600', 'usr_101'),
('grp_302', 'Cộng đồng Dev Sài Gòn', 'Diễn đàn kết nối lập trình viên Fullstack, Backend & DevOps tại TP.HCM', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600', 'usr_103'),
('grp_303', 'CLB Nhiếp ảnh & Media HUIT', 'Không gian giao lưu nhiếp ảnh, quay dựng video ngắn và nghệ thuật thị giác cho sinh viên', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600', 'usr_113'),
('grp_304', 'UI/UX Design Vietnam', 'Cộng đồng chia sẻ kiến thức thiết kế giao diện, trải nghiệm người dùng và Design System', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600', 'usr_102'),
('grp_305', 'CLB Cầu lông & Thể thao HUIT', 'Giao lưu thể thao, rèn luyện sức khỏe và tổ chức giải đấu nội bộ sinh viên trường HUIT', 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600', 'usr_114'),
('grp_306', 'Hội Tiếng Anh & Du Học HUIT', 'Luyện phản xạ tiếng Anh giao tiếp, chia sẻ tài liệu IELTS và săn học bổng du học', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600', 'usr_116');

-- 5. Nạp Thành viên Hội nhóm
INSERT INTO group_members (group_id, user_id, role) VALUES
('grp_301', 'usr_101', 'admin'),
('grp_301', 'usr_102', 'member'),
('grp_302', 'usr_103', 'admin'),
('grp_301', 'usr_104', 'member'),
('grp_302', 'usr_104', 'member'),
('grp_301', 'usr_108', 'member'),
('grp_302', 'usr_108', 'member'),
('grp_301', 'usr_112', 'member'),
('grp_303', 'usr_113', 'admin'),
('grp_303', 'usr_102', 'member'),
('grp_304', 'usr_102', 'admin'),
('grp_304', 'usr_107', 'member'),
('grp_304', 'usr_115', 'member'),
('grp_305', 'usr_101', 'member'),
('grp_305', 'usr_114', 'admin'),
('grp_305', 'usr_110', 'member'),
('grp_306', 'usr_116', 'admin'),
('grp_306', 'usr_120', 'member');

-- 6. Nạp Quan hệ bạn bè (Hai chiều trong SQL)
INSERT INTO friendships (user_id_1, user_id_2) VALUES
-- Bạn bè trực tiếp bậc 1 của usr_101
('usr_101', 'usr_102'), ('usr_102', 'usr_101'),
('usr_101', 'usr_103'), ('usr_103', 'usr_101'),
('usr_101', 'usr_108'), ('usr_108', 'usr_101'),
('usr_101', 'usr_112'), ('usr_112', 'usr_101'),
('usr_101', 'usr_114'), ('usr_114', 'usr_101'),
('usr_101', 'usr_115'), ('usr_115', 'usr_101'),
-- Bạn của bạn bậc 2 (FoAF)
('usr_102', 'usr_104'), ('usr_104', 'usr_102'),
('usr_103', 'usr_104'), ('usr_104', 'usr_103'),
('usr_108', 'usr_104'), ('usr_104', 'usr_108'),
('usr_108', 'usr_105'), ('usr_105', 'usr_108'),
('usr_114', 'usr_105'), ('usr_105', 'usr_114'),
('usr_102', 'usr_107'), ('usr_107', 'usr_102'),
('usr_103', 'usr_110'), ('usr_110', 'usr_103'),
('usr_114', 'usr_110'), ('usr_110', 'usr_114'),
('usr_102', 'usr_113'), ('usr_113', 'usr_102'),
('usr_115', 'usr_113'), ('usr_113', 'usr_115'),
('usr_114', 'usr_118'), ('usr_118', 'usr_114'),
-- Bậc 3, 4, 5 (Kiểm thử bài toán 6 bậc - Degrees of Separation)
('usr_104', 'usr_106'), ('usr_106', 'usr_104'),
('usr_106', 'usr_111'), ('usr_111', 'usr_106'),
('usr_111', 'usr_109'), ('usr_109', 'usr_111'),
('usr_109', 'usr_117'), ('usr_117', 'usr_109'),
('usr_117', 'usr_119'), ('usr_119', 'usr_117'),
('usr_118', 'usr_116'), ('usr_116', 'usr_118'),
('usr_116', 'usr_120'), ('usr_120', 'usr_116');

-- 7. Nạp Bài viết (Posts)
INSERT INTO posts (id, author_id, content, media_urls, like_count, comment_count) VALUES
('post_01', 'usr_102', 'Cuối tuần bình yên bên tách cà phê ấm và những bản phác thảo thiết kế mới 🌿 Chuẩn bị thật chu đáo cho buổi báo cáo đồ án mạng xã hội sắp tới cùng team!', '["https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800"]', 128, 28),
('post_02', 'usr_104', 'Vừa hoàn thiện xong phân hệ gợi ý kết bạn thông minh kết hợp lưu trữ kép! Tốc độ tìm bạn chung và đo độ tương đồng sở thích phản hồi siêu tốc dưới 8ms 🚀⚡', '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"]', 95, 16),
('post_03', 'usr_103', 'Chiều nay CLB Tin học HUIT tổ chức buổi chia sẻ kỹ năng thực chiến dành cho sinh viên năm 3 và năm cuối. Mọi người ghé phòng máy lầu 4 tham gia giao lưu và nhận quà nhé! 💻☕', '["https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"]', 172, 38),
('post_04', 'usr_113', 'Bộ ảnh chụp nhanh hoàng hôn tại sân trường HUIT chiều hôm qua. Ánh nắng vàng buông xuống toà nhà đẹp như một thước phim thanh xuân 📸🌇', '["https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800"]', 135, 19),
('post_05', 'usr_114', 'CLB Cầu lông HUIT mở đợt tuyển thành viên mới cho kỳ học này! Bạn nào yêu thích thể thao, muốn rèn luyện sức khỏe sau giờ học căng thẳng thì đăng ký cùng team mình nha 🏸✨', '["https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800"]', 88, 14);

-- 8. Nạp Tin nhắn (Messages)
INSERT INTO messages (id, conversation_id, sender_id, receiver_id, content, is_read) VALUES
('msg_01', 'conv_usr_101_usr_102', 'usr_102', 'usr_101', 'Chào Duy! Cậu kiểm tra xong phần giao diện bảng tin và gợi ý bạn bè chưa?', TRUE),
('msg_02', 'conv_usr_101_usr_102', 'usr_101', 'usr_102', 'Chào Bình! Tớ vừa hoàn thiện xong, font chữ và màu sắc phong cách Goonly tone ấm nhìn rất êm mắt!', TRUE),
('msg_03', 'conv_usr_101_usr_102', 'usr_102', 'usr_101', 'Tuyệt vời, tớ thấy phần story và reels chạy cũng rất mượt mà 👍', TRUE);

-- 9. Nạp Stories 24h (Bao gồm cả Image và Video)
INSERT INTO stories (id, author_id, media_type, media_url, caption, view_count, expires_at) VALUES
('story_01', 'usr_102', 'image', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800', 'Cuối tuần dạo phố Tân Phú và lên ý tưởng thiết kế mới 🌿', 38, NOW() + INTERVAL '1 DAY'),
('story_01_v', 'usr_102', 'video', '/videos/story_coffee.mp4', 'Tách cà phê sáng và góc làm việc của Designer ☕🌿', 45, NOW() + INTERVAL '1 DAY'),
('story_admin_v', 'usr_101', 'video', '/videos/reel_classroom.mp4', 'Chạy thử nghiệm hệ thống mạng xã hội NoSQL thành công 🚀💻', 89, NOW() + INTERVAL '1 DAY'),
('story_02', 'usr_104', 'video', '/videos/story_campus.mp4', 'Không khí sinh viên HUIT giờ tan trường náo nhiệt 🎓✨', 52, NOW() + INTERVAL '1 DAY'),
('story_03', 'usr_105', 'image', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Biển Phú Quốc mùa này trong xanh tuyệt đẹp 🌊', 52, NOW() + INTERVAL '1 DAY'),
('story_04', 'usr_113', 'video', '/videos/reel_walking.mp4', 'Góc phố Sài Gòn chiều tan tầm qua ống kính điện ảnh 📸🌇', 64, NOW() + INTERVAL '1 DAY'),
('story_07', 'usr_116', 'video', '/videos/story_party.mp4', 'Khoảnh khắc chúc mừng CLB Tiếng Anh đạt giải xuất sắc 🎉🥳', 72, NOW() + INTERVAL '1 DAY'),
('story_08_v', 'usr_118', 'video', '/videos/reel_student_vlog.mp4', 'Chia sẻ kinh nghiệm làm thêm và học tập của sinh viên năm 3 🌸📖', 88, NOW() + INTERVAL '1 DAY'),
('story_09_v', 'usr_103', 'video', '/videos/reel_coding_lab.mp4', 'Buổi thực hành lập trình Backend phân tán cùng giảng viên 💻🔥', 76, NOW() + INTERVAL '1 DAY'),
('story_16_v', 'usr_135', 'video', '/videos/reel_campus_tour.mp4', 'Dạo quanh một vòng giảng đường và thư viện trường HUIT 🏫🌿', 95, NOW() + INTERVAL '1 DAY');

-- 10. Nạp Video ngắn Reels (18 reels đa dạng video MP4 cục bộ không trùng lặp)
INSERT INTO reels (id, author_id, video_url, thumbnail_url, caption, music_title, like_count, comment_count, views_count) VALUES
('reel_01', 'usr_102', '/videos/reel_classroom.mp4', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500', 'Một ngày thực hành lập trình và thiết kế giao diện tại phòng máy HUIT 💻✨', 'Lofi Coding Beats - HUIT Studio', 248, 32, 1850),
('reel_02', 'usr_113', '/videos/reel_campus.mp4', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500', 'Khuôn viên trường HUIT giờ ra chơi tấp nập và tràn đầy sức trẻ 🏫🌿', 'Sunset Melodies 2026', 312, 24, 2150),
('reel_03', 'usr_114', '/videos/reel_walking.mp4', 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500', 'Dạo phố Sài Gòn cuối tuần nạp năng lượng sau tuần học căng thẳng 🚶‍♂️✨', 'Energy Street Beat', 284, 26, 1640),
('reel_04', 'usr_108', '/videos/reel_animation.mp4', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500', 'Thước phim hoạt hình 3D đồ án tốt nghiệp sinh viên xuất sắc 🐰🎨', 'Big Buck Cinematic Audio', 415, 38, 2890),
('reel_05', 'usr_118', '/videos/reel_portrait.mp4', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500', 'Vlog chia sẻ bí quyết cân bằng giữa việc học đại học và làm thêm 🌸📖', 'Tasty Acoustic Vlog', 420, 45, 3100),
('reel_06', 'usr_121', '/videos/reel_1.mp4', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500', 'Góc hoa rực rỡ bên thềm giảng đường HUIT vào sáng sớm 🌸☕', 'Nature Bloom Harmony', 350, 38, 2450),
('reel_07', 'usr_116', '/videos/reel_club_party.mp4', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500', 'Party chúc mừng câu lạc bộ hoàn thành xuất sắc kỳ học mới 🥳🎉', 'Celebration Dance Beats', 275, 29, 1920),
('reel_08', 'usr_135', '/videos/reel_coding_lab.mp4', 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=500', 'Hội thảo học thuật phân tích kiến trúc dữ liệu Polyglot NoSQL MongoDB & Neo4j 🎓💡', 'Academic Tech Lecture', 390, 42, 2750),
('reel_09', 'usr_103', '/videos/reel_student_vlog.mp4', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500', 'Phỏng vấn nhanh các bạn sinh viên năm 3 HUIT về định hướng nghề nghiệp ngành IT 🎤💼', 'Inspiring Chillhop Podcast', 365, 28, 2580),
('reel_10', 'usr_105', '/videos/reel_campus_tour.mp4', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500', 'Check-in khuôn viên và góc học tập yên tĩnh tại thư viện HUIT mùa thi cử 📚☕', 'Study Vibes Ambient Piano', 430, 36, 3020),
('reel_11', 'usr_111', '/videos/reel_morning_coffee.mp4', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500', 'Buổi sáng thiết kế giao diện Figma cùng tách Latte nóng hổi nạp năng lượng sáng tạo ☕🎨', 'Coffee Shop Acoustic Guitar', 512, 49, 3600),
('reel_12', 'usr_112', '/videos/reel_3d_project.mp4', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500', 'Demo chuyển động nhân vật 3D trên Unity Engine cho đồ án Game Design 🎮👾', 'Cyberpunk Synthwave 80s', 478, 39, 3350),
('reel_13', 'usr_115', '/videos/reel_street_sunset.mp4', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500', 'Đạp xe ngắm hoàng hôn quận Tân Phú sau ca thực hành vi mạch điện tử 🚲🌅', 'Sunset Chillhop Beat', 295, 22, 2100),
('reel_14', 'usr_107', '/videos/reel_2.mp4', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500', 'Khoảnh khắc nhảy Flashmob chào đón tân sinh viên HUIT cực kỳ bùng nổ 💃🔥', 'High Energy Dance EDM', 620, 58, 4350),
('reel_15', 'usr_104', '/videos/reel_classroom.mp4', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500', 'Buổi diễn tập phòng chống tấn công mạng và khai thác lỗ hổng bảo mật CTF 🛡️💻', 'Cyber Threat Lab Music', 388, 31, 2720),
('reel_16', 'usr_110', '/videos/reel_walking.mp4', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500', 'Thử thách 10.000 bước chân mỗi ngày duy trì sức khỏe cho dân Lập trình 👟🏃‍♂️', 'Fitness Motivation Beat', 334, 25, 2340),
('reel_17', 'usr_101', '/videos/reel_campus.mp4', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500', 'Chào đón thành viên mới tham gia mạng xã hội học thuật HUIT Goonly! Chúc các bạn học tập tốt 🌟🤝', 'Inspirational Future Bass', 780, 88, 5500),
('reel_18', 'usr_106', '/videos/reel_portrait.mp4', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500', 'Kinh nghiệm ôn thi chứng chỉ quốc tế CCNA và AWS Cloud cho sinh viên IT 🌐☁️', 'Focus Lo-fi Study Session', 445, 41, 3120);

-- 11. Nạp Thông báo mẫu (Notifications)
INSERT INTO notifications (id, recipient_id, sender_id, type, message, link, is_read) VALUES
('notif_01', 'usr_101', 'usr_104', 'FRIEND_REQUEST', 'Phạm Minh Đức đã gửi lời mời kết bạn cùng bạn', '/friends', FALSE),
('notif_02', 'usr_101', 'usr_102', 'POST_LIKED', 'Trần Thị Bình đã thích bài viết của bạn', '/feed', FALSE),
('notif_03', 'usr_101', 'usr_103', 'POST_COMMENT', 'Lê Văn Cường đã bình luận vào bài viết của bạn', '/feed', TRUE);

-- ==============================================================================================
-- SO SÁNH TRUY VẤN GỢI Ý BẠN BÈ (FoAF) BẰNG SQL VS NEO4J
-- ==============================================================================================

-- [Câu truy vấn SQL FoAF]: Tìm bạn của bạn cho 'usr_101' và đếm số bạn chung
SELECT 
    f2.user_id_2 AS recommended_user_id,
    u.full_name,
    COUNT(f1.user_id_2) AS mutual_friends_count
FROM friendships f1
JOIN friendships f2 ON f1.user_id_2 = f2.user_id_1
JOIN users u ON f2.user_id_2 = u.id
WHERE f1.user_id_1 = 'usr_101' 
  AND f2.user_id_2 != 'usr_101'
  AND f2.user_id_2 NOT IN (
      SELECT user_id_2 FROM friendships WHERE user_id_1 = 'usr_101'
  )
GROUP BY f2.user_id_2, u.full_name
ORDER BY mutual_friends_count DESC;
