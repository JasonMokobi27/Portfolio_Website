import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { SITE, HERO_STILLS, UPCOMING } from "@/content/projects";
import { stripsForStills } from "@/lib/palette";
import Shell from "@/components/Shell";
import HeroReel from "@/components/HeroReel";
import { ProjectGrid, SectionLabel } from "@/components/ProjectCard";

/* The two that lead the page. Everything else follows in the grid below. */
const FEATURED = ["rockweed", "lars-mikael"];

export default function Home() {
  const projects = getProjects();
  const featured = FEATURED.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  const rest = projects.filter((p) => !FEATURED.includes(p.slug));

  return (
    <Shell active="all">
      <section className="flex flex-wrap items-center gap-x-16 gap-y-8 pt-[72px] pb-14 max-[820px]:pt-12 max-[820px]:pb-10">
        <h1 className="flex-[1_1_520px] font-disp font-medium text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-.025em]">
          {SITE.headline}
        </h1>
        <p className="flex-[1_1_320px] font-serif text-[19px] leading-[1.5] text-halide-dim">
          {SITE.intro}
        </p>
      </section>

      {/* Kept from the old home page: the strongest frames rotating, with each
          film's own colour under them doubling as the scrubber. */}
      <HeroReel stills={HERO_STILLS} segments={stripsForStills(HERO_STILLS)} />

      {featured.length > 0 && (
        <section className="flex flex-col gap-[18px] pt-16">
          <SectionLabel>Features and series</SectionLabel>
          <ProjectGrid projects={featured} featured />
        </section>
      )}

      <section className="flex flex-col gap-[18px] pt-16">
        <SectionLabel>All work</SectionLabel>
        <ProjectGrid projects={rest} />
      </section>

      {UPCOMING.length > 0 && (
        <section className="flex flex-col gap-[18px] pt-[72px]">
          <SectionLabel>Upcoming</SectionLabel>
          <div className="flex flex-wrap gap-4">
            {UPCOMING.map((film) => {
              const director = film.crew?.find((c) => /^directors?$/i.test(c.role))?.names.join(", ");
              const open = Boolean(film.status);
              return (
                <Link
                  key={film.title}
                  href="/upcoming"
                  className="flex-[1_1_240px] flex flex-col gap-1.5 p-[18px] border border-line rounded-[3px] hover:border-halide/40 transition-colors"
                >
                  <span
                    className={`font-mono text-[12px] tracking-[.1em] uppercase ${
                      open ? "text-safelight-lit" : "text-halide-dim"
                    }`}
                  >
                    {[film.status ?? (film.credits.year && `Graded ${film.credits.year}`), film.kind?.toLowerCase()]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                  <span className="font-disp font-medium text-[20px] leading-[1.2]">{film.title}</span>
                  {director && (
                    <span className="font-serif text-[16px] text-halide-dim">Dir. {director}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </Shell>
  );
}

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE.domain,
    images: HERO_STILLS[0] ? [{ url: HERO_STILLS[0], width: 1200, height: 630 }] : undefined,
  },
};
