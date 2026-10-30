import React, { useState } from "react";
import { X, ArrowRight, Share2, Search, CheckCircle } from "lucide-react";
import { User } from "../types";
import { apiService } from "../services/api";

interface Props {
  users: User[];
  onClose: () => void;
}

export const DegreesOfSeparation: React.FC<Props> = ({ users, onClose }) => {
  const [fromUser, setFromUser] = useState("usr_101");
  const [toUser, setToUser] = useState("usr_108");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ chain: { id: string; name: string }[]; degrees: number } | null>(null);

  const handleFindPath = async () => {
    setLoading(true);
    try {
      const data = await apiService.getShortestPath(fromUser, toUser);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/80 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 text-amber-400 mb-1">
          <Share2 className="w-5 h-5" />
          <h3 className="font-bold text-lg text-slate-100 font-['Outfit']">Dò tìm đường kết nối bạn bè</h3>
        </div>
        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Tìm kiếm chuỗi mắt xích bạn chung ngắn nhất giúp kết nối giữa hai thành viên bất kỳ trong mạng lưới.
        </p>

        {/* User Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Người bắt đầu
            </label>
            <select
              value={fromUser}
              onChange={(e) => setFromUser(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.profile.fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Người muốn kết nối
            </label>
            <select
              value={toUser}
              onChange={(e) => setToUser(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.profile.fullName} ({u._id})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleFindPath}
          disabled={loading || fromUser === toUser}
          className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
        >
          <Search className="w-4 h-4" />
          <span>{loading ? "Đang dò tìm trên đồ thị..." : "Tìm đường kết nối"}</span>
        </button>

        {/* Results */}
        {result && (
          <div className="mt-5 p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-400">Kết quả tìm kiếm:</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 font-bold border border-amber-800">
                Khoảng cách: {result.degrees} bậc
              </span>
            </div>

            {/* Path Chain */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {result.chain && result.chain.length > 0 ? (
                result.chain.map((node, index) => (
                  <React.Fragment key={node.id}>
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200">
                      {node.name}
                    </div>
                    {index < result.chain.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <p className="text-xs text-slate-500">Chưa có liên kết trực tiếp giữa 2 người dùng này.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
