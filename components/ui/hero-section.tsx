"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

function HeroTitle() {
    return (
        <h1 className="bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center max-w-4xl mx-auto leading-[1.1]">
            The operating system{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                for your ideas.
            </span>
        </h1>
    );
}

function HeroDescription() {
    return (
        <p className="mt-6 text-lg md:text-xl text-zinc-400 text-center max-w-2xl mx-auto leading-relaxed">
            Your personal system for thinking, researching, and creating.
        </p>
    );
}

function HeroButtons() {
    const [osLabel, setOsLabel] = useState("Download Now");

    useEffect(() => {
        const ua = navigator.userAgent;
        if (/Mac/i.test(ua) && !/iPhone|iPad/i.test(ua)) {
            setOsLabel("Download for macOS");
        } else if (/Win/i.test(ua)) {
            setOsLabel("Download for Windows");
        } else if (/Linux/i.test(ua)) {
            setOsLabel("Download for Linux");
        } else {
            setOsLabel("Download Now");
        }
    }, []);

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
                <span>{osLabel}</span>
            </a>
            <Link
                href="/features"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-transparent px-8 font-medium text-zinc-300 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/5 cursor-pointer"
            >
                See all features
            </Link>
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
                <HeroTitle />
                <HeroDescription />
                <HeroButtons />
            </div>
        </section>
    );
}
