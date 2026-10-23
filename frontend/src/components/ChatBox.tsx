import React, { useState, useEffect } from "react";
import { X, Send, Phone, Video, ThumbsUp } from "lucide-react";
import { apiService } from "../services/api";

interface Props {
  friend: any;
  onClose: () => void;
  isDark: boolean;
}

export const ChatBox: React.FC<Props> = ({ friend, onClose, isDark }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!friend) return;
    setLoading(true);
    apiService
      .getMessages(friend.id)
      .then((data) => setMessages(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [friend]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !friend) return;
    try {
      const newMsg = await apiService.sendMessage(friend.id, input.trim());
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendLike = async () => {
    try {
      const newMsg = await apiService.sendMessage(friend.id, "👍");
      setMessages((prev) => [...prev, newMsg]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`fixed bottom-0 right-10 w-80 h-96 rounded-t-3xl shadow-2xl border flex flex-col z-50 transition-all ${
        isDark ? "bg-[#25201A] border-[#383127] text-[#F3EFEA]" : "bg-white border-[#EDE5DA] text-[#2C241B]"
      }`}
    >
      {/* Header */}
      <div className={`p-3 px-4 border-b flex items-center justify-between ${isDark ? "border-[#383127]" : "border-[#EDE5DA]"}`}>
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#82715C]/15 text-[#82715C] font-bold text-xs flex items-center justify-center">
              {friend.fullName ? friend.fullName.charAt(0) : "U"}
            </div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#48BB78] rounded-full ring-2 ring-white dark:ring-[#25201A]" />
          </div>
          <div>
            <h4 className="font-bold text-xs truncate max-w-[130px]">{friend.fullName}</h4>
            <span className="text-[10px] text-[#48BB78] block leading-tight font-medium">Đang hoạt động</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-[#82715C] dark:text-[#D4B996]">
          <button className="p-1 rounded-full hover:bg-[#82715C]/10">
            <Phone className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded-full hover:bg-[#82715C]/10">
            <Video className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#82715C]/10 text-[#9A8D7E]">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {loading ? (
          <div className="text-center text-xs text-[#9A8D7E] py-4">Đang tải tin nhắn...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-xs text-[#9A8D7E] py-8">
            Hãy gửi lời chào đến {friend.fullName}!
          </div>
        ) : (
          messages.map((m) => {
            const isMe = m.senderId === "usr_101";
            return (
              <div key={m._id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[78%] px-3.5 py-1.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? "bg-[#82715C] text-white rounded-br-none"
                      : isDark
                      ? "bg-[#1E1B17] text-[#F3EFEA] rounded-bl-none"
                      : "bg-[#FAF7F2] text-[#2C241B] rounded-bl-none border border-[#EDE5DA]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input row */}
      <form onSubmit={handleSend} className={`p-2.5 border-t flex items-center space-x-2 ${isDark ? "border-[#383127]" : "border-[#EDE5DA]"}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhắn tin..."
          className={`flex-1 rounded-full px-3.5 py-1.5 text-xs focus:outline-none border ${
            isDark
              ? "bg-[#1E1B17] border-[#383127] text-white"
              : "bg-[#FAF7F2] border-[#EDE5DA] text-black"
          }`}
        />
        {input.trim() ? (
          <button type="submit" className="p-1.5 text-[#82715C] dark:text-[#D4B996]">
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <button type="button" onClick={handleSendLike} className="p-1.5 text-[#82715C] dark:text-[#D4B996]">
            <ThumbsUp className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
};
