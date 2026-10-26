// ==============================================================================================
// ĐỀ TÀI: MẠNG XÃ HỘI VÀ PHÂN HỆ GỢI Ý KẾT BẠN (FRIEND RECOMMENDATION) - MÔN NOSQL (HUIT)
// FILE SCRIPT: 01_seed_neo4j.cypher
// MÔ TẢ: Kịch bản Cypher khởi tạo mạng lưới đồ thị người dùng, sở thích, hội nhóm và quan hệ bạn bè
// HƯỚNG DẪN: Mở Neo4j Browser (http://localhost:7474), dán toàn bộ nội dung dưới đây và bấm RUN (Ctrl + Enter)
// ==============================================================================================

// -------------------------------------------------------------
// BƯỚC 1: XÓA SẠCH DỮ LIỆU ĐỒ THỊ CŨ (NẾU CÓ)
// -------------------------------------------------------------
MATCH (n) DETACH DELETE n;

// -------------------------------------------------------------
// BƯỚC 2: TẠO CÁC NÚT SỞ THÍCH (INTERESTS)
// -------------------------------------------------------------
CREATE (i1:Interest {id: "int_1", name: "Công nghệ"})
CREATE (i2:Interest {id: "int_2", name: "Bóng đá"})
CREATE (i3:Interest {id: "int_3", name: "Du lịch"})
CREATE (i4:Interest {id: "int_4", name: "Âm nhạc"})
CREATE (i5:Interest {id: "int_5", name: "AI & Data"})
CREATE (i6:Interest {id: "int_6", name: "UI/UX Design"});

// -------------------------------------------------------------
// BƯỚC 3: TẠO CÁC NÚT HỘI NHÓM / CLB (GROUPS)
// -------------------------------------------------------------
CREATE (g1:Group {id: "grp_301", name: "CLB Tin học HUIT", privacy: "public"})
CREATE (g2:Group {id: "grp_302", name: "Cộng đồng Dev Sài Gòn", privacy: "public"})
CREATE (g3:Group {id: "grp_303", name: "NoSQL & Big Data Lab", privacy: "public"})
CREATE (g4:Group {id: "grp_304", name: "UI/UX Design Vietnam", privacy: "public"});

// -------------------------------------------------------------
// BƯỚC 4: TẠO 12 NGƯỜI DÙNG THẬT (USERS)
// -------------------------------------------------------------
CREATE (u1:User {
  id: "usr_101", 
  username: "khanhduy", 
  fullName: "Nguyễn Khánh Duy", 
  city: "Hồ Chí Minh", 
  workplace: "Khoa CNTT - HUIT",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
})
CREATE (u2:User {
  id: "usr_102", 
  username: "thibinh", 
  fullName: "Trần Thị Bình", 
  city: "Hồ Chí Minh", 
  workplace: "Goonly Studio",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
})
CREATE (u3:User {
  id: "usr_103", 
  username: "vancuong", 
  fullName: "Lê Văn Cường", 
  city: "Hồ Chí Minh", 
  workplace: "FPT Software",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
})
CREATE (u4:User {
  id: "usr_104", 
  username: "minhduc", 
  fullName: "Phạm Minh Đức", 
  city: "Hồ Chí Minh", 
  workplace: "Khoa CNTT - HUIT",
  avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150"
})
CREATE (u5:User {
  id: "usr_105", 
  username: "thudung", 
  fullName: "Hoàng Thu Dung", 
  city: "Hồ Chí Minh", 
  workplace: "VNG Corporation",
  avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
})
CREATE (u6:User {
  id: "usr_106", 
  username: "hoangnam", 
  fullName: "Đỗ Hoàng Nam", 
  city: "Hà Nội", 
  workplace: "Zalo AI Lab",
  avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
})
CREATE (u7:User {
  id: "usr_107", 
  username: "thuylinh", 
  fullName: "Vũ Thùy Linh", 
  city: "Hồ Chí Minh", 
  workplace: "MoMo Fintech",
  avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
})
CREATE (u8:User {
  id: "usr_108", 
  username: "quocbao", 
  fullName: "Trịnh Quốc Bảo", 
  city: "Hồ Chí Minh", 
  workplace: "Tiki Tech",
  avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"
})
CREATE (u9:User {
  id: "usr_109", 
  username: "myhanh", 
  fullName: "Đinh Mỹ Hạnh", 
  city: "Hồ Chí Minh", 
  workplace: "Đại học Công Thương TP.HCM",
  avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"
})
CREATE (u10:User {
  id: "usr_110", 
  username: "tuananh", 
  fullName: "Bùi Tuấn Anh", 
  city: "Hồ Chí Minh", 
  workplace: "Shopee Vietnam",
  avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150"
})
CREATE (u11:User {
  id: "usr_111", 
  username: "ngoclan", 
  fullName: "Phan Ngọc Lan", 
  city: "Hà Nội", 
  workplace: "Viettel Cyber Security",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
})
CREATE (u12:User {
  id: "usr_112", 
  username: "thanhtung", 
  fullName: "Mai Thanh Tùng", 
  city: "Hồ Chí Minh", 
  workplace: "HUIT",
  avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150"
});

