import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2, XCircle, MinusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Lokus vs Obsidian vs Notion vs Roam - PKM App Comparison 2025",
  description: "Compare Lokus with Obsidian, Notion, Roam Research, and Logseq. Find the best PKM and note-taking app for your needs. Free, open-source alternative comparison.",
  keywords: [
    "Lokus vs Obsidian",
    "Lokus vs Notion",
    "Obsidian alternative",
    "Notion alternative",
    "Roam Research alternative",
    "Logseq alternative",
    "best PKM app comparison",
    "note taking app comparison 2025",
    "personal knowledge management comparison",
    "free Obsidian alternative",
    "open source Notion alternative"
  ],
  openGraph: {
    title: "PKM App Comparison: Lokus vs Obsidian vs Notion vs Roam",
    description: "Find the best PKM app for you. Compare features, pricing, and privacy of top note-taking apps.",
    url: "https://lokusmd.com/compare",
  },
};

const apps = [
  {
    name: "Lokus",
    tagline: "Free, open-source, local-first PKM",
    price: "Free forever",
    priceNote: "Open source, no paywalls",
    highlight: true,
    pros: [
      "100% free and open source",
      "Local-first - data stays on your device",
      "Infinite canvas included",
      "90+ template features",
      "No account required",
      "Cross-platform (macOS, Windows, Linux)"
    ],
    cons: [
      "Newer app, smaller community",
      "No mobile app yet",
      "No built-in sync (use any cloud)"
    ]
  },
  {
    name: "Obsidian",
    tagline: "Popular markdown-based PKM",
    price: "Free / $50+ for Sync",
    priceNote: "Sync & Publish are paid",
    highlight: false,
    pros: [
      "Large plugin ecosystem",
      "Strong community",
      "Local-first storage",
      "Good mobile apps"
    ],
    cons: [
      "Not fully open source",
      "Sync costs $8/month ($96/yr)",
      "Publish costs $8/month",
      "Canvas requires plugin"
    ]
  },
  {
    name: "Notion",
    tagline: "All-in-one workspace",
    price: "Free / $8+ per month",
    priceNote: "Teams start at $8/user/mo",
    highlight: false,
    pros: [
      "Great collaboration features",
      "Databases and views",
      "Clean interface",
      "Mobile apps"
    ],
    cons: [
      "Cloud-only (privacy concerns)",
      "No true offline support",
      "No graph view",
      "No backlinks",
      "Proprietary format"
    ]
  },
  {
    name: "Roam Research",
    tagline: "Outliner-based PKM",
    price: "$15/month",
    priceNote: "$180/year, no free tier",
    highlight: false,
    pros: [
      "Pioneer of bidirectional links",
      "Strong outliner features",
      "Good for daily notes"
    ],
    cons: [
      "Expensive ($180/year)",
      "Cloud-only",
      "No offline support",
      "Limited export options",
      "Smaller team"
    ]
  },
  {
    name: "Logseq",
    tagline: "Open-source outliner PKM",
    price: "Free (Sync paid)",
    priceNote: "Open source, sync coming",
    highlight: false,
    pros: [
      "Open source",
      "Local-first",
      "Good graph view",
      "Outliner format"
    ],
    cons: [
      "Outliner-only (no free-form)",
      "Steeper learning curve",
      "Mobile apps limited",
      "No infinite canvas"
    ]
  }
];

const detailedComparison = [
  {
    category: "Pricing",
    features: [
      { name: "Free tier", lokus: "Full", obsidian: "Full", notion: "Limited", roam: "None", logseq: "Full" },
      { name: "Paid features", lokus: "None", obsidian: "Sync, Publish", notion: "Teams, AI", roam: "All", logseq: "Sync" },
      { name: "Open source", lokus: "Yes", obsidian: "No", notion: "No", roam: "No", logseq: "Yes" },
    ]
  },
  {
    category: "Core Features",
    features: [
      { name: "Markdown editing", lokus: true, obsidian: true, notion: "partial", roam: "partial", logseq: true },
      { name: "Wiki links [[]]", lokus: true, obsidian: true, notion: "partial", roam: true, logseq: true },
      { name: "Backlinks", lokus: true, obsidian: true, notion: false, roam: true, logseq: true },
      { name: "Graph view", lokus: true, obsidian: true, notion: false, roam: true, logseq: true },
      { name: "Infinite canvas", lokus: true, obsidian: "plugin", notion: false, roam: false, logseq: false },
      { name: "Templates", lokus: "90+", obsidian: "plugin", notion: true, roam: "limited", logseq: true },
    ]
  },
  {
    category: "Privacy & Storage",
    features: [
      { name: "Local-first", lokus: true, obsidian: true, notion: false, roam: false, logseq: true },
      { name: "Offline support", lokus: true, obsidian: true, notion: "limited", roam: false, logseq: true },
      { name: "Plain text files", lokus: true, obsidian: true, notion: false, roam: false, logseq: true },
      { name: "No account required", lokus: true, obsidian: true, notion: false, roam: false, logseq: true },
    ]
  },
  {
    category: "Platform",
    features: [
      { name: "macOS", lokus: true, obsidian: true, notion: true, roam: true, logseq: true },
      { name: "Windows", lokus: true, obsidian: true, notion: true, roam: true, logseq: true },
      { name: "Linux", lokus: true, obsidian: true, notion: "web", roam: "web", logseq: true },
      { name: "iOS", lokus: "soon", obsidian: true, notion: true, roam: true, logseq: true },
      { name: "Android", lokus: "soon", obsidian: true, notion: true, roam: true, logseq: true },
    ]
  }
];

