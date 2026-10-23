import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { StoryGroup } from "../types";

interface Props {
  group: StoryGroup;
  onClose: () => void;
}

export const StoryModal: React.FC<Props> = ({ group, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentStory = group.stories[currentIndex];

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < group.stories.length - 1) {
            setCurrentIndex((idx) => idx + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2; // ~5 seconds total
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, group.stories.length, onClose]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < group.stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Nút đóng */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-slate-300 hover:text-white p-2 rounded-full bg-slate-800/60 z-50 transition"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Khung Story */}
      <div className="relative w-full max-w-sm h-[75vh] max-h-[640px] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between">
        {/* Progress Bars */}
        <div className="absolute top-3 left-3 right-3 z-30 flex space-x-1.5">
          {group.stories.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width:
                    idx < currentIndex
                      ? "100%"
                      : idx === currentIndex
                      ? `${progress}%`
                      : "0%"
                }}
              />
            </div>
          ))}
        </div>

        {/* Header thông tin tác giả */}
        <div className="absolute top-6 left-3 right-3 z-30 flex items-center justify-between text-white drop-shadow-md">
          <div className="flex items-center space-x-2.5">
            <img
              src={group.authorAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
              alt="Author"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/50"
            />
            <div>
              <p className="text-xs font-semibold leading-tight">{group.authorName}</p>
              <div className="flex items-center text-[10px] text-slate-300 space-x-1">
                <Clock className="w-2.5 h-2.5" />
                <span>Story 24h (TTL Index)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nội dung ảnh Story */}
        <div className="w-full h-full relative">
          <img
            src={currentStory.mediaUrl}
            alt="Story content"
            className="w-full h-full object-cover"
          />
          {currentStory.caption && (
            <div className="absolute bottom-6 left-4 right-4 z-30 bg-black/60 backdrop-blur-md p-3 rounded-2xl text-center text-xs text-white border border-white/10">
              {currentStory.caption}
            </div>
          )}
        </div>

        {/* Nút điều hướng Trái / Phải */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
