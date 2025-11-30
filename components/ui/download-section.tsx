"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowRight, Sparkles, Zap, Shield, Cpu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { DitheringShader } from "./dithering-shader";

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
  gradient: string;
  iconColor: string;
}

const platforms: Platform[] = [
  {
    id: "macos",
    name: "macOS",
    icon: AppleIcon,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.3.3/Lokus_1.3.3_aarch64.dmg",
    size: "9.7 MB",
    version: "v1.3.3",
    features: ["macOS 11+", "Apple Silicon native", "Native performance", "Spotlight search"],
    gradient: "from-zinc-500 via-zinc-300 to-zinc-500",
    iconColor: "text-zinc-300"
  },
  {
    id: "windows",
    name: "Windows",
    icon: WindowsIcon,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.3.3/Lokus_1.3.3_x64-setup.exe",
    size: "7.33 MB",
    version: "v1.3.3",
    features: ["Windows 10/11", "Auto-updates", "Native performance", "System tray support"],
    gradient: "from-blue-600 via-blue-400 to-blue-600",
    iconColor: "text-blue-400"
  },
  {
    id: "linux",
    name: "Linux",
    icon: LinuxIcon,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.3.3/Lokus_1.3.3_amd64.AppImage",
    size: "85.8 MB",
    version: "v1.3.3",
    features: ["AppImage universal", "Most distributions", "Native performance", "Desktop integration"],
    gradient: "from-orange-600 via-orange-400 to-orange-600",
    iconColor: "text-orange-400"
  }
];

export function DownloadSection({ className }: { className?: string }) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [shaderInView, setShaderInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Auto-detect platform
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
    window.open(platform.downloadUrl, '_blank');
  };

  // Floating orbs animation
  const FloatingOrb = ({ delay = 0, size = "w-96 h-96", className = "" }) => (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${size} ${className}`}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -100, 50, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.includes("native") || feature.includes("Native")) return <Cpu className="w-4 h-4" />;
    if (feature.includes("Auto") || feature.includes("update")) return <Zap className="w-4 h-4" />;
    if (feature.includes("universal") || feature.includes("distributions")) return <Shield className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  return (
    <motion.section
      ref={sectionRef}
      id="download"
      className={cn("relative py-32 bg-black overflow-hidden", className)}
      style={{ opacity }}
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
            shape="warp"
            type="2x2"
            colorBack="#000000"
            colorFront="#1a1a3a"
            pxSize={4}
            speed={0.6}
            className="w-full h-full"
          />
        )}
      </motion.div>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <FloatingOrb
          delay={0}
          size="w-96 h-96"
          className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 -top-48 -left-48"
        />
        <FloatingOrb
          delay={5}
          size="w-80 h-80"
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 -top-32 -right-32"
        />
        <FloatingOrb
          delay={10}
          size="w-64 h-64"
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 -bottom-32 -left-32"
        />
        <FloatingOrb
          delay={15}
          size="w-72 h-72"
          className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 -bottom-48 -right-48"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      </div>

      <motion.div
        className="container max-w-7xl mx-auto px-4 relative z-10"
        style={{ y }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 shadow-lg shadow-indigo-500/10"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-zinc-300">Ready to experience the future?</span>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl font-bold mb-8 text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Download Lokus
          </motion.h2>
          <motion.p
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Choose your platform and unlock the power of connected thinking
          </motion.p>
        </motion.div>

        {/* Hero download button */}
        {selectedPlatform && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-16"
          >
            <motion.button
              onClick={() => handleDownload(selectedPlatform)}
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button */}
              <div className="relative px-12 py-6 bg-zinc-950 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl shadow-indigo-500/20 group-hover:border-indigo-500/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center gap-6 relative z-10">
                  <div className="relative p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors duration-300">
                    <selectedPlatform.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                      Download for {selectedPlatform.name}
                    </div>
                    <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      {selectedPlatform.size} • {selectedPlatform.version}
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="pl-4 border-l border-white/10"
                  >
                    <ArrowRight className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}

        {/* Platform cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            const isHovered = hoveredPlatform === platform.id;
            const isSelected = selectedPlatform?.id === platform.id;

            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                onMouseEnter={() => setHoveredPlatform(platform.id)}
                onMouseLeave={() => setHoveredPlatform(null)}
                className="relative group"
              >
                <motion.div
                  className={cn(
                    "relative p-8 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col",
                    "bg-zinc-900/40 backdrop-blur-xl",
                    isSelected
                      ? "border-indigo-500/50 shadow-2xl shadow-indigo-500/10 bg-zinc-900/60"
                      : "border-white/5 hover:border-white/10 hover:bg-zinc-900/60"
                  )}
                  whileHover={{ y: -8 }}
                  onClick={() => handleDownload(platform)}
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-[0.03]"
                    animate={{
                      backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "20px 20px"
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        className={cn(
                          "p-4 rounded-xl transition-colors duration-300",
                          isSelected ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-zinc-800/50 border border-white/5"
                        )}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <Icon className={`w-8 h-8 ${platform.iconColor}`} />
                      </motion.div>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full"
                        >
                          <span className="text-xs text-indigo-300 font-medium">Detected</span>
                        </motion.div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
                    <p className="text-zinc-400 text-sm mb-8">{platform.size} • {platform.version}</p>

                    {/* Features */}
                    <div className="space-y-4 mb-8 flex-1">
                      {platform.features.slice(0, 3).map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <div className={cn(
                            "p-1.5 rounded-lg",
                            isSelected ? "bg-indigo-500/10 text-indigo-400" : "bg-zinc-800 text-zinc-400"
                          )}>
                            <FeatureIcon feature={feature} />
                          </div>
                          <span className="text-sm text-zinc-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Download button */}
                    <motion.div
                      className={cn(
                        "flex items-center gap-3 transition-colors mt-auto pt-6 border-t border-white/5",
                        isSelected ? "text-indigo-400" : "text-zinc-400 group-hover:text-white"
                      )}
                      animate={{
                        x: isHovered ? 5 : 0,
                      }}
                    >
                      <Download className="w-5 h-5" />
                      <span className="font-medium">Download</span>
                      <motion.div
                        animate={{
                          x: isHovered ? 5 : 0,
                          opacity: isHovered ? 1 : 0.7,
                        }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Alternative downloads */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/5">
            <h3 className="text-lg font-semibold text-white">Looking for other options?</h3>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: "All v1.3.3 downloads", url: "https://github.com/lokus-ai/lokus/releases/tag/v1.3.3" },
                { label: "Linux (.deb)", url: "https://github.com/lokus-ai/lokus/releases/download/v1.3.3/Lokus_1.3.3_amd64.deb" },
                { label: "Linux (.rpm)", url: "https://github.com/lokus-ai/lokus/releases/download/v1.3.3/Lokus-1.3.3-1.x86_64.rpm" },
                { label: "Windows (.msi)", url: "https://github.com/lokus-ai/lokus/releases/download/v1.3.3/Lokus_1.3.3_x64_en-US.msi" },
                { label: "macOS (Universal .app.tar.gz)", url: "https://github.com/lokus-ai/lokus/releases/download/v1.3.3/Lokus_aarch64.app.tar.gz" },
                { label: "Installation guide", url: "https://github.com/lokus-ai/lokus/releases" }
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-sm">{link.label}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            <p className="text-xs text-zinc-500">
              Latest release: v1.3.3 •
              <a
                href="https://github.com/lokus-ai/lokus/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors ml-1 hover:underline"
              >
                View all releases
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}