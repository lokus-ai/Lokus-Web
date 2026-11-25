"use client";

import { ACCENT, Reveal, DISPLAY } from "./reveal";

export function Window() {
  return (
    <section className="px-6 py-32 md:py-44">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <Reveal>
          <h2 className={`${DISPLAY} text-4xl leading-[1.1] text-[#f4f4f2] md:text-5xl`}>
            Every kind of work
            <br />
            has things <span className={ACCENT}>that slip.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-md text-lg leading-relaxed text-[#a3a3a0] md:ml-auto md:pt-3">
            A proposal nobody followed up. A customer still waiting on an answer. An exam six days out
            with a chapter missing. Most apps hold your work and wait for you to look. Lokus looks,
            and tells you while there is still time to act.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
