"use client";

import React from "react";
import { FeaturePage } from "@/components/feature-page";
import { FileText } from "lucide-react";

export default function MarkdownEditorPage() {
    return (
        <FeaturePage
            title="Markdown Editor"
            subtitle="A distraction-free writing experience that stays out of your way."
            description="Write with focus and clarity using our premium Markdown editor."
            features={[
                "Syntax highlighting for code blocks",
                "Live preview mode",
                "Distraction-free writing mode",
                "Support for GitHub Flavored Markdown",
                "Keyboard shortcuts for rapid formatting",
                "Export to PDF, HTML, and more"
            ]}
            image={
                <div className="aspect-video bg-zinc-950 rounded-xl border border-white/10 p-6 font-mono text-sm overflow-hidden relative">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-2 text-zinc-300">
                        <p><span className="text-indigo-400"># The Future of Writing</span></p>
                        <p>Writing should be <span className="text-emerald-400">**effortless**</span>.</p>
                        <p>No distractions, just you and your thoughts.</p>
                        <div className="pl-4 border-l-2 border-zinc-700 italic text-zinc-500">
                            "Simplicity is the ultimate sophistication."
                        </div>
                        <p className="mt-4 text-zinc-500">```javascript</p>
                        <p><span className="text-purple-400">const</span> <span className="text-blue-400">idea</span> = <span className="text-amber-400">"Lokus"</span>;</p>
                        <p className="text-zinc-500">```</p>
                    </div>
                </div>
            }
        />
    );
}
