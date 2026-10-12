"use client";

import { PROFILE } from "@/data/content";
import Reveal from "./Reveal";

export default function Contact() {
  const socials = [
    { label: "GitHub", href: PROFILE.github },
    { label: "LinkedIn", href: PROFILE.linkedin },
    { label: "Instagram", href: PROFILE.instagram },
  ];

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-shell mx-auto px-6 md:px-10">
        <div className="max-w-4xl">
          <Reveal>
            <p className="mono text-xs tracking-[0.22em] uppercase text-faint mb-8">
              <span className="text-accent">( 05 )</span>&nbsp;&nbsp;— Contact
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-5xl md:text-7xl font-semibold">
              Have an idea worth building? Let&rsquo;s make it <em className="text-accent not-italic">real.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-center">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex w-fit items-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-accentink transition-transform duration-300 hover:scale-[1.03]"
              >
                {PROFILE.email}
              </a>
              <div className="flex items-center gap-6 text-sm">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-sweep text-muted hover:text-ink transition-colors"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <footer className="mt-28 md:mt-36 border-t border-line pt-8">
          <div className="flex flex-col gap-4 text-sm text-faint md:flex-row md:items-center md:justify-between">
            <span>© 2026 Rayyan Khan</span>
            <span>Designed &amp; built by hand.</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="u-sweep w-fit text-faint hover:text-ink transition-colors"
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
