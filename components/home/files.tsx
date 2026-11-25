"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ACCENT, Reveal, DISPLAY } from "./reveal";

const FILE = [
  "---",
  "type: lead",
  "stage: Proposal sent",
  "owner: Sam",
  "value: 48000",
  "---",
  "",
  "# Brightline Logistics",
  "",
  "Proposal sent Nov 12. Waiting on a reply.",
];

const POINTS = [
  { title: "Plain files in your folder", text: "Every note, task and record is a Markdown file on your computer. Open them with anything." },
  { title: "Works with no connection", text: "Open and edit offline. It merges when you are back." },
  { title: "The whole team, live", text: "A team workspace syncs by itself. There is nothing to press." },
  { title: "Open source", text: "Read the code, run your own server, write a plugin." },
];

export function Files() {
  const still = useReducedMotion();
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Reveal className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-2xl p-6">
          <Image src="/images/scenes/forest.jpg" alt="" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-sm rounded-xl border border-white/10 bg-[#17181a]/95 shadow-2xl shadow-black/50">
            <p className="border-b border-white/10 px-4 py-2.5 text-xs text-[#a3a3a0]">data/lead/Brightline Logistics.md</p>
            <pre className="overflow-hidden whitespace-pre-wrap px-4 py-4 font-mono text-[13px] leading-6 text-[#f4f4f2]">
              {FILE.map((line, i) => (
                <motion.span
                  key={i}
                  className="block min-h-6"
                  initial={still ? false : { opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.3 }}
                >
                  {line}
                </motion.span>
              ))}
            </pre>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className={`${DISPLAY} text-4xl leading-[1.1] text-[#f4f4f2] md:text-5xl`}>
              A lead is a file. <span className={ACCENT}>So is everything else.</span>
            </h2>
          </Reveal>
          <dl className="mt-10">
            {POINTS.map((point, i) => (
              <Reveal key={point.title} delay={0.1 + i * 0.08}>
                <div className="border-t border-white/10 py-5">
                  <dt className="text-base font-medium text-[#f4f4f2]">{point.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#a3a3a0]">{point.text}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
