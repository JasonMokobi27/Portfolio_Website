import type { Metadata } from "next";
import { SITE } from "@/content/projects";
import Rail from "@/components/Rail";

export const metadata: Metadata = {
  title: "Enquire",
  description: `Get in touch with ${SITE.name}, ${SITE.role.toLowerCase()}.`,
  alternates: { canonical: "/enquire" },
  openGraph: {
    title: `Enquire · ${SITE.name}`,
    url: `${SITE.domain}/enquire`,
  },
};

/** Nothing on this page but the ask: the line, the address, the profiles. No
 *  frames and no work, so there is nothing to read past before writing. */
export default function EnquirePage() {
  const icon =
    "inline-flex items-center justify-center w-12 h-12 border border-line rounded-[2px] text-halide-dim hover:text-halide hover:border-halide transition-colors";

  return (
    <main className="min-h-[100dvh] p-[var(--pad)]">
      <div className="mx-auto max-w-[1400px] grid grid-cols-[clamp(150px,15vw,200px)_minmax(0,1fr)] max-[820px]:grid-cols-1 gap-8 max-[820px]:gap-6">
        <Rail active="enquire" />

        <div className="min-w-0 flex flex-col items-center justify-center text-center min-h-[70dvh] max-[820px]:min-h-[55dvh] py-10">
          <h1 className="font-disp font-medium text-[clamp(26px,3.6vw,40px)] leading-[1.15] tracking-[-.01em] max-w-[22ch]">
            Reach out for your next project
          </h1>

          <a
            href={`mailto:${SITE.email}`}
            className="mt-6 font-disp text-[clamp(16px,1.7vw,20px)] text-halide underline underline-offset-[5px] decoration-halide/30 hover:decoration-halide transition-colors"
          >
            {SITE.email}
          </a>

          <div className="flex items-center gap-2.5 mt-10">
            <a
              href={SITE.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram, opens in a new tab"
              className={icon}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn, opens in a new tab"
              className={icon}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.2 9h3.6v12H3.2zM9.2 9h3.45v1.64h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.3 4.33 5.3V21h-3.6v-5.9c0-1.4-.03-3.22-1.98-3.22-1.98 0-2.28 1.53-2.28 3.11V21H9.2z" />
              </svg>
            </a>

            {/* The IMDb mark is a trademark, so this is set in type rather than
                drawn as an imitation of it. */}
            <a
              href={SITE.links.imdb}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IMDb, opens in a new tab"
              className={icon}
            >
              <span className="font-mono text-[11px] tracking-[.06em]" aria-hidden>
                IMDb
              </span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
