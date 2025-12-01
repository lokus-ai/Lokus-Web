"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  url: string
  filename: string
  size?: string
  variant?: 'primary' | 'ghost'
}

export function DownloadButton({ url, filename, size, variant = 'primary' }: DownloadButtonProps) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300"
  const variantClasses = variant === 'primary'
    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/5 hover:border-white/10"

  return (
    <motion.button
      onClick={handleDownload}
      className={`${baseClasses} ${variantClasses}`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Download className="w-4 h-4" />
      <span>Download</span>
      {size && (
        <span className="text-xs opacity-70">({size})</span>
      )}
    </motion.button>
  )
}
