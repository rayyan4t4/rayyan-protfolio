import Link from "next/link";
import { FEATURED_PROJECTS, ARCHIVE_PROJECTS, type FeaturedProject } from "@/data/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function Motif({ slug }: { slug: string }) {
  const grid = Array.from({ length: 6 }, (_, i) => 40 + i * 44);
  switch (slug) {
    case "lahore-smog-forecast":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Line chart motif">
          {grid.map((y) => (
            <line key={y} x1="20" y1={y} x2="380" y2={y} stroke="currentColor" strokeWidth="1" className="text-line opacity-60" />
          ))}
          <path
            d="M24 252 L78 236 L132 244 L186 196 L240 208 L294 148 L348 162 L378 118"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          />
          {[24, 186, 294, 378].map((x, i) => (
            <circle key={i} cx={x} cy={[252, 196, 148, 118][i]} r="4.5" className="text-accent" fill="currentColor" />
          ))}
          <text x="24" y="282" fontSize="11" fill="currentColor" className="text-faint mono">t−72h</text>
          <text x="330" y="282" fontSize="11" fill="currentColor" className="text-faint mono">t+24h</text>
        </svg>
      );
    case "portfolio-rag-chatbot":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Retrieval diagram motif">
          <rect x="36" y="126" width="88" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
          <text x="80" y="154" fontSize="12" textAnchor="middle" fill="currentColor" className="text-accent mono">query</text>
          {[
            { x: 250, y: 40, w: 110, on: false },
            { x: 250, y: 116, w: 110, on: true },
            { x: 250, y: 192, w: 110, on: true },
            { x: 250, y: 268, w: 110, on: false },
          ].map((d, i) => (
            <g key={i}>
              <line
                x1="124" y1="150" x2={d.x} y2={d.y + 14}
                stroke="currentColor" strokeWidth={d.on ? 2 : 1}
                strokeDasharray={d.on ? "0" : "5 5"}
                className={d.on ? "text-accent" : "text-faint"}
              />
              <rect x={d.x} y={d.y} width={d.w} height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" className={d.on ? "text-accent" : "text-faint"} />
            </g>
          ))}
          <text x="305" y="58" fontSize="10" textAnchor="middle" fill="currentColor" className="text-faint mono">chunk_01</text>
          <text x="305" y="134" fontSize="10" textAnchor="middle" fill="currentColor" className="text-accent mono">chunk_02</text>
          <text x="305" y="210" fontSize="10" textAnchor="middle" fill="currentColor" className="text-accent mono">chunk_07</text>
          <text x="305" y="286" fontSize="10" textAnchor="middle" fill="currentColor" className="text-faint mono">chunk_12</text>
        </svg>
      );
    case "conformer-speech-enhancement": {
      const bars = Array.from({ length: 44 }, (_, i) => {
        const t = i / 43;
        return 12 + 68 * Math.abs(Math.sin(t * 9) * 0.55 + Math.sin(t * 23 + 1.3) * 0.45);
      });
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Waveform motif">
          <line x1="20" y1="150" x2="380" y2="150" stroke="currentColor" strokeWidth="1" className="text-faint opacity-50" />
          {bars.map((h, i) => (
            <rect
              key={i}
              x={30 + i * 7.6}
              y={150 - h / 2}
              width="4.4"
              height={h}
              rx="2"
              fill="currentColor"
              className={i % 3 === 0 ? "text-accent" : "text-muted opacity-70"}
            />
          ))}
        </svg>
      );
    }
    case "fire-weapon-detection":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Detection boxes motif">
          <rect x="20" y="20" width="360" height="260" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-faint" />
          {[
            [20, 20], [380, 20], [20, 280], [380, 280],
          ].map(([x, y], i) => (
            <g key={i} stroke="currentColor" strokeWidth="2" className="text-muted">
              <path d={`M${x} ${y + (y < 150 ? 14 : -14)} L${x} ${y} L${x + (x < 200 ? 14 : -14)} ${y}`} fill="none" />
            </g>
          ))}
          <rect x="70" y="90" width="130" height="100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="7 5" className="text-accent" />
          <text x="70" y="80" fontSize="12" fill="currentColor" className="text-accent mono">fire 0.94</text>
          <rect x="225" y="150" width="105" height="75" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="7 5" className="text-accent" />
          <text x="225" y="240" fontSize="12" fill="currentColor" className="text-accent mono">weapon 0.87</text>
        </svg>
      );
    default:
      return null;
  }
}

