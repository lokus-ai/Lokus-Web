import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/components/auth/AuthProvider"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Lokus - Lightning-Fast Extensible Markdown Editor",
  description: "The future of note-taking with blazing fast performance, intelligent linking, and unlimited extensibility.",
  keywords: ["markdown editor", "note-taking", "knowledge management", "wiki", "second brain"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}