import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Home, Search, BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found - Lokus",
  description: "The page you're looking for doesn't exist. Explore Lokus - the free, open-source PKM app for personal knowledge management.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="text-center max-w-2xl">
          <div className="text-8xl font-bold text-indigo-500 mb-4">404</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-zinc-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              See Features
            </Link>
          </div>

          {/* SEO: Internal links for crawlers */}
          <div className="border-t border-zinc-800 pt-8">
            <p className="text-sm text-zinc-500 mb-4">Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/features" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                Features <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/compare" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                Compare PKM Apps <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/compare/obsidian" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                Lokus vs Obsidian <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/compare/notion" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                Lokus vs Notion <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/blog" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                Blog <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/marketplace" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                Plugins <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
