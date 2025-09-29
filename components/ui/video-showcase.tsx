"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, Maximize2 } from "lucide-react";
import { useState } from "react";

export function VideoShowcase({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section 
      ref={containerRef}
      className={cn("relative py-24 bg-black overflow-hidden", className)}
    >
      {/* Background gradient effects */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 40%)",
              "radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 40%)",
              "radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 40%)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Macbook Pro Frame */}
          <div className="relative">
            {/* Screen bezel */}
            <div className="relative bg-black rounded-[2.5rem] p-3 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
              
              {/* Screen */}
              <div className="relative bg-gray-900 rounded-[2rem] overflow-hidden aspect-[16/10]">
                {/* Video placeholder with aesthetic background */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
                  {/* Aesthetic placeholder content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Animated circles */}
                      <motion.div
                        className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-full blur-3xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tl from-gray-500/20 to-gray-600/20 rounded-full blur-3xl"
                        animate={{
                          scale: [1.2, 1, 1.2],
                          opacity: [0.5, 0.3, 0.5],
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                      />
                      
                      {/* Play button */}
                      <motion.button
                        className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        <motion.div
                          className="w-20 h-20 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center shadow-2xl"
                          whileHover={{ 
                            boxShadow: "0 0 40px rgba(255,255,255,0.3)"
                          }}
                        >
                          {isPlaying ? (
                            <Pause className="w-8 h-8 text-black ml-0" />
                          ) : (
                            <Play className="w-8 h-8 text-black ml-1" />
                          )}
                        </motion.div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Fake UI elements */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: isHovered ? 0.8 : 0.6 }}
                  >
                    {/* Top bar */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
                      <div className="flex items-center h-full px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                    </div>

                    {/* Side panel */}
                    <div className="absolute left-0 top-12 bottom-0 w-64 bg-gray-800/30 backdrop-blur-sm border-r border-gray-700/50">
                      <div className="p-4 space-y-2">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            className="h-8 bg-gray-700/30 rounded"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Main content area */}
                    <div className="absolute left-64 top-12 right-0 bottom-0 p-8">
                      <motion.div
                        className="h-full bg-gray-800/20 rounded-lg p-6"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="h-4 bg-gray-700/20 rounded w-3/4" />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Video controls overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 mx-4">
                      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white"
                          animate={{ width: isPlaying ? "100%" : "40%" }}
                          transition={{ duration: isPlaying ? 30 : 0 }}
                        />
                      </div>
                    </div>
                    <button className="text-white hover:text-gray-300 transition-colors">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
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