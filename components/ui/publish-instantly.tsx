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
      <div className="relative h-full w-full p-8">
        <div className="space-y-4">
          {/* TipTap Editor preview */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-200">research-notes.md</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-gray-400">Saved</span>
              </div>
            </div>
            
            {/* Editor toolbar */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
              <motion.button whileHover={{ scale: 1.1 }} className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-gray-700">
                <Code className="w-3 h-3" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-gray-700">
                <span className="text-xs font-bold">B</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-gray-700">
                <span className="text-xs italic">I</span>
              </motion.button>
            </div>
            
            {/* Mock editor content with math */}
            <div className="space-y-2 text-xs text-gray-400">
              <div className="text-gray-200"># Mathematical Concepts</div>
              <div className="text-gray-400">The quadratic formula: <span className="bg-gray-700 px-1 rounded text-gray-300">$x = (-b ± √(b²-4ac))/2a$</span></div>
              <div className="text-gray-400">This connects to [[Linear Algebra]] and [[Calculus]]...</div>
            </div>
          </div>
          
          {/* Math rendering preview */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-400">KaTeX Math Rendering</span>
            </div>
            <div className="text-center">
              <div className="text-gray-200 font-serif text-lg">x = (-b ± √(b²-4ac))/2a</div>
            </div>
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
      <div className="relative h-full w-full p-8">
        <div className="space-y-4">
          {/* Search interface */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                value="machine learning" 
                readOnly
                className="bg-gray-900 text-sm text-gray-200 px-3 py-2 rounded border border-gray-700 flex-1"
                placeholder="Search notes, tags, content..."
              />
            </div>
            
            {/* Search results */}
            <div className="space-y-2">
              <motion.div 
                className="bg-gray-900 rounded p-3 border border-gray-800 cursor-pointer"
                whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-200">Neural Networks</span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <p className="text-xs text-gray-400">...deep learning and <span className="bg-gray-700 text-gray-200 px-1 rounded">machine learning</span> algorithms...</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-900 rounded p-3 border border-gray-800 cursor-pointer"
                whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-200">AI Research Notes</span>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
                <p className="text-xs text-gray-400">Latest developments in <span className="bg-gray-700 text-gray-200 px-1 rounded">machine learning</span> and reinforcement...</p>
              </motion.div>
            </div>
          </div>
          
          {/* Search stats */}
          <div className="bg-gray-900 rounded p-3 border border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Found 8 results in 2ms</span>
              <div className="flex items-center gap-1">
                <Network className="w-3 h-3" />
                <span>3 connected notes</span>
              </div>
            </div>
          </div>
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
      <div className="relative h-full w-full p-8">
        <div className="space-y-4">
          {/* Performance metrics */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h4 className="text-sm font-medium text-gray-200 mb-4">System Performance</h4>
            <div className="space-y-3">
              {[
                { label: "Startup Time", score: "0.8s", color: "bg-green-500" },
                { label: "Memory Usage", score: "45MB", color: "bg-green-500" },
                { label: "Search Speed", score: "<10ms", color: "bg-green-500" },
                { label: "File Operations", score: "Native", color: "bg-green-500" }
              ].map((metric, i) => (
                <div key={metric.label} className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-300 font-mono">{metric.score}</span>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Technology stack */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h4 className="text-sm font-medium text-gray-200 mb-3">Technology Stack</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">R</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-200">Rust Backend</p>
                  <p className="text-[10px] text-gray-500">Memory safety & performance</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">T</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-200">Tauri Framework</p>
                  <p className="text-[10px] text-gray-500">Native desktop integration</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">R</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-200">React Frontend</p>
                  <p className="text-[10px] text-gray-500">Modern UI components</p>
                </div>
              </div>
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