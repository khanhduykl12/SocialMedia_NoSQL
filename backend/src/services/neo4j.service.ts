import { getNeo4jDriver } from "../config/neo4j.config";

export class Neo4jService {
  public static async runCypher(query: string, params: Record<string, any> = {}): Promise<any[]> {
    const driver = getNeo4jDriver();
    if (!driver) {
      console.warn("⚠️ Neo4j Driver chưa sẵn sàng.");
      return [];
    }

    const session = driver.session();
    try {
      const statements = query
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.startsWith("//"));

      let lastRecords: any[] = [];
      for (const stmt of statements) {
        if (!stmt) continue;
        const result = await session.run(stmt, params);
        lastRecords = result.records.map((record) => {
          const obj: Record<string, any> = {};
          record.keys.forEach((key) => {
            const val = record.get(key);
            // Format integers if returned from neo4j
            if (val && typeof val === "object" && "low" in val && "high" in val) {
              obj[String(key)] = val.low;
            } else {
              obj[String(key)] = val;
            }
          });
          return obj;
        });
      }
      return lastRecords;
    } catch (error) {
      console.error("❌ Lỗi thực thi Cypher:", error);
      return [];
    } finally {
      await session.close();
    }
  }

  // 1. Lấy danh sách bạn bè của 1 user
  public static async getFriends(userId: string) {
    const cypher = `
      MATCH (u:User {id: $userId})-[:FRIENDS_WITH]->(f:User)
      RETURN f.id AS id, f.fullName AS fullName, f.city AS city, f.workplace AS workplace
      ORDER BY f.fullName ASC
    `;
    return this.runCypher(cypher, { userId });
  }

  // 2. Gợi ý bạn bè theo Bạn của bạn (FoAF & Mutual Friends)
  public static async getFoAFRecommendations(userId: string) {
    const cypher = `
      MATCH (me:User {id: $userId})-[:FRIENDS_WITH]->(friend:User)-[:FRIENDS_WITH]->(candidate:User)
      WHERE NOT (me)-[:FRIENDS_WITH]->(candidate)
        AND NOT (me)-[:BLOCKS]->(candidate)
        AND candidate <> me
      WITH candidate, count(DISTINCT friend) AS mutualCount, collect(friend.fullName) AS mutualNames
      RETURN candidate.id AS id, candidate.fullName AS fullName, candidate.city AS city, 
             candidate.workplace AS workplace, mutualCount, mutualNames[0..3] AS sampleMutualFriends
      ORDER BY mutualCount DESC, candidate.fullName ASC
      LIMIT 10
    `;
    return this.runCypher(cypher, { userId });
  }

  // 3. Gợi ý theo Hội nhóm chung (Common Groups)
  public static async getGroupRecommendations(userId: string) {
    const cypher = `
      MATCH (me:User {id: $userId})-[:MEMBER_OF]->(g:Group)<-[:MEMBER_OF]-(candidate:User)
      WHERE NOT (me)-[:FRIENDS_WITH]->(candidate) AND candidate <> me
      WITH candidate, count(g) AS commonGroupsCount, collect(g.name) AS commonGroups
      RETURN candidate.id AS id, candidate.fullName AS fullName, candidate.city AS city,
             candidate.workplace AS workplace, commonGroupsCount, commonGroups
      ORDER BY commonGroupsCount DESC
      LIMIT 10
    `;
    return this.runCypher(cypher, { userId });
  }

  // 4. Gợi ý theo Sở thích (Jaccard Similarity)
  public static async getJaccardRecommendations(userId: string) {
    const cypher = `
      MATCH (me:User {id: $userId})-[:INTERESTED_IN]->(i:Interest)<-[:INTERESTED_IN]-(other:User)
      WHERE NOT (me)-[:FRIENDS_WITH]->(other) AND other <> me
      WITH me, other, count(i) AS commonCount, collect(i.name) AS commonList
      MATCH (me)-[:INTERESTED_IN]->(i1:Interest)
      WITH me, other, commonCount, commonList, count(i1) AS meTotal
      MATCH (other)-[:INTERESTED_IN]->(i2:Interest)
      WITH other, commonCount, commonList, meTotal, count(i2) AS otherTotal
      WITH other, commonList, commonCount, 
           round(toFloat(commonCount) / (meTotal + otherTotal - commonCount) * 100, 1) AS matchScore
      RETURN other.id AS id, other.fullName AS fullName, other.city AS city,
             other.workplace AS workplace, commonList AS commonInterests, matchScore
      ORDER BY matchScore DESC
      LIMIT 10
    `;
    return this.runCypher(cypher, { userId });
  }

  // 5. Gợi ý Tổng hợp Đa Tiêu Chí (Hybrid Recommendation)
  public static async getHybridRecommendations(userId: string) {
    const cypher = `
      MATCH (me:User {id: $userId}), (candidate:User)
      WHERE candidate <> me 
        AND NOT (me)-[:FRIENDS_WITH]->(candidate)
        AND NOT (me)-[:BLOCKS]->(candidate)

      OPTIONAL MATCH (me)-[:FRIENDS_WITH]->(mutual:User)-[:FRIENDS_WITH]->(candidate)
      WITH me, candidate, count(DISTINCT mutual) AS mutualCount, collect(mutual.fullName) AS sampleMutuals

      OPTIONAL MATCH (me)-[:MEMBER_OF]->(grp:Group)<-[:MEMBER_OF]-(candidate)
      WITH me, candidate, mutualCount, sampleMutuals, count(DISTINCT grp) AS groupCount, collect(grp.name) AS sampleGroups

      WITH candidate, mutualCount, sampleMutuals, groupCount, sampleGroups,
           (mutualCount * 3.0) AS sMutual,
           (groupCount * 2.5) AS sGroup,
           (CASE WHEN candidate.city = me.city THEN 2.0 ELSE 0.0 END) AS sCity,
           (CASE WHEN candidate.workplace = me.workplace THEN 2.0 ELSE 0.0 END) AS sWork

      WITH candidate, mutualCount, sampleMutuals, groupCount, sampleGroups, 
           (sMutual + sGroup + sCity + sWork) AS totalScore
      WHERE totalScore > 0
      RETURN candidate.id AS id, candidate.fullName AS fullName, candidate.city AS city,
             candidate.workplace AS workplace, mutualCount, sampleMutuals[0..2] AS sampleMutuals,
             groupCount, sampleGroups[0..2] AS sampleGroups,
             round(totalScore, 1) AS score,
             round(100.0 * totalScore / (totalScore + 5.0), 0) AS matchPercentage
      ORDER BY totalScore DESC
      LIMIT 10
    `;
    return this.runCypher(cypher, { userId });
  }

  // 6. Tìm đường đi ngắn nhất (Shortest Path 6 Degrees)
  public static async getShortestPath(userA: string, userB: string) {
    const cypher = `
      MATCH (u1:User {id: $userA}), (u2:User {id: $userB})
      MATCH p = shortestPath((u1)-[:FRIENDS_WITH*..6]-(u2))
      RETURN [n in nodes(p) | {id: n.id, name: n.fullName}] AS chain,
             length(p) AS degrees
    `;
    return this.runCypher(cypher, { userA, userB });
  }

  // 7. Lấy dữ liệu toàn bộ mạng lưới để vẽ đồ thị Vis-Network
  public static async getNetworkGraphData() {
    const nodesCypher = `
      MATCH (u:User)
      RETURN u.id AS id, u.fullName AS label, 'user' AS group, u.city AS city
    `;
    const edgesCypher = `
      MATCH (u1:User)-[r:FRIENDS_WITH]->(u2:User)
      WHERE u1.id < u2.id
      RETURN u1.id AS from, u2.id AS to, 'FRIENDS_WITH' AS label
    `;
    const groupsCypher = `
      MATCH (g:Group)
      RETURN g.id AS id, g.name AS label, 'community' AS group
    `;
    const groupEdgesCypher = `
      MATCH (u:User)-[:MEMBER_OF]->(g:Group)
      RETURN u.id AS from, g.id AS to, 'MEMBER_OF' AS label
    `;

    const userNodes = await this.runCypher(nodesCypher);
    const groupNodes = await this.runCypher(groupsCypher);
    const friendEdges = await this.runCypher(edgesCypher);
    const memberEdges = await this.runCypher(groupEdgesCypher);

    return {
      nodes: [...userNodes, ...groupNodes],
      edges: [...friendEdges, ...memberEdges]
    };
  }

  // 8. Thống kê Top Influencers (Degree Centrality)
  public static async getTopInfluencers() {
    const cypher = `
      MATCH (u:User)
      OPTIONAL MATCH (u)-[:FRIENDS_WITH]->(f:User)
      WITH u, count(f) AS friendCount
      OPTIONAL MATCH (u)-[:MEMBER_OF]->(g:Group)
      WITH u, friendCount, count(g) AS groupCount
      RETURN u.id AS id, u.fullName AS fullName, friendCount, groupCount,
             (friendCount * 2 + groupCount) AS influenceScore
      ORDER BY influenceScore DESC
      LIMIT 5
    `;
    return this.runCypher(cypher);
  }

  // 9. Thêm bạn bè mới (2 chiều trong Neo4j)
  public static async addFriend(userId: string, targetId: string) {
    const cypher = `
      MATCH (u1:User {id: $userId}), (u2:User {id: $targetId})
      MERGE (u1)-[r1:FRIENDS_WITH]->(u2)
      MERGE (u2)-[r2:FRIENDS_WITH]->(u1)
      RETURN u1.id AS userId, u2.id AS targetId
    `;
    return this.runCypher(cypher, { userId, targetId });
  }

  // 10. Hủy kết bạn (Xóa quan hệ FRIENDS_WITH trong Neo4j)
  public static async removeFriend(userId: string, targetId: string) {
    const cypher = `
      MATCH (u1:User {id: $userId})-[r:FRIENDS_WITH]-(u2:User {id: $targetId})
      DELETE r
      RETURN $userId AS userId, $targetId AS targetId
    `;
    return this.runCypher(cypher, { userId, targetId });
  }
}

