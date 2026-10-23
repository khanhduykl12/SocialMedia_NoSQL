import neo4j, { Driver } from "neo4j-driver";

let driver: Driver | null = null;

export const initNeo4j = () => {
  const uri = process.env.NEO4J_URI || "bolt://127.0.0.1:7687";
  const user = process.env.NEO4J_USER || "neo4j";
  const password = process.env.NEO4J_PASSWORD || "password123";

  try {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    console.log("✅ [Neo4j] Khởi tạo Neo4j Driver thành công!");
  } catch (error) {
    console.error("❌ [Neo4j] Lỗi khởi tạo driver:", error);
  }
};

export const getNeo4jDriver = (): Driver | null => {
  if (!driver) {
    initNeo4j();
  }
  return driver;
};

export const closeNeo4j = async () => {
  if (driver) {
    await driver.close();
  }
};
