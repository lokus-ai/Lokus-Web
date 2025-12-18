"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Link2, GitBranch, Layers, Puzzle, Sparkles, Share2, Bold, Italic, List, Search } from "lucide-react";
import { StaticGraph } from "./static-graph";

function InteractiveFlowchart() {
  // Static paths without animation
  const path1 = "M 124 100 C 124 150, 224 170, 224 200";
  const path2 = "M 224 200 C 224 150, 364 110, 364 100";

  return (
    <div className="relative h-full w-full bg-zinc-950 rounded-xl border border-white/10 overflow-hidden shadow-2xl group/canvas">
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

      {/* Dynamic Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#52525b" />
          </marker>
        </defs>
        <path
          d={path1}
          stroke="#52525b"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
        <path
          d={path2}
          stroke="#52525b"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
      </svg>

      {/* Nodes */}
      {/* Node 1: Brainstorm */}
      <div className="absolute top-[60px] left-[60px] w-32 bg-zinc-900 border border-indigo-500/30 rounded-lg shadow-lg shadow-indigo-500/5 p-3 hover:border-indigo-500/60 transition-colors z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <span className="text-xs font-semibold text-zinc-200">Brainstorm</span>
        </div>
        <div className="space-y-1">
          <div className="h-1.5 w-full bg-zinc-800 rounded-full" />
          <div className="h-1.5 w-2/3 bg-zinc-800 rounded-full" />
        </div>
      </div>

      {/* Node 2: Research */}
      <div className="absolute top-[160px] left-[160px] w-32 bg-zinc-900 border border-emerald-500/30 rounded-lg shadow-lg shadow-emerald-500/5 p-3 hover:border-emerald-500/60 transition-colors z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-zinc-200">Research</span>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center">
            <Search className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-1.5 w-full bg-zinc-800 rounded-full" />
            <div className="h-1.5 w-full bg-zinc-800 rounded-full" />
            <div className="h-1.5 w-1/2 bg-zinc-800 rounded-full" />
          </div>
        </div>
      </div>

      {/* Node 3: Structure */}
      <div className="absolute top-[60px] left-[300px] w-32 bg-zinc-900 border border-amber-500/30 rounded-lg shadow-lg shadow-amber-500/5 p-3 hover:border-amber-500/60 transition-colors z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-semibold text-zinc-200">Structure</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-zinc-600" />
            <div className="h-1 w-full bg-zinc-800 rounded-full" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-zinc-600" />
            <div className="h-1 w-2/3 bg-zinc-800 rounded-full" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-zinc-600" />
            <div className="h-1 w-3/4 bg-zinc-800 rounded-full" />
          </div>
        </div>
      </div>

      {/* Canvas Controls */}
      <div className="absolute bottom-3 right-3 bg-zinc-900/90 backdrop-blur border border-white/10 rounded-lg p-1 flex gap-1 shadow-lg z-20">
        <div className="w-6 h-6 rounded hover:bg-white/5 flex items-center justify-center cursor-pointer text-zinc-400 hover:text-white transition-colors">
          <span className="text-xs font-medium">+</span>
        </div>
        <div className="w-6 h-6 rounded hover:bg-white/5 flex items-center justify-center cursor-pointer text-zinc-400 hover:text-white transition-colors">
          <span className="text-xs font-medium">-</span>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    id: "links",
    icon: Link2,
    title: "Links",
    description: "Create connections between your notes. Link anything to everything — ideas, people, places, books, and beyond. Build your own personal Wikipedia.",
    demo: (
      <div className="relative h-full w-full bg-zinc-950 rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <div className="flex gap-1.5 mr-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-2" />
            <div className="flex gap-1">
              <div className="p-1 rounded hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"><Bold className="w-3.5 h-3.5" /></div>
              <div className="p-1 rounded hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"><Italic className="w-3.5 h-3.5" /></div>
              <div className="p-1 rounded hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"><List className="w-3.5 h-3.5" /></div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-600">Markdown</div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 p-6 font-mono text-sm relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-white/5 bg-zinc-900/20 flex flex-col items-end pr-3 pt-6 text-zinc-700 select-none text-xs">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
          </div>
          <div className="pl-10 space-y-1.5">
            <div className="text-zinc-500"># Philosophy of Mind</div>
            <div className="h-2" />
            <div className="text-zinc-300">
              In <span className="text-indigo-400">[[Meditations on First Philosophy]]</span>,
            </div>
            <div className="text-zinc-300">
              René Descartes argues for <span className="text-indigo-400">[[Dualism]]</span>.
            </div>
            <div className="h-2" />
            <div className="text-zinc-300">
              He famously stated:
            </div>
            <div className="pl-4 border-l-2 border-zinc-700 text-zinc-400 italic">
              "Cogito, ergo sum"
            </div>
            <div className="h-2" />
            <div className="text-zinc-300 flex items-center gap-2">
              This connects to <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs">@Consciousness</span>
              <span className="w-1.5 h-4 bg-indigo-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 bg-zinc-900/50 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-500">
          <div>Ln 7, Col 42</div>
          <div>UTF-8</div>
        </div>
      </div>
    )
  },
  {
    id: "graph",
    icon: GitBranch,
    title: "Graph",
    description: "Visualize the relationships between your notes. Find hidden patterns in your thinking through a visually engaging and interactive graph.",
    demo: (
      <div className="relative h-full w-full bg-zinc-950 rounded-xl border border-white/10 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <StaticGraph width={200} height={200} />
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <div className="bg-zinc-950/90 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-xl">
            <p className="text-xs text-zinc-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              14 notes • 17 connections
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "canvas",
    icon: Layers,
    title: "Canvas",
    description: "An infinite space to research, brainstorm, diagram, and lay out your ideas. Canvas is a limitless playground for your mind.",
    demo: <InteractiveFlowchart />
  },
  {
    id: "plugins",
    icon: Puzzle,
    title: "Plugins",
    description: "Build your ideal thinking space. With powerful plugins and extensibility, it's easy to tailor Lokus to fit your personal workflow.",
    demo: (
      <div className="relative h-full w-full bg-zinc-900/50 backdrop-blur-xl rounded-lg p-6 overflow-hidden flex flex-col justify-center">
        <div className="space-y-3 relative z-10">
          {/* Plugin items */}
          <div className="flex items-center gap-3 bg-zinc-800/80 backdrop-blur-sm rounded-xl p-3 border border-white/5 shadow-lg group/plugin cursor-pointer hover:translate-x-1 transition-all">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-zinc-200 group-hover/plugin:text-white transition-colors">Claude MCP</p>
              <p className="text-[10px] text-zinc-500 group-hover/plugin:text-zinc-400 transition-colors">AI-powered assistance</p>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
              Active
            </div>
          </div>

          <div className="flex items-center gap-3 bg-zinc-800/80 backdrop-blur-sm rounded-xl p-3 border border-white/5 shadow-lg group/plugin cursor-pointer hover:translate-x-1 transition-all">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Share2 className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-zinc-200 group-hover/plugin:text-white transition-colors">Graph Analysis</p>
              <p className="text-[10px] text-zinc-500 group-hover/plugin:text-zinc-400 transition-colors">Advanced visualization</p>
            </div>
            <div className="w-8 h-4 bg-zinc-700 rounded-full relative">
              <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-zinc-400 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-zinc-800/80 backdrop-blur-sm rounded-xl p-3 border border-white/5 shadow-lg group/plugin cursor-pointer hover:translate-x-1 transition-all">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-zinc-200 group-hover/plugin:text-white transition-colors">Smart Templates</p>
              <p className="text-[10px] text-zinc-500 group-hover/plugin:text-zinc-400 transition-colors">Boost productivity</p>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-medium border border-blue-500/20">
              Update
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 top-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    )
  }
];

export function SparkIdeas({ className }: { className?: string }) {
  return (
    <section className={cn("relative py-32 bg-black overflow-hidden", className)}>
      {/* Subtle background */}
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px]" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Spark <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">ideas.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            From personal notes to research, knowledge bases, and project management,
            Lokus gives you the tools to come up with ideas and organize them.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div key={feature.id} className="group">
                <div className="relative h-full bg-zinc-900/20 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col">
                  {/* Header */}
                  <div className="p-8 pb-0">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="p-3.5 bg-zinc-800/50 rounded-2xl border border-white/5 group-hover:bg-zinc-800 transition-colors shadow-inner">
                        <Icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-zinc-100 group-hover:text-white transition-colors">{feature.title}</h3>
                        <p className="text-zinc-400 leading-relaxed text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Demo Area */}
                  <div className="relative flex-1 min-h-[280px] mx-6 mb-6 mt-4 group-hover:scale-[1.02] transition-transform ease-out">
                    {feature.demo}
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}