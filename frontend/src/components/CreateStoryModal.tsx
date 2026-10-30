import React, { useState } from "react";
import { X, Image as ImageIcon, Sparkles, Clock } from "lucide-react";
import { User } from "../types";

interface Props {
  currentUser: User | null;
  onClose: () => void;
  onSubmit: (mediaUrl: string, caption?: string) => Promise<void>;
  isDark: boolean;
}

export const CreateStoryModal: React.FC<Props> = ({
  currentUser,
  onClose,
  onSubmit,
  isDark
}) => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sampleImages = [
    { name: "Khuôn viên HUIT", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800" },
    { name: "Coffee Sáng", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800" },
    { name: "Lập trình NoSQL", url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800" },
    { name: "Hoàng hôn Sài Gòn", url: "https://images.unsplash.com/photo-1508873696983-2df570464756?w=800" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaUrl.trim()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(mediaUrl.trim(), caption.trim());
      onClose();
    } catch (error) {
      console.error("Lỗi tạo Story", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          isDark
            ? "bg-[#1E1B17] border-[#383127] text-[#FAF7F2]"
            : "bg-white border-[#E5DCD0] text-[#1C1713]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-inherit">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-pink-500 flex items-center justify-center text-white">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Tạo tin mới 24h</h3>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                Tin sẽ tự động biến mất sau 24 giờ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Preview */}
          <div className="w-full h-56 rounded-2xl bg-black/5 dark:bg-black/40 border border-dashed border-inherit overflow-hidden flex items-center justify-center relative">
            {mediaUrl ? (
              <>
                <img
                  src={mediaUrl}
                  alt="Story Preview"
                  className="w-full h-full object-cover"
                />
                {caption && (
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs p-2 rounded-xl">
                    {caption}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-4 text-[#7C6E5F] dark:text-[#A89D8E]">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-semibold">Dán URL ảnh hoặc chọn ảnh mẫu bên dưới</p>
              </div>
            )}
          </div>

          {/* Quick presets */}
          <div>
            <label className="text-xs font-bold block mb-1.5">Ảnh mẫu nhanh:</label>
            <div className="flex flex-wrap gap-1.5">
              {sampleImages.map((img) => (
                <button
                  type="button"
                  key={img.name}
                  onClick={() => setMediaUrl(img.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition cursor-pointer ${
                    mediaUrl === img.url
                      ? "bg-[#786450] text-white border-[#786450]"
                      : "bg-black/5 dark:bg-white/5 border-inherit hover:border-[#786450]"
                  }`}
                >
                  {img.name}
                </button>
              ))}
            </div>
          </div>

          {/* Media URL Input */}
          <div>
            <label className="text-xs font-bold block mb-1">Đường dẫn ảnh (Media URL):</label>
            <input
              type="text"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              required
              className={`w-full px-3.5 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#786450] ${
                isDark
                  ? "bg-[#14120F] border-[#383127] text-white"
                  : "bg-[#FAF7F2] border-[#E5DCD0] text-black"
              }`}
            />
          </div>

          {/* Caption Input */}
          <div>
            <label className="text-xs font-bold block mb-1">Dòng trạng thái (Caption):</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Chia sẻ khoảnh khắc trong 24 giờ..."
              className={`w-full px-3.5 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#786450] ${
                isDark
                  ? "bg-[#14120F] border-[#383127] text-white"
                  : "bg-[#FAF7F2] border-[#E5DCD0] text-black"
              }`}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!mediaUrl.trim() || isSubmitting}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm hover:opacity-95 transition disabled:opacity-50 cursor-pointer flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Đang chia sẻ..." : "Chia sẻ lên Tin 24h"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
