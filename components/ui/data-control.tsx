"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FolderOpen, FileText, Palette, ChevronRight, Search, Settings, BookOpen, Files, LayoutGrid, Puzzle, Database, Network, Calendar, Mail } from "lucide-react";
import { Logo } from "./logo";

const folderContents = {
  "Classes": ["Math 101.md", "Physics Notes.md", "Chemistry Lab.md"],
  "Daily Notes": ["2024-01-15.md", "2024-01-14.md", "2024-01-13.md"],
  "Data Structure And Algorithm": ["Binary Trees.md", "Graphs.md", "Sorting.md"],
  "Hackathon": ["Ideas.md", "Team Notes.md", "Schedule.md"],
  "Images": ["diagram.png", "screenshot.jpg"]
};

const generateExplorerVisual = (openFolders: Set<string>, toggleFolder: (folder: string) => void) => (
  <div className="relative h-full w-full bg-zinc-950/50 backdrop-blur-xl">
    {/* Lokus-style file explorer */}
    <div className="h-full flex">
      {/* Full Sidebar */}
      <div className="w-16 bg-zinc-900/50 border-r border-white/5 flex flex-col items-center py-4 gap-2">
        {/* Logo at top */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mb-6 cursor-pointer"
        >
          <Logo size={28} animated={false} />
        </motion.div>

        {/* Navigation Icons */}
        {[
          { icon: Files, label: 'Files', id: 'files' },
          { icon: LayoutGrid, label: 'Dashboard', id: 'dashboard' },
          { icon: Puzzle, label: 'Extensions', id: 'extensions' },
          { icon: Database, label: 'Database', id: 'database' },
          { icon: Network, label: 'Network', id: 'network' },
          { icon: Calendar, label: 'Calendar', id: 'calendar' },
          { icon: Mail, label: 'Mail', id: 'mail' },
        ].map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0; // Make first item active for demo

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "relative w-10 h-10 rounded-lg flex items-center justify-center transition-all group",
                isActive
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-indigo-400 rounded-r-full" />
              )}

              <Icon className="w-5 h-5" />
            </motion.button>
          );
        })}

        {/* Bottom indicator */}
        <div className="mt-auto pt-4 border-t border-white/5 w-full flex justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 animate-pulse" />
        </div>
      </div>

      {/* File explorer content */}
      <div className="flex-1 relative bg-zinc-900/30">
        {/* Custom scrollable area with styled scrollbar */}
        <div className="h-full overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700 hover:scrollbar-thumb-zinc-600 scrollbar-thumb-rounded-full">
          <div className="p-3 border-b border-white/5 flex items-center justify-between sticky top-0 bg-zinc-900/95 z-10 backdrop-blur-md">
            <span className="text-xs font-semibold text-zinc-400 tracking-wider">EXPLORER</span>
            <button className="text-zinc-500 hover:text-zinc-300 hover:bg-white/5 rounded p-1 transition-colors">
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-2 space-y-0.5 text-sm">
            {/* Folders */}
            {Object.keys(folderContents).map((folder, i) => {
              const isOpen = openFolders.has(folder);
              return (
                <div key={folder}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 px-2 py-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 rounded-md cursor-pointer group transition-all duration-200"
                    onClick={() => toggleFolder(folder)}
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex-shrink-0"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </motion.div>
                    <FolderOpen className="w-4 h-4 text-indigo-400/80 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{folder}</span>
                  </motion.div>

                  {/* Folder contents */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="ml-4 space-y-0.5 border-l border-white/5 pl-2 py-0.5"
                    >
                      {folderContents[folder as keyof typeof folderContents].map((file, fileIndex) => (
                        <motion.div
                          key={file}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: fileIndex * 0.03 }}
                          className="flex items-center gap-2 px-2 py-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 rounded-md cursor-pointer group transition-all duration-150"
                        >
                          <FileText className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-500 flex-shrink-0" />
                          <span className="text-xs truncate">{file}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Root-level Files */}
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
                transition={{ delay: (i + Object.keys(folderContents).length) * 0.05 }}
                className="flex items-center gap-2 px-2 py-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 rounded-md cursor-pointer group transition-all duration-150"
              >
                <FileText className="w-4 h-4 text-zinc-600 group-hover:text-zinc-500 flex-shrink-0" />
                <span className="text-sm truncate font-medium">{file}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const features = [
  {
    id: "local",
    icon: FolderOpen,
    title: "Local-First Architecture",
    description: "Your notes are stored as markdown files on your device. No cloud, no tracking - just you and your data.",
    visual: null // Will be generated dynamically
  },
  {
    id: "editor",
    icon: FileText,
    title: "Beautiful Editor",
    description: "Rich markdown editor with live preview, outline view, and backlinks. Write in comfort with a distraction-free interface.",
    visual: (
      <div className="relative h-full w-full bg-zinc-900/50 backdrop-blur-xl rounded-lg overflow-hidden flex flex-col">
        {/* Tab bar */}
        <div className="bg-zinc-950/50 border-b border-white/5 px-3 py-2 flex items-center">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 rounded-t-md text-xs text-zinc-300 border-t border-x border-white/5">
            <FileText className="w-3 h-3 text-indigo-400" />
            <span>Mermaid.md</span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Editor content */}
          <div className="flex-1 p-8 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <h1 className="text-3xl font-bold text-white mb-6">Mermaid Diagrams</h1>

              <div className="space-y-6 text-zinc-300">
                <div className="pb-4 border-b border-white/5">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Complete Markdown & Mermaid Test
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    This document demonstrates the rendering capabilities of Lokus, including <span className="text-indigo-400 font-medium">syntax highlighting</span>, <span className="text-indigo-400 font-medium">math equations</span>, and <span className="text-indigo-400 font-medium">diagrams</span>.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">1. Headers Structure</h3>
                  <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-2xl font-bold text-white">H1 - Largest Header</div>
                    <div className="text-xl font-semibold text-white">H2 - Second Level</div>
                    <div className="text-lg font-medium text-white">H3 - Third Level</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right sidebar */}
          <div className="w-64 bg-zinc-950/30 border-l border-white/5 p-4 space-y-6">
            <div>
              <div className="text-[10px] font-bold text-zinc-500 mb-3 tracking-wider">EDITOR MODE</div>
              <div className="grid grid-cols-3 gap-1 bg-zinc-900/50 p-1 rounded-lg border border-white/5">
                <button className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-medium rounded">
                  Edit
                </button>
                <button className="px-2 py-1 text-zinc-500 text-xs rounded hover:text-zinc-300 transition-colors">
                  Live
                </button>
                <button className="px-2 py-1 text-zinc-500 text-xs rounded hover:text-zinc-300 transition-colors">
                  Read
                </button>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-zinc-500 mb-3 tracking-wider">OUTLINE</div>
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-zinc-600" />
                  Mermaid Diagrams
                </div>
                <div className="pl-4 hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-zinc-700" />
                  Headers Structure
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-zinc-500 mb-3 tracking-wider">BACKLINKS</div>
              <div className="relative">
                <Search className="absolute left-2 top-1.5 w-3 h-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full bg-zinc-900/50 border border-white/5 rounded-md pl-7 pr-2 py-1 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>
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
      <div className="relative h-full w-full bg-zinc-950/50 backdrop-blur-xl rounded-lg overflow-hidden flex flex-col">
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-400" />
              THEME SETTINGS
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white/5 border border-white/10 text-zinc-400 text-xs rounded-md hover:bg-white/10 transition-colors">
                Import
              </button>
              <button className="px-3 py-1.5 bg-white/5 border border-white/10 text-zinc-400 text-xs rounded-md hover:bg-white/10 transition-colors">
                Export
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs text-zinc-500 mb-2 block">PRESET</label>
              <select className="w-full bg-zinc-900 border border-white/10 text-zinc-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500/50 focus:outline-none transition-colors">
                <option>Nord</option>
                <option>Dracula</option>
                <option>Tokyo Night</option>
                <option>Catppuccin</option>
                <option>Gruvbox</option>
                <option>One Dark</option>
                <option>GitHub Dark</option>
              </select>
            </div>

            <div className="flex-1 border border-white/10 rounded-lg overflow-hidden flex flex-col bg-zinc-900/30">
              <div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/5">
                <div className="bg-zinc-900/50 px-3 py-2 text-[10px] font-bold text-zinc-500">TOKEN</div>
                <div className="bg-zinc-900/50 px-3 py-2 text-[10px] font-bold text-zinc-500">PREVIEW</div>
                <div className="bg-zinc-900/50 px-3 py-2 text-[10px] font-bold text-zinc-500">VALUE</div>
              </div>

              <div className="flex-1 overflow-auto p-2 space-y-1">
                {[
                  { name: "--primary", color: "bg-indigo-500", value: "99 102 241" },
                  { name: "--background", color: "bg-zinc-950", value: "9 9 11" },
                  { name: "--surface", color: "bg-zinc-900", value: "24 24 27" },
                  { name: "--border", color: "bg-zinc-800", value: "39 39 42" },
                  { name: "--success", color: "bg-emerald-500", value: "16 185 129" },
                  { name: "--warning", color: "bg-amber-500", value: "245 158 11" },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="grid grid-cols-3 gap-2 items-center p-2 rounded hover:bg-white/5 transition-colors"
                  >
                    <div className="text-xs text-zinc-400 font-mono">{item.name}</div>
                    <div className="flex items-center justify-center">
                      <div className={`w-6 h-6 rounded-md ${item.color} border border-white/10 shadow-sm`} />
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button className="w-full px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  }
];

export function DataControl({ className }: { className?: string }) {
  const [activeFeature, setActiveFeature] = useState("local");
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(["Classes", "Daily Notes"]));

  const toggleFolder = (folder: string) => {
    const newOpenFolders = new Set(openFolders);
    if (newOpenFolders.has(folder)) {
      newOpenFolders.delete(folder);
    } else {
      newOpenFolders.add(folder);
    }
    setOpenFolders(newOpenFolders);
  };

  return (
    <section className={cn("relative py-32 bg-black overflow-hidden", className)}>
      {/* Background Glow */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

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
            Your data, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">your control.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Local-first architecture means your notes never leave your device.
            Complete privacy, zero tracking, full ownership.
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
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-indigo-500 rounded-r shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-xl transition-all duration-300",
                      isActive ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-zinc-500 group-hover:text-zinc-300"
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
                      {feature.id === "local"
                        ? generateExplorerVisual(openFolders, toggleFolder)
                        : feature.visual
                      }
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