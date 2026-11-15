import Link from "next/link";
import { SITE } from "@/content/projects";
import { CATEGORIES } from "@/lib/projects";

/** The bar across the top of every page: who you are, what there is to browse,
 *  and the way to start a conversation.
 *
 *  Three items on one row on a desktop. Below 860px the nav drops to a row of
 *  its own underneath, with the name and the button still paired above it,
 *  which is done by re-ordering rather than by a second copy of the markup.
 *
 *  `active` is a category slug, "all" on the home page, or "upcoming". */
export default function TopBar({ active = "all" }: { active?: string }) {
  const link = (isActive: boolean) =>
    `inline-flex items-center min-h-[44px] text-[15px] transition-colors ${
      isActive
        ? "text-halide"
        : "text-halide-dim hover:text-halide underline-offset-[5px] hover:underline"
    }`;

  const sections = [
    { href: "/", label: "All work", key: "all" },
    ...CATEGORIES.map((c) => ({ href: `/${c.slug}`, label: c.label, key: c.slug })),
    /* "Upcoming", not "In post": the page covers work that is finished and
       unreleased as well as work still being graded. */
    { href: "/upcoming", label: "Upcoming", key: "upcoming" },
  ];

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 pb-5 border-b border-line">
      <Link href="/" className="flex flex-col gap-0.5 group">
        <span className="font-disp font-medium text-[18px] leading-[1.25] group-hover:underline underline-offset-[4px]">
          {SITE.name}
        </span>
        <span className="font-disp text-[14px] text-halide-dim">{SITE.role}</span>
      </Link>

      <nav
        aria-label="Sections"
        className="flex flex-wrap items-center gap-x-6 font-disp max-[860px]:order-3 max-[860px]:w-full max-[860px]:gap-x-5"
      >
        {sections.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            aria-current={active === s.key ? "page" : undefined}
            className={link(active === s.key)}
          >
            {s.label}
          </Link>
        ))}
      </nav>

      <a
        href={`mailto:${SITE.email}?subject=${encodeURIComponent("Grading enquiry")}`}
        className="inline-flex items-center min-h-[44px] px-[18px] rounded-[2px] bg-halide text-ink font-disp font-medium text-[15px] hover:bg-white transition-colors max-[860px]:order-2"
      >
        Get Started
      </a>
    </header>
  );
}
