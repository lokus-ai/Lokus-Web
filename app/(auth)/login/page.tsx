"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-4xl font-normal text-white mb-2">Welcome back</h1>
            <p className="text-gray-400">Enter your email to sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border border-gray-800 rounded text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-gray-400 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border border-gray-800 rounded text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-gray-400 hover:text-white transition-colors">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-white text-black rounded font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-gray-400">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2 bg-transparent border border-gray-800 text-white rounded hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-white hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Video */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/fAtxbHdNEPZIATC1aefDgqtuku0.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-3xl font-light mb-4">Build your second brain</h2>
            <p className="text-gray-300 max-w-md">
              Connect your thoughts, organize your knowledge, and accelerate your learning with Lokus.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}