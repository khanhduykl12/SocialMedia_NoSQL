import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";
import { Network as NetworkIcon, RefreshCw, Info } from "lucide-react";
import { GraphNode, GraphEdge } from "../types";

interface Props {
  nodes: GraphNode[];
  edges: GraphEdge[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const SocialGraphExplorer: React.FC<Props> = ({
  nodes,
  edges,
  isLoading,
  onRefresh
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    if (!containerRef.current || nodes.length === 0) return;

    const visNodes = new DataSet(
      nodes.map((n) => ({
        id: n.id,
        label: n.label,
        shape: n.group === "community" ? "hexagon" : "dot",
        size: n.group === "community" ? 24 : 18,
        color:
          n.group === "community"
            ? { background: "#C7923E", border: "#A87627" }
            : { background: "#82725D", border: "#5C4F3F" },
        font: { color: "#2D261E", size: 11, face: "sans-serif" }
      }))
    );

    const visEdges = new DataSet(
      edges.map((e, idx) => ({
        id: idx,
        from: e.from,
        to: e.to,
        label: e.label === "FRIENDS_WITH" ? "Bạn bè" : "Tham gia",
        font: { color: "#8E8276", size: 9, align: "middle" },
        color: { color: e.label === "FRIENDS_WITH" ? "#B8ADA0" : "#D4AF37", opacity: 0.8 },
        width: 1.5,
        smooth: { type: "continuous" }
      }))
    );

    const data = { nodes: visNodes, edges: visEdges };
    const options = {
      physics: {
        stabilization: true,
        barnesHut: {
          gravitationalConstant: -2500,
          springConstant: 0.04,
          springLength: 90
        }
      },
      interaction: {
        hover: true,
        zoomView: true
      }
    };

    const network = new Network(containerRef.current, data as any, options);

    network.on("selectNode", (params) => {
      const nodeId = params.nodes[0];
      const clicked = nodes.find((n) => n.id === nodeId);
      setSelectedNode(clicked || null);
    });

    network.on("deselectNode", () => {
      setSelectedNode(null);
    });

    return () => {
      network.destroy();
    };
  }, [nodes, edges]);

  return (
    <div className="bg-white border border-[#EFE9DF] rounded-2xl p-5 shadow-sm relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <NetworkIcon className="w-5 h-5 text-[#82725D]" />
          <div>
            <h3 className="font-bold text-sm text-[#2D261E]">Sơ đồ liên kết bạn bè</h3>
            <p className="text-[11px] text-[#9C9082]">Trực quan hóa mạng lưới kết nối giữa các thành viên và câu lạc bộ</p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          className="p-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9DF] text-[#6B5E4F] border border-[#EFE9DF] transition cursor-pointer"
          title="Làm mới sơ đồ"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#82725D]" />
        </button>
      </div>

      <div className="relative w-full h-[500px] bg-[#FAF7F2] rounded-xl overflow-hidden border border-[#EFE9DF]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-[#9C9082]">
            Đang tải dữ liệu sơ đồ...
          </div>
        ) : (
          <div ref={containerRef} className="w-full h-full" />
        )}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-xl border border-[#EFE9DF] text-[11px] space-y-1 z-10 shadow-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#82725D] inline-block" />
            <span className="text-[#3C342C]">Bạn bè / Thành viên</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#C7923E] inline-block" />
            <span className="text-[#3C342C]">Câu lạc bộ sinh viên</span>
          </div>
        </div>

        {/* Node detail info box */}
        {selectedNode && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-[#EFE9DF] text-xs space-y-1 shadow-sm z-10 max-w-[200px]">
            <div className="flex items-center space-x-1 text-[#82725D] font-bold">
              <Info className="w-3.5 h-3.5" />
              <span>{selectedNode.label}</span>
            </div>
            <p className="text-[#9C9082] text-[10px]">Phân loại: {selectedNode.group === "community" ? "Câu lạc bộ" : "Thành viên"}</p>
            {selectedNode.city && <p className="text-[#9C9082] text-[10px]">Khu vực: {selectedNode.city}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
