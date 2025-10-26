"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { DitheringShader } from "./dithering-shader";

export function VideoShowcase({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shaderInView, setShaderInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  return (
    <section
      ref={containerRef}
      className={cn("relative py-24 overflow-hidden bg-black", className)}
    >
      {/* Dithering Shader Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        onViewportEnter={() => setShaderInView(true)}
        onViewportLeave={() => setShaderInView(false)}
        viewport={{ once: false, margin: "-30%" }}
        transition={{ duration: 1.4 }}
      >
        {shaderInView && (
          <DitheringShader
            width={typeof window !== 'undefined' ? window.innerWidth : 1920}
            height={typeof window !== 'undefined' ? window.innerHeight : 1080}
            shape="ripple"
            type="4x4"
            colorBack="#000000"
            colorFront="#0f111a"
            pxSize={4}
            speed={0.9}
            className="w-full h-full"
          />
        )}
      </motion.div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            See Lokus in Action
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the seamless workflow and beautiful interface designed for macOS
          </p>
        </motion.div>

        <motion.div
          style={{ y, scale }}
          className="relative max-w-6xl mx-auto"
        >
          {/* MacBook Pro Frame */}
          <div className="relative">
            <div className="relative rounded-[2.75rem] bg-zinc-950 p-[18px] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
              <div className="absolute inset-x-20 -top-3 h-6 rounded-full bg-white/10" />
              <div className="absolute inset-x-6 bottom-4 h-1 rounded-full bg-white/5" />

              {/* Notch */}
              <div className="absolute top-[22px] left-1/2 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-black/90" />

              {/* Screen */}
              <div className="relative overflow-hidden rounded-[2.1rem] border border-white/10 bg-zinc-950 aspect-[16/10]">
                <div className="absolute inset-0 bg-white/5" aria-hidden="true" style={{ opacity: 0.04 }} />
                <iframe
                  src="https://app.supademo.com/embed/cmh0jxcz91u6r6nxt6ychgkcg?embed_v=2&utm_source=embed&autoplay=1&muted=1"
                  title="Lokus product walkthrough"
                  loading="eager"
                  className="relative h-full w-full border-0"
                  allow="autoplay; clipboard-write"
                  allowFullScreen={false}
                />
              </div>
            </div>

            {/* MacBook base */}
            <div className="relative mx-auto -mt-2 h-10 w-[90%]">
              <div className="absolute inset-0 rounded-b-[2.5rem] bg-zinc-900" />
              <div className="absolute left-1/2 top-2 h-2 w-32 -translate-x-1/2 rounded-full bg-zinc-700" />
              <div className="absolute inset-x-10 bottom-0 h-2 rounded-full bg-black/70 blur-lg" />
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            className="absolute -left-20 top-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <div className="bg-gray-800/80 backdrop-blur-md rounded-lg px-4 py-2 shadow-xl">
              <p className="text-sm text-gray-300">Native macOS App</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-20 bottom-40"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
          >
            <div className="bg-gray-800/80 backdrop-blur-md rounded-lg px-4 py-2 shadow-xl">
              <p className="text-sm text-gray-300">Blazing Fast</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Features highlight */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { title: "Native Performance", desc: "Built with Tauri for maximum speed" },
            { title: "Beautiful Design", desc: "Crafted specifically for macOS aesthetics" },
            { title: "Seamless Integration", desc: "Works perfectly with your Mac workflow" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
