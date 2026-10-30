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
  onOpenAccountSwitcher?: () => void;
  isDark: boolean;
}

export const Sidebar: React.FC<Props> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenDegrees,
  onOpenAccountSwitcher,
  isDark
}) => {
  const isAdmin = currentUser?.role === "admin";

  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 w-[240px] xl:w-[270px] overflow-y-auto px-5 py-6 space-y-5 select-none z-30 transition-all ${
        isDark ? "bg-[#1A1714] text-[#FAF7F2]" : "bg-[#FAF7F2] text-[#1C1713]"
      }`}
    >
      {/* 1. Profile Card with Avatar & Role Badge */}
      <div className="flex flex-col items-center text-center py-2 group">
        <div 
          onClick={onOpenAccountSwitcher}
          className="relative mb-2.5 cursor-pointer"
          title="Bấm để đổi tài khoản người dùng"
        >
          <div className={`w-20 h-20 rounded-full overflow-hidden p-1 bg-gradient-to-tr shadow-sm transition group-hover:scale-105 ${
            isAdmin ? "from-amber-500 to-orange-400" : "from-[#786450] to-[#E5B574]"
          }`}>
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
        
        <div className="flex items-center space-x-1.5 mt-1">
          <p className="text-xs font-semibold text-[#5A4D3E] dark:text-[#C5B8A8]">
            @{currentUser?.username || "khanhduy"}
          </p>
          {isAdmin ? (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40">
              Admin
            </span>
          ) : (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#786450]/15 text-[#786450] dark:text-[#E5B574] border border-[#786450]/30">
              User
            </span>
          )}
        </div>

        {/* Quick Switch Account Button */}
        {onOpenAccountSwitcher && (
          <button
            onClick={onOpenAccountSwitcher}
            className="mt-2.5 px-3 py-1 rounded-full text-[11px] font-bold border border-[#E5DCD0] dark:border-[#383127] hover:bg-[#786450]/10 text-[#786450] dark:text-[#E5B574] transition cursor-pointer"
          >
            🔄 Đổi tài khoản
          </button>
        )}
      </div>

      {/* 2. Menu Navigation Items */}
      <nav className="space-y-1.5 font-medium text-sm">
        {/* Timeline */}
        <button
          onClick={() => setActiveTab("feed")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${
            activeTab === "feed"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Compass className={`w-5 h-5 ${activeTab === "feed" ? "stroke-[2.2]" : "stroke-[1.8]"}`} />
            <span>Bảng tin</span>
          </div>
        </button>

        {/* Messages */}
        <button
          onClick={() => setActiveTab("messages")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${
            activeTab === "messages"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 stroke-[1.8]" />
            <span>Tin nhắn</span>
          </div>
          <span className="w-5 h-5 rounded-full bg-[#D9534F] text-white text-[10px] font-bold flex items-center justify-center">
            6
          </span>
        </button>

        {/* Friends */}
        <button
          onClick={() => setActiveTab("friends")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${
            activeTab === "friends"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 stroke-[1.8]" />
            <span>Gợi ý kết bạn</span>
          </div>
        </button>

        {/* Reels */}
        <button
          onClick={() => setActiveTab("reels")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${
            activeTab === "reels"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Users2 className="w-5 h-5 stroke-[1.8]" />
            <span>Video Reels</span>
          </div>
          <span className="w-5 h-5 rounded-full bg-[#D9534F] text-white text-[10px] font-bold flex items-center justify-center">
            Hot
          </span>
        </button>

        {/* Graph View */}
        <button
          onClick={() => setActiveTab("graph")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${
            activeTab === "graph"
              ? "bg-[#786450] text-white shadow-sm font-bold"
              : isDark
              ? "text-[#D8CFBF] hover:bg-[#28231D]"
              : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Network className="w-5 h-5 stroke-[1.8]" />
            <span>Sơ đồ mạng lưới</span>
          </div>
        </button>

        {/* Shortest Path (6 Degrees) */}
        <button
          onClick={onOpenDegrees}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${
            isDark ? "text-[#D8CFBF] hover:bg-[#28231D]" : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Share2 className="w-5 h-5 stroke-[1.8]" />
            <span>Tìm bạn 6 bậc</span>
          </div>
        </button>

        {/* Settings & Analytics (CHỈ HIỂN THỊ CHO ADMIN) */}
        {isAdmin && (
          <button
            onClick={() => setActiveTab("admin")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "admin"
                ? "bg-[#786450] text-white shadow-sm font-bold"
                : isDark
                ? "text-[#D8CFBF] hover:bg-[#28231D]"
                : "text-[#3D3126] hover:bg-[#EAE2D5] font-semibold"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 stroke-[1.8]" />
              <span>Thống kê hệ thống</span>
            </div>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-500">
              Admin
            </span>
          </button>
        )}
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
