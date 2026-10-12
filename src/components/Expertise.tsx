"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { EXPERTISE_TABS } from "@/data/content";

export default function Expertise() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + EXPERTISE_TABS.length) % EXPERTISE_TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const tab = EXPERTISE_TABS[active];

  return (
    <section id="expertise" className="py-24 md:py-32">
      <div className="max-w-shell mx-auto px-6 md:px-10">
        <SectionHeading
          index="03"
          eyebrow="Expertise"
          title={
            <>
              What I actually
              <br />
              work with.
            </>
          }
        />

        {/* Tab bar */}
        <Reveal>
          <div
            role="tablist"
            aria-label="Expertise areas"
            className="flex flex-wrap gap-x-8 gap-y-4 border-b hairline"
            onKeyDown={onKeyDown}
          >
            {EXPERTISE_TABS.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`expertise-panel-${t.id}`}
                  id={`expertise-tab-${t.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`mono relative pb-4 text-sm uppercase tracking-[0.14em] transition-colors ${
                    isActive ? "text-ink" : "text-faint hover:text-muted"
                  }`}
                >
                  <span className="text-accent mr-2">{t.index}</span>
                  {t.title}
                  {!reduce && isActive && (
                    <motion.span
                      layoutId="expertise-tab-underline"
                      className="absolute left-0 -bottom-px h-[2px] w-full bg-accent"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                  {reduce && isActive && (
                    <span className="absolute left-0 -bottom-px h-[2px] w-full bg-accent" />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`expertise-panel-${tab.id}`}
          aria-labelledby={`expertise-tab-${tab.id}`}
          className="pt-10 md:pt-12 min-h-[22rem]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0.1 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                {tab.intro}
              </p>

              <div className="space-y-9">
                {tab.groups.map((group) => (
                  <div key={group.heading}>
                    <h3 className="mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
                      {group.heading}
                    </h3>
                    <ul className="flex flex-wrap gap-2.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="border hairline rounded-full px-4 py-2 text-sm text-muted hover:text-ink hover:border-accent transition-colors"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {tab.evidence.length > 0 && (
                <div className="mt-12 pt-8 border-t hairline">
                  <p className="mono text-xs uppercase tracking-[0.2em] text-faint mb-4">Evidence</p>
                  <ul className="flex flex-wrap gap-x-8 gap-y-3">
                    {tab.evidence.map((e) => (
                      <li key={e.href}>
                        <a
                          href={e.href}
                          className="mono text-sm text-accent u-sweep"
                          {...(e.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {e.label} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
