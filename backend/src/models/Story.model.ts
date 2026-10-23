import mongoose, { Schema } from "mongoose";

export interface IStory {
  _id: string;
  authorId: string;
  mediaType?: "image" | "video";
  mediaUrl: string;
  caption?: string;
  viewers?: { userId: string; viewedAt?: Date }[];
  viewCount?: number;
  createdAt?: Date;
  expiresAt: Date;
}

const StorySchema = new Schema<IStory>(
  {
    _id: { type: String, required: true },
    authorId: { type: String, required: true, ref: "User", index: true },
    mediaType: { type: String, enum: ["image", "video"], default: "image" },
    mediaUrl: { type: String, required: true },
    caption: { type: String, default: "" },
    viewers: [
      {
        userId: { type: String, required: true },
        viewedAt: { type: Date, default: Date.now }
      }
    ],
    viewCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true, index: { expires: 0 } }
  }
);

export const StoryModel = mongoose.model<IStory>("Story", StorySchema);
