"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const universities = [
  {
    name: "Harvard",
    logo: "/logos/universities/Harvard.png"
  },
  {
    name: "MIT",
    logo: "/logos/universities/MIT_logo.svg.png"
  },
  {
    name: "Oxford",
    logo: "/logos/universities/Oxford-University-Circlet.svg.png"
  },
  {
    name: "Princeton",
    logo: "/logos/universities/Princeton_Tigers_logo.svg.png"
  },
  {
    name: "UMass Amherst",
    logo: "/logos/universities/UMass_Amherst_athletics_logo.svg.png"
  }
];

export function UsedBy({ className }: { className?: string }) {

  return (
    <section className={cn("relative py-12 bg-black overflow-hidden", className)}>
      {/* Simple gradient background instead of shader */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent" />

      <div className="relative z-10">
        {/* Markdown-style separator */}
        <div className="max-w-4xl mx-auto px-4 mb-20 pt-16">
          <div className="flex items-center gap-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full animate-pulse delay-150"></div>
              <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full animate-pulse delay-300"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
          </div>
        </div>

        <div className="text-center mb-16">
          <p className="text-xs text-indigo-400 font-bold uppercase tracking-[0.3em] mb-4">Trusted by researchers at</p>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Top Universities Worldwide
          </h3>
        </div>

        <div className="relative overflow-hidden">
          {/* Enhanced gradient masks */}
          <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Auto-scrolling logos with pause on hover */}
          <div className="flex justify-center gap-12 py-12 flex-wrap">
            {universities.map((uni, index) => (
              <div
                key={uni.name}
                className="flex flex-col items-center gap-4 min-w-[120px] group/item"
              >
                <div className="relative w-24 h-24 opacity-70 hover:opacity-100 transition-opacity">
                  <Image
                    src={uni.logo}
                    alt={`${uni.name} logo`}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-zinc-500 text-xs font-medium tracking-wider uppercase">
                  {uni.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom separator */}
        <div className="max-w-4xl mx-auto px-4 mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}