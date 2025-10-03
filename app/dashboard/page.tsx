"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  Download, 
  Github, 
  BookOpen, 
  MessageSquare, 
  Shield, 
  Cpu,
  HardDrive,
  Zap,
  ArrowRight,
  ExternalLink,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Platform detection
function detectPlatform() {
  if (typeof window === "undefined") return "unknown";
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes("mac")) return "macos";
  if (userAgent.includes("win")) return "windows";
  if (userAgent.includes("linux")) return "linux";
  return "unknown";
}

const downloadLinks = {
  macos: {
    primary: {
      name: "macOS (Apple Silicon)",
      url: "https://github.com/lokus-ai/lokus/releases/download/v1.2.3/Lokus_1.2.3_aarch64.dmg",
      size: "117 MB",
      icon: Cpu
    },
    secondary: {
      name: "macOS (Intel)",
      url: "https://github.com/lokus-ai/lokus/releases/download/v1.2.3/Lokus_1.2.3_x64.dmg",
      size: "122 MB",
      icon: Cpu
    }
  },
  windows: {
    primary: {
      name: "Windows Installer",
      url: "https://github.com/lokus-ai/lokus/releases/download/v1.2.3/Lokus_1.2.3_x64-setup.exe",
      size: "96.3 MB",
      icon: HardDrive
    },
    secondary: undefined
  },
  linux: {
    primary: {
      name: "Linux AppImage",
      url: "https://github.com/lokus-ai/lokus/releases/download/v1.2.3/lokus_1.2.3_amd64.AppImage",
      size: "144 MB",
      icon: HardDrive
    },
    secondary: undefined
  }
};

const quickLinks = [
  {
    title: "Documentation",
    description: "Learn how to use Lokus effectively",
    href: "https://docs.lokusmd.com",
    icon: BookOpen,
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    title: "GitHub Repository",
    description: "View source code and contribute",
    href: "https://github.com/lokus-ai/lokus",
    icon: Github,
    color: "from-gray-500/20 to-gray-600/20"
  },
  {
    title: "Community Forum",
    description: "Get help and share ideas",
    href: "https://github.com/lokus-ai/lokus/discussions",
    icon: MessageSquare,
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    title: "Report Issues",
    description: "Help us improve Lokus",
    href: "https://github.com/lokus-ai/lokus/issues",
    icon: Shield,
    color: "from-red-500/20 to-red-600/20"
  }
];

const features = [
  "Native performance with Tauri",
  "Local-first data storage",
  "Markdown-based notes",
  "Graph visualization",
  "Plugin system",
  "Cross-platform support"
];

export default function DashboardPage() {
  const { user } = useAuth();
  const platform = detectPlatform();

  const platformDownloads = downloadLinks[platform as keyof typeof downloadLinks] || downloadLinks.macos;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black">
        <div className="container max-w-7xl mx-auto px-4 py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              {user ? `Welcome back${user.email ? `, ${user.email.split('@')[0]}` : ''}!` : 'Lokus Dashboard'}
            </h1>
            <p className="text-xl text-gray-400">
              {user ? 'Your personal Lokus dashboard' : 'Download Lokus for your platform'}
            </p>
          </motion.div>

          {/* Downloads Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Download className="w-6 h-6 text-gray-400" />
              Downloads
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Download */}
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700/10 to-gray-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <platformDownloads.primary.icon className="w-8 h-8 text-gray-400" />
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {platformDownloads.primary.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    Version 1.2.3 • {platformDownloads.primary.size}
                  </p>
                  
                  <motion.a
                    href={platformDownloads.primary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                    Download Now
                  </motion.a>
                </div>
              </motion.div>

              {/* Secondary Download (if available) */}
              {platformDownloads.secondary && (
                <motion.div
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/5 to-gray-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <platformDownloads.secondary.icon className="w-8 h-8 text-gray-500 mb-4" />
                    
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">
                      {platformDownloads.secondary.name}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-4">
                      Version 1.2.3 • {platformDownloads.secondary.size}
                    </p>
                    
                    <motion.a
                      href={platformDownloads.secondary.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-800 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Other platforms */}
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://github.com/lokus-ai/lokus/releases/tag/v1.2.3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                All platforms
                <ExternalLink className="w-4 h-4" />
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="https://github.com/lokus-ai/lokus/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                Installation guide
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.section>

          {/* Quick Links */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-gray-400" />
              Quick Links
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.title}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <Icon className="w-8 h-8 text-gray-400 mb-3" />
                      <h3 className="font-semibold text-white mb-1">{link.title}</h3>
                      <p className="text-sm text-gray-400">{link.description}</p>
                      
                      <motion.div
                        className="flex items-center gap-1 mt-3 text-gray-500"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <span className="text-xs">Open</span>
                        <ArrowRight className="w-3 h-3" />
                      </motion.div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.section>

          {/* Features */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3 bg-gray-900/30 rounded-lg p-4 border border-gray-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Getting Started CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 border border-gray-700">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Download Lokus and start building your personal knowledge base with the power of local-first note-taking.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => window.open("https://docs.lokusmd.com/getting-started", "_blank")}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read the Guide
                </Button>
                <Button
                  onClick={() => window.open("https://github.com/lokus-ai/lokus/discussions", "_blank")}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
}