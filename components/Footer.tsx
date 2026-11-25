import Link from "next/link"
import { Logo } from "@/components/ui/logo"

const SECTIONS: Array<{
  title: string
  links: Array<{ href: string; label: string; external?: boolean }>
}> = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "https://github.com/lokus-ai/lokus/releases", label: "Download", external: true },
      { href: "/marketplace", label: "Plugins" },
      { href: "/blog", label: "Blog" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "https://docs.lokusmd.com", label: "Documentation", external: true },
      { href: "https://docs.lokusmd.com/getting-started/installation/", label: "Installation", external: true },
      { href: "https://docs.lokusmd.com/getting-started/quick-start/", label: "Quick Start", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/resources", label: "Brand Resources" },
      { href: "https://opencollective.com/lokus", label: "Support Us", external: true },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "https://github.com/lokus-ai/lokus", label: "GitHub", external: true },
      { href: "https://github.com/lokus-ai/lokus/discussions", label: "Discussions", external: true },
      { href: "https://github.com/lokus-ai/lokus/issues", label: "Bug Reports", external: true },
    ],
  },
]

const linkClass = "text-sm text-zinc-500 transition-colors hover:text-zinc-100"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0f1011]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-16 md:grid-cols-6">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={28} animated={false} />
            <span className="text-lg font-semibold tracking-tight text-zinc-50">Lokus</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
            The workspace that tells you what needs doing. Open source, for Mac, Windows and Linux.
          </p>
        </div>
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-medium text-zinc-200">{section.title}</h3>
            <ul className="mt-4 space-y-3">
              {section.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <p className="mx-auto max-w-6xl px-6 py-6 text-sm text-zinc-600">
          © 2024-{new Date().getFullYear()} Lokus
        </p>
      </div>
    </footer>
  )
}
