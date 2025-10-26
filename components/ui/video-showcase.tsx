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
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section 
      ref={containerRef}
      className={cn("relative py-24 bg-black overflow-hidden", className)}
    >
      {/* Dithering Shader Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        onViewportEnter={() => setShaderInView(true)}
        onViewportLeave={() => setShaderInView(false)}
        viewport={{ once: false, margin: "-30%" }}
        transition={{ duration: 2 }}
      >
        {shaderInView && (
          <DitheringShader
            width={typeof window !== 'undefined' ? window.innerWidth : 1920}
            height={typeof window !== 'undefined' ? window.innerHeight : 1080}
            shape="ripple"
            type="4x4"
            colorBack="#000000"
            colorFront="#1a1a2e"
            pxSize={4}
            speed={0.4}
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
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
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
          {/* Macbook Pro Frame */}
          <div className="relative">
            {/* Screen bezel */}
            <div className="relative bg-black rounded-[2.5rem] p-3 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
              
              {/* Screen */}
              <div className="relative bg-gray-900 rounded-[2rem] overflow-hidden aspect-[16/10]">
                <div className="relative h-full w-full bg-gradient-to-br from-gray-800 to-gray-900">
                  <iframe
                    src="https://app.supademo.com/embed/cmh0jxcz91u6r6nxt6ychgkcg?v_email=EMAIL&embed_v=2&utm_source=embed&mute=1"
                    title="Lokus product walkthrough"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                    allow="clipboard-write"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/10" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Macbook base */}
            <div className="relative mt-[-2px]">
              <div className="h-6 bg-gray-800 rounded-b-xl">
                <div className="h-1 bg-gray-700 rounded-b-xl" />
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            className="absolute -left-20 top-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="bg-gray-800/80 backdrop-blur-md rounded-lg px-4 py-2 shadow-xl">
              <p className="text-sm text-gray-300">Native macOS App</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-20 bottom-40"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
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
