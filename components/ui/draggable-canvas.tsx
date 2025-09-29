"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface CanvasNode {
  id: string;
  x: number;
  y: number;
  title: string;
  content: string;
  color?: string;
}

export function DraggableCanvas() {
  const [nodes, setNodes] = useState<CanvasNode[]>([
    {
      id: "node1",
      x: 10,
      y: 10,
      title: "Project Ideas",
      content: "• Mobile app\n• API design\n• Database schema"
    },
    {
      id: "node2",
      x: 180,
      y: 10,
      title: "Research Notes",
      content: "Key findings from\nuser interviews"
    },
    {
      id: "node3",
      x: 95,
      y: 120,
      title: "Meeting Notes",
      content: "Q1 Planning Session\nAction items: 5"
    }
  ]);

  const handleDrag = (id: string, info: { point: { x: number; y: number } }) => {
    setNodes(nodes.map(node => 
      node.id === id 
        ? { ...node, x: info.point.x, y: info.point.y }
        : node
    ));
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 20px)'
        }} />
      </div>


      {/* Draggable nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          drag
          dragMomentum={false}
          onDrag={(e, info) => handleDrag(node.id, info)}
          className="absolute bg-gray-800 rounded p-3 shadow-lg border border-gray-700 cursor-move hover:border-gray-600 transition-colors"
          style={{ x: node.x, y: node.y }}
          whileHover={{ scale: 1.05 }}
          whileDrag={{ scale: 1.1, zIndex: 10 }}
        >
          <h4 className="text-xs font-semibold text-gray-300 mb-1">{node.title}</h4>
          <p className="text-[10px] text-gray-400 whitespace-pre-line">{node.content}</p>
        </motion.div>
      ))}
    </div>
  );
}