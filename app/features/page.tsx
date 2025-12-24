import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  FileText, Link2, Network, Infinity, Layout, Puzzle,
  Palette, Wifi, Shield, Zap, Download, ArrowRight,
  CheckCircle2, Globe, Lock, Cpu
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features - Best PKM App for Personal Knowledge Management",
  description: "Discover Lokus features: markdown editor, wiki links, backlinks, graph view, infinite canvas, templates, plugins. The best free PKM app and Obsidian alternative for 2025.",
  keywords: [
    "PKM app features",
    "personal knowledge management features",
    "markdown note taking",
    "wiki links",
    "backlinks",
    "graph view",
    "infinite canvas",
    "note taking app features",
    "second brain app",
    "best PKM features",
    "Obsidian features comparison",
    "Notion alternative features"
  ],
  openGraph: {
    title: "Lokus Features - Best PKM App for Personal Knowledge Management",
    description: "Discover why Lokus is the best free PKM app. Markdown, wiki links, graph view, infinite canvas, and more.",
    url: "https://lokusmd.com/features",
  },
};

const features = [
  {
    icon: FileText,
    title: "Rich Markdown Editor",
    description: "Full markdown support with live preview, syntax highlighting, tables, code blocks, math equations (KaTeX), and smart paste. Write naturally without leaving your keyboard.",
    highlights: ["Live preview", "Math equations", "Code syntax highlighting", "Tables & lists"]
  },
  {
    icon: Link2,
    title: "Wiki Links & Backlinks",
    description: "Connect your ideas with [[wiki links]]. See all backlinks to any note instantly. Build a network of interconnected knowledge like a personal Wikipedia.",
    highlights: ["[[wiki links]]", "Automatic backlinks", "Link autocomplete", "Unlinked mentions"]
  },
  {
    icon: Network,
    title: "Graph View (2D & 3D)",
    description: "Visualize connections between your notes in interactive 2D and 3D graph views. Discover hidden patterns and navigate your knowledge base spatially.",
    highlights: ["Interactive 2D graph", "3D visualization", "Filter by tags", "Zoom & pan"]
  },
  {
    icon: Infinity,
    title: "Infinite Canvas",
    description: "Unlimited whiteboard for visual thinking. Sketch ideas, create diagrams, arrange notes spatially. Perfect for brainstorming and visual learners.",
    highlights: ["Unlimited space", "Draw & sketch", "Embed notes", "Export to image"]
  },
  {
    icon: Layout,
    title: "Template System",
    description: "90+ template features including variables, conditionals, loops, date operations, and JavaScript sandbox. Create daily notes, meeting templates, and more.",
    highlights: ["90+ features", "Variables & filters", "Date operations", "JavaScript sandbox"]
  },
  {
    icon: Puzzle,
    title: "Plugin Marketplace",
    description: "Extend Lokus with community plugins. Add new features, integrations, and workflows. Build your own plugins with our developer SDK.",
    highlights: ["Community plugins", "Easy installation", "Developer SDK", "Safe sandbox"]
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Personalize your workspace with custom themes. Live theme editor with real-time preview. Create and share themes with the community.",
    highlights: ["Live editor", "Custom colors", "Font options", "Share themes"]
  },
  {
    icon: Wifi,
    title: "100% Offline",
    description: "Works completely offline. No internet required for any feature. Your notes are always available, even on a plane or in a cabin.",
    highlights: ["No internet needed", "Local storage", "Always available", "No sync required"]
  },
];

