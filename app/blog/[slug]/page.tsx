import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const slugs = getContentSlugs("blog");
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ""),
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getContentBySlug("blog", slug);

    if (!post) {
        notFound();
    }

    const options = {
        mdxOptions: {
            rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
                [
                    rehypePrettyCode,
                    {
                        theme: "github-dark",
                        keepBackground: false,
                    },
                ],
            ],
        },
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <Navbar />

            <article className="relative pt-32 pb-20 min-h-screen">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none opacity-30" />

                <div className="container mx-auto px-4 relative z-10 max-w-3xl">
                    <Link href="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    <header className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-4 text-sm text-zinc-500 mb-6">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.meta.date).toLocaleDateString()}
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                                <User className="w-4 h-4" />
                                {post.meta.author}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                            {post.meta.title}
                        </h1>

                        {post.meta.description && (
                            <p className="text-xl text-zinc-400 leading-relaxed">
                                {post.meta.description}
                            </p>
                        )}
                    </header>

                    <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-400 prose-img:rounded-xl prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-white/10">
                        {/* @ts-ignore */}
                        <MDXRemote source={post.content} options={options} />
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
