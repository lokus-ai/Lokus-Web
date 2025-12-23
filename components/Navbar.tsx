"use client"

import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Logo } from "@/components/ui/logo"

export function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  // Throttled scroll handler - only checks periodically, not on every scroll
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems: Array<{ href: string; label: string; external?: boolean }> = [
    { href: "/features", label: "Features" },
    { href: "/compare", label: "Compare" },
    { href: "/demo", label: "Demo" },
    { href: "https://docs.lokusmd.com", label: "Docs", external: true },
    { href: "https://github.com/lokus-ai/lokus/releases", label: "Download", external: true },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'mx-auto mt-4 left-4 right-4 max-w-[calc(100%-32px)] rounded-2xl'
            : ''
        }`}
      >
        {/* Background */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isScrolled
              ? 'bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl shadow-black/20'
              : 'bg-gradient-to-b from-black/60 via-black/40 to-transparent'
          }`}
        />

        {/* Border line at bottom when not scrolled */}
        {!isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
        )}

        <div className="relative z-10">
          <div
            className={`container max-w-7xl mx-auto px-6 transition-all duration-300 ${
              isScrolled ? 'py-3' : 'py-5'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  {/* Logo glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-xl blur-lg transition-opacity duration-300 ${
                    isScrolled ? 'opacity-30' : 'opacity-60'
                  }`} />
                  <Logo
                    size={isScrolled ? 32 : 40}
                    className="relative z-10 drop-shadow-lg transition-all duration-300"
                    animated={false}
                  />
                </div>

                <div className="flex flex-col">
                  <span className={`font-bold text-white tracking-tight transition-all duration-300 ${
                    isScrolled ? 'text-xl' : 'text-2xl'
                  }`}>
                    Lokus
                  </span>
                  <span className={`text-xs text-zinc-400 font-medium tracking-wider transition-all duration-300 ${
                    isScrolled ? 'opacity-0 h-0' : 'opacity-100'
                  }`}>
                    Think. Connect. Create.
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className={`hidden lg:flex items-center transition-all duration-300 ${
                isScrolled ? 'gap-8' : 'gap-12'
              }`}>
                <div className="flex items-center gap-8">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative text-zinc-400 hover:text-white transition-colors duration-200 group"
                        >
                          <span>{item.label}</span>
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full group-hover:w-full transition-all duration-300" />
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="relative text-zinc-400 hover:text-white transition-colors duration-200 group"
                        >
                          <span>{item.label}</span>
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full group-hover:w-full transition-all duration-300" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="flex items-center gap-4">
                  {user ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="text-zinc-400 hover:text-white transition-colors duration-200"
                      >
                        Dashboard
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      >
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className={`text-zinc-400 hover:text-white transition-all duration-300 ${
                          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                      >
                        Sign in
                      </Link>

                      <Button
                        onClick={() => router.push('/signup')}
                        className="relative bg-white text-black hover:bg-zinc-200 font-semibold px-6 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105 active:scale-95"
                      >
                        <span className="relative z-10">Get Started</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative z-50 flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item, index) => (
              <div
                key={item.href}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-light text-white hover:text-indigo-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-2xl font-light text-white hover:text-indigo-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-8">
              <Button
                onClick={() => {
                  router.push('/signup')
                  setIsMobileMenuOpen(false)
                }}
                className="bg-white text-black hover:bg-zinc-200 font-semibold px-8 py-3 rounded-xl shadow-lg shadow-indigo-500/20"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  )
}
