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
import Rail from "@/components/Rail";
import HeroReel from "@/components/HeroReel";
import WorkRows from "@/components/WorkRows";

export function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.label,
    description: `${cat.label} graded by ${SITE.name}. ${SITE.role}.`,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      title: `${cat.label} · ${SITE.name}`,
      url: `${SITE.domain}/${cat.slug}`,
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
    <main className="min-h-[100dvh] p-[var(--pad)]">
      <div className="mx-auto max-w-[1400px] grid grid-cols-[clamp(150px,15vw,200px)_minmax(0,1fr)] max-[820px]:grid-cols-1 gap-8 max-[820px]:gap-6">
        <Rail active={cat.slug} />

        <div className="min-w-0">
          <HeroReel stills={stills} segments={stripsForStills(stills)} />

          <section className="mt-7 pt-7 border-t border-line">
            <h1 className="font-disp font-medium text-[clamp(20px,2.5vw,30px)] leading-[1.15] tracking-[-.01em] mb-2.5">
              {cat.label}
            </h1>
            <p className="text-[15px] leading-[1.55] text-halide-dim max-w-[58ch]">{SITE.intro}</p>
          </section>

          <section className="mt-7 pt-7 border-t border-line">
            <WorkRows projects={items} />
          </section>
        </div>
      </div>
    </main>
  );
}
