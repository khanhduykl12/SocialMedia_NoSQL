import React, { useState, useRef } from "react";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Disc3, 
  Music2, 
  Eye, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { Reel } from "../types";

interface Props {
  reels: Reel[];
  onLikeReel: (id: string) => void;
  currentUserId?: string;
}

const SingleReelCard: React.FC<{
  reel: Reel;
  isLiked: boolean;
  onLike: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}> = ({ reel, isLiked, onLike, onNext, onPrev, hasPrev, hasNext }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowPlayIcon(true);
    setTimeout(() => setShowPlayIcon(false), 800);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="relative w-full h-[640px] bg-black rounded-3xl overflow-hidden border border-[#E5DCD0]/60 dark:border-[#383127] shadow-2xl flex flex-col justify-between group select-none">
      {/* Video Player */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.thumbnailUrl}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
      />

      {/* Floating Center Play/Pause Indicator Animation */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-scale-up">
          <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl">
            {isPlaying ? <Play className="w-8 h-8 fill-white ml-1" /> : <Pause className="w-8 h-8 fill-white" />}
          </div>
        </div>
      )}

      {/* Overlay Gradients */}
      <div 
        onClick={togglePlay}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-auto cursor-pointer" 
      />

      {/* Top Header: Views & Sound Control */}
      <div className="relative z-20 p-4 flex items-center justify-between text-white text-xs">
        <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
          <Eye className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium">{(reel.viewsCount || 1200).toLocaleString()} lượt xem</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Sound Toggle Button */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 border border-white/10 transition-all cursor-pointer shadow-md"
            title={isMuted ? "Bật âm thanh" : "Tắt tiếng"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Floating Up / Down navigation arrows */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col space-y-2 opacity-0 group-hover:opacity-90 transition-opacity">
        {hasPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 border border-white/20 transition cursor-pointer"
            title="Video trước"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}
        {hasNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext?.(); }}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 border border-white/20 transition cursor-pointer"
            title="Video tiếp theo"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Right Floating Actions (Like, Comment, Share, Audio) */}
      <div className="absolute right-3.5 bottom-16 z-20 flex flex-col items-center space-y-4">
        {/* Like Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onLike(); }}
          className="flex flex-col items-center space-y-1 group/btn cursor-pointer"
        >
          <div
            className={`p-3 rounded-full backdrop-blur-md transition-transform group-hover/btn:scale-115 shadow-lg ${
              isLiked ? "bg-rose-500 text-white" : "bg-black/50 text-white hover:bg-black/70 border border-white/15"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
          </div>
          <span className="text-[11px] font-bold text-white drop-shadow">
            {reel.likeCount || 0}
          </span>
        </button>

        {/* Comment Button */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center space-y-1 group/btn cursor-pointer"
        >
          <div className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md border border-white/15 transition-transform group-hover/btn:scale-115 shadow-lg">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-white drop-shadow">
            {reel.commentCount || 0}
          </span>
        </button>

        {/* Share Button */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center space-y-1 group/btn cursor-pointer"
        >
          <div className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md border border-white/15 transition-transform group-hover/btn:scale-115 shadow-lg">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-white drop-shadow">Chia sẻ</span>
        </button>

        {/* Spinning Music Disc */}
        <div className="pt-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-0.5 animate-spin">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <Disc3 className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info: Author & Caption */}
      <div className="relative z-20 p-5 text-white space-y-2.5 max-w-[85%]">
        <div className="flex items-center space-x-2.5">
          <img
            src={reel.authorAvatar || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150"}
            alt={reel.authorName}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-white/60 shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-sm drop-shadow truncate">{reel.authorName}</h4>
            <p className="text-[10px] text-slate-300 drop-shadow">Sinh viên HUIT</p>
          </div>
        </div>

        <p className="text-xs text-slate-100 drop-shadow leading-relaxed line-clamp-3">
          {reel.caption}
        </p>

        {/* Music title */}
        <div className="flex items-center space-x-2 text-[11px] text-slate-300">
          <Music2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="truncate max-w-[220px]">{reel.musicTitle || "Goonly Original Audio"}</span>
        </div>
      </div>
    </div>
  );
};

export const ReelsPage: React.FC<Props> = ({ reels, onLikeReel, currentUserId = "usr_101" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".reel-card-item");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="max-w-md mx-auto py-5 px-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div>
          <h2 className="text-xl font-extrabold text-[#1C1713] dark:text-[#FAF7F2] flex items-center space-x-2 font-['Outfit']">
            <span>Video Reels</span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-bold">
              🔥 Thịnh hành
            </span>
          </h2>
          <p className="text-xs text-[#786450] dark:text-[#C5B8A8] mt-0.5">
            Khám phá khoảnh khắc học tập, thể thao và đời sống sinh viên HUIT
          </p>
        </div>
      </div>

      {/* Reels List */}
      <div ref={containerRef} className="space-y-6">
        {reels.map((reel, idx) => {
          const isLiked = reel.likes?.includes(currentUserId);

          return (
            <div key={reel._id} className="reel-card-item">
              <SingleReelCard
                reel={reel}
                isLiked={Boolean(isLiked)}
                onLike={() => onLikeReel(reel._id)}
                hasPrev={idx > 0}
                hasNext={idx < reels.length - 1}
                onPrev={() => scrollToIndex(idx - 1)}
                onNext={() => scrollToIndex(idx + 1)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
