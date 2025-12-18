"use client";

import React from "react";
import { Command } from "lucide-react";

function HeroBadge() {
    return (
        <a
            href="https://testflight.apple.com/join/kn8mRnsD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white mb-8 cursor-pointer"
        >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>v1.0 Release Candidate is here</span>
        </a>
    );
}

function HeroTitle() {
    return (
        <h1 className="bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center max-w-4xl mx-auto leading-[1.1]">
            Think at the speed of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                thought.
            </span>
        </h1>
    );
}

function HeroDescription() {
    return (
        <p className="mt-6 text-lg md:text-xl text-zinc-400 text-center max-w-2xl mx-auto leading-relaxed">
            Lokus is the local-first, AI-powered knowledge base that feels like an extension of your brain. No loading spinners, just flow.
        </p>
    );
}

function HeroButtons() {
    const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.querySelector('#download');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
                href="#download"
                onClick={handleDownloadClick}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-zinc-200 cursor-pointer"
            >
                <span className="mr-2">Download for macOS</span>
                <Command className="h-4 w-4" />
            </a>
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
