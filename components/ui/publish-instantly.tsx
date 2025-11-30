"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Edit3, Search, Zap, FileText, Code, Brain, Network, Command, Sparkles } from "lucide-react";

const features = [
  {
    id: "editing",
    icon: Edit3,
    title: "Rich Text Editor",
    description: "Powerful TipTap-based editor with markdown support, math equations via KaTeX, and seamless writing experience.",
    visual: (
      <div className="relative h-full w-full bg-zinc-900/50 backdrop-blur-xl rounded-lg overflow-hidden flex flex-col">
        {/* Header with file info */}
        <div className="bg-zinc-950/50 border-b border-white/5 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-zinc-300 font-medium">research-notes.md</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-xs text-zinc-500">Saved</span>
          </div>
        </div>

        {/* Editor toolbar */}
        <div className="bg-zinc-900/30 border-b border-white/5 px-4 py-2 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="w-8 h-8 flex items-center justify-center text-zinc-400 rounded transition-colors"
            >
              <span className="font-bold text-sm font-serif">B</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="w-8 h-8 flex items-center justify-center text-zinc-400 rounded transition-colors"
            >
              <span className="italic text-sm font-serif">I</span>
            </motion.button>
            <div className="w-px h-4 bg-white/10 mx-2" />
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="w-8 h-8 flex items-center justify-center text-zinc-400 rounded transition-colors"
            >
              <Code className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Split view editor */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left side - Raw markdown */}
          <div className="flex-1 bg-zinc-950/30 p-6 border-r border-white/5 font-mono text-sm overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 leading-relaxed"
            >
              <div className="text-indigo-400"># Mathematical Concepts</div>
              <div className="text-zinc-500">
                <span className="text-zinc-300">The quadratic formula: </span>
                <span className="text-pink-400">$x = (-b ± √(b²-4ac))/2a$</span>
              </div>
              <div className="text-zinc-500">
                <span className="text-zinc-300">This connects to </span>
                <span className="text-indigo-400">[[Linear Algebra]]</span>
                <span className="text-zinc-300"> and </span>
                <span className="text-indigo-400">[[Calculus]]</span>
                <span className="text-zinc-500">...</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Rendered output */}
          <div className="flex-1 bg-zinc-900/20 p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Header */}
              <h1 className="text-2xl font-bold text-white border-b border-white/5 pb-4">
                Mathematical Concepts
              </h1>

              {/* Content */}
              <div className="space-y-4">
                <p className="text-zinc-300 text-sm">
                  The quadratic formula:
                </p>

                {/* KaTeX Math Rendering */}
                <div className="bg-zinc-950/50 border border-white/5 rounded-lg p-6 my-4 flex justify-center">
                  <div className="text-zinc-200 font-serif text-xl">
                    x = (-b ± √(b²-4ac))/2a
                  </div>
                </div>

                <p className="text-zinc-500 text-sm">
                  This connects to <span className="text-indigo-400 cursor-pointer hover:underline decoration-indigo-400/30 underline-offset-4">Linear Algebra</span> and <span className="text-indigo-400 cursor-pointer hover:underline decoration-indigo-400/30 underline-offset-4">Calculus</span>...
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "search",
    icon: Search,
    title: "Universal Search",
    description: "Find anything instantly with fuzzy search across all your notes, tags, and content. Search by title, content, or connections.",
    visual: (
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-zinc-950/50">
        {/* Blurred background with fake content */}
        <div className="absolute inset-0 p-8 opacity-20">
          <div className="space-y-4">
            <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
            <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
            <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
            <div className="space-y-2 mt-8">
              <div className="h-3 bg-zinc-800 rounded w-full"></div>
              <div className="h-3 bg-zinc-800 rounded w-4/5"></div>
              <div className="h-3 bg-zinc-800 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

        {/* Command palette centered */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5">
              <Search className="w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value="machine learn"
                readOnly
                className="bg-transparent text-zinc-200 placeholder-zinc-600 outline-none flex-1 text-lg font-medium"
                placeholder="Search anything..."
              />
              <div className="px-2 py-1 bg-white/5 rounded text-xs text-zinc-500 font-mono border border-white/5">
                ⌘K
              </div>
            </div>

            {/* Command results */}
            <div className="p-2 max-h-80 overflow-auto">
              <div className="space-y-1">
                {/* Files section */}
                <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Files</div>
                <motion.div
                  className="flex items-center gap-3 px-3 py-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 cursor-pointer"
                  whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.15)" }}
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <div className="flex-1">
                    <div className="text-zinc-200 text-sm font-medium">Neural Networks.md</div>
                    <div className="text-zinc-500 text-xs">...deep learning and <span className="text-indigo-400 font-medium">machine learn</span>ing algorithms</div>
                  </div>
                  <div className="text-xs text-zinc-500">⏎</div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4 text-zinc-500" />
                  <div className="flex-1">
                    <div className="text-zinc-300 text-sm font-medium">AI Research.md</div>
                    <div className="text-zinc-500 text-xs">Latest <span className="text-indigo-400 font-medium">machine learn</span>ing developments</div>
                  </div>
                </motion.div>

                {/* Commands section */}
                <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-2">Commands</div>
                <motion.div
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="w-4 h-4 flex items-center justify-center text-zinc-500">
                    <Command className="w-3 h-3" />
                  </div>
                  <div className="flex-1">
                    <div className="text-zinc-300 text-sm font-medium">Create New Note</div>
                    <div className="text-zinc-500 text-xs">Start a new markdown document</div>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">⌘N</div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="w-4 h-4 flex items-center justify-center text-zinc-500">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div className="flex-1">
                    <div className="text-zinc-300 text-sm font-medium">Ask AI Assistant</div>
                    <div className="text-zinc-500 text-xs">Get help with your notes</div>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">⌘L</div>
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-950/30 border-t border-white/5 text-[10px] text-zinc-500">
              <span>8 results found</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="bg-white/10 px-1 rounded">↑↓</span> navigate</span>
                <span className="flex items-center gap-1"><span className="bg-white/10 px-1 rounded">⏎</span> select</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: "performance",
    icon: Zap,
    title: "Native Performance",
    description: "Built with Tauri and Rust for lightning-fast startup, minimal resource usage, and smooth experience even with thousands of notes.",
    visual: (
      <div className="relative h-full w-full bg-zinc-950/50 backdrop-blur-xl rounded-lg overflow-hidden flex flex-col">
        {/* Performance Monitor Interface */}
        <div className="p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-zinc-200 text-sm font-medium tracking-wide">SYSTEM MONITOR</span>
            </div>
            <div className="text-xs text-zinc-500 font-mono">v1.2.0-rc1</div>
          </div>

          {/* Real-time metrics */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* CPU Usage */}
            <div className="bg-zinc-900/50 rounded-xl p-5 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="text-xs font-bold text-zinc-500 tracking-wider">CPU</span>
                <span className="text-sm text-emerald-400 font-mono font-bold">3.2%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 relative z-10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "3.2%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                />
              </div>
            </div>

            {/* Memory Usage */}
            <div className="bg-zinc-900/50 rounded-xl p-5 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="text-xs font-bold text-zinc-500 tracking-wider">RAM</span>
                <span className="text-sm text-blue-400 font-mono font-bold">42MB</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 relative z-10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "8%" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* Performance stats */}
          <div className="space-y-3">
            {[
              { label: "Startup Time", value: "0.8s", icon: Zap, color: "text-amber-400" },
              { label: "Search Index", value: "2,847 notes", icon: Search, color: "text-purple-400" },
              { label: "Response Time", value: "<10ms", icon: Network, color: "text-emerald-400" },
              { label: "Native APIs", value: "Enabled", icon: Code, color: "text-blue-400" }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-zinc-900/30 border border-white/5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4", stat.color)} />
                    <span className="text-sm text-zinc-300">{stat.label}</span>
                  </div>
                  <span className={cn("text-sm font-mono font-medium", stat.color)}>{stat.value}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Technology badges */}
          <div className="mt-auto pt-6 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
              <span className="text-[10px] text-orange-400 font-bold tracking-wide uppercase">Rust</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span className="text-[10px] text-blue-400 font-bold tracking-wide uppercase">Tauri</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              <span className="text-[10px] text-purple-400 font-bold tracking-wide uppercase">Native</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export function PowerfulFeatures({ className }: { className?: string }) {
  const [activeFeature, setActiveFeature] = useState("editing");

  return (
    <section className={cn("relative py-32 bg-black overflow-hidden", className)}>
      {/* Background Glow */}
      <div className="absolute left-0 bottom-1/4 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">thinking.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Professional-grade tools for note-taking, research, and knowledge management.
            Fast, reliable, and completely offline.
          </p>
        </motion.div>

        {/* Interactive Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  className={cn(
                    "group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border",
                    isActive
                      ? "bg-white/5 border-white/10 shadow-xl backdrop-blur-sm"
                      : "bg-transparent border-transparent hover:bg-white/[0.02]"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="featuresActiveIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-purple-500 rounded-r shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-xl transition-all duration-300",
                      isActive ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-zinc-500 group-hover:text-zinc-300"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={cn(
                        "text-lg font-semibold mb-2 transition-colors",
                        isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                      )}>
                        {feature.title}
                      </h3>
                      <p className={cn(
                        "text-sm leading-relaxed transition-colors",
                        isActive ? "text-zinc-300" : "text-zinc-500"
                      )}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dynamic Visual */}
          <div className="relative lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative bg-black/40 border border-white/10 rounded-3xl overflow-hidden h-[600px] shadow-2xl backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

              <AnimatePresence mode="wait">
                {features.map((feature) =>
                  activeFeature === feature.id && (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 p-1"
                    >
                      {feature.visual}
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}