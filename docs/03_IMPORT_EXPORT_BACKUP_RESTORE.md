# TÀI LIỆU 03: HƯỚNG DẪN IMPORT/EXPORT & BACKUP/RESTORE CƠ SỞ DỮ LIỆU
**Đề tài:** Mạng xã hội & Phân hệ gợi ý kết bạn  
**Mục tiêu:** Đáp ứng trọn vẹn Mục 6 (0.5 điểm) trong thang điểm đánh giá.

---

## PHẦN A: NEO4J (GRAPH DATABASE)

### 1. Import Dữ liệu từ file CSV
Neo4j hỗ trợ lệnh `LOAD CSV` cực kỳ mạnh mẽ để nạp hàng ngàn node và relationship.

#### 1.1. Import Nodes Users (`users.csv`)
File `users.csv` đặt trong thư mục `import/` của Neo4j:
```csv
id,username,fullName,city,workplace
usr_101,vana,Nguyễn Văn A,Hồ Chí Minh,HUIT
usr_102,thib,Trần Thị B,Hà Nội,FPT Software
usr_103,vanc,Lê Văn C,Hồ Chí Minh,HUIT
```

Lệnh Cypher:
```cypher
LOAD CSV WITH HEADERS FROM 'file:///users.csv' AS row
CREATE (:User {
  id: row.id,
  username: row.username,
  fullName: row.fullName,
  city: row.city,
  workplace: row.workplace,
  createdAt: datetime()
});
```

#### 1.2. Import Relationships Bạn bè (`friendships.csv`)
```csv
user1,user2
usr_101,usr_102
usr_102,usr_103
usr_101,usr_103
```

Lệnh Cypher:
```cypher
LOAD CSV WITH HEADERS FROM 'file:///friendships.csv' AS row
MATCH (u1:User {id: row.user1})
MATCH (u2:User {id: row.user2})
MERGE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u2)
MERGE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u1);
```

---

### 2. Export Dữ liệu từ Neo4j
Sử dụng công cụ `apoc` (hoặc lệnh cypher-shell xuất ra tệp):
```cypher
// Xuất toàn bộ đồ thị ra định dạng JSON
CALL apoc.export.json.all("backup_graph_export.json", {useTypes: true});

// Hoặc xuất các quan hệ bạn bè ra CSV
CALL apoc.export.csv.query(
  "MATCH (u1:User)-[r:FRIENDS_WITH]->(u2:User) RETURN u1.id AS u1, u2.id AS u2",
  "friendships_export.csv",
  {}
);
```

---

### 3. Backup & Restore Neo4j Database

#### 3.1. Backup (Dump Database)
Dừng dịch vụ hoặc unbind database trước khi dump:
```bash
# Lệnh dump CSDL 'neo4j' ra file nén
neo4j-admin database dump neo4j --to-path=./backups/neo4j_dump.dump
```

#### 3.2. Restore (Load Database)
```bash
# Phục hồi CSDL từ file dump đã lưu
neo4j-admin database load neo4j --from-path=./backups/neo4j_dump.dump --overwrite-destination=true
```

---

## PHẦN B: MONGODB (DOCUMENT DATABASE)

### 1. Import / Export bằng `mongoimport` & `mongoexport`

#### 1.1. Export collection `posts` ra file JSON:
```bash
mongoexport --uri="mongodb://localhost:27017/social_network_db" \
  --collection=posts \
  --out=./backups/posts_backup.json \
  --jsonArray --pretty
```

#### 1.2. Import dữ liệu từ JSON vào collection `posts`:
```bash
mongoimport --uri="mongodb://localhost:27017/social_network_db" \
  --collection=posts \
  --file=./backups/posts_backup.json \
  --jsonArray --drop
```
*(Cờ `--drop` sẽ xóa sạch dữ liệu cũ trong collection trước khi import).*

---

### 2. Backup & Restore toàn bộ Database bằng `mongodump` & `mongorestore`

#### 2.1. Backup toàn bộ cơ sở dữ liệu:
```bash
# Xuất toàn bộ CSDL social_network_db thành một archive nén duy nhất
mongodump --uri="mongodb://localhost:27017/social_network_db" \
  --archive=./backups/social_network_mongo.archive --gzip
```

#### 2.2. Phục hồi toàn bộ cơ sở dữ liệu:
```bash
# Phục hồi nguyên trạng database từ file archive
mongorestore --uri="mongodb://localhost:27017/social_network_db" \
  --archive=./backups/social_network_mongo.archive --gzip --drop
```

---

## PHẦN C: KỊCH BẢN DEMO TRƯỚC GIẢNG VIÊN (MỤC 6: 0.5 ĐIỂM)
1. Mở Terminal / PowerShell.
2. Chạy lệnh Backup của MongoDB và Neo4j, chỉ ra file `.dump` và `.archive` vừa tạo trong thư mục `backups/`.
3. Vào GUI Tool (Neo4j Browser / Compass) xóa thử một vài records hoặc xóa trắng một collection.
4. Chạy lệnh Restore.
5. F5 lại GUI Tool để giảng viên thấy dữ liệu đã được hồi phục 100% nguyên vẹn.
