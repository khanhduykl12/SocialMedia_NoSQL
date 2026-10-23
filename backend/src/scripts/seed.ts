import dotenv from "dotenv";
import { connectMongoDB } from "../config/mongo.config";
import { initNeo4j, closeNeo4j } from "../config/neo4j.config";
import { seedDatabase } from "../services/seed.service";

dotenv.config();

const run = async () => {
  await connectMongoDB();
  initNeo4j();
  await seedDatabase();
  await closeNeo4j();
  process.exit(0);
};

run();
