import mongoose, { Schema } from "mongoose";

export interface IReel {
  _id: string;
  authorId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  musicTitle?: string;
  tags?: string[];
  likes?: string[];
  likeCount?: number;
  comments?: {
    authorId: string;
    content: string;
    createdAt?: Date;
  }[];
  commentCount?: number;
  viewsCount?: number;
  createdAt?: Date;
}

const ReelSchema = new Schema<IReel>(
  {
    _id: { type: String, required: true },
    authorId: { type: String, required: true, ref: "User", index: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: "" },
    caption: { type: String, default: "" },
    musicTitle: { type: String, default: "Original Audio" },
    tags: { type: [String], default: [] },
    likes: { type: [String], default: [] },
    likeCount: { type: Number, default: 0 },
    comments: [
      {
        authorId: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    commentCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  }
);

ReelSchema.index({ tags: 1, likeCount: -1 });

export const ReelModel = mongoose.model<IReel>("Reel", ReelSchema);
