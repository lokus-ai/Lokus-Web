"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function VideoShowcase({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className={cn("relative py-12 overflow-hidden bg-black", className)}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Gradient Orbs */}
      <motion.div
        style={{ opacity }}
        className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        style={{ opacity }}
        className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Lokus</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A beautiful, fast, and intelligent note-taking app designed for modern workflows
          </p>
        </motion.div>

        {/* Main Demo Card with Modern Browser Frame */}
        <motion.div
          style={{ y }}
          className="relative max-w-6xl mx-auto mb-24"
        >
          {/* Spotlight Effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
            }}
          />

          {/* Browser Frame */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-zinc-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 backdrop-blur-xl border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-lg bg-black/20 border border-white/5 text-xs text-zinc-500 font-mono max-w-md w-full text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500/50"></span>
                    lokus.app/demo
                  </div>
                </div>
              </div>

              {/* Video Content */}
              <div className="relative aspect-[16/10] bg-zinc-950">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
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
          </div>

          {/* Floating Stats - Redesigned to look like app UI elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute -left-4 md:-left-16 top-1/4 hidden lg:block"
          >
            <div className="bg-zinc-950/90 backdrop-blur-xl rounded-lg p-3 border border-white/10 shadow-2xl shadow-black/50 ring-1 ring-white/5 min-w-[180px]">
              <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Performance</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Input Latency</span>
                  <span className="text-xs font-mono text-emerald-400">8ms</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full w-[15%] bg-emerald-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-zinc-500">Render Time</span>
                  <span className="text-xs font-mono text-emerald-400">1.2ms</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full w-[5%] bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute -right-4 md:-right-16 bottom-1/4 hidden lg:block"
          >
            <div className="bg-zinc-950/90 backdrop-blur-xl rounded-lg p-3 border border-white/10 shadow-2xl shadow-black/50 ring-1 ring-white/5 min-w-[160px]">
              <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Environment</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-white/5">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.8-1.31.05-2.3-1.23-3.14-2.47-1.7-2.45-3-6.92-1.23-9.99 1.7-2.94 4.74-3.06 6.38-3.06 1.3 0 2.5.88 3.29.88.78 0 2.25-.91 3.8-.78 1.28.06 2.45.52 3.33 1.36-2.94 1.76-2.46 6.09.56 7.59zM13 6c.75-1.36 1.26-3.26.23-5.18-1.53.12-3.38 1.02-4.48 2.34-.97 1.12-1.82 2.92-.95 4.93 1.74.14 3.63-.96 5.2-2.09z" /></svg>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">macOS</div>
                    <div className="text-[10px] text-zinc-500">Native Swift</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-white/5 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-400">Metal Accelerated</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
