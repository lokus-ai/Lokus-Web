import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { AuthProvider } from "@/components/auth/AuthProvider"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Lokus - Think. Connect. Create.",
  description: "The future of knowledge management. Build your personal wiki, connect ideas, and unleash your creativity with our local-first note-taking platform.",
  keywords: ["markdown editor", "note-taking", "knowledge management", "wiki", "second brain", "local-first", "privacy"],
  icons: {
    icon: "/lokus-logo.svg",
    shortcut: "/lokus-logo.svg",
    apple: "/lokus-logo.svg",
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
        {/* Umami Analytics */}
        <Script
          src="https://analytics.lokusmd.com/script.js"
          data-website-id="1299d78a-7f04-411f-9fa2-22ffbbc3258c"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}