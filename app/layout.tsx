import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ThemeProvider } from "@/contexts/ThemeContext"
import StaticSEOContent from "@/components/StaticSEOContent"
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
    default: "Lokus - The Operating System for Your Ideas",
    template: "%s | Lokus"
  },
  description: "Lokus is a personal knowledge OS for macOS, Windows, and Linux. Markdown, wiki links, graph view, and infinite canvas — your personal system for thinking, researching, and creating.",
  keywords: [
    "personal knowledge management",
    "PKM app",
    "knowledge OS",
    "note-taking app",
    "second brain app",
    "markdown editor",
    "wiki links",
    "backlinks",
    "graph view",
    "infinite canvas",
    "local-first",
    "zettelkasten",
    "digital garden",
    "networked thought",
    "knowledge base",
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
    title: "Lokus - The Operating System for Your Ideas",
    description: "Personal knowledge OS for macOS, Windows, and Linux. Markdown, wiki links, graph view, and infinite canvas.",
    siteName: "Lokus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lokus - The Operating System for Your Ideas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokus - The Operating System for Your Ideas",
    description: "Personal knowledge OS for macOS, Windows, and Linux. Markdown, wiki links, graph view, and infinite canvas.",
    images: ["/og-image.png"],
    creator: "@lokusmd",
  },
  other: {
    "llms.txt": "/llms.txt",
    "llms-full.txt": "/llms-full.txt",
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
            <StaticSEOContent />
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
                  "description": "Lokus is a personal knowledge OS for macOS, Windows, and Linux. Local-first architecture with markdown editing, wiki links, backlinks, graph view, infinite canvas, and a powerful template system.",
                  "featureList": [
                    "Local-first architecture - notes stored on your device",
                    "Rich markdown editor with live preview",
                    "Wiki links and backlinks for connected notes",
                    "2D and 3D graph visualization",
                    "Infinite canvas for visual thinking",
                    "Template system with 90+ features",
                    "Plugin marketplace",
                    "Custom themes",
                    "Works offline",
                    "Cross-platform: macOS, Windows, Linux"
                  ],
                  "screenshot": "https://lokusmd.com/og-image.png",
                  "softwareVersion": "1.1.0",
                  "downloadUrl": "https://github.com/lokus-ai/lokus/releases",
                  "installUrl": "https://github.com/lokus-ai/lokus/releases",
                  "releaseNotes": "https://lokusmd.com/changelog",
                  "sameAs": [
                    "https://github.com/lokus-ai/lokus",
                    "https://twitter.com/lokusmd",
                    "https://opencollective.com/lokus",
                    "https://alternativeto.net/software/lokus/about/"
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
                  "description": "Personal knowledge OS for macOS, Windows, and Linux",
                  "sameAs": [
                    "https://github.com/lokus-ai/lokus",
                    "https://twitter.com/lokusmd",
                    "https://opencollective.com/lokus",
                    "https://alternativeto.net/software/lokus/about/"
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
                        "text": "Lokus is a personal knowledge OS for macOS, Windows, and Linux. It helps you capture, connect, and build on your ideas with markdown notes, wiki links, graph views, and infinite canvas. All your data stays on your device."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Does Lokus work offline?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, Lokus works offline. All your notes are stored locally on your device as markdown files. You don't need an internet connection to use any feature."
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
                        "text": "PKM stands for Personal Knowledge Management. A PKM app helps you capture, organize, and connect your notes and ideas into a personal knowledge system."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Does Lokus support the Zettelkasten method?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, Lokus fully supports the Zettelkasten method. You can create atomic notes and connect them with [[wiki links]]. Backlinks automatically surface connections between notes. The graph view visualizes your entire note network in 2D or 3D."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can Lokus open existing markdown vaults?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, Lokus works with standard markdown files and [[wiki link]] syntax. You can point Lokus at any existing markdown folder and it will read your notes, links, tags, and folder structure without any conversion."
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