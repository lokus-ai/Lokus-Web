"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ACCENT, Reveal, DISPLAY } from "./reveal";

const STEP_MS = 6500;

const STEPS = [
  {
    title: "Say what you do",
    text: "Answer a few questions when you first open Lokus. It sets up the pages for that work: a list for your leads, a board for your tasks, a place for notes.",
  },
  {
    title: "Connect your tools",
    text: "Sign in to Slack, Notion, Linear or Stripe, paste the address of any MCP server, or send records from your own product. Lokus reads them alongside your notes.",
  },
  {
    title: "It finds what slipped",
    text: "Every hour while the app is open, and on watches you write, Lokus looks through all of it and lines up what changed until it adds up to something you should know.",
  },
  {
    title: "You say yes",
    text: "Each finding comes with its sources and one recommended action. Nothing changes until you press Do it.",
  },
];

const SHOTS = [
  { src: "/images/app/step-setup.jpg", w: 900, h: 560, alt: "Lokus with a lead list, tasks and a pipeline note in the sidebar" },
  { src: "/images/app/step-connect.jpg", w: 862, h: 620, alt: "Lokus settings: connections for Linear, Notion, Granola, Sentry, Jira, Stripe and Intercom" },
  { src: "/images/app/step-finds.jpg", w: 438, h: 250, alt: "A finding in Lokus: three leads opened the proposal, with the two sources it came from" },
  { src: "/images/app/step-yes.jpg", w: 660, h: 110, alt: "The finding on the Lokus start page with its Do it button" },
];

export function Steps() {
  const [active, setActive] = useState(0);
  const section = useRef<HTMLDivElement>(null);
  const visible = useInView(section, { margin: "-30% 0px" });
  const still = useReducedMotion();
  const shot = SHOTS[active];

  useEffect(() => {
    if (!visible || still) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % STEPS.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [active, visible, still]);

  return (
    <section id="how" className="scroll-mt-24 px-6 py-24" ref={section}>
      <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-2">
        <Reveal>
          <h2 className={`${DISPLAY} max-w-md text-4xl leading-[1.1] text-[#f4f4f2] md:text-5xl`}>
            From what you do to <span className={ACCENT}>what to do next.</span>
          </h2>
          <div className="mt-10" role="group" aria-label="How Lokus works">
            {STEPS.map((step, i) => (
              <button
                key={step.title}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className="relative block w-full border-t border-white/10 py-5 text-left"
              >
                {i === active && visible && !still && (
                  <motion.span
                    key={active}
                    className="absolute left-0 top-[-1px] h-px bg-[#f4f4f2]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                  />
                )}
                <span className={`text-base font-medium ${i === active ? "text-[#f4f4f2]" : "text-[#a3a3a0]"}`}>{step.title}</span>
                <AnimatePresence initial={false}>
                  {i === active && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="block overflow-hidden text-sm leading-relaxed text-[#a3a3a0]"
                    >
                      <span className="block pt-2">{step.text}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-2xl p-6 md:min-h-[560px]">
          <Image src="/images/scenes/valley.jpg" alt="" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/25" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="relative flex w-full justify-center"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} className="h-auto w-full max-w-md rounded-xl border border-white/10 shadow-2xl shadow-black/50" />
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
