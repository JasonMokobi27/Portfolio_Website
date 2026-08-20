import Link from "next/link";
import type { Project } from "@/content/projects";
import { SITE } from "@/content/projects";
import type { Category } from "@/lib/projects";
import { chipGradient } from "@/lib/placeholder";
import { muxStill } from "@/lib/projects";

/** The reel — server-rendered navigation index. Each entry is a real
 *  link to /work/<slug>, so every project is deep-linkable & indexable.
 *  When `category` is set the reel is scoped to that category and shows
 *  a link back to the category picker. */
export default function Reel({ projects, activeSlug, category }: { projects: Project[]; activeSlug?: string; category?: Category }) {
  return (
    <nav className="flex flex-col min-h-0 border-r border-line bg-gradient-to-b from-grain to-ink" aria-label={category ? `${category.label} reel` : "Project reel"}>
      <div className="p-[var(--pad)] border-b border-line">
        <Link href="/" className="block">
          <h1 className="font-disp font-bold text-[clamp(15px,1.5vw,19px)] tracking-[.02em] leading-[1.05] uppercase">
            Karabo Jason<br />Mokobi
          </h1>
        </Link>
        <div className="font-mono text-[11px] text-halide-dim tracking-[.16em] uppercase mt-2">
          Colourist · DI · HDR Mastering
        </div>
        {category && (
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] text-safelight tracking-[.16em] uppercase">{category.label}</span>
            <Link href="/" className="font-mono text-[10px] text-densito tracking-[.14em] uppercase hover:text-halide">
              ← All work
            </Link>
          </div>
        )}
      </div>

      <div className="overflow-y-auto flex-1 min-h-0">
        {projects.map((p, i) => {
          const active = p.slug === activeSlug;
          const hero = p.stills?.[0];
          const thumb = hero ? (hero.startsWith("/") ? hero : muxStill(hero, 0, 120)) : undefined;
          return (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              aria-current={active}
              className={`relative w-full flex gap-3 items-center px-[var(--pad)] py-3.5 border-b border-line transition-colors duration-300 hover:bg-halide/[0.035] ${active ? "bg-halide/[0.06]" : ""}`}
            >
              {active && <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-safelight" />}
              <span
                className="w-[46px] h-[30px] flex-none rounded-[2px] bg-cover bg-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.5)]"
                style={thumb ? { backgroundImage: `url(${thumb})` } : { background: chipGradient(p.tone) }}
              />
              <span className="min-w-0">
                <span className="block font-mono text-[10px] text-densito tracking-[.14em]">R{String(i + 1).padStart(2, "0")}</span>
                <span className="block font-disp font-semibold text-[13px] tracking-[.01em] truncate mt-0.5">{p.title}</span>
                <span className="block font-mono text-[10px] text-halide-dim mt-px">{p.credits.year} · {p.kind}</span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="p-[var(--pad)] border-t border-line font-mono text-[10px] text-halide-dim tracking-[.12em]">
        <a href={`mailto:${SITE.email}`} className="hover:text-halide">{SITE.email}</a>
      </div>
    </nav>
  );
}