const comparisonPoints = [
  { feature: "Free & Open Source", lokus: true, obsidian: "Partial", notion: false, roam: false },
  { feature: "Local-First Storage", lokus: true, obsidian: true, notion: false, roam: false },
  { feature: "Infinite Canvas", lokus: true, obsidian: "Plugin", notion: false, roam: false },
  { feature: "Graph View", lokus: true, obsidian: true, notion: false, roam: true },
  { feature: "Wiki Links", lokus: true, obsidian: true, notion: "Partial", roam: true },
  { feature: "Offline Support", lokus: true, obsidian: true, notion: "Limited", roam: false },
  { feature: "Template System", lokus: "90+ features", obsidian: "Plugin", notion: true, roam: "Limited" },
  { feature: "Custom Themes", lokus: true, obsidian: true, notion: false, roam: false },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              The Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">PKM App</span> Features
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Everything you need for personal knowledge management. Free, open-source, and local-first.
              The best Obsidian and Notion alternative for privacy-focused users.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://github.com/lokus-ai/lokus/releases"
                className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 border-y border-zinc-800">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Lock className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <div className="font-semibold">Privacy First</div>
              <div className="text-sm text-zinc-500">Data stays on your device</div>
            </div>
            <div>
              <Globe className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <div className="font-semibold">Open Source</div>
              <div className="text-sm text-zinc-500">MIT Licensed</div>
            </div>
            <div>
              <Cpu className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <div className="font-semibold">Cross Platform</div>
              <div className="text-sm text-zinc-500">macOS, Windows, Linux</div>
            </div>
            <div>
              <Zap className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <div className="font-semibold">100% Free</div>
              <div className="text-sm text-zinc-500">No paywalls ever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Personal Knowledge Management Features
          </h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
            Built for note-taking, second brain, and zettelkasten workflows.
            Everything you need to capture, connect, and grow your knowledge.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-zinc-400 mb-4">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.highlights.map((h) => (
                          <span key={h} className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-zinc-900/50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Lokus vs Other PKM Apps
          </h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
            How Lokus compares to Obsidian, Notion, and Roam Research.
            The best free alternative for personal knowledge management.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-indigo-400">Lokus</th>
                  <th className="text-center py-4 px-4 font-semibold text-zinc-400">Obsidian</th>
                  <th className="text-center py-4 px-4 font-semibold text-zinc-400">Notion</th>
                  <th className="text-center py-4 px-4 font-semibold text-zinc-400">Roam</th>
                </tr>
              </thead>
              <tbody>
                {comparisonPoints.map((row) => (
                  <tr key={row.feature} className="border-b border-zinc-800">
                    <td className="py-4 px-4">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {row.lokus === true ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <span className="text-green-400">{row.lokus}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4 text-zinc-500">
                      {row.obsidian === true ? "Yes" : row.obsidian === false ? "No" : row.obsidian}
                    </td>
                    <td className="text-center py-4 px-4 text-zinc-500">
                      {row.notion === true ? "Yes" : row.notion === false ? "No" : row.notion}
                    </td>
                    <td className="text-center py-4 px-4 text-zinc-500">
                      {row.roam === true ? "Yes" : row.roam === false ? "No" : row.roam}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-4 px-4 font-semibold">Price</td>
                  <td className="text-center py-4 px-4 text-green-400 font-semibold">Free Forever</td>
                  <td className="text-center py-4 px-4 text-zinc-500">Free / $50+</td>
                  <td className="text-center py-4 px-4 text-zinc-500">Free / $8+/mo</td>
                  <td className="text-center py-4 px-4 text-zinc-500">$15/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perfect for Every Knowledge Worker
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Students & Researchers</h3>
              <p className="text-zinc-400">
                Take notes, connect concepts, build a second brain for your studies.
                Perfect for zettelkasten and academic research.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">Professionals</h3>
              <p className="text-zinc-400">
                Document projects, manage knowledge bases, create wikis.
                Templates and plugins for every workflow.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold mb-2">Writers & Creators</h3>
              <p className="text-zinc-400">
                Draft articles, outline books, connect ideas visually with infinite canvas.
                Distraction-free writing environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-transparent to-indigo-500/10">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Second Brain?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Download Lokus for free. No sign-up required. Your notes, your device, your privacy.
          </p>
          <Link
            href="https://github.com/lokus-ai/lokus/releases"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            <Download className="w-6 h-6" />
            Download Lokus Free
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
