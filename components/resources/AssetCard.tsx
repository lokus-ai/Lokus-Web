"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { DownloadButton } from "./DownloadButton"

interface AssetCardProps {
  title: string
  description: string
  format: string
  size: string
  downloadUrl: string
  previewUrl: string
  dimensions: string
  type: 'logo' | 'screenshot' | 'banner'
}

export function AssetCard({
  title,
  description,
  format,
  size,
  downloadUrl,
  previewUrl,
  dimensions,
  type
}: AssetCardProps) {
  // Different preview backgrounds based on type
  const getPreviewBackground = () => {
    if (type === 'logo') {
      // Checkered background for logos to show transparency
      return 'bg-gradient-to-br from-zinc-800 to-zinc-900'
    }
    return 'bg-zinc-800'
  }

  return (
    <motion.div
      className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 flex flex-col h-full"
      whileHover={{ y: -4 }}
    >
      {/* Preview */}
      <div className={`aspect-square ${getPreviewBackground()} relative overflow-hidden group`}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-8"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={previewUrl}
            alt={title}
            width={400}
            height={400}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Format Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-white">
            {format}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-zinc-400 mb-3">
            {description}
          </p>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span>{dimensions}</span>
            <span>•</span>
            <span>{size}</span>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-4">
          <DownloadButton
            url={downloadUrl}
            filename={`${title.toLowerCase().replace(/\s+/g, '-')}.${format.toLowerCase()}`}
            size={size}
            variant="ghost"
          />
        </div>
      </div>
    </motion.div>
  )
}
