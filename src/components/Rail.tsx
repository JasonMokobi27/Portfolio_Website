import Link from "next/link";
import { SITE } from "@/content/projects";
import { CATEGORIES } from "@/lib/projects";

/** The left rail: who you are, what you can browse, how to reach you.
 *  `active` is a category slug, or "all" on the home page. */
export default function Rail({ active = "all" }: { active?: string }) {
  /* Plain rows in the rail, tappable chips once it lies down across the top of
     a phone: a border is the only affordance that survives having no hover. */
  const link = (isActive: boolean) =>
    `block font-disp py-[3px] transition-colors hover:underline underline-offset-[3px] ${
      isActive ? "text-halide" : "text-halide-dim hover:text-halide"
    } max-[820px]:no-underline max-[820px]:hover:no-underline max-[820px]:flex max-[820px]:items-center max-[820px]:min-h-[44px] max-[820px]:border max-[820px]:rounded-[2px] max-[820px]:px-3 max-[820px]:py-0 ${
      isActive ? "max-[820px]:border-safelight" : "max-[820px]:border-line"
    }`;

  return (
    <nav
      className="flex flex-col gap-1.5 text-[13px] border-r border-line pr-8 max-[820px]:border-r-0 max-[820px]:pr-0 max-[820px]:border-b max-[820px]:pb-5"
      aria-label="Sections"
    >
      <div className="flex flex-col gap-1.5 max-[820px]:flex-row max-[820px]:flex-wrap max-[820px]:items-baseline max-[820px]:gap-x-2.5 max-[820px]:gap-y-0">
        <Link
          href="/"
          className="font-disp font-medium text-[15px] leading-[1.3] text-halide hover:underline underline-offset-[3px]"
        >
          {SITE.name}
        </Link>
        <span className="font-disp text-halide-dim">{SITE.role}</span>
      </div>

      <div className="mt-3.5 max-[820px]:mt-3 max-[820px]:flex max-[820px]:flex-wrap max-[820px]:gap-1.5">
        <Link href="/" className={link(active === "all")}>
          All work
        </Link>
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/${cat.slug}`} className={link(active === cat.slug)}>
            {cat.label}
          </Link>
        ))}
        <Link href="/upcoming" className={link(active === "upcoming")}>
          Upcoming
        </Link>
      </div>

      <a
        href={`mailto:${SITE.email}`}
        className="mt-5 max-[820px]:mt-3 font-disp text-halide underline underline-offset-[3px] decoration-halide/35 hover:decoration-safelight hover:text-safelight transition-colors"
      >
        {SITE.email}
      </a>
    </nav>
  );
}
