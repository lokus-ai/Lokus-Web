"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Edit3, Search, Zap, FileText, Code, Brain, Network } from "lucide-react";

const features = [
  {
    id: "editing",
    icon: Edit3,
    title: "Rich Text Editor",
    description: "Powerful TipTap-based editor with markdown support, math equations via KaTeX, and seamless writing experience.",
    visual: (
      <div className="relative h-full w-full bg-[#1e1e1e] rounded-lg overflow-hidden">
        {/* Header with file info */}
        <div className="bg-[#2a2a2a] border-b border-[#3a3a3a] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#7c3aed]" />
            <span className="text-sm text-[#dcddde] font-medium">research-notes.md</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs text-[#888888]">Saved</span>
          </div>
        </div>

        {/* Editor toolbar */}
        <div className="bg-[#2a2a2a] border-b border-[#3a3a3a] px-4 py-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              className="w-6 h-6 flex items-center justify-center text-[#888888] hover:text-[#dcddde] hover:bg-[#3a3a3a] rounded"
            >
              <span className="font-bold text-sm">B</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              className="w-6 h-6 flex items-center justify-center text-[#888888] hover:text-[#dcddde] hover:bg-[#3a3a3a] rounded"
            >
              <span className="italic text-sm">I</span>
            </motion.button>
          </div>
        </div>

        {/* Split view editor */}
        <div className="flex h-[calc(100%-80px)]">
          {/* Left side - Raw markdown */}
          <div className="flex-1 bg-[#1e1e1e] p-4 border-r border-[#3a3a3a] font-mono text-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-3 leading-relaxed"
            >
              <div className="text-[#7c9cc9]"># Mathematical Concepts</div>
              <div className="text-[#888888]">
                <span className="text-[#dcddde]">The quadratic formula: </span>
                <span className="text-[#ff6b9d]">$x = (-b ± √(b²-4ac))/2a$</span>
              </div>
              <div className="text-[#888888]">
                <span className="text-[#dcddde]">This connects to </span>
                <span className="text-[#7c3aed]">[[Linear Algebra]]</span>
                <span className="text-[#dcddde]"> and </span>
                <span className="text-[#7c3aed]">[[Calculus]]</span>
                <span className="text-[#888888]">...</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Rendered output */}
          <div className="flex-1 bg-[#1e1e1e] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Header */}
              <h1 className="text-xl font-bold text-[#dcddde] border-b border-[#3a3a3a] pb-2">
                Mathematical Concepts
              </h1>

              {/* Content */}
              <div className="space-y-3">
                <p className="text-[#dcddde] text-sm">
                  The quadratic formula: 
                </p>
                
                {/* KaTeX Math Rendering */}
                <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-3 my-3">
                  <div className="text-xs text-[#888888] mb-2">⟨⟩ KaTeX Math Rendering</div>
                  <div className="text-center text-[#dcddde] font-serif text-lg">
                    x = (-b ± √(b²-4ac))/2a
                  </div>
                </div>

                <p className="text-[#888888] text-sm">
                  This connects to <span className="text-[#7c3aed] cursor-pointer hover:underline">Linear Algebra</span> and <span className="text-[#7c3aed] cursor-pointer hover:underline">Calculus</span>...
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
      <div className="relative h-full w-full overflow-hidden">
        {/* Blurred background with fake content */}
        <div className="absolute inset-0 bg-[#1e1e1e] p-4">
          <div className="space-y-3 text-[#888888] text-sm">
            <div className="h-4 bg-[#2a2a2a] rounded w-3/4"></div>
            <div className="h-4 bg-[#2a2a2a] rounded w-1/2"></div>
            <div className="h-4 bg-[#2a2a2a] rounded w-5/6"></div>
            <div className="h-4 bg-[#2a2a2a] rounded w-2/3"></div>
            <div className="space-y-2 mt-6">
              <div className="h-3 bg-[#2a2a2a] rounded w-full"></div>
              <div className="h-3 bg-[#2a2a2a] rounded w-4/5"></div>
              <div className="h-3 bg-[#2a2a2a] rounded w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-md bg-black/50"></div>

        {/* Command palette centered */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-[#2a2a2a]/95 backdrop-blur-xl border border-[#3a3a3a] rounded-2xl w-full max-w-lg shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 p-4 border-b border-[#3a3a3a]">
              <Search className="w-5 h-5 text-[#888888]" />
              <input 
                type="text" 
                value="machine learn" 
                readOnly
                className="bg-transparent text-[#dcddde] placeholder-[#888888] outline-none flex-1 text-lg font-medium"
                placeholder="Search anything..."
              />
              <div className="px-2 py-1 bg-[#3a3a3a] rounded text-xs text-[#888888] font-mono">
                ⌘K
              </div>
            </div>

            {/* Command results */}
            <div className="p-2 max-h-80 overflow-auto">
              <div className="space-y-1">
                {/* Files section */}
                <div className="px-3 py-1 text-xs text-[#888888] uppercase tracking-wide">Files</div>
                <motion.div 
                  className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#7c3aed]/20 border border-[#7c3aed]/30 cursor-pointer"
                  whileHover={{ backgroundColor: "rgba(124, 58, 237, 0.3)" }}
                >
                  <FileText className="w-4 h-4 text-[#7c3aed]" />
                  <div className="flex-1">
                    <div className="text-[#dcddde] text-sm font-medium">Neural Networks.md</div>
                    <div className="text-[#888888] text-xs">...deep learning and <span className="text-[#7c3aed]">machine learn</span>ing algorithms</div>
                  </div>
                  <div className="text-xs text-[#888888]">⏎</div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#3a3a3a]/50 cursor-pointer"
                  whileHover={{ backgroundColor: "rgba(58, 65, 80, 0.5)" }}
                >
                  <FileText className="w-4 h-4 text-[#888888]" />
                  <div className="flex-1">
                    <div className="text-[#dcddde] text-sm font-medium">AI Research.md</div>
                    <div className="text-[#888888] text-xs">Latest <span className="text-[#7c3aed]">machine learn</span>ing developments</div>
                  </div>
                </motion.div>

                {/* Commands section */}
                <div className="px-3 py-1 text-xs text-[#888888] uppercase tracking-wide mt-4">Commands</div>
                <motion.div 
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#3a3a3a]/50 cursor-pointer"
                  whileHover={{ backgroundColor: "rgba(58, 65, 80, 0.5)" }}
                >
                  <div className="w-4 h-4 flex items-center justify-center text-[#888888] text-xs">⌘</div>
                  <div className="flex-1">
                    <div className="text-[#dcddde] text-sm font-medium">Create New Note</div>
                    <div className="text-[#888888] text-xs">Start a new markdown document</div>
                  </div>
                  <div className="text-xs text-[#888888]">⌘N</div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#3a3a3a]/50 cursor-pointer"
                  whileHover={{ backgroundColor: "rgba(58, 65, 80, 0.5)" }}
                >
                  <div className="w-4 h-4 flex items-center justify-center text-[#888888] text-xs">🎨</div>
                  <div className="flex-1">
                    <div className="text-[#dcddde] text-sm font-medium">Change Theme</div>
                    <div className="text-[#888888] text-xs">Switch between color themes</div>
                  </div>
                  <div className="text-xs text-[#888888]">⌘T</div>
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#3a3a3a] text-xs text-[#888888]">
              <span>8 results</span>
              <div className="flex items-center gap-4">
                <span>↑↓ navigate</span>
                <span>⏎ select</span>
                <span>esc close</span>
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
      <div className="relative h-full w-full bg-[#0a0a0a] overflow-hidden">
        {/* Performance Monitor Interface */}
        <div className="p-6 h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[#dcddde] text-sm font-medium">System Monitor</span>
            </div>
            <div className="text-xs text-[#888888]">Lokus v1.2.0</div>
          </div>

          {/* Real-time metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* CPU Usage */}
            <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-lg p-4 border border-[#3a3a3a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#888888]">CPU</span>
                <span className="text-xs text-green-400 font-mono">3.2%</span>
              </div>
              <div className="w-full bg-[#3a3a3a] rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "3.2%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                />
              </div>
            </div>

            {/* Memory Usage */}
            <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-lg p-4 border border-[#3a3a3a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#888888]">Memory</span>
                <span className="text-xs text-blue-400 font-mono">42MB</span>
              </div>
              <div className="w-full bg-[#3a3a3a] rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "8%" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Performance stats */}
          <div className="space-y-3">
            {[
              { label: "Startup Time", value: "0.8s", icon: "⚡", color: "text-yellow-400" },
              { label: "Search Index", value: "2,847 notes", icon: "🔍", color: "text-purple-400" },
              { label: "Response Time", value: "<10ms", icon: "🚀", color: "text-green-400" },
              { label: "Native APIs", value: "Enabled", icon: "⚙️", color: "text-blue-400" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center justify-between p-3 bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{stat.icon}</span>
                  <span className="text-sm text-[#dcddde]">{stat.label}</span>
                </div>
                <span className={`text-sm font-mono ${stat.color}`}>{stat.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Technology badges */}
          <div className="mt-6 flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-orange-400 font-medium">Rust</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-blue-400 font-medium">Tauri</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-purple-400 font-medium">Native</span>
            </div>
          </div>

          {/* Live graph simulation */}
          <div className="mt-6 bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg p-4">
            <div className="text-xs text-[#888888] mb-3">Performance Over Time</div>
            <div className="flex items-end justify-between h-16 gap-1">
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 60 + 20}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-gradient-to-t from-green-400/50 to-green-400 rounded-t w-2"
                />
              ))}
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
    <section className={cn("relative py-24 bg-black overflow-hidden", className)}>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Built for thinking.
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Professional-grade tools for note-taking, research, and knowledge management. 
            Fast, reliable, and completely offline.
          </p>
        </motion.div>

        {/* Interactive Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Feature List */}
          <div className="space-y-6">
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
                    "group relative p-6 rounded-xl cursor-pointer transition-all duration-300",
                    isActive
                      ? "bg-white/5 border border-white/10"
                      : "hover:bg-white/[0.02]"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="featuresActiveIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-white rounded-r"
                    />
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-lg transition-colors",
                      isActive ? "bg-white/10" : "bg-white/5 group-hover:bg-white/10"
                    )}>
                      <Icon className={cn(
                        "w-6 h-6 transition-colors",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                      )} />
                    </div>
                    <div className="flex-1">
                      <h3 className={cn(
                        "text-xl font-semibold mb-2 transition-colors",
                        isActive ? "text-white" : "text-gray-300"
                      )}>
                        {feature.title}
                      </h3>
                      <p className={cn(
                        "text-sm leading-relaxed transition-colors",
                        isActive ? "text-gray-300" : "text-gray-500"
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
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative bg-black border border-white/10 rounded-2xl overflow-hidden h-[500px] shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {features.map((feature) =>
                  activeFeature === feature.id && (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
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