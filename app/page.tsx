"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Hero3D } from "@/components/Hero3D"
import { ArrowRight, Brain, Link, Zap, Users, Lock, Download, Github } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const handleGetStarted = () => {
    window.open('https://github.com/lokus-ai/Lokus/releases', '_blank')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">Lokus</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Button 
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Your ideas,
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    beautifully connected
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Lokus is a powerful note-taking app built for thinkers. Create, link, and discover connections between your ideas like never before.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Lokus
                </Button>
                <Button
                  onClick={() => window.open('https://github.com/lokus-ai/Lokus', '_blank')}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 px-6 py-3 rounded-lg text-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div>
                  <div className="text-2xl font-bold text-blue-400">Lightning Fast</div>
                  <div className="text-sm text-gray-400">Built with Tauri & Rust</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">Open Source</div>
                  <div className="text-sm text-gray-400">MIT License</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">Privacy First</div>
                  <div className="text-sm text-gray-400">Your data stays local</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - 3D Model */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 lg:h-[500px]"
            >
              <Hero3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Built for the way you think
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Lokus combines the best of modern note-taking with powerful features designed for knowledge workers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <Link className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Linked Thinking</h3>
              <p className="text-gray-400">
                Connect your ideas with bidirectional links. Build a web of knowledge that grows with you.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <Zap className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Built with Rust and Tauri for native performance. No lag, no waiting - just pure productivity.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <Users className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Sync</h3>
              <p className="text-gray-400">
                Collaborate seamlessly with others. Share workspaces and work together in real-time.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <Lock className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-400">
                Your data belongs to you. Works offline-first with optional cloud sync when you want it.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <Brain className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Powered</h3>
              <p className="text-gray-400">
                Integrated with Claude via MCP. Get AI assistance directly in your workspace.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <Github className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Open Source</h3>
              <p className="text-gray-400">
                Completely open source under MIT license. Extend, modify, and contribute to the future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to unlock your thinking?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Download Lokus and start building your personal knowledge graph today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download for Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => window.open('https://github.com/lokus-ai/Lokus', '_blank')}
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Star on GitHub
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Brain className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold">Lokus</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <a 
              href="https://github.com/lokus-ai/Lokus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>© 2025 Lokus</span>
          </div>
        </div>
      </footer>
    </div>
  )
}