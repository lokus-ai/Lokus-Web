"use client"

import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg">Lokus</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-gray-400 hover:text-white"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Sign in
                </Link>
                <Button
                  size="sm"
                  variant="gradient"
                  onClick={() => router.push('/signup')}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}