import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, XCircle, ArrowRight, Download } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Lokus vs Obsidian 2025 - Best Free Obsidian Alternative",
  description: "Compare Lokus and Obsidian: both are markdown PKM apps with wiki links and graph view. Lokus is 100% free and open source. See the full comparison.",
  keywords: [
    "Lokus vs Obsidian",
    "Obsidian alternative",
    "free Obsidian alternative",
    "open source Obsidian",
    "Obsidian comparison",
    "best Obsidian alternative 2025",
    "Obsidian free alternative",
    "markdown note app",
    "local-first PKM"
  ],
  openGraph: {
    title: "Lokus vs Obsidian - Best Free Obsidian Alternative 2025",
    description: "Full comparison of Lokus and Obsidian. Both are markdown-based, local-first PKM apps. See which is right for you.",
    url: "https://lokusmd.com/compare/obsidian",
  },
};

const comparisonData = [
  { feature: "Price", lokus: "Free forever", obsidian: "Free / $50+ for extras" },
  { feature: "Open Source", lokus: true, obsidian: false },
  { feature: "Sync Cost", lokus: "Free (use any cloud)", obsidian: "$8/month" },
  { feature: "Publish Cost", lokus: "Free (export anywhere)", obsidian: "$8/month" },
  { feature: "Markdown Editing", lokus: true, obsidian: true },
  { feature: "Wiki Links", lokus: true, obsidian: true },
  { feature: "Backlinks", lokus: true, obsidian: true },
  { feature: "Graph View", lokus: "2D & 3D", obsidian: "2D" },
  { feature: "Infinite Canvas", lokus: "Built-in", obsidian: "Plugin required" },
  { feature: "Templates", lokus: "90+ features", obsidian: "Plugin required" },
  { feature: "Plugins", lokus: true, obsidian: true },
  { feature: "Custom Themes", lokus: true, obsidian: true },
  { feature: "Local Storage", lokus: true, obsidian: true },
  { feature: "Offline Support", lokus: true, obsidian: true },
  { feature: "macOS", lokus: true, obsidian: true },
  { feature: "Windows", lokus: true, obsidian: true },
  { feature: "Linux", lokus: true, obsidian: true },
  { feature: "Mobile Apps", lokus: "Coming soon", obsidian: true },
];

export default function LokusVsObsidian() {
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
            "headline": "Lokus vs Obsidian: Best Free Obsidian Alternative 2025",
            "description": "Compare Lokus and Obsidian PKM apps. Features, pricing, and which is right for you.",
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
              Lokus vs Obsidian: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">2025 Comparison</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Both are excellent markdown-based, local-first PKM apps. Here's how they compare
              and why Lokus might be the best free Obsidian alternative for you.
            </p>
          </div>
        </div>
      </section>

      {/* TL;DR */}
      <section className="py-12 border-y border-zinc-800">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">TL;DR</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
              <h3 className="font-bold text-lg mb-4 text-indigo-400">Choose Lokus if you want:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  100% free with no paid add-ons
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  Open source and auditable code
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  Built-in infinite canvas
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  90+ template features out of the box
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="font-bold text-lg mb-4 text-zinc-400">Choose Obsidian if you want:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  Larger plugin ecosystem
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  Mobile apps available now
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  Official sync service
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  More mature community
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-indigo-400">Lokus</th>
                  <th className="text-center py-4 px-4 font-semibold text-zinc-400">Obsidian</th>
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
                      {row.obsidian === true ? (
                        <CheckCircle2 className="w-5 h-5 text-zinc-500 mx-auto" />
                      ) : row.obsidian === false ? (
                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-zinc-400">{row.obsidian}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container max-w-4xl mx-auto px-4 space-y-16">

          <div>
            <h2 className="text-2xl font-bold mb-6">Pricing: Free vs Freemium</h2>
            <p className="text-zinc-400 mb-4">
              <strong className="text-white">Lokus is 100% free and open source.</strong> There are no paid tiers, no subscription,
              and no features locked behind a paywall. You can use any cloud service (iCloud, Dropbox, Google Drive)
              to sync your notes for free.
            </p>
            <p className="text-zinc-400">
              <strong className="text-white">Obsidian has a freemium model.</strong> The core app is free, but Sync costs $8/month
              ($96/year) and Publish costs $8/month ($96/year). If you want both, that's $192/year.
              Obsidian is also not open source - you can't audit the code.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Features: Built-in vs Plugins</h2>
            <p className="text-zinc-400 mb-4">
              <strong className="text-white">Lokus includes more features out of the box.</strong> Infinite canvas and a
              comprehensive template system (90+ features) are built-in. You don't need to hunt for plugins to get started.
            </p>
            <p className="text-zinc-400">
              <strong className="text-white">Obsidian has a larger plugin ecosystem.</strong> With over 1000 community plugins,
              you can extend Obsidian in many ways. However, this means more setup time and potential compatibility issues.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Philosophy: Open Source vs Proprietary</h2>
            <p className="text-zinc-400 mb-4">
              <strong className="text-white">Lokus is fully open source under the MIT license.</strong> You can inspect the code,
              contribute, fork it, and know exactly what the app is doing. This is important for privacy-conscious users.
            </p>
            <p className="text-zinc-400">
              <strong className="text-white">Obsidian is closed source.</strong> While the app stores notes locally as markdown files,
              you can't verify what the application itself does. The sync service is also proprietary.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-transparent to-indigo-500/10">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Try the Best Free Obsidian Alternative
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Download Lokus for free. No account required. Switch from Obsidian in minutes -
            just point Lokus to your existing markdown vault.
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
