"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  Download, 
  Github, 
  BookOpen, 
  MessageSquare, 
  Shield, 
  Activity,
  FileText,
  Users,
  TrendingUp,
  Clock,
  Folder,
  Settings,
  Bell,
  User,
  BarChart3,
  Calendar,
  Headphones,
  Hash,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const quickActions = [
  {
    title: "Join Discord",
    description: "Connect with community",
    icon: MessageSquare,
    action: "join_discord"
  },
  {
    title: "Download App",
    description: "Get desktop version",
    icon: Download,
    action: "download_app"
  },
  {
    title: "Documentation",
    description: "Learn how to use Lokus",
    icon: BookOpen,
    action: "docs"
  },
  {
    title: "GitHub",
    description: "View source code",
    icon: Github,
    action: "github"
  }
];

export default function DashboardPage() {
  const { user } = useAuth();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'join_discord':
        window.open('https://discord.gg/2rauPDEXcs', '_blank');
        break;
      case 'download_app':
        window.open('https://github.com/lokus-ai/lokus/releases', '_blank');
        break;
      case 'docs':
        window.open('https://docs.lokusmd.com', '_blank');
        break;
      case 'github':
        window.open('https://github.com/lokus-ai/lokus', '_blank');
        break;
    }
  };

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
            className="mb-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {user ? `Welcome back${user.email ? `, ${user.email.split('@')[0]}` : ''}!` : 'Lokus Dashboard'}
              </h1>
              <p className="text-xl text-gray-400">
                {user ? 'Your Lokus dashboard' : 'Access Lokus resources'}
              </p>
            </div>
          </motion.div>


          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 text-left group"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Icon className="w-8 h-8 text-gray-400 mb-4 group-hover:text-white transition-colors" />
                    <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-400">{action.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Discord Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Join our Discord Community</h3>
                <p className="text-gray-400">Connect with other Lokus users, get help, and share ideas</p>
              </div>
            </div>
            <Button
              onClick={() => handleQuickAction('join_discord')}
              className="bg-white text-black hover:bg-gray-200"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Join Discord Server
            </Button>
          </motion.div>

          {/* Getting Started */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gray-900/50 rounded-2xl p-12 border border-gray-800">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to get started?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Download Lokus and start building your personal knowledge base with the power of local-first note-taking.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => handleQuickAction('docs')}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read the Guide
                </Button>
                <Button
                  onClick={() => handleQuickAction('download_app')}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download App
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