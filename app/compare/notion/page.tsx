import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, XCircle, ArrowRight, Download, Shield, Cloud, HardDrive } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Lokus vs Notion 2025 - Best Privacy-Focused Notion Alternative",
  description: "Compare Lokus and Notion: local-first vs cloud-based. Lokus keeps your data on your device. See the full comparison for privacy-focused users.",
  keywords: [
    "Lokus vs Notion",
    "Notion alternative",
    "privacy Notion alternative",
    "local Notion alternative",
    "offline Notion alternative",
    "Notion comparison",
    "best Notion alternative 2025",
    "self-hosted Notion",
    "private note taking"
  ],
  openGraph: {
    title: "Lokus vs Notion - Best Privacy-Focused Alternative 2025",
    description: "Local-first vs cloud-based. Compare Lokus and Notion for privacy, features, and pricing.",
    url: "https://lokusmd.com/compare/notion",
  },
};

const comparisonData = [
  { feature: "Price", lokus: "Free forever", notion: "Free / $8+/mo" },
  { feature: "Data Storage", lokus: "Local (your device)", notion: "Cloud (their servers)" },
  { feature: "Privacy", lokus: "100% private", notion: "Data on Notion servers" },
  { feature: "Offline Support", lokus: "Full", notion: "Limited" },
  { feature: "Open Source", lokus: true, notion: false },
  { feature: "Wiki Links", lokus: true, notion: "Partial" },
  { feature: "Backlinks", lokus: true, notion: false },
  { feature: "Graph View", lokus: true, notion: false },
  { feature: "Infinite Canvas", lokus: true, notion: false },
  { feature: "Markdown Files", lokus: true, notion: false },
  { feature: "Templates", lokus: "90+ features", notion: true },
  { feature: "Databases", lokus: "Coming soon", notion: true },
  { feature: "Collaboration", lokus: "Via file sharing", notion: true },
  { feature: "AI Features", lokus: "Plugin", notion: "$10/mo add-on" },
  { feature: "Account Required", lokus: false, notion: true },
  { feature: "macOS", lokus: true, notion: true },
  { feature: "Windows", lokus: true, notion: true },
  { feature: "Mobile Apps", lokus: "Coming soon", notion: true },
];

export default function LokusVsNotion() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Structured Data */}
      <Script
        id="comparison-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Lokus vs Notion: Best Privacy-Focused Alternative 2025",
            "description": "Compare Lokus and Notion. Local-first vs cloud-based note-taking apps.",
            "author": { "@type": "Organization", "name": "Lokus" },
            "datePublished": "2025-01-01",
            "dateModified": new Date().toISOString().split('T')[0]
          })
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Lokus vs Notion: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Privacy Comparison</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Local-first vs cloud-based. If you care about privacy and owning your data,
              here's why Lokus is the best Notion alternative.
            </p>
          </div>
        </div>
      </section>

      {/* Key Difference */}
      <section className="py-12 border-y border-zinc-800">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">The Fundamental Difference</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-center">
              <HardDrive className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-indigo-400">Lokus: Local-First</h3>
              <p className="text-sm text-zinc-400">
                Your notes are stored as markdown files on YOUR device.
                They never touch our servers. Complete privacy and ownership.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <Cloud className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-zinc-400">Notion: Cloud-Based</h3>
              <p className="text-sm text-zinc-400">
                All your notes are stored on Notion's servers.
                Requires internet. They can access your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR */}
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">TL;DR</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
              <h3 className="font-bold text-lg mb-4 text-indigo-400">Choose Lokus if you want:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Shield className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  Complete privacy - data stays on your device
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  Full offline support - work anywhere
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  Plain markdown files - portable forever
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  Graph view and backlinks for connected notes
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="font-bold text-lg mb-4 text-zinc-400">Choose Notion if you want:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  Real-time team collaboration
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  Powerful database features
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  Polished mobile apps
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  All-in-one workspace for teams
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-indigo-400">Lokus</th>
                  <th className="text-center py-4 px-4 font-semibold text-zinc-400">Notion</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="border-b border-zinc-800">
                    <td className="py-4 px-4">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {row.lokus === true ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                      ) : row.lokus === false ? (
                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-green-400">{row.lokus}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.notion === true ? (
                        <CheckCircle2 className="w-5 h-5 text-zinc-500 mx-auto" />
                      ) : row.notion === false ? (
                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-zinc-400">{row.notion}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4 space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Why Privacy Matters</h2>
            <p className="text-zinc-400 mb-4">
              Your notes contain your thoughts, ideas, research, and often sensitive information.
              With <strong className="text-white">Notion, all of this lives on their servers</strong>.
              They have access to your data, and it could be exposed in a breach.
            </p>
            <p className="text-zinc-400">
              With <strong className="text-white">Lokus, your notes are just files on your computer</strong>.
              We never see them. There's no server to breach. You have complete control and ownership.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Features Notion Doesn't Have</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h3 className="font-semibold mb-2">Graph View</h3>
                <p className="text-sm text-zinc-400">Visualize connections between your notes. Notion has no equivalent.</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h3 className="font-semibold mb-2">Backlinks</h3>
                <p className="text-sm text-zinc-400">See all notes that link to the current note. Essential for PKM.</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h3 className="font-semibold mb-2">Infinite Canvas</h3>
                <p className="text-sm text-zinc-400">Whiteboard for visual thinking. Notion doesn't have this.</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h3 className="font-semibold mb-2">Plain Markdown</h3>
                <p className="text-sm text-zinc-400">Your notes are portable. Notion uses a proprietary format.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-transparent to-indigo-500/10">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Take Back Control of Your Notes
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Your notes should belong to you, not a company. Download Lokus and
            experience true privacy with local-first note-taking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://github.com/lokus-ai/lokus/releases"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Lokus Free
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              See All Features
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
