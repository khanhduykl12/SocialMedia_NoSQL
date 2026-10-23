import mongoose, { Schema } from "mongoose";

export interface IPost {
  _id: string;
  authorId: string;
  groupId?: string | null;
  content: string;
  mediaUrls?: string[];
  privacy?: "public" | "friends" | "private";
  likes?: string[];
  likeCount?: number;
  comments?: {
    _id?: string;
    authorId: string;
    content: string;
    createdAt?: Date;
  }[];
  commentCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema<IPost>(
  {
    _id: { type: String, required: true },
    authorId: { type: String, required: true, ref: "User", index: true },
    groupId: { type: String, default: null, index: true },
    content: { type: String, required: true },
    mediaUrls: { type: [String], default: [] },
    privacy: { type: String, enum: ["public", "friends", "private"], default: "public" },
    likes: { type: [String], default: [] },
    likeCount: { type: Number, default: 0 },
    comments: [
      {
        authorId: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    commentCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

PostSchema.index({ authorId: 1, createdAt: -1 });

export const PostModel = mongoose.model<IPost>("Post", PostSchema);
