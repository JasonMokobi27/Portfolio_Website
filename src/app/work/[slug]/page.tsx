import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryOf, getProject, getProjects, getProjectsByCategory, getSlugs, muxPoster } from "@/lib/projects";
import { SITE } from "@/content/projects";
import { stripForProject } from "@/lib/palette";
import Rail from "@/components/Rail";
import ProjectView from "@/components/ProjectView";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} · ${p.kind}`;
  const director = p.crew?.find((c) => c.role.toLowerCase().includes("direct"))?.names.join(", ");
  const description = [
    p.logline !== p.kind ? p.logline : null,
    director ? `Directed by ${director}.` : null,
    `${p.credits.role}: ${SITE.name}.`,
  ]
    .filter(Boolean)
    .join(" ");
  const image = p.muxPlaybackId ? muxPoster(p.muxPlaybackId, p.posterTime ?? 0) : undefined;
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
  const scope = category ? getProjectsByCategory(category.slug) : getProjects();
  const list = scope.some((p) => p.slug === slug) ? scope : getProjects();
  const idx = list.findIndex((p) => p.slug === slug);
  const next = list[(idx + 1) % list.length] ?? project;

  return (
    <main className="min-h-[100dvh] p-[var(--pad)]">
      <div className="mx-auto max-w-[1400px] grid grid-cols-[clamp(150px,15vw,200px)_minmax(0,1fr)] max-[820px]:grid-cols-1 gap-8 max-[820px]:gap-6">
        <Rail active={category?.slug} />
        <ProjectView project={project} strip={stripForProject(project)} next={next} />
      </div>
    </main>
  );
}
