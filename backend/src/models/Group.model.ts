import mongoose, { Schema } from "mongoose";

export interface IGroup {
  _id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  creatorId: string;
  memberCount?: number;
  privacy?: "public" | "private";
  createdAt?: Date;
}

const GroupSchema = new Schema<IGroup>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    coverUrl: { type: String, default: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600" },
    creatorId: { type: String, required: true, ref: "User" },
    memberCount: { type: Number, default: 1 },
    privacy: { type: String, enum: ["public", "private"], default: "public" }
  },
  { timestamps: true }
);

export const GroupModel = mongoose.model<IGroup>("Group", GroupSchema);
