"use client"

import Link from "next/link"
import { Github, Heart, ArrowUp } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const footerSections: Array<{
    title: string;
    links: Array<{ href: string; label: string; external?: boolean }>;
  }> = [
      {
        title: "Product",
        links: [
          { href: "#download", label: "Download" },
          { href: "/blog", label: "Blog" },
          { href: "https://docs.lokusmd.com", label: "Documentation", external: true },
          { href: "https://github.com/lokus-ai/lokus", label: "GitHub", external: true },
        ]
      },
      {
        title: "Resources",
        links: [
          { href: "/resources", label: "Brand Resources" },
          { href: "/changelog", label: "Changelog" },
          { href: "https://docs.lokusmd.com/getting-started", label: "Getting Started", external: true },
          { href: "https://docs.lokusmd.com/user-guide", label: "User Guide", external: true },
          { href: "https://github.com/lokus-ai/lokus/releases", label: "Releases", external: true },
          { href: "https://github.com/lokus-ai/lokus/issues", label: "Support", external: true }
        ]
      },
      {
        title: "Community",
        links: [
          { href: "https://github.com/lokus-ai/lokus/discussions", label: "Discussions", external: true },
          { href: "https://github.com/lokus-ai/lokus/issues", label: "Bug Reports", external: true },
          { href: "https://github.com/lokus-ai/lokus/blob/main/CONTRIBUTING.md", label: "Contributing", external: true },
          { href: "https://github.com/lokus-ai/lokus/blob/main/LICENSE", label: "License", external: true }
        ]
      }
    ]

  const socialLinks = [
    { href: "https://github.com/lokus-ai/lokus", icon: Github, label: "GitHub" }
  ]


  return (
    <footer className="relative bg-zinc-950 border-t border-white/5">
      {/* Background Effects - CSS animated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -left-60 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-60 -right-60 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <Link href="/" className="flex items-center gap-3 group mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-xl blur-lg animate-pulse-slow" />
                    <Logo
                      size={48}
                      className="relative z-10 drop-shadow-lg"
                      animated={false}
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold text-2xl text-white tracking-tight">
                      Lokus
                    </span>
                    <span className="text-sm text-zinc-400 font-medium tracking-wide">
                      Think. Connect. Create.
                    </span>
                  </div>
                </Link>

                <p className="text-zinc-400 mb-6 leading-relaxed">
                  The future of knowledge management. Build your personal wiki,
                  connect ideas, and unleash your creativity with our local-first
                  note-taking platform.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-white/10 rounded-xl flex items-center justify-center group transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Footer Links */}
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="font-semibold text-white text-lg mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-indigo-400 transition-all duration-300 hover:translate-x-1 inline-block"
                          >
                            {link.label}
                          </a>
                        ) : link.href.startsWith('#') ? (
                          <a
                            href={link.href}
                            onClick={(e) => handleAnchorClick(e, link.href)}
                            className="text-zinc-400 hover:text-indigo-400 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-zinc-400 hover:text-indigo-400 transition-all duration-300 hover:translate-x-1 inline-block"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Bottom Section */}
        <section className="py-8 border-t border-white/5">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <span>© 2024 Lokus. Made with</span>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-heartbeat" />
                <span>in the digital realm.</span>
              </div>

              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-95 text-sm group"
              >
                <span>Back to top</span>
                <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.2);
          }
        }
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>
    </footer>
  )
}
