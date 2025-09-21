"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    checkUser()
  }, [router, supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome to Lokus</h1>
            <p className="text-gray-400 mt-2">
              Hello {user?.user_metadata?.full_name || user?.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Download Lokus App</h2>
            <p className="text-gray-300 mb-4">
              Get the full Lokus experience with our desktop application.
            </p>
            <div className="space-y-3">
              <a
                href="#"
                className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded text-center transition-colors"
              >
                Download for macOS
              </a>
              <a
                href="#"
                className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded text-center transition-colors"
              >
                Download for Windows
              </a>
              <a
                href="#"
                className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded text-center transition-colors"
              >
                Download for Linux
              </a>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="ml-2">{user?.email}</span>
              </div>
              <div>
                <span className="text-gray-400">Account Type:</span>
                <span className="ml-2">Free</span>
              </div>
              <div>
                <span className="text-gray-400">Member since:</span>
                <span className="ml-2">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Rich text editing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Wiki-style linking
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Graph visualization
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Cloud sync (Premium)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Team collaboration (Pro)
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <p className="text-gray-300 mb-4">
              Need help getting started with Lokus?
            </p>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-blue-400 hover:text-blue-300 transition-colors"
              >
                📚 Documentation
              </a>
              <a
                href="#"
                className="block text-blue-400 hover:text-blue-300 transition-colors"
              >
                💬 Community Forum
              </a>
              <a
                href="#"
                className="block text-blue-400 hover:text-blue-300 transition-colors"
              >
                📧 Contact Support
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-900/20 border border-blue-900/50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">
            🎉 Your account is ready!
          </h3>
          <p className="text-gray-300">
            Download the Lokus app to start building your knowledge base. 
            Your account will automatically sync once you sign in to the app.
          </p>
        </div>
      </div>
    </div>
  )
}