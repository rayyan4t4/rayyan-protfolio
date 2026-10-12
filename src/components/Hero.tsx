"use client";

import { motion, useReducedMotion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import Magnetic from "./Magnetic";
import { PROFILE } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

function Lines({ text, delay }: { text: string; delay: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className="block overflow-hidden">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          initial={reduce ? { opacity: 0 } : { y: "110%" }}
          animate={reduce ? { opacity: 1 } : { y: "0%" }}
          transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Intro">
      <HeroCanvas />
      <div className="relative z-10 max-w-shell mx-auto px-6 md:px-10 w-full pt-32 pb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mono text-xs md:text-sm tracking-[0.22em] uppercase text-muted mb-8"
        >
          <span className="text-accent">Rayyan Khan</span>
          <span className="text-faint"> — {PROFILE.location}</span>
        </motion.p>

        <h1 className="display font-semibold text-[clamp(2.8rem,8vw,6.5rem)] max-w-5xl">
          <Lines text="Engineering intelligence." delay={0.15} />
          <span className="text-muted">
            <Lines text="Designing experiences." delay={0.45} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          className="mt-8 max-w-xl text-muted text-base md:text-xl leading-relaxed"
        >
          I&rsquo;m Rayyan Khan — an AI/ML engineer and full-stack developer building
          intelligent systems and thoughtfully designed digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-accent text-accentink font-semibold rounded-full px-7 py-3.5 text-sm md:text-base hover:opacity-90 transition-opacity"
            >
              Explore Work <span aria-hidden="true">↓</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border hairline rounded-full px-7 py-3.5 text-sm md:text-base text-ink hover:border-accent transition-colors"
            >
              Let&rsquo;s Connect
            </a>
          </Magnetic>
          <span className="mono text-xs uppercase tracking-[0.14em] text-muted inline-flex items-center gap-2 ml-1">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            {PROFILE.availability}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-14 flex items-center gap-6 mono text-xs uppercase tracking-[0.14em] text-faint"
        >
          <a href={PROFILE.github} target="_blank" rel="noopener" className="u-sweep hover:text-ink transition-colors">
            GitHub ↗
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener" className="u-sweep hover:text-ink transition-colors">
            LinkedIn ↗
          </a>
        </motion.div>
      </div>

      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-faint"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="block w-px h-10 bg-current opacity-40" />
        </motion.div>
      )}
    </section>
  );
}
