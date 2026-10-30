import React from "react";
import { UserPlus, Sparkles, Check, Users, Compass, BookOpen } from "lucide-react";
import { FriendRecommendation } from "../types";

interface Props {
  recommendations: FriendRecommendation[];
  currentMode: string;
  setMode: (mode: string) => void;
  isLoading: boolean;
  onAddFriend: (id: string) => void;
  addedFriends: string[];
}

export const FriendSuggestions: React.FC<Props> = ({
  recommendations,
  currentMode,
  setMode,
  isLoading,
  onAddFriend,
  addedFriends
}) => {
  const modes = [
    { id: "hybrid", label: "Phù hợp nhất" },
    { id: "foaf", label: "Bạn chung" },
    { id: "group", label: "Cùng CLB" },
    { id: "jaccard", label: "Cùng sở thích" }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <h3 className="font-bold text-sm text-slate-100">Gợi ý kết bạn</h3>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800">
          Tương thích cao
        </span>
      </div>

      {/* Filter Mode Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none text-[11px]">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition ${
              currentMode === m.id
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* List of Suggestions */}
      {isLoading ? (
        <div className="py-8 text-center text-xs text-slate-500 animate-pulse">
          Đang tìm kiếm bạn bè phù hợp...
        </div>
      ) : recommendations.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-500">
          Không có gợi ý nào phù hợp với bộ lọc này.
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.slice(0, 5).map((rec) => {
            const isAdded = addedFriends.includes(rec.id);
            const matchScore = rec.matchPercentage || (rec.score ? Math.min(99, Math.round(rec.score * 8)) : 88);

            return (
              <div
                key={rec.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <img
                    src={rec.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                    alt={rec.fullName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <h4 className="font-semibold text-xs text-slate-200 truncate">{rec.fullName}</h4>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                        {matchScore}%
                      </span>
                    </div>

                    {/* Recommendation Reasons */}
                    <div className="flex flex-wrap items-center gap-1 mt-0.5 text-[10px] text-slate-400">
                      {rec.mutualCount !== undefined && rec.mutualCount > 0 && (
                        <span className="flex items-center space-x-0.5 text-indigo-400">
                          <Users className="w-3 h-3" />
                          <span>{rec.mutualCount} bạn chung</span>
                        </span>
                      )}

                      {rec.commonGroupsCount !== undefined && rec.commonGroupsCount > 0 && (
                        <span className="flex items-center space-x-0.5 text-purple-400">
                          <BookOpen className="w-3 h-3" />
                          <span>{rec.commonGroupsCount} CLB chung</span>
                        </span>
                      )}

                      {rec.commonInterests && rec.commonInterests.length > 0 && (
                        <span className="flex items-center space-x-0.5 text-sky-400">
                          <Compass className="w-3 h-3" />
                          <span>{rec.commonInterests[0]}</span>
                        </span>
                      )}

                      {!rec.mutualCount && !rec.commonGroupsCount && !rec.commonInterests?.length && (
                        <span>{rec.city || rec.workplace}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Add Friend Button */}
                <button
                  onClick={() => onAddFriend(rec.id)}
                  disabled={isAdded}
                  className={`ml-2 p-2 rounded-xl text-xs font-medium transition flex-shrink-0 ${
                    isAdded
                      ? "bg-slate-800 text-slate-400"
                      : "bg-sky-600/20 text-sky-400 hover:bg-sky-600 hover:text-white border border-sky-500/30"
                  }`}
                  title={isAdded ? "Đã gửi lời mời" : "Kết bạn ngay"}
                >
                  {isAdded ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
