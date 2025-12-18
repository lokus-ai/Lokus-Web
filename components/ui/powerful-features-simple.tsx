"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Edit3, Search, Zap } from "lucide-react";

const features = [
  {
    id: "editing",
    icon: Edit3,
    title: "Rich Text Editor",
    description: "Powerful TipTap-based editor with markdown support, math equations via KaTeX, and seamless writing experience.",
    imagePlaceholder: "/images/editor-features-screenshot.png" // Replace with actual path
  },
  {
    id: "search",
    icon: Search,
    title: "Universal Search",
    description: "Find anything instantly with fuzzy search across all your notes, tags, and content. Search by title, content, or connections.",
    imagePlaceholder: "/images/search-screenshot.png" // Replace with actual path
  },
  {
    id: "performance",
    icon: Zap,
    title: "Native Performance",
    description: "Built with Tauri and Rust for lightning-fast startup, minimal resource usage, and smooth experience even with thousands of notes.",
    imagePlaceholder: "/images/performance-screenshot.png" // Replace with actual path
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
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">thinking.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Professional-grade tools for note-taking, research, and knowledge management.
            Fast, reliable, and completely offline.
          </p>
        </div>

        {/* Interactive Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;

              return (
                <div
                  key={feature.id}
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
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-purple-500 rounded-r shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-300" />
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
                </div>
              );
            })}
          </div>

          {/* Dynamic Visual - Now with Images */}
          <div className="relative lg:sticky lg:top-32">
            <div className="relative bg-black/40 border border-white/10 rounded-3xl overflow-hidden h-[600px] shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

              {/* Image changes based on hover */}
              {features.map((feature) => {
                const Icon = feature.icon;
                return activeFeature === feature.id && (
                  <div
                    key={feature.id}
                    className="absolute inset-0 p-1 transition-opacity duration-300"
                  >
                    <div className="relative h-full w-full bg-zinc-950/50 backdrop-blur-xl rounded-lg overflow-hidden flex items-center justify-center">
                      {/* Placeholder - Replace with actual Image component once you have screenshots */}
                      <div className="text-center p-8">
                        <div className={cn(
                          "w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center",
                          "bg-purple-500/10 border border-purple-500/20"
                        )}>
                          <Icon className="w-8 h-8 text-purple-400" />
                        </div>
                        <p className="text-zinc-500 text-sm mb-2">Screenshot for:</p>
                        <p className="text-zinc-300 font-medium">{feature.title}</p>
                        <p className="text-zinc-600 text-xs mt-4">Add image at: {feature.imagePlaceholder}</p>
                      </div>

                      {/* Uncomment this and remove the placeholder above once you have actual screenshots */}
                      {/* <Image
                        src={feature.imagePlaceholder}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      /> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
