import mongoose, { Schema } from "mongoose";

export interface INotification {
  _id: string;
  recipientId: string;
  senderId: string;
  type: "FRIEND_REQUEST" | "FRIEND_ACCEPT" | "POST_LIKED" | "POST_COMMENT" | "GROUP_INVITE";
  message: string;
  link?: string;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    _id: { type: String, required: true },
    recipientId: { type: String, required: true, ref: "User", index: true },
    senderId: { type: String, required: true, ref: "User" },
    type: {
      type: String,
      enum: ["FRIEND_REQUEST", "FRIEND_ACCEPT", "POST_LIKED", "POST_COMMENT", "GROUP_INVITE"],
      default: "FRIEND_REQUEST"
    },
    message: { type: String, required: true },
    link: { type: String, default: "/friends" },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

NotificationSchema.index({ recipientId: 1, isRead: 1, createdAt: -1 });

export const NotificationModel = mongoose.model<INotification>("Notification", NotificationSchema);
