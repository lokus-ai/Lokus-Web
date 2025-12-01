"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface ColorSwatchProps {
  name: string
  hex: string
  rgb: string
  usage: string
}

export function ColorSwatch({ name, hex, rgb, usage }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.div
      className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 cursor-pointer"
      whileHover={{ y: -4 }}
      onClick={handleCopy}
    >
      {/* Color Preview */}
      <div
        className="h-32 relative group"
        style={{ backgroundColor: hex }}
      >
        {/* Copy Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2 text-white"
              >
                <Check className="w-5 h-5" />
                <span className="font-medium">Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2 text-white"
              >
                <Copy className="w-5 h-5" />
                <span className="font-medium">Click to copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Color Info */}
      <div className="p-4">
        <h3 className="font-bold text-white mb-2">
          {name}
        </h3>
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">HEX:</span>
            <code className="text-sm font-mono text-zinc-300">{hex}</code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">RGB:</span>
            <code className="text-sm font-mono text-zinc-300">{rgb}</code>
          </div>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          {usage}
        </p>
      </div>
    </motion.div>
  )
}
