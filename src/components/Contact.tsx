import Link from "next/link";

/** The one labelled way in. The address and the profiles live on /enquire, so
 *  this is a single link and nothing else.
 *
 *  Mounted twice, because the two positions sit in different parts of the
 *  layout and CSS cannot move a box between grid cells. The rail holds it at
 *  the foot of the side panel on desktop; the pages hold it at the foot of the
 *  page on a phone. Each copy is display:none at the other size, so only one is
 *  ever in the accessibility tree. */
export default function Contact({
  className = "",
  current = false,
}: {
  className?: string;
  current?: boolean;
}) {
  return (
    <div className={className}>
      <Link
        href="/enquire"
        aria-current={current ? "page" : undefined}
        className="w-full max-[820px]:w-auto inline-flex items-center justify-between gap-2 min-h-[44px] py-2 px-3 font-mono text-[11px] leading-[1.4] tracking-[.1em] uppercase text-halide border border-safelight/60 rounded-[2px] hover:border-safelight hover:bg-safelight/[0.08] transition-colors"
      >
        Enquire
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
