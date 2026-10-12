"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@/lib/theme";
import { PROFILE } from "@/data/content";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = useCallback((id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? "nav-pill rounded-full shadow-lg" : "bg-transparent border border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2.5"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mono text-sm font-semibold tracking-tight mr-2 flex items-center gap-2"
            aria-label="Back to top"
          >
            <span className="grid place-items-center w-7 h-7 rounded-full border hairline text-[11px]">
              RK
            </span>
            <span className="hidden sm:inline text-accent">●</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-active={active === l.id}
                className="u-sweep mono text-[12px] uppercase tracking-[0.08em] text-muted hover:text-ink px-3 py-2 transition-colors"
                aria-current={active === l.id ? "true" : undefined}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={toggle}
            className="mono text-[12px] uppercase tracking-[0.08em] text-muted hover:text-ink px-3 py-2 transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "◐ Light" : "◑ Dark"}
          </button>

          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden md:inline-flex mono text-[12px] uppercase tracking-[0.08em] bg-accent text-accentink rounded-full px-4 py-2 font-semibold hover:opacity-90 transition-opacity"
          >
            Contact
          </a>

          <button
            className="md:hidden px-3 py-2 text-muted"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px bg-current mb-1.5 transition-transform" />
            <span className="block w-5 h-px bg-current transition-transform" />
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[86%] nav-pill rounded-2xl p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="menu"
          >
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left mono text-sm uppercase tracking-[0.1em] text-muted hover:text-ink py-3 px-2 border-b hairline last:border-0"
                role="menuitem"
              >
                {l.label}
              </button>
            ))}
            <a
              href={`mailto:${PROFILE.email}`}
              className="mono text-sm uppercase tracking-[0.1em] bg-accent text-accentink rounded-full px-4 py-3 mt-3 text-center font-semibold"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}
