"use client";

import React from "react";
import { FeaturePage } from "@/components/feature-page";
import { GitBranch, Share2 } from "lucide-react";

export default function KnowledgeGraphPage() {
    return (
        <FeaturePage
            title="Knowledge Graph"
            subtitle="Visualize your second brain. See how your ideas connect."
            description="Uncover hidden patterns in your thinking with our interactive graph view."
            features={[
                "Interactive force-directed graph visualization",
                "Filter by tags, folders, or connection types",
                "Click to navigate instantly to any note",
                "Color-coded nodes for different content types",
                "Local and global graph views",
                "Export graph as image"
            ]}
            image={
                <div className="aspect-video bg-zinc-950 rounded-xl border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Simple CSS graph simulation */}
                        <div className="relative w-64 h-64 animate-spin-slow [animation-duration:20s]">
                            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-indigo-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(99,102,241,0.5)] z-10" />

                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-indigo-500/50 to-transparent origin-left -translate-y-1/2" style={{ transform: `rotate(${i * 45}deg) translateY(-50%)` }}>
                                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-zinc-500 rounded-full -translate-y-1/2" />
                                </div>
                            ))}

                            <div className="absolute top-10 left-10 w-3 h-3 bg-purple-500 rounded-full" />
                            <div className="absolute bottom-20 right-10 w-3 h-3 bg-emerald-500 rounded-full" />
                        </div>
                    </div>
                </div>
            }
        />
    );
}
