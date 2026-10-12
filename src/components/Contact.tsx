import { SITE } from "@/content/projects";

/** How to reach you: the labelled action, the address, the two profiles.
 *
 *  Mounted twice, because the two positions sit in different parts of the
 *  layout and CSS cannot move a box between grid cells. The rail holds it at
 *  the foot of the side panel on desktop; the pages hold it at the foot of the
 *  page on a phone. Each copy is display:none at the other size, so only one is
 *  ever in the accessibility tree. The responsive classes below therefore style
 *  the phone copy only, and the plain ones the desktop copy. */
export default function Contact({ className = "" }: { className?: string }) {
  const icon =
    "inline-flex items-center justify-center w-11 h-11 border border-line rounded-[2px] text-halide-dim hover:text-halide hover:border-halide transition-colors";

  return (
    <div
      className={`flex flex-col items-start gap-2.5 max-[820px]:flex-row max-[820px]:flex-wrap max-[820px]:items-center max-[820px]:gap-x-3 ${className}`}
    >
      <a
        href={`mailto:${SITE.email}?subject=${encodeURIComponent("Grading enquiry")}`}
        className="w-full max-[820px]:w-auto inline-flex items-center justify-between gap-2 min-h-[44px] py-2 px-3 font-mono text-[11px] leading-[1.4] tracking-[.1em] uppercase text-halide border border-safelight/60 rounded-[2px] hover:border-safelight hover:bg-safelight/[0.08] transition-colors"
      >
        Enquire
        <span aria-hidden>→</span>
      </a>

      <div className="flex items-center gap-2">
        <a
          href={SITE.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram, opens in a new tab"
          className={icon}
        >
          <svg
            width="18"
            height="18"
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.2 9h3.6v12H3.2zM9.2 9h3.45v1.64h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.3 4.33 5.3V21h-3.6v-5.9c0-1.4-.03-3.22-1.98-3.22-1.98 0-2.28 1.53-2.28 3.11V21H9.2z" />
          </svg>
        </a>
      </div>

      <a
        href={`mailto:${SITE.email}`}
        className="font-disp text-[13px] text-halide-dim underline underline-offset-[3px] decoration-halide/25 hover:text-halide hover:decoration-halide/60 transition-colors"
      >
        {SITE.email}
      </a>
    </div>
  );
}
