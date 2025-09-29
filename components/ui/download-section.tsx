"use client";

import { motion } from "framer-motion";
import { Download, Monitor, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Custom icon components
const AppleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
  </svg>
);

const LinuxIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Tux penguin simplified icon */}
    <path d="M12 3C10.34 3 9 4.34 9 6C9 6.35 9.07 6.69 9.19 7H9C7.9 7 7 7.9 7 9V10C7 10.55 7.23 11.05 7.59 11.41L8 11.82V13C7.16 13.06 6.49 13.32 6 13.75V14.5C6 15.33 6.67 16 7.5 16C7.67 16 7.83 15.97 7.97 15.91C8.31 16.55 8.97 17 9.75 17C10.53 17 11.19 16.55 11.53 15.91C11.67 15.97 11.83 16 12 16C12.17 16 12.33 15.97 12.47 15.91C12.81 16.55 13.47 17 14.25 17C15.03 17 15.69 16.55 16.03 15.91C16.17 15.97 16.33 16 16.5 16C17.33 16 18 15.33 18 14.5V13.75C17.51 13.32 16.84 13.06 16 13V11.82L16.41 11.41C16.77 11.05 17 10.55 17 10V9C17 7.9 16.1 7 15 7H14.81C14.93 6.69 15 6.35 15 6C15 4.34 13.66 3 12 3M11.5 6.5C11.78 6.5 12 6.72 12 7S11.78 7.5 11.5 7.5 11 7.28 11 7 11.22 6.5 11.5 6.5M12.5 6.5C12.78 6.5 13 6.72 13 7S12.78 7.5 12.5 7.5 12 7.28 12 7 12.22 6.5 12.5 6.5M12 9.5C12.55 9.5 13 9.95 13 10.5C13 11.05 12.55 11.5 12 11.5S11 11.05 11 10.5C11 9.95 11.45 9.5 12 9.5M7.5 18V21H9.5V19.5H14.5V21H16.5V18C16.5 17.45 16.05 17 15.5 17H8.5C7.95 17 7.5 17.45 7.5 18Z" />
  </svg>
);

interface Platform {
  id: string;
  name: string;
  icon: React.ElementType;
  downloadUrl: string;
  size: string;
  version: string;
  features: string[];
}

const platforms: Platform[] = [
  {
    id: "macos",
    name: "macOS",
    icon: AppleIcon,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.2.3/Lokus_1.2.3_aarch64.dmg",
    size: "117 MB",
    version: "v1.2.3",
    features: ["macOS 11+", "Apple Silicon native", "Native performance", "Spotlight search"]
  },
  {
    id: "windows",
    name: "Windows",
    icon: Monitor,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.2.3/Lokus_1.2.3_x64-setup.exe",
    size: "96.3 MB",
    version: "v1.2.3",
    features: ["Windows 10/11", "Auto-updates", "Native performance", "System tray support"]
  },
  {
    id: "linux",
    name: "Linux",
    icon: LinuxIcon,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.2.3/lokus_1.2.3_amd64.AppImage",
    size: "144 MB",
    version: "v1.2.3",
    features: ["AppImage universal", "Most distributions", "Native performance", "Desktop integration"]
  }
];

export function DownloadSection({ className }: { className?: string }) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  // Auto-detect platform (default to macOS)
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      setSelectedPlatform(platforms[0]); // macOS
    } else if (userAgent.includes("win")) {
      setSelectedPlatform(platforms[1]); // Windows
    } else if (userAgent.includes("linux")) {
      setSelectedPlatform(platforms[2]); // Linux
    } else {
      setSelectedPlatform(platforms[0]); // Default to macOS
    }
  }, []);

  const handleDownload = (platform: Platform) => {
    // Direct download from GitHub releases
    window.open(platform.downloadUrl, '_blank');
  };

  return (
    <section id="download" className={cn("relative py-24 bg-black overflow-hidden", className)}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 120, 120, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(120, 120, 120, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(120, 120, 120, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6"
            animate={{
              background: [
                "linear-gradient(to right, #fff, #fff)",
                "linear-gradient(to right, #fff, #d1d5db, #fff)",
                "linear-gradient(to right, #fff, #fff)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ 
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text" as any
            }}
          >
            Ready to start?
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Download Lokus for your platform and experience the future of note-taking
          </p>
        </motion.div>

        {/* Main download area */}
        <div className="max-w-4xl mx-auto">
          {/* Quick download for detected platform */}
          {selectedPlatform && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <motion.button
                onClick={() => handleDownload(selectedPlatform)}
                className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-white text-black font-bold text-xl rounded-2xl shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <selectedPlatform.icon className="w-8 h-8" />
                <span>Download for {selectedPlatform.name}</span>
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-white"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                />
              </motion.button>
              <motion.p 
                className="mt-4 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedPlatform.size} • {selectedPlatform.version}
              </motion.p>
            </motion.div>
          )}

          {/* All platforms grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              const isHovered = hoveredPlatform === platform.id;
              const isSelected = selectedPlatform?.id === platform.id;
              
              return (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredPlatform(platform.id)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                  className="relative"
                >
                  <motion.div
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden",
                      isSelected 
                        ? "bg-gray-900/50 border-gray-600" 
                        : "bg-gray-900/30 border-gray-800 hover:border-gray-700"
                    )}
                    animate={{
                      y: isHovered ? -5 : 0,
                    }}
                    onClick={() => handleDownload(platform)}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-transparent"
                      animate={{
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="w-12 h-12 text-gray-400" />
                        {isSelected && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                          >
                            Detected
                          </motion.span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-2">{platform.name}</h3>
                      
                      <div className="space-y-2 mb-4">
                        {platform.features.slice(0, 2).map((feature) => (
                          <p key={feature} className="text-sm text-gray-500">
                            • {feature}
                          </p>
                        ))}
                      </div>

                      <motion.div
                        className="flex items-center gap-2 text-gray-400"
                        animate={{
                          x: isHovered ? 5 : 0,
                        }}
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Download {platform.size}
                        </span>
                        <ArrowRight className={cn(
                          "w-4 h-4 transition-all duration-300",
                          isHovered ? "translate-x-1 opacity-100" : "opacity-0"
                        )} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Alternative download options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">
            Looking for other options?
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <motion.a
              href="https://github.com/lokus-ai/lokus/releases/tag/v1.2.3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
              whileHover={{ x: 5 }}
            >
              All v1.2.3 downloads
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <span className="text-gray-600">•</span>
            <motion.a
              href="https://github.com/lokus-ai/lokus/releases/download/v1.2.3/Lokus_1.2.3_x64.dmg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
              whileHover={{ x: 5 }}
            >
              macOS Intel (x64)
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <span className="text-gray-600">•</span>
            <motion.a
              href="https://docs-iota-two-79.vercel.app/installation"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
              whileHover={{ x: 5 }}
            >
              Installation guide
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
          <p className="text-sm text-gray-500">
            Latest release: v1.2.3 • <a href="https://github.com/lokus-ai/lokus/releases" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">View all releases</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}