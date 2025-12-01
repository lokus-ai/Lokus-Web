"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AssetSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export function AssetSection({ title, description, children }: AssetSectionProps) {
  return (
    <motion.section
      className="mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      {children}
    </motion.section>
  )
}
