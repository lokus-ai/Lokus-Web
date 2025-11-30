import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getAllContent } from "@/lib/content";

// This is a Server Component
export default async function BlogIndexPage() {
    const posts = getAllContent("blog");

    return (
        <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <Navbar />

            <section className="relative pt-32 pb-20 min-h-screen">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none opacity-30" />

                <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                            Blog
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                            Thoughts on productivity, knowledge management, and the future of work.
                        </p>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                                <article className="h-full bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col">
                                    {/* Image Placeholder if no image */}
                                    <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-105 transition-transform duration-500" />
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.date).toLocaleDateString()}
                                            </div>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {post.author}
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                                            {post.description}
                                        </p>

                                        <div className="flex items-center text-sm font-medium text-indigo-400 group-hover:translate-x-1 transition-transform">
                                            Read more <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
