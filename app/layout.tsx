import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { MiniSidebar } from "@/components/ui/mini-sidebar"
import { ThemeEditor } from "@/components/ui/theme-editor"
import Script from "next/script"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className="dark">
      <head>
        {/* Prevent theme flash by applying saved theme before React hydrates */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              const themes = {
                nord: {
                  background: '220 16% 22%',
                  foreground: '218 27% 94%',
                  card: '220 17% 32%',
                  cardForeground: '218 27% 94%',
                  popover: '220 17% 32%',
                  popoverForeground: '218 27% 94%',
                  primary: '193 43% 67%',
                  primaryForeground: '220 16% 22%',
                  secondary: '219 28% 88%',
                  secondaryForeground: '220 16% 22%',
                  muted: '220 16% 36%',
                  mutedForeground: '218 27% 92%',
                  accent: '179 25% 65%',
                  accentForeground: '220 16% 22%',
                  destructive: '354 42% 56%',
                  destructiveForeground: '218 27% 94%',
                  border: '220 16% 36%',
                  input: '220 16% 36%',
                  ring: '193 43% 67%',
                  sidebar: '220 17% 26%',
                  sidebarForeground: '218 27% 92%',
                  sidebarBorder: '220 16% 22%'
                },
                dracula: {
                  background: '231 15% 18%',
                  foreground: '60 30% 96%',
                  card: '232 14% 31%',
                  cardForeground: '60 30% 96%',
                  popover: '232 14% 31%',
                  popoverForeground: '60 30% 96%',
                  primary: '265 89% 78%',
                  primaryForeground: '231 15% 18%',
                  secondary: '191 97% 77%',
                  secondaryForeground: '231 15% 18%',
                  muted: '232 14% 31%',
                  mutedForeground: '60 30% 96%',
                  accent: '326 100% 74%',
                  accentForeground: '231 15% 18%',
                  destructive: '0 100% 67%',
                  destructiveForeground: '60 30% 96%',
                  border: '232 14% 31%',
                  input: '232 14% 31%',
                  ring: '265 89% 78%',
                  sidebar: '231 15% 22%',
                  sidebarForeground: '60 30% 96%',
                  sidebarBorder: '231 15% 18%'
                },
                tokyoNight: {
                  background: '235 18% 12%',
                  foreground: '224 17% 82%',
                  card: '235 21% 15%',
                  cardForeground: '224 17% 82%',
                  popover: '235 21% 15%',
                  popoverForeground: '224 17% 82%',
                  primary: '217 92% 76%',
                  primaryForeground: '235 18% 12%',
                  secondary: '199 89% 48%',
                  secondaryForeground: '235 18% 12%',
                  muted: '240 17% 26%',
                  mutedForeground: '224 17% 82%',
                  accent: '267 84% 81%',
                  accentForeground: '235 18% 12%',
                  destructive: '2 77% 62%',
                  destructiveForeground: '224 17% 82%',
                  border: '240 17% 26%',
                  input: '240 17% 26%',
                  ring: '217 92% 76%',
                  sidebar: '235 18% 15%',
                  sidebarForeground: '224 17% 82%',
                  sidebarBorder: '235 18% 12%'
                },
                catppuccin: {
                  background: '240 21% 15%',
                  foreground: '226 64% 88%',
                  card: '237 16% 23%',
                  cardForeground: '226 64% 88%',
                  popover: '237 16% 23%',
                  popoverForeground: '226 64% 88%',
                  primary: '217 92% 76%',
                  primaryForeground: '240 21% 15%',
                  secondary: '189 71% 73%',
                  secondaryForeground: '240 21% 15%',
                  muted: '233 12% 39%',
                  mutedForeground: '227 68% 88%',
                  accent: '267 84% 81%',
                  accentForeground: '240 21% 15%',
                  destructive: '343 81% 75%',
                  destructiveForeground: '226 64% 88%',
                  border: '233 12% 39%',
                  input: '233 12% 39%',
                  ring: '217 92% 76%',
                  sidebar: '240 23% 12%',
                  sidebarForeground: '226 64% 88%',
                  sidebarBorder: '240 21% 15%'
                },
                gruvbox: {
                  background: '30 11% 20%',
                  foreground: '43 16% 87%',
                  card: '30 8% 26%',
                  cardForeground: '43 16% 87%',
                  popover: '30 8% 26%',
                  popoverForeground: '43 16% 87%',
                  primary: '180 25% 65%',
                  primaryForeground: '30 11% 20%',
                  secondary: '38 55% 70%',
                  secondaryForeground: '30 11% 20%',
                  muted: '30 6% 38%',
                  mutedForeground: '42 15% 75%',
                  accent: '205 82% 66%',
                  accentForeground: '30 11% 20%',
                  destructive: '4 69% 67%',
                  destructiveForeground: '43 16% 87%',
                  border: '30 6% 38%',
                  input: '30 6% 38%',
                  ring: '180 25% 65%',
                  sidebar: '30 14% 16%',
                  sidebarForeground: '43 16% 87%',
                  sidebarBorder: '30 11% 20%'
                },
                default: {
                  background: '0 0% 3.9%',
                  foreground: '0 0% 98%',
                  card: '0 0% 3.9%',
                  cardForeground: '0 0% 98%',
                  popover: '0 0% 3.9%',
                  popoverForeground: '0 0% 98%',
                  primary: '0 0% 98%',
                  primaryForeground: '0 0% 9%',
                  secondary: '0 0% 14.9%',
                  secondaryForeground: '0 0% 98%',
                  muted: '0 0% 14.9%',
                  mutedForeground: '0 0% 63.9%',
                  accent: '0 0% 14.9%',
                  accentForeground: '0 0% 98%',
                  destructive: '0 62.8% 30.6%',
                  destructiveForeground: '0 0% 98%',
                  border: '0 0% 14.9%',
                  input: '0 0% 14.9%',
                  ring: '0 0% 83.1%',
                  sidebar: '0 0% 10%',
                  sidebarForeground: '0 0% 90%',
                  sidebarBorder: '0 0% 14.9%'
                }
              };

              function applyTheme(colors) {
                const root = document.documentElement;
                Object.entries(colors).forEach(([key, value]) => {
                  const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                  root.style.setProperty('--' + cssVarName, value);
                });
              }

              try {
                const savedTheme = localStorage.getItem('lokus-theme') || 'default';
                if (themes[savedTheme]) {
                  applyTheme(themes[savedTheme]);
                }
              } catch (e) {
                // localStorage might not be available
              }
            })();
          `}
        </Script>
        {/* Umami Analytics */}
        <Script
          src="https://analytics.lokusmd.com/script.js"
          data-website-id="1299d78a-7f04-411f-9fa2-22ffbbc3258c"
          strategy="afterInteractive"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
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