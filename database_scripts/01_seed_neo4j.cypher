// ==============================================================================================
// ĐỀ TÀI: MẠNG XÃ HỘI VÀ PHÂN HỆ GỢI Ý KẾT BẠN (FRIEND RECOMMENDATION) - MÔN NOSQL (HUIT)
// FILE SCRIPT: 01_seed_neo4j.cypher
// MÔ TẢ: Kịch bản Cypher khởi tạo mạng lưới đồ thị 35 người dùng, 10 sở thích, 6 hội nhóm và các liên kết bạn bè
// HƯỚNG DẪN: Mở Neo4j Browser (http://localhost:7474), dán toàn bộ nội dung dưới đây và bấm RUN (Ctrl + Enter)
// ==============================================================================================

// -------------------------------------------------------------
// BƯỚC 1: XÓA SẠCH DỮ LIỆU ĐỒ THỊ CŨ (NẾU CÓ)
// -------------------------------------------------------------
MATCH (n) DETACH DELETE n;

// -------------------------------------------------------------
// BƯỚC 2: TẠO 10 NÚT SỞ THÍCH (INTERESTS)
// -------------------------------------------------------------
CREATE (i1:Interest {id: "int_1", name: "Công nghệ"})
CREATE (i2:Interest {id: "int_2", name: "Bóng đá"})
CREATE (i3:Interest {id: "int_3", name: "Du lịch"})
CREATE (i4:Interest {id: "int_4", name: "Âm nhạc"})
CREATE (i5:Interest {id: "int_5", name: "AI & Data"})
CREATE (i6:Interest {id: "int_6", name: "UI/UX Design"})
CREATE (i7:Interest {id: "int_7", name: "Nhiếp ảnh"})
CREATE (i8:Interest {id: "int_8", name: "Thể thao & Cầu lông"})
CREATE (i9:Interest {id: "int_9", name: "Ẩm thực Sài Gòn"})
CREATE (i10:Interest {id: "int_10", name: "Tiếng Anh & Sách"});

// -------------------------------------------------------------
// BƯỚC 3: TẠO 6 CÂU LẠC BỘ / HỘI NHÓM SINH VIÊN (GROUPS)
// -------------------------------------------------------------
CREATE (g1:Group {id: "grp_301", name: "CLB Tin học HUIT", privacy: "public"})
CREATE (g2:Group {id: "grp_302", name: "Cộng đồng Dev Sài Gòn", privacy: "public"})
CREATE (g3:Group {id: "grp_303", name: "CLB Nhiếp ảnh & Media HUIT", privacy: "public"})
CREATE (g4:Group {id: "grp_304", name: "UI/UX Design Vietnam", privacy: "public"})
CREATE (g5:Group {id: "grp_305", name: "CLB Cầu lông & Thể thao HUIT", privacy: "public"})
CREATE (g6:Group {id: "grp_306", name: "Hội Tiếng Anh & Du Học HUIT", privacy: "public"});

