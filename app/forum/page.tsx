"use client"

import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { ExternalLink, MessageCircle, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ForumPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const forumStats = [
    { icon: MessageCircle, label: "Discussions", value: "1.2k" },
    { icon: Users, label: "Members", value: "850" },
    { icon: TrendingUp, label: "Active Today", value: "127" }
  ]

  const forumCategories = [
    {
      title: "General Discussion",
      description: "Share ideas, ask questions, and connect with the community",
      topics: 245,
      posts: 1847
    },
    {
      title: "Technical Support", 
      description: "Get help with Lokus features and troubleshooting",
      topics: 189,
      posts: 923
    },
    {
      title: "Feature Requests",
      description: "Suggest new features and improvements",
      topics: 67,
      posts: 234
    },
    {
      title: "Show & Tell",
      description: "Share your workflows, templates, and creative uses",
      topics: 134,
      posts: 567
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
          <p className="text-gray-400">Loading forum...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Lokus Community
              <span className="block text-3xl md:text-4xl text-gray-400 font-normal mt-2">
                Connect, Learn, Share
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our vibrant community of creators, developers, and knowledge workers 
              building the future of connected thinking.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/forum/demo">
              <Button className="bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 font-semibold px-8 py-3 rounded-xl hover:from-gray-100 hover:to-gray-300 transition-all duration-300">
                View Demo Forum
                <MessageCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              onClick={() => window.open('https://forum.lokusmd.com', '_blank')}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3"
            >
              Live Forum (Coming Soon)
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            {!user && (
              <Link href="/signup">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  Join Community
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {forumStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Forum Categories
            </h2>
            <p className="text-gray-400 text-lg">
              Explore different areas of discussion in our community
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {forumCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => window.open('https://forum.lokusmd.com', '_blank')}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {category.description}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{category.topics} topics</span>
                  <span>{category.posts} posts</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join the Conversation?
            </h2>
            <p className="text-gray-300 mb-6">
              Connect with fellow Lokus users, share knowledge, and help shape the future of our platform.
            </p>
            <Button
              onClick={() => window.open('https://forum.lokusmd.com', '_blank')}
              className="bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 font-semibold px-8 py-3 rounded-xl hover:from-gray-100 hover:to-gray-300 transition-all duration-300"
            >
              Visit Forum
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}