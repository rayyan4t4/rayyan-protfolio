import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import { FEATURED_PROJECTS } from "@/data/content";

const project = FEATURED_PROJECTS.find((p) => p.slug === "fire-weapon-detection")!;

export const metadata: Metadata = {
  title: `${project.title} — Rayyan Khan`,
  description: project.tagline,
};

export default function Page() {
  return <CaseStudy project={project} />;
}
