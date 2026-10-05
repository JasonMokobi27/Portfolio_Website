import Link from "next/link";
import { SITE } from "@/content/projects";
import { CATEGORIES } from "@/lib/projects";

/** The left rail: who you are, what you can browse, how to reach you.
 *  `active` is a category slug, or "all" on the home page. */
export default function Rail({ active = "all" }: { active?: string }) {
  const link = (isActive: boolean) =>
    `block font-disp py-[3px] transition-colors ${
      isActive ? "text-halide" : "text-halide-dim hover:text-halide"
    }`;

  return (
    <nav
      className="flex flex-col gap-1.5 text-[13px] border-r border-line pr-8 max-[820px]:border-r-0 max-[820px]:pr-0 max-[820px]:border-b max-[820px]:pb-6"
      aria-label="Sections"
    >
      <Link href="/" className="font-disp font-medium text-[15px] leading-[1.3] text-halide">
        {SITE.name}
      </Link>
      <span className="font-disp text-halide-dim">{SITE.role}</span>

      <div className="mt-3.5">
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
        className="mt-5 max-[820px]:mt-3 font-disp text-halide hover:text-safelight transition-colors"
      >
        {SITE.email}
      </a>
    </nav>
  );
}
