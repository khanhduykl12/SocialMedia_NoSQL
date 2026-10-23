import React from "react";
import { Users, UserPlus, Check, Sparkles } from "lucide-react";
import { FriendRecommendation } from "../types";

interface Props {
  recommendations: FriendRecommendation[];
  friends: any[];
  recMode: string;
  setRecMode: (mode: string) => void;
  isLoading: boolean;
  onAddFriend: (id: string) => void;
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
  addedFriends,
  onViewProfile,
  isDark
}) => {
  const modes = [
    { id: "hybrid", label: "Tổng hợp (Hybrid)" },
    { id: "foaf", label: "Bạn chung (FoAF)" },
    { id: "group", label: "Cùng CLB/Hội nhóm" },
    { id: "jaccard", label: "Sở thích (Jaccard)" }
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto py-5 px-3 space-y-6 ${isDark ? "text-[#F3EFEA]" : "text-[#2C241B]"}`}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight font-['Outfit']">
          Gợi ý kết bạn & Bạn bè
        </h2>
        <p className="text-xs mt-1 text-[#9A8D7E]">
          Thuật toán phân tích đồ thị Neo4j dựa trên bạn chung, CLB HUIT và chỉ số tương đồng Jaccard.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#EDE5DA] dark:border-[#383127] pb-3 text-xs overflow-x-auto">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setRecMode(m.id)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
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
        <div className="py-12 text-center text-xs text-[#9A8D7E]">
          Đang tính toán mạng lưới quan hệ Neo4j...
        </div>
      ) : recommendations.length === 0 ? (
        <div className={`py-8 text-center text-xs rounded-3xl border ${isDark ? "bg-[#25201A] border-[#383127]" : "bg-white border-[#EDE5DA]"}`}>
          Không có gợi ý nào phù hợp.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => {
            const isAdded = addedFriends.includes(rec.id);
            const match = rec.matchPercentage || 90;

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
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
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
                    <p className="text-xs mt-0.5 truncate text-[#9A8D7E]">
                      {rec.mutualCount ? `${rec.mutualCount} bạn chung` : rec.workplace || "HUIT"}
                    </p>

                    {/* Tags */}
                    {rec.commonGroups && rec.commonGroups.length > 0 && (
                      <p className="text-[10px] text-[#82715C] dark:text-[#D4B996] font-semibold mt-1 truncate">
                        CLB: {rec.commonGroups[0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 mt-4">
                    <button
                      onClick={() => onAddFriend(rec.id)}
                      disabled={isAdded}
                      className={`w-full py-2 rounded-full text-xs font-semibold flex items-center justify-center space-x-1 transition cursor-pointer ${
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
        <h3 className="font-bold text-base mb-3 font-['Outfit']">Bạn bè ({friends.length})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {friends.map((f) => (
            <div
              key={f.id}
              onClick={() => onViewProfile?.(f.id)}
              className={`rounded-2xl border p-3 flex items-center space-x-3 cursor-pointer transition hover:shadow-xs ${
                isDark ? "bg-[#25201A] border-[#383127] hover:bg-[#322B23]" : "bg-white border-[#EDE5DA] hover:bg-[#FAF7F2]"
              }`}
              title="Xem trang cá nhân"
            >
              <div className="w-9 h-9 rounded-full bg-[#82715C]/15 text-[#82715C] font-bold text-xs flex items-center justify-center shrink-0">
                {f.fullName ? f.fullName.charAt(0) : "U"}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs truncate text-[#2C241B] dark:text-[#F3EFEA] hover:underline">{f.fullName}</p>
                <p className="text-[10px] truncate text-[#9A8D7E]">{f.city || "Hồ Chí Minh"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
