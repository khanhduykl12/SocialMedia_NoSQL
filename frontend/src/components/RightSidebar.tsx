import React from "react";
import { FriendRecommendation, StoryGroup } from "../types";
import { Users, Sparkles, Check, Play } from "lucide-react";

interface Props {
  recommendations: FriendRecommendation[];
  friends: any[];
  onAddFriend: (id: string) => void;
  addedFriends: string[];
  onSelectFriendChat: (friend: any) => void;
  stories?: StoryGroup[];
  onOpenStory?: (group: StoryGroup) => void;
  onViewProfile?: (userId: string) => void;
  onNavigateToFriends?: () => void;
  isDark: boolean;
}

export const RightSidebar: React.FC<Props> = ({
  recommendations,
  friends,
  onAddFriend,
  addedFriends,
  onSelectFriendChat,
  stories = [],
  onOpenStory,
  onViewProfile,
  onNavigateToFriends,
  isDark
}) => {
  // Sample default stories if none loaded yet
  const displayStories: StoryGroup[] = stories.length > 0 ? stories : [
    {
      authorId: "usr_102",
      authorName: "Trần Thị Bình",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
      stories: [
        {
          _id: "st_1",
          authorId: "usr_102",
          mediaUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600",
          mediaType: "image",
          caption: "Chuyến dã ngoại cuối tuần của CLB HUIT 🌿",
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      authorId: "usr_104",
      authorName: "Phạm Minh Đức",
      authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300",
      stories: [
        {
          _id: "st_2",
          authorId: "usr_104",
          mediaUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
          mediaType: "image",
          caption: "Chạy deadline đồ án cùng hội bạn thân 💻",
          createdAt: new Date().toISOString()
        }
      ]
    }
  ];

  return (
    <aside
      className={`fixed top-16 right-0 bottom-0 w-[280px] xl:w-[320px] overflow-y-auto px-5 py-6 space-y-6 select-none hidden lg:block z-30 transition-all ${
        isDark ? "bg-[#1A1714] text-[#FAF7F2]" : "bg-[#FAF7F2] text-[#1C1713]"
      }`}
    >
      {/* 1. STORIES */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-base text-[#1C1713] dark:text-[#FAF7F2] tracking-tight font-['Outfit']">
            Stories
          </h3>
          <span 
            onClick={() => displayStories[0] && onOpenStory && onOpenStory(displayStories[0])}
            className="text-xs font-bold text-[#6B5844] dark:text-[#E5B574] cursor-pointer hover:underline"
          >
            Xem tất cả
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {displayStories.slice(0, 2).map((group) => {
            const firstStory = group.stories[0];
            const isVideo = firstStory?.mediaType === "video" || firstStory?.mediaUrl?.endsWith(".mp4");

            return (
              <div
                key={group.authorId}
                onClick={() => onOpenStory && onOpenStory(group)}
                className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-[#E5DCD0]/60 dark:border-[#383127]"
              >
                {isVideo ? (
                  <video
                    src={firstStory?.mediaUrl}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <img
                    src={firstStory?.mediaUrl || group.authorAvatar}
                    alt={group.authorName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full overflow-hidden ring-1 ring-white">
                  <img src={group.authorAvatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
                {isVideo && (
                  <div className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-amber-300">
                    <span className="text-[9px] font-bold">▶</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2 flex items-center space-x-1.5">
                  <span className="text-[11px] font-bold text-white truncate drop-shadow">{group.authorName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SUGGESTIONS (GỢI Ý KẾT BẠN) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-base text-[#1C1713] dark:text-[#FAF7F2] tracking-tight font-['Outfit']">
            Suggestions
          </h3>
          <span 
            onClick={onNavigateToFriends}
            className="text-xs font-bold text-[#6B5844] dark:text-[#E5B574] cursor-pointer hover:underline"
            title="Xem toàn bộ gợi ý kết bạn"
          >
            See all
          </span>
        </div>

        <div className="space-y-3.5">
          {recommendations.slice(0, 3).map((rec) => {
            const isAdded = addedFriends.includes(rec.id);

            return (
              <div key={rec.id} className="flex items-center justify-between space-x-3">
                <div
                  onClick={() => onViewProfile?.(rec.id)}
                  className="flex items-center space-x-2.5 min-w-0 cursor-pointer group"
                  title="Xem trang cá nhân"
                >
                  <img
                    src={rec.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                    alt={rec.fullName}
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#786450]/20 group-hover:ring-[#786450] transition"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs truncate text-[#1C1713] dark:text-[#FAF7F2] group-hover:underline">
                      {rec.fullName}
                    </h4>
                    <p className="text-[11px] text-[#5A4D3E] dark:text-[#C5B8A8] truncate font-medium">
                      {rec.mutualCount ? `${rec.mutualCount} bạn chung` : `@${rec.id}`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onAddFriend(rec.id)}
                  disabled={isAdded}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                    isAdded
                      ? "bg-[#786450]/15 text-[#786450] dark:text-[#E5B574]"
                      : "bg-[#786450] hover:bg-[#655341] text-white shadow-xs"
                  }`}
                >
                  {isAdded ? "✓ Đã gửi" : "Follow"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. GROUPS (CỘNG ĐỒNG) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-base text-[#1C1713] dark:text-[#FAF7F2] tracking-tight font-['Outfit']">
            Groups
          </h3>
        </div>

        <div className="flex items-center space-x-3">
          <div
            title="CLB Tin Học HUIT"
            className="w-11 h-11 rounded-2xl bg-[#231F1A] text-white font-extrabold text-xs flex items-center justify-center cursor-pointer hover:scale-105 transition shadow-sm"
          >
            HUIT
          </div>
          <div
            title="Cộng đồng Dev Sài Gòn"
            className="w-11 h-11 rounded-2xl bg-[#786450] text-white font-extrabold text-xs flex items-center justify-center cursor-pointer hover:scale-105 transition shadow-sm"
          >
            DEV
          </div>
          <div
            title="CLB Nhiếp ảnh & Media HUIT"
            className="w-11 h-11 rounded-2xl bg-[#E5B574] text-[#3D2C1A] font-extrabold text-xs flex items-center justify-center cursor-pointer hover:scale-105 transition shadow-sm"
          >
            MEDIA
          </div>
          <div
            title="Khám phá thêm câu lạc bộ"
            className="w-11 h-11 rounded-2xl border-2 border-dashed border-[#8C7D6D] text-[#8C7D6D] font-bold text-xs flex items-center justify-center cursor-pointer hover:border-[#786450] hover:text-[#786450] transition"
          >
            +
          </div>
        </div>
      </div>

      {/* 4. ONLINE CONTACTS (FAST CHAT) */}
      <div className="pt-2 border-t border-[#E5DCD0] dark:border-[#383127]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A4D3E] dark:text-[#C5B8A8]">
            Trực tuyến ({friends.length})
          </span>
        </div>

        <div className="space-y-1">
          {friends.slice(0, 5).map((f) => (
            <div
              key={f.id}
              onClick={() => onSelectFriendChat(f)}
              className={`flex items-center space-x-2.5 px-2.5 py-2 rounded-xl cursor-pointer transition ${
                isDark ? "hover:bg-[#25201A]" : "hover:bg-[#EAE2D5]"
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#786450]/15 text-[#786450] dark:text-[#E5B574] font-bold text-xs flex items-center justify-center">
                  {f.fullName ? f.fullName.charAt(0) : "U"}
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#38A169] rounded-full ring-2 ring-[#FAF7F2] dark:ring-[#1A1714]" />
              </div>
              <span className="font-bold text-xs truncate text-[#1C1713] dark:text-[#FAF7F2]">
                {f.fullName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
