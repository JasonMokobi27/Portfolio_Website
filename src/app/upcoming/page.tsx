import type { Metadata } from "next";
import { SITE, UPCOMING } from "@/content/projects";
import Rail from "@/components/Rail";

export const metadata: Metadata = {
  title: "Upcoming",
  description: `Films graded by ${SITE.name} that haven't been cleared to show yet.`,
  alternates: { canonical: "/upcoming" },
  openGraph: {
    title: `Upcoming · ${SITE.name}`,
    url: `${SITE.domain}/upcoming`,
  },
};

/** Everything graded but not yet cleared shares this one page. There are no
 *  frames and no colour strips here on purpose: showing a look for a film the
 *  viewer can't see would be inventing one. */
export default function UpcomingPage() {
  return (
    <main className="min-h-[100dvh] p-[var(--pad)]">
      <div className="mx-auto max-w-[1400px] grid grid-cols-[clamp(150px,15vw,200px)_minmax(0,1fr)] max-[820px]:grid-cols-1 gap-8 max-[820px]:gap-6">
        <Rail active="upcoming" />

        <div className="min-w-0">
          <h1 className="font-disp font-medium text-[clamp(20px,2.5vw,30px)] leading-[1.15] tracking-[-.01em]">
            Upcoming
          </h1>

          {UPCOMING.map((film) => (
            <section key={film.title} className="mt-7 pt-7 border-t border-line max-w-[70ch]">
              <h2 className="font-disp font-medium text-[18px] leading-[1.2]">{film.title}</h2>
              <p className="font-mono text-[11px] text-halide-dim mt-1.5">
                Graded {film.credits.year}, {film.kind.toLowerCase()}
              </p>
              <dl className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-8 gap-y-4 mt-6">
                <div>
                  <dt className="font-mono text-[10px] tracking-[.12em] uppercase text-safelight">
                    {film.credits.role}
                  </dt>
                  <dd className="font-disp text-[14px] mt-1">{SITE.name}</dd>
                </div>
                {(film.crew ?? []).map((line) => (
                  <div key={line.role}>
                    <dt className="font-mono text-[10px] tracking-[.12em] uppercase text-halide-dim">
                      {line.role}
                    </dt>
                    <dd className="font-disp text-[14px] mt-1">{line.names.join(", ")}</dd>
                  </div>
                ))}
              </dl>

              {film.cast?.length ? (
                <div className="mt-7">
                  <h3 className="font-mono text-[10px] tracking-[.12em] uppercase text-halide-dim">Cast</h3>
                  <p className="font-disp text-[14px] leading-[1.6] mt-1.5">
                    {film.cast.map((c) => (c.as ? `${c.name} (${c.as})` : c.name)).join(" · ")}
                  </p>
                </div>
              ) : null}

              {film.imdb && (
                <a
                  href={film.imdb}
                  target="_blank"
                  rel="noopener"
                  className="inline-block font-mono text-[11px] tracking-[.1em] uppercase text-densito mt-7 hover:text-halide transition-colors"
                >
                  Full credits on IMDb ↗
                </a>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
