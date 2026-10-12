"use client";

import { useRef, ReactNode, PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";

/** Subtle magnetic pull on desktop pointers. No-op for touch / reduced motion. */
export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="inline-block transition-transform duration-200 ease-out"
      style={{ willChange: "transform" }}
    >
      {children}
    </span>
  );
}
