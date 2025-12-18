import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ThemeEditor } from "@/components/ui/theme-editor"
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
    default: "Lokus - Think. Connect. Create.",
    template: "%s | Lokus"
  },
  description: "The future of knowledge management. Build your personal wiki, connect ideas, and unleash your creativity with our local-first note-taking platform.",
  keywords: ["markdown editor", "note-taking", "knowledge management", "wiki", "second brain", "local-first", "privacy", "pkm", "zettelkasten"],
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
    title: "Lokus - Think. Connect. Create.",
    description: "The future of knowledge management. Build your personal wiki, connect ideas, and unleash your creativity with our local-first note-taking platform.",
    siteName: "Lokus",
    images: [
      {
        url: "/og-image.png", // We should create this or use a placeholder
        width: 1200,
        height: 630,
        alt: "Lokus - The Future of Knowledge Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokus - Think. Connect. Create.",
    description: "The future of knowledge management. Build your personal wiki, connect ideas, and unleash your creativity with our local-first note-taking platform.",
    images: ["/og-image.png"],
    creator: "@lokusmd", // Assuming this handle, can be changed
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
            <ThemeEditor />
            <Script
              id="json-ld"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "SoftwareApplication",
                  "name": "Lokus",
                  "applicationCategory": "ProductivityApplication",
                  "operatingSystem": "macOS, Windows, Linux",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  },
                  "description": "The future of knowledge management. Build your personal wiki, connect ideas, and unleash your creativity with our local-first note-taking platform.",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "100"
                  }
                })
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}