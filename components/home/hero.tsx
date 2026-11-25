"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ACCENT, DISPLAY, Reveal } from "./reveal";

export function Hero() {
  const frame = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="pt-32 md:pt-40">
      <Reveal className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm text-[#a3a3a0]">Open source · Mac, Windows and Linux</p>
        <h1 className={`${DISPLAY} mt-5 text-[2.6rem] leading-[1.04] text-[#f4f4f2] md:text-7xl`}>
          The workspace that tells you <span className={ACCENT}>what needs doing.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#a3a3a0]">
          Lokus is one app you shape into a lead tracker, a customer desk, an investor pipeline or a
          study planner. It reads your notes and the tools you connect, then comes to you with what
          it found and what to do about it.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="#download"
            className="inline-flex h-11 items-center rounded-lg bg-[#f4f4f2] px-5 text-sm font-medium text-[#0f1011] transition-colors hover:bg-white"
          >
            Download Lokus
          </Link>
          <Link
            href="#how"
            className="inline-flex h-11 items-center rounded-lg border border-white/15 px-5 text-sm font-medium text-[#f4f4f2] transition-colors hover:bg-white/10"
          >
            See how it works
          </Link>
        </div>
      </Reveal>

      <div ref={frame} className="relative mt-16 md:mt-20">
        <div className="absolute inset-x-0 bottom-0 top-[28%] overflow-hidden">
          <motion.div className="absolute inset-[-8%]" style={still ? undefined : { y: drift }}>
            <Image src="/images/scenes/peaks.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 pb-10 md:px-6 md:pb-20">
          <Reveal delay={0.15}>
            <video
              className="block w-full rounded-xl border border-white/15 shadow-2xl shadow-black/70"
              src="/video/lokus-leads.mp4"
              poster="/video/lokus-leads-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Lokus in use: a finding about three leads on the start page, the lead list and a lead's page, a line typed into the pipeline note, then a task moved to In progress"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
