import React, { useState } from "react";
import { Heart, MessageSquare, Share2, Disc3, Music2, Eye } from "lucide-react";
import { Reel } from "../types";

interface Props {
  reels: Reel[];
  onLikeReel: (id: string) => void;
  currentUserId?: string;
}

export const ReelsPage: React.FC<Props> = ({ reels, onLikeReel, currentUserId = "usr_101" }) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  return (
    <div className="max-w-md mx-auto py-4 px-2">
      <div className="flex items-center justify-between mb-4 px-2">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <span>Khám phá Reels</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-pink-950 text-pink-400 border border-pink-800">
              TikTok Style
            </span>
          </h2>
          <p className="text-xs text-slate-400">Video ngắn xếp hạng theo MongoDB Aggregation Pipeline</p>
        </div>
      </div>

      <div className="space-y-6">
        {reels.map((reel, idx) => {
          const isLiked = reel.likes?.includes(currentUserId);

          return (
            <div
              key={reel._id}
              className="relative w-full h-[620px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between"
            >
              {/* Video Player */}
              <video
                src={reel.videoUrl}
                autoPlay={idx === activeReelIndex}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                onClick={(e) => {
                  const v = e.currentTarget;
                  if (v.paused) v.play();
                  else v.pause();
                }}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

              {/* Top info */}
              <div className="relative z-20 p-4 flex items-center justify-between text-white text-xs">
                <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <Eye className="w-3.5 h-3.5 text-slate-300" />
                  <span>{reel.viewsCount.toLocaleString()} lượt xem</span>
                </div>
              </div>

              {/* Right Floating Actions */}
              <div className="absolute right-3 bottom-16 z-20 flex flex-col items-center space-y-4">
                {/* Like Button */}
                <button
                  onClick={() => onLikeReel(reel._id)}
                  className="flex flex-col items-center space-y-1 group"
                >
                  <div
                    className={`p-3 rounded-full backdrop-blur-md transition-transform group-hover:scale-110 ${
                      isLiked ? "bg-rose-500 text-white" : "bg-black/40 text-white hover:bg-black/60"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
                  </div>
                  <span className="text-[11px] font-bold text-white drop-shadow">
                    {reel.likeCount || 0}
                  </span>
                </button>

                {/* Comment Button */}
                <button className="flex flex-col items-center space-y-1">
                  <div className="p-3 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white drop-shadow">
                    {reel.commentCount || 0}
                  </span>
                </button>

                {/* Share Button */}
                <button className="flex flex-col items-center space-y-1">
                  <div className="p-3 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white drop-shadow">Share</span>
                </button>

                {/* Spinning Music Disc */}
                <div className="pt-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5 animate-spin">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <Disc3 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info: Author & Caption */}
              <div className="relative z-20 p-5 text-white space-y-2">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={reel.authorAvatar || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150"}
                    alt={reel.authorName}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white/60"
                  />
                  <div>
                    <h4 className="font-bold text-sm drop-shadow">{reel.authorName}</h4>
                    <p className="text-[11px] text-slate-300 drop-shadow">Tác giả</p>
                  </div>
                </div>

                <p className="text-xs text-slate-100 drop-shadow leading-relaxed">
                  {reel.caption}
                </p>

                {/* Music title */}
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-300">
                  <Music2 className="w-3.5 h-3.5 text-pink-400" />
                  <span className="truncate max-w-[240px]">{reel.musicTitle}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
