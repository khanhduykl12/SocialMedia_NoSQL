import React, { useEffect, useState } from "react";
import { BarChart3, Users, Film, FileText, Sparkles, Award, ShieldAlert, ArrowRightLeft } from "lucide-react";
import { apiService } from "../services/api";
import { User } from "../types";

interface Props {
  currentUser?: User | null;
  onSwitchToAdmin?: () => void;
}

export const AdminPage: React.FC<Props> = ({ currentUser, onSwitchToAdmin }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.role !== "admin") return;
    apiService
      .getAnalytics()
      .then((res) => setData(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentUser]);

  // Kiểm tra phân quyền: Nếu không phải Admin, chặn truy cập
  if (currentUser && currentUser.role !== "admin") {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 font-['Outfit'] mb-2">
            Khu Vực Dành Riêng Cho Quản Trị Viên
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
            Bạn đang đăng nhập với vai trò <span className="text-amber-400 font-bold">Thành viên thông thường ({currentUser.profile.fullName})</span>. 
            Phân hệ Thống kê hệ thống và Giám sát cơ sở dữ liệu chỉ được cấp quyền cho tài khoản <span className="text-sky-400 font-bold">Quản trị viên (Nguyễn Khánh Duy)</span>.
          </p>
          {onSwitchToAdmin && (
            <button
              onClick={onSwitchToAdmin}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Chuyển sang tài khoản Quản trị viên (Duy)</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-xs text-slate-500 animate-pulse">
        Đang tổng hợp số liệu thống kê hệ thống...
      </div>
    );
  }

  const stats = data?.stats || { totalUsers: 6, totalPosts: 2, totalReels: 2, totalStories: 2 };
  const influencers = data?.influencers || [];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-8">
      <div>
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center space-x-2.5">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          <span>Bảng Điều Khiển Quản Trị & Thống Kê Tương Tác</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Đo lường các chỉ số tương tác và mức độ kết nối cộng đồng trên toàn mạng xã hội.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Tổng thành viên</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{stats.totalUsers}</p>
          <span className="text-[10px] text-sky-400">Tài khoản hoạt động</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Bài viết Bảng tin</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{stats.totalPosts}</p>
          <span className="text-[10px] text-emerald-400">Nội dung đã chia sẻ</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Video Reels</span>
            <Film className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{stats.totalReels}</p>
          <span className="text-[10px] text-pink-400">Video ngắn nổi bật</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Tin Stories</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{stats.totalStories}</p>
          <span className="text-[10px] text-purple-400">Khoảnh khắc 24 giờ</span>
        </div>
      </div>

      {/* Top Influencers */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm text-slate-100">
            Thành Viên Nổi Bật Được Kết Nối Nhiều Nhất
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          Xếp hạng dựa trên số lượng bạn bè và cộng đồng tham gia để xác định những tài khoản có sức lan tỏa kết nối rộng nhất.
        </p>

        <div className="space-y-3">
          {influencers.map((inf: any, idx: number) => (
            <div
              key={inf.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800"
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-xs text-slate-100">{inf.fullName}</h4>
                  <p className="text-[10px] text-slate-400">
                    {inf.friendCount} bạn bè • {inf.groupCount} CLB tham gia
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-extrabold text-amber-400">
                  {inf.influenceScore || inf.friendCount * 2 + inf.groupCount}
                </span>
                <span className="text-[10px] text-slate-500 block">Điểm ảnh hưởng</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