// -------------------------------------------------------------
// BƯỚC 5: TẠO QUAN HỆ SỞ THÍCH [:INTERESTED_IN] (PHỤC VỤ THUẬT TOÁN JACCARD)
// -------------------------------------------------------------
CREATE (u1)-[:INTERESTED_IN]->(i1), (u1)-[:INTERESTED_IN]->(i2), (u1)-[:INTERESTED_IN]->(i5)
CREATE (u2)-[:INTERESTED_IN]->(i1), (u2)-[:INTERESTED_IN]->(i4), (u2)-[:INTERESTED_IN]->(i6)
CREATE (u3)-[:INTERESTED_IN]->(i1), (u3)-[:INTERESTED_IN]->(i2), (u3)-[:INTERESTED_IN]->(i5)
CREATE (u4)-[:INTERESTED_IN]->(i1), (u4)-[:INTERESTED_IN]->(i2), (u4)-[:INTERESTED_IN]->(i5)
CREATE (u5)-[:INTERESTED_IN]->(i3), (u5)-[:INTERESTED_IN]->(i4), (u5)-[:INTERESTED_IN]->(i5)
CREATE (u6)-[:INTERESTED_IN]->(i1), (u6)-[:INTERESTED_IN]->(i5)
CREATE (u7)-[:INTERESTED_IN]->(i3), (u7)-[:INTERESTED_IN]->(i4), (u7)-[:INTERESTED_IN]->(i6)
CREATE (u8)-[:INTERESTED_IN]->(i1), (u8)-[:INTERESTED_IN]->(i2), (u8)-[:INTERESTED_IN]->(i3)
CREATE (u9)-[:INTERESTED_IN]->(i1), (u9)-[:INTERESTED_IN]->(i5)
CREATE (u10)-[:INTERESTED_IN]->(i1), (u10)-[:INTERESTED_IN]->(i2)
CREATE (u11)-[:INTERESTED_IN]->(i1), (u11)-[:INTERESTED_IN]->(i5)
CREATE (u12)-[:INTERESTED_IN]->(i1), (u12)-[:INTERESTED_IN]->(i2);

// -------------------------------------------------------------
// BƯỚC 6: TẠO QUAN HỆ THAM GIA HỘI NHÓM [:MEMBER_OF]
// -------------------------------------------------------------
CREATE (u1)-[:MEMBER_OF {role: "admin", joinedAt: datetime()}]->(g1)
CREATE (u2)-[:MEMBER_OF {role: "member", joinedAt: datetime()}]->(g1)
CREATE (u3)-[:MEMBER_OF {role: "admin", joinedAt: datetime()}]->(g2)
CREATE (u4)-[:MEMBER_OF {role: "member", joinedAt: datetime()}]->(g1)
CREATE (u4)-[:MEMBER_OF {role: "member", joinedAt: datetime()}]->(g3)
CREATE (u1)-[:MEMBER_OF {role: "member", joinedAt: datetime()}]->(g3)
CREATE (u2)-[:MEMBER_OF {role: "admin", joinedAt: datetime()}]->(g4)
CREATE (u7)-[:MEMBER_OF {role: "member", joinedAt: datetime()}]->(g4)
CREATE (u8)-[:MEMBER_OF {role: "member", joinedAt: datetime()}]->(g1)
CREATE (u8)-[:MEMBER_OF {role: "member", joinedAt: datetime()}]->(g2)
CREATE (u12)-[:MEMBER_OF {role: "member", joinedAt: datetime()}]->(g1);

// -------------------------------------------------------------
// BƯỚC 7: TẠO QUAN HỆ BẠN BÈ [:FRIENDS_WITH] (HAI CHIỀU)
// -------------------------------------------------------------
// 1. Bạn bè trực tiếp bậc 1 của usr_101 (Nguyễn Khánh Duy)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u2), (u2)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u3), (u3)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u8), (u8)-[:FRIENDS_WITH {since: datetime()}]->(u1)
CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u12), (u12)-[:FRIENDS_WITH {since: datetime()}]->(u1)

// 2. Bạn của bạn bậc 2 (FoAF - Friend of a Friend) -> Ứng viên gợi ý cho usr_101
CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u2)
CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u3)
CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u7), (u7)-[:FRIENDS_WITH {since: datetime()}]->(u2)
CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u10), (u10)-[:FRIENDS_WITH {since: datetime()}]->(u3)
CREATE (u8)-[:FRIENDS_WITH {since: datetime()}]->(u5), (u5)-[:FRIENDS_WITH {since: datetime()}]->(u8)
CREATE (u8)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u8)

// 3. Bạn bè bậc 3 và 4 (Phục vụ bài toán tìm đường đi ngắn nhất 6 bậc - Six Degrees of Separation)
CREATE (u4)-[:FRIENDS_WITH {since: datetime()}]->(u6), (u6)-[:FRIENDS_WITH {since: datetime()}]->(u4)
CREATE (u6)-[:FRIENDS_WITH {since: datetime()}]->(u11), (u11)-[:FRIENDS_WITH {since: datetime()}]->(u6)
CREATE (u11)-[:FRIENDS_WITH {since: datetime()}]->(u9), (u9)-[:FRIENDS_WITH {since: datetime()}]->(u11);

// ==============================================================================================
// CÁC CÂU TRUY VẤN MẪU KIỂM TRA THUẬT TOÁN ĐỒ THỊ
// ==============================================================================================

// [Query 1]: Xem toàn bộ đồ thị mạng xã hội
// MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 100;

// [Query 2]: Gợi ý kết bạn theo Bạn chung (FoAF) cho usr_101:
// MATCH (me:User {id: 'usr_101'})-[:FRIENDS_WITH]-(friend:User)-[:FRIENDS_WITH]-(foaf:User)
// WHERE NOT (me)-[:FRIENDS_WITH]-(foaf) AND me <> foaf
// RETURN foaf.id AS id, foaf.fullName AS fullName, count(DISTINCT friend) AS mutualFriendsCount
// ORDER BY mutualFriendsCount DESC;

// [Query 3]: Tìm đường đi ngắn nhất giữa usr_101 và cô Đinh Mỹ Hạnh (usr_109):
// MATCH p = shortestPath((u1:User {id: 'usr_101'})-[:FRIENDS_WITH*..6]-(u2:User {id: 'usr_109'}))
// RETURN p;
