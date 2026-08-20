import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategory, getCategorySlugs, getProjectsByCategory } from "@/lib/projects";
import { SITE } from "@/content/projects";
import Reel from "@/components/Reel";
import Landing from "@/components/Landing";

export function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const title = `${cat.label} — ${SITE.name}`;
  return {
    title,
    description: `${cat.label} graded by ${SITE.name}. ${SITE.role}.`,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      title: `${cat.label} — ${SITE.name}`,
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

  const pool = items.flatMap((p) => p.stills ?? []);

  return (
    <div className="grid grid-cols-[clamp(220px,22vw,300px)_1fr] h-[100dvh] max-[820px]:grid-cols-1 max-[820px]:h-auto max-[820px]:min-h-[100dvh]">
      <Reel projects={items} category={cat} />
      <Landing
        first={items[0]}
        pool={pool}
        headline={SITE.headline}
        kicker={`${cat.label} · Selected work`}
        intro={SITE.intro}
      />
    </div>
  );
}
