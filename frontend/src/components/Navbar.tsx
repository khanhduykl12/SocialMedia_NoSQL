import React from "react";
import { Search, Bell, Sun, Moon, Sparkles, MessageCircle, Crown, Network, Compass, Users } from "lucide-react";
import { User } from "../types";

interface Props {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChat: () => void;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}

export const Navbar: React.FC<Props> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenChat,
  isDark,
  setIsDark
}) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-50 px-6 lg:px-10 flex items-center justify-between border-b backdrop-blur-md transition-all ${
        isDark
          ? "bg-[#1E1B17]/95 border-[#2E2820] text-[#FAF7F2]"
          : "bg-[#FAF7F2]/95 border-[#E5DCD0] text-[#1C1713]"
      }`}
    >
      {/* 1. LEFT: Signature Brand Logo */}
      <div className="flex items-center space-x-3 w-64">
        <div
          onClick={() => setActiveTab("feed")}
          className="cursor-pointer group flex items-center space-x-2 select-none"
        >
          <span className="font-extrabold text-3xl tracking-tight text-[#786450] dark:text-[#E5B574] font-['Outfit'] hover:opacity-90 transition">
            goonly
          </span>
          <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-[#786450]/15 text-[#786450] dark:bg-[#E5B574]/20 dark:text-[#E5B574]">
            NoSQL
          </span>
        </div>
      </div>

      {/* 2. MIDDLE: Sleek Pill Search Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <div
          className={`flex items-center px-4 py-2.5 rounded-full border transition-all shadow-xs ${
            isDark
              ? "bg-[#28231D] border-[#383129] text-[#FAF7F2] focus-within:border-[#786450]"
              : "bg-white border-[#E5DCD0] text-[#1C1713] focus-within:border-[#786450]"
          }`}
        >
          <Search className="w-4 h-4 mr-3 text-[#7C6E5F] dark:text-[#A89D8E] shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm bạn bè, bài viết, đồ thị Neo4j..."
            className="bg-transparent text-sm w-full focus:outline-none placeholder:text-[#7C6E5F] dark:placeholder:text-[#A89D8E] font-medium text-[#1C1713] dark:text-[#FAF7F2]"
          />
        </div>
      </div>

      {/* 3. RIGHT: Actions, Theme, Messenger, Premium/Graph Pill Badge */}
      <div className="flex items-center space-x-3 justify-end w-auto">
        {/* Messenger Quick Icon */}
        <button
          onClick={() => setActiveTab("messages")}
          className={`relative p-2.5 rounded-full transition-all cursor-pointer ${
            activeTab === "messages"
              ? "bg-[#786450] text-white"
              : isDark
              ? "hover:bg-[#28231D] text-[#D8CFBF]"
              : "hover:bg-[#EAE2D5] text-[#3D3126]"
          }`}
          title="Hộp thư Tin nhắn"
        >
          <MessageCircle className="w-5 h-5 stroke-[2]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D9534F] rounded-full ring-2 ring-[#FAF7F2] dark:ring-[#1E1B17]" />
        </button>

        {/* Notifications */}
        <button
          className={`relative p-2.5 rounded-full transition-all cursor-pointer ${
            isDark
              ? "hover:bg-[#28231D] text-[#D8CFBF]"
              : "hover:bg-[#EAE2D5] text-[#3D3126]"
          }`}
          title="Thông báo"
        >
          <Bell className="w-5 h-5 stroke-[2]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#786450] rounded-full ring-2 ring-[#FAF7F2] dark:ring-[#1E1B17]" />
        </button>

        {/* Theme Toggle (Crescent moon / Sun) */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2.5 rounded-full transition-all cursor-pointer ${
            isDark
              ? "hover:bg-[#28231D] text-[#F5C564]"
              : "hover:bg-[#EAE2D5] text-[#3D3126]"
          }`}
          title={isDark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Signature Champagne / Gold Pill Button */}
        <button
          onClick={() => setActiveTab("graph")}
          className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#F3D3A2] to-[#E6BA7A] text-[#3D2C1A] font-extrabold text-xs shadow-xs hover:opacity-95 transition cursor-pointer"
        >
          <span>Graph View</span>
          <Crown className="w-3.5 h-3.5 fill-[#3D2C1A]" />
        </button>

        {/* User Avatar */}
        <div
          onClick={() => setActiveTab("feed")}
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer ring-2 ring-[#786450]/30 hover:ring-[#786450] transition shrink-0 ml-1"
          title={currentUser?.profile.fullName}
        >
          <img
            src={currentUser?.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
