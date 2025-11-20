"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FolderOpen, FileText, Shield, Palette, ChevronRight } from "lucide-react";

const features = [
  {
    id: "local",
    icon: FolderOpen,
    title: "Local-First Architecture",
    description: "Your notes are stored as markdown files on your device. No cloud, no tracking - just you and your data.",
    visual: (
      <div className="relative h-full w-full">
        {/* Lokus-style file explorer */}
        <div className="h-full bg-[#2c3340] rounded-lg overflow-hidden flex">
          {/* Sidebar */}
          <div className="w-12 bg-[#262b35] border-r border-[#1a1e27] flex flex-col items-center py-4 gap-4">
            <div className="w-6 h-6 rounded bg-[#3a4150] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
            </div>
            <div className="w-6 h-6 text-gray-500 flex items-center justify-center">
              <FolderOpen className="w-4 h-4" />
            </div>
          </div>

          {/* File explorer content */}
          <div className="flex-1">
            <div className="p-3 border-b border-[#1a1e27] flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300 tracking-wider">EXPLORER</span>
              <button className="text-gray-500 hover:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div className="p-2 space-y-0.5 text-sm">
              {/* Folders */}
              {["Classes", "Daily Notes", "Data Structure And Algorithm", "Hackathon", "Images"].map((folder, i) => (
                <motion.div
                  key={folder}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 px-2 py-1 text-gray-300 hover:bg-[#3a4150] rounded cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-500" />
                  <span className="text-sm">{folder}</span>
                </motion.div>
              ))}

              {/* Files */}
              {[
                "AI Tools For University.md",
                "Claude Research on 100 Profs.md",
                "Daily_Task_kanban",
                "Hackathon Guide.md",
                "Meeting Notes - Product Review.md"
              ].map((file, i) => (
                <motion.div
                  key={file}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + 5) * 0.05 }}
                  className="flex items-center gap-2 px-2 py-1 text-gray-400 hover:bg-[#3a4150] rounded cursor-pointer group"
                >
                  <FileText className="w-3 h-3 text-purple-400" />
                  <span className="text-sm truncate">{file}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "editor",
    icon: FileText,
    title: "Beautiful Editor",
    description: "Rich markdown editor with live preview, outline view, and backlinks. Write in comfort with a distraction-free interface.",
    visual: (
      <div className="relative h-full w-full bg-[#2b2d30] rounded-lg overflow-hidden">
        {/* Tab bar */}
        <div className="bg-[#1e1e1e] border-b border-[#3a3a3a] px-3 py-2 flex items-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#2b2d30] rounded-t text-xs text-gray-300">
            <span>Mermaid.md</span>
          </div>
        </div>

        <div className="flex h-[calc(100%-40px)]">
          {/* Editor content */}
          <div className="flex-1 p-6 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-white mb-6">Mermaid</h1>

              <div className="space-y-4 text-gray-300">
                <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                  Complete Markdown & Mermaid Test Document
                </h2>

                <p className="text-sm leading-relaxed">
                  This document contains <span className="font-semibold text-white">ALL</span> markdown syntax examples and various mermaid diagram types for testing purposes.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">1. Headers (H1 through H6)</h3>
                <div className="space-y-2 text-sm">
                  <div className="font-semibold text-white">H1 - Largest Header</div>
                  <div className="text-base">H2 - Second Level</div>
                  <div className="text-sm">H3 - Third Level</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right sidebar */}
          <div className="w-56 bg-[#252628] border-l border-[#3a3a3a] p-3 space-y-4">
            <div>
              <div className="text-xs font-semibold text-gray-400 mb-2">EDITOR MODE</div>
              <div className="flex gap-1">
                <button className="flex-1 px-3 py-1.5 bg-cyan-400 text-black text-xs font-medium rounded">
                  Edit
                </button>
                <button className="flex-1 px-3 py-1.5 bg-transparent text-gray-400 text-xs rounded hover:bg-[#3a3a3a]">
                  Live
                </button>
                <button className="flex-1 px-3 py-1.5 bg-transparent text-gray-400 text-xs rounded hover:bg-[#3a3a3a]">
                  Read
                </button>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-gray-400 mb-2">OUTLINE</div>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="hover:text-gray-300 cursor-pointer">1. Headers (H1 through H6)</div>
                <div className="pl-3 hover:text-gray-300 cursor-pointer">H1 - Largest Header</div>
                <div className="pl-3 hover:text-gray-300 cursor-pointer">H2 - Second Level</div>
                <div className="pl-3 hover:text-gray-300 cursor-pointer">H3 - Third Level</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-gray-400 mb-2">BACKLINKS</div>
              <input
                type="text"
                placeholder="Filter backlinks..."
                className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded px-2 py-1 text-xs text-gray-400 placeholder-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "customization",
    icon: Palette,
    title: "Live Theme Editor",
    description: "Real-time theme customization with instant preview. Change colors, fonts, and spacing on the fly with our powerful theme engine.",
    visual: (
      <div className="relative h-full w-full bg-gradient-to-br from-purple-900 to-purple-950 rounded-lg overflow-hidden">
        <div className="h-full p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">THEME</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-transparent border border-pink-500 text-pink-400 text-xs rounded hover:bg-pink-500/10">
                Upload
              </button>
              <button className="px-3 py-1 bg-transparent border border-pink-500 text-pink-400 text-xs rounded hover:bg-pink-500/10">
                Export
              </button>
            </div>
          </div>

          <select className="w-full bg-transparent border-2 border-pink-500 text-pink-400 rounded px-3 py-2 text-sm mb-4">
            <option>Funky Neon</option>
          </select>

          <div className="text-xs text-pink-400 mb-3">Edit colors and save changes to the theme file</div>

          <div className="border-2 border-pink-500 rounded overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-pink-500">
              <div className="bg-purple-950 px-2 py-1 text-xs font-semibold text-white">TOKEN</div>
              <div className="bg-purple-950 px-2 py-1 text-xs font-semibold text-white">PREVIEW</div>
              <div className="bg-purple-950 px-2 py-1 text-xs font-semibold text-white">VALUE</div>
            </div>

            <div className="space-y-px bg-pink-500">
              {[
                { name: "--accent", color: "bg-cyan-400", value: "0 255 255" },
                { name: "--accent-fg", color: "bg-black", value: "0 0 0" },
                { name: "--bg", color: "bg-[#200040]", value: "20 0 40" },
                { name: "--border", color: "bg-pink-500", value: "255 0 255" },
                { name: "--danger", color: "bg-red-500", value: "255 0 0" },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="grid grid-cols-3 gap-px bg-pink-500"
                >
                  <div className="bg-purple-950 px-2 py-2 text-xs text-gray-400 font-mono">{item.name}</div>
                  <div className="bg-purple-950 px-2 py-2 flex items-center justify-center">
                    <div className={`w-6 h-6 rounded ${item.color} border border-pink-500`} />
                  </div>
                  <div className="bg-purple-950 px-2 py-2">
                    <div className="border border-pink-500 rounded px-2 py-1 text-xs text-pink-400 font-mono">
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button className="w-full mt-3 px-4 py-2 bg-cyan-400 text-black text-sm font-semibold rounded hover:bg-cyan-300">
            Save Changes
          </button>
        </div>
      </div>
    )
  }
];

export function DataControl({ className }: { className?: string }) {
  const [activeFeature, setActiveFeature] = useState("local");

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
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Your data, your control.
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Local-first architecture means your notes never leave your device.
            Complete privacy, zero tracking, full ownership.
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
                      layoutId="activeIndicator"
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