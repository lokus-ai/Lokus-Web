"use client";

import React from "react";
import { FeaturePage } from "@/components/feature-page";
import { Database, ShieldCheck, WifiOff } from "lucide-react";

export default function LocalFirstPage() {
    return (
        <FeaturePage
            title="Local-First"
            subtitle="Your data belongs to you. Always available, even offline."
            description="Experience the speed and privacy of local-first software."
            features={[
                "Works 100% offline without internet",
                "Instant load times with zero latency",
                "Full data ownership - files live on your device",
                "End-to-end encryption for sync",
                "No vendor lock-in - standard Markdown files",
                "Seamless sync when you go online"
            ]}
            image={
                <div className="aspect-video bg-zinc-950 rounded-xl border border-white/10 p-8 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950" />
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-zinc-900 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
                            <Database className="w-10 h-10 text-emerald-500" />
                        </div>
                        <div className="flex gap-8">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                                    <WifiOff className="w-5 h-5 text-zinc-400" />
                                </div>
                                <span className="text-xs text-zinc-500">Offline</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-zinc-400" />
                                </div>
                                <span className="text-xs text-zinc-500">Secure</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    );
}
