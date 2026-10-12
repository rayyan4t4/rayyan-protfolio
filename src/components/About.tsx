import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const DISCIPLINES = [
  {
    name: "Engineering",
    text: "Scalable full-stack applications, APIs, data pipelines.",
  },
  {
    name: "Design",
    text: "Interfaces with intent — type, spacing, motion.",
  },
  {
    name: "Artificial Intelligence",
    text: "Practical ML systems: vision, speech, RAG.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-shell mx-auto px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10 lg:gap-16">
          {/* Portrait */}
          <div className="md:col-span-5">
            <Reveal className="md:sticky md:top-28">
              <figure>
                <div className="shot overflow-hidden">
                  <img
                    src="/portrait.webp"
                    alt="Portrait of Rayyan Khan"
                    className="block w-full aspect-[4/5] object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mono text-xs uppercase tracking-[0.18em] text-faint mt-4">
                  Mardan, Pakistan
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Bio */}
          <div className="md:col-span-7">
            <SectionHeading
              index="02"
              eyebrow="About"
              title={
                <>
                  Engineer first,
                  <br />
                  designer by habit.
                </>
              }
            />
            <div className="space-y-5 text-muted text-base md:text-lg leading-relaxed max-w-2xl">
              <Reveal>
                <p>
                  I&rsquo;m Rayyan Khan, a final-year Computer Science student at{" "}
                  <span className="text-ink">UET Mardan</span> (CGPA 3.63/4.00) and the{" "}
                  <span className="text-ink">Machine Learning Team Lead at ITSimplera Solutions</span>,
                  where I set technical direction for model work and mentor juniors on PyTorch and code
                  quality. Before that I spent 2025 as an{" "}
                  <span className="text-ink">ML Intern at CodeClub Peshawar</span>, collecting and labelling
                  real-world datasets for object detection and classification.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p>
                  My ground is applied deep learning — speech enhancement with Conformers, object detection
                  with YOLO, retrieval systems — and I&rsquo;m building upward into generative AI: transformers,
                  LLM APIs, RAG systems, and agents. What I ship is interview-defensible: real models, real
                  datasets, honest evaluation.
                </p>
              </Reveal>
            </div>

            {/* Disciplines */}
            <div className="mt-12 border-t hairline">
              {DISCIPLINES.map((d, i) => (
                <Reveal key={d.name} delay={i * 0.06}>
                  <div className="grid grid-cols-[1fr] sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-5 border-b hairline">
                    <h3 className="mono text-xs uppercase tracking-[0.18em] text-accent pt-1">{d.name}</h3>
                    <p className="text-muted text-sm md:text-base leading-relaxed">{d.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
