import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface FeaturePageProps {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    image?: React.ReactNode;
    ctaText?: string;
    ctaLink?: string;
}

export function FeaturePage({
    title,
    subtitle,
    description,
    features,
    image,
    ctaText = "Get Started",
    ctaLink = "/download",
}: FeaturePageProps) {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <Navbar />

            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400 backdrop-blur-md mb-8">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span>Feature Spotlight</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                            {title}
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-white">
                                {description}
                            </h2>
                            <div className="space-y-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                                        <p className="text-zinc-300">{feature}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4">
                                <Link
                                    href={ctaLink}
                                    className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
                                >
                                    {ctaText}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full" />
                            <div className="relative bg-zinc-900/50 border border-white/10 rounded-2xl p-2 backdrop-blur-xl shadow-2xl">
                                {image || <div className="aspect-video bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-500">Feature Preview</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
