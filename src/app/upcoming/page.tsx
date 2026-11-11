import type { Metadata } from "next";
import { SITE, UPCOMING } from "@/content/projects";
import Rail from "@/components/Rail";
import Contact from "@/components/Contact";

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

          {UPCOMING.map((film) => {
            /* A grade that is still open says so instead of claiming a year it
               hasn't reached. Either way the line carries only what is known,
               and goes away when nothing is. */
            const meta = [
              film.status ?? (film.credits.year && `Graded ${film.credits.year}`),
              film.kind?.toLowerCase(),
            ].filter(Boolean);

            return (
            <section key={film.title} className="mt-7 pt-7 border-t border-line">
              <h2 className="font-disp font-medium text-[18px] leading-[1.2]">{film.title}</h2>
              {meta.length > 0 && (
                <p className="font-mono text-[11px] text-halide-dim mt-1.5">{meta.join(", ")}</p>
              )}
              {/* Credits run the full width of the page. Each column is a short
                  label over one or two names, not prose, so there is no measure
                  to protect: auto-fit takes as many 180px columns as fit, which
                  is five on a wide screen and one on a phone. */}
              <dl className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-8 gap-y-5 mt-6">
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
                  {/* The cast is one long run of text, so unlike the credits it
                      keeps a reading measure. */}
                  <p className="font-disp text-[14px] leading-[1.6] mt-1.5 max-w-[70ch]">
                    {film.cast.map((c) => c.name).join(" · ")}
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
            );
          })}
        </div>

        <Contact className="min-[821px]:hidden mt-8 pt-6 border-t border-line" />
      </div>
    </main>
  );
}
