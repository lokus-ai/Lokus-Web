"use client";

import { ACCENT, Reveal, DISPLAY } from "./reveal";

const TOOLS = [
  { name: "Slack", src: "/logos/tools/slack.png", does: "Reads the channels you choose." },
  { name: "Notion", src: "/logos/tools/notion.svg", does: "Finds and reads your pages." },
  { name: "Linear", src: "/logos/tools/linear.svg", does: "Knows what shipped and what is stuck." },
  { name: "Stripe", src: "/logos/tools/stripe.svg", does: "Sees charges, plans and renewals." },
];

const OPEN = [
  { name: "Any MCP server", does: "Paste its address. Its tools become the assistant's tools." },
  { name: "Your own product", does: "Send records with one key. Each one becomes a plain file." },
];

export function Connections() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className={`${DISPLAY} max-w-2xl text-4xl leading-[1.1] text-[#f4f4f2] md:text-5xl`}>
            It reads the tools <span className={ACCENT}>you already use.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#a3a3a0]">
            Each workspace has its own connections, so work and study never mix.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool, i) => (
            <Reveal key={tool.name} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-[#17181a] p-6 transition-colors hover:bg-[#1e2022]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tool.src} alt="" width={40} height={40} className="rounded-lg bg-white p-1.5" />
                <p className="mt-8 text-base font-medium text-[#f4f4f2]">{tool.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#a3a3a0]">{tool.does}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {OPEN.map((item, i) => (
            <Reveal key={item.name} delay={0.3 + i * 0.08}>
              <div className="h-full rounded-2xl border border-dashed border-white/15 p-6">
                <p className="text-base font-medium text-[#f4f4f2]">{item.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#a3a3a0]">{item.does}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
