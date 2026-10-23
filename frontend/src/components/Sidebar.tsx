import React from "react";
import { 
  Compass, 
  MessageCircle, 
  Users, 
  Users2, 
  Bookmark, 
  Network, 
  Share2, 
  BarChart3, 
  Settings
} from "lucide-react";
import { User } from "../types";

interface Props {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDegrees: () => void;
  isDark: boolean;
}

export const Sidebar: React.FC<Props> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenDegrees,
  isDark
}) => {
  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 w-[240px] xl:w-[270px] overflow-y-auto px-5 py-6 space-y-6 select-none z-30 transition-all ${
        isDark ? "bg-[#1A1714] text-[#FAF7F2]" : "bg-[#FAF7F2] text-[#1C1713]"
      }`}
    >
      {/* 1. Profile Card with Avatar & Handle */}
      <div
        onClick={() => setActiveTab("feed")}
        className="flex flex-col items-center text-center py-2 cursor-pointer group"
      >
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#786450] to-[#E5B574] shadow-sm">
            <img
              src={currentUser?.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover bg-white"
            />
          </div>
        </div>
        <h3 className="font-extrabold text-base text-[#1C1713] dark:text-[#FAF7F2] tracking-tight">
          {currentUser?.profile.fullName || "Nguyễn Khánh Duy"}
        </h3>
        <p className="text-xs font-semibold text-[#5A4D3E] dark:text-[#C5B8A8] mt-0.5">
          @khanhduy_it
        </p>
      </div>

      {/* 2. Menu Navigation Items */}
      <nav className="space-y-1.5 font-medium text-sm">
        {/* Timeline */}
        <button
          onClick={() => setActiveTab("feed")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 ${
            activeTab === "feed"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Compass className={`w-5 h-5 ${activeTab === "feed" ? "stroke-[2.2]" : "stroke-[1.8]"}`} />
            <span>Timeline</span>
          </div>
        </button>

        {/* Messages */}
        <button
          onClick={() => setActiveTab("messages")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 ${
            activeTab === "messages"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 stroke-[1.8]" />
            <span>Messages</span>
          </div>
          <span className="w-5 h-5 rounded-full bg-[#D9534F] text-white text-[10px] font-bold flex items-center justify-center">
            6
          </span>
        </button>

        {/* Friends */}
        <button
          onClick={() => setActiveTab("friends")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 ${
            activeTab === "friends"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 stroke-[1.8]" />
            <span>Friends</span>
          </div>
        </button>

        {/* Community */}
        <button
          onClick={() => setActiveTab("reels")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 ${
            activeTab === "reels"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Users2 className="w-5 h-5 stroke-[1.8]" />
            <span>Community</span>
          </div>
          <span className="w-5 h-5 rounded-full bg-[#D9534F] text-white text-[10px] font-bold flex items-center justify-center">
            4
          </span>
        </button>

        {/* Graph View */}
        <button
          onClick={() => setActiveTab("graph")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 ${
            activeTab === "graph"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Network className="w-5 h-5 stroke-[1.8]" />
            <span>Graph View</span>
          </div>
        </button>

        {/* Shortest Path (6 Degrees) */}
        <button
          onClick={onOpenDegrees}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 ${
            isDark ? "text-[#D8CFBF] hover:bg-[#28231D]" : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Share2 className="w-5 h-5 stroke-[1.8]" />
            <span>Shortest Path</span>
          </div>
        </button>

        {/* Settings & Analytics */}
        <button
          onClick={() => setActiveTab("admin")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 ${
            activeTab === "admin"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 stroke-[1.8]" />
            <span>Settings</span>
          </div>
        </button>
      </nav>

      {/* 3. Subtle Badges at bottom */}
      <div className="pt-4 space-y-2">
        <div
          className={`p-3 rounded-2xl border flex items-center space-x-3 transition ${
            isDark ? "bg-[#25201A] border-[#383127]" : "bg-white border-[#E5DCD0]"
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-[#786450]/15 text-[#786450] dark:text-[#E5B574] flex items-center justify-center font-extrabold text-xs">
            H
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#5A4D3E] dark:text-[#C5B8A8]">Đồ án Khoa CNTT</p>
            <p className="text-xs font-bold text-[#1C1713] dark:text-[#FAF7F2]">HUIT NoSQL 2026</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
