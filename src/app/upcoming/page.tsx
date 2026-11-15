import type { Metadata } from "next";
import { SITE, UPCOMING } from "@/content/projects";
import Shell from "@/components/Shell";
import { SectionLabel } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Upcoming",
  description: `Films graded by ${SITE.name} that haven't been cleared to show yet.`,
  alternates: { canonical: "/upcoming" },
  openGraph: {
    title: `Upcoming · ${SITE.name}`,
    url: `${SITE.domain}/upcoming`,
  },
};

/** Everything graded but not yet cleared, and everything still being graded,
 *  shares this one page. There are no frames and no colour strips here on
 *  purpose: showing a look for a film the viewer can't see would be inventing
 *  one. */
export default function UpcomingPage() {
  return (
    <Shell active="upcoming">
      {/* No standfirst here, so the title needs none of the two-column room
          the other pages give theirs. */}
      <h1 className="font-disp font-medium text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-.025em] pt-[72px] max-[820px]:pt-12">
        Upcoming
      </h1>

      {UPCOMING.map((film) => {
        /* A grade that is still open says so instead of claiming a year it
           hasn't reached. Either way the line carries only what is known,
           and goes away when nothing is. */
        const meta = [
          film.status ?? (film.credits.year && `Graded ${film.credits.year}`),
          film.kind?.toLowerCase(),
        ].filter(Boolean);

        return (
          <section key={film.title} className="flex flex-col gap-[22px] pt-10 mt-12 border-t border-line">
            <div className="flex flex-col gap-2">
              <h2 className="font-disp font-medium text-[clamp(24px,3vw,34px)] leading-[1.1] tracking-[-.02em]">
                {film.title}
              </h2>
              {meta.length > 0 && (
                <span
                  className={`font-mono text-[12px] tracking-[.1em] uppercase ${
                    film.status ? "text-safelight-lit" : "text-halide-dim"
                  }`}
                >
                  {meta.join(", ")}
                </span>
              )}
            </div>

            <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-x-7 gap-y-6">
              <div className="flex flex-col gap-[5px]">
                <dt className="font-mono text-[12px] tracking-[.1em] uppercase text-safelight-lit">
                  {film.credits.role}
                </dt>
                <dd className="font-disp text-[16px] leading-[1.35]">{SITE.name}</dd>
              </div>
              {(film.crew ?? []).map((line) => (
                <div key={line.role} className="flex flex-col gap-[5px]">
                  <dt className="font-mono text-[12px] tracking-[.1em] uppercase text-halide-dim">
                    {line.role}
                  </dt>
                  <dd className="font-disp text-[16px] leading-[1.35]">{line.names.join(", ")}</dd>
                </div>
              ))}
            </dl>

            {film.cast?.length ? (
              <div className="flex flex-col gap-[5px]">
                <SectionLabel>Cast</SectionLabel>
                {/* Names only: the viewer can't see the film, so a character
                    name is just plot they have not been shown. */}
                <p className="font-disp text-[16px] leading-[1.6] max-w-[70ch]">
                  {film.cast.map((c) => c.name).join(" · ")}
                </p>
              </div>
            ) : null}

            {film.imdb && (
              <a
                href={film.imdb}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center self-start min-h-[44px] font-disp text-[15px] text-halide underline underline-offset-[4px] decoration-halide/40 hover:decoration-halide transition-colors"
              >
                Full credits on IMDb ↗
              </a>
            )}
          </section>
        );
      })}
    </Shell>
  );
}
