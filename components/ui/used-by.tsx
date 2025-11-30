"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DitheringShader } from "./dithering-shader";

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
  const duplicatedUniversities = [...universities, ...universities, ...universities];
  const [shaderInView, setShaderInView] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);

  return (
    <motion.section
      className={cn("relative py-12 bg-black overflow-hidden", className)}
      onViewportEnter={() => setSectionInView(true)}
      onViewportLeave={() => setSectionInView(false)}
      viewport={{ once: false, margin: "-20%" }}
    >
      {/* Dithering Shader Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        onViewportEnter={() => setShaderInView(true)}
        onViewportLeave={() => setShaderInView(false)}
        viewport={{ once: false, margin: "-30%" }}
        transition={{ duration: 2 }}
      >
        {shaderInView && (
          <DitheringShader
            width={typeof window !== 'undefined' ? window.innerWidth : 1920}
            height={typeof window !== 'undefined' ? window.innerHeight : 1080}
            shape="dots"
            type="2x2"
            colorBack="#000000"
            colorFront="#4f46e5"
            pxSize={5}
            speed={0.2}
            className="w-full h-full"
          />
        )}
      </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-indigo-400 font-bold uppercase tracking-[0.3em] mb-4">Trusted by researchers at</p>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Top Universities Worldwide
          </h3>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* Enhanced gradient masks */}
          <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Auto-scrolling logos with pause on hover */}
          <div className="group flex">
            <motion.div
              className="flex gap-20 py-12"
              animate={{
                x: ["0%", "-33.33%"],
              }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {duplicatedUniversities.map((uni, index) => (
                <motion.div
                  key={`${uni.name}-${index}`}
                  className="flex flex-col items-center gap-4 min-w-[150px] group/item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % universities.length) * 0.05 }}
                >
                  <div className="relative">
                    <div className={cn(
                      "relative w-24 h-24 transition-all duration-500 filter",
                      sectionInView
                        ? "grayscale-0 opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        : "grayscale opacity-30 group-hover/item:grayscale-0 group-hover/item:opacity-100"
                    )}>
                      <Image
                        src={uni.logo}
                        alt={`${uni.name} logo`}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <span className="text-zinc-500 text-xs font-medium tracking-wider uppercase opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover/item:translate-y-0">
                    {uni.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom separator */}
        <div className="max-w-4xl mx-auto px-4 mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        </div>
      </div>
    </motion.section>
  );
}