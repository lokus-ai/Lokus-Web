import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { MiniSidebar } from "@/components/ui/mini-sidebar"
import { ThemeEditor } from "@/components/ui/theme-editor"
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <MiniSidebar />
            <div className="pl-16">
              {children}
            </div>
            <ThemeEditor />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}