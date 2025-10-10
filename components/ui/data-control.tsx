"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FolderOpen, GitBranch, Shield, Palette, FileText } from "lucide-react";

const features = [
  {
    id: "local",
    icon: FolderOpen,
    title: "Local-First Architecture",
    description: "Your notes are stored as markdown files on your device. No cloud, no tracking - just you and your data.",
    visual: (
      <div className="relative h-full w-full p-6">
        <div className="h-full flex flex-col">
          {/* File explorer mockup */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 flex-1 overflow-hidden">
            <div className="bg-gray-900 px-4 py-2 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">~/Documents/Lokus-Notes</span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {/* Folder structure */}
              <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer">
                <motion.div whileHover={{ x: 2 }}>
                  <FolderOpen className="w-4 h-4" />
                </motion.div>
                <span className="text-sm">Projects/</span>
              </div>
              <div className="ml-6 space-y-2">
                <motion.div 
                  className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer"
                  whileHover={{ x: 2 }}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">project-overview.md</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer"
                  whileHover={{ x: 2 }}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">[[meeting-notes]].md</span>
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer">
                <motion.div whileHover={{ x: 2 }}>
                  <FolderOpen className="w-4 h-4" />
                </motion.div>
                <span className="text-sm">Daily Notes/</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer">
                <motion.div whileHover={{ x: 2 }}>
                  <FolderOpen className="w-4 h-4" />
                </motion.div>
                <span className="text-sm">Templates/</span>
              </div>
            </div>
          </div>
          
          {/* Git integration hint */}
          <div className="mt-4 bg-gray-800/50 rounded p-3 border border-gray-700/50">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <GitBranch className="w-3 h-3" />
              <span>Works perfectly with Git version control</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "privacy",
    icon: Shield,
    title: "Complete Privacy",
    description: "No telemetry, no analytics, no cloud sync unless you want it. Your notes never leave your device.",
    visual: (
      <div className="relative h-full w-full p-6">
        <div className="space-y-4">
          {/* Privacy shield */}
          <div className="flex justify-center">
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-full blur-xl"
              />
              <Shield className="w-24 h-24 text-gray-400 relative z-10" />
            </div>
          </div>
          
          {/* Privacy features */}
          <div className="space-y-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded p-3 border border-gray-700 flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-300">No cloud storage required</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded p-3 border border-gray-700 flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-300">No telemetry or tracking</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded p-3 border border-gray-700 flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-300">Your data stays on your device</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded p-3 border border-gray-700 flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-300">Open source and auditable</span>
            </motion.div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "customization",
    icon: Palette,
    title: "Live Theme Editor",
    description: "Real-time theme customization with instant preview. Change colors, fonts, and spacing on the fly.",
    visual: (
      <div className="relative h-full w-full p-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 h-full">
          {/* Theme editor mockup */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-200">Theme Editor</h4>
            
            {/* Color pickers */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Background</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-900 rounded border border-gray-600" />
                  <code className="text-xs text-gray-500">#0A0A0A</code>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Text Color</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded border border-gray-600" />
                  <code className="text-xs text-gray-500">#E5E5E5</code>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Accent</span>
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-6 h-6 bg-gray-500 rounded border border-gray-600"
                    animate={{ backgroundColor: ["#6B7280", "#8B92A0", "#6B7280"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <code className="text-xs text-gray-500">#6B7280</code>
                </div>
              </div>
            </div>
            
            {/* Font settings */}
            <div className="pt-3 border-t border-gray-700">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Font Family</span>
                  <select className="bg-gray-900 text-xs text-gray-300 px-2 py-1 rounded border border-gray-700">
                    <option>Inter</option>
                    <option>JetBrains Mono</option>
                    <option>SF Pro</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Font Size</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      defaultValue="16"
                    />
                    <span className="text-xs text-gray-500">16px</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Live preview hint */}
            <div className="bg-gray-900 rounded p-2 text-center">
              <span className="text-xs text-gray-500">Changes apply instantly</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export function DataControl({ className }: { className?: string }) {
  const [activeFeature, setActiveFeature] = useState("local");

  return (
    <section className={cn("relative py-24 bg-black", className)}>
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
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
                      ? "bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700" 
                      : "hover:bg-gray-900/30"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-gray-400 to-gray-600 rounded-r"
                    />
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-lg transition-colors",
                      isActive ? "bg-gray-700/50" : "bg-gray-800/50 group-hover:bg-gray-700/50"
                    )}>
                      <Icon className={cn(
                        "w-6 h-6 transition-colors",
                        isActive ? "text-gray-200" : "text-gray-400 group-hover:text-gray-300"
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
              className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden h-[400px]"
            >
              {/* Image container - Replace this with your uploaded image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/40">
                {/* TODO: Replace with your image:
                    <Image 
                      src="/images/sections/data-control.png" 
                      alt="Lokus Data Control Interface"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-600 text-sm text-center">

                  </div>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {features.map((feature) => 
                  activeFeature === feature.id && (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
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