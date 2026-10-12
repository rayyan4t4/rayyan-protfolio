import type { FeaturedProject } from "@/data/content";
import Reveal from "@/components/Reveal";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mono mb-4 text-xs tracking-[0.22em] uppercase text-faint">
      <span className="text-accent">//</span>&nbsp;&nbsp;{children}
    </p>
  );
}

function ExternalLinks({ project }: { project: FeaturedProject }) {
  if (!project.github && !project.live) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mono inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accentink transition-transform duration-200 hover:scale-[1.03] active:scale-95"
        >
          GitHub
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="8 7 17 7 17 16" />
          </svg>
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="mono inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent hover:text-ink"
        >
          Live demo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="8 7 17 7 17 16" />
          </svg>
        </a>
      )}
    </div>
  );
}

function FlowNode({ text, last }: { text: string; last: boolean }) {
  return (
    <div className="flex flex-col items-stretch">
      <div className="shot rounded-xl px-5 py-4 text-[15px] leading-relaxed text-ink">
        {text}
      </div>
      {!last && (
        <div className="flex justify-center py-2" aria-hidden="true">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <line x1="9" y1="2" x2="9" y2="16" />
            <polyline points="3.5 11.5 9 17 14.5 11.5" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function CaseStudy({ project }: { project: FeaturedProject }) {
  return (
    <article className="mx-auto max-w-shell px-6 md:px-10 pb-24">
      {/* Hero */}
      <header className="pt-28 md:pt-36 pb-14 md:pb-20">
        <Reveal>
          <a
            href="/#work"
            className="mono inline-block text-xs tracking-[0.18em] uppercase text-faint transition-colors hover:text-accent mb-10"
          >
            ← All work
          </a>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mono mb-5 text-xs tracking-[0.22em] uppercase text-accent">
            {project.category}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display max-w-4xl text-4xl md:text-6xl font-semibold">
            {project.title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-muted">
            {project.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-9">
            <ExternalLinks project={project} />
          </div>
        </Reveal>
      </header>

      <hr className="hairline border-t" />

      {/* Problem / Solution */}
      <section className="grid gap-12 md:grid-cols-2 py-14 md:py-20">
        <Reveal>
          <div>
            <Eyebrow>Problem</Eyebrow>
            <p className="text-lg leading-relaxed text-ink/90">{project.problem}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div>
            <Eyebrow>Solution</Eyebrow>
            <p className="text-lg leading-relaxed text-ink/90">{project.solution}</p>
          </div>
        </Reveal>
      </section>

      <hr className="hairline border-t" />

      {/* Architecture */}
      <section className="py-14 md:py-20">
        <Reveal>
          <Eyebrow>Architecture</Eyebrow>
        </Reveal>
        <div className="max-w-2xl">
          {project.architecture.map((step, i) => (
            <Reveal key={step} delay={i * 0.06}>
              <FlowNode text={step} last={i === project.architecture.length - 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="hairline border-t" />

      {/* Challenges / Results */}
      <section className="grid gap-12 md:grid-cols-2 py-14 md:py-20">
        <Reveal>
          <div>
            <Eyebrow>Engineering challenges</Eyebrow>
            <ul className="space-y-4">
              {project.challenges.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-faint" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div>
            <Eyebrow>Results</Eyebrow>
            <ul className="space-y-4">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-ink/90">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <hr className="hairline border-t" />

      {/* Stack */}
      <section className="py-14 md:py-20">
        <Reveal>
          <Eyebrow>Stack</Eyebrow>
          <div className="flex flex-wrap gap-2.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="mono rounded-full border hairline bg-surface px-4 py-2 text-[13px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10">
            <ExternalLinks project={project} />
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <Reveal>
        <div className="border-t hairline pt-12 text-center">
          <a
            href="/#work"
            className="mono inline-block text-sm tracking-[0.14em] uppercase text-muted transition-colors hover:text-accent"
          >
            ← Back to all work
          </a>
        </div>
      </Reveal>
    </article>
  );
}
