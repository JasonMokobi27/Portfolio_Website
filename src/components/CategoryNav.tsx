import Link from "next/link";
import type { Project } from "@/content/projects";
import { SITE } from "@/content/projects";
import { CATEGORIES, muxStill } from "@/lib/projects";
import { chipGradient } from "@/lib/placeholder";

/** Landing sidebar — the three browse categories in place of the full
 *  project list. Each entry links to /<category>, opening a scoped reel. */
export default function CategoryNav({ projects }: { projects: Project[] }) {
  return (
    <nav className="flex flex-col min-h-0 border-r border-line bg-gradient-to-b from-grain to-ink" aria-label="Categories">
      <div className="p-[var(--pad)] border-b border-line">
        <Link href="/" className="block">
          <h1 className="font-disp font-bold text-[clamp(15px,1.5vw,19px)] tracking-[.02em] leading-[1.05] uppercase">
            Karabo Jason<br />Mokobi
          </h1>
        </Link>
        <div className="font-mono text-[11px] text-halide-dim tracking-[.16em] uppercase mt-2">
          Colourist · DI · HDR Mastering
        </div>
      </div>

      <div className="overflow-y-auto flex-1 min-h-0">
        {CATEGORIES.map((cat, i) => {
          const items = projects.filter((p) => cat.kinds.includes(p.kind));
          const lead = items[0];
          const hero = lead?.stills?.[0];
          const thumb = hero ? (hero.startsWith("/") ? hero : muxStill(hero, 0, 120)) : undefined;
          return (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="relative w-full flex gap-3 items-center px-[var(--pad)] py-4 border-b border-line transition-colors duration-300 hover:bg-halide/[0.035]"
            >
              <span
                className="w-[52px] h-[34px] flex-none rounded-[2px] bg-cover bg-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.5)]"
                style={thumb ? { backgroundImage: `url(${thumb})` } : { background: lead ? chipGradient(lead.tone) : undefined }}
              />
              <span className="min-w-0">
                <span className="block font-mono text-[10px] text-densito tracking-[.14em]">C{String(i + 1).padStart(2, "0")}</span>
                <span className="block font-disp font-semibold text-[13px] tracking-[.01em] truncate mt-0.5">{cat.label}</span>
                <span className="block font-mono text-[10px] text-halide-dim mt-px">
                  {items.length} {items.length === 1 ? "title" : "titles"}
                </span>
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
