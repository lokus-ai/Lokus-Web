"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function WaveBackground({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated SVG Waves */}
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
          </linearGradient>
          <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.005)" />
          </linearGradient>
        </defs>

        {/* Wave 1 - Furthest back */}
        <motion.path
          d="M0,300 C300,250 600,350 900,300 C1050,275 1125,300 1200,300 L1200,600 L0,600 Z"
          fill="url(#wave-gradient-1)"
          initial={{ d: "M0,300 C300,250 600,350 900,300 C1050,275 1125,300 1200,300 L1200,600 L0,600 Z" }}
          animate={{
            d: [
              "M0,300 C300,250 600,350 900,300 C1050,275 1125,300 1200,300 L1200,600 L0,600 Z",
              "M0,320 C300,270 600,370 900,320 C1050,295 1125,320 1200,320 L1200,600 L0,600 Z",
              "M0,280 C300,230 600,330 900,280 C1050,255 1125,280 1200,280 L1200,600 L0,600 Z",
              "M0,300 C300,250 600,350 900,300 C1050,275 1125,300 1200,300 L1200,600 L0,600 Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Wave 2 - Middle */}
        <motion.path
          d="M0,350 C250,300 500,400 750,350 C900,325 1050,350 1200,350 L1200,600 L0,600 Z"
          fill="url(#wave-gradient-2)"
          initial={{ d: "M0,350 C250,300 500,400 750,350 C900,325 1050,350 1200,350 L1200,600 L0,600 Z" }}
          animate={{
            d: [
              "M0,350 C250,300 500,400 750,350 C900,325 1050,350 1200,350 L1200,600 L0,600 Z",
              "M0,330 C250,280 500,380 750,330 C900,305 1050,330 1200,330 L1200,600 L0,600 Z",
              "M0,370 C250,320 500,420 750,370 C900,345 1050,370 1200,370 L1200,600 L0,600 Z",
              "M0,350 C250,300 500,400 750,350 C900,325 1050,350 1200,350 L1200,600 L0,600 Z"
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Wave 3 - Closest */}
        <motion.path
          d="M0,400 C200,350 400,450 600,400 C800,375 1000,400 1200,400 L1200,600 L0,600 Z"
          fill="url(#wave-gradient-3)"
          initial={{ d: "M0,400 C200,350 400,450 600,400 C800,375 1000,400 1200,400 L1200,600 L0,600 Z" }}
          animate={{
            d: [
              "M0,400 C200,350 400,450 600,400 C800,375 1000,400 1200,400 L1200,600 L0,600 Z",
              "M0,420 C200,370 400,470 600,420 C800,395 1000,420 1200,420 L1200,600 L0,600 Z",
              "M0,380 C200,330 400,430 600,380 C800,355 1000,380 1200,380 L1200,600 L0,600 Z",
              "M0,400 C200,350 400,450 600,400 C800,375 1000,400 1200,400 L1200,600 L0,600 Z"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_70%)]" />
    </div>
  );
}