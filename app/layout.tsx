import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ThemeProvider } from "@/contexts/ThemeContext"
import Script from "next/script"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lokusmd.com'),
  title: {
    default: "Lokus - Free Open Source PKM & Note-Taking App",
    template: "%s | Lokus"
  },
  description: "Lokus is a free, open-source personal knowledge management (PKM) app. Local-first note-taking with markdown, wiki links, graph view, and infinite canvas. The best Obsidian & Notion alternative for privacy-focused users.",
  keywords: [
    // Primary PKM keywords (matching AI search queries)
    "best PKM app 2025",
    "personal knowledge management",
    "PKM tools",
    "best note-taking app",
    "second brain app",
    // Feature keywords
    "markdown editor",
    "wiki links",
    "backlinks",
    "graph view",
    "infinite canvas",
    "local-first",
    "offline notes",
    // Comparison keywords
    "Obsidian alternative",
    "Notion alternative",
    "Roam Research alternative",
    "Logseq alternative",
    "free PKM app",
    "open source note taking",
    // Method keywords
    "zettelkasten",
    "digital garden",
    "networked thought",
    "knowledge base",
    // Platform keywords
    "macOS note app",
    "Windows PKM",
    "Linux notes"
  ],
  authors: [{ name: "Lokus Team" }],
  creator: "Lokus Team",
  publisher: "Lokus",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/lokus-logo.svg",
    shortcut: "/lokus-logo.svg",
    apple: "/lokus-logo.svg",
  },
  alternates: {
    canonical: 'https://lokusmd.com',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lokusmd.com",
    title: "Lokus - Free Open Source PKM & Note-Taking App",
    description: "Best free PKM app for 2025. Open-source, local-first note-taking with markdown, wiki links, graph view, and infinite canvas. Obsidian & Notion alternative.",
    siteName: "Lokus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lokus - Free Open Source Personal Knowledge Management App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokus - Free Open Source PKM & Note-Taking App",
    description: "Best free PKM app for 2025. Open-source, local-first note-taking with markdown, wiki links, graph view. Obsidian & Notion alternative.",
    images: ["/og-image.png"],
    creator: "@lokusmd",
  },
  other: {
    "llms.txt": "/llms.txt",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Umami Analytics */}
        <Script
          src="https://analytics.lokusmd.com/script.js"
          data-website-id="1299d78a-7f04-411f-9fa2-22ffbbc3258c"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Script
              id="json-ld-app"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "SoftwareApplication",
                  "name": "Lokus",
                  "alternateName": ["Lokus PKM", "Lokus Notes", "Lokus MD"],
                  "applicationCategory": "ProductivityApplication",
                  "applicationSubCategory": "Personal Knowledge Management",
                  "operatingSystem": "macOS, Windows, Linux",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                  },
                  "description": "Lokus is a free, open-source personal knowledge management (PKM) app with local-first architecture. Features include markdown editing, wiki links, backlinks, graph view, infinite canvas, and a powerful template system.",
                  "featureList": [
                    "Local-first architecture - notes stored on your device",
                    "Rich markdown editor with live preview",
                    "Wiki links and backlinks for connected notes",
                    "2D and 3D graph visualization",
                    "Infinite canvas for visual thinking",
                    "Template system with 90+ features",
                    "Plugin marketplace",
                    "Custom themes",
                    "100% offline capable",
                    "Open source and free forever"
                  ],
                  "screenshot": "https://lokusmd.com/og-image.png",
                  "softwareVersion": "1.0.0",
                  "downloadUrl": "https://github.com/lokus-ai/lokus/releases",
                  "installUrl": "https://github.com/lokus-ai/lokus/releases",
                  "releaseNotes": "https://lokusmd.com/changelog",
                  "sameAs": [
                    "https://github.com/lokus-ai/lokus",
                    "https://twitter.com/lokusmd",
                    "https://opencollective.com/lokus"
                  ],
                  "author": {
                    "@type": "Organization",
                    "name": "Lokus",
                    "url": "https://lokusmd.com"
                  }
                })
              }}
            />
            <Script
              id="json-ld-org"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Lokus",
                  "url": "https://lokusmd.com",
                  "logo": "https://lokusmd.com/lokus-logo.svg",
                  "description": "Open-source personal knowledge management software",
                  "sameAs": [
                    "https://github.com/lokus-ai/lokus",
                    "https://twitter.com/lokusmd",
                    "https://opencollective.com/lokus"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "hello@lokusmd.com",
                    "contactType": "customer support"
                  }
                })
              }}
            />
            <Script
              id="json-ld-faq"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is Lokus?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Lokus is a free, open-source personal knowledge management (PKM) app for macOS, Windows, and Linux. It helps you build a second brain with markdown notes, wiki links, graph views, and infinite canvas. All your data stays on your device."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is Lokus free?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, Lokus is 100% free and open-source. There are no subscriptions, no paywalls, and no feature restrictions. All features are available for free forever."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does Lokus compare to Obsidian?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Both Lokus and Obsidian are markdown-based, local-first note-taking apps with wiki links and graph views. The key difference is that Lokus is fully open-source and completely free, while Obsidian has paid sync and publish features. Lokus also includes an infinite canvas and more extensive template system."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does Lokus compare to Notion?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Notion is cloud-based with collaboration features, while Lokus is local-first with complete privacy. Your notes in Lokus never leave your device unless you choose to sync them. Lokus works fully offline and stores notes as plain markdown files."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Does Lokus work offline?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, Lokus is 100% offline-capable. All your notes are stored locally on your device as markdown files. You don't need an internet connection to use any feature."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What platforms does Lokus support?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Lokus is available for macOS, Windows, and Linux. It's built with Tauri for native performance on all platforms."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is a PKM app?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "PKM stands for Personal Knowledge Management. A PKM app helps you capture, organize, and connect your notes and ideas. Popular PKM apps include Obsidian, Notion, Roam Research, Logseq, and Lokus."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the best PKM app in 2025?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The best PKM app depends on your needs. For privacy-focused users who want a free, open-source, local-first solution, Lokus is an excellent choice. It offers markdown editing, wiki links, graph view, infinite canvas, and templates - all without any cost or cloud dependency."
                      }
                    }
                  ]
                })
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}