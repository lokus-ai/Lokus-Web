"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Users, TrendingUp, Plus, Search, Bell } from "lucide-react"
import { motion } from "framer-motion"

export default function ForumDemoPage() {
  const [selectedCategory, setSelectedCategory] = useState("general")

  const mockCategories = [
    { id: "general", name: "General Discussion", count: 45, color: "bg-blue-500" },
    { id: "support", name: "Technical Support", count: 23, color: "bg-orange-500" },
    { id: "features", name: "Feature Requests", count: 12, color: "bg-purple-500" },
    { id: "showcase", name: "Show & Tell", count: 18, color: "bg-green-500" }
  ]

  const mockTopics = [
    {
      id: 1,
      title: "How do you organize your notes in Lokus?",
      author: "sarah_researcher",
      replies: 23,
      views: 156,
      lastActivity: "2 hours ago",
      category: "general",
      pinned: true
    },
    {
      id: 2,
      title: "Bug: Canvas performance issues with large graphs",
      author: "dev_mike",
      replies: 8,
      views: 45,
      lastActivity: "4 hours ago",
      category: "support",
      pinned: false
    },
    {
      id: 3,
      title: "Request: Dark mode for mobile app",
      author: "ui_enthusiast",
      replies: 15,
      views: 89,
      lastActivity: "6 hours ago",
      category: "features",
      pinned: false
    },
    {
      id: 4,
      title: "My research workflow with Lokus + Obsidian",
      author: "academic_user",
      replies: 31,
      views: 234,
      lastActivity: "1 day ago",
      category: "showcase",
      pinned: false
    }
  ]

  const filteredTopics = selectedCategory === "all" 
    ? mockTopics 
    : mockTopics.filter(topic => topic.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-white">Lokus Community</h1>
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-300">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 hover:from-gray-100 hover:to-gray-300">
              <Plus className="h-4 w-4 mr-2" />
              New Topic
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === "all" 
                      ? "bg-gray-600 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  All Categories
                </button>
                {mockCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === category.id 
                        ? "bg-gray-600 text-white" 
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${category.color} mr-3`} />
                      {category.name}
                    </div>
                    <span className="text-xs bg-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 space-y-4">
                <h4 className="text-white font-medium">Community Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Topics
                    </div>
                    <span className="text-white">1,247</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      Members
                    </div>
                    <span className="text-white">856</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Online
                    </div>
                    <span className="text-white">23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
              {/* Topics Header */}
              <div className="bg-gray-700/50 px-6 py-4 border-b border-gray-600">
                <h2 className="text-white font-semibold">
                  {selectedCategory === "all" 
                    ? "All Topics" 
                    : mockCategories.find(c => c.id === selectedCategory)?.name || "Topics"
                  }
                </h2>
              </div>

              {/* Topics List */}
              <div className="divide-y divide-gray-600">
                {filteredTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-700/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {topic.pinned && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-600 text-white">
                              Pinned
                            </span>
                          )}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            mockCategories.find(c => c.id === topic.category)?.color || 'bg-gray-600'
                          } text-white`}>
                            {mockCategories.find(c => c.id === topic.category)?.name}
                          </span>
                        </div>
                        <h3 className="text-white font-medium mb-2 hover:text-gray-300 transition-colors">
                          {topic.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>by {topic.author}</span>
                          <span>•</span>
                          <span>{topic.lastActivity}</span>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-400 space-y-1">
                        <div>{topic.replies} replies</div>
                        <div>{topic.views} views</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Demo Notice */}
            <div className="mt-6 bg-blue-900/20 border border-blue-700 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-300 text-sm">
                  This is a demo of the forum interface. The actual Discourse forum will have full functionality.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}