function FeatureIcon({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 className="w-5 h-5 text-green-400" />;
  if (value === false) return <XCircle className="w-5 h-5 text-red-400" />;
  if (value === "partial" || value === "limited" || value === "plugin" || value === "web" || value === "soon") {
    return <span className="text-yellow-400 text-sm">{value}</span>;
  }
  return <span className="text-zinc-300">{value}</span>;
}

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Best PKM Apps Compared: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">2025 Edition</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Lokus vs Obsidian vs Notion vs Roam Research vs Logseq.
              Find the best personal knowledge management app for your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Comparison Cards */}
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.slice(0, 3).map((app) => (
              <div
                key={app.name}
                className={`p-6 rounded-2xl border ${
                  app.highlight
                    ? "bg-gradient-to-b from-indigo-500/10 to-transparent border-indigo-500/50"
                    : "bg-zinc-900/50 border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{app.name}</h3>
                  {app.highlight && (
                    <span className="text-xs bg-indigo-500 px-2 py-1 rounded-full">Recommended</span>
                  )}
                </div>
                <p className="text-sm text-zinc-400 mb-2">{app.tagline}</p>
                <p className="text-lg font-semibold text-indigo-400 mb-4">{app.price}</p>
                <p className="text-xs text-zinc-500 mb-4">{app.priceNote}</p>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-green-400 mb-2">Pros</div>
                    <ul className="space-y-1">
                      {app.pros.slice(0, 4).map((pro) => (
                        <li key={pro} className="text-sm text-zinc-400 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-400 mb-2">Cons</div>
                    <ul className="space-y-1">
                      {app.cons.slice(0, 3).map((con) => (
                        <li key={con} className="text-sm text-zinc-400 flex items-start gap-2">
                          <MinusCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Detailed Feature Comparison
          </h2>

          <div className="space-y-12">
            {detailedComparison.map((section) => (
              <div key={section.category}>
                <h3 className="text-xl font-semibold mb-4 text-indigo-400">{section.category}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left py-3 px-4 font-medium">Feature</th>
                        <th className="text-center py-3 px-4 font-medium text-indigo-400">Lokus</th>
                        <th className="text-center py-3 px-4 font-medium text-zinc-400">Obsidian</th>
                        <th className="text-center py-3 px-4 font-medium text-zinc-400">Notion</th>
                        <th className="text-center py-3 px-4 font-medium text-zinc-400">Roam</th>
                        <th className="text-center py-3 px-4 font-medium text-zinc-400">Logseq</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.features.map((row) => (
                        <tr key={row.name} className="border-b border-zinc-800">
                          <td className="py-3 px-4 text-sm">{row.name}</td>
                          <td className="text-center py-3 px-4"><FeatureIcon value={row.lokus} /></td>
                          <td className="text-center py-3 px-4"><FeatureIcon value={row.obsidian} /></td>
                          <td className="text-center py-3 px-4"><FeatureIcon value={row.notion} /></td>
                          <td className="text-center py-3 px-4"><FeatureIcon value={row.roam} /></td>
                          <td className="text-center py-3 px-4"><FeatureIcon value={row.logseq} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Comparisons */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Head-to-Head Comparisons
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/compare/obsidian" className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                Lokus vs Obsidian
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Both are markdown-based and local-first. Compare features, pricing, and philosophy.
              </p>
              <span className="text-indigo-400 text-sm inline-flex items-center gap-1">
                Read comparison <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compare/notion" className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                Lokus vs Notion
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Local-first vs cloud-based. Privacy vs collaboration. Which is right for you?
              </p>
              <span className="text-indigo-400 text-sm inline-flex items-center gap-1">
                Read comparison <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compare/roam" className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                Lokus vs Roam Research
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Free vs $15/month. Compare networked thought features and value.
              </p>
              <span className="text-indigo-400 text-sm inline-flex items-center gap-1">
                Read comparison <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compare/logseq" className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                Lokus vs Logseq
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Two open-source PKM apps. Compare document vs outliner approaches.
              </p>
              <span className="text-indigo-400 text-sm inline-flex items-center gap-1">
                Read comparison <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recommendation */}
      <section className="py-16 bg-gradient-to-b from-transparent to-indigo-500/10">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Our Recommendation
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            If you value <strong className="text-white">privacy</strong>, want a <strong className="text-white">free</strong> solution with no paywalls,
            and prefer <strong className="text-white">local-first</strong> storage, <strong className="text-indigo-400">Lokus</strong> is the best choice.
            It combines the best features of Obsidian (markdown, graph view) with unique features like infinite canvas
            and a powerful template system - all completely free and open source.
          </p>
          <Link
            href="https://github.com/lokus-ai/lokus/releases"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            Try Lokus Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