// -------------------------------------------------------------
// BƯỚC 4: TẠO 35 NGƯỜI DÙNG THỰC TẾ (USERS) - CHỈ USR_101 LÀ ADMIN
// -------------------------------------------------------------
CREATE (u1:User {id: "usr_101", username: "khanhduy_it", fullName: "Nguyễn Khánh Duy", role: "admin", city: "Hồ Chí Minh", workplace: "Khoa CNTT - HUIT", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"})
CREATE (u2:User {id: "usr_102", username: "thibinh", fullName: "Trần Thị Bình", role: "user", city: "Hồ Chí Minh", workplace: "Goonly Studio", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"})
CREATE (u3:User {id: "usr_103", username: "vancuong", fullName: "Lê Văn Cường", role: "user", city: "Hồ Chí Minh", workplace: "FPT Software", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"})
CREATE (u4:User {id: "usr_104", username: "minhduc", fullName: "Phạm Minh Đức", role: "user", city: "Hồ Chí Minh", workplace: "Khoa CNTT - HUIT", avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150"})
CREATE (u5:User {id: "usr_105", username: "thudung", fullName: "Hoàng Thu Dung", role: "user", city: "Hồ Chí Minh", workplace: "VNG Corporation", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"})
CREATE (u6:User {id: "usr_106", username: "hoangnam", fullName: "Đỗ Hoàng Nam", role: "user", city: "Hà Nội", workplace: "Zalo AI Lab", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"})
CREATE (u7:User {id: "usr_107", username: "thuylinh", fullName: "Vũ Thùy Linh", role: "user", city: "Hồ Chí Minh", workplace: "MoMo Fintech", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"})
CREATE (u8:User {id: "usr_108", username: "quocbao", fullName: "Trịnh Quốc Bảo", role: "user", city: "Hồ Chí Minh", workplace: "Tiki Tech", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150"})
CREATE (u9:User {id: "usr_109", username: "myhanh", fullName: "Đinh Mỹ Hạnh", role: "user", city: "Hồ Chí Minh", workplace: "Đại học Công Thương TP.HCM", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"})
CREATE (u10:User {id: "usr_110", username: "tuananh", fullName: "Bùi Tuấn Anh", role: "user", city: "Hồ Chí Minh", workplace: "Shopee Vietnam", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150"})
CREATE (u11:User {id: "usr_111", username: "ngoclan", fullName: "Phan Ngọc Lan", role: "user", city: "Hà Nội", workplace: "Viettel Cyber Security", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"})
CREATE (u12:User {id: "usr_112", username: "thanhtung", fullName: "Mai Thanh Tùng", role: "user", city: "Hồ Chí Minh", workplace: "HUIT", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"})
CREATE (u13:User {id: "usr_113", username: "hoanglong", fullName: "Nguyễn Hoàng Long", role: "user", city: "Hồ Chí Minh", workplace: "Freelance Photographer", avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150"})
CREATE (u14:User {id: "usr_114", username: "baongoc", fullName: "Lê Bảo Ngọc", role: "user", city: "Hồ Chí Minh", workplace: "HUIT Sports Club", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"})
CREATE (u15:User {id: "usr_115", username: "giahuy", fullName: "Trương Gia Huy", role: "user", city: "Hồ Chí Minh", workplace: "Tech Startup", avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"})
CREATE (u16:User {id: "usr_116", username: "phuongthao", fullName: "Võ Phương Thảo", role: "user", city: "Hồ Chí Minh", workplace: "English Club HUIT", avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150"})
CREATE (u17:User {id: "usr_117", username: "quangkhai", fullName: "Lâm Quang Khải", role: "user", city: "Hồ Chí Minh", workplace: "Data Platform Team", avatarUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150"})
CREATE (u18:User {id: "usr_118", username: "quynhchi", fullName: "Dương Quỳnh Chi", role: "user", city: "Hồ Chí Minh", workplace: "GenZ Media", avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150"})
CREATE (u19:User {id: "usr_119", username: "ducthang", fullName: "Hồ Đức Thắng", role: "user", city: "Đà Nẵng", workplace: "SmartHome Lab", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"})
CREATE (u20:User {id: "usr_120", username: "ngocbich", fullName: "Nguyễn Ngọc Bích", role: "user", city: "Hồ Chí Minh", workplace: "Student Startup HUIT", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"})
CREATE (u21:User {id: "usr_121", username: "dinhtrong", fullName: "Trần Đình Trọng", role: "user", city: "Hồ Chí Minh", workplace: "CLB Bóng Đá Sinh Viên HUIT", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"})
CREATE (u22:User {id: "usr_122", username: "quynhnhu", fullName: "Phạm Quỳnh Như", role: "user", city: "Hồ Chí Minh", workplace: "Hội Tiếng Anh & Du Học HUIT", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"})
CREATE (u23:User {id: "usr_123", username: "minhkhoi", fullName: "Đặng Minh Khôi", role: "user", city: "Hồ Chí Minh", workplace: "Game Studio", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"})
CREATE (u24:User {id: "usr_124", username: "haiyen", fullName: "Nguyễn Hải Yến", role: "user", city: "Hồ Chí Minh", workplace: "HUIT Tourism", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"})
CREATE (u25:User {id: "usr_125", username: "quochuy", fullName: "Bùi Quốc Huy", role: "user", city: "Hồ Chí Minh", workplace: "HUIT Network Center", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150"})
CREATE (u26:User {id: "usr_126", username: "anhtuyet", fullName: "Hoàng Ánh Tuyết", role: "user", city: "Hồ Chí Minh", workplace: "CLB Nhiếp ảnh & Media HUIT", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"})
CREATE (u27:User {id: "usr_127", username: "trongnghia", fullName: "Đỗ Trọng Nghĩa", role: "user", city: "Hồ Chí Minh", workplace: "CLB Tin học HUIT", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"})
CREATE (u28:User {id: "usr_128", username: "camtu", fullName: "Lê Cẩm Tú", role: "user", city: "Hồ Chí Minh", workplace: "Đoàn Thanh Niên HUIT", avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150"})
CREATE (u29:User {id: "usr_129", username: "quoctoan", fullName: "Vũ Quốc Toàn", role: "user", city: "Hồ Chí Minh", workplace: "CLB Cầu lông & Thể thao HUIT", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150"})
CREATE (u30:User {id: "usr_130", username: "thanhtruc", fullName: "Phan Thanh Trúc", role: "user", city: "Hồ Chí Minh", workplace: "Khoa Tài chính - HUIT", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"})
CREATE (u31:User {id: "usr_131", username: "tanphat", fullName: "Nguyễn Tấn Phát", role: "user", city: "Hồ Chí Minh", workplace: "Fintech Lab", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"})
CREATE (u32:User {id: "usr_132", username: "thaonhi", fullName: "Huỳnh Thảo Nhi", role: "user", city: "Hồ Chí Minh", workplace: "Food Blogger", avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150"})
CREATE (u33:User {id: "usr_133", username: "minhtri", fullName: "Cao Minh Trí", role: "user", city: "Hồ Chí Minh", workplace: "Cộng đồng Dev Sài Gòn", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"})
CREATE (u34:User {id: "usr_134", username: "dieulinh", fullName: "Đinh Diệu Linh", role: "user", city: "Hồ Chí Minh", workplace: "Hội Tiếng Anh & Du Học HUIT", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"})
CREATE (u35:User {id: "usr_135", username: "giabao", fullName: "Vương Gia Bảo", role: "user", city: "Hồ Chí Minh", workplace: "CLB Nhiếp ảnh & Media HUIT", avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"});

// -------------------------------------------------------------
// BƯỚC 5: TẠO CÁC MỐI LIÊN KẾT SỞ THÍCH [:INTERESTED_IN]
// -------------------------------------------------------------
CREATE (u1)-[:INTERESTED_IN]->(i1), (u1)-[:INTERESTED_IN]->(i2), (u1)-[:INTERESTED_IN]->(i5), (u1)-[:INTERESTED_IN]->(i8)
CREATE (u2)-[:INTERESTED_IN]->(i1), (u2)-[:INTERESTED_IN]->(i4), (u2)-[:INTERESTED_IN]->(i6), (u2)-[:INTERESTED_IN]->(i7)
CREATE (u3)-[:INTERESTED_IN]->(i1), (u3)-[:INTERESTED_IN]->(i2), (u3)-[:INTERESTED_IN]->(i5)
CREATE (u4)-[:INTERESTED_IN]->(i1), (u4)-[:INTERESTED_IN]->(i2), (u4)-[:INTERESTED_IN]->(i5)
CREATE (u5)-[:INTERESTED_IN]->(i3), (u5)-[:INTERESTED_IN]->(i4), (u5)-[:INTERESTED_IN]->(i5), (u5)-[:INTERESTED_IN]->(i9)
CREATE (u6)-[:INTERESTED_IN]->(i1), (u6)-[:INTERESTED_IN]->(i5)
CREATE (u7)-[:INTERESTED_IN]->(i3), (u7)-[:INTERESTED_IN]->(i4), (u7)-[:INTERESTED_IN]->(i6)
CREATE (u8)-[:INTERESTED_IN]->(i1), (u8)-[:INTERESTED_IN]->(i2), (u8)-[:INTERESTED_IN]->(i3)
CREATE (u10)-[:INTERESTED_IN]->(i1), (u10)-[:INTERESTED_IN]->(i2), (u10)-[:INTERESTED_IN]->(i8)
CREATE (u12)-[:INTERESTED_IN]->(i1), (u12)-[:INTERESTED_IN]->(i2), (u12)-[:INTERESTED_IN]->(i3)
CREATE (u13)-[:INTERESTED_IN]->(i6), (u13)-[:INTERESTED_IN]->(i7), (u13)-[:INTERESTED_IN]->(i3)
CREATE (u14)-[:INTERESTED_IN]->(i8), (u14)-[:INTERESTED_IN]->(i3), (u14)-[:INTERESTED_IN]->(i9)
CREATE (u15)-[:INTERESTED_IN]->(i1), (u15)-[:INTERESTED_IN]->(i6), (u15)-[:INTERESTED_IN]->(i4)
CREATE (u16)-[:INTERESTED_IN]->(i10), (u16)-[:INTERESTED_IN]->(i3), (u16)-[:INTERESTED_IN]->(i4)
CREATE (u17)-[:INTERESTED_IN]->(i1), (u17)-[:INTERESTED_IN]->(i5)
CREATE (u18)-[:INTERESTED_IN]->(i9), (u18)-[:INTERESTED_IN]->(i7), (u18)-[:INTERESTED_IN]->(i3)
CREATE (u19)-[:INTERESTED_IN]->(i1), (u19)-[:INTERESTED_IN]->(i5)
CREATE (u20)-[:INTERESTED_IN]->(i10), (u20)-[:INTERESTED_IN]->(i9), (u20)-[:INTERESTED_IN]->(i6)
CREATE (u21)-[:INTERESTED_IN]->(i2), (u21)-[:INTERESTED_IN]->(i8)
CREATE (u22)-[:INTERESTED_IN]->(i10), (u22)-[:INTERESTED_IN]->(i4)
CREATE (u23)-[:INTERESTED_IN]->(i1), (u23)-[:INTERESTED_IN]->(i6)
CREATE (u24)-[:INTERESTED_IN]->(i3), (u24)-[:INTERESTED_IN]->(i7)
CREATE (u25)-[:INTERESTED_IN]->(i1), (u25)-[:INTERESTED_IN]->(i2)
CREATE (u26)-[:INTERESTED_IN]->(i6), (u26)-[:INTERESTED_IN]->(i7)
CREATE (u27)-[:INTERESTED_IN]->(i1), (u27)-[:INTERESTED_IN]->(i5)
CREATE (u28)-[:INTERESTED_IN]->(i7), (u28)-[:INTERESTED_IN]->(i10)
CREATE (u29)-[:INTERESTED_IN]->(i8), (u29)-[:INTERESTED_IN]->(i2)
CREATE (u30)-[:INTERESTED_IN]->(i10), (u30)-[:INTERESTED_IN]->(i9)
CREATE (u31)-[:INTERESTED_IN]->(i1), (u31)-[:INTERESTED_IN]->(i5)
CREATE (u32)-[:INTERESTED_IN]->(i9), (u32)-[:INTERESTED_IN]->(i3)
CREATE (u33)-[:INTERESTED_IN]->(i1), (u33)-[:INTERESTED_IN]->(i6)
CREATE (u34)-[:INTERESTED_IN]->(i10), (u34)-[:INTERESTED_IN]->(i3)
CREATE (u35)-[:INTERESTED_IN]->(i7), (u35)-[:INTERESTED_IN]->(i4);

// -------------------------------------------------------------
// BƯỚC 6: TẠO CÁC MỐI LIÊN KẾT THAM GIA CLB [:MEMBER_OF]
// -------------------------------------------------------------
CREATE (u1)-[:MEMBER_OF {role: "admin"}]->(g1)
CREATE (u2)-[:MEMBER_OF {role: "member"}]->(g1)
CREATE (u3)-[:MEMBER_OF {role: "admin"}]->(g2)
CREATE (u4)-[:MEMBER_OF {role: "member"}]->(g1)
CREATE (u4)-[:MEMBER_OF {role: "member"}]->(g2)
CREATE (u8)-[:MEMBER_OF {role: "member"}]->(g1)
CREATE (u8)-[:MEMBER_OF {role: "member"}]->(g2)
CREATE (u12)-[:MEMBER_OF {role: "member"}]->(g1)
CREATE (u13)-[:MEMBER_OF {role: "admin"}]->(g3)
CREATE (u2)-[:MEMBER_OF {role: "member"}]->(g3)
CREATE (u2)-[:MEMBER_OF {role: "admin"}]->(g4)
CREATE (u7)-[:MEMBER_OF {role: "member"}]->(g4)
CREATE (u15)-[:MEMBER_OF {role: "member"}]->(g4)
CREATE (u1)-[:MEMBER_OF {role: "member"}]->(g5)
CREATE (u14)-[:MEMBER_OF {role: "admin"}]->(g5)
CREATE (u10)-[:MEMBER_OF {role: "member"}]->(g5)
CREATE (u16)-[:MEMBER_OF {role: "admin"}]->(g6)
CREATE (u20)-[:MEMBER_OF {role: "member"}]->(g6)
CREATE (u21)-[:MEMBER_OF {role: "member"}]->(g5)
CREATE (u22)-[:MEMBER_OF {role: "member"}]->(g6)
CREATE (u23)-[:MEMBER_OF {role: "member"}]->(g1)
CREATE (u24)-[:MEMBER_OF {role: "member"}]->(g3)
CREATE (u25)-[:MEMBER_OF {role: "member"}]->(g1)
CREATE (u26)-[:MEMBER_OF {role: "member"}]->(g3)
CREATE (u27)-[:MEMBER_OF {role: "member"}]->(g1)
CREATE (u29)-[:MEMBER_OF {role: "member"}]->(g5)
CREATE (u33)-[:MEMBER_OF {role: "member"}]->(g2)
CREATE (u34)-[:MEMBER_OF {role: "member"}]->(g6)
CREATE (u35)-[:MEMBER_OF {role: "member"}]->(g3);

// -------------------------------------------------------------
// BƯỚC 7: TẠO CÁC MỐI LIÊN KẾT BẠN BÈ HAI CHIỀU [:FRIENDS_WITH]
// -------------------------------------------------------------
// 1. Bạn bè trực tiếp bậc 1 của usr_101 (Khánh Duy - Admin)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u2), (u2)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u3), (u3)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u8), (u8)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u12), (u12)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u14), (u14)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u15), (u15)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u25), (u25)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u27), (u27)-[:FRIENDS_WITH {since: datetime()}]->(u1)

// 2. Bạn của bạn bậc 2 (Ứng viên gợi ý FoAF phong phú)
CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u2)
CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u3)
CREATE (u8)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u8)
CREATE (u8)-[:FRIENDS_WITH {since: datetime()}]->(u5), (u5)-[:FRIENDS_WITH {since: datetime()}]->(u8)
CREATE (u14)-[:FRIENDS_WITH {since: datetime()}]->(u5), (u5)-[:FRIENDS_WITH {since: datetime()}]->(u14)
CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u7), (u7)-[:FRIENDS_WITH {since: datetime()}]->(u2)
CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u10), (u10)-[:FRIENDS_WITH {since: datetime()}]->(u3)
CREATE (u14)-[:FRIENDS_WITH {since: datetime()}]->(u10), (u10)-[:FRIENDS_WITH {since: datetime()}]->(u14)
CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u13), (u13)-[:FRIENDS_WITH {since: datetime()}]->(u2)
CREATE (u15)-[:FRIENDS_WITH {since: datetime()}]->(u13), (u13)-[:FRIENDS_WITH {since: datetime()}]->(u15)
CREATE (u14)-[:FRIENDS_WITH {since: datetime()}]->(u18), (u18)-[:FRIENDS_WITH {since: datetime()}]->(u14)
CREATE (u14)-[:FRIENDS_WITH {since: datetime()}]->(u21), (u21)-[:FRIENDS_WITH {since: datetime()}]->(u14)
CREATE (u15)-[:FRIENDS_WITH {since: datetime()}]->(u23), (u23)-[:FRIENDS_WITH {since: datetime()}]->(u15)
CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u26), (u26)-[:FRIENDS_WITH {since: datetime()}]->(u2)
CREATE (u14)-[:FRIENDS_WITH {since: datetime()}]->(u29), (u29)-[:FRIENDS_WITH {since: datetime()}]->(u14)
CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u33), (u33)-[:FRIENDS_WITH {since: datetime()}]->(u3)

// 3. Bậc 3, 4, 5 (Đường đi đồ thị dài kiểm thử tính năng 6 bậc - Shortest Path)
CREATE (u4)-[:FRIENDS_WITH {since: datetime()}]->(u6), (u6)-[:FRIENDS_WITH {since: datetime()}]->(u4)
CREATE (u6)-[:FRIENDS_WITH {since: datetime()}]->(u11), (u11)-[:FRIENDS_WITH {since: datetime()}]->(u6)
CREATE (u11)-[:FRIENDS_WITH {since: datetime()}]->(u9), (u9)-[:FRIENDS_WITH {since: datetime()}]->(u11)
CREATE (u9)-[:FRIENDS_WITH {since: datetime()}]->(u17), (u17)-[:FRIENDS_WITH {since: datetime()}]->(u9)
CREATE (u17)-[:FRIENDS_WITH {since: datetime()}]->(u19), (u19)-[:FRIENDS_WITH {since: datetime()}]->(u17)
CREATE (u18)-[:FRIENDS_WITH {since: datetime()}]->(u16), (u16)-[:FRIENDS_WITH {since: datetime()}]->(u18)
CREATE (u16)-[:FRIENDS_WITH {since: datetime()}]->(u20), (u20)-[:FRIENDS_WITH {since: datetime()}]->(u16)
CREATE (u20)-[:FRIENDS_WITH {since: datetime()}]->(u22), (u22)-[:FRIENDS_WITH {since: datetime()}]->(u20)
CREATE (u22)-[:FRIENDS_WITH {since: datetime()}]->(u34), (u34)-[:FRIENDS_WITH {since: datetime()}]->(u22)
CREATE (u18)-[:FRIENDS_WITH {since: datetime()}]->(u32), (u32)-[:FRIENDS_WITH {since: datetime()}]->(u18)
CREATE (u13)-[:FRIENDS_WITH {since: datetime()}]->(u35), (u35)-[:FRIENDS_WITH {since: datetime()}]->(u13)
CREATE (u17)-[:FRIENDS_WITH {since: datetime()}]->(u31), (u31)-[:FRIENDS_WITH {since: datetime()}]->(u17)
CREATE (u24)-[:FRIENDS_WITH {since: datetime()}]->(u28), (u28)-[:FRIENDS_WITH {since: datetime()}]->(u24)
CREATE (u28)-[:FRIENDS_WITH {since: datetime()}]->(u30), (u30)-[:FRIENDS_WITH {since: datetime()}]->(u28);
