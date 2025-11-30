"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Command, Sparkles } from "lucide-react";
import Link from "next/link";

function HeroBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white mb-8"
        >
            <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>v1.0 Release Candidate is here</span>
            <ArrowRight className="h-3 w-3" />
        </motion.div>
    );
}

function HeroTitle() {
    return (
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center max-w-4xl mx-auto leading-[1.1]"
        >
            Think at the speed of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                thought.
            </span>
        </motion.h1>
    );
}

function HeroDescription() {
    return (
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-zinc-400 text-center max-w-2xl mx-auto leading-relaxed"
        >
            Lokus is the local-first, AI-powered knowledge base that feels like an extension of your brain. No loading spinners, just flow.
        </motion.p>
    );
}

function HeroButtons() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
            <Link
                href="/download"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
            >
                <span className="mr-2">Download for macOS</span>
                <Command className="h-4 w-4" />
            </Link>
            <Link
                href="/demo"
                className="group inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
                <span className="mr-2">Try in Browser</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </motion.div>
    );
}

function DashboardMockup() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div ref={ref} className="relative mt-20 perspective-1000 px-4">
            <motion.div
                style={{
                    rotateX,
                    scale,
                    opacity,
                    y,
                    transformStyle: "preserve-3d",
                }}
                className="relative mx-auto max-w-6xl rounded-2xl border border-white/10 bg-black/50 shadow-2xl backdrop-blur-sm"
            >
                {/* Window Controls */}
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3 rounded-t-2xl">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    <div className="ml-4 h-6 w-96 rounded-md bg-white/5" />
                </div>

                {/* App Content Placeholder */}
                <div className="grid grid-cols-[280px_1fr] h-[600px] overflow-hidden rounded-b-2xl bg-black/80">
                    {/* Sidebar */}
                    <div className="border-r border-white/10 bg-zinc-900/50 p-4 space-y-4">
                        <div className="h-8 w-32 rounded bg-white/10" />
                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-6 w-full rounded bg-white/5" />
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-8 space-y-6">
                        <div className="h-10 w-3/4 rounded bg-white/10" />
                        <div className="space-y-3">
                            <div className="h-4 w-full rounded bg-white/5" />
                            <div className="h-4 w-full rounded bg-white/5" />
                            <div className="h-4 w-2/3 rounded bg-white/5" />
                        </div>

                        {/* Graph View Mockup */}
                        <div className="mt-8 h-64 w-full rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-indigo-500/20 blur-2xl" />
                                <div className="w-24 h-24 rounded-full bg-purple-500/20 blur-xl absolute top-10 right-20" />
                            </div>
                            {/* Nodes */}
                            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
                            <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-white/50 rounded-full" />
                            <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-white/50 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Glow Effects */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-white/20 to-transparent opacity-20 blur-lg" />
            </motion.div>
        </div>
    );
}

export function HeroSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-black pt-32 pb-20">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none opacity-30" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="container relative z-10 mx-auto px-4 text-center">
                <HeroBadge />
                <HeroTitle />
                <HeroDescription />
                <HeroButtons />
            </div>
        </section>
    );
}
