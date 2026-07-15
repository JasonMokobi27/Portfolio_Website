"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { SITE } from "@/content/projects";

const ROWS: [keyof Project["credits"], string][] = [
  ["director", "Director"],
  ["dp", "DP"],
  ["production", "Production"],
  ["role", "Role"],
  ["format", "Format"],
  ["delivery", "Delivery"],
  ["year", "Year"],
];

export default function Dossier({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) {
  const rows = ROWS.filter(([k]) => project.credits[k]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "101%" }}
          animate={{ y: 0 }}
          exit={{ y: "101%" }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          className="absolute inset-0 z-20 bg-ink/[0.86] backdrop-blur-lg flex flex-col p-[var(--pad)] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="self-end bg-none border border-line text-halide font-mono text-[11px] tracking-[.14em] px-3.5 py-2 rounded-[2px] hover:border-halide"
          >
            Close ✕
          </button>

          <h3 className="font-disp font-semibold text-[12px] tracking-[.16em] uppercase text-densito mt-6 mb-2.5">The Look</h3>
          <p className="max-w-[66ch] text-[clamp(15px,1.5vw,18px)]">{project.look}</p>

          <h3 className="font-disp font-semibold text-[12px] tracking-[.16em] uppercase text-densito mt-6 mb-2.5">Credits</h3>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-px bg-line border border-line">
            {rows.map(([k, label]) => (
              <div key={k} className="bg-ink px-4 py-3">
                <dt className="font-mono text-[10px] tracking-[.12em] uppercase text-halide-dim">{label}</dt>
                <dd className="font-disp font-semibold text-[15px] mt-1.5">{project.credits[k]}</dd>
              </div>
            ))}
          </dl>

          <div className="font-mono text-[12px] tracking-[.06em] mt-6 flex gap-5 flex-wrap">
            <a href={`mailto:${SITE.email}`} className="text-densito hover:underline">{SITE.email}</a>
            <a href={SITE.links.showreel} target="_blank" rel="noopener" className="text-densito hover:underline">2025 Showreel ↗</a>
            <a href={SITE.links.imdb} target="_blank" rel="noopener" className="text-densito hover:underline">IMDb ↗</a>
            <a href={SITE.links.linkedin} target="_blank" rel="noopener" className="text-densito hover:underline">LinkedIn ↗</a>
            <a href={SITE.links.instagram} target="_blank" rel="noopener" className="text-densito hover:underline">@colorunderjason ↗</a>
            <span className="text-halide-dim">Remote DI · {SITE.regions.join(" · ")}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