function Showcase({ project, flip, index }: { project: FeaturedProject; flip: boolean; index: number }) {
  return (
    <Reveal>
      <article className="grid gap-10 md:grid-cols-12 md:gap-14 items-center">
        <div className={`md:col-span-5 ${flip ? "md:order-2" : ""}`}>
          <p className="mono text-xs tracking-[0.22em] uppercase text-accent mb-4">{project.category}</p>
          <h3 className="display text-3xl md:text-5xl font-semibold mb-4">{project.title}</h3>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-5">{project.tagline}</p>
          <p className="text-sm md:text-base leading-relaxed mb-3">
            <span className="text-ink font-medium">Problem. </span>
            <span className="text-muted">{project.problem}</span>
          </p>
          <p className="text-sm md:text-base leading-relaxed mb-6">
            <span className="text-ink font-medium">Solution. </span>
            <span className="text-muted">{project.solution}</span>
          </p>
          <ul className="flex flex-wrap gap-2 mb-7" aria-label="Tech stack">
            {project.stack.map((s) => (
              <li key={s} className="mono text-xs text-muted border border-line rounded-full px-3 py-1">
                {s}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link href={`/work/${project.slug}`} className="u-sweep font-medium text-ink">
              Case study →
            </Link>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="u-sweep text-muted hover:text-ink transition-colors">
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="u-sweep text-muted hover:text-ink transition-colors">
                Live demo ↗
              </a>
            )}
          </div>
        </div>
        <div className={`md:col-span-7 ${flip ? "md:order-1" : ""}`}>
          <div className="shot group relative aspect-[4/3] overflow-hidden rounded-lg transition-colors duration-300 hover:border-faint">
            <div className="h-full w-full p-6 md:p-10 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              <Motif slug={project.slug} />
            </div>
            <span className="mono text-[11px] text-faint absolute bottom-3 right-4 select-none">
              fig. {String(index + 1).padStart(2, "0")} — {project.slug}
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="max-w-shell mx-auto px-6 md:px-10">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title={
            <>
              Things I&rsquo;ve <em>built</em> and measured.
            </>
          }
          note="Real work, linked to its repository where public. No mockups, no filler."
        />

        <div className="space-y-24 md:space-y-36">
          {FEATURED_PROJECTS.map((p, i) => (
            <Showcase key={p.slug} project={p} flip={i % 2 === 1} index={i} />
          ))}
        </div>

        <div className="mt-28 md:mt-40">
          <Reveal>
            <h3 className="display text-2xl md:text-3xl font-semibold mb-10">More work</h3>
          </Reveal>
          <div className="border-t border-line">
            {ARCHIVE_PROJECTS.map((a) => (
              <Reveal key={a.title}>
                <div className="group flex flex-col gap-3 py-7 border-b border-line md:flex-row md:items-baseline md:gap-8">
                  <div className="md:w-64 shrink-0 flex items-center gap-3">
                    <h4 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                      {a.title}
                    </h4>
                    {a.wip && (
                      <span className="mono text-[10px] tracking-[0.18em] uppercase text-accent border border-line rounded-full px-2.5 py-0.5">
                        WIP
                      </span>
                    )}
                  </div>
                  <p className="text-muted text-sm md:text-base leading-relaxed flex-1">{a.description}</p>
                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-64 shrink-0">
                    <span className="mono text-xs text-faint truncate">{a.stack.join(" · ")}</span>
                    <span className="flex gap-4 text-sm shrink-0">
                      {a.github && (
                        <a href={a.github} target="_blank" rel="noopener noreferrer" className="u-sweep text-muted hover:text-ink transition-colors" aria-label={`${a.title} on GitHub`}>
                          GitHub ↗
                        </a>
                      )}
                      {a.live && (
                        <a href={a.live} target="_blank" rel="noopener noreferrer" className="u-sweep text-muted hover:text-ink transition-colors" aria-label={`${a.title} live demo`}>
                          Live ↗
                        </a>
                      )}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
