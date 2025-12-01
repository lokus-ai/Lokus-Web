"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface TextCopyCardProps {
  title: string
  content: string
  variant: 'short' | 'medium' | 'long'
}

export function TextCopyCard({ title, content, variant }: TextCopyCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'short':
        return 'border-indigo-500/20'
      case 'medium':
        return 'border-purple-500/20'
      case 'long':
        return 'border-pink-500/20'
    }
  }

  return (
    <motion.div
      className={`bg-zinc-900/50 backdrop-blur-sm border ${getVariantStyles()} rounded-2xl p-6 hover:border-white/20 transition-all duration-300`}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-white mb-1">{title}</h3>
          <p className="text-xs text-zinc-500">
            {content.length} characters
          </p>
        </div>

        {/* Copy Button */}
        <motion.button
          onClick={handleCopy}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-white/5 hover:border-white/10 rounded-lg flex items-center gap-2 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-300">Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Content */}
      <div className="bg-black/20 rounded-lg p-4 border border-white/5">
        <p className="text-zinc-300 leading-relaxed">
          {content}
        </p>
      </div>
    </motion.div>
  )
}
