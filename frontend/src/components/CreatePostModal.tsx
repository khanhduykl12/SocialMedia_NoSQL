import React, { useState } from "react";
import { Image as ImageIcon, Video, Paperclip, Globe, Smile } from "lucide-react";
import { User } from "../types";

interface Props {
  currentUser: User | null;
  onSubmit: (content: string, mediaUrls?: string[]) => void;
  isDark: boolean;
}

export const CreatePostModal: React.FC<Props> = ({ currentUser, onSubmit, isDark }) => {
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const samplePhotos = [
    { name: "Coffee Dev", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800" },
    { name: "Campus HUIT", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800" },
    { name: "Tech Lab", url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const urls = mediaUrl.trim() ? [mediaUrl.trim()] : [];
    onSubmit(content, urls);
    setContent("");
    setMediaUrl("");
    setShowUrlInput(false);
  };

  return (
    <div
      className={`rounded-[26px] p-5 border transition-all shadow-xs ${
        isDark
          ? "bg-[#231F1A] border-[#383127] text-[#FAF7F2]"
          : "bg-white border-[#E5DCD0] text-[#1C1713]"
      }`}
    >
      <form onSubmit={handleSubmit}>
        {/* Top Input Row */}
        <div className="flex items-center space-x-3 pb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-[#786450]/20">
            <img
              src={currentUser?.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt="My Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className={`flex-1 flex items-center px-4 py-3 rounded-full border transition-all ${
              isDark
                ? "bg-[#1A1714] border-[#383127] text-[#FAF7F2]"
                : "bg-[#FAF7F2] border-[#E5DCD0] text-[#1C1713]"
            }`}
          >
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={currentUser ? `${currentUser.profile.fullName.split(" ").slice(-1)[0]} ơi, bạn đang nghĩ gì thế?` : "Bạn đang nghĩ gì thế?"}
              className="bg-transparent text-sm w-full focus:outline-none placeholder:text-[#7C6E5F] dark:placeholder:text-[#A89D8E] font-medium text-[#1C1713] dark:text-[#FAF7F2]"
            />
            <Smile className="w-5 h-5 text-[#7C6E5F] dark:text-[#A89D8E] shrink-0 cursor-pointer hover:text-[#786450]" />
          </div>
        </div>

        {/* Media URL input with quick presets */}
        {showUrlInput && (
          <div className="pb-3 pt-1 space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Dán link hình ảnh (vd: https://images.unsplash.com/...)"
                className={`flex-1 rounded-full px-4 py-2 text-xs focus:outline-none border ${
                  isDark
                    ? "bg-[#1A1714] border-[#383127] text-white"
                    : "bg-[#FAF7F2] border-[#E5DCD0] text-black"
                }`}
              />
            </div>
            {/* Quick Sample Presets */}
            <div className="flex items-center space-x-2 text-[11px] font-semibold text-[#5A4D3E] dark:text-[#C5B8A8]">
              <span>Ảnh mẫu nhanh:</span>
              {samplePhotos.map((p, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setMediaUrl(p.url)}
                  className="px-2.5 py-1 rounded-full bg-[#786450]/15 hover:bg-[#786450]/30 text-[#786450] dark:text-[#E5B574] transition"
                >
                  + {p.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions Row: Photos, Videos, Files, Public, Post */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E5DCD0]/60 dark:border-[#383127]/60">
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Photos */}
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#5A4D3E] dark:text-[#E5B574] hover:bg-[#786450]/10 transition"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photos</span>
            </button>

            {/* Videos */}
            <button
              type="button"
              onClick={() => {
                setContent((prev) => prev ? `${prev} 🎥 Xem demo đồ án NoSQL!` : "🎥 Xem demo đồ án mạng xã hội NoSQL HUIT!");
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#5A4D3E] dark:text-[#E5B574] hover:bg-[#786450]/10 transition"
            >
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Videos</span>
            </button>

            {/* Files */}
            <button
              type="button"
              onClick={() => {
                setContent((prev) => prev ? `${prev} 📄 Đính kèm Báo cáo Đề tài 11.pdf` : "📄 Báo cáo Đề cương 50 trang - Đề tài 11 Mạng xã hội NoSQL");
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#5A4D3E] dark:text-[#E5B574] hover:bg-[#786450]/10 transition"
            >
              <Paperclip className="w-4 h-4" />
              <span className="hidden sm:inline">Files</span>
            </button>

            {/* Public Dropdown */}
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                isDark
                  ? "border-[#383127] text-[#D8CFBF]"
                  : "border-[#E5DCD0] text-[#3D3126] bg-[#FAF7F2]"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public ▾</span>
            </div>
          </div>

          {/* Signature Olive Post Button */}
          <button
            type="submit"
            disabled={!content.trim()}
            className="px-6 py-2 rounded-full bg-[#786450] hover:bg-[#655341] text-white text-xs font-bold transition shadow-xs disabled:opacity-40 cursor-pointer"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};
