import React, { useState, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { apiService } from "../services/api";

interface Props {
  onClose: () => void;
  friends: any[];
}

export const ChatDrawer: React.FC<Props> = ({ onClose, friends }) => {
  const [selectedFriend, setSelectedFriend] = useState<any>(friends[0] || null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedFriend) return;
    setLoading(true);
    apiService
      .getMessages(selectedFriend.id)
      .then((data) => setMessages(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedFriend]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedFriend) return;
    try {
      const newMsg = await apiService.sendMessage(selectedFriend.id, input.trim());
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-emerald-400">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-bold text-sm text-slate-100">Tin nhắn trực tiếp</h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Friend Selector pills */}
      <div className="p-3 border-b border-slate-800 flex space-x-2 overflow-x-auto scrollbar-none">
        {friends.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFriend(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedFriend?.id === f.id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {f.fullName}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {loading ? (
          <div className="text-center text-xs text-slate-500 py-6">Đang tải tin nhắn...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-xs text-slate-500 py-6">
            Bắt đầu cuộc trò chuyện với {selectedFriend?.fullName || "bạn bè"}!
          </div>
        ) : (
          messages.map((m) => {
            const isMe = m.senderId === "usr_101";
            return (
              <div
                key={m._id}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-slate-800 text-slate-200 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1">
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 flex items-center space-x-2 bg-slate-950/60">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Nhắn tin cho ${selectedFriend?.fullName || "bạn bè"}...`}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 transition shadow-md shadow-emerald-600/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
