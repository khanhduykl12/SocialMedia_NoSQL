import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/mongo.config";
import { initNeo4j } from "./config/neo4j.config";
import apiRoutes from "./routes/api.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.json({
    project: "Social Network & Friend Recommendation API",
    course: "Dữ liệu NoSQL - HUIT",
    status: "Running",
    endpoints: "/api"
  });
});

// Khởi chạy server và kết nối Database
const startServer = async () => {
  await connectMongoDB();
  initNeo4j();

  app.listen(PORT, () => {
    console.log(`🚀 [Server] Backend đang chạy tại http://localhost:${PORT}`);
  });
};

startServer();
