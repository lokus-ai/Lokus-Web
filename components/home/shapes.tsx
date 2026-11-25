"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ACCENT, Reveal, DISPLAY } from "./reveal";

type Shape = {
  label: string;
  holds: string;
  shots: [{ src: string; caption: string }, { src: string; caption: string }];
  note?: string;
};

const SHAPES: Shape[] = [
  {
    label: "Leads",
    holds: "Every lead, its stage, its value and what happened last.",
    shots: [
      { src: "/images/app/sales.jpg", caption: "The lead list" },
      { src: "/images/app/sales0.jpg", caption: "What Lokus found: three opened proposals with no follow-up" },
    ],
  },
  {
    label: "Customers",
    holds: "Each customer with its people, its history and its open work.",
    shots: [
      { src: "/images/app/support.jpg", caption: "Customers, with who needs attention first" },
      { src: "/images/app/support0.jpg", caption: "What Lokus found: a complaint waiting nine days, a fix nobody announced" },
    ],
  },
  {
    label: "Investors",
    holds: "Your round, every conversation and every update you sent.",
    shots: [
      { src: "/images/app/seed.jpg", caption: "The investor list" },
      { src: "/images/app/seed0.jpg", caption: "What Lokus found: a chart an investor asked for, an update due Friday" },
    ],
    note: "You set this one up yourself; it is not a built-in page yet.",
  },
  {
    label: "Studying",
    holds: "Lecture notes, chapters and what is due.",
    shots: [
      { src: "/images/app/chem.jpg", caption: "The exam plan" },
      { src: "/images/app/chem0.jpg", caption: "What Lokus found: six days to the exam and no notes for chapter 4" },
    ],
    note: "You set this one up yourself; it is not a built-in page yet.",
  },
];

const SHOT_MS = 4500;

export function Shapes() {
  const [active, setActive] = useState(0);
  const [shot, setShot] = useState(0);
  const still = useReducedMotion();
  const shape = SHAPES[active];

  useEffect(() => {
    if (still) return;
    const timer = setInterval(() => setShot((s) => 1 - s), SHOT_MS);
    return () => clearInterval(timer);
  }, [still, active]);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className={`${DISPLAY} max-w-2xl text-4xl leading-[1.1] text-[#f4f4f2] md:text-5xl`}>
            One app. <span className={ACCENT}>Shaped to your work.</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="What Lokus can be">
            {SHAPES.map((s, i) => (
              <button
                key={s.label}
                aria-pressed={i === active}
                onClick={() => {
                  setActive(i);
                  setShot(0);
                }}
                className={`relative rounded-lg px-4 py-2 text-sm transition-colors ${
                  i === active ? "text-[#0f1011]" : "text-[#a3a3a0] hover:text-[#f4f4f2]"
                }`}
              >
                {i === active && (
                  <motion.span layoutId="shape-pill" className="absolute inset-0 rounded-lg bg-[#f4f4f2]" transition={{ type: "spring", duration: 0.45, bounce: 0.15 }} />
                )}
                <span className="relative">{s.label}</span>
              </button>
            ))}
          </div>
          <p className="mt-6 max-w-xl text-lg text-[#a3a3a0]">
            {shape.holds} {shape.note}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="relative aspect-[1280/820] overflow-hidden rounded-xl border border-white/10 bg-[#181818]">
            <AnimatePresence initial={false}>
              <motion.div
                key={shape.shots[shot].src}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image src={shape.shots[shot].src} alt={`Lokus, ${shape.label.toLowerCase()} workspace: ${shape.shots[shot].caption}`} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center justify-between gap-6">
            <p className="text-sm text-[#a3a3a0]">{shape.shots[shot].caption}</p>
            <div className="flex shrink-0 gap-1.5">
              {shape.shots.map((s, i) => (
                <button
                  key={s.src}
                  aria-label={s.caption}
                  aria-pressed={i === shot}
                  onClick={() => setShot(i)}
                  className={`h-1.5 w-8 rounded-full transition-colors ${i === shot ? "bg-[#f4f4f2]" : "bg-white/15 hover:bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
