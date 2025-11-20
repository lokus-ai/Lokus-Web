"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, Lock, Cpu } from "lucide-react";

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
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

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

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Native performance with Tauri",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Sparkles,
      title: "Beautiful Design",
      description: "Crafted for macOS aesthetics",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data stays on your device",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Smart linking and organization",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <section
      ref={containerRef}
      className={cn("relative py-32 overflow-hidden bg-black", className)}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Gradient Orbs */}
      <motion.div
        style={{ opacity }}
        className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
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
        className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">See it in action</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Experience Lokus
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
            }}
          />

          {/* Browser Frame */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-zinc-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 backdrop-blur-xl border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400 max-w-md w-full text-center">
                    lokus.app/demo
                  </div>
                </div>
              </div>

              {/* Video Content */}
              <div className="relative aspect-[16/10] bg-zinc-950">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
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

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute -left-4 md:-left-20 top-1/4 hidden lg:block"
          >
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-xl">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                <span>&lt;10ms</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Response Time</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute -right-4 md:-right-20 bottom-1/4 hidden lg:block"
          >
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-xl">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                100%
              </div>
              <div className="text-xs text-gray-400 mt-1">Native macOS</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Card Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 rounded-2xl"
                style={{
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
                className={`bg-gradient-to-r ${feature.gradient}`}
              />

              <div className="relative h-full bg-zinc-950 rounded-2xl border border-white/10 p-6 backdrop-blur-xl">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-20 transition duration-500"
                  style={{
                    background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                  className={`bg-gradient-to-r ${feature.gradient}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
