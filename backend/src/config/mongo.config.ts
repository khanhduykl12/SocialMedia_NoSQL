import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/social_network_db";
  try {
    await mongoose.connect(uri);
    console.log("✅ [MongoDB] Kết nối cơ sở dữ liệu thành công!");
  } catch (error) {
    console.error("❌ [MongoDB] Lỗi kết nối:", error);
  }
};
