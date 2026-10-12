"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHATBOT_URL, SUGGESTED_QUESTIONS } from "@/data/content";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const copyQuestion = async (q: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(q);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = q;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(idx);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accentink shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1.1L3 20l1.1-5.3A8.5 8.5 0 1 1 21 11.5Z" />
            <path d="M12 7.5v.01M9.4 9.6a3.2 3.2 0 0 1 5.2 0M8.6 12.4l3.4-3.4 3.4 3.4" opacity="0.85" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Portfolio AI assistant"
          className="chat-panel fixed bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[70vh] flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={
            reduceMotion.current
              ? undefined
              : { animation: "chat-pop 0.28s cubic-bezier(0.22, 1, 0.36, 1)" }
          }
        >
          <div className="flex items-center justify-between border-b hairline px-5 py-4">
            <p className="mono text-xs tracking-[0.18em] uppercase text-muted">
              Ask about my work
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface2 hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <div className="border-b hairline px-5 py-3.5">
            <p className="mono mb-2.5 text-[11px] tracking-[0.14em] uppercase text-faint">
              Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <span key={q} className="relative">
                  <button
                    type="button"
                    onClick={() => copyQuestion(q, i)}
                    className="mono rounded-full border hairline px-3 py-1.5 text-[11px] text-muted transition-colors hover:border-accent hover:text-ink"
                  >
                    {q}
                  </button>
                  {copied === i && (
                    <span
                      role="status"
                      className="mono absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-accent px-2.5 py-1 text-[11px] text-accentink shadow-md"
                    >
                      Copied — paste it in the chat
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <iframe
            src={CHATBOT_URL}
            title="Portfolio AI assistant"
            className="w-full flex-1 border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      )}

      <style jsx>{`
        @keyframes chat-pop {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
