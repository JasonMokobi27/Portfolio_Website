import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryOf,
  getProject,
  getSlugs,
  leadCredit,
  leadStill,
  moreWork,
  muxPoster,
} from "@/lib/projects";
import { SITE } from "@/content/projects";
import { stripForProject } from "@/lib/palette";
import Shell from "@/components/Shell";
import ProjectView from "@/components/ProjectView";
import { ProjectGrid, SectionLabel } from "@/components/ProjectCard";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} · ${p.kind}`;
  const director = leadCredit(p, "director");
  const description = [
    p.logline !== p.kind ? p.logline : null,
    director ? `Directed by ${director}.` : null,
    `${p.credits.role}: ${SITE.name}.`,
  ]
    .filter(Boolean)
    .join(" ");
  /* A real frame from the film, so a shared link shows the work rather than
     nothing. Mux poster where there is a clip, the lead still otherwise. */
  const image = p.muxPlaybackId ? muxPoster(p.muxPlaybackId, p.posterTime ?? 0) : leadStill(p);
  return {
    title,
    description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${p.title} · ${SITE.name}`,
      description,
      url: `${SITE.domain}/work/${p.slug}`,
      images: image ? [{ url: image, width: 1280, height: 720 }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const category = getCategoryOf(project);
  const more = moreWork(project);

  return (
    <Shell active={category?.slug}>
      <ProjectView project={project} strip={stripForProject(project)} />

      {more.length > 0 && (
        <section className="flex flex-col gap-[18px] pt-16">
          <SectionLabel>More work</SectionLabel>
          <ProjectGrid projects={more} />
        </section>
      )}
    </Shell>
  );
}
