import React from "react";
import { SocialGraphExplorer } from "../components/SocialGraphExplorer";
import { GraphNode, GraphEdge } from "../types";
import { Share2 } from "lucide-react";

interface Props {
  nodes: GraphNode[];
  edges: GraphEdge[];
  isLoading: boolean;
  onRefresh: () => void;
  onOpenDegrees: () => void;
}

export const GraphPage: React.FC<Props> = ({
  nodes,
  edges,
  isLoading,
  onRefresh,
  onOpenDegrees
}) => {
  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#1C1713] dark:text-slate-100 font-['Outfit']">
            Sơ đồ mạng lưới kết nối bạn bè
          </h2>
          <p className="text-xs text-[#5A4D3E] dark:text-slate-400 mt-1">
            Mỗi nút đại diện cho một người bạn hoặc câu lạc bộ, các đường liên kết biểu thị mối quan hệ kết nối giữa các thành viên.
          </p>
        </div>

        <button
          onClick={onOpenDegrees}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20"
        >
          <Share2 className="w-4 h-4" />
          <span>Tìm đường nối 6 bậc</span>
        </button>
      </div>

      <SocialGraphExplorer
        nodes={nodes}
        edges={edges}
        isLoading={isLoading}
        onRefresh={onRefresh}
      />
    </div>
  );
};
