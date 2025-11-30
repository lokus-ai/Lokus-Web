"use client"

import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Logo } from "@/components/ui/logo"

export function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { scrollY } = useScroll()

  // Advanced transform values
  const headerY = useTransform(scrollY, [0, 100], [0, -10])
  const logoScale = useTransform(scrollY, [0, 200], [1, 0.8])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.3])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? "down" : "up"

      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction)
      }

      setIsScrolled(scrollY > window.innerHeight * 4)
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }

    window.addEventListener("scroll", updateScrollDirection, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollDirection)
  }, [scrollDirection, lastScrollY])

  const navItems: Array<{ href: string; label: string; external?: boolean }> = [
    { href: "/demo", label: "Try Demo" },
    { href: "#features", label: "Features" },
    { href: "https://docs.lokusmd.com", label: "Docs", external: true },
    { href: "#download", label: "Download", external: false },
    { href: "https://github.com/lokus-ai/lokus", label: "GitHub", external: true }
  ]

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-50"
        style={{ y: headerY }}
        animate={{
          y: scrollDirection === "down" && isScrolled ? -120 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* Main header */}
        <motion.div
          className="relative mx-auto"
          animate={{
            scale: isScrolled ? 0.98 : 1,
            borderRadius: isScrolled ? "24px" : "0",
            marginTop: isScrolled ? "32px" : "0",
            marginLeft: isScrolled ? "24px" : "0",
            marginRight: isScrolled ? "24px" : "0",
            maxWidth: isScrolled ? "calc(100% - 48px)" : "100%"
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Background with advanced blur and gradient */}
          <motion.div
            className="absolute inset-0"
            style={{
              backdropFilter: isScrolled ? "blur(20px)" : "blur(8px)",
              borderRadius: isScrolled ? "24px" : "0",
            }}
            animate={{
              background: isScrolled
                ? "linear-gradient(135deg, rgba(24, 24, 27, 0.8) 0%, rgba(24, 24, 27, 0.6) 50%, rgba(24, 24, 27, 0.8) 100%)"
                : "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(0,0,0,0.8))",
              border: isScrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
              boxShadow: isScrolled
                ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
                : "none"
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Animated border - hide when floating */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"
            style={{ opacity: isScrolled ? 0 : borderOpacity.get() }}
          />

          {/* Floating orbs background - only show when not scrolled */}
          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            animate={{ opacity: isScrolled ? 0 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"
              animate={{
                x: isScrolled ? -100 : 0,
                scale: isScrolled ? 0.5 : 1,
                opacity: isScrolled ? 0 : 0.6
              }}
              transition={{ duration: 1.2 }}
            />
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-bl from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
              animate={{
                x: isScrolled ? 100 : 0,
                scale: isScrolled ? 0.5 : 1,
                opacity: isScrolled ? 0 : 0.6
              }}
              transition={{ duration: 1.2, delay: 0.1 }}
            />
          </motion.div>

          <div className="relative z-10">
            <motion.div
              className="container max-w-7xl mx-auto px-6"
              animate={{
                paddingTop: isScrolled ? "12px" : "20px",
                paddingBottom: isScrolled ? "12px" : "20px"
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between">
                {/* Logo */}
                <motion.div style={{ scale: logoScale }}>
                  <Link href="/" className="flex items-center gap-3 group">
                    <motion.div
                      className="relative"
                      animate={{
                        scale: isScrolled ? 0.8 : 1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Logo background with animated glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-xl blur-lg"
                        animate={{
                          opacity: isScrolled ? 0.3 : 0.6
                        }}
                        transition={{ duration: 0.6 }}
                      />
                      <Logo
                        size={isScrolled ? 32 : 40}
                        className="relative z-10 drop-shadow-lg"
                        animated={true}
                      />
                    </motion.div>

                    <motion.div className="flex flex-col">
                      <motion.span
                        className="font-bold text-white tracking-tight"
                        animate={{
                          fontSize: isScrolled ? "20px" : "24px",
                          lineHeight: isScrolled ? "24px" : "28px"
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        Lokus
                      </motion.span>
                      <motion.span
                        className="text-xs text-zinc-400 font-medium tracking-wider"
                        animate={{
                          opacity: isScrolled ? 0 : 1,
                          height: isScrolled ? 0 : "auto"
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        Think. Connect. Create.
                      </motion.span>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <motion.div
                  className="hidden lg:flex items-center"
                  animate={{
                    gap: isScrolled ? "32px" : "48px"
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-8">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative text-zinc-400 hover:text-white transition-all duration-300 group"
                          >
                            <motion.span
                              className="relative z-10"
                              whileHover={{ y: -2 }}
                            >
                              {item.label}
                            </motion.span>
                            <motion.div
                              className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full origin-left"
                              initial={{ scaleX: 0 }}
                              whileHover={{ scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="relative text-zinc-400 hover:text-white transition-all duration-300 group"
                          >
                            <motion.span
                              className="relative z-10"
                              whileHover={{ y: -2 }}
                            >
                              {item.label}
                            </motion.span>
                            <motion.div
                              className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full origin-left"
                              initial={{ scaleX: 0 }}
                              whileHover={{ scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Section */}
                  <div className="flex items-center gap-4">
                    {user ? (
                      <>
                        <Link
                          href="/dashboard"
                          className="text-zinc-400 hover:text-white transition-colors duration-300"
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
                        <motion.div
                          animate={{
                            opacity: isScrolled ? 0 : 1,
                            x: isScrolled ? 20 : 0
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <Link
                            href="/login"
                            className="text-zinc-400 hover:text-white transition-colors duration-300"
                          >
                            Sign in
                          </Link>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={() => router.push('/signup')}
                            className="relative bg-white text-black hover:bg-zinc-200 font-semibold px-6 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20"
                          >
                            <span className="relative z-10">Get Started</span>
                          </Button>
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Mobile menu button */}
                <motion.button
                  className="lg:hidden p-2 text-zinc-400 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={24} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu size={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Scroll progress indicator - hide when floating */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
            style={{
              scaleX: useTransform(scrollY, [0, 3000], [0, 1]),
              opacity: isScrolled ? 0 : 1
            }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="relative z-50 flex flex-col items-center justify-center h-full space-y-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
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
                </motion.div>
              ))}

              <motion.div
                className="pt-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={() => {
                    router.push('/signup')
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-white text-black hover:bg-zinc-200 font-semibold px-8 py-3 rounded-xl shadow-lg shadow-indigo-500/20"
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}