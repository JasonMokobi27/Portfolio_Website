import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategory,
  getCategorySlugs,
  getProjectsByCategory,
  heroStillsFor,
} from "@/lib/projects";
import { SITE } from "@/content/projects";
import { stripsForStills } from "@/lib/palette";
import Shell from "@/components/Shell";
import HeroReel from "@/components/HeroReel";
import { ProjectGrid, SectionLabel } from "@/components/ProjectCard";

export function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const stills = heroStillsFor(getProjectsByCategory(cat.slug));
  return {
    title: cat.label,
    description: `${cat.label} graded by ${SITE.name}. ${SITE.role}.`,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      title: `${cat.label} · ${SITE.name}`,
      url: `${SITE.domain}/${cat.slug}`,
      images: stills[0] ? [{ url: stills[0], width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const items = getProjectsByCategory(category);
  if (!items.length) notFound();

  const stills = heroStillsFor(items);

  return (
    <Shell active={cat.slug}>
      <section className="flex flex-wrap items-center gap-x-16 gap-y-8 pt-[72px] pb-14 max-[820px]:pt-12 max-[820px]:pb-10">
        <h1 className="flex-[1_1_520px] font-disp font-medium text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-.025em]">
          {cat.label}
        </h1>
        <p className="flex-[1_1_320px] font-serif text-[19px] leading-[1.5] text-halide-dim">
          {SITE.intro}
        </p>
      </section>

      <HeroReel stills={stills} segments={stripsForStills(stills)} />

      <section className="flex flex-col gap-[18px] pt-16">
        <SectionLabel>{cat.label}</SectionLabel>
        <ProjectGrid projects={items} />
      </section>
    </Shell>
  );
}
