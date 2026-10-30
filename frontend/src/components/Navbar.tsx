import React, { useState, useEffect, useRef } from "react";
import { Search, Bell, Sun, Moon, Sparkles, MessageCircle, Crown, Network, Compass, Users, CheckCheck } from "lucide-react";
import { User, Notification } from "../types";
import { apiService } from "../services/api";

interface Props {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChat: () => void;
  onOpenAccountSwitcher?: () => void;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}

export const Navbar: React.FC<Props> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenChat,
  onOpenAccountSwitcher,
  isDark,
  setIsDark
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifs = () => {
    apiService
      .getNotifications()
      .then((data) => setNotifications(data))
      .catch(() => null);
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
    };
    if (showNotifs) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifs]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    notifications.forEach((n) => {
      if (!n.isRead) {
        apiService.markNotificationAsRead(n._id).catch(() => null);
      }
    });
  };

  const handleNotificationClick = (n: Notification) => {
    if (!n.isRead) {
      setNotifications((prev) =>
        prev.map((item) => (item._id === n._id ? { ...item, isRead: true } : item))
      );
      apiService.markNotificationAsRead(n._id).catch(() => null);
    }
    setShowNotifs(false);
    if (n.type === "FRIEND_REQUEST" || n.type === "FRIEND_ACCEPT" || n.type === "GROUP_INVITE") {
      setActiveTab("friends");
    } else {
      setActiveTab("feed");
    }
  };

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

      {/* 2. CENTER: Curved Search Capsule */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div
          className={`flex items-center w-full px-4 py-2 rounded-full border transition-all ${
            isDark
              ? "bg-[#14120F] border-[#2E2820] text-[#FAF7F2] focus-within:border-[#786450]"
              : "bg-white border-[#E5DCD0] text-[#1C1713] focus-within:border-[#786450]"
          }`}
        >
          <Search className="w-4 h-4 text-[#786450] dark:text-[#A89D8E] mr-2.5 shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm bạn bè, bài viết hoặc câu lạc bộ..."
            className="w-full bg-transparent text-xs focus:outline-none placeholder:text-[#A89D8E] font-medium"
          />
        </div>
      </div>

      {/* 3. RIGHT: Actions & User Avatar */}
      <div className="flex items-center space-x-2.5">
        {/* Messages Shortcut */}
        <button
          onClick={() => {
            setActiveTab("messages");
            onOpenChat();
          }}
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

        {/* Notifications Button with Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className={`relative p-2.5 rounded-full transition-all cursor-pointer ${
              showNotifs
                ? "bg-[#786450] text-white"
                : isDark
                ? "hover:bg-[#28231D] text-[#D8CFBF]"
                : "hover:bg-[#EAE2D5] text-[#3D3126]"
            }`}
            title="Thông báo"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#D9534F] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-[#FAF7F2] dark:ring-[#1E1B17]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifs && (
            <div
              className={`absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border shadow-2xl overflow-hidden z-50 animate-fade-in ${
                isDark
                  ? "bg-[#1E1B17] border-[#383127] text-[#FAF7F2]"
                  : "bg-white border-[#E5DCD0] text-[#1C1713]"
              }`}
            >
              {/* Header */}
              <div className="p-3.5 border-b border-inherit flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h4 className="font-extrabold text-sm">Thông báo</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#786450] text-white font-bold">
                      {unreadCount} mới
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-[#786450] dark:text-[#E5B574] hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Đọc tất cả</span>
                  </button>
                )}
              </div>

              {/* Notification Items */}
              <div className="max-h-[380px] overflow-y-auto divide-y divide-inherit">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#7C6E5F] dark:text-[#A89D8E]">
                    Chưa có thông báo nào
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      onClick={() => handleNotificationClick(n)}
                      className={`p-3 flex items-start space-x-3 cursor-pointer transition ${
                        !n.isRead
                          ? isDark
                            ? "bg-[#28231D]/80 hover:bg-[#28231D]"
                            : "bg-[#F7F2EB] hover:bg-[#EFE7DC]"
                          : isDark
                          ? "hover:bg-[#28231D]/50"
                          : "hover:bg-[#F7F2EB]"
                      }`}
                    >
                      <img
                        src={
                          n.senderAvatar ||
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                        }
                        alt="Sender"
                        className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-[#786450]/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-snug line-clamp-2">
                          <span className="font-bold">{n.senderName || "Người dùng"}</span>{" "}
                          <span className="text-[#5A4D3E] dark:text-[#C5B8A8] font-normal">
                            {n.message.replace(n.senderName || "", "")}
                          </span>
                        </p>
                        <span className="text-[10px] text-[#8C7D6B] dark:text-[#A89D8E] mt-1 block font-medium">
                          Vừa xong
                        </span>
                      </div>
                      {!n.isRead && (
                        <div className="w-2 h-2 rounded-full bg-[#786450] shrink-0 mt-2" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

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
          <span>Sơ đồ bạn bè</span>
          <Crown className="w-3.5 h-3.5 fill-[#3D2C1A]" />
        </button>

        {/* User Avatar & Account Switcher Button */}
        <div
          onClick={onOpenAccountSwitcher || (() => setActiveTab("feed"))}
          className="flex items-center space-x-1.5 p-1 rounded-full hover:bg-[#786450]/10 transition cursor-pointer group"
          title="Bấm để chuyển đổi tài khoản người dùng"
        >
          <div className="relative">
            <div className={`w-9 h-9 rounded-full overflow-hidden ring-2 transition ${
              currentUser?.role === "admin"
                ? "ring-amber-500 shadow-xs shadow-amber-500/20"
                : "ring-[#786450]/30 group-hover:ring-[#786450]"
            }`}>
              <img
                src={currentUser?.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {currentUser?.role === "admin" && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center ring-1 ring-white">
                ★
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
