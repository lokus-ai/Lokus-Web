"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FolderOpen, FileText, Palette } from "lucide-react";

const features = [
  {
    id: "local",
    icon: FolderOpen,
    title: "Local-First Architecture",
    description: "Your notes are stored as markdown files on your device. No cloud, no tracking - just you and your data.",
    imagePlaceholder: "/images/file-explorer-screenshot.png"
  },
  {
    id: "editor",
    icon: FileText,
    title: "Beautiful Editor",
    description: "Rich markdown editor with live preview, outline view, and backlinks. Write in comfort with a distraction-free interface.",
    imagePlaceholder: "/images/editor-screenshot.png"
  },
  {
    id: "customization",
    icon: Palette,
    title: "Live Theme Editor",
    description: "Real-time theme customization with instant preview. Change colors, fonts, and spacing on the fly with our powerful theme engine.",
    imagePlaceholder: "/images/theme-editor-screenshot.png"
  }
];

export function DataControl({ className }: { className?: string }) {
  const [activeFeature, setActiveFeature] = useState("local");

  return (
    <section className={cn("relative py-32 bg-black overflow-hidden", className)}>
      {/* Background Glow */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Your data, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">your control.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Local-first architecture means your notes never leave your device.
            Complete privacy, zero tracking, full ownership.
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
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-indigo-500 rounded-r shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-300" />
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
                </div>
              );
            })}
          </div>

          {/* Dynamic Visual - Now with Images */}
          <div className="relative lg:sticky lg:top-32">
            <div className="relative bg-gradient-to-br from-zinc-900/80 to-black border border-white/10 rounded-3xl overflow-hidden aspect-[16/10] shadow-2xl shadow-black/50">
              {/* Fancy glass border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
              <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-zinc-900 to-black pointer-events-none" />

              {/* Image changes based on hover */}
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={cn(
                    "absolute inset-0 p-3 transition-all duration-500 ease-out",
                    activeFeature === feature.id
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-[0.98] z-0"
                  )}
                >
                  <div className="relative h-full w-full rounded-2xl overflow-hidden ring-1 ring-white/10">
                    <Image
                      src={feature.imagePlaceholder}
                      alt={feature.title}
                      fill
                      className="object-cover object-top"
                    />
                    {/* Cinematic gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
