import { SITE } from "@/content/projects";

/** The foot of every page: the ask, the address set large enough to be the
 *  thing you reach for, and the three profiles.
 *
 *  One copy per page, at the bottom, which is where the ask belongs once the
 *  work has been seen. The icon row and the email sit on a common baseline on
 *  a desktop and stack on a phone. */
export default function SiteFooter() {
  const icon =
    "inline-flex items-center justify-center w-11 h-11 border border-halide/40 rounded-[2px] text-halide-dim hover:text-halide hover:border-halide transition-colors";

  return (
    <footer className="flex flex-wrap justify-between items-end gap-6 mt-20 pt-8 border-t border-line">
      <div className="flex flex-col gap-2.5 min-w-0">
        <span className="font-disp text-[15px] text-halide-dim">Reach out for your next project</span>
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent("Grading enquiry")}`}
          /* inline-flex with a floor on the height keeps the address a 44px
             target on a phone, where it sets at 24px, while the rule stays
             directly under the text rather than floating below it. */
          className="inline-flex items-end min-h-[44px] font-disp font-medium text-[clamp(24px,4vw,44px)] leading-[1.15] tracking-[-.02em] pb-1.5 border-b border-halide text-halide hover:border-safelight transition-colors max-w-full"
        >
          {SITE.email}
        </a>
      </div>

      <div className="flex items-center gap-2.5">
        <a
          href={SITE.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram, opens in a new tab"
          className={icon}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.2 9h3.6v12H3.2zM9.2 9h3.45v1.64h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.3 4.33 5.3V21h-3.6v-5.9c0-1.4-.03-3.22-1.98-3.22-1.98 0-2.28 1.53-2.28 3.11V21H9.2z" />
          </svg>
        </a>
        {/* Set in type rather than drawn: the IMDb logo is a trademark, and a
            rough copy of it would look worse than the letters do. */}
        <a
          href={SITE.links.imdb}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="IMDb, opens in a new tab"
          className={icon}
        >
          <span aria-hidden className="font-mono text-[12px]">
            IMDb
          </span>
        </a>
      </div>
    </footer>
  );
}
