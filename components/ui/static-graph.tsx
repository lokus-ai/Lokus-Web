"use client";

import React from "react";

// Pre-calculated node positions for a beautiful, balanced graph layout
const nodes = [
  { id: "Lokus", x: 100, y: 100, size: 12, color: "#818cf8", group: "center" },
  { id: "Notes", x: 45, y: 55, size: 8, color: "#a78bfa", group: "feature" },
  { id: "Links", x: 155, y: 45, size: 8, color: "#a78bfa", group: "feature" },
  { id: "Graph", x: 170, y: 110, size: 8, color: "#a78bfa", group: "feature" },
  { id: "Canvas", x: 150, y: 165, size: 8, color: "#a78bfa", group: "feature" },
  { id: "Plugins", x: 50, y: 155, size: 8, color: "#a78bfa", group: "feature" },
  { id: "Search", x: 30, y: 105, size: 8, color: "#a78bfa", group: "feature" },
  { id: "Ideas", x: 15, y: 30, size: 5, color: "#6366f1", group: "concept" },
  { id: "Knowledge", x: 185, y: 75, size: 5, color: "#6366f1", group: "concept" },
  { id: "Projects", x: 175, y: 145, size: 5, color: "#6366f1", group: "concept" },
  { id: "Research", x: 120, y: 180, size: 5, color: "#6366f1", group: "concept" },
  { id: "Tasks", x: 60, y: 185, size: 5, color: "#6366f1", group: "concept" },
  { id: "Archive", x: 10, y: 140, size: 5, color: "#6366f1", group: "concept" },
];

const links = [
  { source: "Lokus", target: "Notes" },
  { source: "Lokus", target: "Links" },
  { source: "Lokus", target: "Graph" },
  { source: "Lokus", target: "Canvas" },
  { source: "Lokus", target: "Plugins" },
  { source: "Lokus", target: "Search" },
  { source: "Notes", target: "Ideas" },
  { source: "Notes", target: "Tasks" },
  { source: "Links", target: "Knowledge" },
  { source: "Links", target: "Research" },
  { source: "Ideas", target: "Knowledge" },
  { source: "Canvas", target: "Projects" },
  { source: "Graph", target: "Knowledge" },
  { source: "Search", target: "Archive" },
  { source: "Research", target: "Projects" },
  { source: "Projects", target: "Tasks" },
  { source: "Plugins", target: "Archive" },
];

function getNodeById(id: string) {
  return nodes.find(n => n.id === id)!;
}

export function StaticGraph({ width = 200, height = 200 }: { width?: number; height?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(99, 102, 241, 0.15))" }}
    >
      <defs>
        {/* Gradient for links */}
        <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.3" />
        </linearGradient>

        {/* Glow filter for center node */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Subtle pulse animation */}
        <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background subtle grid */}
      <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#374151" strokeWidth="0.3" opacity="0.3"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#smallGrid)" opacity="0.5"/>

      {/* Links */}
      <g className="links">
        {links.map((link, i) => {
          const source = getNodeById(link.source);
          const target = getNodeById(link.target);
          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="url(#linkGradient)"
              strokeWidth="1.5"
              className="opacity-60"
            />
          );
        })}
      </g>

      {/* Nodes */}
      <g className="nodes">
        {nodes.map((node, i) => (
          <g key={node.id}>
            {/* Node glow/halo effect */}
            {node.group === "center" && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size + 8}
                fill={node.color}
                opacity="0.15"
                className="animate-pulse"
                style={{ animationDuration: "3s" }}
              />
            )}

            {/* Main node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              filter={node.group === "center" ? "url(#glow)" : undefined}
              className={node.group === "feature" ? "opacity-90" : "opacity-80"}
            />

            {/* Inner highlight */}
            <circle
              cx={node.x - node.size * 0.25}
              cy={node.y - node.size * 0.25}
              r={node.size * 0.3}
              fill="white"
              opacity="0.3"
            />
          </g>
        ))}
      </g>

      {/* Labels for main nodes */}
      <g className="labels">
        {nodes.filter(n => n.group !== "concept").map((node) => (
          <text
            key={`label-${node.id}`}
            x={node.x}
            y={node.y - node.size - 4}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="6"
            fontWeight="500"
            className="select-none"
          >
            {node.id}
          </text>
        ))}
      </g>
    </svg>
  );
}
