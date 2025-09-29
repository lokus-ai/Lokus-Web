"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Heart, ArrowUp } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerSections: Array<{
    title: string;
    links: Array<{ href: string; label: string; external?: boolean }>;
  }> = [
    {
      title: "Product",
      links: [
        { href: "#download", label: "Download", external: false },
        { href: "https://docs-iota-two-79.vercel.app/", label: "Documentation", external: true },
        { href: "https://github.com/lokus-ai/lokus", label: "GitHub", external: true },
        { href: "#features", label: "Features" }
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "https://docs-iota-two-79.vercel.app/getting-started", label: "Getting Started", external: true },
        { href: "https://docs-iota-two-79.vercel.app/user-guide", label: "User Guide", external: true },
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
    <footer className="relative bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-60 -left-60 w-96 h-96 bg-gradient-to-br from-gray-600/3 to-gray-800/3 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-60 -right-60 w-96 h-96 bg-gradient-to-tl from-gray-500/3 to-gray-700/3 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.section 
          className="py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Brand Section */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Link href="/" className="flex items-center gap-3 group mb-6">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 rounded-xl blur-lg"
                      animate={{
                        opacity: [0.4, 0.7, 0.4]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <Logo 
                      size={48}
                      className="relative z-10 drop-shadow-lg"
                      animated={false}
                    />
                  </motion.div>
                  
                  <div className="flex flex-col">
                    <span className="font-bold text-2xl text-white tracking-tight">
                      Lokus
                    </span>
                    <span className="text-sm text-gray-400 font-medium tracking-wide">
                      Think. Connect. Create.
                    </span>
                  </div>
                </Link>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  The future of knowledge management. Build your personal wiki, 
                  connect ideas, and unleash your creativity with our local-first 
                  note-taking platform.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center group transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </motion.a>
                    )
                  })}
                </div>
              </motion.div>

              {/* Footer Links */}
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 + 0.3 }}
                >
                  <h3 className="font-semibold text-white text-lg mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                      >
                        {link.external ? (
                          <a 
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-300 group flex items-center"
                          >
                            <motion.span
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              {link.label}
                            </motion.span>
                          </a>
                        ) : (
                          <Link 
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-colors duration-300 group flex items-center"
                          >
                            <motion.span
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              {link.label}
                            </motion.span>
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>


        {/* Bottom Section */}
        <motion.section 
          className="py-8 border-t border-gray-800/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.div 
                className="flex items-center gap-2 text-gray-400"
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.6 }}
              >
                <span>© 2024 Lokus. Made with</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span>in the digital realm.</span>
              </motion.div>
              
              <motion.button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Back to top</span>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </footer>
  )
}