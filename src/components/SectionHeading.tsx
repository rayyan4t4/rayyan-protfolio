"use client";

import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  note,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <p className="mono text-xs tracking-[0.22em] uppercase text-faint mb-5">
          <span className="text-accent">( {index} )</span>&nbsp;&nbsp;— {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display text-4xl md:text-6xl font-semibold max-w-3xl">{title}</h2>
      </Reveal>
      {note && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-muted max-w-2xl text-base md:text-lg leading-relaxed">{note}</p>
        </Reveal>
      )}
    </div>
  );
}
