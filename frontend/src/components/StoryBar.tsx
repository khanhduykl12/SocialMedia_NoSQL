import React from "react";
import { Plus, Video } from "lucide-react";
import { StoryGroup, User } from "../types";

interface Props {
  currentUser: User | null;
  stories: StoryGroup[];
  onOpenStory: (group: StoryGroup) => void;
  onCreateStory?: () => void;
  isDark: boolean;
}

export const StoryBar: React.FC<Props> = ({
  currentUser,
  stories,
  onOpenStory,
  onCreateStory,
  isDark
}) => {
  return (
    <div className="flex items-center space-x-2.5 overflow-x-auto py-2 scrollbar-none select-none">
      {/* 1. Card "Tạo tin" (Create Story Card) */}
      <div
        onClick={() => (onCreateStory ? onCreateStory() : stories[0] && onOpenStory(stories[0]))}
        className={`relative w-[112px] sm:w-[130px] h-[190px] rounded-2xl overflow-hidden cursor-pointer shadow-sm group shrink-0 border transition ${
          isDark
            ? "bg-[#242526] border-[#393a3b] hover:opacity-95"
            : "bg-white border-[#ced0d4] hover:opacity-95"
        }`}
      >
        {/* Top 72% user avatar */}
        <div className="w-full h-[72%] overflow-hidden">
          <img
            src={currentUser?.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
            alt="My profile"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Plus Button in middle */}
        <div className="absolute top-[62%] left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center ring-4 ring-[#242526] shadow-sm">
          <Plus className="w-5 h-5 stroke-[3]" />
        </div>

        {/* Bottom Title */}
        <div className="w-full h-[28%] flex items-end justify-center pb-2">
          <span className={`text-xs font-semibold ${isDark ? "text-[#e4e6eb]" : "text-[#050505]"}`}>
            Tạo tin
          </span>
        </div>
      </div>

      {/* 2. Friends' Stories Cards */}
      {stories.map((group) => {
        const firstStory = group.stories[0];
        const isVideo = firstStory?.mediaType === "video" || firstStory?.mediaUrl?.endsWith(".mp4");

        return (
          <div
            key={group.authorId}
            onClick={() => onOpenStory(group)}
            className="relative w-[112px] sm:w-[130px] h-[190px] rounded-2xl overflow-hidden cursor-pointer shadow-sm group shrink-0 border border-slate-700/30"
          >
            {/* Story Media Background (Video or Image) */}
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

            {/* Dark gradient shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

            {/* Circle Avatar on Top-Left */}
            <div className="absolute top-2.5 left-2.5 w-10 h-10 rounded-full p-0.5 bg-[#1877F2] ring-2 ring-[#1877F2] shadow-sm">
              <img
                src={group.authorAvatar}
                alt={group.authorName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* Video Badge on Top-Right */}
            {isVideo && (
              <div className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/60 backdrop-blur-xs text-amber-300 shadow">
                <Video className="w-3.5 h-3.5" />
              </div>
            )}

            {/* Author Name at Bottom */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5">
              <span className="text-xs font-semibold text-white drop-shadow truncate block">
                {group.authorName}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
