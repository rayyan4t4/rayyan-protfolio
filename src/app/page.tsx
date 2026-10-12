import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import {
  ARCHIVE_PROJECTS,
  FAQS,
  FEATURED_PROJECTS,
  PROFILE,
} from "@/data/content";

const siteUrl = "https://rayyankhan.online";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${PROFILE.name}'s Projects`,
  itemListElement: [...FEATURED_PROJECTS, ...ARCHIVE_PROJECTS].map((p, i) => {
    const entry: Record<string, unknown> = {
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: "slug" in p ? `${siteUrl}/work/${p.slug}` : undefined,
      description:
        "description" in p && p.description ? p.description : undefined,
    };
    if ("tagline" in p && p.tagline) entry.description = p.tagline;
    const urls: string[] = [];
    if ("github" in p && p.github) urls.push(p.github);
    if ("live" in p && p.live) urls.push(p.live);
    if (urls.length > 0) entry.sameAs = urls;
    return entry;
  }),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Expertise />
        <Experience />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
