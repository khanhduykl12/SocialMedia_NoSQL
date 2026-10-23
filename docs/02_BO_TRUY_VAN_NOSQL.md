# TÀI LIỆU 02: BỘ TRUY VẤN NOSQL NÂNG CAO (STORIES, REELS & GRAPH ALGORITHMS)
**Đề tài:** Mạng xã hội hiện đại & Phân hệ gợi ý kết bạn  
**Mục tiêu:** Khai thác tối đa thế mạnh của MongoDB (TTL, Aggregation) và Neo4j (Graph traversal, Jaccard, FoAF).

---

## PHẦN A: BỘ TRUY VẤN MONGODB MỞ RỘNG (STORIES & REELS)

### 1. Phân hệ Story 24h: Tự động hủy bằng TTL Index
Tạo chỉ mục tự hủy khi trường `expiresAt` đạt thời gian thực:
```javascript
// Thiết lập TTL Index trên collection stories
db.stories.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });
```

#### Truy vấn Khay Stories bạn bè (Stories Tray Aggregation)
*Lấy danh sách các story còn hạn của bạn bè, gom nhóm theo tác giả (giống hệt Instagram Stories Bar).*
```javascript
const myFriendIds = ["usr_102", "usr_103", "usr_104"];

db.stories.aggregate([
  {
    $match: {
      authorId: { $in: myFriendIds },
      expiresAt: { $gt: new Date() } // Chỉ lấy story chưa hết hạn
    }
  },
  { $sort: { createdAt: 1 } },
  {
    $group: {
      _id: "$authorId",
      stories: {
        $push: {
          id: "$_id",
          mediaType: "$mediaType",
          mediaUrl: "$mediaUrl",
          caption: "$caption",
          createdAt: "$createdAt"
        }
      },
      latestStoryTime: { $max: "$createdAt" }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "author"
    }
  },
  { $unwind: "$author" },
  {
    $project: {
      authorId: "$_id",
      authorName: "$author.profile.fullName",
      authorAvatar: "$author.profile.avatarUrl",
      stories: 1,
      latestStoryTime: 1
    }
  },
  { $sort: { latestStoryTime: -1 } }
]);
```

---

### 2. Phân hệ Video Ngắn (Short Videos / Reels Feed Aggregation)
*Lấy danh sách Reels thịnh hành, tính điểm tương tác và thông tin người đăng.*
```javascript
db.reels.aggregate([
  {
    $addFields: {
      trendingScore: {
        $add: [
          { $multiply: ["$likeCount", 3] },
          { $multiply: ["$commentCount", 5] },
          { $divide: ["$viewsCount", 10] }
        ]
      }
    }
  },
  { $sort: { trendingScore: -1, createdAt: -1 } },
  { $limit: 10 },
  {
    $lookup: {
      from: "users",
      localField: "authorId",
      foreignField: "_id",
      as: "author"
    }
  },
  { $unwind: "$author" },
  {
    $project: {
      _id: 1,
      videoUrl: 1,
      thumbnailUrl: 1,
      caption: 1,
      musicTitle: 1,
      tags: 1,
      likeCount: 1,
      commentCount: 1,
      viewsCount: 1,
      author: {
        id: "$author._id",
        fullName: "$author.profile.fullName",
        avatarUrl: "$author.profile.avatarUrl"
      }
    }
  }
]);
```

---

## PHẦN B: BỘ THUẬT TOÁN GỢI Ý KẾT BẠN TRÊN NEO4J (CYPHER)

### 1. Thuật toán FoAF & Bạn chung (Mutual Friends)
```cypher
MATCH (me:User {id: "usr_101"})-[:FRIENDS_WITH]->(myFriend:User)-[:FRIENDS_WITH]->(suggestedUser:User)
WHERE NOT (me)-[:FRIENDS_WITH]->(suggestedUser) 
  AND NOT (me)-[:BLOCKS]->(suggestedUser)
  AND NOT (me)-[:SENT_REQUEST]->(suggestedUser)
  AND suggestedUser <> me
WITH suggestedUser, count(DISTINCT myFriend) AS mutualFriendsCount, collect(myFriend.fullName) AS mutualFriendNames
RETURN suggestedUser.id AS userId,
       suggestedUser.fullName AS fullName,
       suggestedUser.city AS city,
       mutualFriendsCount,
       mutualFriendNames[0..3] AS sampleMutualFriends
ORDER BY mutualFriendsCount DESC
LIMIT 10;
```

### 2. Gợi ý theo Hội nhóm & CLB sinh hoạt chung
```cypher
MATCH (me:User {id: "usr_101"})-[:MEMBER_OF]->(g:Group)<-[:MEMBER_OF]-(candidate:User)
WHERE NOT (me)-[:FRIENDS_WITH]->(candidate) AND candidate <> me
WITH candidate, count(g) AS commonGroupsCount, collect(g.name) AS commonGroupNames
RETURN candidate.id AS userId,
       candidate.fullName AS fullName,
       candidate.workplace AS workplace,
       commonGroupsCount,
       commonGroupNames
ORDER BY commonGroupsCount DESC
LIMIT 10;
```

### 3. Thuật toán Tổng hợp Đa Tiêu Chí (Hybrid Recommendation)
$$\text{TotalScore} = (MutualFriends \times 3) + (CommonGroups \times 2.5) + (SameCity \times 2) + (SameSchool \times 2)$$
```cypher
MATCH (me:User {id: "usr_101"}), (candidate:User)
WHERE candidate <> me 
  AND NOT (me)-[:FRIENDS_WITH]->(candidate)
  AND NOT (me)-[:BLOCKS]->(candidate)

OPTIONAL MATCH (me)-[:FRIENDS_WITH]->(mutual:User)-[:FRIENDS_WITH]->(candidate)
WITH me, candidate, count(DISTINCT mutual) AS mutualCount

OPTIONAL MATCH (me)-[:MEMBER_OF]->(grp:Group)<-[:MEMBER_OF]-(candidate)
WITH me, candidate, mutualCount, count(DISTINCT grp) AS groupCount

WITH candidate, mutualCount, groupCount,
     (mutualCount * 3.0) AS sMutual,
     (groupCount * 2.5) AS sGroup,
     (CASE WHEN candidate.city = me.city THEN 2.0 ELSE 0.0 END) AS sCity,
     (CASE WHEN candidate.workplace = me.workplace THEN 2.0 ELSE 0.0 END) AS sWork

WITH candidate, mutualCount, groupCount, (sMutual + sGroup + sCity + sWork) AS totalScore
WHERE totalScore > 0
RETURN candidate.id AS userId,
       candidate.fullName AS fullName,
       candidate.city AS city,
       candidate.workplace AS workplace,
       mutualCount,
       groupCount,
       round(totalScore, 1) AS recommendationScore
ORDER BY totalScore DESC
LIMIT 10;
```

### 4. Tìm đường đi ngắn nhất giữa 2 người (Shortest Path - 6 Degrees)
```cypher
MATCH (u1:User {id: "usr_101"}), (u2:User {id: "usr_108"})
MATCH p = shortestPath((u1)-[:FRIENDS_WITH*..6]-(u2))
RETURN [n in nodes(p) | {id: n.id, name: n.fullName}] AS connectionChain,
       length(p) AS degreesOfSeparation;
```
