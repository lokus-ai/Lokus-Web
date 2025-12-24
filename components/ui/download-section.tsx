"use client";

import { Download, ArrowRight, Sparkles, Zap, Shield, Cpu } from "lucide-react";
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
  gradient: string;
  iconColor: string;
}

const platforms: Platform[] = [
  {
    id: "macos",
    name: "macOS",
    icon: AppleIcon,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.0.0/Lokus_1.0.0-beta_aarch64.dmg",
    size: "9.7 MB",
    version: "v1.0.0",
    features: ["macOS 11+", "Apple Silicon native", "Native performance", "Spotlight search"],
    gradient: "from-zinc-500 via-zinc-300 to-zinc-500",
    iconColor: "text-zinc-300"
  },
  {
    id: "windows",
    name: "Windows",
    icon: WindowsIcon,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.0.0/Lokus_1.0.0-beta_x64-setup.exe",
    size: "7.33 MB",
    version: "v1.0.0",
    features: ["Windows 10/11", "Auto-updates", "Native performance", "System tray support"],
    gradient: "from-blue-600 via-blue-400 to-blue-600",
    iconColor: "text-blue-400"
  },
  {
    id: "linux",
    name: "Linux",
    icon: LinuxIcon,
    downloadUrl: "https://github.com/lokus-ai/lokus/releases/download/v1.0.0/Lokus_1.0.0_amd64.AppImage",
    size: "85.8 MB",
    version: "v1.0.0",
    features: ["AppImage universal", "Most distributions", "Native performance", "Desktop integration"],
    gradient: "from-orange-600 via-orange-400 to-orange-600",
    iconColor: "text-orange-400"
  }
];

export function DownloadSection({ className }: { className?: string }) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

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


  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.includes("native") || feature.includes("Native")) return <Cpu className="w-4 h-4" />;
    if (feature.includes("Auto") || feature.includes("update")) return <Zap className="w-4 h-4" />;
    if (feature.includes("universal") || feature.includes("distributions")) return <Shield className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  return (
    <section
      id="download"
      className={cn("relative py-32 bg-black overflow-hidden", className)}
    >
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent" />

      {/* Static background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 shadow-lg shadow-indigo-500/10">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-zinc-300">Ready to experience the future?</span>
          </div>

          <h2 className="text-6xl md:text-8xl font-bold mb-8 text-white tracking-tight">
            Download Lokus
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Choose your platform and unlock the power of connected thinking
          </p>
        </div>

        {/* Hero download button */}
        {selectedPlatform && (
          <div className="flex justify-center mb-16">
            <button
              onClick={() => handleDownload(selectedPlatform)}
              className="group relative"
            >
              {/* Button */}
              <div className="relative px-12 py-6 bg-zinc-950 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl shadow-indigo-500/20 hover:border-indigo-500/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-6 relative z-10">
                  <div className="relative p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
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
                  <div className="pl-4 border-l border-white/10">
                    <ArrowRight className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Platform cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            const isHovered = hoveredPlatform === platform.id;
            const isSelected = selectedPlatform?.id === platform.id;

            return (
              <div
                key={platform.id}
                onMouseEnter={() => setHoveredPlatform(platform.id)}
                onMouseLeave={() => setHoveredPlatform(null)}
                className="relative group"
              >
                <div
                  className={cn(
                    "relative p-8 rounded-2xl border transition-all cursor-pointer overflow-hidden h-full flex flex-col hover:-translate-y-2",
                    "bg-zinc-900/40 backdrop-blur-xl",
                    isSelected
                      ? "border-indigo-500/50 shadow-2xl shadow-indigo-500/10 bg-zinc-900/60"
                      : "border-white/5 hover:border-white/10 hover:bg-zinc-900/60"
                  )}
                  onClick={() => handleDownload(platform)}
                >
                  {/* Static background pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "20px 20px"
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={cn(
                          "p-4 rounded-xl transition-all hover:rotate-2 hover:scale-110",
                          isSelected ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-zinc-800/50 border border-white/5"
                        )}
                      >
                        <Icon className={`w-8 h-8 ${platform.iconColor}`} />
                      </div>

                      {isSelected && (
                        <div className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
                          <span className="text-xs text-indigo-300 font-medium">Detected</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
                    <p className="text-zinc-400 text-sm mb-8">{platform.size} • {platform.version}</p>

                    {/* Features */}
                    <div className="space-y-4 mb-8 flex-1">
                      {platform.features.slice(0, 3).map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3"
                        >
                          <div className={cn(
                            "p-1.5 rounded-lg",
                            isSelected ? "bg-indigo-500/10 text-indigo-400" : "bg-zinc-800 text-zinc-400"
                          )}>
                            <FeatureIcon feature={feature} />
                          </div>
                          <span className="text-sm text-zinc-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Download button */}
                    <div
                      className={cn(
                        "flex items-center gap-3 transition-colors mt-auto pt-6 border-t border-white/5",
                        isSelected ? "text-indigo-400" : "text-zinc-400 group-hover:text-white"
                      )}
                    >
                      <Download className="w-5 h-5" />
                      <span className="font-medium">Download</span>
                      <div className={isHovered ? "translate-x-1 opacity-100" : "opacity-70"}>
                        <ArrowRight className="w-4 h-4 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alternative downloads */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/5">
            <h3 className="text-lg font-semibold text-white">Looking for other options?</h3>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: "All v1.0.0 downloads", url: "https://github.com/lokus-ai/lokus/releases/tag/v1.0.0" },
                { label: "Linux (.deb)", url: "https://github.com/lokus-ai/lokus/releases/download/v1.0.0/Lokus_1.0.0_amd64.deb" },
                { label: "Linux (.rpm)", url: "https://github.com/lokus-ai/lokus/releases/download/v1.0.0/Lokus-1.0.0-1.x86_64.rpm" },
                { label: "macOS (.app.tar.gz)", url: "https://github.com/lokus-ai/lokus/releases/download/v1.0.0/Lokus_aarch64.app.tar.gz" },
                { label: "Installation guide", url: "https://github.com/lokus-ai/lokus/releases" }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:-translate-y-0.5 transition-all group"
                >
                  <span className="text-sm">{link.label}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100" />
                </a>
              ))}
            </div>

            <p className="text-xs text-zinc-500">
              Latest release: v1.0.0 •
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
        </div>
      </div>
    </section>
  );
}