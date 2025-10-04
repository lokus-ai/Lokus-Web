"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
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

const WindowsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
  </svg>
);

const LinuxIcon = ({ className }: { className?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/linux-icon.svg" className={className} alt="Linux" />
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
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.2.3/Lokus_1.0.3_aarch64.dmg",
    size: "117 MB",
    version: "v1.0.3",
    features: ["macOS 11+", "Apple Silicon native", "Native performance", "Spotlight search"]
  },
  {
    id: "windows",
    name: "Windows",
    icon: WindowsIcon,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.2.3/Lokus_1.0.3_x64-setup.exe",
    size: "96.3 MB",
    version: "v1.0.3",
    features: ["Windows 10/11", "Auto-updates", "Native performance", "System tray support"]
  },
  {
    id: "linux",
    name: "Linux",
    icon: LinuxIcon,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/latest",
    size: "144 MB",
    version: "v1.0.3",
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
              href="https://github.com/lokus-ai/lokus/releases"
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