import { FAQS } from "@/data/content";
import Reveal from "./Reveal";

export default function FAQ() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-shell mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <Reveal>
            <p className="mono text-xs tracking-[0.22em] uppercase text-faint mb-5">
              <span className="text-accent">( ? )</span>&nbsp;&nbsp;— FAQ
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-4xl md:text-6xl font-semibold max-w-3xl">
              Questions, <em>answered</em>.
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <div className="border-t border-line max-w-3xl">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex items-center gap-5 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="mono text-sm text-accent shrink-0" aria-hidden="true">
                    Q
                  </span>
                  <span className="flex-1 text-lg md:text-xl font-medium text-ink">{f.q}</span>
                  <span className="mono text-faint text-2xl leading-none select-none" aria-hidden="true">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <div className="flex gap-5 pb-7">
                  <span className="mono text-sm text-faint shrink-0 pt-1" aria-hidden="true">
                    A
                  </span>
                  <p className="text-muted text-base md:text-lg leading-relaxed">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
