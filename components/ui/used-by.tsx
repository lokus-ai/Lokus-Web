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
    name: "UC Santa Cruz",
    logo: "/logos/universities/UCSC.png"
  },
  { 
    name: "UMass Amherst",
    logo: "/logos/universities/UMass_Amherst_athletics_logo.svg.png"
  },
  {
    name: "Santa Cruz",
    logo: "/logos/universities/santa_cruz_logo.png"
  }
];

export function UsedBy({ className }: { className?: string }) {
  const duplicatedUniversities = [...universities, ...universities, ...universities];
  const [shaderInView, setShaderInView] = useState(false);

  return (
    <section className={cn("relative py-24 bg-black overflow-hidden", className)}>
      {/* Dithering Shader Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.25 }}
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
            colorFront="#2d1b69"
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
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-300"></div>
          </div>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-sm text-gray-500 uppercase tracking-[0.3em] mb-4">Trusted by researchers at</p>
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
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
                duration: 30,
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
                  <div className="relative w-24 h-24 grayscale opacity-60 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300">
                    <Image 
                      src={uni.logo} 
                      alt={`${uni.name} logo`}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <span className="text-gray-500 text-sm font-medium tracking-wider uppercase opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                  {uni.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

        {/* Bottom separator */}
        <div className="max-w-4xl mx-auto px-4 mt-20">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}