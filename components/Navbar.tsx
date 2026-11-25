"use client"

import { useAuth } from "@/components/auth/AuthProvider"
import { Logo } from "@/components/ui/logo"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const NAV_ITEMS: Array<{ href: string; label: string; external?: boolean }> = [
  { href: "/features", label: "Features" },
  { href: "/marketplace", label: "Plugins" },
  { href: "/changelog", label: "Changelog" },
  { href: "https://docs.lokusmd.com", label: "Docs", external: true },
  { href: "https://github.com/lokus-ai/lokus", label: "GitHub", external: true },
]

const linkClass =
  "rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-50"

export function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const account = user ? (
    <>
      <Link href="/dashboard" className={linkClass} onClick={() => setOpen(false)}>
        Dashboard
      </Link>
      <button onClick={handleSignOut} className={linkClass}>
        Sign out
      </button>
    </>
  ) : (
    <Link href="/login" className={linkClass} onClick={() => setOpen(false)}>
      Sign in
    </Link>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? "border-white/10 bg-[#0f1011]/90 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 text-zinc-50" aria-label="Lokus home">
          <Logo size={20} animated={false} />
          <span className="text-[15px] font-semibold tracking-tight">Lokus</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {account}
          <Link
            href="/#download"
            className="ml-2 inline-flex h-8 items-center rounded-lg bg-zinc-50 px-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-50"
          >
            Download
          </Link>
        </div>

        <button
          className="-mr-2 p-2 text-zinc-300 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 px-3 pb-4 pt-2 md:hidden">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className={linkClass} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ),
            )}
            {account}
            <Link
              href="/#download"
              onClick={() => setOpen(false)}
              className="mx-3 mt-3 inline-flex h-10 items-center justify-center rounded-lg bg-zinc-50 text-sm font-medium text-zinc-950"
            >
              Download
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
