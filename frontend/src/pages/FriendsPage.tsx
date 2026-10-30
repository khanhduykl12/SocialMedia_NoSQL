import React from "react";
import { Users, UserPlus, Check, Sparkles, MessageCircle, UserX, Heart } from "lucide-react";
import { FriendRecommendation } from "../types";

interface Props {
  recommendations: FriendRecommendation[];
  friends: any[];
  recMode: string;
  setRecMode: (mode: string) => void;
  isLoading: boolean;
  onAddFriend: (id: string) => void;
  onRemoveFriend?: (id: string) => void;
  onStartChat?: (friend: any) => void;
  addedFriends: string[];
  onViewProfile?: (userId: string) => void;
  isDark: boolean;
}

export const FriendsPage: React.FC<Props> = ({
  recommendations,
  friends,
  recMode,
  setRecMode,
  isLoading,
  onAddFriend,
  onRemoveFriend,
  onStartChat,
  addedFriends,
  onViewProfile,
  isDark
}) => {
  const modes = [
    { id: "hybrid", label: "Phù hợp nhất" },
    { id: "foaf", label: "Có bạn chung" },
    { id: "group", label: "Cùng câu lạc bộ" },
    { id: "jaccard", label: "Cùng sở thích" }
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto py-5 px-3 space-y-6 ${isDark ? "text-[#F3EFEA]" : "text-[#2C241B]"}`}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight font-['Outfit']">
          Gợi ý kết bạn
        </h2>
        <p className="text-xs mt-1 text-[#9A8D7E]">
          Những người bạn có thể biết dựa trên bạn chung, câu lạc bộ sinh viên và sở thích tương đồng.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#EDE5DA] dark:border-[#383127] pb-3 text-xs overflow-x-auto">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setRecMode(m.id)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
              recMode === m.id
                ? "bg-[#82715C] text-white shadow-xs"
                : isDark
                ? "bg-[#25201A] text-[#D8CFBF] hover:bg-[#383127]"
                : "bg-white text-[#6A5E51] hover:bg-[#EFE7DC] border border-[#EDE5DA]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Grid of Suggestions */}
      {isLoading ? (
        <div className="py-12 text-center text-xs text-[#9A8D7E] flex flex-col items-center justify-center space-y-2">
          <div className="w-6 h-6 border-2 border-[#82715C] border-t-transparent rounded-full animate-spin" />
          <span>Đang tìm bạn bè phù hợp...</span>
        </div>
      ) : recommendations.length === 0 ? (
        <div className={`py-8 text-center text-xs rounded-3xl border ${isDark ? "bg-[#25201A] border-[#383127]" : "bg-white border-[#EDE5DA]"}`}>
          Không có gợi ý nào phù hợp hoặc bạn đã kết bạn với tất cả ứng viên trong nhóm này!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => {
            const isAdded = addedFriends.includes(rec.id);
            const match = rec.matchPercentage || (rec.matchScore ? Math.round(rec.matchScore) : 85);

            return (
              <div
                key={rec.id}
                className={`rounded-[26px] overflow-hidden border flex flex-col justify-between transition-all shadow-xs ${
                  isDark ? "bg-[#25201A] border-[#383127]" : "bg-white border-[#EDE5DA]"
                }`}
              >
                {/* Photo Header */}
                <div
                  onClick={() => onViewProfile?.(rec.id)}
                  className="w-full h-44 overflow-hidden relative cursor-pointer group"
                  title="Xem trang cá nhân"
                >
                  <img
                    src={rec.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                    alt={rec.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold shadow-xs">
                    {match}% Match
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div
                    onClick={() => onViewProfile?.(rec.id)}
                    className="cursor-pointer"
                    title="Xem trang cá nhân"
                  >
                    <h4 className="font-bold text-sm truncate text-[#2C241B] dark:text-[#F3EFEA] hover:underline">
                      {rec.fullName}
                    </h4>

                    {/* Mutual Friends Highlight */}
                    {rec.mutualCount && rec.mutualCount > 0 ? (
                      <p className="text-xs mt-0.5 truncate text-[#9A8D7E] font-medium">
                        👥 {rec.mutualCount} bạn chung {rec.sampleMutuals?.length ? `(${rec.sampleMutuals.slice(0, 2).join(", ")})` : ""}
                      </p>
                    ) : (
                      <p className="text-xs mt-0.5 truncate text-[#9A8D7E]">
                        📍 {rec.workplace || "Khoa CNTT - HUIT"}
                      </p>
                    )}

                    {/* Common Groups Highlight */}
                    {rec.commonGroups && rec.commonGroups.length > 0 && (
                      <p className="text-[10px] text-[#82715C] dark:text-[#D4B996] font-semibold mt-1 truncate">
                        🏫 CLB: {rec.commonGroups.join(", ")}
                      </p>
                    )}

                    {/* Common Interests / Jaccard Highlight */}
                    {rec.commonInterests && rec.commonInterests.length > 0 && (
                      <p className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold mt-1 truncate">
                        💡 Cùng gu: {rec.commonInterests.join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 mt-4">
                    <button
                      onClick={() => onAddFriend(rec.id)}
                      disabled={isAdded}
                      className={`w-full py-2 rounded-full text-xs font-semibold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                        isAdded
                          ? "bg-[#82715C]/20 text-[#82715C] dark:text-[#D4B996]"
                          : "bg-[#82715C] hover:bg-[#6E5F4C] text-white shadow-xs"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã gửi lời mời</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Kết bạn</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Friends list */}
      <div className="pt-6 border-t border-[#EDE5DA] dark:border-[#383127]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base font-['Outfit']">Bạn bè ({friends.length})</h3>
          <span className="text-[11px] text-[#9A8D7E]">Những người bạn đã kết nối</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {friends.map((f) => (
            <div
              key={f.id}
              className={`rounded-2xl border p-3 flex items-center justify-between transition hover:shadow-xs ${
                isDark ? "bg-[#25201A] border-[#383127] hover:bg-[#322B23]" : "bg-white border-[#EDE5DA] hover:bg-[#FAF7F2]"
              }`}
            >
              <div
                onClick={() => onViewProfile?.(f.id)}
                className="flex items-center space-x-3 cursor-pointer min-w-0 flex-1 mr-2"
                title="Xem trang cá nhân"
              >
                <div className="w-10 h-10 rounded-full bg-[#82715C]/15 text-[#82715C] font-bold text-sm flex items-center justify-center shrink-0 ring-1 ring-[#82715C]/20">
                  {f.fullName ? f.fullName.charAt(0) : "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-xs truncate text-[#2C241B] dark:text-[#F3EFEA] hover:underline">
                    {f.fullName}
                  </p>
                  <p className="text-[10px] truncate text-[#9A8D7E]">{f.city || "Hồ Chí Minh"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-1 shrink-0">
                {onStartChat && (
                  <button
                    onClick={() => onStartChat(f)}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#82715C] dark:text-[#D4B996] transition cursor-pointer"
                    title="Nhắn tin trò chuyện"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                )}
                {onRemoveFriend && (
                  <button
                    onClick={() => onRemoveFriend(f.id)}
                    className="p-2 rounded-full hover:bg-rose-500/10 text-rose-500 transition cursor-pointer"
                    title="Hủy kết bạn"
                  >
                    <UserX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
