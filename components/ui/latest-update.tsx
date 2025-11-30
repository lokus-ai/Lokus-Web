"use client"

import { useEffect, useState } from "react"
import { client } from "@/lib/sanity"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

interface ChangelogPost {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    version?: string
}

export function LatestUpdate() {
    const [latestPost, setLatestPost] = useState<ChangelogPost | null>(null)

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const query = `*[_type == "changelog"] | order(publishedAt desc)[0] {
          _id,
          title,
          slug,
          publishedAt,
          version
        }`
                const post = await client.fetch(query)
                setLatestPost(post)
            } catch (error) {
                console.error("Failed to fetch latest update:", error)
            }
        }

        fetchLatest()
    }, [])

    if (!latestPost) return null

    return (
        <div className="flex justify-center w-full mb-8">
            <Link href="/changelog">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
                >
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm text-zinc-300 font-medium">
                        <span className="text-emerald-400 font-bold mr-2">New Update</span>
                        {latestPost.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-0.5 duration-300" />
                </motion.div>
            </Link>
        </div>
    )
}
