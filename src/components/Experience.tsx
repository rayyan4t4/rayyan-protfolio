import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { EXPERIENCE, CREDENTIALS } from "@/data/content";

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-shell mx-auto px-6 md:px-10">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title={
            <>
              Work, study,
              <br />
              and proof.
            </>
          }
        />

        {/* Timeline */}
        <div>
          {EXPERIENCE.map((item, i) => (
            <Reveal key={item.role} delay={i * 0.04}>
              <div className="relative grid gap-2 md:grid-cols-[220px_1fr] md:gap-10 py-8 md:py-10 border-t hairline last:border-b">
                {/* accent dot marker */}
                <span
                  aria-hidden="true"
                  className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-accent"
                />
                <p className="mono text-sm text-faint md:pt-1">{item.period}</p>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {item.role}
                    <span className="text-faint font-normal"> · {item.org}</span>
                  </h3>
                  <p className="mt-3 text-muted text-base leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Credentials */}
        <div className="mt-20 md:mt-24">
          <Reveal>
            <h3 className="mono text-xs uppercase tracking-[0.22em] text-faint mb-8">
              <span className="text-accent">( · )</span>&nbsp;&nbsp;— Credentials
            </h3>
          </Reveal>
          <ol>
            {CREDENTIALS.map((c, i) => (
              <Reveal key={c} delay={i * 0.04}>
                <li className="flex items-baseline gap-6 py-4 border-t hairline last:border-b">
                  <span className="mono text-xs text-faint shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted text-sm md:text-base leading-relaxed">{c}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
