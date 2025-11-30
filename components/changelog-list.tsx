"use client"

import { PortableText } from "next-sanity"
import { format } from "date-fns"
import { motion } from "framer-motion"

interface ChangelogPost {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    body: any
    version?: string
    author?: string
}

export function ChangelogList({ posts }: { posts: ChangelogPost[] }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="text-center text-gray-500 py-12">
                <p>No updates found.</p>
            </div>
        )
    }

    return (
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {posts.map((post, index) => (
                <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                            <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
                        </svg>
                    </div>

                    {/* Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <time className="font-caveat font-medium text-emerald-500">
                                {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                            </time>
                            {post.version && (
                                <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-white/70">
                                    v{post.version}
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                        <div className="prose prose-invert prose-sm max-w-none text-gray-400">
                            <PortableText value={post.body} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
