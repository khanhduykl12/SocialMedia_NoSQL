import React, { useState } from "react";
import { User } from "../types";
import { X, ShieldCheck, UserCheck, ArrowRightLeft, Search, Check } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  allUsers: User[];
  onSelectUser: (user: User) => void;
  isDark: boolean;
}

export const AccountSwitcherModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  allUsers,
  onSelectUser,
  isDark
}) => {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredUsers = allUsers.filter(
    (u) =>
      u.profile.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      (u.profile.school && u.profile.school.toLowerCase().includes(search.toLowerCase())) ||
      (u.profile.workplace && u.profile.workplace.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition flex flex-col max-h-[85vh] ${
          isDark ? "bg-[#1A1714] border-[#383127] text-[#FAF7F2]" : "bg-white border-[#E5DCD0] text-[#1C1713]"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E5DCD0]/60 dark:border-[#383127]/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight font-['Outfit']">
                Chuyển Đổi Tài Khoản & Phân Quyền
              </h3>
              <p className="text-xs text-[#5A4D3E] dark:text-[#C5B8A8]">
                Kiểm thử giao diện giữa Admin và Người dùng thông thường
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#786450]/10 text-[#5A4D3E] dark:text-[#C5B8A8] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Card */}
        <div className="p-4 bg-[#FAF7F2] dark:bg-[#231F1A] border-b border-[#E5DCD0]/60 dark:border-[#383127]/60">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#786450] dark:text-[#E5B574] mb-2">
            Tài khoản hiện tại của bạn
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={currentUser?.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                alt={currentUser?.profile.fullName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/30"
              />
              <div>
                <h4 className="font-bold text-sm text-[#1C1713] dark:text-[#FAF7F2]">
                  {currentUser?.profile.fullName}
                </h4>
                <p className="text-xs text-[#5A4D3E] dark:text-[#C5B8A8]">
                  @{currentUser?.username || currentUser?._id} • {currentUser?.profile.workplace || "HUIT"}
                </p>
              </div>
            </div>

            {currentUser?.role === "admin" ? (
              <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quản trị viên (Admin)</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-[#786450]/15 text-[#786450] dark:text-[#E5B574] border border-[#786450]/30">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Thành viên (User)</span>
              </span>
            )}
          </div>

          <div className="mt-3 text-[11px] text-[#786450] dark:text-[#C5B8A8] leading-relaxed">
            {currentUser?.role === "admin"
              ? "✨ Bạn đang có quyền Admin: Xem trang Thống kê hệ thống, kiểm duyệt/xóa mọi bài viết."
              : "🔒 Bạn đang là Thành viên thông thường: Ẩn trang Thống kê hệ thống, chỉ quản lý bài viết của mình."}
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-[#E5DCD0]/60 dark:border-[#383127]/60">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#786450]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên sinh viên, khoa, trường..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs focus:outline-none border ${
                isDark
                  ? "bg-[#25201A] border-[#383127] text-white placeholder-[#8C7D6D]"
                  : "bg-[#FAF7F2] border-[#E5DCD0] text-[#1C1713] placeholder-[#7C6E5F]"
              }`}
            />
          </div>
        </div>

        {/* User List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1 scrollbar-thin">
          {filteredUsers.map((user) => {
            const isSelected = currentUser?._id === user._id;
            const isAdmin = user.role === "admin";

            return (
              <div
                key={user._id}
                onClick={() => {
                  onSelectUser(user);
                  onClose();
                }}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  isSelected
                    ? "bg-[#786450]/15 border-[#786450] dark:border-[#E5B574]"
                    : isDark
                    ? "bg-[#231F1A] border-[#383127] hover:border-[#786450]"
                    : "bg-[#FAF7F2] border-[#E5DCD0] hover:border-[#786450]"
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={user.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                    alt={user.profile.fullName}
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#786450]/30"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-xs truncate text-[#1C1713] dark:text-[#FAF7F2]">
                        {user.profile.fullName}
                      </h4>
                      {isAdmin ? (
                        <span className="text-[10px] px-2 py-0.2 rounded-full font-extrabold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40">
                          Admin
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.2 rounded-full font-semibold bg-[#786450]/10 text-[#786450] dark:text-[#C5B8A8]">
                          User
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5A4D3E] dark:text-[#C5B8A8] truncate">
                      @{user.username} • {user.profile.school || user.profile.workplace}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-2">
                  {isSelected ? (
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <button className="text-xs font-bold text-[#786450] dark:text-[#E5B574] hover:underline">
                      Chọn
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
