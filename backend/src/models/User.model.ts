import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  profile: {
    fullName: string;
    avatarUrl: string;
    bio: string;
    city: string;
    school: string;
    workplace: string;
    interests: string[];
  };
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profile: {
      fullName: { type: String, required: true },
      avatarUrl: { type: String, default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" },
      bio: { type: String, default: "" },
      city: { type: String, default: "Hồ Chí Minh" },
      school: { type: String, default: "HUIT" },
      workplace: { type: String, default: "HUIT" },
      interests: { type: [String], default: [] }
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
