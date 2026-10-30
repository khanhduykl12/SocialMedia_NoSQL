import React, { useState } from "react";
import { 
  Heart, 
  MessageSquare, 
  BarChart2, 
  Bookmark, 
  Share2, 
  MoreHorizontal,
  Send
} from "lucide-react";
import { Post } from "../types";
import { apiService } from "../services/api";

interface Props {
  post: Post;
  currentUserId?: string;
  currentUserRole?: string;
  onLike: (id: string) => void;
  onDeletePost?: (id: string) => void;
  onAuthorClick?: (userId: string) => void;
  isDark: boolean;
}

export const PostCard: React.FC<Props> = ({
  post,
  currentUserId = "usr_101",
  currentUserRole = "user",
  onLike,
  onDeletePost,
  onAuthorClick,
  isDark
}) => {
  const isLiked = post.likes?.includes(currentUserId);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [localComments, setLocalComments] = useState(post.comments || []);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const text = commentInput.trim();
    setCommentInput("");
    const newCmt = {
      authorId: currentUserId,
      content: text,
      createdAt: new Date().toISOString()
    };
    setLocalComments((prev) => [...prev, newCmt]);
    try {
      await apiService.addComment(post._id, text);
    } catch (err) {
      console.error("Lỗi gửi bình luận", err);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Multiple photos formatting
  const images = post.mediaUrls && post.mediaUrls.length > 0 ? post.mediaUrls : [];

  return (
    <article
      className={`rounded-[26px] p-5 border transition-all shadow-xs ${
        isDark
          ? "bg-[#231F1A] border-[#383127] text-[#FAF7F2]"
          : "bg-white border-[#E5DCD0] text-[#1C1713]"
      }`}
    >
      {/* 1. Header: Avatar, Name, Handle, Time, Menu */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center space-x-3">
          <div
            onClick={() => onAuthorClick?.(post.authorId)}
            className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-[#786450]/20 cursor-pointer hover:ring-[#786450] transition"
            title="Xem trang cá nhân"
          >
            <img
              src={post.authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt={post.authorName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h4
                onClick={() => onAuthorClick?.(post.authorId)}
                className="font-extrabold text-sm tracking-tight text-[#1C1713] dark:text-[#FAF7F2] hover:underline cursor-pointer"
                title="Xem trang cá nhân"
              >
                {post.authorName || "Sinh viên HUIT"}
              </h4>
              {post.authorId === "usr_101" && (
                <span className="text-[10px] px-1.5 py-0.2 rounded font-extrabold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-[#5A4D3E] dark:text-[#C5B8A8] font-semibold">
              @{post.authorId || "huit_user"} • 4 giờ trước
            </p>
          </div>
        </div>

        {/* More Actions Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-[#786450]/10 text-[#5A4D3E] dark:text-[#C5B8A8] transition cursor-pointer"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showMenu && (
            <div 
              className={`absolute right-0 top-10 w-52 rounded-2xl border shadow-xl z-20 py-1.5 overflow-hidden text-xs font-semibold ${
                isDark ? "bg-[#1A1714] border-[#383127] text-white" : "bg-white border-[#E5DCD0] text-[#1C1713]"
              }`}
            >
              {currentUserRole === "admin" ? (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDeletePost?.(post._id);
                  }}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-rose-500/10 text-rose-500 flex items-center space-x-2 cursor-pointer"
                >
                  <span>🗑️ Xóa bài viết (Quyền Admin)</span>
                </button>
              ) : post.authorId === currentUserId ? (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDeletePost?.(post._id);
                  }}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-rose-500/10 text-rose-500 flex items-center space-x-2 cursor-pointer"
                >
                  <span>🗑️ Xóa bài viết của bạn</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    alert("Đã gửi báo cáo bài viết tới Quản trị viên.");
                  }}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-[#786450]/10 text-[#5A4D3E] dark:text-[#C5B8A8] cursor-pointer"
                >
                  🚩 Báo cáo bài viết
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. Text Content */}
      <div className="pb-3 text-sm leading-relaxed text-[#1C1713] dark:text-[#F0ECE1] font-normal">
        <p className="whitespace-pre-line">{post.content}</p>
      </div>

      {/* 3. Multi-Image Grid */}
      {images.length > 0 && (
        <div className="pb-4">
          {images.length === 1 ? (
            <div className="w-full rounded-2xl overflow-hidden max-h-[400px] shadow-xs">
              <img
                src={images[0]}
                alt="Post photo"
                className="w-full h-full object-cover"
              />
            </div>
          ) : images.length === 2 ? (
            <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
              {images.map((url, i) => (
                <div key={i} className="h-48 rounded-2xl overflow-hidden">
                  <img
                    src={url}
                    alt={`Photo ${i}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden">
              {images.slice(0, 3).map((url, i) => (
                <div key={i} className="h-44 rounded-2xl overflow-hidden">
                  <img
                    src={url}
                    alt={`Photo ${i}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Footer Engagement Bar */}
      <div className="flex items-center justify-between pt-1 text-[#5A4D3E] dark:text-[#C5B8A8] text-xs font-bold select-none border-t border-[#E5DCD0]/60 dark:border-[#383127]/60">
        <div className="flex items-center space-x-5">
          {/* Heart / Like */}
          <button
            onClick={() => onLike(post._id)}
            className={`flex items-center space-x-1.5 transition cursor-pointer ${
              isLiked
                ? "text-[#E53E3E] font-bold"
                : "hover:text-[#E53E3E]"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? "fill-[#E53E3E] text-[#E53E3E]" : "stroke-[2]"}`}
            />
            <span>{post.likeCount || 0}</span>
          </button>

          {/* Comments */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1.5 hover:text-[#786450] transition cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 stroke-[2]" />
            <span>{localComments.length || post.commentCount || 0}</span>
          </button>

          {/* Graph Metric */}
          <div className="flex items-center space-x-1.5 hover:text-[#786450] transition cursor-default">
            <BarChart2 className="w-4 h-4 stroke-[2]" />
            <span>{(post.likeCount || 1) * 14}k</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Bookmark */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-full hover:bg-[#786450]/10 transition cursor-pointer ${
              isBookmarked ? "text-[#786450]" : ""
            }`}
            title="Lưu bài viết"
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? "fill-[#786450]" : "stroke-[2]"}`}
            />
          </button>

          {/* Share */}
          <button 
            onClick={handleShare}
            className="p-1.5 rounded-full hover:bg-[#786450]/10 transition cursor-pointer relative"
            title="Chia sẻ"
          >
            <Share2 className="w-4 h-4 stroke-[2]" />
            {copied && (
              <span className="absolute -top-7 right-0 bg-[#231F1A] text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-md">
                Đã sao chép!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 5. Interactive Comment Drawer */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-[#E5DCD0] dark:border-[#383127] space-y-3">
          {localComments.map((c, i) => (
            <div key={i} className="flex items-start space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-[#786450]/15 text-[#786450] font-bold text-[10px] flex items-center justify-center shrink-0">
                {c.authorId ? c.authorId.charAt(0).toUpperCase() : "U"}
              </div>
              <div
                className={`p-2.5 rounded-2xl text-xs max-w-[85%] ${
                  isDark ? "bg-[#1A1714] text-[#FAF7F2]" : "bg-[#FAF7F2] text-[#1C1713]"
                }`}
              >
                <span className="font-bold text-[#786450] dark:text-[#E5B574] mr-1.5">
                  {c.authorId}:
                </span>
                <span>{c.content}</span>
              </div>
            </div>
          ))}

          <form onSubmit={handleAddComment} className="flex items-center space-x-2 pt-1">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Viết phản hồi..."
              className={`flex-1 rounded-full px-4 py-2 text-xs focus:outline-none border ${
                isDark
                  ? "bg-[#1A1714] border-[#383127] text-white placeholder-[#8C7D6D]"
                  : "bg-[#FAF7F2] border-[#E5DCD0] text-[#1C1713] placeholder-[#7C6E5F]"
              }`}
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="p-2 rounded-full bg-[#786450] text-white disabled:opacity-40 hover:bg-[#655341] transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
