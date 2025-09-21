"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Hero3D } from "@/components/Hero3D"
import { Check, Zap, Link2, Palette, Puzzle, Shield, Sparkles } from "lucide-react"
import { useAuth } from "@/components/auth/AuthProvider"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"

const features = [
  "Inspect and organize your notes with intelligent linking",
  "Tweak themes and layouts in real-time",
  "Customize every aspect of your editing experience",
  "Extend functionality with powerful plugins",
  "Automatic sync across all your devices",
  "Lightning-fast search and navigation"
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function LandingPage() {
  const { user } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/signup')
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white overflow-hidden">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4">
          {/* Background text behind model */}
          <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-48 z-0">
            <div className="text-center opacity-20 select-none">
              <div className="text-3xl md:text-4xl font-mono font-light leading-relaxed" style={{ color: '#ffffff' }}>
                CONNECTING NEURONS<br/>
                SYNAPTIC PATHWAYS
              </div>
            </div>
          </div>
          
          <Hero3D />
          
          <motion.div 
            className="container max-w-4xl mx-auto text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Main heading - moved lower */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 mt-48"
              {...fadeInUp}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Get early access to{" "}
              <span className="text-gradient">Lokus.</span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              The future of note-taking. Lightning-fast, infinitely extensible, and built for developers.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button 
                size="xl" 
                variant="gradient"
                className="text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                onClick={handleGetStarted}
              >
                {user ? 'Open Lokus' : 'Get Early Access'}
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Video Demo Section */}
        <section className="relative py-32 px-4">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-12">
                See <span className="text-gradient">Lokus</span> in action
              </h2>
              
              {/* Laptop mockup with video/screenshot */}
              <div className="relative mx-auto max-w-5xl">
                {/* Minimal laptop frame */}
                <div className="relative bg-gray-900/50 rounded-2xl p-2 shadow-2xl">
                  {/* Browser dots */}
                  <div className="flex items-center gap-1.5 px-4 py-3">
                    <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                  </div>
                  
                  {/* Screen content */}
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-xl text-gray-600">Video Demo Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-24 px-4">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {/* Testimonial 1 */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Lokus transformed how I take notes. The speed is incredible, and the linking system helps me connect ideas I never would have found otherwise.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">Alex Chen</p>
                    <p className="text-xs text-gray-500">Senior Developer</p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Finally a note-taking app that keeps up with my thoughts. The plugin system lets me customize everything exactly how I want it.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">Sarah Johnson</p>
                    <p className="text-xs text-gray-500">Product Designer</p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  The best knowledge management tool I've used. Lokus makes it effortless to build a personal wiki that actually works.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">Mike Wilson</p>
                    <p className="text-xs text-gray-500">Research Scientist</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 px-4">
          <div className="container max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Spark ideas.
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl">
                From personal notes to journaling, knowledge bases, and project management. 
                Obsidian gives you the tools to come up with ideas and organize them.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Links Feature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold text-white">Links</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Create connections between your notes. Link anything to everything — ideas, people, places, books, and beyond. Insert your new personal Wikipedia.
                </p>
                <div className="relative h-40 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-800 transform scale-150 origin-top-left rounded-lg p-6">
                    <div className="space-y-2">
                      <div className="w-32 h-3 bg-gray-600 rounded"></div>
                      <div className="w-24 h-3 bg-gray-700 rounded"></div>
                      <div className="w-28 h-3 bg-gray-600 rounded"></div>
                      <div className="w-20 h-3 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Graph Feature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold text-white">Graph</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Uncover the relationships between your notes. Find patterns in your thinking with a beautiful, engaging and interactive graph.
                </p>
                <div className="relative h-40 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-800 transform scale-150 origin-top-left rounded-lg p-6">
                    <div className="relative">
                      <div className="w-4 h-4 bg-gray-600 rounded-full absolute top-2 left-4"></div>
                      <div className="w-3 h-3 bg-gray-500 rounded-full absolute top-8 left-12"></div>
                      <div className="w-4 h-4 bg-gray-600 rounded-full absolute top-12 left-2"></div>
                      <div className="w-3 h-3 bg-gray-500 rounded-full absolute top-6 left-16"></div>
                      <div className="w-px h-8 bg-gray-600 absolute top-4 left-6 rotate-45"></div>
                      <div className="w-px h-6 bg-gray-600 absolute top-8 left-8 rotate-12"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Canvas Feature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold text-white">Canvas</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  An infinite space to research, brainstorm, diagram, and lay out your ideas. Canvas is a limitless playground for your thoughts and concepts.
                </p>
                <div className="relative h-40 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-800 transform scale-150 origin-top-left rounded-lg p-6">
                    <div className="space-y-3">
                      <div className="w-20 h-12 bg-gray-600 rounded border-2 border-gray-500"></div>
                      <div className="w-16 h-8 bg-gray-700 rounded border border-gray-600 ml-6"></div>
                      <div className="w-24 h-6 bg-gray-600 rounded border border-gray-500 ml-2"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Plugins Feature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold text-white">Plugins</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Build your ideal thinking space. With thousands of plugins and our easy to build ecosystem it's easy to find, customize or develop the exact solution you need.
                </p>
                <div className="relative h-40 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-800 transform scale-150 origin-top-left rounded-lg p-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-16 h-2 bg-gray-600 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="w-20 h-2 bg-gray-600 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <div className="w-18 h-2 bg-gray-600 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Text + Half Image Section */}
        <section className="relative py-24 px-4">
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-bold">
                  Your thoughts, <span className="text-gradient">beautifully organized</span>
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Experience the future of note-taking with Lokus. Lightning-fast performance, 
                  intelligent connections, and unlimited customization in one powerful app.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-1">Real-time collaboration</h4>
                      <p className="text-sm text-gray-400">Work together seamlessly with your team in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-1">Advanced search</h4>
                      <p className="text-sm text-gray-400">Find anything instantly with powerful search capabilities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-1">Cross-platform sync</h4>
                      <p className="text-sm text-gray-400">Access your notes anywhere, on any device</p>
                    </div>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  variant="gradient"
                  className="px-8 py-4 rounded-xl"
                  onClick={handleGetStarted}
                >
                  {user ? 'Open Dashboard' : 'Try Lokus Free'}
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>

              {/* Half-visible Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden"
              >
                <div className="relative h-96 overflow-hidden rounded-l-2xl">
                  {/* Image container that extends beyond visible area */}
                  <div className="absolute inset-0 bg-gray-800 w-[200%] h-full rounded-2xl p-8">
                    {/* Mock interface content */}
                    <div className="space-y-4">
                      {/* Header bar */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="flex-1 bg-gray-700 h-6 rounded ml-4"></div>
                      </div>
                      
                      {/* Content areas */}
                      <div className="grid grid-cols-3 gap-4 h-64">
                        {/* Sidebar */}
                        <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                          <div className="w-full h-3 bg-gray-600 rounded"></div>
                          <div className="w-3/4 h-3 bg-gray-600 rounded"></div>
                          <div className="w-full h-3 bg-gray-600 rounded"></div>
                          <div className="w-2/3 h-3 bg-gray-600 rounded"></div>
                        </div>
                        
                        {/* Main content */}
                        <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                          <div className="w-full h-4 bg-gray-600 rounded"></div>
                          <div className="w-full h-2 bg-gray-600 rounded"></div>
                          <div className="w-5/6 h-2 bg-gray-600 rounded"></div>
                          <div className="w-full h-2 bg-gray-600 rounded"></div>
                          <div className="w-4/5 h-2 bg-gray-600 rounded"></div>
                        </div>
                        
                        {/* Right panel */}
                        <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                          <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto"></div>
                          <div className="w-full h-2 bg-gray-600 rounded"></div>
                          <div className="w-3/4 h-2 bg-gray-600 rounded mx-auto"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle fade effect on the right edge */}
                <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black to-transparent"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Icons Grid */}
        <section className="relative py-24 px-4">
          <div className="container max-w-6xl mx-auto">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <Zap className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-gray-400">Native performance with Tauri & Rust</p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <Link2 className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-2">Smart Linking</h3>
                <p className="text-sm text-gray-400">Wiki-style bidirectional connections</p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <Palette className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-2">Live Theming</h3>
                <p className="text-sm text-gray-400">Real-time customization</p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <Puzzle className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-2">Plugin System</h3>
                <p className="text-sm text-gray-400">VS Code-level extensibility</p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <Shield className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-gray-400">Your data never leaves your device</p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <Sparkles className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-2">AI Ready</h3>
                <p className="text-sm text-gray-400">MCP integration for Claude & more</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-24 px-4">
          <motion.div 
            className="container max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to transform your{" "}
              <span className="text-gradient">note-taking experience?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers already using Lokus.
            </p>
            <Button 
              size="xl" 
              variant="gradient"
              className="text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              Get Early Access Now
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </section>
      </div>
    </main>
    </>
  )
}