import mongoose, { Schema } from "mongoose";

export interface IMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  isRead?: boolean;
  createdAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    _id: { type: String, required: true },
    conversationId: { type: String, required: true, index: true },
    senderId: { type: String, required: true, ref: "User", index: true },
    receiverId: { type: String, required: true, ref: "User", index: true },
    text: { type: String, required: true },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

MessageSchema.index({ conversationId: 1, createdAt: -1 });

export const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);
