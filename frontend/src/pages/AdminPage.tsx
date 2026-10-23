import React, { useEffect, useState } from "react";
import { BarChart3, Users, Film, FileText, Sparkles, Award } from "lucide-react";
import { apiService } from "../services/api";

export const AdminPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService
      .getAnalytics()
      .then((res) => setData(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-xs text-slate-500 animate-pulse">
        Đang tổng hợp dữ liệu Analytics từ Neo4j & MongoDB...
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
          <span>Bảng Điều Khiển Quản Trị & Graph Analytics</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Đo lường các chỉ số tương tác và tầm ảnh hưởng mạng xã hội dựa trên cấu trúc đồ thị NoSQL.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Tổng Users</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{stats.totalUsers}</p>
          <span className="text-[10px] text-sky-400">Node :User trong Neo4j</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Bài viết Bảng tin</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{stats.totalPosts}</p>
          <span className="text-[10px] text-emerald-400">Collection posts (MongoDB)</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Video Reels</span>
            <Film className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{stats.totalReels}</p>
          <span className="text-[10px] text-pink-400">Video ngắn dọc TikTok</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Stories 24h</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{stats.totalStories}</p>
          <span className="text-[10px] text-purple-400">MongoDB TTL Index</span>
        </div>
      </div>

      {/* Top Influencers (Degree Centrality) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm text-slate-100">
            Bảng Xếp Hạng Top Influencers (Độ Tụ Mạng - Degree Centrality)
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          Tính toán số lượng kết nối trực tiếp (Bạn bè + Tham gia hội nhóm) để xác định người dùng có tầm ảnh hưởng lan truyền lớn nhất trên đồ thị.
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
