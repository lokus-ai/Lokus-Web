import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ACCENT, DISPLAY, Reveal } from "@/components/home/reveal";

export const metadata: Metadata = {
  title: "Features",
  description:
    "What Lokus does: notes, records, tasks, an assistant that reads your tools and tells you what needs doing, live team sync, and plain files you own.",
  openGraph: {
    title: "Lokus features",
    description: "Notes, records, tasks, an assistant that looks first, live team sync, and plain files you own.",
    url: "https://lokusmd.com/features",
  },
};

const GROUPS: Array<{ title: string; line: string; points: string[] }> = [
  {
    title: "It looks first",
    line: "Lokus reads your notes and connected tools on its own and comes back with what needs you.",
    points: [
      "Looks every hour while the app is open, and on watches you write in plain words",
      "Each finding shows its sources and one recommended action",
      "Nothing changes until you press Do it",
      "Tell it never to raise something again and it remembers",
    ],
  },
  {
    title: "Assistant",
    line: "Ask it anything about your workspace, or ask it to do the work.",
    points: [
      "Use your own Claude or OpenAI key, sign in with ChatGPT, or point it at any OpenAI-compatible model",
      "Reads and changes notes, records and tasks, and asks before each change",
      "Remembers what you tell it to",
      "Works from the terminal too",
    ],
  },
  {
    title: "Connections",
    line: "The assistant reads and acts in the tools you already use.",
    points: [
      "Sign in to Slack, Notion, Linear, Stripe, Granola, Sentry, Jira, Confluence, Intercom or Zapier",
      "Add any MCP server by its address",
      "Each workspace has its own connections",
      "A key lets your own product send records in",
    ],
  },
  {
    title: "Notes",
    line: "A live-preview editor over real Markdown text.",
    points: [
      "Links between notes, backlinks and a graph",
      "Full-text search, daily notes and templates",
      "Version history for every note",
      "Pages have an icon, a cover and properties",
    ],
  },
  {
    title: "Records",
    line: "A page for each thing you keep track of, with the details you choose.",
    points: [
      "Customers are built in, with their people, issues and conversations",
      "Any other kind of record works the same way: a lead, an order, an investor",
      "A list that puts what needs someone first, and says why",
    ],
  },
  {
    title: "Tasks",
    line: "A board and a list of the work.",
    points: [
      "Your own columns, edited on the board",
      "Each task has a number, a status, a priority and an owner",
      "A task for a record shows on that record's page",
    ],
  },
  {
    title: "Teams",
    line: "A team workspace syncs by itself.",
    points: [
      "Live editing together, with who is where",
      "Edits made offline merge when you are back",
      "Owner, editor and viewer roles, and invitations",
      "Through a small server you can run yourself",
    ],
  },
  {
    title: "Yours",
    line: "Nothing is locked in.",
    points: [
      "Every note, task and record is a Markdown file in a folder you choose",
      "Opens and edits with no connection",
      "Open source, with sandboxed plugins",
      "Mac, Windows and Linux, and it updates itself",
    ],
  },
];

const NOT_YET = [
  "Looking while the app is closed",
  "Acting without you pressing Do it",
  "Ready-made setups for investors, architecture and studying; you build those yourself today",
  "GitHub and Google connections",
  "Mobile apps",
  "End-to-end encryption of synced notes",
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#0f1011] text-[#f4f4f2]">
      <Navbar />

      <section className="px-6 pt-32 md:pt-40">
        <Reveal className="mx-auto max-w-6xl">
          <h1 className={`${DISPLAY} max-w-3xl text-[2.6rem] leading-[1.04] md:text-7xl`}>
            Everything in Lokus, <span className={ACCENT}>said plainly.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a3a3a0]">
            What it does today, and at the bottom, what it does not do yet.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="relative mx-auto mt-14 h-48 max-w-6xl overflow-hidden rounded-2xl md:h-72">
          <Image src="/images/scenes/valley.jpg" alt="" fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </Reveal>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {GROUPS.map((group) => (
            <Reveal key={group.title}>
              <div className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-2 md:gap-16">
                <div>
                  <h2 className={`${DISPLAY} text-3xl md:text-4xl`}>{group.title}</h2>
                  <p className="mt-3 max-w-sm text-lg leading-relaxed text-[#a3a3a0]">{group.line}</p>
                </div>
                <ul className="space-y-3 md:pt-2">
                  {group.points.map((point) => (
                    <li key={point} className="flex gap-3 text-base leading-relaxed text-[#f4f4f2]">
                      <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-[#5eb1ff]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <Reveal className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#17181a] p-8 md:p-12">
          <h2 className={`${DISPLAY} text-3xl md:text-4xl`}>
            Not there <span className={ACCENT}>yet.</span>
          </h2>
          <ul className="mt-8 grid gap-x-16 gap-y-3 md:grid-cols-2">
            {NOT_YET.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-relaxed text-[#a3a3a0]">
                <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-[#a3a3a0]" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="px-6 pb-32 text-center">
        <Reveal>
          <Link
            href="/#download"
            className="inline-flex h-11 items-center rounded-lg bg-[#f4f4f2] px-5 text-sm font-medium text-[#0f1011] transition-colors hover:bg-white"
          >
            Download Lokus
          </Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
