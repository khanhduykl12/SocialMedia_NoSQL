import React, { useState, useEffect, useRef } from "react";
import { Search, Send, ThumbsUp, Phone, Video, Info, User as UserIcon } from "lucide-react";
import { apiService } from "../services/api";

interface Props {
  friends: any[];
  currentUser: any;
  onViewProfile: (userId: string) => void;
  initialChatFriend?: any;
  isDark: boolean;
}

export const MessagesPage: React.FC<Props> = ({
  friends,
  currentUser,
  onViewProfile,
  initialChatFriend,
  isDark
}) => {
  const [selectedFriend, setSelectedFriend] = useState<any>(initialChatFriend || friends[0] || null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedFriend && friends.length > 0) {
      setSelectedFriend(friends[0]);
    }
  }, [friends]);

  const fetchMessages = () => {
    if (!selectedFriend) return;
    setLoading(true);
    apiService
      .getMessages(selectedFriend.id)
      .then((data) => setMessages(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedFriend]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !selectedFriend) return;
    const textToSend = input.trim();
    setInput("");

    // Optimistic UI update
    const tempMsg = {
      _id: "temp_" + Date.now(),
      senderId: currentUser?._id || "usr_101",
      receiverId: selectedFriend.id,
      text: textToSend,
      createdAt: new Date().toISOString()
    };
    setMessages((prev) => [...prev, tempMsg]);

    try {
      const realMsg = await apiService.sendMessage(selectedFriend.id, textToSend);
      setMessages((prev) => prev.map((m) => (m._id === tempMsg._id ? realMsg : m)));
    } catch (error) {
      console.error("Lỗi gửi tin nhắn", error);
    }
  };

  const handleSendLike = async () => {
    if (!selectedFriend) return;
    const tempMsg = {
      _id: "temp_" + Date.now(),
      senderId: currentUser?._id || "usr_101",
      receiverId: selectedFriend.id,
      text: "👍",
      createdAt: new Date().toISOString()
    };
    setMessages((prev) => [...prev, tempMsg]);

    try {
      const realMsg = await apiService.sendMessage(selectedFriend.id, "👍");
      setMessages((prev) => prev.map((m) => (m._id === tempMsg._id ? realMsg : m)));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredFriends = friends.filter((f) =>
    (f.fullName || "").toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-5 px-3 h-[calc(100vh-5rem)]">
      <div
        className={`w-full h-full rounded-[28px] border shadow-sm overflow-hidden flex flex-col md:flex-row transition-all ${
          isDark
            ? "bg-[#231F1A] border-[#383127] text-[#FAF7F2]"
            : "bg-white border-[#E5DCD0] text-[#1C1713]"
        }`}
      >
        {/* LEFT COLUMN: CONVERSATION LIST */}
        <div className="w-full md:w-80 border-r border-[#E5DCD0] dark:border-[#383127] flex flex-col h-full shrink-0">
          {/* Header */}
          <div className="p-4 border-b border-[#E5DCD0]/60 dark:border-[#383127]">
            <h2 className="text-xl font-extrabold tracking-tight font-['Outfit']">
              Tin nhắn
            </h2>
            <div className="mt-3 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#7C6E5F]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Tìm đoạn chat..."
                className={`w-full pl-9 pr-4 py-2 rounded-full text-xs focus:outline-none border ${
                  isDark
                    ? "bg-[#1A1714] border-[#383127] text-white placeholder-[#8C7D6D]"
                    : "bg-[#FAF7F2] border-[#E5DCD0] text-[#1C1713] placeholder-[#7C6E5F]"
                }`}
              />
            </div>
          </div>

          {/* Friends Conversations List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredFriends.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#5A4D3E] dark:text-[#C5B8A8]">
                Không tìm thấy liên hệ nào.
              </div>
            ) : (
              filteredFriends.map((f) => {
                const isSelected = selectedFriend?.id === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFriend(f)}
                    className={`flex items-center space-x-3 p-3 rounded-2xl cursor-pointer transition ${
                      isSelected
                        ? "bg-[#786450]/15 dark:bg-[#786450]/25"
                        : isDark
                        ? "hover:bg-[#1A1714]"
                        : "hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#786450] to-[#E5B574]">
                        <img
                          src={f.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                          alt={f.fullName}
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#38A169] rounded-full ring-2 ring-white dark:ring-[#231F1A]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs truncate text-[#1C1713] dark:text-[#FAF7F2]">
                          {f.fullName}
                        </h4>
                        <span className="text-[10px] text-[#7C6E5F]">Vừa xong</span>
                      </div>
                      <p className="text-[11px] text-[#5A4D3E] dark:text-[#C5B8A8] truncate mt-0.5 font-medium">
                        {isSelected && messages.length > 0
                          ? messages[messages.length - 1].text
                          : "Đang hoạt động"}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE CHAT CONVERSATION */}
        {selectedFriend ? (
          <div className="flex-1 flex flex-col h-full min-w-0">
            {/* Chat Header */}
            <div className="p-3.5 px-5 border-b border-[#E5DCD0] dark:border-[#383127] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  onClick={() => onViewProfile(selectedFriend.id)}
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer ring-1 ring-[#786450]/30 hover:ring-[#786450] transition shrink-0"
                >
                  <img
                    src={selectedFriend.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                    alt={selectedFriend.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3
                    onClick={() => onViewProfile(selectedFriend.id)}
                    className="font-extrabold text-sm text-[#1C1713] dark:text-[#FAF7F2] hover:underline cursor-pointer tracking-tight"
                  >
                    {selectedFriend.fullName}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-[11px] text-[#38A169] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38A169]" />
                    <span>Đang hoạt động</span>
                  </div>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center space-x-1 text-[#786450] dark:text-[#E5B574]">
                <button
                  onClick={() => onViewProfile(selectedFriend.id)}
                  className="p-2 rounded-full hover:bg-[#786450]/10 transition cursor-pointer"
                  title="Xem trang cá nhân"
                >
                  <UserIcon className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-[#786450]/10 transition cursor-pointer"
                  title="Gọi thoại"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-[#786450]/10 transition cursor-pointer"
                  title="Gọi video"
                >
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Stream */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3">
              {loading && messages.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#7C6E5F]">Đang tải tin nhắn...</div>
              ) : messages.length === 0 ? (
                <div className="py-16 text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#786450]/15 text-[#786450] dark:text-[#E5B574] font-bold text-2xl flex items-center justify-center mx-auto">
                    {selectedFriend.fullName ? selectedFriend.fullName.charAt(0) : "U"}
                  </div>
                  <h4 className="font-extrabold text-sm text-[#1C1713] dark:text-[#FAF7F2]">
                    {selectedFriend.fullName}
                  </h4>
                  <p className="text-xs text-[#5A4D3E] dark:text-[#C5B8A8]">
                    Các bạn đã kết nối trên mạng xã hội NoSQL HUIT. Hãy gửi lời chào nhé!
                  </p>
                </div>
              ) : (
                messages.map((m, i) => {
                  const isMe = m.senderId === (currentUser?._id || "usr_101");
                  return (
                    <div
                      key={m._id || i}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                          isMe
                            ? "bg-[#786450] text-white rounded-br-xs font-medium"
                            : isDark
                            ? "bg-[#1A1714] text-[#FAF7F2] rounded-bl-xs border border-[#383127]"
                            : "bg-[#FAF7F2] text-[#1C1713] rounded-bl-xs border border-[#E5DCD0]"
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[10px] text-[#7C6E5F] mt-1 px-1">
                        {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Vừa xong"}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 px-5 border-t border-[#E5DCD0] dark:border-[#383127] flex items-center space-x-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Nhắn tin cho ${selectedFriend.fullName}...`}
                className={`flex-1 rounded-full px-4 py-2.5 text-xs focus:outline-none border ${
                  isDark
                    ? "bg-[#1A1714] border-[#383127] text-white placeholder-[#8C7D6D]"
                    : "bg-[#FAF7F2] border-[#E5DCD0] text-[#1C1713] placeholder-[#7C6E5F]"
                }`}
              />

              {input.trim() ? (
                <button
                  type="submit"
                  className="p-2.5 rounded-full bg-[#786450] text-white hover:bg-[#655341] transition cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendLike}
                  className="p-2.5 text-[#786450] dark:text-[#E5B574] hover:bg-[#786450]/10 rounded-full transition cursor-pointer"
                  title="Gửi 👍"
                >
                  <ThumbsUp className="w-5 h-5" />
                </button>
              )}
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-xs text-[#7C6E5F]">
            Chọn một đoạn chat để bắt đầu trò chuyện.
          </div>
        )}
      </div>
    </div>
  );
};
