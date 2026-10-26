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

-- 4. Bảng Nối Người dùng - Sở thích (User Interests)
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
    creator_id VARCHAR(50),
    privacy VARCHAR(20) DEFAULT 'public',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. Bảng Thành viên Hội nhóm (Group Members)
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
    media_urls TEXT, -- Lưu dạng JSON array chuỗi đường dẫn ảnh
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

-- -------------------------------------------------------------
-- BƯỚC 2: NẠP DỮ LIỆU MẪU ĐỒ ÁN (DATA SEED)
-- -------------------------------------------------------------

-- 1. Nạp Users
INSERT INTO users (id, username, email, password_hash, full_name, avatar_url, bio, city, school, workplace, role) VALUES
('usr_101', 'khanhduy', 'duy.nguyen@gmail.com', '123456', 'Nguyễn Khánh Duy', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 'Sinh viên CNTT HUIT • Lập trình viên Fullstack & Nghiên cứu NoSQL', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Khoa CNTT - HUIT', 'admin'),
('usr_102', 'thibinh', 'binh.tran@gmail.com', '123456', 'Trần Thị Bình', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'UI/UX Designer • Yêu thích thiết kế tối giản và nhiếp ảnh đường phố 📸', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Goonly Studio', 'user'),
('usr_103', 'vancuong', 'cuong.le@gmail.com', '123456', 'Lê Văn Cường', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Senior Backend Engineer • Yêu thích Distributed Systems & Cloud', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'FPT Software', 'user'),
('usr_104', 'minhduc', 'duc.pham@gmail.com', '123456', 'Phạm Minh Đức', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', 'Cloud & Database Architect • Đam mê đồ thị mạng xã hội Neo4j 🚀', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Khoa CNTT - HUIT', 'user'),
('usr_105', 'thudung', 'dung.hoang@gmail.com', '123456', 'Hoàng Thu Dung', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', 'Data Analyst & Travel Blogger • Khám phá dữ liệu và thế giới ✈️', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'VNG Corporation', 'user'),
('usr_106', 'hoangnam', 'nam.do@gmail.com', '123456', 'Đỗ Hoàng Nam', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'AI Engineer • Xây dựng các hệ thống gợi ý thông minh với Graph GNN', 'Hà Nội', 'Đại học Bách Khoa', 'Zalo AI Lab', 'user'),
('usr_107', 'thuylinh', 'linh.vu@gmail.com', '123456', 'Vũ Thùy Linh', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', 'Product Manager • FinTech & E-Commerce Solutions', 'Hồ Chí Minh', 'Đại học Kinh Tế TP.HCM', 'MoMo Fintech', 'user'),
('usr_108', 'quocbao', 'bao.trinh@gmail.com', '123456', 'Trịnh Quốc Bảo', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', 'Mobile Engineer • Flutter & Swift Enthusiast', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Tiki Tech', 'user'),
('usr_109', 'myhanh', 'hanh.dinh@huit.edu.vn', '123456', 'Đinh Mỹ Hạnh', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 'Giảng viên Khoa Công nghệ Thông tin - HUIT', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'Đại học Công Thương TP.HCM', 'user'),
('usr_110', 'tuananh', 'anh.bui@gmail.com', '123456', 'Bùi Tuấn Anh', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', 'DevOps Engineer • Kubernetes, Docker & CI/CD pipeline', 'Hồ Chí Minh', 'HUIT', 'Shopee Vietnam', 'user'),
('usr_111', 'ngoclan', 'lan.phan@gmail.com', '123456', 'Phan Ngọc Lan', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Cyber Security Researcher • Bảo mật ứng dụng & Database NoSQL', 'Hà Nội', 'Học viện Kỹ thuật Mật mã', 'Viettel Cyber Security', 'user'),
('usr_112', 'thanhtung', 'tung.mai@gmail.com', '123456', 'Mai Thanh Tùng', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', 'Lập trình viên Web React & NodeJS • Thành viên CLB Tin Học HUIT', 'Hồ Chí Minh', 'Đại học Công Thương TP.HCM (HUIT)', 'HUIT', 'user');

-- 2. Nạp Sở thích
INSERT INTO interests (id, name) VALUES
('int_1', 'Công nghệ'),
('int_2', 'Bóng đá'),
('int_3', 'Du lịch'),
('int_4', 'Âm nhạc'),
('int_5', 'AI & Data'),
('int_6', 'UI/UX Design');

-- 3. Nạp Liên kết Sở thích
INSERT INTO user_interests (user_id, interest_id) VALUES
('usr_101', 'int_1'), ('usr_101', 'int_2'), ('usr_101', 'int_5'),
('usr_102', 'int_1'), ('usr_102', 'int_4'), ('usr_102', 'int_6'),
('usr_103', 'int_1'), ('usr_103', 'int_2'), ('usr_103', 'int_5'),
('usr_104', 'int_1'), ('usr_104', 'int_2'), ('usr_104', 'int_5'),
('usr_105', 'int_3'), ('usr_105', 'int_4'), ('usr_105', 'int_5'),
('usr_106', 'int_1'), ('usr_106', 'int_5'),
('usr_107', 'int_3'), ('usr_107', 'int_4'), ('usr_107', 'int_6'),
('usr_108', 'int_1'), ('usr_108', 'int_2'), ('usr_108', 'int_3'),
('usr_110', 'int_1'), ('usr_110', 'int_2'),
('usr_112', 'int_1'), ('usr_112', 'int_2');

-- 4. Nạp Hội nhóm
INSERT INTO groups (id, name, description, cover_url, creator_id) VALUES
('grp_301', 'CLB Tin học HUIT', 'Câu lạc bộ học tập, chia sẻ kinh nghiệm lập trình Khoa CNTT HUIT.', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', 'usr_101'),
('grp_302', 'Cộng đồng Dev Sài Gòn', 'Diễn đàn trao đổi kỹ thuật cho lập trình viên tại TP. Hồ Chí Minh.', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800', 'usr_103'),
('grp_303', 'NoSQL & Big Data Lab', 'Nhóm nghiên cứu chuyên sâu về MongoDB, Neo4j, Redis và xử lý dữ liệu lớn.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', 'usr_104'),
('grp_304', 'UI/UX Design Vietnam', 'Nơi chia sẻ case study, layout thiết kế giao diện hiện đại.', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800', 'usr_102');

-- 5. Nạp Thành viên Hội nhóm
INSERT INTO group_members (group_id, user_id, role) VALUES
('grp_301', 'usr_101', 'admin'),
('grp_301', 'usr_102', 'member'),
('grp_302', 'usr_103', 'admin'),
('grp_301', 'usr_104', 'member'),
('grp_303', 'usr_104', 'member'),
('grp_303', 'usr_101', 'member'),
('grp_304', 'usr_102', 'admin'),
('grp_304', 'usr_107', 'member'),
('grp_301', 'usr_108', 'member'),
('grp_302', 'usr_108', 'member'),
('grp_301', 'usr_112', 'member');

-- 6. Nạp Quan hệ bạn bè (Hai chiều trong SQL)
INSERT INTO friendships (user_id_1, user_id_2) VALUES
-- Bạn bè trực tiếp của usr_101
('usr_101', 'usr_102'), ('usr_102', 'usr_101'),
('usr_101', 'usr_103'), ('usr_103', 'usr_101'),
('usr_101', 'usr_108'), ('usr_108', 'usr_101'),
('usr_101', 'usr_112'), ('usr_112', 'usr_101'),
-- Bạn của bạn (Bậc 2)
('usr_102', 'usr_104'), ('usr_104', 'usr_102'),
('usr_103', 'usr_104'), ('usr_104', 'usr_103'),
('usr_102', 'usr_107'), ('usr_107', 'usr_102'),
('usr_103', 'usr_110'), ('usr_110', 'usr_103'),
('usr_108', 'usr_105'), ('usr_105', 'usr_108'),
('usr_108', 'usr_104'), ('usr_104', 'usr_108'),
-- Bậc 3 và 4
('usr_104', 'usr_106'), ('usr_106', 'usr_104'),
('usr_106', 'usr_111'), ('usr_111', 'usr_106'),
('usr_111', 'usr_109'), ('usr_109', 'usr_111');

-- 7. Nạp Bài viết (Posts)
INSERT INTO posts (id, author_id, content, media_urls, like_count, comment_count) VALUES
('post_01', 'usr_101', 'Chào cả lớp NoSQL - Khoa CNTT HUIT! Đồ án Mạng xã hội đã tích hợp MongoDB + Neo4j hoàn tất!', '["https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"]', 48, 12),
('post_02', 'usr_102', 'Vừa hoàn thiện xong bộ Design System phong cách Goonly Warm Dribbble cho đồ án!', '["https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800"]', 92, 18),
('post_03', 'usr_104', 'Đo đạc hiệu năng giữa Neo4j và SQL truyền thống cho bài toán bạn của bạn bậc 3!', '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"]', 78, 14);

-- 8. Nạp Tin nhắn (Messages)
INSERT INTO messages (id, conversation_id, sender_id, receiver_id, content, is_read) VALUES
('msg_01', 'conv_usr_101_usr_102', 'usr_102', 'usr_101', 'Chào Duy! Cậu kiểm tra xong thuật toán gợi ý kết bạn trên đồ thị Neo4j chưa?', TRUE),
('msg_02', 'conv_usr_101_usr_102', 'usr_101', 'usr_102', 'Chào Bình! Tớ vừa test xong, tốc độ duyệt đồ thị và tìm bạn chung cực nhanh luôn!', TRUE);

-- ==============================================================================================
-- SO SÁNH TRUY VẤN GỢI Ý BẠN BÈ (FoAF) BẰNG SQL VS NEO4J
-- ==============================================================================================

-- [Câu truy vấn SQL FoAF]: Tìm bạn của bạn cho 'usr_101' và đếm số bạn chung
-- Nhận xét: Phải JOIN 2 lần bảng friendships, sau đó lọc loại trừ và GROUP BY. 
-- Khi dữ liệu lên hàng triệu dòng, phép JOIN này gây nghẽn cổ chai nghiêm trọng!
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
