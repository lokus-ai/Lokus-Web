"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import { Link2, GitBranch, Layers, Puzzle } from "lucide-react";
import { ForceGraph } from "./force-graph";
import { DraggableCanvas } from "./draggable-canvas";

const features = [
  {
    id: "links",
    icon: Link2,
    title: "Links",
    description: "Create connections between your notes. Link anything to everything — ideas, people, places, books, and beyond. Build your own personal Wikipedia.",
    demo: (
      <div className="relative h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 overflow-hidden">
        <div className="space-y-4">
          {/* Note with links */}
          <div className="bg-gray-800 rounded p-4 border border-gray-700">
            <h4 className="text-sm font-semibold text-gray-200 mb-2">Philosophy Notes</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              In <motion.span 
                className="text-gray-200 bg-gray-700/50 px-1 rounded cursor-pointer inline-block"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(107, 114, 128, 0.5)" }}
              >[[Meditations on First Philosophy]]</motion.span> the philosopher{" "}
              <motion.span 
                className="text-gray-200 bg-gray-700/50 px-1 rounded cursor-pointer inline-block"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(107, 114, 128, 0.5)" }}
              >[[René Descartes]]</motion.span> describes a series of{" "}
              <motion.span 
                className="text-gray-200 bg-gray-700/50 px-1 rounded cursor-pointer inline-block"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(107, 114, 128, 0.5)" }}
              >[[skeptical arguments]]</motion.span> about the nature of reality.
            </p>
          </div>
          
          {/* Another linked note */}
          <div className="bg-gray-800 rounded p-4 border border-gray-700">
            <h4 className="text-sm font-semibold text-gray-200 mb-2">Key Concepts</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              <motion.span 
                className="text-gray-200 bg-gray-700/50 px-1 rounded cursor-pointer inline-block"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(107, 114, 128, 0.5)" }}
              >[[Cogito ergo sum]]</motion.span> - &ldquo;I think therefore I am&rdquo; connects to{" "}
              <motion.span 
                className="text-gray-200 bg-gray-700/50 px-1 rounded cursor-pointer inline-block"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(107, 114, 128, 0.5)" }}
              >[[Cartesian dualism]]</motion.span> and{" "}
              <motion.span 
                className="text-gray-200 bg-gray-700/50 px-1 rounded cursor-pointer inline-block"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(107, 114, 128, 0.5)" }}
              >[[Mind-body problem]]</motion.span>.
            </p>
          </div>
          
          {/* Link preview popup */}
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur rounded p-2 text-[10px] text-gray-400">
            7 linked notes
          </div>
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
      <div className="relative h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <ForceGraph width={200} height={200} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/50 backdrop-blur rounded p-2">
            <p className="text-xs text-gray-400">14 notes • 17 connections</p>
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
    demo: (
      <div className="relative h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
        <DraggableCanvas />
        <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur rounded px-2 py-1">
          <p className="text-[10px] text-gray-400">Drag nodes to rearrange</p>
        </div>
      </div>
    )
  },
  {
    id: "plugins",
    icon: Puzzle,
    title: "Plugins",
    description: "Build your ideal thinking space. With powerful plugins and extensibility, it's easy to tailor Lokus to fit your personal workflow.",
    demo: (
      <div className="relative h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 overflow-hidden">
        <div className="space-y-3">
          {/* Plugin items */}
          <motion.div 
            className="flex items-center gap-3 bg-gray-800 rounded p-3 border border-gray-700"
            whileHover={{ x: 5 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-200">Claude MCP</p>
              <p className="text-[10px] text-gray-500">AI-powered assistance</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 bg-gray-800 rounded p-3 border border-gray-700"
            whileHover={{ x: 5 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-200">Graph Analysis</p>
              <p className="text-[10px] text-gray-500">Advanced visualization</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 bg-gray-800 rounded p-3 border border-gray-700"
            whileHover={{ x: 5 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-200">Smart Templates</p>
              <p className="text-[10px] text-gray-500">Boost productivity</p>
            </div>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-full blur-2xl" />
        <div className="absolute -left-4 top-1/2 w-20 h-20 bg-gradient-to-br from-gray-700/20 to-gray-600/20 rounded-full blur-2xl" />
      </div>
    )
  }
];

export function SparkIdeas({ className }: { className?: string }) {
  return (
    <section className={cn("relative py-24 bg-black overflow-hidden", className)}>
      {/* Subtle background */}
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px]" />

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
            Spark ideas.
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From personal notes to research, knowledge bases, and project management, 
            Lokus gives you the tools to come up with ideas and organize them.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-500">
                  {/* Header */}
                  <div className="p-8 pb-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                        <Icon className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Demo Area */}
                  <div className="relative h-64 mx-8 mb-8 group-hover:scale-[1.02] transition-transform duration-500">
                    {feature.demo}
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-500/5 to-gray-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}