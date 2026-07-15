import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, getProjects, getSlugs, muxPoster } from "@/lib/projects";
import { SITE } from "@/content/projects";
import Reel from "@/components/Reel";
import Stage from "@/components/Stage";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} — ${p.kind}`;
  const description = `${p.credits.role}. ${p.look.slice(0, 150)}…`;
  const image = p.muxPlaybackId ? muxPoster(p.muxPlaybackId, p.posterTime ?? 0) : undefined;
  return {
    title,
    description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${p.title} — ${SITE.name}`,
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

  const all = getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const nextSlug = all[(idx + 1) % all.length]?.slug ?? slug;

  return (
    <div className="grid grid-cols-[clamp(220px,22vw,300px)_1fr] h-[100dvh] max-[820px]:grid-cols-1 max-[820px]:h-auto max-[820px]:min-h-[100dvh]">
      <Reel projects={all} activeSlug={slug} />
      <Stage project={project} nextSlug={nextSlug} />
    </div>
  );
}
