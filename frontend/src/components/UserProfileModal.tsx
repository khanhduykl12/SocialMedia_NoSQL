import React, { useState, useEffect } from "react";
import { X, MessageCircle, UserPlus, Check, Network, MapPin, Briefcase, GraduationCap, Heart, Sparkles } from "lucide-react";
import { User, Post } from "../types";
import { apiService } from "../services/api";

interface Props {
  userId: string;
  onClose: () => void;
  onStartChat: (user: any) => void;
  onAddFriend: (userId: string) => void;
  isFriend: boolean;
  onViewGraph: () => void;
  isDark: boolean;
}

export const UserProfileModal: React.FC<Props> = ({
  userId,
  onClose,
  onStartChat,
  onAddFriend,
  isFriend,
  onViewGraph,
  isDark
}) => {
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"posts" | "about">("posts");

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    Promise.all([
      apiService.getUserById(userId).catch(() => null),
      apiService.getUserPosts(userId).catch(() => [])
    ])
      .then(([u, posts]) => {
        if (u) setProfileUser(u);
        setUserPosts(posts);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (!profileUser && loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className={`p-8 rounded-3xl ${isDark ? "bg-[#231F1A] text-white" : "bg-white text-black"}`}>
          Đang tải hồ sơ người dùng...
        </div>
      </div>
    );
  }

  const user = profileUser || {
    _id: userId,
    username: userId,
    role: "user",
    profile: {
      fullName: "Sinh viên HUIT",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      bio: "Thành viên cộng đồng mạng xã hội NoSQL HUIT",
      city: "Hồ Chí Minh",
      school: "Đại học Công Thương TP.HCM (HUIT)",
      workplace: "HUIT",
      interests: ["Công nghệ", "AI & Data"]
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      <div
        className={`w-full max-w-2xl rounded-3xl shadow-2xl border overflow-hidden my-auto transition-all ${
          isDark
            ? "bg-[#231F1A] border-[#383127] text-[#FAF7F2]"
            : "bg-white border-[#E5DCD0] text-[#1C1713]"
        }`}
      >
        {/* Cover Photo */}
        <div className="relative h-44 sm:h-52 w-full bg-gradient-to-r from-[#786450] via-[#A89078] to-[#E5B574]">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000"
            alt="Cover"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info Header */}
        <div className="px-6 pb-4 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 pb-4 border-b border-[#E5DCD0]/60 dark:border-[#383127]">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1.5 bg-white dark:bg-[#231F1A] shadow-lg ring-4 ring-[#786450]/20">
                <img
                  src={user.profile.avatarUrl}
                  alt={user.profile.fullName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-[#38A169] rounded-full ring-2 ring-white dark:ring-[#231F1A]" />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  onStartChat({ id: user._id, fullName: user.profile.fullName, avatarUrl: user.profile.avatarUrl });
                  onClose();
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2 rounded-full bg-[#786450] hover:bg-[#655341] text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn tin</span>
              </button>

              <button
                onClick={() => onAddFriend(user._id)}
                className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold transition border cursor-pointer ${
                  isFriend
                    ? "bg-[#786450]/15 text-[#786450] dark:text-[#E5B574] border-[#786450]/30"
                    : "bg-[#FAF7F2] dark:bg-[#1A1714] border-[#E5DCD0] dark:border-[#383127] text-[#1C1713] dark:text-white hover:bg-[#EAE2D5]"
                }`}
              >
                {isFriend ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Đã gửi / Bạn bè</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Kết bạn</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onViewGraph();
                  onClose();
                }}
                className="p-2 rounded-full border border-[#E5DCD0] dark:border-[#383127] hover:bg-[#786450]/10 text-[#786450] dark:text-[#E5B574] transition cursor-pointer"
                title="Xem trên đồ thị Neo4j"
              >
                <Network className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Details */}
          <div className="pt-3">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-['Outfit'] text-[#1C1713] dark:text-[#FAF7F2]">
              {user.profile.fullName}
            </h2>
            <p className="text-xs font-semibold text-[#5A4D3E] dark:text-[#C5B8A8]">
              @{user.username || user._id}
            </p>

            {user.profile.bio && (
              <p className="mt-2 text-sm leading-relaxed text-[#3D3126] dark:text-[#E2DAD0]">
                {user.profile.bio}
              </p>
            )}

            {/* Badges / School / Location */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#5A4D3E] dark:text-[#C5B8A8] font-medium">
              {user.profile.school && (
                <div className="flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#786450]" />
                  <span>{user.profile.school}</span>
                </div>
              )}
              {user.profile.workplace && (
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#786450]" />
                  <span>{user.profile.workplace}</span>
                </div>
              )}
              {user.profile.city && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#786450]" />
                  <span>{user.profile.city}</span>
                </div>
              )}
            </div>

            {/* Interests tags */}
            {user.profile.interests && user.profile.interests.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-[11px] font-bold text-[#5A4D3E] dark:text-[#C5B8A8] mr-1">Sở thích:</span>
                {user.profile.interests.map((int: string, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#786450]/10 text-[#786450] dark:bg-[#E5B574]/15 dark:text-[#E5B574]"
                  >
                    #{int}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sub-tabs: Posts vs About */}
        <div className="flex items-center space-x-6 px-6 border-b border-[#E5DCD0]/60 dark:border-[#383127] text-xs font-bold">
          <button
            onClick={() => setActiveTab("posts")}
            className={`py-2.5 cursor-pointer transition ${
              activeTab === "posts"
                ? "text-[#1C1713] dark:text-[#FAF7F2] border-b-2 border-[#786450]"
                : "text-[#5A4D3E] dark:text-[#C5B8A8]"
            }`}
          >
            Bài viết ({userPosts.length})
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`py-2.5 cursor-pointer transition ${
              activeTab === "about"
                ? "text-[#1C1713] dark:text-[#FAF7F2] border-b-2 border-[#786450]"
                : "text-[#5A4D3E] dark:text-[#C5B8A8]"
            }`}
          >
            Đồ thị quan hệ Neo4j
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-80 overflow-y-auto space-y-4">
          {activeTab === "posts" ? (
            userPosts.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#5A4D3E] dark:text-[#C5B8A8]">
                Người dùng này chưa đăng bài viết nào.
              </div>
            ) : (
              userPosts.map((p) => (
                <div
                  key={p._id}
                  className={`p-4 rounded-2xl border transition ${
                    isDark ? "bg-[#1A1714] border-[#383127]" : "bg-[#FAF7F2] border-[#E5DCD0]"
                  }`}
                >
                  <p className="text-xs leading-relaxed text-[#1C1713] dark:text-[#FAF7F2] whitespace-pre-line">
                    {p.content}
                  </p>
                  {p.mediaUrls && p.mediaUrls.length > 0 && (
                    <div className="mt-2 rounded-xl overflow-hidden max-h-48">
                      <img src={p.mediaUrls[0]} alt="Post media" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="mt-2 text-[11px] font-semibold text-[#5A4D3E] dark:text-[#C5B8A8]">
                    ❤️ {p.likeCount || 0} lượt thích · 💬 {p.commentCount || 0} bình luận
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="space-y-3 text-xs">
              <div className={`p-4 rounded-2xl border ${isDark ? "bg-[#1A1714] border-[#383127]" : "bg-[#FAF7F2] border-[#E5DCD0]"}`}>
                <h4 className="font-bold text-[#786450] dark:text-[#E5B574] mb-1">
                  🌐 Thuật toán đồ thị gợi ý
                </h4>
                <p className="text-[#3D3126] dark:text-[#E2DAD0] leading-relaxed">
                  Người dùng này được tính toán trong đồ thị Neo4j dựa trên quan hệ bạn chung (FoAF), hội nhóm (CLB HUIT) và chỉ số tương đồng Jaccard.
                </p>
                <button
                  onClick={() => {
                    onViewGraph();
                    onClose();
                  }}
                  className="mt-3 px-4 py-1.5 rounded-full bg-[#786450] text-white font-bold text-xs hover:bg-[#655341] transition cursor-pointer"
                >
                  Mở Trình Khám Phá Đồ Thị Neo4j
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
