import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Volume2, 
  VolumeX, 
  Video, 
  AlertCircle,
  Play,
  Pause
} from "lucide-react";
import { StoryGroup } from "../types";

interface Props {
  group: StoryGroup;
  allGroups?: StoryGroup[];
  onSelectGroup?: (group: StoryGroup) => void;
  onClose: () => void;
}

export const StoryModal: React.FC<Props> = ({ 
  group, 
  allGroups = [], 
  onSelectGroup, 
  onClose 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default to muted to guarantee browser autoplay works
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Safely clamp active index so currentStory is always valid
  const activeIndex = (currentIndex >= 0 && currentIndex < group.stories.length) ? currentIndex : 0;
  const currentStory = group.stories[activeIndex];
  const isVideo = Boolean(
    currentStory?.mediaType === "video" || 
    currentStory?.mediaUrl?.endsWith(".mp4") ||
    currentStory?.mediaUrl?.includes("/videos/")
  );

  // Reset state when switching to a different author group
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
    setVideoError(false);
  }, [group.authorId]);

  // Handle switching to Next Story / Next Story Group
  const handleNext = () => {
    setVideoError(false);
    if (activeIndex < group.stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      // Auto-advance to NEXT author's story group!
      const currentGroupIdx = allGroups.findIndex((g) => g.authorId === group.authorId);
      if (currentGroupIdx !== -1 && currentGroupIdx < allGroups.length - 1 && onSelectGroup) {
        setCurrentIndex(0);
        setProgress(0);
        onSelectGroup(allGroups[currentGroupIdx + 1]);
      } else {
        // End of all stories
        onClose();
      }
    }
  };

  // Handle switching to Previous Story / Previous Story Group
  const handlePrev = () => {
    setVideoError(false);
    if (activeIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      // Go back to PREVIOUS author's story group
      const currentGroupIdx = allGroups.findIndex((g) => g.authorId === group.authorId);
      if (currentGroupIdx > 0 && onSelectGroup) {
        setCurrentIndex(0);
        setProgress(0);
        onSelectGroup(allGroups[currentGroupIdx - 1]);
      }
    }
  };

  // Autoplay video on story load / index change
  useEffect(() => {
    setProgress(0);
    setVideoError(false);

    if (isVideo && videoRef.current) {
      const vid = videoRef.current;
      vid.currentTime = 0;
      vid.muted = isMuted;

      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked, attempting muted retry:", err);
          vid.muted = true;
          setIsMuted(true);
          vid.play().catch((e) => console.error("Video play retry failed:", e));
        });
      }
    }
  }, [activeIndex, group.authorId, isVideo, currentStory?.mediaUrl]);

  // Pause / Resume video when isPaused changes
  useEffect(() => {
    if (isVideo && videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPaused, isVideo]);

  // Progress timer for static images (~5 seconds per image)
  useEffect(() => {
    if (isVideo) return;
    if (isPaused) return;

    setProgress(0);
    const stepMs = 50;
    const totalDurationMs = 5000; // 5 seconds
    const increment = (stepMs / totalDurationMs) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [activeIndex, isVideo, isPaused, group.authorId]);

  // Safety fallback timer for videos (auto-advances after max 15 seconds if stuck)
  useEffect(() => {
    if (!isVideo) return;
    if (isPaused) return;

    const maxTimer = setTimeout(() => {
      handleNext();
    }, 16000);

    return () => clearTimeout(maxTimer);
  }, [activeIndex, isVideo, isPaused, group.authorId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, group.authorId]);

  // Video event handlers
  const handleVideoTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(Math.min(100, pct));
    }
  };

  const handleVideoEnded = () => {
    handleNext();
  };

  const handleVideoError = () => {
    console.error("Video error on story:", currentStory?.mediaUrl);
    setVideoError(true);
    setTimeout(() => {
      handleNext();
    }, 2000);
  };

  // Toggle Mute / Unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  if (!currentStory) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none"
      onClick={onClose}
    >
      {/* Top Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-slate-300 hover:text-white p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 z-50 transition cursor-pointer shadow-xl border border-white/10"
        title="Đóng (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Story Container */}
      <div 
        className="relative w-full max-w-sm h-[84vh] max-h-[700px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Progress Bars */}
        <div className="absolute top-3 left-3 right-3 z-30 flex space-x-1.5">
          {group.stories.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-xs">
              <div
                className="h-full bg-white transition-all duration-75 ease-linear"
                style={{
                  width:
                    idx < activeIndex
                      ? "100%"
                      : idx === activeIndex
                      ? `${progress}%`
                      : "0%"
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Header: Author Info & Controls */}
        <div className="absolute top-7 left-3 right-3 z-30 flex items-center justify-between text-white drop-shadow-md">
          <div className="flex items-center space-x-2.5">
            <img
              src={group.authorAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
              alt={group.authorName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/60 shadow"
            />
            <div>
              <p className="text-xs font-bold leading-tight drop-shadow truncate max-w-[170px]">
                {group.authorName}
              </p>
              <div className="flex items-center text-[10px] text-slate-300 space-x-1 drop-shadow">
                <Clock className="w-2.5 h-2.5" />
                <span>Story 24h</span>
                {isVideo && (
                  <span className="flex items-center space-x-0.5 text-amber-300 font-semibold ml-1">
                    <Video className="w-2.5 h-2.5" />
                    <span>Video</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Sound Mute Toggle for Video Story */}
          {isVideo && (
            <button
              onClick={toggleMute}
              className="p-1.5 px-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 border border-white/20 transition cursor-pointer flex items-center space-x-1 text-[11px] font-medium shadow-md"
              title={isMuted ? "Bật âm thanh" : "Tắt tiếng"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 hidden sm:inline">Bật tiếng</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 hidden sm:inline">Đang bật</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Media Container: Supports Image & Video */}
        <div className="w-full h-full relative flex items-center justify-center bg-black">
          {videoError ? (
            <div className="p-6 text-center text-white space-y-2 z-20">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <p className="text-sm font-semibold">Không thể tải video</p>
              <p className="text-xs text-slate-400">Đang tự động chuyển sang tin tiếp theo...</p>
            </div>
          ) : isVideo ? (
            <video
              key={currentStory.mediaUrl}
              ref={videoRef}
              src={currentStory.mediaUrl}
              autoPlay
              playsInline
              muted={isMuted}
              preload="auto"
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
              onError={handleVideoError}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              key={currentStory.mediaUrl}
              src={currentStory.mediaUrl}
              alt={currentStory.caption || "Story"}
              className="w-full h-full object-cover"
            />
          )}

          {/* Pause indicator on screen when holding */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-25 pointer-events-none">
              <div className="p-3 rounded-full bg-black/60 text-white border border-white/20 shadow-xl">
                <Pause className="w-6 h-6 fill-white" />
              </div>
            </div>
          )}

          {/* Story Caption */}
          {currentStory.caption && (
            <div className="absolute bottom-6 left-4 right-4 z-30 bg-black/70 backdrop-blur-md p-3.5 rounded-2xl text-center text-xs text-white border border-white/15 leading-relaxed shadow-lg">
              {currentStory.caption}
            </div>
          )}
        </div>

        {/* Left Click Area (Prev) & Right Click Area (Next) */}
        <div 
          onClick={handlePrev}
          className="absolute left-0 top-16 bottom-16 w-1/3 z-20 cursor-pointer"
          title="Story trước"
        />
        <div 
          onClick={handleNext}
          className="absolute right-0 top-16 bottom-16 w-1/3 z-20 cursor-pointer"
          title="Story tiếp theo"
        />

        {/* Left & Right Chevron Buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 backdrop-blur-md border border-white/10 transition cursor-pointer"
          title="Trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 backdrop-blur-md border border-white/10 transition cursor-pointer"
          title="Tiếp"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
